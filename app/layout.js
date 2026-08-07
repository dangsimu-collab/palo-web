import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  metadataBase: new URL("https://commi.kr"),
  title: "commi · 그림 그리는 사람들의 커뮤니티",
  // 검색 결과 설명 문구. 핵심 키워드(그림 커뮤니티·피드백·커미션)를 앞쪽에 두고 155자 이내로 —
  // 너무 길거나 본문과 동떨어지면 구글이 무시하고 페이지 본문을 대신 긁어온다.
  // OG(카톡·트위터 미리보기)도 같은 문구로 맞춰 흔들리지 않게 한다.
  description: "commi는 그림 그리는 사람들의 커뮤니티예요. 창작 과정과 낙서를 공유하고, 서로의 그림에 피드백을 주고받고, 커미션 작가와 의뢰인을 잇습니다.",
  openGraph: {
    title: "commi · 그림 그리는 사람들의 커뮤니티",
    description: "commi는 그림 그리는 사람들의 커뮤니티예요. 창작 과정과 낙서를 공유하고, 서로의 그림에 피드백을 주고받고, 커미션 작가와 의뢰인을 잇습니다.",
    url: "https://commi.kr",
    siteName: "commi",
    type: "website",
    locale: "ko_KR",
    images: [{ url: "/icon-512.png", width: 512, height: 512, alt: "commi" }],
  },
  verification: {
    google: "547vvUq82RlyN5pw6cBSJ8jExJyDfVv90lmBogdjnLk",
    other: {
      "naver-site-verification": "8b684f46a203c43796176b8879d101320ca47d4e",
    },
  },
  icons: {
    // 구글 검색 로고는 48px 이상·정사각·48의 배수 favicon을 골라 쓴다.
    // 큰 PNG(192·512, 둘 다 48의 배수)를 앞에 둬서 32px짜리 대신 이걸 고르게 유도한다.
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
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
  // suppressHydrationWarning: palo.js가 하이드레이션 전에 <html>에 --cm-tabbar-h(하단 탭 높이)를
  // 심기 때문에, React가 서버 HTML과 다르다고 경고하는 것을 막는다.
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
        {/* 글 목록 선요청 — palo.js는 next/script의 afterInteractive라서 React 하이드레이션이
            끝나야(실측 약 2.5초) 실행되고, 그때부터 데이터를 부르기 시작했다.
            이 인라인 스크립트는 HTML 파싱 직후(약 0.1초)에 곧바로 요청을 띄워두므로,
            palo.js가 깨어날 때쯤이면 응답이 이미 도착해 있다. supabase-js가 필요 없도록
            REST를 직접 호출한다. 실패해도 palo.js가 평소대로 다시 부르므로 안전하다. */}
        <Script id="palo-prefetch" strategy="beforeInteractive">
          {`(function(){try{
  var U=${JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_URL || "")};
  var K=${JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "")};
  // palo.js가 하이드레이션보다 먼저 실행되므로, 그 시점엔 window.supabase가 아직 없다.
  // "백엔드가 아예 없는 환경(로컬 데모)"과 "아직 안 온 것"을 구분하는 표식.
  window.__paloHasBackend=!!(U&&K);
  var p=location.pathname;
  if(!(p==="/"||p.indexOf("/board/")===0||p.indexOf("/post/")===0))return; // 목록을 쓰는 화면에서만
  if(!U||!K)return;
  // 로그인 상태면 건너뛴다 — 여기선 anon 권한으로만 읽을 수 있어서,
  // 로그인 사용자에게만 보이는 행(예: 본인의 가려진 글)이 빠질 수 있다.
  for(var i=0;i<localStorage.length;i++){
    var k=localStorage.key(i);
    if(k&&k.indexOf("sb-")===0&&k.indexOf("auth-token")>-1)return;
  }
  var h={apikey:K,Authorization:"Bearer "+K};
  function q(path){
    return fetch(U+"/rest/v1/"+path,{headers:h})
      .then(function(r){return r.ok?r.json():null;})
      .then(function(d){return d?{data:d,error:null}:null;})
      .catch(function(){return null;});
  }
  window.__paloPre={
    posts:q("posts?select=*&order=created_at.desc"),
    profiles:q("profiles?select=id,nickname,level,avatar_url"),
    notices:q("notices?select=*&order=created_at.desc&limit=1"),
    levels:q("level_thresholds?select=*&order=level.asc")
  };
}catch(e){}})();`}
        </Script>
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
