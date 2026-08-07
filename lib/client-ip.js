// 요청의 실제 접속 IP를 신뢰할 수 있는 값으로만 읽는다.
//
// ⚠️ 클라이언트가 위조할 수 있는 헤더를 믿으면 안 된다.
//  · cf-connecting-ip : 우리는 Cloudflare 프록시(주황 구름) 뒤가 아니라 DNS-only라,
//    이 헤더는 클라이언트가 아무 값이나 넣을 수 있다 → 신뢰하지 않는다.
//  · x-forwarded-for : "클라이언트가 넣은 값…, Vercel이 붙인 실제 IP" 순이라 첫 값은 위조 가능.
//    **맨 뒤 값**(Vercel 엣지가 붙인 것)이 실제 접속 IP다.
// Vercel이 직접 채우는 x-real-ip를 우선 쓰고, 없으면 x-forwarded-for의 맨 뒤 값을 쓴다.
export function clientIp(request) {
  const h = request.headers;
  const xff = h.get("x-forwarded-for") || "";
  const xffLast = xff.split(",").map((s) => s.trim()).filter(Boolean).pop() || "";
  return ((h.get("x-real-ip") || "").trim() || xffLast) || null;
}

// 아주 가벼운 IP별 요청 제한(무료·무설정). 서버리스에서 인스턴스가 살아있는 동안에만
// 기억하므로 완벽하진 않지만, 같은 회선에서 순식간에 쏟아지는 무차별 대입을 크게 늦춘다.
// (근본적인 로그인 무차별 대입 방지는 Supabase 대시보드의 Auth Rate Limits가 담당한다.)
const _buckets = new Map();
export function rateLimit(key, { limit = 10, windowMs = 60000 } = {}) {
  const now = Date.now();
  const arr = (_buckets.get(key) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  _buckets.set(key, arr);
  // 메모리가 무한정 자라지 않게 가끔 오래된 키를 청소
  if (_buckets.size > 5000) {
    for (const [k, v] of _buckets) {
      if (!v.length || now - v[v.length - 1] > windowMs) _buckets.delete(k);
    }
  }
  return { blocked: arr.length > limit, count: arr.length };
}
