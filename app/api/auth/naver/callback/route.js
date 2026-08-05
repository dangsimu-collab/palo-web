// 네이버 로그인 콜백(서버). 네이버가 인증 후 이 주소로 돌려보내면:
//  1) state(위조 방지) 확인
//  2) code를 네이버 토큰으로 교환하고 프로필(이메일·닉네임) 조회
//  3) 그 이메일로 Supabase 계정을 만들거나(이미 있으면 그 계정에 연결) 로그인 링크 발급
//  4) 로그인 링크로 리다이렉트 → 브라우저에 Supabase 세션이 들어가며 로그인 완료
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function siteBase(request) {
  const h = request.headers;
  const proto = h.get("x-forwarded-proto") || "https";
  const host = h.get("x-forwarded-host") || h.get("host") || "commi.kr";
  return proto + "://" + host;
}
function getCookie(request, name) {
  const c = request.headers.get("cookie") || "";
  const m = c.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}
// 실패 시 commi 홈으로 돌려보내며 사유를 알림(프론트에서 토스트로 표시). state 쿠키도 정리.
function fail(base, reason) {
  return new Response(null, {
    status: 302,
    headers: { Location: base + "/?login_error=" + reason, "Set-Cookie": "nv_state=; Path=/; Max-Age=0" },
  });
}

export async function GET(request) {
  const base = siteBase(request);
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = getCookie(request, "nv_state");
  if (!code || !state || !cookieState || state !== cookieState) return fail(base, "state");

  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;
  if (!clientId || !clientSecret) return fail(base, "config");

  // 1) code → 네이버 access token
  let accessToken;
  try {
    const tokenUrl =
      "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code" +
      "&client_id=" + encodeURIComponent(clientId) +
      "&client_secret=" + encodeURIComponent(clientSecret) +
      "&code=" + encodeURIComponent(code) +
      "&state=" + encodeURIComponent(state);
    const tr = await fetch(tokenUrl, { cache: "no-store" });
    const tj = await tr.json();
    accessToken = tj.access_token;
  } catch (e) {}
  if (!accessToken) return fail(base, "token");

  // 2) 네이버 프로필(이메일·닉네임·프로필사진)
  let prof;
  try {
    const mr = await fetch("https://openapi.naver.com/v1/nid/me", {
      headers: { Authorization: "Bearer " + accessToken },
      cache: "no-store",
    });
    const mj = await mr.json();
    prof = mj.response || {};
  } catch (e) {}
  const email = prof && prof.email;
  if (!email) return fail(base, "no_email"); // 이메일 제공에 동의 안 했거나 이메일 없음
  const nickname = prof.nickname || prof.name || "새싹작가";

  // 3) Supabase 관리자(service_role)로 계정 생성/연결 + 로그인 링크 발급
  const supa = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  // 같은 이메일 계정이 이미 있으면(구글 등으로 가입) createUser는 에러를 돌려주는데, 그건 무시하고
  // 아래 generateLink가 그 기존 계정으로 로그인시킴 → 이메일 기준 단일 계정(중복 방지·자동 연결).
  await supa.auth.admin.createUser({
    email,
    email_confirm: true, // 네이버가 검증한 이메일이므로 확인됨으로 처리
    user_metadata: {
      name: nickname, // handle_new_user 트리거가 이 값으로 닉네임 자동 생성
      full_name: prof.name || nickname,
      avatar_url: prof.profile_image || null,
      provider: "naver",
      naver_id: prof.id || null,
    },
  });

  const { data: link, error: linkErr } = await supa.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: { redirectTo: base + "/" },
  });
  if (linkErr || !link || !link.properties || !link.properties.action_link) return fail(base, "link");

  // 4) 로그인 링크로 리다이렉트 → 브라우저 세션 설정 후 commi 홈으로 복귀(로그인 완료)
  return new Response(null, {
    status: 302,
    headers: { Location: link.properties.action_link, "Set-Cookie": "nv_state=; Path=/; Max-Age=0" },
  });
}
