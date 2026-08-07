// 성인 게시판 본인확인(연령 확인) 결과 검증.
//
// 브라우저에서 포트원 본인인증 창을 띄워 인증이 끝나면 identityVerificationId만 넘어온다.
// ⚠️ 그 값을 그대로 믿으면 안 된다(브라우저에서 얼마든지 조작 가능).
//    반드시 이 서버가 포트원 REST API로 결과를 다시 조회해서 확인해야 한다.
//
// 개인정보 최소 수집 원칙:
//   이름·생년월일·휴대폰번호는 **저장하지 않는다.**
//   생년월일은 나이 계산에만 쓰고 즉시 버린다.
//
// ⚠️ CI가 아니라 DI를 쓴다.
//   CI(연계정보)는 모든 기관에서 같은 값이라 사실상 주민번호를 대체하는 식별자다.
//   우리가 필요한 건 "이 사이트 안에서 같은 사람인가"뿐이고, 그건 사이트별로만
//   발급되는 DI(중복가입확인정보)로 충분하다. CI를 받으면 연계정보 안전조치
//   실태점검 대상이 될 수 있어(KCP 안내), 목적에 맞는 최소한의 값만 받는다.
//   그 DI마저 원본이 아니라 해시만 남긴다.
import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";
import { clientIp } from "../../../../lib/client-ip";

export const runtime = "nodejs";

const PORTONE_API = "https://api.portone.io";
const MAX_ATTEMPTS_PER_DAY = 10; // 같은 계정의 하루 시도 제한(인증 1건당 비용이 발생하므로)

function bad(message, status = 400) {
  return Response.json({ ok: false, message }, { status });
}


// 청소년보호법 제2조 기준 — "만 19세 미만"이되, **만 19세가 되는 해의 1월 1일을 맞이한 사람은 제외**.
// 즉 법적 기준은 만 나이가 아니라 연 나이(올해연도 - 출생연도 >= 19)다.
function isAdultByLaw(birthDate) {
  const m = /^(\d{4})-?(\d{2})-?(\d{2})$/.exec(String(birthDate || "").trim());
  if (!m) return null; // 생년월일을 못 읽으면 판단 불가 → 통과시키지 않는다
  const birthYear = Number(m[1]);
  if (!birthYear || birthYear < 1900) return null;
  return new Date().getFullYear() - birthYear >= 19;
}

// 원본 DI를 그대로 두지 않기 위한 단방향 해시(서버 전용 키 사용)
function hashId(di, salt) {
  return crypto.createHmac("sha256", salt).update(String(di)).digest("hex");
}

// 자리를 잡아 둔 시도 기록의 결과를 확정한다(아래 '자리 잡기' 참고)
async function finish(supa, claimId, result) {
  try { await supa.from("adult_verify_log").update({ result }).eq("id", claimId); } catch (e) {}
}

