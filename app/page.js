import PaloApp from './PaloApp';
import { renderInitialFeed } from '../lib/feed-ssr';

// 글 목록을 서버에서 그려 HTML에 담아 보낸다 — 첫 방문자가 빈 화면을 보지 않게.
// 30초마다 다시 만들어 캐시하므로 응답은 정적 페이지만큼 빠르고, DB 부하도 거의 없다.
// (약간 오래된 목록이 잠깐 보일 수 있지만, palo.js가 곧 최신으로 바꾼다.)
export const revalidate = 30;

export default async function Home() {
  const initialFeed = await renderInitialFeed();
  return <PaloApp initialFeed={initialFeed} />;
}
