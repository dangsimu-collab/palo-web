/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  env: {
    // 배포마다 값이 바뀌어서 /palo.js를 매번 새로 받아오게 함(브라우저가 예전 palo.js를 캐시해서
    // 방금 고친 버그가 다시 나타나는 것처럼 보이는 문제 방지). Vercel이 자동으로 채워줌,
    // 로컬 개발 서버에서는 값이 없어서 대신 빌드 시각을 씀.
    NEXT_PUBLIC_BUILD_ID: process.env.VERCEL_GIT_COMMIT_SHA || String(Date.now()),
  },
  // 모든 응답에 붙이는 보안 헤더.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // 클릭재킹 방지: 우리 사이트를 남의 페이지 iframe 안에 넣지 못하게 한다.
          // (투명 iframe으로 씌워 사용자 클릭을 가로채는 공격 차단)
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // MIME 스니핑 방지: 브라우저가 Content-Type을 멋대로 바꿔 해석하지 못하게 한다.
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // 리퍼러 최소화: 외부로 나갈 때 전체 주소(쿼리 포함)를 흘리지 않는다.
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // 쓰지 않는 강력한 브라우저 권한을 기본 차단.
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), payment=(), usb=()' },
        ],
      },
    ];
  },
  // 검색 중복 방지: vercel 기본 도메인으로 들어오면 commi.kr로 영구 이동(정규 도메인 통일)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'palo-web-nu.vercel.app' }],
        destination: 'https://commi.kr/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
