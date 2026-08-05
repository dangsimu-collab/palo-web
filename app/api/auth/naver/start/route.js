// 네이버 로그인 시작 지점(서버). '네이버로 로그인' 버튼이 이 주소로 이동하면,
// 여기서 CSRF 방지용 state를 만들어 쿠키에 저장하고, 네이버 인증 페이지로 리다이렉트한다.
export const runtime = "nodejs";

// 현재 접속한 도메인(commi.kr / 배포주소 / localhost)을 그대로 사용해 콜백 주소를 만든다.
function siteBase(request) {
  const h = request.headers;
  const proto = h.get("x-forwarded-proto") || "https";
  const host = h.get("x-forwarded-host") || h.get("host") || "commi.kr";
  return proto + "://" + host;
}

export async function GET(request) {
  const clientId = process.env.NAVER_CLIENT_ID;
  if (!clientId) return new Response("NAVER_CLIENT_ID 환경변수가 설정되지 않았어요.", { status: 500 });

  const base = siteBase(request);
  const redirectUri = base + "/api/auth/naver/callback"; // 네이버 개발자센터에 등록한 Callback URL과 일치해야 함
  const state = crypto.randomUUID(); // 위조 방지용 1회성 값

  const authorizeUrl =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code" +
    "&client_id=" + encodeURIComponent(clientId) +
    "&redirect_uri=" + encodeURIComponent(redirectUri) +
    "&state=" + encodeURIComponent(state);

  const secure = base.startsWith("https") ? "; Secure" : ""; // 로컬(http)에선 Secure 빼야 쿠키가 전달됨
  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl,
      "Set-Cookie": "nv_state=" + state + "; Path=/; HttpOnly; SameSite=Lax; Max-Age=600" + secure,
    },
  });
}
