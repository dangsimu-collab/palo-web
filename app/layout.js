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
      {/* 글 목록 선요청. <head> 맨 앞의 평범한 인라인 스크립트로 둔다 —
          next/script의 beforeInteractive로 <body>에 두면 실제로는 문서 파싱이 끝난 뒤
          (실측 585ms)에야 실행돼서, 정작 데이터가 도착하는 시점이 1.2초까지 밀렸다.
          여기서는 HTML 첫 조각이 오자마자(약 50ms) 요청이 나가므로 그만큼 통째로 앞당겨진다.
          supabase-js를 기다리지 않으려고 REST를 직접 호출한다.
          실패하면 그냥 null을 남기고, palo.js가 평소 경로로 다시 부르므로 안전하다. */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
  var U=${JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_URL || "")};
  var K=${JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "")};
  // palo.js가 하이드레이션보다 먼저 실행되므로, 그 시점엔 window.supabase가 아직 없다.
  // "백엔드가 아예 없는 환경(로컬 데모)"과 "아직 안 온 것"을 구분하는 표식.
  window.__paloHasBackend=!!(U&&K);
  var p=location.pathname;
  if(!(p==="/"||p.indexOf("/board/")===0||p.indexOf("/post/")===0))return; // 목록을 쓰는 화면에서만
  if(!U||!K)return;
  // 로그인한 사람은 anon 권한으로 읽으면 본인에게만 보이는 행이 빠진다.
  // 그래서 저장된 세션의 토큰을 그대로 빌려 쓴다 — supabase-js가 보내는 것과 같은 요청이 된다.
  // 토큰이 없거나 곧 만료면 선요청을 접고 평소 경로에 맡긴다(틀린 데이터를 보여주지 않으려고).
  var tok=null,found=false;
  for(var i=0;i<localStorage.length;i++){
    var k=localStorage.key(i);
    if(!(k&&k.indexOf("sb-")===0&&k.indexOf("auth-token")>-1))continue;
    found=true;
    try{
      var v=localStorage.getItem(k)||"";
      if(v.indexOf("base64-")===0){                 // 최신 supabase-js는 base64로 저장한다
        var b=atob(v.slice(7)),u8=new Uint8Array(b.length);
        for(var j=0;j<b.length;j++)u8[j]=b.charCodeAt(j);
        v=new TextDecoder().decode(u8);             // 닉네임 등 한글이 깨지지 않게
      }
      var s=JSON.parse(v);
      if(s&&s.access_token&&s.expires_at&&s.expires_at*1000>Date.now()+30000)tok=s.access_token;
    }catch(e){}
    break;
  }
  if(found&&!tok)return;
  var h={apikey:K,Authorization:"Bearer "+(tok||K)};
  function q(path,init){
    return fetch(U+"/rest/v1/"+path,init?Object.assign({headers:h},init):{headers:h})
      .then(function(r){return r.ok?r.json():null;})
      .then(function(d){return d?{data:d,error:null}:null;})
      .catch(function(){return null;});
  }
  // 1차로 함께 나가는 7개를 전부 여기서 띄운다. 하나라도 빠지면 palo.js가 깨어난 뒤에야
  // 그것만 새로 부르게 되고, Promise.all은 제일 늦은 것을 기다리므로 그만큼 통째로 밀린다.
  var now=new Date().toISOString();
  window.__paloPre={
    posts:q("posts?select=*&order=created_at.desc"),
    profiles:q("profiles?select=id,nickname,level,avatar_url"),
    notices:q("notices?select=*&order=created_at.desc&limit=1"),
    levels:q("level_thresholds?select=*&order=level.asc"),
    ads:q("user_ads?select=id,image_url,linked_post_id,linked_commission_id,points_spent&status=eq.active&expires_at=gt."+encodeURIComponent(now)),
    adLocks:q("user_ads?select=linked_post_id,linked_commission_id,status,expires_at&status=in.(pending,active)"),
    camps:q("rpc/get_servable_ads",{method:"POST",headers:Object.assign({"Content-Type":"application/json"},h),body:"{}"})
  };
}catch(e){}})();`,
          }}
        />
      </head>
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