export async function POST(request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const portoneSecret = process.env.PORTONE_API_SECRET;
  // CI 대신 DI를 쓰게 되면서 이름을 바꿨다. 예전 이름도 받아 준다(값은 그대로 쓰면 된다).
  const idSalt = process.env.ADULT_ID_SALT || process.env.ADULT_CI_SALT;
  if (!url || !key || !portoneSecret || !idSalt) {
    return bad("본인확인 설정이 아직 준비되지 않았어요.", 500);
  }

  let body;
  try { body = await request.json(); } catch (e) { return bad("요청을 읽지 못했어요."); }

  const verificationId = String(body?.identityVerificationId || "").trim();
  if (!verificationId || verificationId.length > 200) return bad("본인확인 정보가 올바르지 않아요.");

  const supa = createClient(url, key, { auth: { persistSession: false } });
  const ip = clientIp(request);

  // ── 1. 요청한 사람이 누구인지 확인(로그인 토큰 검증) ──
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return bad("로그인이 필요해요.", 401);

  const { data: userData, error: userErr } = await supa.auth.getUser(token);
  const user = userData?.user;
  if (userErr || !user) return bad("로그인이 필요해요.", 401);

  // ── 2. 시도 횟수 제한 ──
  try {
    const dayAgo = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    const cnt = await supa.from("adult_verify_log")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id).gte("created_at", dayAgo);
    if (!cnt.error && (cnt.count || 0) >= MAX_ATTEMPTS_PER_DAY) {
      return bad("오늘은 더 시도할 수 없어요. 내일 다시 시도해주세요.", 429);
    }
  } catch (e) { /* 조회 실패 시 막지 않음 */ }

  // ── 3. ★ 인증 번호 재사용 차단 ★ ──
  // 한 번 쓴 identityVerificationId를 다시 보내면 포트원은 여전히 "인증됨"을 돌려준다.
  // 그래서 남의 인증 번호를 가로채 그대로 보내면 그 사람 명의로 통과할 수 있다.
  // → 검사만 하고 넘어가면 검사와 저장 사이에 두 요청이 동시에 끼어들 수 있으므로,
  //   유니크 인덱스가 걸린 칸에 **먼저 자리를 잡는다**. 동시에 와도 하나만 성공한다.
  //   (포트원을 부르기 전에 막으므로 불필요한 조회 비용도 안 든다)
  const claim = await supa.from("adult_verify_log")
    .insert({ user_id: user.id, result: "pending", ip, verification_id: verificationId })
    .select("id").single();

  if (claim.error) {
    const used = claim.error.code === "23505" ||
      /duplicate|unique/i.test(String(claim.error.message || ""));
    if (!used) return bad("잠시 후 다시 시도해주세요.", 500); // DB 문제 → 재사용으로 오해하지 않게
    // 이미 인증을 마친 본인이 같은 번호를 또 보낸 경우(휴대폰에서 되돌아오며 두 번 전송 등)는
    // 오류 대신 성공으로 답한다 — 실제로 인증은 끝나 있어서 오류를 띄우면 혼란만 준다.
    const me = await supa.from("profiles").select("adult_verified").eq("id", user.id).maybeSingle();
    if (me.data && me.data.adult_verified) return Response.json({ ok: true });
    return bad("이미 사용된 본인확인이에요. 처음부터 다시 인증해주세요.", 409);
  }
  const claimId = claim.data.id;

  // ── 4. ★ 포트원에 결과를 직접 조회해서 검증 ★ ──
  let pv;
  try {
    const res = await fetch(
      PORTONE_API + "/identity-verifications/" + encodeURIComponent(verificationId),
      { headers: { Authorization: "PortOne " + portoneSecret } }
    );
    if (!res.ok) {
      await finish(supa, claimId, "failed");
      return bad("본인확인 결과를 확인하지 못했어요. 다시 시도해주세요.", 502);
    }
    pv = await res.json();
  } catch (e) {
    await finish(supa, claimId, "failed");
    return bad("본인확인 서버와 통신하지 못했어요. 잠시 후 다시 시도해주세요.", 502);
  }

  if (pv?.status !== "VERIFIED") {
    await finish(supa, claimId, "failed");
    return bad("본인확인이 완료되지 않았어요.", 400);
  }

  const customer = pv.verifiedCustomer || {};

  // ── 5. 연령 확인 ──
  const adult = isAdultByLaw(customer.birthDate);
  if (adult === null) {
    await finish(supa, claimId, "failed");
    return bad("생년월일을 확인하지 못했어요. 다른 인증 수단으로 시도해주세요.", 400);
  }
  if (!adult) {
    await finish(supa, claimId, "underage");
    return bad("만 19세 미만은 이용할 수 없어요.", 403);
  }

  // ── 6. 중복 인증 차단(한 사람이 여러 계정으로 인증하는 것) ──
  if (!customer.di) {
    await finish(supa, claimId, "failed");
    return bad("본인확인 정보가 부족해요. 다른 인증 수단으로 시도해주세요.", 400);
  }
  const idHash = hashId(customer.di, idSalt);

  const dup = await supa.from("profiles")
    .select("id").eq("adult_di_hash", idHash).neq("id", user.id).maybeSingle();
  if (dup.data) {
    await finish(supa, claimId, "duplicate");
    return bad("이미 다른 계정에서 인증된 정보예요. 한 사람당 한 계정만 인증할 수 있어요.", 409);
  }

  // ── 7. 인증 완료 기록 ──
  // 남기는 값은 이 세 가지뿐. 이름·생년월일·휴대폰번호·원본 DI는 여기서 그대로 버려진다.
  const upd = await supa.from("profiles").update({
    adult_verified: true,
    adult_verified_at: new Date().toISOString(),
    adult_di_hash: idHash,
  }).eq("id", user.id);

  if (upd.error) {
    await finish(supa, claimId, "failed");
    if (/duplicate|unique/i.test(String(upd.error.message || ""))) {
      return bad("이미 다른 계정에서 인증된 정보예요.", 409);
    }
    return bad("인증 정보를 저장하지 못했어요. 잠시 후 다시 시도해주세요.", 500);
  }

  await finish(supa, claimId, "ok");
  return Response.json({ ok: true });
}
