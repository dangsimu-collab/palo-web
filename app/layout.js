import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  metadataBase: new URL("https://commi.kr"),
  title: "commi · 그림 그리는 사람들의 커뮤니티",
  description: "그림 그리는 사람들을 위한 커뮤니티 commi. 창작 이야기·피드백·커미션까지, 잘 그린 그림보다 그리는 이야기가 먼저인 곳.",
  openGraph: {
    title: "commi · 그림 그리는 사람들의 커뮤니티",
    description: "그림 그리는 사람들을 위한 커뮤니티 commi",
    url: "https://commi.kr",
    siteName: "commi",
    type: "website",
    images: [{ url: "/icon-512.png", width: 512, height: 512, alt: "commi" }],
  },
  verification: {
    google: "547vvUq82RlyN5pw6cBSJ8jExJyDfVv90lmBogdjnLk",
    other: {
      "naver-site-verification": "8b684f46a203c43796176b8879d101320ca47d4e",
    },
  },
  icons: {
    icon: [{ url: "/favicon-32.png", sizes: "32x32", type: "image/png" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: { capable: true, title: "commi", statusBarStyle: "default" },
};

export const viewport = {
  themeColor: "#e07aa6",
  // 입력창(14~15px) 포커스 시 iOS가 화면을 자동 확대하는 것 방지 — 앱처럼 고정 배율
  maximumScale: 1,
  userScalable: false,
};

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// 구조화 데이터(JSON-LD): 검색엔진이 사이트 정체성을 이해하도록
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", name: "commi", url: "https://commi.kr", inLanguage: "ko" },
    { "@type": "Organization", name: "commi", url: "https://commi.kr", logo: "https://commi.kr/icon-512.png" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
        {children}
        <Analytics />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
