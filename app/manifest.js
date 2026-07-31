// Next.js가 이 파일로 /manifest.webmanifest 를 자동 생성하고 <link rel="manifest">를 넣어줌.
// 홈 화면 추가(PWA 설치)·아이콘·시작화면 색 등을 정의.
export default function manifest() {
  return {
    name: "Palo · 그림 그리는 사람들의 커뮤니티",
    short_name: "Palo",
    description: "그림 그리는 사람들을 위한 커뮤니티 Palo",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fbf7f8",
    theme_color: "#e07aa6",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
