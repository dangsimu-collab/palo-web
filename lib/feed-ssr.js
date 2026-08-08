// 첫 화면에 넣을 글 목록을 **서버에서 미리 그린다.**
//
// 예전엔 HTML에 회색 자리표시(스켈레톤)만 있고, 브라우저가 palo.js를 받아 실행하고
// 데이터까지 받아온 다음에야 글이 나타났다. 첫 방문자에겐 "글이 없는 사이트"처럼 보였다.
// (재방문자는 localStorage 캐시로 바로 그려지므로 첫 방문만 문제였다.)
//
// ⚠️ 여기서 만드는 마크업은 palo.js의 renderList()가 만드는 것과 **같은 모양**이어야 한다.
//    다르면 palo.js가 다시 그리는 순간 화면이 덜컥 바뀐다. 클래스 이름을 바꿀 땐 양쪽을 같이 고칠 것.
import { createClient } from "@supabase/supabase-js";

// palo.js의 CATMAP과 같은 값 — 글머리 라벨과 색
const CATMAP = {
  talk: ["수다", "talk-c"], ask: ["고민", "help-c"], crit: ["피드백", "crit-c"],
  wip: ["작업과정", "crit-c"], doodle: ["낙서", "talk-c"], tip: ["팁", "tip-c"],
  challenge: ["챌린지", "chal-c"], collab: ["협업", "help-c"], sketch: ["그림공부", "tip-c"],
  trade: ["거래", "free-c"], used: ["중고", "free-c"], review: ["후기", "free-c"],
  vote: ["투표", "chal-c"], request: ["리퀘스트", "free-c"], recruit: ["구인", "free-c"],
  adult: ["에치치", "help-c"], suggest: ["건의", "chal-c"], ilchim: ["일침", "crit-c"],
};

function esc(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// palo.js의 timeAgo와 같은 규칙
function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "방금";
  if (diff < 3600) return Math.floor(diff / 60) + "분 전";
  if (diff < 86400) return Math.floor(diff / 3600) + "시간 전";
  if (diff < 86400 * 7) return Math.floor(diff / 86400) + "일 전";
  const d = new Date(iso);
  return (d.getMonth() + 1) + "/" + d.getDate();
}

function fmtViews(n) {
  n = n || 0;
  return n >= 10000 ? (n / 10000).toFixed(1) + "만" : (n >= 1000 ? (n / 1000).toFixed(1) + "천" : String(n));
}

const PER = 40;

// palo.js의 filteredPosts()와 같은 규칙.
// 홈(전체 글)은 성인·거래·후기를 빼고, 게시판별 화면은 그 게시판 글만.
function visibleFor(board) {
  if (!board || board === "all") {
    return (r) => r.board !== "adult" && r.board !== "trade" && r.board !== "review";
  }
  return (r) => r.board === board;
}

// 서버에서 미리 그리지 않는 게시판
//  · review : 앨범형이라 목록과 마크업이 다르다(다시 그릴 때 화면이 튄다)
//  · adult  : 비공개 게시판
const SSR_SKIP = new Set(["review", "adult"]);

// palo.js의 renderList()가 글이 없을 때 쓰는 것과 같은 마크업
const EMPTY_HTML = '<div class="empty">'
  + '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
  + '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>'
  + '<h3>아직 글이 없어요</h3><p>이 게시판의 첫 글을 남겨보세요.</p>'
  + '<button onclick="openWrite()">글쓰기</button></div>';

