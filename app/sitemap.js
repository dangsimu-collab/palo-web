import { createClient } from '@supabase/supabase-js';

const BASE = 'https://commi.kr';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const BOARDS = [
  'intro', 'talk', 'doodle', 'wip', 'sketch', 'ask', 'vote', 'crit',
  'collab', 'challenge', 'tip', 'request', 'recruit', 'used', 'suggest',
];

// 사이트맵을 1시간마다 새로 생성(새 글·커미션 반영)
export const revalidate = 3600;

export default async function sitemap() {
  const now = new Date();

  const staticUrls = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'hourly', priority: 1 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const boardUrls = BOARDS.map((b) => ({
    url: `${BASE}/board/${b}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.6,
  }));

  let postUrls = [];
  let commissionUrls = [];

  try {
    const { data: posts } = await supabase
      .from('posts')
      .select('id, created_at')
      .neq('board', 'adult') // 성인 게시판 글은 검색 노출 제외
      .order('created_at', { ascending: false })
      .limit(5000);
    postUrls = (posts || []).map((p) => ({
      url: `${BASE}/post/${p.id}`,
      lastModified: p.created_at ? new Date(p.created_at) : now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (e) {}

  try {
    const { data: cms } = await supabase
      .from('commissions')
      .select('id, created_at, status')
      .order('created_at', { ascending: false })
      .limit(2000);
    commissionUrls = (cms || [])
      .filter((c) => c.status === 'open')
      .map((c) => ({
        url: `${BASE}/commission/${c.id}`,
        lastModified: c.created_at ? new Date(c.created_at) : now,
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
  } catch (e) {}

  return [...staticUrls, ...boardUrls, ...commissionUrls, ...postUrls];
}
