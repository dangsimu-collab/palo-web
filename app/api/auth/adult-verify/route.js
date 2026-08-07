// 성인 게시판 본인확인(연령 확인) 결과 검증.
//
// 브라우저에서 포트원 본인인증 창을 띄워 인증이 끝나면 identityVerificationId만 넘어온다.
// ⚠️ 그 값을 그대로 믿으면 안 된다(브라우저에서 얼마든지 조작 가능).
//    반드시 이 서버가 포트원 REST API로 결과를 다시 조회해서 확인해야 한다.
//
// 개인정보 최소 수집 원칙:
//   이름·생년월일·휴대폰번호·원본 CI는 **저장하지 않는다.**
//   생년월일은 나이 계산에만 쓰고 즉시 버리고, CI는 해시만 남긴다.
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

// 원본 CI를 그대로 두지 않기 위한 단방향 해시(서버 전용 키 사용)
function hashCi(ci, salt) {
  return crypto.createHmac("sha256", salt).update(String(ci)).digest("hex");
}

async function log(supa, userId, result, ip) {
  try { await supa.from("adult_verify_log").insert({ user_id: userId, result, ip }); } catch (e) {}
}

export async function POST(request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const portoneSecret = process.env.PORTONE_API_SECRET;
  const ciSalt = process.env.ADULT_CI_SALT;
  if (!url || !key || !portoneSecret || !ciSalt) {
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

  // ── 3. ★ 포트원에 결과를 직접 조회해서 검증 ★ ──
  let pv;
  try {
    const res = await fetch(
      PORTONE_API + "/identity-verifications/" + encodeURIComponent(verificationId),
      { headers: { Authorization: "PortOne " + portoneSecret } }
    );
    if (!res.ok) {
      await log(supa, user.id, "failed", ip);
      return bad("본인확인 결과를 확인하지 못했어요. 다시 시도해주세요.", 502);
    }
    pv = await res.json();
  } catch (e) {
    await log(supa, user.id, "failed", ip);
    return bad("본인확인 서버와 통신하지 못했어요. 잠시 후 다시 시도해주세요.", 502);
  }

  if (pv?.status !== "VERIFIED") {
    await log(supa, user.id, "failed", ip);
    return bad("본인확인이 완료되지 않았어요.", 400);
  }

  const customer = pv.verifiedCustomer || {};

  // ── 4. 연령 확인 ──
  const adult = isAdultByLaw(customer.birthDate);
  if (adult === null) {
    await log(supa, user.id, "failed", ip);
    return bad("생년월일을 확인하지 못했어요. 다른 인증 수단으로 시도해주세요.", 400);
  }
  if (!adult) {
    await log(supa, user.id, "underage", ip);
    return bad("만 19세 미만은 이용할 수 없어요.", 403);
  }

  // ── 5. 중복 인증 차단(한 사람이 여러 계정으로 인증하는 것) ──
  if (!customer.ci) {
    await log(supa, user.id, "failed", ip);
    return bad("본인확인 정보가 부족해요. 다른 인증 수단으로 시도해주세요.", 400);
  }
  const ciHash = hashCi(customer.ci, ciSalt);

  const dup = await supa.from("profiles")
    .select("id").eq("adult_ci_hash", ciHash).neq("id", user.id).maybeSingle();
  if (dup.data) {
    await log(supa, user.id, "duplicate", ip);
    return bad("이미 다른 계정에서 인증된 정보예요. 한 사람당 한 계정만 인증할 수 있어요.", 409);
  }

  // ── 6. 인증 완료 기록 ──
  // 남기는 값은 이 세 가지뿐. 이름·생년월일·휴대폰번호·원본 CI는 여기서 그대로 버려진다.
  const upd = await supa.from("profiles").update({
    adult_verified: true,
    adult_verified_at: new Date().toISOString(),
    adult_ci_hash: ciHash,
  }).eq("id", user.id);

  if (upd.error) {
    await log(supa, user.id, "failed", ip);
    if (/duplicate|unique/i.test(String(upd.error.message || ""))) {
      return bad("이미 다른 계정에서 인증된 정보예요.", 409);
    }
    return bad("인증 정보를 저장하지 못했어요. 잠시 후 다시 시도해주세요.", 500);
  }

  await log(supa, user.id, "ok", ip);
  return Response.json({ ok: true });
}
