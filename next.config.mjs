/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  env: {
    // 배포마다 값이 바뀌어서 /palo.js를 매번 새로 받아오게 함(브라우저가 예전 palo.js를 캐시해서
    // 방금 고친 버그가 다시 나타나는 것처럼 보이는 문제 방지). Vercel이 자동으로 채워줌,
    // 로컬 개발 서버에서는 값이 없어서 대신 빌드 시각을 씀.
    NEXT_PUBLIC_BUILD_ID: process.env.VERCEL_GIT_COMMIT_SHA || String(Date.now()),
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
