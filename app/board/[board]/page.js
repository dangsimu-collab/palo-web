import PaloApp from '../../PaloApp';

const BOARD_NAMES = {
  talk: '수다 광장', doodle: '낙서', wip: '작업물', sketch: '그림공부',
  ask: '질문/시세문의', vote: '투표/수요조사', crit: '피드백 요청',
  collab: '협업/팀원모집', challenge: '챌린지', tip: '자료/TIP',
  request: '리퀘스트', recruit: '커미션 구인', used: '중고 장비',
  adult: '에치치', suggest: '버그·건의사항',
};

export async function generateMetadata({ params }) {
  const { board } = await params;
  const name = BOARD_NAMES[board];
  if (!name) {
    return { title: 'commi · 그림 그리는 사람들의 커뮤니티' };
  }
  const title = `${name} · commi`;
  const description = `commi의 ${name} 게시판 — 그림 그리는 사람들의 커뮤니티`;
  return { title, description, openGraph: { title, description, images: ['/icon-512.png'] } };
}

export default function BoardPage() {
  return <PaloApp />;
}
