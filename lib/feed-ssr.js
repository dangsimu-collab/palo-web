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

// 홈(전체 글)에 보이는 규칙 — palo.js의 filteredPosts()와 같게 맞춘다
function visibleOnHome(row) {
  return row.board !== "adult" && row.board !== "trade" && row.board !== "review";
}

export async function renderInitialFeed() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  try {
    const sb = createClient(url, key, { auth: { persistSession: false } });

    const [postsRes, profRes] = await Promise.all([
      sb.from("posts").select("id,title,board,author_id,created_at,views,ip_masked,is_manager_pick")
        .order("created_at", { ascending: false }).limit(60),
      sb.from("profiles").select("id,nickname"),
    ]);
    if (postsRes.error || !postsRes.data) return null;

    const rows = postsRes.data.filter(visibleOnHome).slice(0, PER);
    if (!rows.length) return null;

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
      // 클릭 동작은 palo.js가 다시 그린 뒤에 붙는다. 그 전에 눌러도 글이 열리도록
      // 같은 onclick을 넣어두면 palo.js가 아직 없을 때 오류가 나므로, 여기선 모양만 만든다.
      return `<div class="post rip${likes >= 90 ? " hot-post" : ""}">`
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
        + `</div>`;
    }).join("");

    return `<div class="list">${items}</div>`;
  } catch (e) {
    return null; // 실패하면 예전처럼 스켈레톤이 보인다(빈 화면이 되진 않는다)
  }
}
