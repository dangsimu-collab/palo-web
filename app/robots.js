export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin'],
    },
    sitemap: 'https://commi.kr/sitemap.xml',
    host: 'https://commi.kr',
  };
}