export async function renderInitialFeed(board) {
  if (board && SSR_SKIP.has(board)) return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  try {
    const sb = createClient(url, key, { auth: { persistSession: false } });

    let q = sb.from("posts").select("id,title,board,author_id,created_at,views,ip_masked,is_manager_pick")
      .order("created_at", { ascending: false });
    // 게시판별 화면은 그 게시판만 가져오면 되므로 조회량을 줄인다
    if (board && board !== "all") q = q.eq("board", board).limit(PER);
    else q = q.limit(60);

    const [postsRes, profRes] = await Promise.all([q, sb.from("profiles").select("id,nickname")]);
    if (postsRes.error || !postsRes.data) return null;

    const rows = postsRes.data.filter(visibleFor(board)).slice(0, PER);
    // 조회는 됐는데 글이 하나도 없는 게시판이면, 자리표시 대신 "글 없음"을 바로 보여준다.
    // (자리표시를 띄웠다가 곧 "글이 없어요"로 바뀌면 로딩에 실패한 것처럼 보인다)
    if (!rows.length) return EMPTY_HTML;

    const ids = rows.map((r) => r.id);
    const [imgRes, cmRes, likeRes] = await Promise.all([
      sb.from("post_images").select("post_id,url,sort").in("post_id", ids).order("sort"),
      sb.from("comments").select("post_id").in("post_id", ids),
      sb.from("likes").select("post_id").in("post_id", ids),
    ]);

    const nick = {};
    (profRes.data || []).forEach((p) => { nick[p.id] = p.nickname; });
    const imgs = {};
    (imgRes.data || []).forEach((i) => { (imgs[i.post_id] = imgs[i.post_id] || []).push(i.url); });
    const cmCnt = {};
    (cmRes.data || []).forEach((c) => { cmCnt[c.post_id] = (cmCnt[c.post_id] || 0) + 1; });
    const likeCnt = {};
    (likeRes.data || []).forEach((l) => { likeCnt[l.post_id] = (likeCnt[l.post_id] || 0) + 1; });

    const items = rows.map((r) => {
      const cat = CATMAP[r.board] || ["기타", "free-c"];
      const likes = likeCnt[r.id] || 0;
      const cmts = cmCnt[r.id] || 0;
      const pics = imgs[r.id] || [];
      const thumb = pics.length
        ? `<div class="nthumb"><img src="${esc(pics[0])}" alt="" style="width:100%;height:100%;object-fit:cover">${pics.length > 1 ? `<span class="ncount">${pics.length}+</span>` : ""}</div>`
        : "";
      const who = nick[r.author_id] || "익명";
      // ⚠️ 행 전체를 진짜 <a href> 로 만든다(네이버 SEO 가이드 10번 — onclick만 있는 링크는
      //    검색로봇이 URL을 파악하지 못해 다음 글로 타고 갈 수 없다).
      //    palo.js가 로드되면 목록을 다시 그리며 SPA 동작(onclick)으로 바뀌지만,
      //    검색로봇과 'JS 로드 전 클릭'은 이 링크로 /post/N 에 도달한다 — 오히려 나아진 폴백.
      return `<a href="/post/${r.id}" class="post rip${likes >= 90 ? " hot-post" : ""}">`
        + `<div class="pmain">`
        + `<div class="ptitle">${r.is_manager_pick ? '<span class="pick-badge">📌 매니저 픽</span> ' : ""}${esc(r.title)}</div>`
        + `<div class="pmeta">`
        + `<span class="cat ${cat[1]}">${cat[0]}</span>`
        + `<span class="who">${esc(who)}</span>`
        + `<span class="sep"></span><span class="mt">${timeAgo(r.created_at)}</span>`
        + `<span class="sep"></span><span class="mv">조회 ${fmtViews(r.views)}</span>`
        + (likes ? `<span class="sep"></span><span class="ml">추천 ${likes}</span>` : "")
        + `</div></div>`
        + thumb
        + `<div class="pcmt"><span class="cn${cmts ? " has" : ""}">${cmts}</span><span class="cl">댓글</span></div>`
        + `</a>`;
    }).join("");

    return `<div class="list">${items}</div>`;
  } catch (e) {
    return null; // 실패하면 예전처럼 스켈레톤이 보인다(빈 화면이 되진 않는다)
  }
}
