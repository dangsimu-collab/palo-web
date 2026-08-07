// 아이디 + 비밀번호 회원가입(이메일 불필요).
// Supabase Auth는 내부적으로 이메일이 필요하므로 "아이디@내부도메인"으로 매핑해 계정을 만든다.
// 서버에서 email_confirm:true로 생성 → 인증 메일을 아예 보내지 않으므로
// 대시보드의 "Confirm email" 설정과 무관하게 항상 즉시 가입이 완료된다.
import { createClient } from "@supabase/supabase-js";
import { clientIp } from "../../../../lib/client-ip";

export const runtime = "nodejs";

// ── 대량 가입 방지(같은 회선에서 계정을 여러 개 찍어내는 것 차단) ──
const SIGNUP_LIMIT_PER_DAY = 5;   // 같은 IP에서 24시간 동안 만들 수 있는 계정 수
const SIGNUP_MIN_INTERVAL_SEC = 30; // 연속 가입 최소 간격(자동화 스크립트 차단)

const ID_DOMAIN = "users.commi.kr";        // 실제로 메일을 받지 않는 내부 전용 도메인
const ID_RE = /^[a-z][a-z0-9_]{3,19}$/;    // 영문 소문자로 시작, 영문·숫자·밑줄 4~20자
const RESERVED = new Set([
  "admin", "administrator", "root", "system", "commi", "official", "master",
  "manager", "operator", "support", "help", "test", "guest", "anonymous", "null", "undefined",
]);

function bad(message, status = 400) {
  return Response.json({ ok: false, message }, { status });
}

// 같은 IP에서 가입이 지나치게 많은지 확인.
// signup_log 표가 없거나 조회에 실패하면 가입을 막지 않는다(정상 이용자를 잠그지 않기 위해).
async function signupBlockedReason(supa, ip) {
  if (!ip) return null;
  try {
    const dayAgo = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    const day = await supa.from("signup_log")
      .select("id", { count: "exact", head: true }).eq("ip", ip).gte("created_at", dayAgo);
    if (day.error) return null; // 표가 없는 등 조회 불가 → 통과
    if ((day.count || 0) >= SIGNUP_LIMIT_PER_DAY) {
      return "이 인터넷 회선에서는 오늘 만들 수 있는 계정 수를 넘었어요. 내일 다시 시도해주세요.";
    }
    const justNow = new Date(Date.now() - SIGNUP_MIN_INTERVAL_SEC * 1000).toISOString();
    const recent = await supa.from("signup_log")
      .select("id", { count: "exact", head: true }).eq("ip", ip).gte("created_at", justNow);
    if (!recent.error && (recent.count || 0) > 0) {
      return "잠시 후 다시 시도해주세요.";
    }
  } catch (e) { /* 조회 실패 시 가입을 막지 않음 */ }
  return null;
}

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch (e) { return bad("요청을 읽지 못했어요."); }

  const loginId = String(body?.loginId || "").trim().toLowerCase();
  const password = String(body?.password || "");
  const nickname = String(body?.nickname || "").trim();

  // ── 입력 검증(클라이언트 검증을 우회해도 여기서 막힘) ──
  if (!ID_RE.test(loginId)) {
    return bad("아이디는 영문 소문자로 시작하는 4~20자(영문·숫자·밑줄)로 만들어주세요.");
  }
  if (RESERVED.has(loginId)) return bad("사용할 수 없는 아이디예요.");
  if (password.length < 8) return bad("비밀번호는 8자 이상으로 만들어주세요.");
  if (password.length > 72) return bad("비밀번호가 너무 길어요.");
  if (nickname && (nickname.length < 2 || nickname.length > 12)) {
    return bad("닉네임은 2~12자로 입력해주세요.");
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return bad("서버 설정이 준비되지 않았어요.", 500);

  const supa = createClient(url, key, { auth: { persistSession: false } });

  // 대량 가입 차단 — 계정을 만들기 전에 확인
  const ip = clientIp(request);
  const blocked = await signupBlockedReason(supa, ip);
  if (blocked) return bad(blocked, 429);

  const email = loginId + "@" + ID_DOMAIN;

  const { data, error } = await supa.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // 확인 완료 상태로 생성 → 메일 발송 없음
    user_metadata: {
      name: nickname || loginId, // handle_new_user 트리거가 닉네임 생성에 사용
      login_id: loginId,
      signup_type: "id",
    },
  });

  if (error) {
    const msg = String(error.message || "");
    if (/already been registered|already exists|duplicate/i.test(msg)) {
      return bad("이미 사용 중인 아이디예요.", 409);
    }
    return bad("가입에 실패했어요. 잠시 후 다시 시도해주세요.", 500);
  }

  // 아이디 ↔ 계정 연결 기록. 나중에 복구용 이메일을 등록해 로그인 이메일이 바뀌어도
  // 이 표 덕분에 아이디로 계속 로그인할 수 있다.
  const userId = data?.user?.id || null;
  if (userId) {
    const ins = await supa.from("login_ids").insert({ user_id: userId, login_id: loginId });
    if (ins.error) {
      // 연결 기록에 실패하면 로그인이 꼬이므로 만들어진 계정을 되돌린다(중복 아이디 등)
      try { await supa.auth.admin.deleteUser(userId); } catch (e) {}
      if (/duplicate|unique/i.test(String(ins.error.message || ""))) {
        return bad("이미 사용 중인 아이디예요.", 409);
      }
      return bad("가입에 실패했어요. 잠시 후 다시 시도해주세요.", 500);
    }
  }

  // 가입 기록(다음 요청부터 위 제한 계산에 쓰임). 실패해도 가입 자체는 성공 처리.
  try { await supa.from("signup_log").insert({ ip, login_id: loginId }); } catch (e) {}

  return Response.json({ ok: true, userId });
}
