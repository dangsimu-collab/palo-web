'use client';

import Script from 'next/script';
import DOMPurify from 'dompurify';
import { BODY_HTML, FEED_SKELETON } from './body-html';
import { supabase } from '../lib/supabaseClient';

if (typeof window !== 'undefined') {
  window.supabase = supabase;
  window.DOMPurify = DOMPurify;
  window.VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';
  // palo.js는 이 모듈(하이드레이션)보다 먼저 실행되므로, 그 시점엔 supabase가 없다.
  // 준비됐음을 알려 로그인·실데이터 로딩을 이어서 시작하게 한다.
  window.dispatchEvent(new Event('palo-supabase-ready'));
}

// palo.js를 next/script 대신 서버 HTML에 직접 넣는다.
// next/script의 afterInteractive는 React 하이드레이션이 끝나야 실행돼서(실측 약 2.5초)
// 그때까지 화면이 비어 있었다. BODY_HTML 끝에 붙이면 브라우저가 HTML을 파싱하면서
// 곧바로 실행하므로, 위쪽 DOM은 이미 만들어져 있고 하이드레이션도 기다리지 않는다.
// (앱 내 이동은 전부 <a href>라 클라이언트 라우팅으로 이 HTML이 재삽입될 일은 없다.)
const APP_TAIL = `<script src="/palo.js?v=${process.env.NEXT_PUBLIC_BUILD_ID}"></script>`;

// preconnect용 — 키가 아니라 주소만 쓴다
const SUPABASE_ORIGIN = (() => {
  try { return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin; } catch { return ''; }
})();

export default function PaloApp({ initialFeed }) {
  // 서버에서 그린 글 목록을 자리표시 위치에 끼워 넣는다.
  // 못 그렸으면(설정 누락·조회 실패) 예전처럼 스켈레톤을 보여준다 — 빈 화면이 되지는 않는다.
  const appHtml = BODY_HTML.replace('<!--PALO_FEED-->', initialFeed || FEED_SKELETON) + APP_TAIL;
  return (
    <>
      {/* 화면을 그리는 건 palo.js 하나뿐인데, React 청크 192KB와 대역폭을 나눠 쓰느라
          받는 데 오래 걸렸다(실측 835ms). 미리 높은 우선순위로 당겨온다.
          Supabase는 미리 연결해두면 데이터 요청 때 DNS·TLS 왕복을 아낀다. */}
      <link rel="preload" as="script" fetchPriority="high" href={`/palo.js?v=${process.env.NEXT_PUBLIC_BUILD_ID}`} />
      {SUPABASE_ORIGIN && <link rel="preconnect" href={SUPABASE_ORIGIN} crossOrigin="anonymous" />}
      {/* palo.js가 하이드레이션 전에 이 안의 DOM을 이미 바꿔놓기 때문에(글 목록 렌더 등)
          React가 서버 HTML과 다르다고 경고한다. 이 영역은 palo.js가 소유하므로 대조를 끈다. */}
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: appHtml }} />
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
    </>
  );
}
