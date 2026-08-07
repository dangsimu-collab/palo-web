// 아이디 + 비밀번호 로그인.
// 복구용 이메일을 등록하면 계정의 로그인 이메일이 실제 이메일로 바뀌므로,
// login_ids 표에서 아이디에 연결된 계정을 찾아 그 계정의 이메일로 로그인시킨다.
// (이메일 자체는 응답에 담지 않는다 — 아이디만 알면 남의 이메일을 알아낼 수 있으면 안 되므로)
import { createClient } from "@supabase/supabase-js";
import { clientIp, rateLimit } from "../../../../lib/client-ip";

export const runtime = "nodejs";

const ID_DOMAIN = "users.commi.kr";
const ID_RE = /^[a-z][a-z0-9_]{3,19}$/;

function fail(message, status = 400) {
  return Response.json({ ok: false, message }, { status });
}

export async function POST(request) {
  // 무차별 대입 완화: 같은 회선에서 1분에 20회를 넘으면 잠시 막는다.
  // (이 라우트는 폴백 경로이고, 근본 방어는 Supabase Auth Rate Limits가 담당한다.)
  const ip = clientIp(request);
  if (ip && rateLimit("login:" + ip, { limit: 20, windowMs: 60000 }).blocked) {
    return fail("잠시 후 다시 시도해주세요.", 429);
  }

  let body;
  try { body = await request.json(); } catch (e) { return fail("요청을 읽지 못했어요."); }

  const loginId = String(body?.loginId || "").trim().toLowerCase();
  const password = String(body?.password || "");
  if (!loginId || !password) return fail("아이디와 비밀번호를 입력해주세요.");
  if (!ID_RE.test(loginId)) return fail("아이디 또는 비밀번호가 맞지 않아요.", 401);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !serviceKey || !anonKey) return fail("서버 설정이 준비되지 않았어요.", 500);

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  // 1) 아이디로 계정 찾기 → 그 계정의 현재 로그인 이메일
  let email = null;
  const { data: row } = await admin
    .from("login_ids").select("user_id").eq("login_id", loginId).maybeSingle();
  if (row?.user_id) {
    const { data: u } = await admin.auth.admin.getUserById(row.user_id);
    email = u?.user?.email || null;
  }
  // 연결 기록이 없는 예전 계정은 기본 규칙(아이디@내부도메인)으로 시도
  if (!email) email = loginId + "@" + ID_DOMAIN;

  // 2) 비밀번호로 실제 로그인 (비밀번호 검증은 Supabase가 수행)
  const pub = createClient(url, anonKey, { auth: { persistSession: false } });
  const { data, error } = await pub.auth.signInWithPassword({ email, password });
  if (error || !data?.session) {
    return fail("아이디 또는 비밀번호가 맞지 않아요.", 401);
  }

  // 3) 브라우저가 세션을 이어받을 수 있도록 토큰만 전달
  return Response.json({
    ok: true,
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  });
}
