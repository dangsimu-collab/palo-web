// 아이디 + 비밀번호 회원가입(이메일 불필요).
// Supabase Auth는 내부적으로 이메일이 필요하므로 "아이디@내부도메인"으로 매핑해 계정을 만든다.
// 서버에서 email_confirm:true로 생성 → 인증 메일을 아예 보내지 않으므로
// 대시보드의 "Confirm email" 설정과 무관하게 항상 즉시 가입이 완료된다.
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const ID_DOMAIN = "users.commi.kr";        // 실제로 메일을 받지 않는 내부 전용 도메인
const ID_RE = /^[a-z][a-z0-9_]{3,19}$/;    // 영문 소문자로 시작, 영문·숫자·밑줄 4~20자
const RESERVED = new Set([
  "admin", "administrator", "root", "system", "commi", "official", "master",
  "manager", "operator", "support", "help", "test", "guest", "anonymous", "null", "undefined",
]);

function bad(message, status = 400) {
  return Response.json({ ok: false, message }, { status });
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

  return Response.json({ ok: true, userId: data?.user?.id || null });
}
