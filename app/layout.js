import "./globals.css";

export const metadata = {
  title: "Palo · 그림 그리는 사람들의 커뮤니티",
  description: "그림 그리는 사람들을 위한 커뮤니티 Palo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
