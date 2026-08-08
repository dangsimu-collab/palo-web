import { createClient } from '@supabase/supabase-js';

const BASE = 'https://commi.kr';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// 30분마다 새로 생성
export const revalidate = 1800;

function xmlEsc(s) {
  return String(s || '').replace(/[<>&'"]/g, (c) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
  }[c]));
}

export async function GET() {
  let posts = [];
  try {
    const { data } = await supabase
      .from('posts')
      .select('id, title, content, created_at')
      .neq('board', 'adult')
      .order('created_at', { ascending: false })
      .limit(50);
    posts = data || [];
  } catch (e) {}

  const items = posts.map((p) => {
    const link = `${BASE}/post/${p.id}`;
    // 본문 전체를 담는다 — 네이버 가이드: "최신글은 본문 전체를 포함하여 RSS 피드에 담아주세요"
    // (예전엔 200자로 잘랐다. content는 순수 텍스트 버전이라 태그 걱정 없이 그대로 쓴다)
    const desc = (p.content || '').trim();
    const date = p.created_at ? new Date(p.created_at).toUTCString() : new Date().toUTCString();
    return `<item><title>${xmlEsc(p.title)}</title><link>${link}</link><guid>${link}</guid><description>${xmlEsc(desc)}</description><pubDate>${date}</pubDate></item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>commi · 그림 그리는 사람들의 커뮤니티</title><link>${BASE}</link><description>그림 그리는 사람들을 위한 커뮤니티 commi</description><language>ko</language>${items}</channel></rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
