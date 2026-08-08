var BOARDS=[
  {group:"이야기",items:[
    {id:"all",name:"전체 글",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"7\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M3 7l2-3h6l2 3\"/></svg>"},
    {id:"talk",name:"수다",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z\"/></svg>"}]},
  {group:"그리는 중",items:[
    {id:"doodle",name:"낙서",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 15c2.5-6 5 5 8-1s4-6 10 1\"/></svg>"},
    {id:"wip",name:"작업물",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 20h4L18 10l-4-4L4 16v4z\"/><path d=\"M13 7l4 4\"/></svg>"},
    {id:"sketch",name:"그림공부",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 6C10 4 6 4 3 5v14c3-1 7-1 9 1 2-2 6-2 9-1V5c-3-1-7-1-9 1z\"/><path d=\"M12 6v14\"/></svg>"}]},
  {group:"궁금해요",items:[
    {id:"ask",name:"질문/시세문의",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7M12 17h.01\"/></svg>"},
    {id:"vote",name:"투표/수요조사",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"14\"/><line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"4\"/><line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"10\"/></svg>"},
    {id:"crit",name:"피드백 요청",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>"},
    {id:"ilchim",name:"일침",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13 2L4.5 12.5h6L11 22l8.5-10.5h-6z\"/></svg>"}]},
  {group:"함께",items:[
    {id:"collab",name:"협업/팀원모집",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75\"/></svg>"},
    {id:"challenge",name:"챌린지",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 3v18\"/><path d=\"M5 4h13l-2 4 2 4H5\"/></svg>"},
    {id:"tip",name:"자료/TIP",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 4 2 9l10 5 10-5-10-5z\"/><path d=\"M6 11v5c0 1 3 2 6 2s6-1 6-2v-5\"/></svg>"}]},
  {group:"거래",trade:true,items:[
    {id:"request",name:"리퀘스트",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 11V6a2 2 0 0 0-4 0v5\"/><path d=\"M14 10V4a2 2 0 0 0-4 0v6\"/><path d=\"M10 10.5V6a2 2 0 0 0-4 0v8\"/><path d=\"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8\"/></svg>"},
    {id:"recruit",name:"구인",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"13.5\" cy=\"6.5\" r=\"1\"/><circle cx=\"17.5\" cy=\"10.5\" r=\"1\"/><circle cx=\"8.5\" cy=\"7.5\" r=\"1\"/><circle cx=\"6.5\" cy=\"12.5\" r=\"1\"/><path d=\"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.4 0 2.5-1.1 2.5-2.5 0-.6-.2-1.2-.6-1.6-.4-.4-.6-.9-.6-1.4 0-1.1.9-2 2-2H16c3.3 0 6-2.7 6-6 0-5-4.5-8.5-10-8.5z\"/></svg>"},
    {id:"used",name:"중고",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 12l8-8h6a2 2 0 0 1 2 2v6l-8 8z\"/><circle cx=\"15\" cy=\"9\" r=\"1.4\" fill=\"currentColor\" stroke=\"none\"/></svg>"}]},
  {group:"기타",items:[
    {id:"suggest",name:"버그·건의사항",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z\"/><path d=\"M12 9v3M12 15h.01\"/></svg>"},
    {id:"adult",name:"에치치",icon:"<span class=\"ic\" style=\"font-size:18px;line-height:1\">🔞</span>"}]}
];
// 성인(에치치) 게시판 노출 스위치 — 네이버 로그인 검수 기간 동안 비공개.
// 검수 승인 후 다시 열려면 이 값만 true로 바꾸면 됨(게시판 정의·라벨·안내문구는 그대로 남아 있음).
var ADULT_BOARD_ENABLED=false;
if(!ADULT_BOARD_ENABLED){
  BOARDS.forEach(function(g){g.items=g.items.filter(function(b){return b.id!=="adult";});});
  BOARDS=BOARDS.filter(function(g){return g.items.length;}); // 항목이 없어진 그룹은 메뉴에서 숨김
}
var CATMAP={talk:{label:"수다",cls:"talk-c"},ask:{label:"고민",cls:"help-c"},crit:{label:"피드백",cls:"crit-c"},
  wip:{label:"작업과정",cls:"crit-c"},doodle:{label:"낙서",cls:"talk-c"},tip:{label:"팁",cls:"tip-c"},challenge:{label:"챌린지",cls:"chal-c"},collab:{label:"협업",cls:"help-c"},
  sketch:{label:"그림공부",cls:"tip-c"},trade:{label:"거래",cls:"free-c"},used:{label:"중고",cls:"free-c"},
  review:{label:"후기",cls:"free-c"},vote:{label:"투표",cls:"chal-c"},request:{label:"리퀘스트",cls:"free-c"},recruit:{label:"구인",cls:"free-c"},adult:{label:"에치치",cls:"help-c"},suggest:{label:"건의",cls:"chal-c"},ilchim:{label:"일침",cls:"crit-c"}};

var postsLoaded=false; // loadRealPosts()가 실제 글을 POSTS에 합친 뒤 true — 이 전에는 데모 글로 renderList()를 강제로 돌리지 않음(로그인 리다이렉트 직후 더미 글이 잠깐 보이는 버그 방지)
var userLeftHome=false; // 초기 로딩이 끝나기 전에 사용자가 피드(홈) 밖 화면(커미션/채팅/글쓰기/프로필/글·유저 상세)으로 이동했으면 true — loadRealPosts() 완료 시 홈으로 강제 복귀시키지 않기 위함
// 하단 탭 경합(레이스) 방지: 사용자가 "마지막으로 선택한" 최상위 탭을 기록. 각 탭 함수가 눌리는 즉시(동기) 갱신하고,
// 비동기 로딩이 뒤늦게 끝나 화면을 그리기 직전에 "아직 내가 이 탭인가?"를 확인해, 이전 탭 결과가 현재 화면을 덮어쓰지 않게 한다.
/* ===== 디자인 시안 전환기 (A~D) =====
   로그인 화면과 내 정보 화면의 겉모습만 바꾼다. 기능·구조는 그대로.
   주소에 ?skin=a 처럼 붙이면 전환기가 뜨고, 고른 값은 브라우저에 저장된다.
   ⚠️ 고르고 나면 이 전환기와 안 쓰는 시안 CSS는 지울 것(임시 도구다). */
var SKINS={a:"글래스모피즘",b:"심플·미니멀",c:"머터리얼",d:"플루언트"};
function applySkin(k){
  if(k&&SKINS[k]){document.documentElement.setAttribute("data-skin",k);try{localStorage.setItem("palo_skin",k);}catch(e){}}
  else{document.documentElement.removeAttribute("data-skin");try{localStorage.removeItem("palo_skin");}catch(e){}}
  var bar=document.getElementById("skinBar");if(bar)renderSkinBar();
}
function renderSkinBar(){
  var cur=document.documentElement.getAttribute("data-skin")||"";
  var bar=document.getElementById("skinBar");if(!bar)return;
  bar.innerHTML='<span class="sk-t">디자인</span>'+
    Object.keys(SKINS).map(function(k){
      return '<button class="sk-b'+(cur===k?" on":"")+'" onclick="applySkin(&quot;'+k+'&quot;)">'+k.toUpperCase()+'</button>';
    }).join('')+
    '<button class="sk-b'+(cur?"":" on")+'" onclick="applySkin(null)">현재</button>'+
    '<span class="sk-n">'+(SKINS[cur]||"지금 디자인")+'</span>';
}
(function(){
  var want=null;
  try{
    var q=new URLSearchParams(location.search);
    if(q.has("skin"))want=q.get("skin")||"1";
    var saved=localStorage.getItem("palo_skin");
    if(saved&&SKINS[saved])document.documentElement.setAttribute("data-skin",saved);
    if(want&&SKINS[want])applySkin(want);
  }catch(e){}
  if(!want)return; // 주소에 ?skin이 없으면 전환기를 안 띄운다(일반 사용자에겐 안 보임)
  function mount(){
    if(document.getElementById("skinBar"))return;
    var bar=document.createElement("div");bar.id="skinBar";bar.className="skin-bar";
    document.body.appendChild(bar);renderSkinBar();
  }
  if(document.body)mount(); else document.addEventListener("DOMContentLoaded",mount);
})();

/* ===== 광고 성과 측정 =====
   광고 링크에 캠페인 코드를 달아 쓴다:  https://commi.kr/?c=tw0808
   처음 들어온 사람에게 무작위 방문자 번호를 발급하고, **첫 유입 캠페인만** 붙여 둔다(first-touch).
   나중에 검색으로 다시 들어와도 그 사람의 성과는 처음 데려온 광고의 몫이다.
   ⚠️ 주소는 renderList()의 pushState 등으로 곧 정리되므로 스크립트가 뜨자마자 붙잡아 둔다.
   ⚠️ 기록은 브라우저가 DB에 직접 넣지 않고 /api/track을 거친다(아무나 통계를 넣지 못하게). */
var MKT=(function(){
  var KV="palo_mkt_v",KC="palo_mkt_c",vid=null,camp=null,on=false;
  function uuid(){
    try{ if(crypto&&crypto.randomUUID)return crypto.randomUUID(); }catch(e){}
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){
      var r=Math.random()*16|0;return (c==="x"?r:((r&3)|8)).toString(16);});
  }
  try{
    vid=localStorage.getItem(KV);
    if(!vid){vid=uuid();localStorage.setItem(KV,vid);}
    camp=localStorage.getItem(KC)||null;
    var q=new URLSearchParams(location.search);
    var code=(q.get("c")||q.get("utm_campaign")||"").trim().slice(0,40);
    // 이미 붙은 캠페인이 있으면 덮어쓰지 않는다 — 처음 데려온 광고의 공로를 지키기 위해
    if(code&&!camp){camp=code;localStorage.setItem(KC,code);}
    if(code){ // 주소에서 코드는 지운다(공유했을 때 남의 방문까지 이 캠페인으로 잡히지 않게)
      q.delete("c");q.delete("utm_campaign");q.delete("utm_source");q.delete("utm_medium");
      var qs=q.toString();
      try{history.replaceState({},"",location.pathname+(qs?"?"+qs:""));}catch(e){}
    }
    on=true;
  }catch(e){on=false;} // 시크릿 모드 등으로 저장이 막히면 측정을 포기(사이트는 그대로 동작)
  var queue=[],timer=null;
  function payload(){
    var u=null;try{u=(window.AUTH&&AUTH.user)?AUTH.user.id:null;}catch(e){}
    return JSON.stringify({v:vid,c:camp,u:u,e:queue.splice(0,30)});
  }
  function flush(beacon){
    if(!on||!queue.length)return;
    var body=payload();
    try{
      if(beacon&&navigator.sendBeacon){
        navigator.sendBeacon("/api/track",new Blob([body],{type:"application/json"}));return;
      }
      fetch("/api/track",{method:"POST",headers:{"Content-Type":"application/json"},body:body,keepalive:true}).catch(function(){});
    }catch(e){}
  }
  function track(name,label){
    if(!on)return;
    queue.push({n:name,l:label||null,p:location.pathname});
    if(queue.length>=20){flush(false);return;}
    // 한 동작마다 보내면 요청이 너무 잦다 → 몇 초 모아서 한 번에 보낸다
    if(!timer)timer=setTimeout(function(){timer=null;flush(false);},4000);
  }
  // 창을 닫거나 탭을 옮길 때 남은 것을 마저 보낸다(fetch는 이때 취소되므로 sendBeacon)
  try{
    document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")flush(true);});
    window.addEventListener("pagehide",function(){flush(true);});
  }catch(e){}
  return {track:track,flush:flush,campaign:function(){return camp;},visitor:function(){return vid;},enabled:function(){return on;}};
})();
function track(n,l){try{MKT.track(n,l);}catch(e){}}
// 버튼 클릭은 버튼마다 코드를 넣지 않고 한 곳에서 잡는다.
// ⚠️ 글 제목 같은 걸 그대로 이름으로 쓰면 종류가 끝없이 늘어나 통계가 못 쓰게 된다 → 고정 이름으로 묶는다.
try{
  document.addEventListener("click",function(e){
    if(!e.target||!e.target.closest)return;
    var el=e.target.closest("[data-t],.tab,.cm-fab,.post,.post-card,.cm-card,.bn-a,.cm-chip,button");
    if(!el)return;
    var label=el.getAttribute&&el.getAttribute("data-t");
    if(!label){
      if(el.classList.contains("tab"))label="탭:"+(el.getAttribute("data-tab")||"글쓰기");
      else if(el.classList.contains("post")||el.classList.contains("post-card"))label="글 목록 클릭";
      else if(el.classList.contains("cm-card"))label="커미션 카드 클릭";
      else if(el.classList.contains("bn-a"))label="게시판 이동";
      else if(el.classList.contains("cm-chip"))label="태그 칩";
      else label=(el.innerText||el.textContent||"").replace(/\s+/g," ").trim().slice(0,30);
    }
    if(label)track("click",label);
  },true);
}catch(e){}

var curTab="home"; // "home" | "commission" | "chat" | "me"
// 매 탭 전환마다 1씩 증가하는 "번호표". 비동기 로딩을 시작한 시점의 번호를 기억해 두고, 로딩이 끝나 화면을
// 그리기 직전에 번호가 그대로인지 확인한다. 그새 다른(혹은 같은) 탭을 다시 눌렀으면 번호가 달라져 렌더를 버린다.
var navSeq=0;
var feedRefreshing=false; // refreshFeed() 중복 실행 방지(홈/로고 연타 대비)
var profileRefreshing=false; // refreshProfile() 중복 실행 방지
// 최근에 이미 불러온 데이터면 탭을 다시 눌러도 재조회를 건너뛴다(캐시 즉시 표시만) → 탭 왕복이 빨라지고
// 무거운 처리(파싱·렌더)도 덜 돌아 멈춤이 준다. 글을 바꾸는 작업(작성·삭제 등)은 낙관적 갱신으로 즉시 반영됨.
var REFRESH_THROTTLE_MS=8000;
var postsLoadedAt=0; // loadRealPosts()가 마지막으로 성공한 시각(홈·내 정보 공용)
var cmLoadedAt=0;    // 커미션 목록을 마지막으로 불러온 시각
var notifDeeplinkPending=false; // "알림 설정" 딥링크(?notif=settings)로 진입 시, 렌더 후 알림 설정 섹션으로 스크롤
var POSTS=[]; // 실제 글은 loadRealPosts()가 DB에서 채움
var TREND=[
  {name:"비 오는 창가",tag:"챌린지 1위",thumb:"t1",sub:"참여 38명"},
  {name:"인체 비례 연재",tag:"강좌 급상승",thumb:"t4",sub:"조회 905"},
  {name:"숲 속 마녀",tag:"크리틱 화제",thumb:"t2",sub:"훈수 12"},
  {name:"손 그림자 루틴",tag:"팁 인기",thumb:"t3",sub:"좋아요 96"},
  {name:"AI 정책 투표",tag:"토론 뜨거움",thumb:"t5",sub:"댓글 214"}
];
var GRADS={t1:"#6b7d63,#414f3a",t2:"#7a5a8a,#493a58",t3:"#c2410c,#8a2f08",t4:"#3a5674,#26384c",t5:"#b08968,#7a5c42"};
var state={board:"all",sort:"new",query:"",shown:8,tag:null,viewMode:"list"};
(function(){try{var _b=getBoardFromPath();if(_b)state.board=_b;}catch(e){}})(); // /board/{id} 딥링크면 시작 게시판을 그걸로
var PER=40;var page=1;var READ=new Set();var FOLLOW=new Set();var FOLLOW_NAME={}; // FOLLOW=팔로우한 회원 id들, FOLLOW_NAME[id]=닉(표시용)
var ME={nick:"나"};
var AUTH={user:null,profile:null};
var SETTINGS={cm:true,like:true,notice:true,chat:true,cminquiry:true};
try{var _savedPrefs=JSON.parse(localStorage.getItem("palo_notif_prefs")||"null");if(_savedPrefs&&typeof _savedPrefs==="object")Object.assign(SETTINGS,_savedPrefs);}catch(e){}
var notifFilter="all";var pfTab="mine";
function dispName(a){return a==="나"?ME.nick:a}
// 비회원(익명) 글·댓글에만 붙는 IP 앞자리 표시(디시식). ip는 비회원일 때만 채워지므로 로그인 유저는 자동으로 빈 값.
function anonIpHTML(ip){return ip?(' <span class="anon-ip">('+esc(ip)+')</span>'):'';}
function avatarHTML(name,avatarUrl){
  if(avatarUrl)return '<img src="'+esc(avatarUrl)+'" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;display:block">';
  return esc(dispName(name)[0]);
}
/* ===== 프로필 헤어(크레페 시안) ===== */
function pfSnsUrl(type,v){
  v=v.trim();
  if(/^https?:\/\//i.test(v))return v;
  v=v.replace(/^@/,'');
  return type==='twitter'?('https://x.com/'+v):('https://instagram.com/'+v);
}
function pfReviewStats(userId,nickname){
  var reviews=POSTS.filter(function(p){
    if(p.board!=='review')return false;
    return p.reviewedUserId?p.reviewedUserId===userId:p.reviewedNickname===nickname;
  });
  var good=reviews.filter(function(r){return r.commissionSentiment==='good'}).length;
  return{count:reviews.length,pct:reviews.length?Math.round(good/reviews.length*100):null};
}
async function pfBookmarkCount(userId){
  if(!window.supabase)return 0;
  var comRes=await window.supabase.from('commissions').select('id').eq('author_id',userId);
  if(comRes.error||!comRes.data||!comRes.data.length)return 0;
  var ids=comRes.data.map(function(c){return c.id});
  var cntRes=await window.supabase.from('commission_bookmarks').select('*',{count:'exact',head:true}).in('commission_id',ids);
  return cntRes.count||0;
}
function pfHeroHTML(p,isSelf,reviewStats,bookmarkCount){
  var coverStyle=p.cover_url?('background-image:url(\''+cmQ(p.cover_url)+'\');background-size:cover;background-position:center'):'';
  var editCoverBtn=isSelf?'<button type="button" class="pfh-cover-edit" onclick="document.getElementById(\'coverFile\').click()" title="커버 이미지 변경" aria-label="커버 이미지 변경">🖼</button>':'';
  var editAvaBtn=isSelf?'<button type="button" class="pfh-ava-edit" onclick="document.getElementById(\'avatarFile\').click()" title="프로필 이미지 변경" aria-label="프로필 이미지 변경">📷</button>':'';
  var grade=p.level?levelBadgeHtml(p.level,'pfh-grade-badge'):'';
  var bio=p.bio?esc(p.bio).replace(/\n/g,'<br>'):(isSelf?'소개글을 적어보세요.':'');
  var links='';
  if(p.sns_twitter)links+='<a class="pfh-link" href="'+esc(pfSnsUrl('twitter',p.sns_twitter))+'" target="_blank" rel="noopener" title="트위터(X)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a>';
  if(p.sns_instagram)links+='<a class="pfh-link" href="'+esc(pfSnsUrl('instagram',p.sns_instagram))+'" target="_blank" rel="noopener" title="인스타그램"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>';
  if(p.sns_email)links+='<a class="pfh-link" href="mailto:'+esc(p.sns_email)+'" title="이메일"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M4 4l8 7 8-7"/></svg></a>';
  var editLinksBtn=isSelf?'<button type="button" class="pfh-edit-btn" onclick="openPfEditModal()">✏️ 소개글 · 링크 편집</button>':'';
  var pctHTML=reviewStats.pct==null?'<div class="n">-</div>':'<div class="n good">'+reviewStats.pct+'%</div>';
  var bmHTML=bookmarkCount==null?'…':bookmarkCount;
  return '<div class="pfh">'+
    '<div class="pfh-cover" style="'+coverStyle+'">'+editCoverBtn+'</div>'+
    '<div class="pfh-ava-wrap"><div class="pfh-ava">'+avatarHTML(p.nickname,p.avatar_url)+'</div>'+editAvaBtn+'</div>'+
    '<div class="pfh-name">'+esc(p.nickname)+'</div>'+
    (grade?'<div class="pfh-grade">'+grade+'</div>':'')+
    (bio?'<div class="pfh-bio">'+bio+'</div>':'')+
    (links?'<div class="pfh-links">'+links+'</div>':'')+
    editLinksBtn+
    '<div class="pfh-stats">'+
      '<div class="pfh-stat"><div class="n">'+reviewStats.count+'</div><div class="l">후기</div></div>'+
      '<div class="pfh-stat">'+pctHTML+'<div class="l">만족율</div></div>'+
      '<div class="pfh-stat"><div class="n" id="pfhBmCount">'+bmHTML+'</div><div class="l">찜하기</div></div>'+
    '</div>'+
  '</div>';
}
function openPfEditModal(){
  document.getElementById('pfBioInput').value=(AUTH.profile&&AUTH.profile.bio)||'';
  document.getElementById('pfTwitterInput').value=(AUTH.profile&&AUTH.profile.sns_twitter)||'';
  document.getElementById('pfInstaInput').value=(AUTH.profile&&AUTH.profile.sns_instagram)||'';
  document.getElementById('pfEmailInput').value=(AUTH.profile&&AUTH.profile.sns_email)||'';
  document.getElementById('pfEditModal').classList.add('open');
}
function closePfEdit(){document.getElementById('pfEditModal').classList.remove('open');}
async function savePfEdit(){
  if(!AUTH.user||!window.supabase)return;
  var bio=document.getElementById('pfBioInput').value.trim().slice(0,150);
  var tw=document.getElementById('pfTwitterInput').value.trim();
  var ig=document.getElementById('pfInstaInput').value.trim();
  var em=document.getElementById('pfEmailInput').value.trim();
  var res=await window.supabase.from('profiles').update({bio:bio||null,sns_twitter:tw||null,sns_instagram:ig||null,sns_email:em||null}).eq('id',AUTH.user.id);
  if(res.error){toast('저장 실패: '+res.error.message);return;}
  if(AUTH.profile){AUTH.profile.bio=bio||null;AUTH.profile.sns_twitter=tw||null;AUTH.profile.sns_instagram=ig||null;AUTH.profile.sns_email=em||null;}
  closePfEdit();toast('프로필을 저장했어요','✓');
  openProfile();
}
async function onCoverFile(e){
  var f=e.target.files[0];if(!f)return;
  e.target.value='';
  if(!window.supabase||!AUTH.user){toast('로그인이 필요해요');return;}
  if(ALLOWED_IMAGE_TYPES.indexOf(f.type)===-1){toast('이미지 파일만 올릴 수 있어요');return;}
  if(f.size>MAX_IMAGE_BYTES){toast('40MB 이하 이미지만 올릴 수 있어요');return;}
  var uploadBlob=f,ext=(f.name.match(/\.([^.]+)$/)||[,'png'])[1];
  if(f.type!=='image/gif'){
    toast('커버 이미지 압축 중...');
    try{
      var compressed=await compressImage(f);
      uploadBlob=compressed.blob;ext=compressed.ext;
    }catch(err){console.error('커버 이미지 압축 실패, 원본으로 업로드:',err);}
  }
  toast('업로드 중...');
  var url=await uploadToStorage(uploadBlob,'cover');
  if(!url)return;
  var res=await window.supabase.from('profiles').update({cover_url:url}).eq('id',AUTH.user.id);
  if(res.error){toast('저장 실패: '+res.error.message);return;}
  if(AUTH.profile)AUTH.profile.cover_url=url;
  toast('커버 이미지를 변경했어요');
  openProfile();
}
var NOTIFS=[]; // 실제 알림은 loadNotificationsFromDB()가 DB에서 채움
var justAddedId=null;

function anonId(){
  var k=localStorage.getItem("palo_anon_id");
  if(!k){k=crypto.randomUUID();localStorage.setItem("palo_anon_id",k);}
  return k;
}
function myLikeId(){return AUTH.user?AUTH.user.id:anonId();}
function timeAgo(iso){
  var diff=Math.floor((Date.now()-new Date(iso).getTime())/1000);
  if(diff<60)return "방금";
  if(diff<3600)return Math.floor(diff/60)+"분 전";
  if(diff<86400)return Math.floor(diff/3600)+"시간 전";
  return Math.floor(diff/86400)+"일 전";
}
var LATEST_NOTICE=null;
var ACTIVE_ADS=[];
var ACTIVE_CAMPAIGNS=[]; // 유료 CPM 캠페인(get_servable_ads RPC로 로드) — 지면의 80%를 차지
var AD_LOCKED_COMMISSION_IDS={}; // 광고 심사중/집행중인 커미션 id들 — 수정 잠금용(POSTS의 adLocked와 동일한 목적)
var AD_PAID_SHARE=0; // 오픈 초기: 유료 광고 미서빙(0). 나중에 유료를 켜면 이 값(예: 0.80)이 유료에 배정되는 슬롯 비중이 됨.
var AD_PER_AD_SHARE_MAX=0.04; // 유저 광고 1개당 노출 상한 4%(초기에 소수 광고가 독점하는 걸 방지). 유저 광고 '전체' 상한은 없음(최대 100%까지 유저 광고로 채움).
function adTargetOnclick(ad){
  return ad.linked_commission_id?('cmOpenCommissionById('+ad.linked_commission_id+')'):('openPost('+(100000+ad.linked_post_id)+')');
}
function showNotice(){
  if(!LATEST_NOTICE)return;
  document.getElementById("noticeModalTitle").textContent="📢 "+LATEST_NOTICE.title;
  document.getElementById("noticeModalBody").innerHTML=LATEST_NOTICE.content||"";
  document.getElementById("noticeModal").classList.add("open");
}
function closeNotice(){document.getElementById("noticeModal").classList.remove("open");}
// 재진입 캐시: 마지막으로 불러온 피드를 localStorage에 저장해 두고, 다음에 앱을 다시 열 때
// 네트워크를 기다리지 않고 즉시 화면에 뿌린 뒤(백그라운드에서 최신으로 교체). content_html은
// 인라인 이미지로 커질 수 있어 저장에서 제외(목록엔 안 쓰이고, 새로고침되면 다시 채워짐).
var FEED_CACHE_KEY="palo_feed_v1";
function saveFeedCache(real){
  try{
    var slim=real.map(function(p){var c={};for(var k in p){if(k!=="html")c[k]=p[k];}return c;});
    localStorage.setItem(FEED_CACHE_KEY,JSON.stringify({t:Date.now(),posts:slim}));
  }catch(e){/* 용량 초과 등은 무시 — 캐시는 있으면 좋고 없어도 그만 */}
}
function loadFeedCache(){
  try{
    var raw=localStorage.getItem(FEED_CACHE_KEY);if(!raw)return null;
    var o=JSON.parse(raw);
    if(!o||!Array.isArray(o.posts))return null;
    if(Date.now()-(o.t||0)>24*3600*1000)return null; // 24시간 지난 캐시는 버림
    return o.posts;
  }catch(e){return null;}
}
async function loadRealPosts(skipRender){
  if(!window.supabase)return;
  var sb=window.supabase;
  var nowIso=new Date().toISOString();
  // layout.js가 HTML 파싱 직후에 띄워둔 선요청(있으면 재사용). palo.js는 하이드레이션 이후에야
  // 실행되므로, 여기 도달했을 땐 이미 응답이 와 있어 왕복 한 번을 통째로 아낀다.
  // 첫 호출에서만 쓰고 비운다 — 새로고침·재조회 때 낡은 데이터를 재사용하면 안 되므로.
  var pre=window.__paloPre||{};
  window.__paloPre=null;
  function preOr(key,fallback){
    if(!pre[key])return fallback();
    return pre[key].then(function(r){return r||fallback();}); // 선요청이 실패했으면 평소 경로로
  }
  // ── 1차: 서로 독립적인 쿼리 7개를 병렬로 실행(예전엔 하나씩 순서대로 await해서 왕복 지연이 그대로 누적됐음) ──
  var wave1=await Promise.all([
    preOr("notices",function(){return sb.from("notices").select("*").order("created_at",{ascending:false}).limit(1);}),
    preOr("levels",function(){return sb.from("level_thresholds").select("*").order("level");}),
    preOr("ads",function(){return sb.from("user_ads").select("id,image_url,linked_post_id,linked_commission_id,points_spent").eq("status","active").gt("expires_at",nowIso);}),
    preOr("camps",function(){return sb.rpc("get_servable_ads");}),
    preOr("adLocks",function(){return sb.from("user_ads").select("linked_post_id,linked_commission_id,status,expires_at").in("status",["pending","active"]);}),
    preOr("posts",function(){return sb.from("posts").select("*").order("created_at",{ascending:false});}),
    preOr("profiles",function(){return sb.from("profiles").select("id,nickname,level,avatar_url");})
  ]);
  var noticeRes=wave1[0],lvRes=wave1[1],adRes=wave1[2],campRes=wave1[3],adLockRes=wave1[4],res=wave1[5],profRes=wave1[6];
  if(!noticeRes.error&&noticeRes.data.length)LATEST_NOTICE=noticeRes.data[0];
  if(!lvRes.error)LEVEL_THRESHOLDS=lvRes.data||[];
  if(!adRes.error)ACTIVE_ADS=adRes.data||[];
  if(!campRes.error)ACTIVE_CAMPAIGNS=campRes.data||[];
  var adLockedIds={};
  AD_LOCKED_COMMISSION_IDS={};
  (adLockRes.data||[]).forEach(function(a){
    if(a.status==="pending"||(a.status==="active"&&a.expires_at&&a.expires_at>nowIso)){
      if(a.linked_post_id)adLockedIds[a.linked_post_id]=true;
      if(a.linked_commission_id)AD_LOCKED_COMMISSION_IDS[a.linked_commission_id]=true;
    }
  });
  if(res.error){console.error(res.error);return;}
  var dbIds=res.data.map(function(row){return row.id});
  var profById={};
  if(!profRes.error)profRes.data.forEach(function(row){profById[row.id]={nickname:row.nickname,level:row.level,avatarUrl:row.avatar_url};});
  function nameFor(uid){return uid&&profById[uid]?profById[uid].nickname:"익명";}
  function levelFor(uid){return uid&&profById[uid]?profById[uid].level:null;}
  function avatarFor(uid){return uid&&profById[uid]?profById[uid].avatarUrl:null;}

  // ── 2차: posts에 의존하는 댓글·좋아요·이미지를 병렬로 ──
  var wave2=await Promise.all([
    dbIds.length?sb.from("comments").select("*").in("post_id",dbIds).order("created_at"):Promise.resolve({data:[]}),
    dbIds.length?sb.from("likes").select("post_id,user_id").in("post_id",dbIds):Promise.resolve({data:[]}),
    dbIds.length?sb.from("post_images").select("post_id,url,sort").in("post_id",dbIds).order("sort"):Promise.resolve({data:[]}),
    dbIds.length?sb.from("polls").select("id,post_id,anchor_key,sort").in("post_id",dbIds).order("sort"):Promise.resolve({data:[]})
  ]);
  var cmRes=wave2[0],likeRes=wave2[1],imgRes=wave2[2],pollRes=wave2[3];
  var pollsByPost={};
  (pollRes.data||[]).forEach(function(pl){(pollsByPost[pl.post_id]=pollsByPost[pl.post_id]||[]).push({id:pl.id,anchor:pl.anchor_key||null});});
  var commentIds=(cmRes.data||[]).map(function(c){return c.id});
  // ── 3차: 댓글에 의존하는 도움돼요(comment_helpful) ──
  var helpfulRes=commentIds.length?await sb.from("comment_helpful").select("comment_id,user_id").in("comment_id",commentIds):{data:[]};
  var helpfulCountByComment={},helpfulMine={};
  (helpfulRes.data||[]).forEach(function(hf){
    helpfulCountByComment[hf.comment_id]=(helpfulCountByComment[hf.comment_id]||0)+1;
    if(AUTH.user&&hf.user_id===AUTH.user.id)helpfulMine[hf.comment_id]=true;
  });
  // 댓글에 박힌 이모티콘 번호를 모아 한 번에 불러온다(렌더는 동기라 미리 채워둬야 한다)
  var _emoIds=[];
  (cmRes.data||[]).forEach(function(c){_emoIds=_emoIds.concat(emoIdsIn(c.content));});
  if(_emoIds.length)await ensureEmoticons(_emoIds);
  var commentsByPost={};
  (cmRes.data||[]).forEach(function(c){
    (commentsByPost[c.post_id]=commentsByPost[c.post_id]||[]).push({n:nameFor(c.author_id),t:timeAgo(c.created_at),txt:c.content,dbId:c.id,authorId:c.author_id,ip:c.ip_masked||null,lv:levelFor(c.author_id),av:avatarFor(c.author_id),h:helpfulCountByComment[c.id]||0,_me:!!helpfulMine[c.id]});
  });
  var likesByPost={};
  (likeRes.data||[]).forEach(function(l){
    (likesByPost[l.post_id]=likesByPost[l.post_id]||[]).push(l.user_id);
  });
  var imagesByPost={};
  (imgRes.data||[]).forEach(function(im){
    (imagesByPost[im.post_id]=imagesByPost[im.post_id]||[]).push(im.url);
  });

  var real=res.data.map(function(row){
    var likers=likesByPost[row.id]||[];
    return {id:100000+row.id,dbId:row.id,authorId:row.author_id,ipMasked:row.ip_masked||null,board:row.board,title:row.title,category:row.category,author:nameFor(row.author_id),authorLevel:levelFor(row.author_id),authorAvatar:avatarFor(row.author_id),
      time:timeAgo(row.created_at),createdAt:row.created_at,likes:likers.length,_liked:likers.indexOf(myLikeId())>-1,
      views:row.views,thumb:"none",stage:row.stage,images:imagesByPost[row.id],polls:pollsByPost[row.id]||[],pollId:(pollsByPost[row.id]&&pollsByPost[row.id][0]?pollsByPost[row.id][0].id:null),
      isManagerPick:!!row.is_manager_pick,pickPosition:row.pick_position,pickedAt:row.picked_at,adLocked:!!adLockedIds[row.id],
      reviewedNickname:row.reviewed_nickname||null,reviewedUserId:row.reviewed_user_id||null,commissionPostId:row.commission_post_id||null,commissionSentiment:row.commission_sentiment||null,
      commissionId:row.commission_id||null,commissionCtype:row.commission_ctype||null,commissionBadReason:row.commission_bad_reason||null,acceptedCommentId:row.accepted_comment_id||null,
      content:(row.content||"").split("\n").filter(Boolean),html:row.content_html||undefined,comments:commentsByPost[row.id]||[]};
  });
  // 기존 실제 글(dbId 있음)은 방금 새로 받은 real로 교체하고, 클라이언트에만 있는 글(낙관적 추가·
  // 캐시 프라임 등 dbId 없는 것)만 남김 — loadRealPosts()를 여러 번 불러도(캐시→백그라운드 갱신) 중복 안 됨.
  POSTS=real.concat(POSTS.filter(function(p){return !p.dbId;}));
  postsLoaded=true;postsLoadedAt=Date.now();
  // 캐시 저장(모든 글 복사→JSON 문자열화→localStorage 동기 쓰기)은 모바일에서 무거워 화면 전환을 막을 수 있음.
  // 다음 방문용 캐시일 뿐이라 지금 당장 필요 없으니, 대기 중인 탭 입력이 먼저 처리되도록 지연 실행한다.
  setTimeout(function(){saveFeedCache(real);},0);
  renderNav(document.getElementById("boardNav"));renderNav(document.getElementById("boardNavM"));renderNav(document.getElementById("boardNavS"));
  renderTrend();
  // 로딩이 끝나기 전에 사용자가 이미 홈 밖 다른 화면으로 이동했다면, 그 화면을 그대로 두고
  // 홈/딥링크로 강제 복귀시키지 않음(로딩 중 탭을 눌렀다가 홈으로 튕기던 문제 해결).
  // skipRender: refreshFeed()가 호출한 경우 — 여기서 목록을 그리지 않고, 내용이 바뀐 경우에만
  // refreshFeed가 한 번 다시 그림(홈/로고 재탭 시 캐시 렌더 + 재조회 렌더로 두 번 그려지던 껌뻑임 방지).
  if(!userLeftHome&&!skipRender){
    var initialDbId=getPostIdFromPath();
    var initialPost=initialDbId?POSTS.find(function(x){return x.dbId===initialDbId}):null;
    var initialUserId=getUserIdFromPath();
    var initialCommissionId=getCommissionIdFromPath();
    if(initialPost)openPost(initialPost.id);
    else if(initialUserId)openUserProfile(initialUserId);
    else if(initialCommissionId)cmOpenCommissionById(initialCommissionId);
    else renderList();
  }
  renderSidebarAd();
}
function getPostIdFromPath(){
  var m=location.pathname.match(/^\/post\/(\d+)$/);
  return m?parseInt(m[1],10):null;
}
function sharePost(id){
  var p=POSTS.find(function(x){return x.id===id});if(!p)return;
  var url=p.dbId?(location.origin+"/post/"+p.dbId):location.href;
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(url).then(function(){toast("링크를 복사했어요")},function(){toast("복사에 실패했어요")});
  }else{
    toast("이 브라우저에서는 복사를 지원하지 않아요");
  }
}
function getCommissionIdFromPath(){
  var m=location.pathname.match(/^\/commission\/(\d+)$/);
  return m?parseInt(m[1],10):null;
}
function getBoardFromPath(){ // /board/{id} — 유효한 게시판 id만 반환('all'·미지의 id는 null=홈)
  var m=location.pathname.match(/^\/board\/([a-z]+)$/);
  if(!m)return null;
  var id=m[1];
  if(id==="all")return null;
  for(var g of BOARDS)for(var b of g.items)if(b.id===id)return id;
  return null;
}
function _cmSetDetailUrl(id){ // 커미션 상세 주소를 브라우저 URL에 반영(공유·SEO). 히스토리 항목은 enterScreen이 이미 쌓았으니 현재 항목의 경로만 교체.
  if(id==null)return;
  var path="/commission/"+id;
  if(location.pathname!==path){try{history.replaceState({},"",path);}catch(e){}}
}
function cmShare(id){
  if(id==null){toast("이 커미션은 아직 공유할 수 없어요");return;}
  var url=location.origin+"/commission/"+id;
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(url).then(function(){toast("커미션 링크를 복사했어요","🔗")},function(){toast("복사에 실패했어요")});
  }else{
    toast("이 브라우저에서는 복사를 지원하지 않아요");
  }
}
/* ---------- 스와이프/뒤로가기로 앱 내부 화면 닫기 (커미션·채팅) ----------
   게시글·프로필은 실제 URL(/post, /user)이 있어 브라우저 기본 뒤로가기(iOS 가장자리 스와이프
   포함)가 그대로 작동함. 반면 커미션·채팅은 URL을 안 바꾸고 화면(#main/오버레이)만 교체해서
   히스토리에 흔적이 없어 뒤로가기가 안 먹혔음.
   → 화면을 열 때 history.pushState로 히스토리 항목을 하나 쌓아두고, 뒤로가기(popstate)가 오면
     그 화면의 '뒤로' 동작(부모 화면 복귀)을 대신 실행. iOS 스와이프도 결국 이 히스토리를
     따라가므로 게시글과 완전히 동일한 방식으로 일관되게 작동함. */
var screenStack=[];        // [{key, back}] — 열려 있는 앱 내부 화면들의 '뒤로' 함수
var navigatingBack=false;  // popstate로 뒤로 가는 중이면 true(중복 push 방지)
// 우리가 쌓아 두고 아직 안 쓴 히스토리 항목 수. 브라우저 히스토리는 지울 수가 없어서,
// resetScreens()로 스택만 비우면 항목이 그대로 남는다 — 탭을 오갈수록 계속 쌓여
// 나중에 뒤로가기를 여러 번 눌러야 화면이 바뀌지 않는 채로 겨우 사이트를 빠져나가게 된다.
// 그래서 남아 있는 항목이 있으면 새로 밀지 않고 그것을 다시 쓴다(최대 1개만 남음).
var pushedDepth=0;
function enterScreen(key,back){
  if(typeof syncKbOpen==="function")syncKbOpen(); // 화면 전환 때 하단 탭 상태 정리
  if(navigatingBack)return;                      // 뒤로 가는 중엔 새 항목을 쌓지 않음
  var top=screenStack[screenStack.length-1];
  if(top&&top.key===key){top.back=back;return;}  // 같은 화면 재렌더/내부 탭 전환은 갱신만
  screenStack.push({key:key,back:back});
  if(screenStack.length>pushedDepth){            // 남아도는 항목이 없을 때만 새로 민다
    pushedDepth=screenStack.length;
    history.pushState({paloDepth:screenStack.length},"");
  }
}
function screenBack(){if(screenStack.length)history.back();} // 화면 안 '‹' 버튼용
function resetScreens(){screenStack=[];}                     // 최상위(탭)로 나갈 때 스택 비우기
window.addEventListener("popstate",function(){
  if(pushedDepth>0)pushedDepth--;
  if(screenStack.length){                        // 커미션·채팅 등 앱 내부 화면이 열려 있으면
    var item=screenStack.pop();
    if(typeof syncKbOpen==="function")syncKbOpen();
    navigatingBack=true;
    try{item.back();}catch(e){}
    navigatingBack=false;
    return;                                       // 한 단계 뒤로 가고 끝(아래 URL 라우팅 안 함)
  }
  var dbId=getPostIdFromPath();
  var post=dbId?POSTS.find(function(x){return x.dbId===dbId}):null;
  var userId=getUserIdFromPath();
  var commissionId=getCommissionIdFromPath();
  var boardId=getBoardFromPath();
  if(post)openPost(post.id);
  else if(userId)openUserProfile(userId);
  else if(commissionId)cmOpenCommissionById(commissionId);
  else if(boardId)selectBoard(boardId);
  // 구글 로그인 리다이렉트 직후 Supabase가 URL의 인증 토큰을 정리하면서 popstate 이벤트를
  // 발생시키는 경우가 있음 — 그때 postsLoaded가 아직 false면(실제 글을 아직 못 불러온 상태)
  // 더미 글로 목록을 그리지 않고 기다림(loadRealPosts()가 끝나면 스스로 그림).
  else if(postsLoaded||!window.__paloHasBackend){if(state.board!=="all")selectBoard("all");else renderList();}
});

/* ---------- 로그인 (Supabase Auth) ---------- */
var authReady=false; // getSession()이 최소 1회 끝났는지 — 그 전엔 '로그인 필요' 대신 로딩 표시(가짜 로그아웃 깜빡임 방지)
// 비밀번호 재설정 링크로 들어왔는지 표시(주소는 곧 정리되므로 스크립트가 뜨자마자 확인).
// 우리가 붙인 ?pwreset=1 과 Supabase가 붙이는 type=recovery 둘 다 확인.
var _recoveryLink=(function(){
  try{return /(^|[?&#])pwreset=1/.test(location.search+location.hash)||/type=recovery/.test(location.search+location.hash);}
  catch(e){return false;}
})();
async function initAuth(){
  if(!window.supabase)return;
  // ⚠️ 이벤트 리스너를 가장 먼저 등록해야 함 — 재설정 링크의 PASSWORD_RECOVERY 이벤트는
  //    getSession()보다 먼저 발생할 수 있어, 나중에 등록하면 놓친다(새 비밀번호 창이 안 뜨던 원인).
  window.supabase.auth.onAuthStateChange(function(event,session){
    if(event==="SIGNED_IN")track("login");
    applySession(session);
    if(event==="PASSWORD_RECOVERY")setTimeout(openNewPasswordModal,200);
  });
  var res=await window.supabase.auth.getSession();
  await applySession(res.data.session);
  authReady=true;
  if(document.getElementById("myProfileView"))openProfile(); // 로딩 상태로 그려졌으면 실제 상태로 다시 그림
  // 이벤트를 놓쳤더라도 주소로 판별해 새 비밀번호 창을 띄움(이중 안전장치)
  if(_recoveryLink){
    setTimeout(function(){
      openNewPasswordModal();
      try{history.replaceState({},"",location.pathname);}catch(e){} // 새로고침 시 또 뜨지 않게 주소 정리
    },400);
  }
  // 모바일에서 성인 본인확인을 마치고 리다이렉트로 돌아온 경우 이어서 처리
  if(typeof resumeAdultVerification==="function")resumeAdultVerification();
  // /board/adult 주소로 바로 들어온 경우 — 로그인 상태를 알게 된 지금 다시 판단한다
  // (딥링크 처리는 부팅 시점에 일어나서 그때는 인증 여부를 알 수 없다)
  if(state.board==="adult"&&!isAdultVerified()){
    state.board="all";
    if(typeof renderList==="function")renderList();
    setTimeout(function(){AUTH.user?openAdultGate():openLoginModal();},300);
  }
  // PWA(홈 화면 추가)에서 백그라운드→복귀 시 세션이 로그아웃처럼 보이던 문제 완화:
  // 화면이 다시 보일 때 세션을 재확인해서 살아있으면 로그인 상태를 자동 복원(자동 토큰 갱신도 재개됨).
  document.addEventListener("visibilitychange",function(){
    if(document.visibilityState==="visible")recheckAuthSession();
  });
}
async function recheckAuthSession(){
  if(!window.supabase)return;
  try{
    var res=await window.supabase.auth.getSession();
    var sid=res.data.session?res.data.session.user.id:null;
    var cur=AUTH.user?AUTH.user.id:null;
    if(sid!==cur)await applySession(res.data.session); // 상태가 달라졌을 때만 다시 반영
  }catch(e){}
}
var globalChatNotifUserId=null;
async function applySession(session){
  // 계정이 바뀌면(로그인/로그아웃/전환) 사용자별 데이터(내 좋아요·북마크·채팅)를 다음 이동 때 강제로 새로 불러오도록
  // throttle 타임스탬프와 채팅 캐시를 리셋한다(안 그러면 8초간 이전 계정 기준 데이터가 남을 수 있음).
  var _prevUid=AUTH.user?AUTH.user.id:null, _newUid=session?session.user.id:null;
  if(_prevUid!==_newUid){postsLoadedAt=0;cmLoadedAt=0;chatListCache=null;}
  AUTH.user=session?session.user:null;
  AUTH.profile=null;
  if(AUTH.user){
    var res=await window.supabase.from("profiles").select("*").eq("id",AUTH.user.id).single();
    if(!res.error)AUTH.profile=res.data;
    ME.nick=AUTH.profile?AUTH.profile.nickname:"새싹 작가";
    if(globalChatNotifUserId!==AUTH.user.id){
      globalChatNotifUserId=AUTH.user.id;
      initGlobalChatNotifications();
    }
    // 이미 알림 권한을 켠 유저면 로그인 시 이 계정으로 구독을 확실히 저장(기기별 1회)
    if(typeof subscribeToPush==="function"&&notifPermState()==="granted")subscribeToPush();
    loadMyFollows(); // 내 팔로우 목록 로드
    loadMyEmoticons(); // 담아둔 이모티콘 팩
    maybeShowConsent(); // 신규 가입자면 약관·개인정보 동의 창 표시
  }else{
    ME.nick="나";
    globalChatNotifUserId=null;
    unsubscribeFromNotifications();
    NOTIFS=NOTIFS.filter(function(n){return !n.dbId});
    FOLLOW=new Set();FOLLOW_NAME={}; // 로그아웃 시 팔로우 비움
    syncNotifBadge();
  }
  if(document.getElementById("myProfileView"))openProfile();
}
// ===== 구글/네이버 로그인 =====
var GOOGLE_CLIENT_ID="622866923710-mcbkmbrcvnv0o3a7uefjqaqr6e5afbhk.apps.googleusercontent.com";
var GOOGLE_G_SVG='<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';
function _gisReady(){return !!(window.google&&window.google.accounts&&window.google.accounts.id);}
// 네이버 로그인 노출 스위치: 네이버 개발자센터 '검수'가 승인되면 이 값을 true로만 바꿔 배포하면 네이버 버튼이 다시 나타남.
// (검수 전에는 앱 소유자만 로그인 가능하므로 일반 사용자에게 잠시 숨김)
var NAVER_LOGIN_ENABLED=false;
// 트위터(X) 로그인 노출 스위치 — X 개발자 앱을 만들고 Supabase에 키를 넣은 뒤 true로 바꿔 배포하면 버튼이 나타남.
// (설정 전에 켜 두면 눌렀을 때 오류만 나므로 기본은 꺼 둠. docs/트위터-로그인-설정.md 참고)
var TWITTER_LOGIN_ENABLED=true;
// 로그인 진입점(여러 곳에서 openLogin 대신 이 이름으로 호출) — 구글+네이버가 함께 있는 모달을 엶.
function loginWithGoogle(){ openLoginModal(); }
// 트위터(X)로 로그인.
// ⚠️ provider 문자열은 "twitter"가 아니라 **"x"** 다(OAuth 2.0 방식). 예전 1.0a 방식이 "twitter"이고 곧 없어진다.
function loginWithTwitter(){
  var hint=document.getElementById("loginHint");if(hint)hint.textContent="X로 이동 중…";
  window.supabase.auth.signInWithOAuth({provider:"x",options:{redirectTo:window.location.origin}});
}
// 네이버로 로그인: 서버(start)로 이동해 네이버 인증 시작
function loginWithNaver(){
  var hint=document.getElementById("loginHint");if(hint)hint.textContent="네이버로 이동 중…";
  location.href="/api/auth/naver/start";
}
function _loginRedirectFallback(){
  window.supabase.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin}});
}
async function _makeLoginNonce(){
  var nonce=btoa(String.fromCharCode.apply(null,crypto.getRandomValues(new Uint8Array(32))));
  var buf=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(nonce));
  var hashed=Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,"0");}).join("");
  return {nonce:nonce,hashed:hashed};
}
async function openLoginModal(){
  var m=document.getElementById("loginModal");if(!m)return;
  var gwrap=document.getElementById("gsiButton");
  // 네이버 버튼은 검수 승인 전까지 숨김(NAVER_LOGIN_ENABLED로 제어)
  var nvBtn=document.querySelector(".login-naver-btn");
  if(nvBtn)nvBtn.style.display=NAVER_LOGIN_ENABLED?"flex":"none";
  var twBtn=document.querySelector(".login-x-btn");
  if(twBtn)twBtn.style.display=TWITTER_LOGIN_ENABLED?"flex":"none";
  // 항상 '로그인' 모드로 열고 입력값은 비움(제목·안내문구·버튼 문구는 setLoginMode가 맞춰줌)
  ["lgEmail","lgPw","lgPw2","lgNick"].forEach(function(id){var el=document.getElementById(id);if(el)el.value="";});
  setLoginMode("login");
  // 구글도 네이버·X와 같은 모양의 버튼으로 통일한다.
  // ⚠️ 구글이 직접 그려주는 버튼(GIS)은 생김새를 바꿀 수 없어서, 우리 버튼 + 리다이렉트 방식으로 맞췄다.
  //    (원래 GIS 팝업 방식은 PWA에서 막혀 어차피 리다이렉트로 빠지고 있었다)
  if(gwrap)gwrap.innerHTML='<button type="button" class="lg-social" onclick="_loginRedirectFallback()">'+
    '<span class="lg-social-ic gg">'+GOOGLE_G_SVG+'</span>Google로 계속하기</button>';
  m.classList.add("open");document.body.style.overflow="hidden";
  return;
  var n;
  try{n=await _makeLoginNonce();}catch(e){
    if(gwrap)gwrap.innerHTML='<button type="button" class="login-google-btn" onclick="_loginRedirectFallback()">'+GOOGLE_G_SVG+'구글로 로그인</button>';
    m.classList.add("open");document.body.style.overflow="hidden";return;
  }
  google.accounts.id.initialize({
    client_id:GOOGLE_CLIENT_ID,
    callback:function(resp){onGoogleCredential(resp,n.nonce);},
    nonce:n.hashed,
    ux_mode:"popup",
    auto_select:false,
    cancel_on_tap_outside:true
  });
  m.classList.add("open");document.body.style.overflow="hidden";
  if(gwrap){gwrap.innerHTML="";
    try{google.accounts.id.renderButton(gwrap,{theme:"outline",size:"large",type:"standard",text:"continue_with",shape:"pill",logo_alignment:"center",width:260,locale:"ko"});}catch(e){}
  }
}
function closeLoginModal(){var m=document.getElementById("loginModal");if(m)m.classList.remove("open");document.body.style.overflow="";}

/* ===== commi 자체 회원가입·로그인 (이메일 + 비밀번호) =====
   Supabase Auth의 이메일 계정 기능을 사용. 소셜 로그인(구글·네이버)과 같은 회원으로 취급되며,
   가입 시 handle_new_user 트리거가 프로필·닉네임을 만들고, 약관 동의 창도 동일하게 뜬다.
   모드: login(로그인) / signup(회원가입) / reset(비밀번호 찾기) / newpw(새 비밀번호 설정) */
var _loginMode="login";
var LOGIN_ID_DOMAIN="users.commi.kr"; // 아이디 계정을 Supabase에 저장할 때 쓰는 내부 도메인(메일 발송 없음)
var LOGIN_ID_RE=/^[a-z][a-z0-9_]{3,19}$/;
// 아이디로 입력했으면 내부 이메일로 바꿔줌. '@'가 있으면 이메일로 그대로 사용.
function _idToEmail(v){v=String(v||"").trim();return v.indexOf("@")>-1?v:(v.toLowerCase()+"@"+LOGIN_ID_DOMAIN);}
function _lgEl(id){return document.getElementById(id);}
function _lgSubmitLabel(mode){return mode==="signup"?"가입하기":mode==="reset"?"재설정 메일 보내기":mode==="newpw"?"비밀번호 변경":"로그인";}
function setLoginMode(mode){
  _loginMode=mode;
  var show=function(id,on){var el=_lgEl(id);if(el)el.style.display=on?"":"none";};
  var title=_lgEl("loginTitle"),desc=_lgEl("loginDesc"),submit=_lgEl("lgSubmit"),hint=_lgEl("loginHint");
  if(hint)hint.textContent="";
  var isLogin=mode==="login",isSignup=mode==="signup",isReset=mode==="reset",isNew=mode==="newpw";
  show("loginSocial",isLogin);                 // 소셜 버튼은 로그인 화면에서만
  show("lgSafeBox",isLogin||isSignup);         // 안전 안내는 계정을 만들거나 들어올 때만 의미 있음
  show("loginAltBtn",isLogin);
  show("lgEmail",!isNew);                      // 새 비밀번호 설정에선 이메일 입력 불필요
  show("lgPw",!isReset);
  show("lgPw2",isSignup||isNew);
  show("lgNick",isSignup);
  show("lgToSignup",isLogin); show("lgToReset",isLogin); show("lgToLogin",isSignup||isReset);
  if(title)title.textContent=isSignup?"회원가입":isReset?"비밀번호 찾기":isNew?"새 비밀번호":"로그인";
  if(desc)desc.textContent=isSignup?"이메일 없이 아이디만으로 가입할 수 있어요."
    :isReset?"이메일로 가입한 계정만 재설정 링크를 받을 수 있어요."
    :isNew?"새로 사용할 비밀번호를 입력해주세요."
    :"그림 그리는 사람들의 커뮤니티";
  var idIn=_lgEl("lgEmail");
  if(idIn){
    idIn.placeholder=isSignup?"아이디 (영문 소문자·숫자 4~20자)":isReset?"가입한 이메일":"아이디 또는 이메일";
    idIn.type=isReset?"email":"text";
    idIn.setAttribute("autocomplete",isSignup?"username":isReset?"email":"username");
  }
  var nick=_lgEl("lgNick");if(nick)nick.placeholder="닉네임 (2~12자, 미입력 시 아이디)";
  if(submit)submit.textContent=_lgSubmitLabel(mode);
  var pw=_lgEl("lgPw");if(pw){pw.placeholder=isSignup||isNew?"비밀번호 (8자 이상)":"비밀번호";pw.setAttribute("autocomplete",isSignup||isNew?"new-password":"current-password");}
}
function loginSubmit(){
  if(_loginMode==="signup")return emailSignup();
  if(_loginMode==="reset")return sendResetEmail();
  if(_loginMode==="newpw")return applyNewPassword();
  return emailLogin();
}
// Supabase가 주는 영어 오류 메시지를 사용자에게 보여줄 한국어 문구로 바꿈
function authErrMsg(msg){
  msg=String(msg||"");
  if(/Invalid login credentials/i.test(msg))return "이메일 또는 비밀번호가 맞지 않아요.";
  if(/Email not confirmed/i.test(msg))return "이메일 인증이 아직 안 됐어요. 메일함에서 인증 링크를 눌러주세요.";
  if(/User already registered|already been registered/i.test(msg))return "이미 가입된 이메일이에요. 로그인하거나 비밀번호 찾기를 이용해주세요.";
  if(/Password should be at least/i.test(msg))return "비밀번호가 너무 짧아요. 8자 이상으로 만들어주세요.";
  if(/rate limit|too many requests/i.test(msg))return "요청이 많아 잠시 제한됐어요. 잠시 후 다시 시도해주세요.";
  if(/Unable to validate email|invalid format/i.test(msg))return "이메일 주소 형식을 확인해주세요.";
  if(/email address.*is invalid|invalid email/i.test(msg))return "사용할 수 없는 이메일 주소예요. 실제로 쓰는 이메일을 입력해주세요.";
  if(/For security purposes|after \d+ seconds/i.test(msg))return "잠시 후 다시 시도해주세요.";
  return "처리에 실패했어요: "+msg;
}
function _lgBusy(on,label){
  var b=_lgEl("lgSubmit");if(!b)return;
  b.disabled=on;
  // 버튼 문구만 되돌린다(setLoginMode를 부르면 방금 띄운 오류 안내가 지워지므로 쓰지 않음)
  b.textContent=on?(label||"처리 중…"):_lgSubmitLabel(_loginMode);
}
function _lgHint(text){var h=_lgEl("loginHint");if(h)h.textContent=text||"";}
async function emailLogin(){
  var idOrEmail=((_lgEl("lgEmail")||{}).value||"").trim(),pw=(_lgEl("lgPw")||{}).value||"";
  if(!idOrEmail||!pw){_lgHint("아이디와 비밀번호를 입력해주세요.");return;}
  _lgBusy(true,"로그인 중…");
  try{
    if(idOrEmail.indexOf("@")>-1){ // 이메일로 로그인
      var r=await window.supabase.auth.signInWithPassword({email:idOrEmail,password:pw});
      if(r.error){_lgHint(authErrMsg(r.error.message));_lgBusy(false);return;}
    }else{
      // 아이디 로그인 — 대부분은 '아이디@내부도메인'이므로 Supabase로 바로 시도(서버를 안 거쳐 빠름).
      var direct=await window.supabase.auth.signInWithPassword({email:_idToEmail(idOrEmail),password:pw});
      if(direct.error){
        // 복구용 이메일을 등록해 로그인 이메일이 바뀐 계정일 수 있으니, 그때만 서버에서 계정을 찾아 처리
        var res=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},
          body:JSON.stringify({loginId:idOrEmail.toLowerCase(),password:pw})});
        var j=null;try{j=await res.json();}catch(e){}
        if(!res.ok||!j||!j.ok){_lgHint((j&&j.message)||"아이디 또는 비밀번호가 맞지 않아요.");_lgBusy(false);return;}
        var s=await window.supabase.auth.setSession({access_token:j.access_token,refresh_token:j.refresh_token});
        if(s.error){_lgHint("로그인 처리에 실패했어요. 다시 시도해주세요.");_lgBusy(false);return;}
      }
    }
    closeLoginModal();toast("로그인했어요","✓"); // 세션 반영은 onAuthStateChange가 처리
  }catch(e){_lgHint(authErrMsg(e&&e.message));}
  _lgBusy(false);
}
/* ===== 복구용 이메일 등록 =====
   아이디로 가입한 계정은 연결된 메일함이 없어 비밀번호를 찾을 수 없다.
   여기서 실제 이메일을 등록하면 확인 메일이 가고, 링크를 누르면 그 이메일이 계정에 연결돼
   이후 "비밀번호 찾기"를 쓸 수 있다. 아이디 로그인은 login_ids 표 덕분에 그대로 유지된다. */
function openRecoveryEmail(){
  var m=document.getElementById("recoveryModal");if(!m)return;
  var cur=(AUTH.user&&AUTH.user.email)||"";
  var isInternal=/@users\.commi\.kr$/i.test(cur);
  var info=document.getElementById("recoveryCurrent");
  if(info)info.textContent=isInternal?"아직 등록된 이메일이 없어요.":("현재 등록된 이메일: "+cur);
  var inp=document.getElementById("recoveryInput");if(inp)inp.value="";
  var hint=document.getElementById("recoveryHint");if(hint)hint.textContent="";
  m.classList.add("open");document.body.style.overflow="hidden";
}
function closeRecoveryEmail(){var m=document.getElementById("recoveryModal");if(m)m.classList.remove("open");document.body.style.overflow="";}

/* ===== 성인 게시판 본인확인(연령 확인) =====
   포트원(PortOne) V2 + KG이니시스 통합 본인인증.
   ⚠️ 여기서 하는 건 "인증창을 띄우고 결과 id를 서버로 넘기는 것"까지다.
      실제 합격 판정은 /api/auth/adult-verify 가 포트원 API로 다시 조회해서 내린다.
      (브라우저가 보낸 값을 믿으면 콘솔에서 한 줄로 우회당한다.)                     */
var PORTONE_STORE_ID="";    // 관리자 콘솔 → 결제 연동에서 확인 (계약 후 입력)
var PORTONE_CHANNEL_KEY="";  // 채널 관리 탭의 KG이니시스 통합 본인인증 채널 키
var ADULT_VERIFY_READY=!!(PORTONE_STORE_ID&&PORTONE_CHANNEL_KEY);

function isAdultVerified(){return !!(AUTH.profile&&AUTH.profile.adult_verified);}
function _adultHint(t){var h=document.getElementById("adultHint");if(h)h.textContent=t||"";}
function _adultBusy(on,label){
  var b=document.getElementById("adultStartBtn");if(!b)return;
  b.disabled=!!on;b.textContent=on?(label||"확인 중…"):"본인인증 하기";
}
function openAdultGate(){
  var m=document.getElementById("adultModal");if(!m)return;
  _adultHint("");_adultBusy(false);
  m.classList.add("open");document.body.style.overflow="hidden";
}
function closeAdultGate(){
  var m=document.getElementById("adultModal");if(m)m.classList.remove("open");
  document.body.style.overflow="";
}

// 포트원 브라우저 SDK를 필요할 때만 불러온다(평소 로딩 속도에 영향 없게)
function loadPortOneSdk(){
  if(window.PortOne)return Promise.resolve();
  return new Promise(function(resolve,reject){
    var s=document.createElement("script");
    s.src="https://cdn.portone.io/v2/browser-sdk.js";
    s.onload=function(){resolve();};
    s.onerror=function(){reject(new Error("sdk"));};
    document.head.appendChild(s);
  });
}

// 인증 결과 id를 서버로 보내 최종 판정을 받는다
async function _submitAdultVerification(verificationId){
  var sess=await window.supabase.auth.getSession();
  var token=sess.data.session?sess.data.session.access_token:null;
  if(!token){_adultHint("로그인이 필요해요.");_adultBusy(false);return false;}
  var res=await fetch("/api/auth/adult-verify",{
    method:"POST",
    headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
    body:JSON.stringify({identityVerificationId:verificationId})
  });
  var j=null;try{j=await res.json();}catch(e){}
  if(!res.ok||!j||!j.ok){
    _adultHint((j&&j.message)||"인증에 실패했어요. 잠시 후 다시 시도해주세요.");
    _adultBusy(false);return false;
  }
  // 프로필을 다시 읽어 adult_verified를 반영(이 값으로 게시판 접근이 열린다)
  var pr=await window.supabase.from("profiles").select("*").eq("id",AUTH.user.id).single();
  if(!pr.error)AUTH.profile=pr.data;
  closeAdultGate();
  toast("성인 인증이 완료됐어요","🔞");
  return true;
}

async function startAdultVerification(){
  if(!AUTH.user){_adultHint("먼저 로그인해주세요.");return;}
  if(!ADULT_VERIFY_READY){_adultHint("본인확인 서비스가 아직 연결되지 않았어요.");return;}
  _adultHint("");_adultBusy(true,"인증창을 여는 중…");
  try{
    await loadPortOneSdk();
    // 이 건을 구분하는 고유값. 서버가 이 id로 포트원에 결과를 조회한다.
    var vid="adult-"+AUTH.user.id.slice(0,8)+"-"+Date.now();
    var r=await window.PortOne.requestIdentityVerification({
      storeId:PORTONE_STORE_ID,
      channelKey:PORTONE_CHANNEL_KEY,
      identityVerificationId:vid,
      // 모바일은 대부분 리다이렉트 방식으로 동작한다. 돌아왔을 때 이어서 처리하려고 표시를 남긴다.
      redirectUrl:location.origin+"/?adultVerify=1"
    });
    // code가 있으면 인증창에서 실패하거나 사용자가 취소한 것
    if(r&&r.code){
      _adultHint(r.message||"인증이 취소됐어요.");_adultBusy(false);return;
    }
    _adultBusy(true,"확인 중…");
    await _submitAdultVerification((r&&r.identityVerificationId)||vid);
  }catch(e){
    _adultHint("인증창을 열지 못했어요. 잠시 후 다시 시도해주세요.");
    _adultBusy(false);
  }
}

// 모바일 리다이렉트로 돌아온 경우 처리(주소에 결과가 실려 온다).
// 주소는 renderList()의 pushState 등으로 곧 정리되므로 스크립트가 뜨자마자 붙잡아 둔다.
var _adultReturnQS=(function(){
  try{return /(^|[?&])adultVerify=1/.test(location.search)?location.search:"";}catch(e){return "";}
})();
async function resumeAdultVerification(){
  if(!_adultReturnQS)return;
  var q=new URLSearchParams(_adultReturnQS);
  var vid=q.get("identityVerificationId");
  _adultReturnQS="";
  if(!vid)return;
  try{history.replaceState({},"",location.pathname);}catch(e){}
  if(!AUTH.user)return;
  openAdultGate();_adultBusy(true,"확인 중…");
  var code=q.get("code");
  if(code){_adultHint(q.get("message")||"인증이 취소됐어요.");_adultBusy(false);return;}
  await _submitAdultVerification(vid);
}
async function saveRecoveryEmail(){
  var inp=document.getElementById("recoveryInput"),hint=document.getElementById("recoveryHint"),btn=document.getElementById("recoverySaveBtn");
  var email=((inp||{}).value||"").trim();
  var setHint=function(t){if(hint)hint.textContent=t;};
  if(!email||email.indexOf("@")<1||email.indexOf(".")<0){setHint("이메일 주소를 확인해주세요.");return;}
  if(/@users\.commi\.kr$/i.test(email)){setHint("실제로 사용하는 이메일을 입력해주세요.");return;}
  if(!AUTH.user){setHint("로그인 상태를 확인해주세요.");return;}
  if(btn){btn.disabled=true;btn.textContent="보내는 중…";}
  try{
    var r=await window.supabase.auth.updateUser({email:email});
    if(r.error){setHint(authErrMsg(r.error.message));} // 실패하면 고칠 수 있게 창을 열어 둠
    else{
      closeRecoveryEmail(); // 성공하면 창을 닫고 안내는 토스트로
      toast("확인 메일을 보냈어요. 메일함에서 링크를 눌러주세요","✉️");
    }
  }catch(e){setHint(authErrMsg(e&&e.message));}
  if(btn){btn.disabled=false;btn.textContent="확인 메일 보내기";}
}
// 아이디 회원가입 — 서버(/api/auth/signup)가 인증 완료 상태로 계정을 만들고, 이어서 바로 로그인시킨다.
async function emailSignup(){
  var loginId=((_lgEl("lgEmail")||{}).value||"").trim().toLowerCase();
  var pw=(_lgEl("lgPw")||{}).value||"",pw2=(_lgEl("lgPw2")||{}).value||"";
  var nick=((_lgEl("lgNick")||{}).value||"").trim();
  if(!loginId){_lgHint("아이디를 입력해주세요.");return;}
  if(!LOGIN_ID_RE.test(loginId)){_lgHint("아이디는 영문 소문자로 시작하는 4~20자(영문·숫자·밑줄)로 만들어주세요.");return;}
  if(pw.length<8){_lgHint("비밀번호는 8자 이상으로 만들어주세요.");return;}
  if(pw!==pw2){_lgHint("비밀번호가 서로 달라요.");return;}
  if(nick&&(nick.length<2||nick.length>12)){_lgHint("닉네임은 2~12자로 입력해주세요.");return;}
  _lgBusy(true,"가입 중…");
  try{
    var res=await fetch("/api/auth/signup",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({loginId:loginId,password:pw,nickname:nick})});
    var j=null;try{j=await res.json();}catch(e){}
    if(!res.ok||!j||!j.ok){_lgHint((j&&j.message)||"가입에 실패했어요. 잠시 후 다시 시도해주세요.");_lgBusy(false);return;}
    // 가입 직후 바로 로그인
    var r=await window.supabase.auth.signInWithPassword({email:_idToEmail(loginId),password:pw});
    if(r.error){setLoginMode("login");_lgHint("가입은 됐어요. 아이디와 비밀번호로 로그인해주세요.");_lgBusy(false);return;}
    closeLoginModal();track("signup");toast("환영해요! 가입이 완료됐어요","🎉");
  }catch(e){_lgHint("가입 중 오류가 났어요: "+((e&&e.message)||e));}
  _lgBusy(false);
}
async function sendResetEmail(){
  var email=((_lgEl("lgEmail")||{}).value||"").trim();
  if(!email){_lgHint("가입한 이메일을 입력해주세요.");return;}
  // 아이디 계정의 내부 주소(아이디@users.commi.kr)는 실제로 받는 사람이 없어 메일이 반송된다.
  // 반송이 쌓이면 발송 평판이 나빠지므로 아예 보내지 않고 안내한다.
  if(new RegExp("@"+LOGIN_ID_DOMAIN.replace(/\./g,"\\.")+"$","i").test(email)){
    _lgHint("아이디로 가입한 계정은 먼저 '내 정보 → 설정 → 복구용 이메일'을 등록해야 재설정 링크를 받을 수 있어요.");return;
  }
  _lgBusy(true,"메일 보내는 중…");
  try{
    // ?pwreset=1 을 붙여 두면, 돌아왔을 때 이벤트를 놓쳐도 주소만 보고 새 비밀번호 창을 띄울 수 있다
    var r=await window.supabase.auth.resetPasswordForEmail(email,{redirectTo:location.origin+"/?pwreset=1"});
    if(r.error){_lgHint(authErrMsg(r.error.message));_lgBusy(false);return;}
    _lgHint("재설정 메일을 보냈어요. 메일함을 확인해주세요.");
    toast("비밀번호 재설정 메일을 보냈어요 ✉️");
  }catch(e){_lgHint(authErrMsg(e&&e.message));}
  _lgBusy(false);
}
async function applyNewPassword(){
  var pw=(_lgEl("lgPw")||{}).value||"",pw2=(_lgEl("lgPw2")||{}).value||"";
  if(pw.length<8){_lgHint("비밀번호는 8자 이상으로 만들어주세요.");return;}
  if(pw!==pw2){_lgHint("비밀번호가 서로 달라요.");return;}
  _lgBusy(true,"변경 중…");
  try{
    var r=await window.supabase.auth.updateUser({password:pw});
    if(r.error){_lgHint(authErrMsg(r.error.message));_lgBusy(false);return;}
    closeLoginModal();toast("비밀번호를 바꿨어요","✓");
  }catch(e){_lgHint(authErrMsg(e&&e.message));}
  _lgBusy(false);
}
// 비밀번호 재설정 링크로 들어온 경우 — 새 비밀번호 입력 창을 띄움
function openNewPasswordModal(){
  var m=_lgEl("loginModal");if(!m)return;
  ["lgEmail","lgPw","lgPw2","lgNick"].forEach(function(id){var el=_lgEl(id);if(el)el.value="";});
  setLoginMode("newpw");
  m.classList.add("open");document.body.style.overflow="hidden";
}
async function onGoogleCredential(resp,rawNonce){
  var hint=document.getElementById("loginHint");if(hint)hint.textContent="로그인 중…";
  try{
    var r=await window.supabase.auth.signInWithIdToken({provider:"google",token:resp.credential,nonce:rawNonce});
    if(r.error){if(hint)hint.textContent="로그인 실패: "+r.error.message;toast("로그인 실패: "+r.error.message);return;}
    closeLoginModal();toast("로그인했어요","✓");
    // 세션 반영은 onAuthStateChange→applySession이 처리(프로필 로드·동의 게이트 등)
  }catch(e){if(hint)hint.textContent="로그인 오류: "+((e&&e.message)||e);}
}
// ===== 이용약관·개인정보 처리방침 동의 (신규 가입 시 필수) =====
// agreed_at이 비어있는 신규 가입자만 표시. 동의하면 서버(agree_to_terms)에 시각 기록.
function maybeShowConsent(){
  if(!AUTH.user||!AUTH.profile)return;
  if(AUTH.profile.agreed_at)return;           // 이미 동의함
  var m=document.getElementById("consentModal");if(!m)return;
  var t=document.getElementById("consentTerms"),p=document.getElementById("consentPrivacy"),a=document.getElementById("consentAll");
  if(t)t.checked=false;if(p)p.checked=false;if(a)a.checked=false;
  consentCheck();
  m.classList.add("open");
  document.body.style.overflow="hidden";
}
function consentToggleAll(on){
  var t=document.getElementById("consentTerms"),p=document.getElementById("consentPrivacy");
  if(t)t.checked=on;if(p)p.checked=on;
  consentCheck();
}
function consentCheck(){
  var t=document.getElementById("consentTerms"),p=document.getElementById("consentPrivacy");
  var a=document.getElementById("consentAll"),b=document.getElementById("consentOkBtn");
  var both=!!(t&&t.checked&&p&&p.checked);
  if(a)a.checked=both;
  if(b)b.disabled=!both;
}
function closeConsent(){
  var m=document.getElementById("consentModal");if(m)m.classList.remove("open");
  document.body.style.overflow="";
}
async function submitConsent(){
  var t=document.getElementById("consentTerms"),p=document.getElementById("consentPrivacy");
  if(!(t&&t.checked&&p&&p.checked))return;
  if(!AUTH.user||!window.supabase){toast("로그인 상태를 확인해주세요");return;}
  var b=document.getElementById("consentOkBtn");
  if(b){b.disabled=true;b.textContent="처리 중…";}
  try{
    var res=await window.supabase.rpc("agree_to_terms");
    if(res.error){toast("동의 처리 실패: "+res.error.message);if(b){b.disabled=false;b.textContent="동의하고 시작하기";}return;}
    if(AUTH.profile)AUTH.profile.agreed_at=new Date().toISOString();
    closeConsent();
    toast("환영해요! commi에 오신 걸 축하해요","🎉");
  }catch(e){
    toast("동의 처리 중 오류: "+((e&&e.message)||e));
    if(b){b.disabled=false;b.textContent="동의하고 시작하기";}
  }
}
async function declineConsent(){
  closeConsent();
  await logout(); // 동의 안 하면 로그아웃 → 서비스 미사용
}
async function logout(){
  await window.supabase.auth.signOut();
  chatListCache=null; // 다른 계정이 이전 사용자의 채팅 목록을 보지 않도록 캐시 비움
  toast("로그아웃했어요");
  openProfile();
}

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function boardName(id){
  for(var g of BOARDS)for(var b of g.items)if(b.id===id)return b.name;
  if(id==="trade")return"커미션 구인구직";
  if(id==="review")return"커미션 후기";
  return"전체 글";
}
function catFor(p){return CATMAP[p.board]||{label:"글",cls:"free-c"}}
// 게시판별 이모지. 글쓰기의 게시판 고르는 자리에서 한눈에 구분되게 쓴다.
// 색은 따로 정하지 않고 CATMAP의 말머리 색(talk-c·help-c…)을 그대로 가져와,
// 고를 때 본 색과 글에 붙는 말머리 색이 어긋나지 않게 한다.
var BOARD_EMOJI={talk:"💬",doodle:"✏️",wip:"🎨",sketch:"📖",ask:"❓",vote:"🗳️",crit:"👀",ilchim:"⚡",
  collab:"🤝",challenge:"🏁",tip:"💡",request:"🎁",recruit:"📢",used:"📦",suggest:"🛠️",adult:"🔞",
  review:"⭐",trade:"💰",all:"📋"};
function boardEmoji(id){return BOARD_EMOJI[id]||"📄";}
function boardCls(id){return (CATMAP[id]&&CATMAP[id].cls)||"free-c";}
// 작업 단계(러프/선화/채색/완성) 라벨은 그 개념이 있는 게시판에서만 표시.
// 자유게시판 등에 그냥 올린 그림에 "완성"이 붙던 문제 방지(예전에 저장된 글도 함께 해결).
function stageTagHTML(p){
  if(!p.stage)return"";
  if(p.board!=="wip"&&p.board!=="sketch")return"";
  return '<span class="nstage">'+esc(p.stage)+'</span>';
}
function postThumbHTML(p){
  var imgCount=p.images?p.images.length:((p.thumb!=="none")?(Math.floor(p.likes/18)%6+1):0); // demo image-count badge
  if(p.images&&p.images.length){
    return '<div class="nthumb"><img src="'+esc(p.images[0])+'" alt="" style="width:100%;height:100%;object-fit:cover">'+
      stageTagHTML(p)+
      (imgCount>1?'<span class="ncount">'+imgCount+'+</span>':'')+
    '</div>';
  }
  if(p.thumb==="none")return"";
  return '<div class="nthumb '+p.thumb+'">'+
    stageTagHTML(p)+
    (imgCount>1?'<span class="ncount">'+imgCount+'+</span>':'')+
  '</div>';
}
function fmtViews(n){return n>=1000?(n/1000).toFixed(1)+"k":n}

function renderNav(el){
  var h="";
  BOARDS.forEach(function(g){
    h+='<div class="bn-group'+(g.trade?' trade':'')+'"><p class="bn-gl">'+g.group+'</p>';
    g.items.forEach(function(b){
      var cnt=POSTS.filter(function(p){return p.board===b.id}).length;
      // 아이콘은 상단 게시판 탭과 동일한 이모지를 사용(없으면 기존 선 아이콘으로 대체)
      var ic=CHIP_EMOJI[b.id]?('<span class="bn-emo">'+CHIP_EMOJI[b.id]+'</span>'):b.icon;
      h+='<div class="bn-a'+(state.board===b.id?' on':'')+'" onclick="selectBoard(\''+b.id+'\')">'+ic+b.name+(cnt?'<span class="cnt">'+cnt+'</span>':'')+'</div>';
    });
    h+='</div>';
  });
  el.innerHTML=h;
}
// 상단 게시판 탭에 붙는 이모지(게시판 성격에 맞춤). 왼쪽 서랍 메뉴는 기존 선 아이콘 그대로.
var CHIP_EMOJI={all:"📋",talk:"💬",doodle:"✏️",wip:"🎨",sketch:"📚",ask:"❓",vote:"📊",crit:"💡",
  collab:"🤝",challenge:"🏆",tip:"📁",request:"🙏",recruit:"🔍",used:"📦",suggest:"🛠",adult:"🔞",ilchim:"💢"};
// 성격이 비슷한 게시판끼리 같은 색 계열로 묶음 — 색만 봐도 대략 어떤 종류인지 알 수 있게(파스텔 톤)
// g-all 전체(중립) / g-talk 이야기·소통(핑크) / g-art 그림·작업(퍼플) / g-trade 거래(블루) / g-event 함께·이벤트(그린) / g-etc 기타(그레이)
var CHIP_GROUP={all:"g-all",
  talk:"g-talk",ask:"g-talk",vote:"g-talk",
  doodle:"g-art",wip:"g-art",sketch:"g-art",crit:"g-art",ilchim:"g-art",
  request:"g-trade",recruit:"g-trade",used:"g-trade",
  collab:"g-event",challenge:"g-event",tip:"g-event",
  suggest:"g-etc",adult:"g-etc"};
function chipsHTML(){
  var flat=[{id:"all",name:"전체 글"}];
  BOARDS.forEach(function(g){g.items.forEach(function(b){if(b.id!=="all")flat.push(b)})});
  return flat.map(function(b){
    var emo=CHIP_EMOJI[b.id]?'<span class="chip-emo">'+CHIP_EMOJI[b.id]+'</span>':'';
    var grp=CHIP_GROUP[b.id]||"g-etc"; // 성격별 색 계열
    return '<button class="chip '+grp+(state.board===b.id?' on':'')+'" onclick="selectBoard(\''+b.id+'\')">'+emo+b.name+'</button>';
  }).join("");
}
// 게시판 탭은 화면 최상단이 아니라 목록 위(최신·인기 탭 바로 아래)에 그림 → renderList가 이 HTML을 끼워 넣음
function boardTabsHTML(){
  return '<div class="boardtabs" id="catbar"><div class="catbar-inner" id="chips">'+chipsHTML()+'</div></div>';
}
function renderChips(){
  var el=document.getElementById("chips"); // 목록 화면이 아닐 땐(커미션·프로필 등) 없으므로 건너뜀
  if(el){saveChipScroll();el.innerHTML=chipsHTML();syncChipScroll();}
}
// 목록을 다시 그리면 게시판 탭도 새로 만들어져 가로 스크롤이 맨 앞으로 초기화됨.
// → 다시 그리기 직전 위치를 기억했다가 그대로 되돌려, 보고 있던 자리에 머무르게 한다.
var _chipScrollLeft=0,_tagScrollLeft=0,_tagScrollBoard=null; // 게시판 탭 / 말머리 바의 가로 스크롤 위치
function saveChipScroll(){
  var el=document.getElementById("chips");if(el)_chipScrollLeft=el.scrollLeft;
  // 말머리는 게시판마다 목록이 다르므로, 화면에 그려져 있던 말머리가 지금 게시판 것일 때만 위치를 보존한다.
  // (게시판을 바꾼 직후엔 state.board는 새 게시판인데 DOM은 아직 이전 게시판 말머리 → 그때는 0으로)
  var tb=document.querySelector(".tagbar");
  if(tb&&_tagScrollBoard===state.board)_tagScrollLeft=tb.scrollLeft;
  else if(_tagScrollBoard!==state.board)_tagScrollLeft=0;
}
function syncChipScroll(){
  var el=document.getElementById("chips");if(el)el.scrollLeft=_chipScrollLeft;
  var tb=document.querySelector(".tagbar");if(tb)tb.scrollLeft=_tagScrollLeft;
  _tagScrollBoard=state.board; // 방금 그린 말머리가 어느 게시판 것인지 기록
}
function renderHot(){
  var el=document.getElementById("hotList");if(!el)return;
  var top=sortHot(POSTS.filter(function(p){return p.board!=="trade"&&p.board!=="review"})).slice(0,3);
  el.innerHTML=top.map(function(p,i){
    return '<div class="hot" onclick="openPost('+p.id+')"><span class="rank serif">'+(i+1)+'</span><div><div class="ht">'+esc(p.title)+'</div><div class="hm">💬 '+p.comments.length+' · '+catFor(p).label+'</div></div></div>';
  }).join("");
}
function hotMultiplier(createdAt){
  if(!createdAt)return{mult:0.6,within7:false};
  var days=Math.floor((Date.now()-new Date(createdAt).getTime())/86400000);
  if(days<7)return{mult:2-0.2*days,within7:true};
  return{mult:0.6,within7:false}; // 7일째 배수(2-0.2*7)로 고정
}
function hotScore(p){
  var base=(p.views||0)*0.02+(p.likes||0)*1+(p.comments?p.comments.length:0)*0.2;
  var m=hotMultiplier(p.createdAt);
  return{score:base*m.mult,within7:m.within7};
}
function sortHot(arr){
  var picked=arr.filter(function(p){return p.isManagerPick});
  var rest=arr.filter(function(p){return !p.isManagerPick});
  var scored=rest.map(function(p){var r=hotScore(p);return{p:p,score:r.score,within7:r.within7};});
  var freshCount=scored.filter(function(x){return x.within7}).length;
  var pool=freshCount>10?scored.filter(function(x){return x.within7}):scored;
  pool.sort(function(a,b){return b.score-a.score});
  var sortedRest=pool.map(function(x){return x.p});
  if(!picked.length)return sortedRest;

  // 매니저 픽끼리 위치가 겹치면 최근에 지정한 게 그 자리를 차지하고, 밀린 픽은 다음 빈 자리로 밀려남
  var sortedPicked=picked.slice().sort(function(a,b){
    var posA=a.pickPosition||1,posB=b.pickPosition||1;
    if(posA!==posB)return posA-posB;
    return new Date(b.pickedAt||0)-new Date(a.pickedAt||0);
  });
  var placements=[];var nextFreeMin=1;
  sortedPicked.forEach(function(p){
    var pos=Math.max(p.pickPosition||1,nextFreeMin);
    placements.push({post:p,position:pos});
    nextFreeMin=pos+1;
  });

  var result=[];var pi=0,ri=0;
  var maxPos=placements[placements.length-1].position;
  for(var pos=1;pos<=maxPos;pos++){
    if(pi<placements.length&&placements[pi].position===pos){result.push(placements[pi].post);pi++;}
    else if(ri<sortedRest.length){result.push(sortedRest[ri]);ri++;}
  }
  while(ri<sortedRest.length){result.push(sortedRest[ri]);ri++;}
  return result;
}
function filteredPosts(){
  var arr=POSTS.slice();
  if(state.board==="all")arr=arr.filter(function(p){return p.board!=="adult"&&(state.query||(p.board!=="trade"&&p.board!=="review"))});
  else arr=arr.filter(function(p){return p.board===state.board});
  if(state.tag)arr=arr.filter(function(p){return p.category===state.tag});
  if(state.query){var q=state.query.toLowerCase();arr=arr.filter(function(p){var body=(p.content||[]).join(" ").toLowerCase();return p.title.toLowerCase().indexOf(q)>-1||p.author.toLowerCase().indexOf(q)>-1||body.indexOf(q)>-1||(p.reviewedNickname&&p.reviewedNickname.toLowerCase().indexOf(q)>-1)})}
  if(state.sort==="hot")arr=sortHot(arr);
  return arr;
}
function renderTrend(){
  var g={t1:"#e07aa6,#9784d6",t2:"#e0a074,#e07aa6",t3:"#7cc3e0,#9784d6",t4:"#a3c07a,#7cc3e0",t5:"#ecd291,#e0a074"};
  var keys=["t1","t2","t3","t4","t5"];
  var h='<div class="trend-lead"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 7-7"/><path d="M17 8h4v4"/></svg>이번 주 인기</div>';
  var top=sortHot(POSTS.filter(function(p){return p.board!=="trade"&&p.board!=="review"})).slice(0,5);
  top.forEach(function(p,i){
    h+='<div class="trend-item" onclick="openPost('+p.id+')"><span class="trend-rank">'+(i+1)+'</span>'+
       '<span class="trend-thumb" style="background:linear-gradient(135deg,'+g[keys[i%keys.length]]+')"><svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"8\" cy=\"10\" r=\"1.3\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"12\" cy=\"8\" r=\"1.3\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"16\" cy=\"10\" r=\"1.3\" fill=\"currentColor\" stroke=\"none\"/></svg></span>'+
       '<span class="trend-meta"><span class="tt">'+esc(p.title)+'</span><span class="ts">'+catFor(p).label+' · 추천 '+p.likes+'</span></span></div>';
  });
  var el=document.getElementById("trendStrip");if(el)el.innerHTML=h;
}
function CATICON(board){
  return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 15l4-4 3 3 4-4 5 5"/></svg>';
}
function pagerHTML(tp){
  var h='<nav class="pager" aria-label="페이지">';
  h+='<button class="pg-arrow" '+(page<=1?'disabled':'')+' onclick="gotoPage('+(page-1)+')" aria-label="이전">‹</button>';
  var start=Math.max(1,page-2), end=Math.min(tp,start+4); start=Math.max(1,end-4);
  if(start>1){h+='<button class="pg-num" onclick="gotoPage(1)">1</button>';if(start>2)h+='<span class="pg-dots">…</span>';}
  for(var i=start;i<=end;i++)h+='<button class="pg-num'+(i===page?' on':'')+'" onclick="gotoPage('+i+')">'+i+'</button>';
  if(end<tp){if(end<tp-1)h+='<span class="pg-dots">…</span>';h+='<button class="pg-num" onclick="gotoPage('+tp+')">'+tp+'</button>';}
  h+='<button class="pg-arrow" '+(page>=tp?'disabled':'')+' onclick="gotoPage('+(page+1)+')" aria-label="다음">›</button>';
  return h+'</nav>';
}
function gotoPage(n){page=n;renderList();window.scrollTo({top:0,behavior:"smooth"});}
// 지면 배분(오픈 초기 = 유저 광고만): 유료는 AD_PAID_SHARE=0이라 서빙 안 함(나중에 켜면 그 비중만큼 유료).
// 유저 광고는 각 광고 확률 = min(4%, 그 광고 points_spent 지분)로 뽑음 — 개당 4% 상한만 있고 '전체' 상한은 없어
// 광고가 많으면 최대 100%까지 유저 광고로 채워지고, 남는 확률(1 - 합)은 하우스(포인트 안내 자리)로 감.
function pickServedAd(){
  if(AD_PAID_SHARE>0&&Math.random()<AD_PAID_SHARE){
    var camp=pickServableCampaign();
    if(camp)return {type:'paid',camp:camp};
  }
  if(ACTIVE_ADS.length){
    var total=ACTIVE_ADS.reduce(function(s,a){return s+(a.points_spent||1);},0);
    var r=Math.random(),cum=0;
    for(var i=0;i<ACTIVE_ADS.length;i++){
      cum+=Math.min(AD_PER_AD_SHARE_MAX,(ACTIVE_ADS[i].points_spent||1)/total); // 개당 4% 상한
      if(r<cum)return {type:'user',ad:ACTIVE_ADS[i]};
    }
  }
  return null; // 남는 확률 → 하우스
}
// 서빙된 광고 배너 HTML. extraClass로 지면별 마진 등을 얹음(.d-ad, .side-ad). 유료 배너만 data-campaign-id를 달아 측정 대상이 됨.
function servedBannerHTML(s,extraClass){
  var ec=extraClass?(' '+extraClass):'';
  if(s.type==='paid'){
    return '<div class="ad ad-banner'+ec+'" role="complementary" aria-label="광고" data-campaign-id="'+s.camp.id+'" style="cursor:pointer;position:relative" onclick="openCampaignTarget('+s.camp.id+')">'+
      '<span class="ad-label">광고</span><img src="'+esc(s.camp.image_url)+'" alt="광고"></div>';
  }
  return '<div class="ad ad-banner'+ec+'" role="complementary" aria-label="광고" style="cursor:pointer;position:relative" onclick="'+adTargetOnclick(s.ad)+'">'+
    '<span class="ad-label">유저 광고</span>'+
    '<button class="ad-report-btn" onclick="reportAd('+s.ad.id+',event)" title="이 광고 신고">🚩</button>'+
    '<img src="'+esc(s.ad.image_url)+'" alt="유저 광고"></div>';
}
function houseAdHTML(extraClass){
  var ec=extraClass?(' '+extraClass):'';
  return '<div class="ad'+ec+'" role="complementary" aria-label="광고">'+
    '<span class="ad-label">AD</span>'+
    '<div class="ad-ph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" style="width:22px;height:22px"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m4 18 5-5 4 3 3-2 4 4"/></svg></div>'+
    '<div class="ad-body"><div class="ad-t">열심히 활동해서 포인트를 모아보세요!</div>'+
    '<div class="ad-d">포인트를 사용하여 이 자리에 광고를 집행할 수 있어요!</div></div>'+
  '</div>';
}
function adRow(extraClass){
  var s=pickServedAd();
  return s?servedBannerHTML(s,extraClass):houseAdHTML(extraClass);
}
// 정적 하우스 광고 지면(게시글 상세 댓글란 위 .d-ad, 데스크톱 사이드바 .ad-widget)을 실제 서빙으로 교체.
// 재고가 없으면 기존 정적 하우스 광고를 그대로 둠.
function replaceStaticAdSlot(el,extraClass){
  if(!el)return;
  var s=pickServedAd();
  if(!s)return;
  var tmp=document.createElement('div');
  tmp.innerHTML=servedBannerHTML(s,extraClass);
  el.replaceWith(tmp.firstElementChild);
  observeAdBanners();
}
function renderDetailAd(){replaceStaticAdSlot(document.querySelector('#main .d-ad'),'d-ad');}
function renderSidebarAd(){replaceStaticAdSlot(document.querySelector('.side-r .ad-widget'),'side-ad');}
/* ---- 유료 광고 서빙(페이싱) + 뷰어블 노출 측정 ---- */
function pickServableCampaign(){
  var avail=ACTIVE_CAMPAIGNS.filter(function(c){return c.impressions_served<c.impression_goal;});
  if(!avail.length)return null;
  var now=Date.now();
  // 페이싱 가중치: "지금까지 나갔어야 할 양(목표×경과비율) − 실제 나간 양" = 뒤처진 정도. 뒤처진 캠페인일수록 우선.
  var weights=avail.map(function(c){
    var s=new Date(c.flight_start).getTime(),e=new Date(c.flight_end).getTime();
    var frac=e>s?Math.min(1,Math.max(0,(now-s)/(e-s))):1;
    var behind=c.impression_goal*frac-c.impressions_served;
    return Math.max(behind,1); // 최소 1로 바닥을 깔아 일정에 맞는 캠페인도 순번이 돌아가게
  });
  var total=weights.reduce(function(s,w){return s+w;},0);
  var r=Math.random()*total,cum=0;
  for(var i=0;i<avail.length;i++){cum+=weights[i];if(r<cum)return avail[i];}
  return avail[avail.length-1];
}
function openCampaignTarget(id){
  var c=ACTIVE_CAMPAIGNS.find(function(x){return x.id===id;});
  if(!c||!c.target_url)return;
  window.open(c.target_url,"_blank","noopener,noreferrer");
}
var adObserver=null;
var adImpressionPending={}; // campaignId -> 아직 서버에 안 보낸 노출 수
var adFlushTimer=null;
function ensureAdObserver(){
  if(adObserver||typeof IntersectionObserver==="undefined")return;
  adObserver=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      var el=en.target;
      if(en.isIntersecting&&en.intersectionRatio>=0.5){
        if(el._viewTimer)return;
        // 50% 이상이 1초 연속 보이면 뷰어블 노출 1회로 확정
        el._viewTimer=setTimeout(function(){
          el._viewTimer=null;
          if(el._counted)return;
          if(document.visibilityState!=="visible")return; // 백그라운드 탭은 제외
          el._counted=true;
          if(adObserver)adObserver.unobserve(el);
          queueAdImpression(parseInt(el.getAttribute("data-campaign-id"),10));
        },1000);
      }else if(el._viewTimer){
        clearTimeout(el._viewTimer);el._viewTimer=null; // 1초 안에 벗어나면 리셋
      }
    });
  },{threshold:[0,0.5,1]});
}
function observeAdBanners(){
  ensureAdObserver();
  if(!adObserver)return;
  var els=document.querySelectorAll("[data-campaign-id]"); // 피드(#main)뿐 아니라 사이드바(#main 밖)·상세 지면까지 포함
  for(var i=0;i<els.length;i++){
    var el=els[i];
    if(el._observed||el._counted)continue;
    el._observed=true;
    adObserver.observe(el);
  }
}
function queueAdImpression(id){
  if(!id)return;
  adImpressionPending[id]=(adImpressionPending[id]||0)+1;
  // 세션 내 페이싱/목표초과 방지를 위해 로컬 카운트도 같이 올림
  var c=ACTIVE_CAMPAIGNS.find(function(x){return x.id===id;});
  if(c){
    c.impressions_served++;
    if(c.impressions_served>=c.impression_goal)ACTIVE_CAMPAIGNS=ACTIVE_CAMPAIGNS.filter(function(x){return x.id!==id;});
  }
  if(!adFlushTimer)adFlushTimer=setTimeout(flushAdImpressions,4000);
}
async function flushAdImpressions(){
  adFlushTimer=null;
  var pending=adImpressionPending;adImpressionPending={};
  var ids=Object.keys(pending);
  if(!ids.length||!window.supabase)return;
  for(var i=0;i<ids.length;i++){
    var id=parseInt(ids[i],10),cnt=pending[ids[i]];
    while(cnt>0){
      var chunk=Math.min(cnt,20); // RPC가 한 번에 1~20만 받음
      await window.supabase.rpc("record_ad_impressions",{p_campaign_id:id,p_count:chunk});
      cnt-=chunk;
    }
  }
}
if(typeof document!=="undefined"){
  // 페이지를 떠나거나 탭이 숨겨질 때 남은 노출을 최대한 전송(완벽 보장은 아님)
  document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")flushAdImpressions();});
}
function renderList(){
  leaveChat();
  saveChipScroll(); // 다시 그리기 전에 게시판 탭의 가로 스크롤 위치를 기억(아래에서 그대로 복원)
  if(!state.query){ // 게시판별 URL(공유·SEO). 검색 중엔 주소를 바꾸지 않음.
    var _wantPath=(state.board!=="all")?("/board/"+state.board):"/";
    if(location.pathname!==_wantPath){history.pushState({},"",_wantPath);}
    document.title=(state.board!=="all")?(boardName(state.board)+" · commi"):"commi · 그림 그리는 사람들의 커뮤니티";
  }
  var main=document.getElementById("main");var arr=filteredPosts();
  var sub=state.query?('"'+esc(state.query)+'" 검색 결과 '+arr.length+'건'):(state.sort==="new"?"방금 올라온 이야기부터":"반응 많은 순으로");
  var h=boardHeaderHTML(sub); // 게시판 탭 + 말머리·정렬·보기 줄
  if(state.board==="all"&&!state.query){
    if(LATEST_NOTICE)h+='<div class="notice" onclick="showNotice()"><span class="pin">공지</span><span class="nt">📢 '+esc(LATEST_NOTICE.title)+'</span></div>';
    h+='<div class="notice" onclick="openRules()"><span class="pin">공지</span><span class="nt">📌 이용 규칙 & 피드백 매너 (처음 오셨다면 꼭!)</span></div>';
  }
  if(arr.length===0){
    h+='<div class="empty"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg><h3>아직 글이 없어요</h3><p>이 게시판의 첫 글을 남겨보세요.</p><button onclick="openWrite()">글쓰기</button></div>';
    main.innerHTML=h;syncChipScroll();return;
  }
  var totalPages=Math.max(1,Math.ceil(arr.length/PER));if(page>totalPages)page=totalPages;var visible=arr.slice((page-1)*PER,page*PER);
  if(state.board==="review"&&!state.query){
    h+=reviewAlbumHTML(visible);
    if(totalPages>1)h+=pagerHTML(totalPages);
    main.innerHTML=h;syncChipScroll();
    return;
  }
  if(state.viewMode==="album"){
    var albumArr=arr.filter(function(p){return p.images&&p.images.length});
    var albumTotalPages=Math.max(1,Math.ceil(albumArr.length/PER));if(page>albumTotalPages)page=albumTotalPages;
    var albumVisible=albumArr.slice((page-1)*PER,page*PER);
    if(!albumArr.length){
      h+='<div class="empty"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg><h3>이미지가 있는 글이 없어요</h3><p>앨범형은 이미지가 첨부된 글만 보여줘요.</p></div>';
    }else{
      h+=postAlbumHTML(albumVisible);
      if(albumTotalPages>1)h+=pagerHTML(albumTotalPages);
    }
    main.innerHTML=h;syncChipScroll();
    return;
  }
  h+='<div class="list">';
  var postsSinceAd=0,adGap=10+Math.floor(Math.random()*6); // 광고 간격: 10~15개 게시글마다 랜덤
  visible.forEach(function(p,idx){
    var c=catFor(p);
    var isHot=p.likes>=90;
    var thumb=postThumbHTML(p);
    h+='<div class="post rip'+(isHot?' hot-post':'')+(READ.has(p.id)?' read':'')+(p.id===justAddedId?' justAdded':'')+'" tabindex="0" role="button" onclick="openPost('+p.id+')" onkeydown="if(event.key===\'Enter\')openPost('+p.id+')">'+
      '<div class="pmain">'+
        '<div class="ptitle">'+(p.isManagerPick?'<span class="pick-badge">📌 매니저 픽</span> ':'')+esc(p.title)+'</div>'+
        '<div class="pmeta">'+
          '<span class="cat '+c.cls+'">'+c.label+'</span>'+
          '<span class="who"'+(p.authorId?' style="cursor:pointer" onclick="event.stopPropagation();openUserProfile(\''+p.authorId+'\')"':'')+'>'+esc(dispName(p.author))+anonIpHTML(p.ipMasked)+'</span>'+
          '<span class="sep"></span><span class="mt">'+p.time+'</span>'+
          '<span class="sep"></span><span class="mv">조회 '+fmtViews(p.views)+'</span>'+
          (p.likes?'<span class="sep"></span><span class="ml">추천 '+p.likes+'</span>':'')+
        '</div>'+
      '</div>'+
      thumb+
      '<div class="pcmt"><span class="cn'+(p.comments.length?' has':'')+'">'+p.comments.length+'</span><span class="cl">댓글</span></div>'+
    '</div>';
    postsSinceAd++;
    if(postsSinceAd>=adGap && idx!==visible.length-1){h+=adRow();postsSinceAd=0;adGap=10+Math.floor(Math.random()*6);}
  });
  h+='</div>';
  if(totalPages>1)h+=pagerHTML(totalPages);
  main.innerHTML=h;
  syncChipScroll();
  observeAdBanners();
}
function openPost(id){
  track("post_view");
  userLeftHome=true;
  resetScreens();
  leaveChat();
  var p=POSTS.find(function(x){return x.id===id});if(!p)return;p.views++;READ.add(id);saveRead();
  if(p.dbId&&window.supabase)window.supabase.rpc("increment_post_views",{p_id:p.dbId}).then(function(){});
  if(p.dbId){
    var targetPath="/post/"+p.dbId;
    if(location.pathname!==targetPath)history.pushState({},"",targetPath);
    document.title=p.title+" · commi";
  }
  renderPostDetail(id);
  window.scrollTo({top:0,behavior:"smooth"});
}
function likeIconSvg(liked){
  return liked?"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"none\"><path d=\"M12 20s-7-4.5-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5c0 5-7 9.5-7 9.5z\"/></svg>":"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 20s-7-4.5-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5c0 5-7 9.5-7 9.5z\"/></svg>";
}
function renderPostDetail(id){
  var p=POSTS.find(function(x){return x.id===id});if(!p)return;
  var main=document.getElementById("main");var c=catFor(p);
  var safeHtml=p.html?sanitizePostHtml(p.html):null;
  var contentHasMedia=safeHtml&&/<img[\s>]|<video[\s>]/i.test(safeHtml);
  var canvas=(!contentHasMedia&&p.images&&p.images.length)?
    '<div class="d-canvas" style="height:auto;display:block;padding:0">'+(p.stage?'<span class="stage-tag">'+p.stage+' 단계</span>':'')+
      p.images.map(function(url){return '<img src="'+esc(url)+'" alt="" style="width:100%;display:block;max-height:520px;object-fit:cover">'}).join("")+
    '</div>' :
    (contentHasMedia||p.thumb==="none")?"":'<div class="d-canvas" style="background:linear-gradient(135deg,'+GRADS[p.thumb]+')">'+(p.stage?'<span class="stage-tag">'+p.stage+' 단계</span>':'')+'🎨 작품 이미지 영역</div>';
  var liked=p._liked?" liked":"";
  var h='<div class="detail"><div class="d-grip"></div><button class="d-back" onclick="renderList()"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>목록으로</button>'+
    '<div class="d-head"><div class="line1"><span class="cat '+c.cls+'">'+c.label+'</span>'+(p.isManagerPick?'<span class="pick-badge">📌 매니저 픽</span>':'')+(p.reviewedNickname?'<span class="pick-badge">🎨 @'+esc(p.reviewedNickname)+' 후기</span>':'')+'</div><h1 class="serif">'+esc(p.title)+'</h1>'+
    '<div class="d-author"><div class="d-ava serif">'+avatarHTML(p.author,p.authorAvatar)+'</div><div class="d-au-info"><div class="n"'+(p.authorId?' style="cursor:pointer" onclick="openUserProfile(\''+p.authorId+'\')"':'')+'>'+esc(dispName(p.author))+anonIpHTML(p.ipMasked)+levelBadgeHtml(p.authorLevel,"lv-badge")+'</div><div class="meta">'+p.time+' · 조회 '+fmtViews(p.views)+'</div></div>'+
    ((p.authorId&&(!AUTH.user||p.authorId!==AUTH.user.id))?('<button class="d-follow'+(FOLLOW.has(p.authorId)?' following':'')+'" id="followBtn" onclick="toggleFollow(\''+esc(p.authorId)+'\',\''+esc(p.author)+'\')">'+(FOLLOW.has(p.authorId)?'팔로잉 ✓':'＋ 팔로우')+'</button>'):'')+'</div></div>'+
    canvas+'<div class="d-content">'+(safeHtml?safeHtml:p.content.map(function(x){return'<p>'+esc(x)+'</p>'}).join(""))+'</div>'+
    (p.polls&&p.polls.length?p.polls.filter(function(pl){return !pl.anchor;}).map(function(pl){return '<div class="poll" id="pollBox-'+pl.id+'"></div>';}).join(''):'')+
    '<div class="d-actions"><button class="d-act'+liked+'" id="likeBtn" onclick="toggleLike('+p.id+')">'+likeIconSvg(p._liked)+'좋아요 '+p.likes+'</button>'+
    '<button class="d-act" onclick="sharePost('+p.id+')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 15l6-6"/><path d="M10 6l1-1a4 4 0 0 1 6 6l-1 1M14 18l-1 1a4 4 0 0 1-6-6l1-1"/></svg>공유</button>'+
    '<button class="d-act" onclick="reportPost('+p.id+')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>신고</button>'+
    ((p.dbId&&p.board==="trade"&&p.category==="구직")?'<button class="d-act" onclick="openCommissionReviews('+p.id+')">📝 후기 보기 ('+POSTS.filter(function(r){return r.board==="review"&&r.commissionPostId===p.dbId}).length+')</button>':'')+
    ((p.dbId&&p.board==="trade"&&p.category==="구직"&&AUTH.user&&AUTH.user.id!==p.authorId)?'<button class="d-act" onclick="openReviewFor('+p.id+')">✍️ 이 커미션 후기 쓰기</button>':'')+
    ((p.dbId&&AUTH.user&&p.authorId===AUTH.user.id)?(
    (postEditLocked(p)?'<span class="d-act" style="opacity:.55;cursor:default" title="다른 분의 댓글이 달려 수정·삭제할 수 없어요">🔒 수정·삭제 불가</span>':
    ((p.adLocked?'<span class="d-act" style="opacity:.55;cursor:default" title="광고를 집행 중인 글은 수정할 수 없어요">🔒 수정 불가(광고 집행 중)</span>':
    '<button class="d-act" onclick="openEditPost('+p.id+')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L20 8l-4-4L4 16v4z"/><path d="M14 6l4 4"/></svg>수정</button>')+
    '<button class="d-act" onclick="deletePost('+p.id+')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>삭제</button>'))+
    '<button class="d-act" onclick="openCreateAd('+p.id+')">📢 이 글 광고하기</button>'+
    '<button class="d-act'+((AUTH.profile&&AUTH.profile.pinned_post_id===p.dbId)?' liked':'')+'" onclick="togglePinnedPost('+p.id+')">📌 '+((AUTH.profile&&AUTH.profile.pinned_post_id===p.dbId)?"대표 글 해제":"대표 글로 고정하기")+'</button>'):'')+
    ((p.dbId&&AUTH.profile&&AUTH.profile.is_admin)?('<button class="d-act'+(p.isManagerPick?' liked':'')+'" onclick="toggleManagerPick('+p.id+')">📌 '+(p.isManagerPick?"매니저 픽 해제":"매니저 픽 지정")+'</button>'):'')+
    ((p.dbId&&AUTH.profile&&AUTH.profile.is_admin)?('<button class="d-act d-act-admindel" onclick="adminDeletePost('+p.id+')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>관리자 삭제</button>'):'')+
    '</div>'+
    '<div class="comments"><div class="cm-head"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/></svg>훈수 · 크리틱 '+p.comments.length+'</div>'+
    (p.board==='crit'?'<div class="cm-accept-info">💡 마음에 든 피드백을 <b>채택</b>하면 그 작성자에게 <b>광고 25점 + 활동 25점</b>을 지급해요 (하루 최대 100점).</div>':'')+
    '<div class="cm-write"><div class="d-ava serif" id="cmAva">'+avatarHTML("나",AUTH.profile&&AUTH.profile.avatar_url)+'</div><div class="box"><textarea id="cmInput" placeholder="따뜻한 피드백을 남겨주세요. 사람보다 그림을 이야기해요."></textarea>'+
    '<div class="emo-strip">'+emoStripHTML()+'</div>'+
    '<div class="row"><span class="hint">인신공격·조롱은 삭제될 수 있어요</span><button class="send" onclick="addComment('+p.id+')">등록</button></div></div></div>'+
    '<div class="ad d-ad" role="complementary" aria-label="광고"><span class="ad-label">AD</span><div class="ad-ph"><svg viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.6\\" style=\\"width:22px;height:22px\\"><rect x=\\"3\\" y=\\"4\\" width=\\"18\\" height=\\"16\\" rx=\\"2\\"/><circle cx=\\"8.5\\" cy=\\"9.5\\" r=\\"1.6\\"/><path d=\\"m4 18 5-5 4 3 3-2 4 4\\"/></svg></div><div class="ad-body"><div class="ad-t">열심히 활동해서 포인트를 모아보세요!</div><div class="ad-d">포인트를 사용하여 이 자리에 광고를 집행할 수 있어요!</div></div></div>'+'<div class="cm-list" id="cmList">'+renderComments(p)+'</div></div></div>';
  main.innerHTML=h;
  renderDetailAd();
  if(p.polls&&p.polls.length){
    p.polls.forEach(function(pl){
      if(pl.anchor){ // 본문 마커(data-poll) 위치에 투표 박스를 끼워넣음
        var mk=main.querySelector('.d-content [data-poll="'+pl.anchor+'"]');
        if(mk){var bx=document.createElement('div');bx.className='poll';bx.id='pollBox-'+pl.id;mk.replaceWith(bx);}
        else{var dc=main.querySelector('.d-content');if(dc){var bx2=document.createElement('div');bx2.className='poll';bx2.id='pollBox-'+pl.id;dc.insertAdjacentElement('afterend',bx2);}}
      }
      loadPoll(pl.id);
    });
  }
}
/* ===== 글 상세 투표 표시/투표하기 ===== */
var _pollChannels={};       // pollId → 실시간 broadcast 채널
var _pollVotersOpen={};     // pollId → 참여자 명단 펼침 여부
var _pollVotersData={};     // pollId → [{option_id, nick}]
function _pollBox(pid){return document.getElementById('pollBox-'+pid);}
async function loadPoll(pollId){
  var box=_pollBox(pollId); if(!box||!window.supabase)return;
  _pollVotersOpen[pollId]=false;_pollVotersData[pollId]=null;
  box.innerHTML='<div class="poll-loading">투표 불러오는 중…</div>';
  var res=await window.supabase.rpc('get_poll_results',{p_poll_id:pollId});
  if(res.error||!res.data){box.innerHTML='<div class="poll-loading">투표를 불러오지 못했어요</div>';return;}
  renderPoll(pollId,res.data);
  subscribePoll(pollId); // 다른 사람 투표 시 실시간 갱신
}
// 실시간: 같은 투표를 보는 브라우저끼리 broadcast 채널로 연결(투표 테이블 직접 구독 X → 익명 보장)
function subscribePoll(pollId){
  if(!window.supabase)return;
  if(_pollChannels[pollId]){try{window.supabase.removeChannel(_pollChannels[pollId]);}catch(e){}delete _pollChannels[pollId];}
  _pollChannels[pollId]=window.supabase.channel('poll-'+pollId)
    .on('broadcast',{event:'vote'},function(){refreshPollResults(pollId);})
    .subscribe();
}
async function refreshPollResults(pollId){
  if(!_pollBox(pollId)||!window.supabase)return; // 화면 떠났으면 무시
  var res=await window.supabase.rpc('get_poll_results',{p_poll_id:pollId});
  if(res.error||!res.data)return;
  if(_pollVotersOpen[pollId]&&!res.data.is_anonymous){
    var vr=await window.supabase.rpc('get_poll_voters',{p_poll_id:pollId});
    _pollVotersData[pollId]=(vr&&vr.data&&vr.data.voters)||[];
  }
  renderPoll(pollId,res.data);
}
function togglePollVoters(pollId){ _pollVotersOpen[pollId]=!_pollVotersOpen[pollId]; refreshPollResults(pollId); }
function renderPollVotersHTML(pollId,opts){
  var vd=_pollVotersData[pollId];
  if(vd==null)return '<div class="poll-voters-loading">불러오는 중…</div>';
  if(!vd.length)return '<div class="poll-voters-empty">아직 참여자가 없어요</div>';
  var optBody={}; opts.forEach(function(o){optBody[o.id]=o.body;});
  // 사람별로 묶기(user_id 우선, 없으면 nick). 복수 선택이면 한 사람이 여러 선택지.
  var byUser={},order=[];
  vd.forEach(function(v){
    var k=v.user_id||('nick:'+v.nick);
    if(!byUser[k]){byUser[k]={nick:v.nick||'익명',opts:[]};order.push(k);}
    byUser[k].opts.push(optBody[v.option_id]||'?');
  });
  return '<div class="poll-voters">'+order.map(function(k){
    var u=byUser[k];
    return '<div class="poll-voters-row"><b>'+esc(u.nick)+'</b><span>→ '+u.opts.map(esc).join(', ')+'</span></div>';
  }).join('')+'</div>';
}
function pollDeadlineText(iso){
  var ms=new Date(iso)-Date.now();
  if(ms<=0)return '마감됨';
  var d=Math.floor(ms/86400000), hh=Math.floor(ms/3600000);
  if(d>=1)return d+'일 남음';
  if(hh>=1)return hh+'시간 남음';
  return '곧 마감';
}
function renderPoll(pollId,data){
  var box=_pollBox(pollId); if(!box||!data)return;
  var opts=data.options||[], total=data.total||0;
  var mine=data.my_options||[], voted=mine.length>0;
  var multi=!!data.allow_multiple, closed=!!data.closed;
  var showBars=voted||closed;                       // 결과 막대를 보일지
  var h='<div class="poll-q">📊 '+esc(data.question||'투표')+
    (multi?' <span class="poll-tag">복수 선택</span>':'')+
    (data.is_anonymous?' <span class="poll-tag">익명</span>':'')+
    (closed?' <span class="poll-tag closed">마감</span>':'')+'</div>';
  h+=opts.map(function(o){
    var isMine=mine.indexOf(o.id)>=0;
    var pct=total?Math.round(o.count/total*100):0;
    // 단일: 미투표일 때만 클릭 / 복수: 마감 아니면 항상 토글 가능
    var clickable=!closed && (multi || !voted);
    var inner=showBars
      ? '<div class="poll-res-bar" style="width:'+pct+'%"></div><div class="poll-res-txt"><span>'+(isMine?'✓ ':'')+esc(o.body)+'</span><span>'+pct+'% · '+o.count+'표</span></div>'
      : '<div class="poll-res-txt"><span>'+(isMine?'✓ ':'')+esc(o.body)+'</span></div>';
    return '<div class="poll-res'+(isMine?' mine':'')+(clickable?' clickable':'')+'"'+(clickable?' onclick="votePoll('+pollId+','+o.id+')"':'')+'>'+inner+'</div>';
  }).join('');
  var foot=['총 '+total+'명 참여'];
  if(closed)foot.push('마감된 투표');
  else if(data.closes_at)foot.push(pollDeadlineText(data.closes_at));
  if(multi&&!closed)foot.push('여러 개 선택 가능(다시 누르면 취소)');
  if(!voted&&!closed&&!AUTH.user)foot.push('로그인 후 투표');
  h+='<div class="poll-total">'+foot.join(' · ')+'</div>';
  // 참여자(익명/비익명)
  if(data.is_anonymous){
    h+='<div class="poll-anon">🕶 익명 투표 — 누가 골랐는지는 공개되지 않아요</div>';
  }else if(total>0){
    h+='<button class="poll-voters-btn" onclick="togglePollVoters('+pollId+')">'+(_pollVotersOpen[pollId]?'참여자 숨기기 ▲':'👥 참여자 보기 ▼')+'</button>';
    if(_pollVotersOpen[pollId])h+=renderPollVotersHTML(pollId,opts);
  }
  box.innerHTML=h;
}
async function votePoll(pollId,optionId){
  if(!AUTH.user){toast('로그인 후 투표할 수 있어요','🔒');loginWithGoogle();return;}
  if(!window.supabase)return;
  var res=await window.supabase.rpc('cast_vote',{p_poll_id:pollId,p_option_id:optionId});
  if(res.error){toast('투표 실패: '+res.error.message);return;}
  var data=res.data||{};
  if(!data.ok){
    if(data.error==='login_required'){toast('로그인 후 투표할 수 있어요','🔒');loginWithGoogle();return;}
    if(data.error==='already_voted'){toast('이미 투표했어요');renderPoll(pollId,data);return;}
    if(data.error==='closed'){toast('마감된 투표예요');renderPoll(pollId,data);return;}
    toast('투표할 수 없어요 ('+(data.error||'오류')+')');return;
  }
  if(_pollVotersOpen[pollId]){_pollVotersData[pollId]=null;} // 참여자 목록 열려있으면 갱신 필요
  renderPoll(pollId,data); // cast_vote가 최신 결과를 함께 반환(내 화면 즉시)
  if(_pollVotersOpen[pollId])refreshPollResults(pollId); // 열린 참여자 목록도 최신화
  if(_pollChannels[pollId]){try{_pollChannels[pollId].send({type:'broadcast',event:'vote',payload:{}});}catch(e){}} // 다른 사람에게 알림
}
// 이 게시판들은 '다른 사람(작성자 아닌)의 댓글'이 하나라도 달리면 작성자가 수정·삭제 불가(관리자 삭제는 예외).
var POST_EDIT_LOCK_BOARDS=['ask','vote','crit']; // 질문/시세문의 · 투표·수요조사 · 피드백 요청
function postEditLocked(p){
  return !!(p&&POST_EDIT_LOCK_BOARDS.indexOf(p.board)>=0&&(p.comments||[]).some(function(c){return c.authorId!==p.authorId;}));
}
async function deletePost(id){
  var p=POSTS.find(function(x){return x.id===id});if(!p)return;
  if(postEditLocked(p)&&!(AUTH.profile&&AUTH.profile.is_admin)){toast("다른 분의 댓글이 달려 삭제할 수 없어요");return;}
  if(!(await confirmDialog("이 글을 삭제할까요? 되돌릴 수 없어요.")))return;
  if(p.dbId&&window.supabase){
    var res=await window.supabase.from("posts").delete().eq("id",p.dbId);
    if(res.error){toast("삭제 실패: "+res.error.message);return;}
  }
  POSTS=POSTS.filter(function(x){return x.id!==id});
  toast("글을 삭제했어요");
  renderList();
}
/* 관리자 삭제: 관리자에게만 보이는 버튼 → 사유 입력 → 확인 → 서버 RPC(admin_delete_post)로 삭제+작성자 알림.
   보안: 서버(RPC 내 is_admin())에서 관리자 여부를 확인하므로 버튼을 숨기는 것과 무관하게 일반 유저는 차단됨. */
var _adminDelState=null;
function adminDeleteReasonDialog(){
  return new Promise(function(resolve){
    var modal=document.getElementById("adminDelModal");
    var ok=document.getElementById("adminDelOkBtn");
    var ta=document.getElementById("adminDelReason");
    var silent=document.getElementById("adminDelSilent");
    if(!modal||!ok||!ta){resolve(null);return;}
    ta.value="";if(silent)silent.checked=false;
    modal.classList.add("open");
    setTimeout(function(){try{ta.focus();}catch(e){}},60);
    function cleanup(val){
      modal.classList.remove("open");
      ok.removeEventListener("click",onOk);
      _adminDelState=null;
      resolve(val);
    }
    // 사유는 선택(비워도 삭제 가능). 확인 시 {reason, notify} 반환, 취소 시 null.
    function onOk(){cleanup({reason:(ta.value||"").trim(),notify:!(silent&&silent.checked)});}
    ok.addEventListener("click",onOk);
    _adminDelState={cancel:function(){cleanup(null);}};
  });
}
function closeAdminDel(){if(_adminDelState)_adminDelState.cancel();}
function adminDelPick(t){var ta=document.getElementById("adminDelReason");if(ta){ta.value=t;ta.focus();}}
async function adminDeletePost(id){
  if(!(AUTH.profile&&AUTH.profile.is_admin)){toast("관리자만 사용할 수 있어요");return;}
  var p=POSTS.find(function(x){return x.id===id});if(!p||!p.dbId||!window.supabase)return;
  var r=await adminDeleteReasonDialog();
  if(!r)return; // 취소
  var confirmMsg=r.notify
    ?"이 글을 삭제할까요? 되돌릴 수 없고, 작성자에게 알림이 전송돼요."
    :"이 글을 삭제할까요? 되돌릴 수 없어요. (작성자에게 알림을 보내지 않습니다)";
  if(!(await confirmDialog(confirmMsg)))return;
  var res=await window.supabase.rpc("admin_delete_post",{p_post_id:p.dbId,p_reason:r.reason,p_notify:r.notify});
  if(res.error){toast("삭제 실패: "+res.error.message);return;}
  var data=res.data||{};
  if(!data.ok){toast(data.error==="not_admin"?"관리자만 사용할 수 있어요":("삭제할 수 없어요 ("+(data.error||"오류")+")"));return;}
  POSTS=POSTS.filter(function(x){return x.id!==id});
  toast(r.notify?"관리자 권한으로 글을 삭제했어요":"관리자 권한으로 글을 삭제했어요 (알림 미발송)");
  renderList();
}
async function toggleManagerPick(id){
  var p=POSTS.find(function(x){return x.id===id});if(!p||!p.dbId||!window.supabase)return;
  var newState=!p.isManagerPick;
  var position=null;
  if(newState){
    var currentPicks=POSTS.filter(function(x){return x.isManagerPick}).length;
    position=currentPicks+1;
  }
  var res=await window.supabase.rpc("set_manager_pick",{p_post_id:p.dbId,p_is_pick:newState,p_position:position});
  if(res.error){toast("처리 실패: "+res.error.message);return;}
  p.isManagerPick=newState;
  p.pickPosition=newState?position:null;
  p.pickedAt=newState?new Date().toISOString():null;
  toast(newState?("매니저 픽으로 지정했어요 📌 (위치 "+position+", \"매니저 픽 관리\"에서 조정 가능)"):"매니저 픽을 해제했어요");
  renderPostDetail(id);
}
async function togglePinnedPost(id){
  var p=POSTS.find(function(x){return x.id===id});if(!p||!p.dbId||!AUTH.user||!window.supabase)return;
  var newVal=(AUTH.profile&&AUTH.profile.pinned_post_id===p.dbId)?null:p.dbId;
  var res=await window.supabase.from("profiles").update({pinned_post_id:newVal}).eq("id",AUTH.user.id);
  if(res.error){toast("처리 실패: "+res.error.message);return;}
  AUTH.profile.pinned_post_id=newVal;
  toast(newVal?"프로필 대표 글로 고정했어요 📌":"대표 글을 해제했어요");
  renderPostDetail(id);
}
async function openManagerPickList(){
  if(!AUTH.profile||!AUTH.profile.is_admin)return;
  enterScreen("mgrPick",openProfile); // 뒤로가기가 프로필로 복귀
  var picks=POSTS.filter(function(p){return p.isManagerPick}).slice().sort(function(a,b){return (a.pickPosition||1)-(b.pickPosition||1);});
  renderManagerPickList(picks);
}
function renderManagerPickList(picks){
  var h='<div class="profile">'+
    '<button class="d-back" onclick="screenBack()">← 내 정보로</button>'+
    '<div class="pf-sec">📌 매니저 픽 관리 ('+picks.length+')</div>';
  if(!picks.length){
    h+='<div class="pf-empty">지정된 매니저 픽이 없어요. 글 상세 화면에서 "매니저 픽 지정" 버튼으로 추가할 수 있어요.</div>';
  }else{
    h+='<div class="list">';
    picks.forEach(function(p){
      h+='<div class="post rip"><div class="pmain" style="cursor:pointer" onclick="openPost('+p.id+')"><div class="ptitle">'+esc(p.title)+'</div>'+
        '<div class="pmeta"><span class="cat '+catFor(p).cls+'">'+catFor(p).label+'</span></div></div>'+
        '<div style="display:flex;align-items:center;gap:8px;flex-shrink:0">'+
          '<input type="number" min="1" value="'+(p.pickPosition||1)+'" id="pickPos'+p.id+'" style="width:56px;padding:8px;border:1.5px solid var(--line-2);border-radius:10px;font-family:inherit;font-size:13px;text-align:center">'+
          '<button class="d-act" onclick="savePickPosition('+p.id+')">저장</button>'+
          '<button class="d-act" onclick="unpickFromList('+p.id+')">해제</button>'+
        '</div></div>';
    });
    h+='</div>';
  }
  h+='</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
/* 관리자 삭제 기록 뷰어 — admin_post_deletions 표(RLS로 관리자만 조회 가능)를 읽어 목록 표시.
   각 행은 삭제된 글의 스냅샷(제목·본문·이미지 등)을 담고 있어, 클릭하면 원본 글처럼 보관본을 볼 수 있음. */
var ADMIN_DEL_LOG=[];
/* 관리자 추천 점수 조정 기록 뷰어 — commission_admin_bonus_log(RLS로 관리자만 조회) */
async function openCommissionBonusLog(){
  if(!AUTH.profile||!AUTH.profile.is_admin||!window.supabase)return;
  enterScreen("bonusLog",openProfile); // 뒤로가기가 프로필로 복귀
  var res=await window.supabase.from("commission_admin_bonus_log").select("*").order("created_at",{ascending:false}).limit(100);
  if(res.error){toast("불러오기 실패: "+res.error.message);return;}
  renderCommissionBonusLog(res.data||[]);
}
function renderCommissionBonusLog(rows){
  var h='<div class="profile">'+
    '<button class="d-back" onclick="screenBack()">← 내 정보로</button>'+
    '<div class="pf-sec">⭐ 추천 점수 조정 기록 ('+rows.length+')</div>';
  if(!rows.length){
    h+='<div class="pf-empty">아직 추천 점수 조정 기록이 없어요.</div>';
  }else{
    h+='<div class="del-log-list">';
    rows.forEach(function(r){
      var oldV=(r.old_value==null?0:r.old_value),newV=(r.new_value==null?0:r.new_value);
      var dir=newV>oldV?'<span style="color:#c0392b;font-weight:800">▲</span>':(newV<oldV?'<span style="color:#2f9e58;font-weight:800">▼</span>':'<span style="opacity:.5">—</span>');
      h+='<div class="del-log" style="cursor:default">'+
        '<div class="del-log-top"><span class="del-log-board">추천 점수 조정</span><span class="del-log-time">'+timeAgo(r.created_at)+'</span></div>'+
        '<div class="del-log-title">'+esc(r.commission_title||"(제목 없음)")+'</div>'+
        '<div class="del-log-meta">조정 관리자 <b>'+esc(r.admin_nick||"(알 수 없음)")+'</b></div>'+
        '<div class="del-log-reason">추가 점수 '+oldV+' → '+newV+' '+dir+'</div>'+
      '</div>';
    });
    h+='</div>';
  }
  h+='</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
/* ===== 광고 성과 대시보드 (관리자) =====
   캠페인 한 줄 = 그 광고로 들어온 사람들의 유입·행동·전환 전부.
   비율의 분모는 언제나 **그 캠페인 방문자 수**다(좋아요율 = 좋아요 누른 사람 ÷ 방문자).
   '직접·검색 유입'이 한 줄로 같이 나와서 광고가 자연 유입보다 나은지 바로 비교된다. */
var MKT_STATS=[],MKT_RANGE=30,MKT_OPEN=null,MKT_FORM=false;
function _mktPct(n,d){return d>0?Math.round(n*1000/d)/10:0;}
function _mktFromISO(){
  if(!MKT_RANGE)return null;
  return new Date(Date.now()-MKT_RANGE*86400000).toISOString();
}
async function openAdminMkt(){
  if(!AUTH.profile||!AUTH.profile.is_admin||!window.supabase)return;
  enterScreen("mkt",openProfile);
  document.getElementById("main").innerHTML='<div class="profile"><div class="pf-empty">불러오는 중…</div></div>';
  var res=await window.supabase.rpc("get_campaign_stats",{p_from:_mktFromISO(),p_to:null});
  if(res.error){
    var miss=/Could not find the function|does not exist/.test(res.error.message);
    document.getElementById("main").innerHTML='<div class="profile">'+
      '<button class="d-back" onclick="screenBack()">← 내 정보로</button>'+
      '<div class="pf-sec">📈 광고 성과</div><div class="pf-empty">'+
      (miss?'이 기능은 <b>docs/sql/marketing-analytics.sql</b>을 실행해야 켜져요.':esc(res.error.message))+
      '</div></div>';
    return;
  }
  MKT_STATS=res.data||[];
  renderAdminMkt();
}
function _mktRangeTabs(){
  return '<div class="del-tabs">'+[[7,"7일"],[30,"30일"],[90,"90일"],[0,"전체"]].map(function(x){
    return '<div class="del-tab'+(MKT_RANGE===x[0]?' on':'')+'" onclick="mktSetRange('+x[0]+')">'+x[1]+'</div>';
  }).join('')+'</div>';
}
function mktSetRange(d){MKT_RANGE=d;openAdminMkt();}
// 한 줄 요약: 방문자 → 가입까지 몇 %가 남았는지. 광고를 고를 때 제일 먼저 보는 숫자다.
function _mktCardHTML(r){
  var v=Number(r.visitors)||0;
  var rows=[
    ["글 열람",r.post_viewers],["커미션 열람",r.cm_viewers],
    ["좋아요",r.likers],["댓글",r.commenters],["글 작성",r.writers],
    ["북마크",r.bookmarkers],["커미션 신청",r.appliers],["재방문",r.repeat_visitors]
  ].map(function(x){
    var n=Number(x[1])||0;
    return '<div class="mkt-kv"><span>'+x[0]+'</span><b>'+n+'</b><i>'+_mktPct(n,v)+'%</i></div>';
  }).join('');
  var signups=Number(r.signups)||0;
  var spend=Number(r.spend)||0;
  var cpa=signups>0&&spend>0?Math.round(spend/signups).toLocaleString()+"원":"—";
  var open=MKT_OPEN===r.code;
  return '<div class="mkt-card'+(r.active===false?' off':'')+'">'+
    '<div class="mkt-head" onclick="mktToggle('+JSON.stringify(r.code).replace(/"/g,"&quot;")+')">'+
      '<div><div class="mkt-name">'+esc(r.name||r.code)+(r.channel?'<span class="mkt-ch">'+esc(r.channel)+'</span>':'')+'</div>'+
      '<div class="mkt-code">'+esc(r.code)+'</div></div>'+
      '<div class="mkt-big"><b>'+v+'</b><span>방문자</span></div>'+
    '</div>'+
    '<div class="mkt-top3">'+
      '<div class="mkt-t"><b>'+signups+'</b><span>가입</span><i>'+_mktPct(signups,v)+'%</i></div>'+
      '<div class="mkt-t"><b>'+(Number(r.pageviews)||0)+'</b><span>페이지뷰</span><i>'+(v?Math.round((Number(r.pageviews)||0)/v*10)/10:0)+'회/명</i></div>'+
      '<div class="mkt-t"><b>'+cpa+'</b><span>가입 1명당</span><i>'+(spend?spend.toLocaleString()+"원 집행":"광고비 미입력")+'</i></div>'+
    '</div>'+
    (open?('<div class="mkt-detail">'+rows+
      '<div class="mkt-clicks" id="mktClicks">버튼 클릭 불러오는 중…</div>'+
      (r.name==='직접·검색 유입'?'':(
        '<div class="mkt-tools">'+
          '<button class="mkt-tool" onclick="mktCopyLink('+JSON.stringify(r.code).replace(/"/g,"&quot;")+')">🔗 광고 링크 복사</button>'+
          '<div class="mkt-spend"><input id="mktSpend_'+esc(r.code)+'" type="number" inputmode="numeric" placeholder="광고비(원)" value="'+(spend||'')+'">'+
            '<button onclick="mktSetSpend('+JSON.stringify(r.code).replace(/"/g,"&quot;")+')">저장</button></div>'+
          '<button class="mkt-tool'+(r.active===false?'':' danger')+'" onclick="mktToggleActive('+JSON.stringify(r.code).replace(/"/g,"&quot;")+','+(r.active!==false)+')">'+
            (r.active===false?'▶ 다시 진행':'⏸ 이 캠페인 중단')+'</button>'+
        '</div>'))+
      '</div>'):'')+
  '</div>';
}
function renderAdminMkt(){
  var h='<div class="profile">'+
    '<button class="d-back" onclick="screenBack()">← 내 정보로</button>'+
    '<div class="pf-sec">📈 광고 성과</div>'+
    '<div class="mkt-guide">광고 링크에 캠페인 코드를 붙여 쓰세요 → <b>https://commi.kr/?c=코드</b><br>'+
      '처음 들어온 캠페인이 그 사람에게 계속 붙어서, 나중에 가입해도 그 광고의 성과로 잡혀요.</div>'+
    _mktRangeTabs()+
    '<button class="mkt-add" onclick="mktNewCampaign()">'+(MKT_FORM?'닫기':'+ 캠페인 만들기')+'</button>'+_mktFormHTML();
  if(!MKT_STATS.length)h+='<div class="pf-empty">아직 기록이 없어요.</div>';
  else h+='<div class="mkt-list">'+MKT_STATS.map(_mktCardHTML).join('')+'</div>';
  h+='</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
  if(MKT_OPEN)_mktLoadClicks(MKT_OPEN);
}
function mktToggle(code){
  MKT_OPEN=(MKT_OPEN===code)?null:code;
  renderAdminMkt();
}
async function _mktLoadClicks(code){
  var el=document.getElementById("mktClicks");if(!el)return;
  var res=await window.supabase.rpc("get_campaign_clicks",{p_code:code,p_from:_mktFromISO(),p_to:null});
  if(res.error){el.textContent="버튼 클릭을 불러오지 못했어요.";return;}
  var list=res.data||[];
  if(!list.length){el.textContent="아직 눌린 버튼이 없어요.";return;}
  el.innerHTML='<div class="mkt-clicks-h">어떤 버튼을 눌렀나</div>'+list.map(function(c){
    return '<div class="mkt-kv"><span>'+esc(c.label)+'</span><b>'+c.clicks+'회</b><i>'+c.people+'명</i></div>';
  }).join('');
}
// 캠페인 만들기 — 코드는 링크에 그대로 들어가므로 영문·숫자로만 받는다
function mktNewCampaign(){MKT_FORM=!MKT_FORM;renderAdminMkt();}
function _mktFormHTML(){
  if(!MKT_FORM)return '';
  return '<div class="mkt-form">'+
    '<div class="cm-reg-label">캠페인 코드 <span class="cm-reg-req">*</span> <span class="cm-reg-sub">링크에 들어갈 영문·숫자</span></div>'+
    '<input class="cm-reg-input" id="mktCode" placeholder="예: tw0808" maxlength="40">'+
    '<div class="cm-reg-label">캠페인 이름 <span class="cm-reg-req">*</span></div>'+
    '<input class="cm-reg-input" id="mktName" placeholder="예: 8월 트위터 런칭" maxlength="60">'+
    '<div class="cm-reg-label">채널 <span class="cm-reg-sub">선택</span></div>'+
    '<input class="cm-reg-input" id="mktCh" placeholder="예: 트위터" maxlength="20">'+
    '<div class="cm-reg-label">집행 광고비 <span class="cm-reg-sub">선택 · 가입 1명당 비용 계산에 쓰여요</span></div>'+
    '<input class="cm-reg-input" id="mktSpend" type="number" inputmode="numeric" placeholder="예: 50000">'+
    '<button class="mkt-save" onclick="mktSaveCampaign()">만들기</button>'+
  '</div>';
}
async function mktSaveCampaign(){
  var code=(document.getElementById("mktCode").value||"").trim().toLowerCase().replace(/[^a-z0-9_-]/g,"").slice(0,40);
  var name=(document.getElementById("mktName").value||"").trim().slice(0,60);
  if(!code){toast("코드를 영문·숫자로 지어주세요");return;}
  if(!name){toast("캠페인 이름을 적어주세요");return;}
  var ins=await window.supabase.from("mkt_campaigns").insert({
    code:code,name:name,
    channel:((document.getElementById("mktCh").value||"").trim().slice(0,20))||null,
    spend:parseInt((document.getElementById("mktSpend").value||"").replace(/[^0-9]/g,""),10)||0
  });
  if(ins.error){toast(/duplicate|unique/i.test(ins.error.message)?"이미 쓰고 있는 코드예요":("만들지 못했어요: "+ins.error.message));return;}
  MKT_FORM=false;
  toast("만들었어요 · 링크 /?c="+code,"📈");
  openAdminMkt();
}
// 광고비는 집행하고 나서 알게 되는 경우가 많아 나중에 고칠 수 있어야 한다.
async function mktSetSpend(code){
  var el=document.getElementById("mktSpend_"+code);if(!el)return;
  var v=parseInt((el.value||"").replace(/[^0-9]/g,""),10)||0;
  var up=await window.supabase.from("mkt_campaigns").update({spend:v}).eq("code",code);
  if(up.error){toast("저장하지 못했어요: "+up.error.message);return;}
  toast("광고비를 저장했어요");
  openAdminMkt();
}
// 효율이 나쁜 캠페인은 '중단'으로 내린다. 기록은 남기고 목록에서 흐리게만 표시된다.
async function mktToggleActive(code,cur){
  var up=await window.supabase.from("mkt_campaigns").update({active:!cur}).eq("code",code);
  if(up.error){toast("바꾸지 못했어요: "+up.error.message);return;}
  toast(cur?"중단했어요":"다시 진행 중으로 바꿨어요");
  openAdminMkt();
}
function mktCopyLink(code){
  var url=location.origin+"/?c="+code;
  try{navigator.clipboard.writeText(url);toast("링크를 복사했어요","🔗");}
  catch(e){toast(url);}
}
// 보관본은 글·댓글·커미션 세 종류. 표 이름과 화면 문구만 다르고 흐름은 같아 한 화면에서 탭으로 다룬다.
var ADMIN_DEL_KIND="post";
var ADMIN_DEL_TABLE={post:"admin_post_deletions",comment:"admin_comment_deletions",commission:"admin_commission_deletions"};
var ADMIN_DEL_LABEL={post:"글",comment:"댓글",commission:"커미션"};
async function openAdminDeletionLog(kind){
  if(!AUTH.profile||!AUTH.profile.is_admin||!window.supabase)return;
  ADMIN_DEL_KIND=ADMIN_DEL_TABLE[kind]?kind:ADMIN_DEL_KIND;
  enterScreen("delLog",openProfile); // 뒤로가기가 프로필로 복귀
  var res=await window.supabase.from(ADMIN_DEL_TABLE[ADMIN_DEL_KIND])
    .select("*").order("created_at",{ascending:false}).limit(100);
  if(res.error){
    // 표가 없으면(SQL 실행 전) 무엇을 해야 하는지 알려준다 — 그냥 "실패"만 뜨면 원인을 알 수 없다
    ADMIN_DEL_LOG=[];
    renderAdminDeletionLog([],/Could not find the table|does not exist/.test(res.error.message)
      ?"이 기록은 <b>docs/sql/deletion-archive.sql</b>을 실행해야 쌓이기 시작해요."
      :"불러오지 못했어요: "+esc(res.error.message));
    return;
  }
  ADMIN_DEL_LOG=res.data||[];
  renderAdminDeletionLog(ADMIN_DEL_LOG);
}
function _delTabsHTML(){
  return '<div class="del-tabs">'+["post","comment","commission"].map(function(k){
    return '<div class="del-tab'+(ADMIN_DEL_KIND===k?' on':'')+'" onclick="openAdminDeletionLog(\''+k+'\')">'+ADMIN_DEL_LABEL[k]+'</div>';
  }).join('')+'</div>';
}
// 되살린 뒤에는 카드에 표시를 남긴다(보관본은 지우지 않고 증거로 계속 둔다)
function _restoredTagHTML(r){
  return r.restored_at?'<span class="del-restored">되살림 · '+timeAgo(r.restored_at)+'</span>':'';
}
function renderAdminDeletionLog(rows,emptyMsg){
  var kind=ADMIN_DEL_KIND;
  var h='<div class="profile">'+
    '<button class="d-back" onclick="screenBack()">← 내 정보로</button>'+
    '<div class="pf-sec">🗑 삭제 기록</div>'+_delTabsHTML();
  if(!rows.length){
    h+='<div class="pf-empty">'+(emptyMsg||("아직 삭제한 "+ADMIN_DEL_LABEL[kind]+"이(가) 없어요."))+'</div>';
  }else{
    h+='<div class="del-log-list">';
    rows.forEach(function(r){
      var body=(kind==="commission"?(r.description||""):(r.content||"")).replace(/\s+/g," ").trim();
      if(body.length>140)body=body.slice(0,140)+"…";
      var head=kind==="post"?esc(boardName(r.board)||r.board||"게시판")
        :(kind==="comment"?"댓글":"커미션");
      var title=kind==="comment"
        ?("글: "+esc(r.post_title||"(삭제된 글)"))
        :esc(r.title||"(제목 없음)");
      h+='<div class="del-log" onclick="openArchivedItem('+r.id+')">'+
        '<div class="del-log-top"><span class="del-log-board">'+head+'</span>'+
          '<span class="del-log-time">'+_restoredTagHTML(r)+timeAgo(r.created_at)+'</span></div>'+
        '<div class="del-log-title">'+title+'</div>'+
        (body?'<div class="del-log-snip">'+esc(body)+'</div>':'')+
        '<div class="del-log-meta">작성자 <b>'+esc(r.author_nick||"(알 수 없음)")+'</b> · 삭제 관리자 <b>'+esc(r.admin_nick||"(알 수 없음)")+'</b></div>'+
        '<div class="del-log-reason">사유: '+(r.reason?esc(r.reason):'<span style="opacity:.6">미입력</span>')+(r.notified?'':' · <span style="opacity:.75">알림 미발송</span>')+'</div>'+
        '<div class="del-log-open">보관본 보기 ›</div>'+
      '</div>';
    });
    h+='</div>';
  }
  h+='</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
// 보관본에서 되살리기. 원래 번호가 아니라 새 번호로 다시 들어간다(그 번호를 다른 글이 쓸 수 있으므로).
async function adminRestoreItem(logId){
  var kind=ADMIN_DEL_KIND;
  var what=ADMIN_DEL_LABEL[kind];
  if(!(await confirmDialog("이 "+what+"을(를) 되살릴까요?\\n원래 작성자·작성시각 그대로 다시 올라가요.")))return;
  var fn={post:"admin_restore_post",comment:"admin_restore_comment",commission:"admin_restore_commission"}[kind];
  var res=await window.supabase.rpc(fn,{p_log_id:logId});
  if(res.error){toast("되살리지 못했어요: "+res.error.message);return;}
  var d=res.data||{};
  if(!d.ok){
    var msg={not_admin:"관리자만 사용할 수 있어요",
      already_restored:"이미 되살린 "+what+"이에요",
      post_gone:"댓글이 달려 있던 글이 사라져서 되살릴 수 없어요",
      author_gone:"작성자 계정이 사라져서 되살릴 수 없어요",
      not_found:"보관본을 찾을 수 없어요"}[d.error]||("되살리지 못했어요 ("+(d.error||"오류")+")");
    toast(msg);return;
  }
  toast(what+"을(를) 되살렸어요","♻️");
  if(kind==="post"){try{await loadRealPosts(true);}catch(e){}}
  else if(kind==="commission"){try{await cmLoadCommissions();}catch(e){}}
  openAdminDeletionLog(kind);
}
function openArchivedItem(logId){
  var row=(ADMIN_DEL_LOG||[]).find(function(x){return x.id===logId;});
  if(!row){toast("보관본을 찾을 수 없어요");return;}
  if(ADMIN_DEL_KIND==="post")renderArchivedPost(row);
  else if(ADMIN_DEL_KIND==="comment")renderArchivedComment(row);
  else renderArchivedCommission(row);
}
// 보관본 화면 위쪽에 공통으로 붙는 붉은 띠(누가·언제·왜 지웠는지 + 되살리기 버튼)
function _archivedBannerHTML(row,what){
  var meta='삭제 관리자 <b>'+esc(row.admin_nick||"(알 수 없음)")+'</b> · '+timeAgo(row.created_at)+
    ' · 사유: '+(row.reason?esc(row.reason):"미입력")+(row.notified?'':' · 알림 미발송');
  var btn=row.restored_at
    ?'<div class="archived-restored">♻️ '+timeAgo(row.restored_at)+' 되살림'+(row.restored_id?' (새 번호 '+row.restored_id+')':'')+'</div>'
    :'<button class="archived-restore" onclick="adminRestoreItem('+row.id+')">♻️ 이 '+what+' 되살리기</button>';
  return '<div class="archived-banner">🗑 삭제된 '+what+' 보관본<div class="archived-banner-sub">'+meta+'</div>'+btn+'</div>';
}
function renderArchivedComment(row){
  var h='<div class="detail">'+
    '<button class="d-back" onclick="openAdminDeletionLog(\'comment\')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>삭제 기록으로</button>'+
    _archivedBannerHTML(row,"댓글")+
    '<div class="d-head"><div class="line1"><span class="cat free-c">댓글</span></div>'+
      '<h1 class="serif">'+esc(row.post_title||"(글이 삭제됨)")+'</h1>'+
      '<div class="d-author"><div class="d-ava serif">'+avatarHTML(row.author_nick||"익명",row.author_avatar)+'</div>'+
      '<div class="d-au-info"><div class="n">'+esc(dispName(row.author_nick||"익명"))+levelBadgeHtml(row.author_level,"lv-badge")+'</div>'+
      '<div class="meta">'+(row.comment_created_at?timeAgo(row.comment_created_at):"작성시각 알 수 없음")+'</div></div></div></div>'+
    '<div class="d-content"><p>'+withEmoticons(esc(row.content||"(내용 없음)")).replace(/\n/g,"<br>")+'</p></div>'+
  '</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
function renderArchivedCommission(row){
  var imgs=row.images;
  if(typeof imgs==="string"){try{imgs=JSON.parse(imgs);}catch(e){imgs=null;}}
  var pics=(imgs&&imgs.length)?'<div class="d-canvas" style="height:auto;display:block;padding:0">'+
    imgs.map(function(u){return '<img src="'+esc(u)+'" alt="" style="width:100%;display:block;max-height:520px;object-fit:cover">';}).join("")+'</div>':'';
  var safe=row.description_html?sanitizePostHtml(row.description_html):null;
  var body=safe?safe:('<p>'+esc(row.description||"(설명 없음)").replace(/\n/g,"<br>")+'</p>');
  var rows=[["가격",row.price],["작업 기간",row.period],["모집 인원",row.slots],
    ["태그",(row.tags||[]).join(", ")],["작업물 사용 권한",row.usage_rights],["거래 정책",row.trade_policy]]
    .filter(function(x){return x[1];})
    .map(function(x){return '<div class="del-kv"><span>'+x[0]+'</span><b>'+esc(String(x[1]))+'</b></div>';}).join("");
  var h='<div class="detail">'+
    '<button class="d-back" onclick="openAdminDeletionLog(\'commission\')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>삭제 기록으로</button>'+
    _archivedBannerHTML(row,"커미션")+
    '<div class="d-head"><div class="line1"><span class="cat free-c">커미션</span></div>'+
      '<h1 class="serif">'+esc(row.title||"(제목 없음)")+'</h1>'+
      '<div class="d-author"><div class="d-ava serif">'+avatarHTML(row.author_nick||"익명",null)+'</div>'+
      '<div class="d-au-info"><div class="n">'+esc(dispName(row.author_nick||"익명"))+'</div>'+
      '<div class="meta">'+(row.commission_created_at?timeAgo(row.commission_created_at):"등록시각 알 수 없음")+'</div></div></div></div>'+
    pics+(rows?'<div class="del-kv-list">'+rows+'</div>':'')+
    '<div class="d-content">'+body+'</div>'+
  '</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
/* 삭제된 글의 스냅샷(보관본)을 원본 글 상세처럼 읽기 전용으로 재구성 */
function renderArchivedPost(row){
  var imgs=row.images;
  if(typeof imgs==="string"){try{imgs=JSON.parse(imgs);}catch(e){imgs=null;}}
  var p={board:row.board,category:row.category,title:row.title,stage:row.stage,thumb:"none",
    html:row.content_html||undefined,content:(row.content||"").split("\n").filter(Boolean),
    images:imgs,author:row.author_nick||"익명",authorAvatar:row.author_avatar,authorLevel:row.author_level,
    time:row.post_created_at?timeAgo(row.post_created_at):"삭제됨"};
  var c=catFor(p);
  var safeHtml=p.html?sanitizePostHtml(p.html):null;
  var contentHasMedia=safeHtml&&/<img[\s>]|<video[\s>]/i.test(safeHtml);
  var canvas=(!contentHasMedia&&p.images&&p.images.length)?
    '<div class="d-canvas" style="height:auto;display:block;padding:0">'+(p.stage?'<span class="stage-tag">'+esc(p.stage)+' 단계</span>':'')+
      p.images.map(function(url){return '<img src="'+esc(url)+'" alt="" style="width:100%;display:block;max-height:520px;object-fit:cover">'}).join("")+
    '</div>':'';
  var body=safeHtml?safeHtml:(p.content.length?p.content.map(function(x){return '<p>'+esc(x)+'</p>'}).join(""):'<p style="color:var(--muted)">(본문 없음)</p>');
  var h='<div class="detail">'+
    '<button class="d-back" onclick="openAdminDeletionLog(\'post\')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>삭제 기록으로</button>'+
    _archivedBannerHTML(row,"글")+
    '<div class="d-head"><div class="line1"><span class="cat '+c.cls+'">'+c.label+'</span></div><h1 class="serif">'+esc(p.title||"(제목 없음)")+'</h1>'+
    '<div class="d-author"><div class="d-ava serif">'+avatarHTML(p.author,p.authorAvatar)+'</div><div class="d-au-info"><div class="n">'+esc(dispName(p.author))+anonIpHTML(p.ipMasked)+levelBadgeHtml(p.authorLevel,"lv-badge")+'</div><div class="meta">'+esc(p.time)+'</div></div></div></div>'+
    canvas+'<div class="d-content">'+body+'</div>'+
  '</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
async function savePickPosition(id){
  var p=POSTS.find(function(x){return x.id===id});if(!p||!p.dbId||!window.supabase)return;
  var input=document.getElementById("pickPos"+id);
  var newPos=parseInt(input.value,10);
  if(!newPos||newPos<1){toast("1 이상의 숫자를 입력해주세요");return;}
  var res=await window.supabase.rpc("set_manager_pick",{p_post_id:p.dbId,p_is_pick:true,p_position:newPos});
  if(res.error){toast("처리 실패: "+res.error.message);return;}
  p.pickPosition=newPos;
  p.pickedAt=new Date().toISOString();
  toast("위치를 "+newPos+"번으로 바꿨어요");
  openManagerPickList();
}
async function unpickFromList(id){
  var p=POSTS.find(function(x){return x.id===id});if(!p||!p.dbId||!window.supabase)return;
  var res=await window.supabase.rpc("set_manager_pick",{p_post_id:p.dbId,p_is_pick:false,p_position:null});
  if(res.error){toast("처리 실패: "+res.error.message);return;}
  p.isManagerPick=false;p.pickPosition=null;p.pickedAt=null;
  toast("매니저 픽을 해제했어요");
  openManagerPickList();
}
/* ---------- 유저 광고 ---------- */
var adState={postId:null,commissionId:null,bannerUrl:null};
function openCreateAd(postId){
  var p=POSTS.find(function(x){return x.id===postId});if(!p||!p.dbId)return;
  if(!AUTH.user||p.authorId!==AUTH.user.id){toast("본인 글만 광고할 수 있어요");return;}
  adState={postId:postId,commissionId:null,bannerUrl:null};
  document.getElementById("adNoticeModal").classList.add("open");
}
function openCreateAdForCommission(commissionId){
  var c=cmMyList.find(function(x){return x.id===commissionId});
  if(!c||!AUTH.user){toast("본인 커미션만 광고할 수 있어요");return;}
  adState={postId:null,commissionId:commissionId,bannerUrl:null};
  document.getElementById("adNoticeModal").classList.add("open");
}
function closeAdNoticeModal(){document.getElementById("adNoticeModal").classList.remove("open");}
function agreeAdNotice(){
  closeAdNoticeModal();
  document.getElementById("adBannerPreview").innerHTML="";
  document.getElementById("adRateInput").value="";
  document.getElementById("adDaysInput").value="";
  document.getElementById("adModalTitle").textContent=adState.commissionId?"📢 이 커미션 광고하기":"📢 이 글 광고하기";
  document.getElementById("adPreviewText").textContent="보유 광고 포인트: "+(AUTH.profile?(AUTH.profile.ad_points||0):0)+"점 · 총 사용 포인트는 최소 500점부터 집행 가능";
  document.getElementById("adModal").classList.add("open");
}
function closeAdModal(){document.getElementById("adModal").classList.remove("open");}
async function onAdBannerFile(e){
  var f=e.target.files[0];if(!f)return;
  e.target.value="";
  if(!window.supabase){toast("업로드를 사용할 수 없어요");return;}
  if(ALLOWED_IMAGE_TYPES.indexOf(f.type)===-1){toast("이미지 파일만 올릴 수 있어요");return;}
  if(f.size>MAX_IMAGE_BYTES){toast("40MB 이하 이미지만 올릴 수 있어요");return;}
  var uploadBlob=f,ext=(f.name.match(/\.([^.]+)$/)||[,"png"])[1];
  if(f.type!=="image/gif"){
    toast("배너 이미지 압축 중...");
    try{
      var compressed=await compressImage(f);
      uploadBlob=compressed.blob;ext=compressed.ext;
    }catch(err){
      console.error("배너 압축 실패, 원본으로 업로드:",err);
    }
  }
  toast("배너 업로드 중...");
  var bannerUrl=await uploadToStorage(uploadBlob,"ad");
  if(!bannerUrl)return;
  adState.bannerUrl=bannerUrl;
  document.getElementById("adBannerPreview").innerHTML='<img src="'+esc(adState.bannerUrl)+'" style="width:100%;border-radius:10px;display:block">';
  toast("배너 이미지를 등록했어요");
}
async function onAvatarFile(e){
  var f=e.target.files[0];if(!f)return;
  e.target.value="";
  if(!window.supabase||!AUTH.user){toast("로그인이 필요해요");return;}
  if(ALLOWED_IMAGE_TYPES.indexOf(f.type)===-1){toast("이미지 파일만 올릴 수 있어요");return;}
  if(f.size>MAX_IMAGE_BYTES){toast("40MB 이하 이미지만 올릴 수 있어요");return;}
  var uploadBlob=f,ext=(f.name.match(/\.([^.]+)$/)||[,"png"])[1];
  if(f.type!=="image/gif"){
    toast("이미지 압축 중...");
    try{
      var compressed=await compressImage(f);
      uploadBlob=compressed.blob;ext=compressed.ext;
    }catch(err){
      console.error("프로필 이미지 압축 실패, 원본으로 업로드:",err);
    }
  }
  toast("업로드 중...");
  var url=await uploadToStorage(uploadBlob,"avatar");
  if(!url)return;
  var res=await window.supabase.from("profiles").update({avatar_url:url}).eq("id",AUTH.user.id);
  if(res.error){toast("저장 실패: "+res.error.message);return;}
  AUTH.profile.avatar_url=url;
  POSTS.forEach(function(p){
    if(p.authorId===AUTH.user.id)p.authorAvatar=url;
    if(p.comments)p.comments.forEach(function(c){if(c.authorId===AUTH.user.id)c.av=url;});
  });
  toast("프로필 이미지를 변경했어요");
  openProfile();
}
function updateAdPreview(){
  var rate=parseInt(document.getElementById("adRateInput").value,10)||0;
  var days=parseInt(document.getElementById("adDaysInput").value,10)||0;
  var pts=rate*days;
  document.getElementById("adPreviewText").textContent=(rate&&days)?
    (days+"일 동안 1일 "+rate+"점씩 · 총 "+pts+"점 소모돼요"+(pts<500?" (최소 500점 필요)":"")+" · 보유 "+(AUTH.profile?(AUTH.profile.ad_points||0):0)+"점"):
    ("보유 광고 포인트: "+(AUTH.profile?(AUTH.profile.ad_points||0):0)+"점 · 총 사용 포인트는 최소 500점부터 집행 가능");
}
async function submitAd(){
  if(!window.supabase){toast("사용할 수 없어요");return;}
  if(!adState.postId&&!adState.commissionId){toast("대상 정보를 찾을 수 없어요");return;}
  if(!adState.bannerUrl){toast("배너 이미지를 선택해주세요");return;}
  var rate=parseInt(document.getElementById("adRateInput").value,10);
  var days=parseInt(document.getElementById("adDaysInput").value,10);
  if(!rate||rate<1){toast("1일당 사용할 포인트를 입력해주세요");return;}
  if(!days||days<1){toast("노출할 날짜를 입력해주세요");return;}
  if(rate*days<500){toast("최소 500포인트부터 집행할 수 있어요");return;}
  var rpcArgs={p_image_url:adState.bannerUrl,p_points_per_day:rate,p_duration_days:days,p_post_id:null,p_commission_id:null};
  var p=null;
  if(adState.postId){
    p=POSTS.find(function(x){return x.id===adState.postId});if(!p||!p.dbId)return;
    rpcArgs.p_post_id=p.dbId;
  }else{
    rpcArgs.p_commission_id=adState.commissionId;
  }
  var res=await window.supabase.rpc("create_user_ad",rpcArgs);
  if(res.error){toast("광고 등록 실패: "+res.error.message);return;}
  closeAdModal();
  await refreshMyProfile();
  if(p){
    p.adLocked=true;
    if(typeof renderPostDetail==="function")renderPostDetail(p.id);
  }else{
    AD_LOCKED_COMMISSION_IDS[adState.commissionId]=true;
    cmOpenMy('mine');
  }
  toast("광고 신청이 접수됐어요. 관리자 승인 후 노출돼요 📋");
}
var reportingPostId=null;
var reportingConversationId=null;
var reportingReportedUserId=null;
var reportingAdId=null;
var reportingEmoticonPackId=null; // 이모티콘 팩 신고 대상
var reportingCommissionId=null;    // 커미션 신고 대상
function reportAd(adId,e){
  if(e)e.stopPropagation();
  if(!window.supabase){toast("사용할 수 없어요");return;}
  reportingAdId=adId;
  document.getElementById("reportReasonInput").value="";
  _resetReportForm();
  document.getElementById("reportModal").classList.add("open");
}
function reportPost(id){
  var p=POSTS.find(function(x){return x.id===id});if(!p)return;
  if(!p.dbId||!window.supabase){toast("신고가 접수되었어요");return;}
  reportingPostId=id;
  document.getElementById("reportReasonInput").value="";
  _resetReportForm();
  document.getElementById("reportModal").classList.add("open");
}
function reportChat(){
  if(!AUTH.user||!currentConversationId){toast("로그인이 필요해요");return;}
  reportingConversationId=currentConversationId;
  reportingReportedUserId=currentChatPartnerId;
  document.getElementById("reportReasonInput").value="";
  _resetReportForm();
  document.getElementById("reportModal").classList.add("open");
}
function closeReport(){
  reportingPostId=null;reportingConversationId=null;reportingReportedUserId=null;reportingAdId=null;reportingEmoticonPackId=null;reportingCommissionId=null;
  document.getElementById("reportModal").classList.remove("open");
}

/* ===== 신고 =====
   유형을 미리 정해 고르게 하지 않고 신고자가 직접 쓰게 한다.
   목록을 주면 거기에 없는 문제는 '기타'로 뭉뚱그려지고 정작 필요한 맥락이 빠진다.
   대신 서술을 **필수**로 받는다 — 빈 신고는 운영자가 판단할 근거가 없다. */
var URGENT_WORDS=["불법촬영","몰카","리벤지","아동","미성년","성착취","아청","초등","중학생"];
// 관리자 신고함에서 긴급해 보이는 신고를 위로 올리기 위한 판별(표시·정렬 전용).
// 자동으로 글을 가리는 등의 조치는 일절 하지 않는다.
function _isUrgentReport(r){
  var t=String((r&&r.reason)||"");
  return URGENT_WORDS.some(function(w){return t.indexOf(w)>-1;});
}
// 신고창을 열 때마다 안내를 기본 문구로 되돌린다(이전 신고의 경고가 남지 않게)
function _resetReportForm(){
  var hint=document.getElementById("reportCatHint");
  if(hint){hint.textContent="신고 내용은 운영진만 확인할 수 있어요.";hint.classList.remove("rp-urgent");}
}
async function submitReport(){
  var reason=document.getElementById("reportReasonInput").value.trim();
  if(reason.length<5){
    var hint=document.getElementById("reportCatHint");
    if(hint){hint.textContent="어떤 점이 문제인지 조금만 더 적어주세요.";hint.classList.add("rp-urgent");}
    return;
  }
  if(reportingConversationId){
    var convId=reportingConversationId,reportedUserId=reportingReportedUserId;
    var res=await window.supabase.from("reports").insert({conversation_id:convId,reported_user_id:reportedUserId,reporter_id:AUTH.user.id,reason:reason});
    closeReport();
    if(res.error){toast("신고 접수 실패: "+res.error.message);return;}
    toast("신고가 접수되었어요");
    return;
  }
  if(reportingCommissionId){
    var cId=reportingCommissionId;
    var res=await window.supabase.from("reports").insert({commission_id:cId,reporter_id:AUTH.user?AUTH.user.id:null,reason:reason});
    closeReport();
    if(res.error){toast("신고 접수 실패: "+res.error.message);return;}
    toast("신고가 접수되었어요");
    return;
  }
  if(reportingEmoticonPackId){
    var packId=reportingEmoticonPackId;
    var res=await window.supabase.from("reports").insert({emoticon_pack_id:packId,reporter_id:AUTH.user?AUTH.user.id:null,reason:reason});
    closeReport();
    if(res.error){toast("신고 접수 실패: "+res.error.message);return;}
    toast("신고가 접수되었어요");
    return;
  }
  if(reportingAdId){
    var adId=reportingAdId;
    var res=await window.supabase.from("reports").insert({ad_id:adId,reporter_id:AUTH.user?AUTH.user.id:null,reason:reason});
    closeReport();
    if(res.error){toast("신고 접수 실패: "+res.error.message);return;}
    toast("신고가 접수되었어요");
    return;
  }
  var id=reportingPostId;var p=POSTS.find(function(x){return x.id===id});if(!p)return;
  var res=await window.supabase.from("reports").insert({post_id:p.dbId,reporter_id:AUTH.user?AUTH.user.id:null,reason:reason});
  closeReport();
  if(res.error){toast("신고 접수 실패: "+res.error.message);return;}
  toast("신고가 접수되었어요");
}
function confirmDialog(message){
  return new Promise(function(resolve){
    var modal=document.getElementById("confirmModal");
    var okBtn=document.getElementById("confirmModalOkBtn");
    var cancelBtn=document.getElementById("confirmModalCancelBtn");
    document.getElementById("confirmModalBody").textContent=message;
    modal.classList.add("open");
    function cleanup(result){
      modal.classList.remove("open");
      okBtn.removeEventListener("click",onOk);
      cancelBtn.removeEventListener("click",onCancel);
      resolve(result);
    }
    function onOk(){cleanup(true);}
    function onCancel(){cleanup(false);}
    okBtn.addEventListener("click",onOk);
    cancelBtn.addEventListener("click",onCancel);
  });
}
function renderComments(p){
  if(p.comments.length===0)return '<div style="padding:26px 0;text-align:center;color:var(--muted);font-size:13px">첫 훈수를 남겨보세요 ✏️</div>';
  var isFeedback=(p.board==='crit');                                  // '피드백 요청' 게시판만 채택 기능
  var isPostAuthor=!!(AUTH.user&&p.authorId&&p.authorId===AUTH.user.id);
  var accId=p.acceptedCommentId||null;
  // 원본 인덱스(ci)는 helpful/deleteComment용으로 보존하면서, 채택된 댓글만 맨 위로 정렬
  var list=p.comments.map(function(c,ci){return {c:c,ci:ci};});
  if(isFeedback&&accId)list.sort(function(a,b){return ((a.c.dbId===accId)?0:1)-((b.c.dbId===accId)?0:1);});
  return list.map(function(item){
    var c=item.c,ci=item.ci;
    var canDelete=c.dbId&&AUTH.user&&c.authorId===AUTH.user.id;
    // 관리자는 남의 댓글도 지울 수 있어야 한다(지금까진 버튼 자체가 없었다).
    // 본인 댓글은 위 '삭제'로 조용히 지우고, 남의 댓글은 사유를 받아 보관본을 남기는 경로로 보낸다.
    var canAdminDelete=c.dbId&&AUTH.user&&AUTH.profile&&AUTH.profile.is_admin&&c.authorId!==AUTH.user.id;
    var isAccepted=isFeedback&&accId&&c.dbId===accId;
    var acceptBtn=(isFeedback&&isPostAuthor&&c.dbId)
      ? (isAccepted?'<span class="cm-accept-btn on" onclick="acceptFeedback('+p.id+','+c.dbId+',true)">채택 취소</span>'
                   :'<span class="cm-accept-btn" onclick="acceptFeedback('+p.id+','+c.dbId+',false)">✅ 채택</span>')
      : '';
    var badge=isAccepted?'<div class="cm-accepted-badge">✅ 채택된 피드백</div>':'';
    var isReply=/^\s*@\S/.test(c.txt||''); // "@닉네임"으로 시작하면 답글
    return '<div class="cm'+(isAccepted?' accepted':'')+(isReply?' reply':'')+'"><div class="d-ava serif">'+avatarHTML(c.n,c.av)+'</div><div class="cbody">'+badge+'<div class="ch"><span class="cn"'+(c.authorId?' style="cursor:pointer" onclick="openUserProfile(\''+c.authorId+'\')"':'')+'>'+esc(c.n)+anonIpHTML(c.ip)+'</span>'+levelBadgeHtml(c.lv,"lv-badge")+'<span class="ct">'+esc(c.t)+'</span></div><div class="ctext">'+withEmoticons(esc(c.txt).replace(/^@(\S+)/,'<b class="mention">@$1</b>'))+'</div><div class="cfoot"><span onclick="helpful('+p.id+','+ci+',this)"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11v9H4v-9zM7 11l4-8a2 2 0 0 1 3 2l-1 6h5a2 2 0 0 1 2 2l-1 6a2 2 0 0 1-2 1H7"/></svg>도움돼요'+(c.h?' <b>'+c.h+'</b>':'')+'</span><span onclick="replyTo(\''+esc(c.n)+'\')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/></svg>답글</span>'+(canDelete?'<span onclick="deleteComment('+p.id+','+ci+')">삭제</span>':'')+(canAdminDelete?'<span class="c-admindel" onclick="adminDeleteComment('+p.id+','+ci+')">🗑 관리자 삭제</span>':'')+acceptBtn+'</div></div></div>';
  }).join("");
}
async function acceptFeedback(postId,commentDbId,isCancel){
  var p=POSTS.find(function(x){return x.id===postId});if(!p||!p.dbId||!window.supabase)return;
  if(!AUTH.user||p.authorId!==AUTH.user.id){toast("글 작성자만 채택할 수 있어요");return;}
  var res=await window.supabase.rpc("set_accepted_feedback",{p_post_id:p.dbId,p_comment_id:isCancel?null:commentDbId});
  if(res.error){toast("채택 실패: "+res.error.message);return;}
  var data=res.data||{};
  if(!data.ok){toast("채택할 수 없어요 ("+(data.error||"오류")+")");return;}
  p.acceptedCommentId=data.accepted||null;
  var el=document.getElementById("cmList");if(el)el.innerHTML=renderComments(p);
  var msg;
  if(isCancel)msg="채택을 취소했어요";
  else if(data.rewarded)msg="채택했어요! 작성자에게 광고 "+(data.ad!=null?data.ad:25)+"·활동 "+(data.activity!=null?data.activity:25)+"점 지급 🎁";
  else msg="채택했어요";
  toast(msg);
}
/* 관리자가 남의 댓글을 삭제 — 사유를 받고 원본을 보관본으로 남긴다.
   보안: RPC 안에서 is_admin()을 확인하므로 버튼을 숨기는 것과 무관하게 일반 유저는 막힌다. */
async function adminDeleteComment(postId,ci){
  var p=POSTS.find(function(x){return x.id===postId});if(!p)return;
  var c=p.comments[ci];if(!c||!c.dbId)return;
  var r=await adminDeleteReasonDialog();
  if(!r)return;
  if(!(await confirmDialog(r.notify?"이 댓글을 삭제할까요? 작성자에게 알림이 전송돼요.":"이 댓글을 삭제할까요? (작성자에게 알림을 보내지 않습니다)")))return;
  var res=await window.supabase.rpc("admin_delete_comment",{p_comment_id:c.dbId,p_reason:r.reason,p_notify:r.notify});
  if(res.error){toast("삭제 실패: "+res.error.message);return;}
  var d=res.data||{};
  if(!d.ok){toast(d.error==="not_admin"?"관리자만 사용할 수 있어요":("삭제할 수 없어요 ("+(d.error||"오류")+")"));return;}
  p.comments.splice(ci,1);
  var listEl=document.getElementById("cmList");
  if(listEl)listEl.innerHTML=renderComments(p);
  var head=document.querySelector(".cm-head");
  if(head)head.innerHTML='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/></svg>훈수 · 크리틱 '+p.comments.length;
  toast(r.notify?"관리자 권한으로 댓글을 삭제했어요":"관리자 권한으로 댓글을 삭제했어요 (알림 미발송)");
}
async function deleteComment(postId,ci){
  var p=POSTS.find(function(x){return x.id===postId});if(!p)return;
  var c=p.comments[ci];if(!c)return;
  if(!(await confirmDialog("댓글을 삭제할까요?")))return;
  if(c.dbId&&window.supabase){
    var res=await window.supabase.from("comments").delete().eq("id",c.dbId);
    if(res.error){toast("삭제 실패: "+res.error.message);return;}
  }
  p.comments.splice(ci,1);
  document.getElementById("cmList").innerHTML=renderComments(p);
  document.querySelector(".cm-head").innerHTML='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/></svg>훈수 · 크리틱 '+p.comments.length;
  toast("댓글을 삭제했어요");
}
async function addComment(id){
  var p=POSTS.find(function(x){return x.id===id});var inp=document.getElementById("cmInput");var v=inp.value.trim();
  if(!v){toast("내용을 입력해주세요");return;}
  var newComment={n:"나",t:"방금",txt:v};
  if(p.dbId&&window.supabase){
    var res=await window.supabase.from("comments").insert({post_id:p.dbId,author_id:AUTH.user?AUTH.user.id:null,content:v}).select().single();
    if(res.error){toast("저장 실패: "+res.error.message);return;}
    newComment.dbId=res.data.id;newComment.authorId=res.data.author_id;
    refreshMyProfile();
  }
  p.comments.push(newComment);
  document.getElementById("cmList").innerHTML=renderComments(p);
  document.querySelector(".cm-head").innerHTML='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/></svg>훈수 · 크리틱 '+p.comments.length;
  inp.value="";track("comment");toast("훈수를 남겼어요 🙏");
}
async function toggleLike(id){
  var p=POSTS.find(function(x){return x.id===id});
  if(p.dbId&&window.supabase){
    var uid=myLikeId();
    if(p._liked){
      var del=await window.supabase.from("likes").delete().eq("post_id",p.dbId).eq("user_id",uid);
      if(del.error){toast("처리 실패: "+del.error.message);return;}
      p._liked=false;p.likes--;
    }else{
      var ins=await window.supabase.from("likes").insert({post_id:p.dbId,user_id:uid});
      if(ins.error){toast("처리 실패: "+ins.error.message);return;}
      p._liked=true;p.likes++;track("like");
    }
  }else{
    p._liked=!p._liked;p.likes+=p._liked?1:-1;
  }
  var wasLiked=p._liked;
  var btn=document.getElementById("likeBtn");
  if(btn){
    btn.classList.toggle("liked",p._liked);
    btn.innerHTML=likeIconSvg(p._liked)+'좋아요 '+p.likes;
    btn.classList.add("pop");setTimeout(function(){btn.classList.remove("pop")},340);
  }
  if(wasLiked)toast("좋아요를 눌렀어요","♥");
}
function selectBoard(id,skipRender){
  // 성인 게시판은 본인확인을 마친 계정만 들어갈 수 있다(서버 RLS로도 막혀 있고, 여기선 안내를 띄운다)
  if(id==="adult"&&!isAdultVerified()){
    closeDrawer();closeSheet();
    if(!AUTH.user){openLoginModal();toast("로그인 후 이용할 수 있어요","🔞");}
    else openAdultGate();
    return; // 게시판을 바꾸지 않고 그대로 머문다
  }
  state.board=id;state.query="";state.tag=null;page=1;
  document.getElementById("searchInput").value="";var m=document.getElementById("searchInputM");if(m)m.value="";
  renderNav(document.getElementById("boardNav"));renderNav(document.getElementById("boardNavM"));renderNav(document.getElementById("boardNavS"));
  renderChips();closeDrawer();closeSheet();syncTabs(id);
  if(!skipRender)renderList(); // skipRender: 이미 그 목록을 보고 있어 다시 그릴 필요가 없을 때(홈 재탭 등)
  window.scrollTo({top:0,behavior:"smooth"});
}
/* ===== 커미션 페이지 (cm-) : 화면 시안 이식 · 데모 데이터 ===== */
var cmGrads=['linear-gradient(135deg,#f7d5e6,#e8a5c8)','linear-gradient(135deg,#d5e3f7,#a5c0e8)',
  'linear-gradient(135deg,#f7e6d5,#e8c8a5)','linear-gradient(135deg,#e0d5f7,#bfa5e8)',
  'linear-gradient(135deg,#d5f7e3,#a5e8c0)','linear-gradient(135deg,#f7d5d5,#e8a5a5)'];
var cmData=[]; // openCommissionList()가 Supabase에서 실제로 불러와 채움
var cmDataLoaded=false;
var cmRefreshing=false; // refreshCommissions() 중복 실행 방지
// 커미션 목록이 실제로 바뀌었는지 판단용 서명(새 커미션·상태/제목/가격 변경 감지)
function cmListSignature(){
  return cmData.map(function(c){return c.id+"."+c.status+"."+(c.title||"")+"."+(c.price||"")+"."+(c.reviewEventOn?"1":"0");}).join(",");
}
// 커미션 목록을 DB에서 다시 불러와, '리스트 화면을 보고 있고 & 내용이 바뀐' 경우에만 그리드/칩을 한 번 갱신.
async function refreshCommissions(){
  if(!window.supabase||cmRefreshing)return;
  if(Date.now()-cmLoadedAt<REFRESH_THROTTLE_MS)return; // 최근에 불러왔으면 재조회 생략(캐시 그대로 사용)
  cmRefreshing=true;
  var before=cmListSignature();
  try{
    await cmLoadCommissions();
    if(cmBookmarkIds===null)await cmLoadMyBookmarks();
    cmLoadedAt=Date.now();
  }catch(e){}
  cmRefreshing=false;
  if(curTab==="commission"&&document.getElementById('cmGrid')&&cmListSignature()!==before){
    var chipsEl=document.querySelector('.cm-chips');if(chipsEl)chipsEl.innerHTML=cmChipsHTML();
    var gridEl=document.getElementById('cmGrid');if(gridEl)gridEl.innerHTML=cmGridHTML();
  }
}
var cmReviews=[
  {who:'달빛초',type:'호',ctype:'반신',txt:'퀄리티 미쳤어요... 명암 표현이 진짜 섬세하고 기한도 딱 맞춰주셨어요! 재의뢰 무조건 합니다 🥹',date:'2026.07.28'},
  {who:'구름사탕',type:'호',ctype:'두상',txt:'캐릭터 특징 너무 잘 살려주셨어요 소통도 친절하시고 만족스러운 거래였습니다!',date:'2026.07.20'},
  {who:'초코라떼',type:'불호',ctype:'흉상',txt:'그림은 좋았는데 예정보다 조금 늦어졌어요. 그래도 결과물은 만족합니다.',date:'2026.07.12'}
];
var cmMyList=[]; // cmOpenMy()가 Supabase에서 실제로 불러와 채움
var CM_TYPES=['두상','흉상','반신','전신','SD','이모티콘','배경','기타'];
var CM_BAD_REASONS=['퀄리티 불만족','마감 기한 미준수','소통이 어려웠어요','스타일이 요청과 달랐어요','기타'];
// 작가가 거래 정책을 직접 안 적었을 때 뜨는 기본 면책 문구(신청서·상세 공용)
var CM_DEFAULT_POLICY_HTML='commi는 결제를 중개하지 않고 소통 공간만 제공하는 서비스로, 거래의 당사자가 아니에요.<br>작업 범위·기한·환불 등은 작가님과 신청자님이 직접 정하며, 거래 중 사기·분쟁 등 어떤 문제가 생겨도 commi는 대금을 보증·환불하거나 법적 책임을 지지 않아요.<br>미성년자 거래는 보호자 동의가 없으면 취소될 수 있어요.';
var cmTopTags=[]; // cmLoadCommissions()가 실제 사용 빈도순으로 채움
var cmBookmarkIds=null; // 로그인 후 Set으로 채워짐(북마크한 커미션 id들)
var cmState={activeTag:null,wrType:null,wrCtype:null,query:'',sort:'home'};
var cmReg={images:[],tags:[],status:'open',editingId:null};
var cmDetailCtx={from:'list',idx:0};
var cmPreviewObj=null;
function cmQ(s){return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'")}
/* ===== 커미션 끌올(다시 위로 올리기) =====
   24시간에 한 번, 홈·신규 정렬에서만 위로 올라온다.
   추천 점수에는 일부러 반영하지 않는다 — 버튼 한 번으로 추천 순위가 오르면 순위 조작이 된다.
   실제 제한은 서버(bump_commission RPC)가 건다. 여기 계산은 버튼 문구를 위한 것일 뿐이다. */
var CM_BUMP_COOLDOWN_MS=24*3600*1000;
var CM_BUMP_READY=false; // commission-bump.sql 실행 전이면 false → 버튼을 아예 안 그린다

// 남은 대기 시간(ms). 0이면 지금 끌올할 수 있다.
function cmBumpLeftMs(d){
  var t=d&&(d.bumpedAt||d.createdAt);
  if(!t)return 0;
  var ms=CM_BUMP_COOLDOWN_MS-(Date.now()-new Date(t).getTime());
  return ms>0?ms:0;
}
function cmFmtLeft(ms){
  var min=Math.ceil(ms/60000),h=Math.floor(min/60),m=min%60;
  if(h>0)return m?(h+"시간 "+m+"분"):(h+"시간");
  return Math.max(1,m)+"분";
}
// 끌올 버튼 하나(내 커미션 목록용). 마감이거나 SQL 실행 전이면 아무것도 안 그린다.
function cmBumpBtnHTML(c){
  if(!CM_BUMP_READY||c.status!=='open')return '';
  var left=cmBumpLeftMs(c);
  if(left>0)return '<span class="cm-my-edit cm-bump-wait" title="24시간에 한 번 올릴 수 있어요">⏳ '+cmFmtLeft(left)+' 후</span>';
  return '<button class="cm-my-edit cm-bump" onclick="cmBumpCommission('+c.id+')">🔝 끌올</button>';
}
// 서버에 끌올 요청. 성공하면 목록을 다시 그려 바로 위로 올라간 걸 보여준다.
async function cmBumpCommission(id){
  if(!AUTH.user){toast("로그인이 필요해요","🔒");openLoginModal();return;}
  var res;
  try{res=await window.supabase.rpc("bump_commission",{p_id:id});}
  catch(e){toast("끌올하지 못했어요");return;}
  if(res.error){toast("끌올하지 못했어요: "+res.error.message);return;}
  var r=res.data||{};
  if(!r.ok){
    if(r.reason==="cooldown"){
      var left=r.next_at?(new Date(r.next_at).getTime()-Date.now()):0;
      toast(left>0?(cmFmtLeft(left)+" 후에 다시 올릴 수 있어요"):"잠시 후에 다시 올릴 수 있어요","⏳");
    }
    else if(r.reason==="closed")toast("마감한 커미션은 올릴 수 없어요","⛔");
    else if(r.reason==="not_owner")toast("내 커미션만 올릴 수 있어요","🔒");
    else if(r.reason==="login")toast("로그인이 필요해요","🔒");
    else toast("끌올하지 못했어요");
    cmApplyBump(id,null); // 서버가 아는 시각으로 화면을 맞춘다(버튼이 잘못 떠 있었을 수 있음)
    return;
  }
  cmApplyBump(id,r.bumped_at);
  toast("맨 위로 올렸어요","🔝");
}
// 방금 끌올한 결과를 화면 데이터에 반영(다시 불러오지 않고 그 자리에서 갱신).
function cmApplyBump(id,bumpedAt){
  var t=bumpedAt||new Date().toISOString();
  var d=cmData.find(function(c){return c.id===id;});
  if(d&&bumpedAt)d.bumpedAt=t;
  var mine=cmMyList.find(function(c){return c.id===id;});
  if(mine&&bumpedAt)mine.bumpedAt=t;
  if(cmDetail&&cmDetail.id===id&&bumpedAt)cmDetail.bumpedAt=t;
  var myEl=document.getElementById('cmMyList');
  if(myEl)myEl.innerHTML=cmMyListHTML();
  var gridEl=document.getElementById('cmGrid');
  if(gridEl)gridEl.innerHTML=cmGridHTML();
}
// 끌올 순으로 정렬(끌올한 적 없으면 등록 시각). 목록을 통째로 받아오므로 여기서 정렬해도 된다.
// ⚠️ DB 쿼리의 order를 bumped_at으로 바꾸지 않는 이유: SQL 실행 전이면 없는 칸이라 조회가 통째로 실패한다.
function cmSortByBump(list){
  return list.slice().sort(function(a,b){
    return String(b.bumpedAt||b.createdAt||'').localeCompare(String(a.bumpedAt||a.createdAt||''));
  });
}

function cmRowToData(row,artistNickname){
  var imgs=(row.commission_images||[]).slice().sort(function(a,b){return a.sort-b.sort;}).map(function(x){return x.url;});
  var revs=POSTS.filter(function(p){return p.board==='review'&&p.commissionId===row.id;});
  var goodCount=revs.filter(function(r){return r.commissionSentiment==='good';}).length;
  return{
    id:row.id,authorId:row.author_id,
    artist:artistNickname||'탈퇴한 사용자',
    title:row.title,price:row.price,status:row.status,tags:row.tags||[],
    period:row.period,slots:row.slots,desc:row.description,descHtml:row.description_html||null,usage:row.usage_rights,policy:row.trade_policy,
    images:imgs,likes:0,views:row.views||0,createdAt:row.created_at,form:row.application_form||[],
    reviewEventOn:!!row.review_event_on,reviewEventBenefit:row.review_event_benefit||'',
    reviewCount:revs.length,satisfaction:revs.length?(goodCount/revs.length):0,
    adLocked:!!AD_LOCKED_COMMISSION_IDS[row.id],
    // 끌올 시각. 칸 자체가 없으면(SQL 실행 전) undefined라 등록 시각으로 대신한다.
    bumpedAt:row.bumped_at||row.created_at
  };
}
async function cmLoadCommissions(){
  var res=await window.supabase.from('commissions').select('*,commission_images(url,sort)').order('created_at',{ascending:false});
  if(res.error){console.error(res.error);cmData=[];cmDataLoaded=true;return;}
  var authorIds=Array.from(new Set(res.data.map(function(r){return r.author_id;})));
  var profRes=authorIds.length?await window.supabase.from('profiles').select('id,nickname,avatar_url').in('id',authorIds):{data:[]};
  var profById={};
  (profRes.data||[]).forEach(function(p){profById[p.id]={nickname:p.nickname,avatarUrl:p.avatar_url};});
  // bumped_at 칸이 실제로 있는지로 끌올 기능 사용 가능 여부를 판단(commission-bump.sql 실행 여부)
  CM_BUMP_READY=res.data.length>0&&Object.prototype.hasOwnProperty.call(res.data[0],'bumped_at');
  cmData=cmSortByBump(res.data.map(function(row){
    var prof=profById[row.author_id];
    return cmRowToData(row,prof?prof.nickname:null);
  }));
  await cmLoadBookmarkCounts();
  cmTopTags=cmComputeTopTags();
  await cmLoadRecScores();
  cmDataLoaded=true;
}
// 커미션별 전체 북마크 수(서버 집계). commission_bookmarks는 '본인 것만' RLS라 클라가 못 세므로
// security definer RPC(개수만 반환)로 받아 각 커미션 d.bookmarkCount에 채움.
async function cmLoadBookmarkCounts(){
  var m={};
  try{
    var res=await window.supabase.rpc("get_commission_bookmark_counts");
    if(!res.error&&res.data)res.data.forEach(function(r){m[r.commission_id]=r.cnt;});
  }catch(e){}
  cmData.forEach(function(d){d.bookmarkCount=m[d.id]||0;});
}
// 추천 점수(서버 계산)를 불러와 {커미션id: 점수} 맵으로 저장. 추천 탭 정렬에 사용.
// RPC가 아직 없거나(실행 전) 오류면 빈 맵으로 두고, 정렬은 후기 순으로 자연 폴백.
var cmRecScores={};
var cmRecBreakdown={}; // {커미션id: 요소별 점수} — 관리자만 채워짐(get_commission_rec_breakdown)
async function cmLoadRecScores(){
  try{
    var res=await window.supabase.rpc("get_commission_rec_scores");
    cmRecScores={};
    if(!res.error&&res.data)res.data.forEach(function(r){cmRecScores[r.commission_id]=r.score;});
  }catch(e){cmRecScores={};}
  await cmLoadRecBreakdown();
}
// 관리자만: 커미션별 요소 점수 분해를 불러와 cmRecBreakdown에 저장(비관리자는 서버가 0행 반환).
async function cmLoadRecBreakdown(){
  cmRecBreakdown={};
  if(!(AUTH.profile&&AUTH.profile.is_admin)||!window.supabase)return;
  try{
    var res=await window.supabase.rpc("get_commission_rec_breakdown");
    if(!res.error&&res.data)res.data.forEach(function(r){cmRecBreakdown[r.commission_id]=r;});
  }catch(e){}
}
// 관리자 전용 추천 점수 패널 HTML (요소별 값 + 가중치 라벨 + 최종). 일반 유저에겐 빈 문자열.
function cmAdminScoreHTML(d){
  if(!(AUTH.profile&&AUTH.profile.is_admin)||!d||d.id==null)return '';
  var b=cmRecBreakdown[d.id];
  if(!b)return '<div class="cm-adminscore"><div class="cm-as-h">🛠 추천 점수 <span class="cm-as-badge">관리자 전용</span></div>'+
    '<div class="cm-as-note">'+(d.status==='open'?'추천 점수를 불러오지 못했어요. 목록을 새로고침하면 표시돼요.':'이 커미션은 접수중이 아니라 추천 순위에서 제외돼요.')+'</div></div>';
  function row(label,val,w,cls){return '<div class="cm-as-row'+(cls?' '+cls:'')+'"><span>'+label+'</span><span><b>'+val+'</b>'+(w?' <span class="cm-as-w">×'+w+'</span>':'')+'</span></div>';}
  return '<div class="cm-adminscore">'+
    '<div class="cm-as-h">🛠 추천 점수 <span class="cm-as-badge">관리자 전용</span></div>'+
    row('호 후기율',b.ho_rate,'0.35')+
    row('작가 활동',b.activity_score,'0.19')+
    row('후기 개수',b.reviewcnt_score,'0.15')+
    row('작업물 활발도',b.ws_score,'0.12')+
    row('인기',b.pop_score,'0.12')+
    row('신규 보정',b.new_score,'0.07')+
    (b.gated?'<div class="cm-as-note">⚠️ 후기 품질 게이트 적용(×0.5) — 후기 '+b.rv_total+'개 중 호 후기율 낮음</div>':'')+
    row('자동 점수 합계',b.auto_score,'','cm-as-sub')+
    '<div class="cm-as-row cm-as-adjust"><span>관리자 추가 점수</span>'+
      '<span class="cm-as-ctrl">'+
        '<button onclick="cmAdjustBonus('+d.id+',0)" title="0으로">0</button>'+
        '<button onclick="cmAdjustBonus('+d.id+','+(b.admin_bonus-5)+')">−5</button>'+
        '<button onclick="cmAdjustBonus('+d.id+','+(b.admin_bonus-1)+')">−1</button>'+
        '<b class="cm-as-bonusval">'+b.admin_bonus+'</b>'+
        '<button onclick="cmAdjustBonus('+d.id+','+(b.admin_bonus+1)+')">+1</button>'+
        '<button onclick="cmAdjustBonus('+d.id+','+(b.admin_bonus+5)+')">+5</button>'+
      '</span>'+
    '</div>'+
    row('최종 점수',b.final_score,'','cm-as-final')+
  '</div>';
}
// 관리자 추가 점수 조정 — 서버 RPC(admin_set_rec_bonus)로 저장(0~30 클램프+로그), 로컬 점수·순위 즉시 반영, 패널 재렌더.
async function cmAdjustBonus(commissionId,newValue){
  if(!(AUTH.profile&&AUTH.profile.is_admin)||!window.supabase)return;
  newValue=Math.max(0,Math.min(30,parseInt(newValue,10)||0)); // 클라 클램프(서버도 클램프)
  var res=await window.supabase.rpc("admin_set_rec_bonus",{p_commission_id:commissionId,p_value:newValue});
  if(res.error){toast("조정 실패: "+res.error.message);return;}
  var data=res.data||{};
  if(!data.ok){toast(data.error==="not_admin"?"관리자만 조정할 수 있어요":("조정 실패 ("+(data.error||"오류")+")"));return;}
  var b=cmRecBreakdown[commissionId];
  if(b){
    var delta=data.value-b.admin_bonus;      // 추가 점수는 게이트 밖 선형 가산이라 최종에 그대로 반영
    b.admin_bonus=data.value;
    b.final_score=+(b.final_score+delta).toFixed(2);
    cmRecScores[commissionId]=b.final_score; // 추천 순위(목록)도 즉시 반영
  }
  toast("추가 점수를 "+data.value+"점으로 조정했어요 (상한 "+data.cap+")");
  // 화면에 떠 있는 관리자 뷰를 그 자리에서 갱신(순서는 유지, 값·최종만 갱신)
  var mgmtRow=document.getElementById('cm-mgmt-'+commissionId);
  if(mgmtRow){mgmtRow.outerHTML=cmMgmtRowHTML(commissionId);return;}
  var d=cmData.find(function(x){return x.id===commissionId;});
  var el=document.querySelector('.cm-adminscore');
  if(d&&el)el.outerHTML=cmAdminScoreHTML(d);   // 상세 패널만 다시 그림(값·최종 갱신)
}
/* 관리자 커미션 추천 관리 목록 — 접수중 커미션을 최종 점수 순으로, 요소 요약 + 그 자리 +/- 조정 */
async function openAdminCommissionMgmt(){
  if(!AUTH.profile||!AUTH.profile.is_admin||!window.supabase)return;
  enterScreen("admCmMgmt",openProfile); // 뒤로가기가 프로필로 복귀
  if(!cmDataLoaded)await cmLoadCommissions();
  else if(!Object.keys(cmRecBreakdown).length)await cmLoadRecBreakdown();
  renderAdminCommissionMgmt();
}
function cmMgmtRowHTML(id){
  var b=cmRecBreakdown[id]; var d=cmData.find(function(x){return x.id===+id;});
  if(!b||!d)return '';
  return '<div class="cm-mgmt" id="cm-mgmt-'+d.id+'">'+
    '<div class="cm-mgmt-info" onclick="cmOpenCommissionById('+d.id+')">'+
      '<div class="cm-mgmt-title">'+esc(d.title)+'</div>'+
      '<div class="cm-mgmt-sub">'+esc(d.artist)+' · 최종 <b>'+b.final_score+'</b> <span class="cm-mgmt-dim">(자동 '+b.auto_score+' + 추가 '+b.admin_bonus+')</span></div>'+
      '<div class="cm-mgmt-factors">호'+b.ho_rate+' · 활'+b.activity_score+' · 후'+b.reviewcnt_score+' · 작'+b.ws_score+' · 인'+b.pop_score+' · 신'+b.new_score+(b.gated?' · <span class="cm-mgmt-gate">⚠️게이트</span>':'')+'</div>'+
    '</div>'+
    '<div class="cm-mgmt-ctrl">'+
      '<button onclick="cmAdjustBonus('+d.id+',0)" title="0으로">0</button>'+
      '<button onclick="cmAdjustBonus('+d.id+','+(b.admin_bonus-5)+')">−5</button>'+
      '<button onclick="cmAdjustBonus('+d.id+','+(b.admin_bonus-1)+')">−1</button>'+
      '<b class="cm-mgmt-bonus">'+b.admin_bonus+'</b>'+
      '<button onclick="cmAdjustBonus('+d.id+','+(b.admin_bonus+1)+')">+1</button>'+
      '<button onclick="cmAdjustBonus('+d.id+','+(b.admin_bonus+5)+')">+5</button>'+
    '</div>'+
  '</div>';
}
function renderAdminCommissionMgmt(){
  var ids=Object.keys(cmRecBreakdown).filter(function(id){return cmData.some(function(x){return x.id===+id;});});
  ids.sort(function(a,b){return cmRecBreakdown[b].final_score-cmRecBreakdown[a].final_score;});
  var h='<div class="profile">'+
    '<button class="d-back" onclick="screenBack()">← 내 정보로</button>'+
    '<div class="pf-sec">🎯 커미션 추천 관리 ('+ids.length+')</div>'+
    '<div class="cm-mgmt-note">접수중 커미션만 점수가 매겨져요(마감 제외). 최종 점수 높은 순. 아래 +/−로 관리자 추가 점수(0~30)를 바로 조정하면 순위에 반영돼요. 요약: 호(후기율)·활(작가활동)·후(후기개수)·작(작업물)·인(인기)·신(신규).</div>';
  if(!ids.length)h+='<div class="pf-empty">접수중 커미션이 없어요.</div>';
  else h+='<div class="cm-mgmt-list">'+ids.map(cmMgmtRowHTML).join('')+'</div>';
  h+='</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
function cmComputeTopTags(){
  var counts={};
  // 접수중 커미션의 태그만 집계(마감만 달린 태그가 칩에 떠서 눌러도 빈 결과 나오는 것 방지)
  cmData.forEach(function(d){if(d.status!=='open')return;(d.tags||[]).forEach(function(t){counts[t]=(counts[t]||0)+1;});});
  var tags=Object.keys(counts);
  tags.sort(function(a,b){return counts[b]-counts[a];});
  return tags.slice(0,10);
}
async function cmLoadMyBookmarks(){
  if(!AUTH.user){cmBookmarkIds=new Set();return;}
  var res=await window.supabase.from('commission_bookmarks').select('commission_id').eq('user_id',AUTH.user.id);
  cmBookmarkIds=new Set((res.data||[]).map(function(r){return r.commission_id;}));
}
/* ---- 프로필의 커미션 타입 목록(크레페 시안 2단계) ---- */
async function pfArtistCommissions(userId,nickname){
  if(!window.supabase)return[];
  var res=await window.supabase.from('commissions').select('*,commission_images(url,sort)').eq('author_id',userId).order('created_at',{ascending:false});
  if(res.error||!res.data)return[];
  return res.data.map(function(row){return cmRowToData(row,nickname);});
}
function pfCmListItemHTML(d){
  var thumb=(d.images&&d.images.length)?('background-image:url(\''+cmQ(d.images[0])+'\');background-size:cover;background-position:center'):('background:'+cmGrads[d.id%cmGrads.length]);
  var statusHTML=d.status==='open'?'<div class="pfh-cm-status open">접수중</div>':'<div class="pfh-cm-status">신청 마감</div>';
  var bookmarked=cmBookmarkIds&&cmBookmarkIds.has(d.id);
  var tags=(d.tags||[]).map(function(t){return '<span class="pfh-cm-tag">#'+esc(t)+'</span>';}).join('');
  return '<div class="pfh-cm-item" onclick="cmOpenCommissionById('+d.id+')">'+
    '<div class="pfh-cm-thumb" style="'+thumb+'">'+statusHTML+'</div>'+
    '<div class="pfh-cm-info">'+
      '<div class="pfh-cm-top"><div class="pfh-cm-title">'+esc(d.title)+'</div>'+
        '<div class="cm-bm pfh-cm-bm'+(bookmarked?' on':'')+'" onclick="event.stopPropagation();cmToggleBookmark('+d.id+',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12v18l-6-4-6 4z"/></svg></div></div>'+
      (tags?('<div class="pfh-cm-tags">'+tags+'</div>'):'')+
      '<div class="pfh-cm-desc">'+esc(d.desc||'')+'</div>'+
    '</div>'+
  '</div>';
}
function pfCommissionListHTML(list){
  var h='<div class="pf-sec">커미션 타입</div>';
  if(!list.length)return h+'<div class="pf-empty">아직 등록된 커미션이 없어요.</div>';
  return h+'<div class="pfh-cm-list">'+list.map(pfCmListItemHTML).join('')+'</div>';
}
/* ---- 프로필의 후기 목록(크레페 시안 3단계) ---- */
var pfReviewsExpanded=false;
var pfReviewsForUserId=null;
function pfArtistReviewList(userId,nickname){
  return POSTS.filter(function(p){
    if(p.board!=='review')return false;
    return p.reviewedUserId?p.reviewedUserId===userId:p.reviewedNickname===nickname;
  });
}
/* ---- 후기 카드(텍스트 우선형) — 프로필의 후기 목록과 커미션 페이지의 후기 목록이 공유 ---- */
function reviewItemTitleFor(r){
  if(r.commissionId){
    var c=cmData.find(function(x){return x.id===r.commissionId;});
    return c?c.title:'커미션 페이지의 후기';
  }
  var cp=r.commissionPostId?POSTS.find(function(p){return p.dbId===r.commissionPostId;}):null;
  return cp?cp.title:'삭제된 커미션 글';
}
function reviewItemHTML(r){
  var bad=r.commissionSentiment==='bad';
  var txt=(r.content||[]).join('\n');
  var imgsHTML=(r.images&&r.images.length)?('<div class="rv-imgs">'+r.images.map(function(u){return '<div class="rv-img"><img src="'+esc(u)+'" alt="" loading="lazy"></div>';}).join('')+'</div>'):'';
  return '<div class="rv-item" onclick="openPost('+r.id+')">'+
    '<div class="rv-top"><span class="rv-who">'+esc(reviewItemTitleFor(r))+'</span>'+
      '<span class="rv-tag'+(bad?' bad':' good')+'">'+(bad?'😐 불호':'😊 만족')+'</span></div>'+
    (txt?('<div class="rv-txt">'+esc(txt)+'</div>'):'')+
    imgsHTML+
    '<div class="rv-meta"><span>'+esc(dispName(r.author))+'</span><span>'+esc(r.time)+'</span></div>'+
  '</div>';
}
function reviewListHTML(reviews){
  if(!reviews.length)return'';
  return '<div class="rv-list">'+reviews.map(reviewItemHTML).join('')+'</div>';
}
function pfReviewListHTML(reviews,userId){
  var h='<div class="pf-sec">후기 <span class="pfh-rv-cnt">'+reviews.length+'개</span></div>';
  if(!reviews.length)return h+'<div class="pf-empty">아직 받은 후기가 없어요.</div>';
  var showCount=pfReviewsExpanded?reviews.length:Math.min(5,reviews.length);
  h+=reviewListHTML(reviews.slice(0,showCount));
  var isSelf=AUTH.user&&AUTH.user.id===userId;
  var moreCall=isSelf?'openProfile()':('openUserProfile(\''+cmQ(userId)+'\')');
  if(reviews.length>showCount)h+='<div class="rv-more" onclick="pfReviewsExpanded=true;'+moreCall+'">더보기</div>';
  return h;
}
// 북마크 토글 시 로컬 카운트를 즉시 반영(다음 로드 때 서버 값으로 다시 맞춰짐)
function cmBumpBookmarkCount(commissionId,delta){
  var d=cmData.find(function(x){return x.id===commissionId;});
  if(d)d.bookmarkCount=Math.max(0,(d.bookmarkCount||0)+delta);
}
async function cmToggleBookmark(commissionId,el){
  if(!AUTH.user){toast('로그인 후 북마크할 수 있어요','🔒');loginWithGoogle();return;}
  if(cmBookmarkIds===null)await cmLoadMyBookmarks();
  var isBookmarked=cmBookmarkIds.has(commissionId);
  if(isBookmarked){
    var del=await window.supabase.from('commission_bookmarks').delete().eq('user_id',AUTH.user.id).eq('commission_id',commissionId);
    if(del.error){toast('처리 실패: '+del.error.message);return;}
    cmBookmarkIds.delete(commissionId);
    cmBumpBookmarkCount(commissionId,-1);
    toast('북마크를 해제했어요');
  }else{
    var ins=await window.supabase.from('commission_bookmarks').insert({user_id:AUTH.user.id,commission_id:commissionId});
    if(ins.error){toast('처리 실패: '+ins.error.message);return;}
    cmBookmarkIds.add(commissionId);
    cmBumpBookmarkCount(commissionId,1);
    track("bookmark");toast('북마크에 저장했어요','🔖');
  }
  if(el){
    var wrap=el.classList.contains('cm-bookmark')||el.classList.contains('cm-bm')?el:el.closest('.cm-bookmark,.cm-bm');
    if(wrap)wrap.classList.toggle('on',cmBookmarkIds.has(commissionId));
  }
}
async function openCommissionList(){
  curTab="commission";navSeq++;
  userLeftHome=true;
  if(!navigatingBack)resetScreens();
  enterScreen("cmList",goHome);
  if(location.pathname!=="/"){try{history.replaceState({},"","/");}catch(e){}} // 상세(/commission/id)에서 목록으로 오면 주소 초기화
  closeDrawer();closeSheet();syncTabs("commission");
  // 이미 커미션 리스트 화면(#cmGrid 존재)이면 셸을 다시 안 그리고 스크롤만 → refreshCommissions가
  // 새 커미션 있을 때만 그리드를 딱 한 번 갱신(껌뻑임 없이). 다른 화면/뒤로에서 왔으면 캐시로 즉시 셸 렌더.
  if(!document.getElementById('cmGrid')){
    document.getElementById("main").innerHTML=cmListHTML();
  }
  window.scrollTo({top:0,behavior:"smooth"});
  refreshCommissions();
}
function cmCardHTML(d,idx){
  var thumb=(d.images&&d.images[0])?("background-image:url('"+cmQ(d.images[0])+"');background-size:cover;background-position:center"):('background:'+cmGrads[idx%cmGrads.length]);
  var status=d.status==='open'?'<div class="cm-status open">오픈중</div>':'';
  var revBadge=d.reviewEventOn?'<div class="cm-revevent-badge">🎁 리뷰 이벤트</div>':'';
  var tagsLine=(d.tags&&d.tags.length)?d.tags.map(function(t){return '#'+t;}).join(' '):'';
  var bookmarked=cmBookmarkIds&&cmBookmarkIds.has(d.id);
  return '<div class="cm-card" onclick="cmOpenDetail('+idx+')">'+
    '<div class="cm-thumb" style="'+thumb+'">'+status+revBadge+
      '<div class="cm-bookmark'+(bookmarked?' on':'')+'" onclick="event.stopPropagation();cmToggleBookmark('+d.id+',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12v18l-6-4-6 4z"/></svg></div></div>'+
    '<div class="cm-c-artist">'+esc(d.artist)+'</div>'+
    '<div class="cm-c-title">'+esc(d.title)+'</div>'+
    (tagsLine?'<div class="cm-c-tags">'+esc(tagsLine)+'</div>':'')+
    '<div class="cm-c-meta"><span>👁 '+(d.views||0)+'</span><span>💬 '+(d.reviewCount||0)+'</span><span>🔖 '+(d.bookmarkCount||0)+'</span></div></div>';
}
function cmFilteredIdx(){
  var q=(cmState.query||'').trim().toLowerCase();
  // 접수중(open)만 노출 — 마감 커미션은 홈·신규·인기·검색·추천 어디에도 안 보이게(작가는 '내 커미션'에서 관리).
  var idxs=cmData.map(function(d,i){return i;}).filter(function(i){return cmData[i].status==='open';});
  if(cmState.activeTag){
    idxs=idxs.filter(function(i){return (cmData[i].tags||[]).indexOf(cmState.activeTag)>=0;});
  }
  if(!q)return idxs;
  return idxs.filter(function(i){
    var d=cmData[i];
    var hay=(d.title+' '+(d.tags||[]).join(' ')).toLowerCase();
    return hay.indexOf(q)>=0;
  });
}
function cmSortedFilteredIdx(){
  var idxs=cmFilteredIdx();
  if(cmState.sort==='new'){
    // 끌올한 커미션이 다시 위로 오도록 등록 시각 대신 끌올 시각으로 정렬
    idxs=idxs.slice().sort(function(a,b){
      var ka=cmData[a].bumpedAt||cmData[a].createdAt||'',kb=cmData[b].bumpedAt||cmData[b].createdAt||'';
      return String(kb).localeCompare(String(ka));
    });
  }else if(cmState.sort==='hot'){
    idxs=idxs.slice().sort(function(a,b){return (cmData[b].reviewCount||0)-(cmData[a].reviewCount||0);});
  }else if(cmState.sort==='recommend'){
    // 접수중 필터는 cmFilteredIdx에서 공통 적용됨. 여기선 서버 추천 점수 높은 순으로만 정렬.
    idxs=idxs.slice().sort(function(a,b){
      var sa=cmRecScores[cmData[a].id],sb=cmRecScores[cmData[b].id];
      sa=(sa==null?-1:sa);sb=(sb==null?-1:sb);
      if(sb!==sa)return sb-sa;
      return (cmData[b].reviewCount||0)-(cmData[a].reviewCount||0); // 동점이면 후기 많은 순
    });
  }
  return idxs;
}
function cmGridHTML(){
  if(!cmDataLoaded)return '<div class="cm-my-empty">불러오는 중...</div>';
  if(cmData.length===0)return '<div class="cm-my-empty">아직 등록된 커미션이 없어요.</div>';
  var idxs=cmSortedFilteredIdx();
  if(idxs.length===0)return '<div class="cm-my-empty">'+(cmState.query?'검색 결과가 없어요.<br>다른 제목이나 태그로 찾아보세요.':(cmState.activeTag?'이 태그의 접수중 커미션이 없어요.':'접수중인 커미션이 없어요.'))+'</div>';
  return idxs.map(function(i){return cmCardHTML(cmData[i],i);}).join('');
}
function cmSetSort(key){
  cmState.sort=key;
  var tabsEl=document.querySelector('.cm-tabs');
  if(tabsEl)tabsEl.innerHTML=cmTabsHTML();
  var gridEl=document.getElementById('cmGrid');
  if(gridEl)gridEl.innerHTML=cmGridHTML();
}
function cmTabsHTML(){
  return '<div class="cm-tab'+(cmState.sort==='home'?' on':'')+'" onclick="cmSetSort(\'home\')">홈</div>'+
    '<div class="cm-tab'+(cmState.sort==='recommend'?' on':'')+'" onclick="cmSetSort(\'recommend\')">추천</div>'+
    '<div class="cm-tab'+(cmState.sort==='new'?' on':'')+'" onclick="cmSetSort(\'new\')">신규</div>'+
    '<div class="cm-tab'+(cmState.sort==='hot'?' on':'')+'" onclick="cmSetSort(\'hot\')">인기</div>';
}
function cmSearch(v){
  cmState.query=v;
  document.getElementById('cmGrid').innerHTML=cmGridHTML();
}
function cmChipsHTML(){
  var all='<div class="cm-chip'+(cmState.activeTag?'':' on')+'" onclick="cmSetTag(null)">전체</div>';
  var rest=cmTopTags.map(function(t){return '<div class="cm-chip'+(cmState.activeTag===t?' on':'')+'" onclick="cmSetTag(\''+cmQ(t)+'\')">'+esc(t)+'</div>';}).join('');
  return all+rest;
}
function cmListHTML(){
  return '<div class="cm-root">'+
    '<div class="cm-top">'+
      '<div class="cm-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>'+
        '<input id="cmSearchInput" type="text" placeholder="커미션 검색 (제목·태그)" value="'+esc(cmState.query||'')+'" oninput="cmSearch(this.value)"></div>'+
      '<div class="cm-tabs">'+cmTabsHTML()+'</div>'+
      '<div class="cm-top-line"></div>'+
    '</div>'+
    '<div class="cm-sec"><div class="cm-sec-h">지금 많이 찾는 태그</div></div>'+
    '<div class="cm-chips">'+cmChipsHTML()+'</div>'+
    '<div class="cm-grid" id="cmGrid">'+cmGridHTML()+'</div>'+
    // 커미션 목록에만 뜨는 '만들기' 버튼. 하단 탭 위에 뜨도록 탭 높이만큼 띄운다.
    // (#main을 다시 그리면 같이 사라지므로 다른 화면으로 새어나가지 않는다)
    '<div class="cm-fab-wrap"><button class="cm-fab" onclick="cmStartRegister()">'+
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>'+
      '커미션 만들기</button></div>'+
  '</div>';
}
// 로그인해야 만들 수 있다. 바로 등록 화면을 열면 저장 단계에서 막혀 헛수고가 되므로 먼저 안내한다.
function cmStartRegister(){
  if(!AUTH.user){toast("로그인이 필요해요","🔒");openLoginModal();return;}
  cmOpenRegister();
}
function cmSetTag(t){
  cmState.activeTag=t;
  var chipsEl=document.querySelector('.cm-chips');
  if(chipsEl)chipsEl.innerHTML=cmChipsHTML();
  var gridEl=document.getElementById('cmGrid');
  if(gridEl)gridEl.innerHTML=cmGridHTML();
}
function cmComingSoon(){toast("아직 준비 중인 기능이에요","🛠")}
// 커미션 상세의 '구독' — 새 커미션 소식을 받으려고 작가를 팔로우하는 것과 같다.
// 이미 있는 팔로우 기능을 그대로 쓰고, 버튼 표시만 여기서 맞춘다.
async function cmToggleSubscribe(authorId,nickname){
  if(!AUTH.user){toast("로그인이 필요해요","🔒");openLoginModal();return;}
  if(!authorId||authorId===AUTH.user.id)return;
  await toggleFollow(authorId,nickname);
  var b=document.getElementById("cmSubBtn");
  if(b){var on=FOLLOW.has(authorId);b.classList.toggle("on",on);b.textContent=on?"구독 중":"구독";}
}
var cmPendingChatRef=null; // {commissionId,title,conversationId} — 다음에 보낼 메시지에 커미션 참조를 붙일지
async function cmOpenChatAbout(authorId,commissionId,commissionTitle){
  await openChat(authorId);
  if(!currentConversationId||!AUTH.user)return; // openChat 자체 가드(로그인/셀프채팅)에 걸린 경우
  cmPendingChatRef={commissionId:commissionId,title:commissionTitle,conversationId:currentConversationId};
  var inputRow=document.querySelector('.chat-inputrow');
  if(inputRow){
    inputRow.insertAdjacentHTML('beforebegin','<div class="cm-chat-ref-hint" id="cmChatRefHint">🎨 다음 메시지에 <b>'+esc(commissionTitle)+'</b> 참조가 함께 전송돼요 <span onclick="cmCancelChatRef()">취소</span></div>');
  }
}
function cmCancelChatRef(){
  cmPendingChatRef=null;
  var hint=document.getElementById('cmChatRefHint');
  if(hint)hint.remove();
}
var cmApp={commissionId:null,images:[]};
async function cmApply(authorId,commissionId,commissionTitle){
  if(!AUTH.user){toast('로그인 후 신청할 수 있어요','🔒');loginWithGoogle();return;}
  if(AUTH.user.id===authorId){toast('본인 커미션은 신청할 수 없어요');return;}
  var idx=await cmEnsureCommissionInData(commissionId);
  if(idx<0){toast('커미션을 찾을 수 없어요');return;}
  cmApp={commissionId:commissionId,images:[]};
  cmRenderApplyForm(cmData[idx]);
}
function cmApplyFieldInputHTML(f){
  if(f.type==='checkbox'){
    return '<label class="cm-apply-check"><input type="checkbox" id="cmAppField_'+esc(f.id)+'" onchange="cmCheckApplySubmit()"> '+esc(f.label)+(f.required?' <span class="cm-reg-req">*</span>':'')+'</label>';
  }
  return '<div class="cm-reg-label">'+esc(f.label)+(f.required?' <span class="cm-reg-req">*</span>':'')+'</div>'+
    '<input class="cm-reg-input" id="cmAppField_'+esc(f.id)+'" oninput="cmCheckApplySubmit()">';
}
function cmApplyImgsHTML(){
  var imgsHTML=cmApp.images.map(function(url,i){
    return '<div class="cm-reg-img" style="background-image:url(\''+cmQ(url)+'\');background-size:cover;background-position:center"><div class="cm-del" onclick="cmDelApplyImg('+i+')">×</div></div>';
  }).join('');
  imgsHTML+='<div class="cm-reg-addimg" onclick="cmPickApplyImg()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/></svg><span class="cm-cnt" id="cmAppImgCnt">'+cmApp.images.length+'/5</span></div>';
  return imgsHTML;
}
function cmRenderApplyForm(commission){
  enterScreen("cmApply",function(){cmOpenCommissionById(commission.id);});
  var form=commission.form||[];
  var policyHTML=commission.policy?esc(commission.policy).replace(/\n/g,'<br>'):CM_DEFAULT_POLICY_HTML;
  document.getElementById("main").innerHTML='<div class="cm-root">'+
    '<div class="cm-sub-top"><svg onclick="screenBack()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg><b>커미션 신청서</b></div>'+
    '<div class="cm-reg">'+
      '<div class="cm-reg-label">참고 이미지 <span class="cm-reg-sub">선택 · 최대 5장</span></div>'+
      '<input type="file" id="cmAppFileInput" accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" class="hidden" onchange="cmOnApplyFileChange(event)">'+
      '<div class="cm-reg-imgs" id="cmAppImgs">'+cmApplyImgsHTML()+'</div>'+
      '<div class="cm-reg-label">추가 요청사항 <span class="cm-reg-sub">선택</span></div>'+
      '<textarea class="cm-reg-textarea" id="cmAppExtra" placeholder="원하는 스타일, 참고 사항 등을 자유롭게 적어주세요."></textarea>'+
      (form.length?('<div class="cm-reg-label">작가가 요청한 항목</div>'+form.map(cmApplyFieldInputHTML).join('<div style="height:14px"></div>')):'')+
      '<div class="cm-reg-label">거래 정책</div>'+
      '<div class="cm-apply-policy">'+policyHTML+'</div>'+
      '<label class="cm-apply-check"><input type="checkbox" id="cmAppAgree" onchange="cmCheckApplySubmit()"> 위 거래 정책에 동의하며, 혹시 분쟁이 생기면 이 내용을 기준으로 처리하는 데 동의합니다. <span class="cm-reg-req">*</span></label>'+
    '</div>'+
    '<div class="cm-reg-bottom"><button class="cm-reg-btn" id="cmAppSubmit" style="flex:1" onclick="cmSubmitApplication('+commission.id+')" disabled>신청서 제출하기</button></div>'+
  '</div>';
  window.scrollTo({top:0,behavior:'smooth'});
}
function cmPickApplyImg(){
  if(cmApp.images.length>=5){toast('최대 5장까지 올릴 수 있어요','⚠');return;}
  document.getElementById('cmAppFileInput').click();
}
function cmOnApplyFileChange(e){
  var f=e.target.files[0];
  e.target.value='';
  if(f)cmUploadApplyImg(f);
}
async function cmUploadApplyImg(file){
  if(!AUTH.user){toast('로그인 후 이용할 수 있어요','🔒');return;}
  if(ALLOWED_IMAGE_TYPES.indexOf(file.type)===-1){toast('이미지 파일만 올릴 수 있어요');return;}
  if(file.size>MAX_IMAGE_BYTES){toast('40MB 이하 이미지만 올릴 수 있어요');return;}
  if(cmApp.images.length>=5){toast('최대 5장까지 올릴 수 있어요','⚠');return;}
  var uploadBlob=file,ext=(file.name.match(/\.([^.]+)$/)||[,'png'])[1];
  if(file.type!=='image/gif'){
    toast('이미지 압축 중...');
    try{
      var compressed=await compressImage(file);
      uploadBlob=compressed.blob;ext=compressed.ext;
    }catch(err){console.error('이미지 압축 실패, 원본으로 업로드:',err);}
  }
  toast('이미지 업로드 중...');
  var appUrl=await uploadToStorage(uploadBlob,'application');
  if(!appUrl)return;
  cmApp.images.push(appUrl);
  document.getElementById('cmAppImgs').innerHTML=cmApplyImgsHTML();
  toast('이미지를 넣었어요');
}
function cmDelApplyImg(i){
  cmApp.images.splice(i,1);
  document.getElementById('cmAppImgs').innerHTML=cmApplyImgsHTML();
}
function cmCheckApplySubmit(){
  var commission=cmData.find(function(c){return c.id===cmApp.commissionId;});
  var form=commission?(commission.form||[]):[];
  var agreeEl=document.getElementById('cmAppAgree');
  var ok=agreeEl&&agreeEl.checked;
  form.forEach(function(f){
    if(!f.required)return;
    var el=document.getElementById('cmAppField_'+f.id);
    if(!el)return;
    if(f.type==='checkbox'){if(!el.checked)ok=false;}
    else{if(!el.value.trim())ok=false;}
  });
  var btn=document.getElementById('cmAppSubmit');
  if(btn)btn.disabled=!ok;
}
async function cmSubmitApplication(commissionId){
  if(!AUTH.user)return;
  var commission=cmData.find(function(c){return c.id===commissionId;});
  var form=commission?(commission.form||[]):[];
  var answers=form.map(function(f){
    var el=document.getElementById('cmAppField_'+f.id);
    var value=f.type==='checkbox'?(el?el.checked:false):(el?el.value.trim():'');
    return{field_id:f.id,label:f.label,type:f.type,value:value};
  });
  var extra=document.getElementById('cmAppExtra').value.trim();
  var payload={
    commission_id:commissionId,
    applicant_id:AUTH.user.id,
    reference_images:cmApp.images,
    extra_request:extra,
    answers:answers,
    agreed_policy_text:commission?(commission.policy||''):'',
    status:'pending'
  };
  var res=await window.supabase.from('commission_applications').insert(payload);
  if(res.error){toast('신청 실패: '+res.error.message);return;}
  track("commission_apply","신청서 제출");toast('신청서를 제출했어요! 작가의 확인을 기다려주세요','📝');
  cmOpenCommissionById(commissionId);
}
async function cmEnsureCommissionInData(commissionId){
  if(!cmDataLoaded)await cmLoadCommissions();
  var idx=cmData.findIndex(function(d){return d.id===commissionId;});
  if(idx>=0)return idx;
  var res=await window.supabase.from('commissions').select('*,commission_images(url,sort)').eq('id',commissionId).single();
  if(res.error||!res.data)return -1;
  var profRes=await window.supabase.from('profiles').select('nickname').eq('id',res.data.author_id).single();
  cmData.push(cmRowToData(res.data,profRes.data?profRes.data.nickname:null));
  return cmData.length-1;
}
async function cmOpenCommissionById(commissionId){
  track("commission_view");
  userLeftHome=true; // 부팅 딥링크(/commission/id) 시 홈 재렌더가 상세를 덮어쓰지 않게
  var idx=await cmEnsureCommissionInData(commissionId);
  if(idx<0){toast('커미션을 찾을 수 없어요(삭제되었을 수 있어요)');return;}
  enterScreen("cmDetail",cmDetailBack);
  closeDrawer();closeSheet();syncTabs("commission");
  cmDetailCtx={from:'list',idx:idx};
  document.getElementById("main").innerHTML=cmDetailHTML(cmData[idx],idx);
  _cmSetDetailUrl(cmData[idx].id);
  window.scrollTo({top:0,behavior:'smooth'});
  cmLoadWorksamples(cmData[idx].id);
}
function cmDetailHTML(d,idx){
  var artist=d.artist||'나';
  var title=d.title||'제목 없음';
  var price=d.price||'0';
  var period=d.period||'작가 설정 (예: 3~7일)';
  var desc=d.desc||'그림체 아래 샘플(팬아트, 커미션 샘플) 확인해주세요.\n\n두상: 어깨선\n흉상: 명치선 - 허리 위\n반신: 골반 - 허벅지 중간\n\n추가금 문의 편하게 주세요.';
  var descHTML=d.descHtml?sanitizePostHtml(d.descHtml):null;
  var usageHTML=d.usage?esc(d.usage).replace(/\n/g,'<br>'):'';
  var policyHTML=d.policy?('<p>'+esc(d.policy).replace(/\n/g,'<br>')+'</p>'):('<p>'+CM_DEFAULT_POLICY_HTML+'</p>');
  var tags=(d.tags&&d.tags.length)?d.tags:['두상','흉상','반신','드림'];
  var hasImages=!!(d.images&&d.images.length);
  var sliderBg=hasImages?("url('"+cmQ(d.images[0])+"') center/cover"):cmGrads[idx%cmGrads.length];
  var samples='';
  if(hasImages){
    samples=d.images.map(function(u){return '<div class="cm-s" style="background-image:url(\''+cmQ(u)+'\');background-size:cover;background-position:center"></div>';}).join('');
  }else if(d.images){
    samples='<div class="cm-s" style="background:var(--brand-soft)"></div>';
  }else{
    for(var j=0;j<6;j++)samples+='<div class="cm-s" style="background:'+cmGrads[(idx+j)%cmGrads.length]+'"></div>';
  }
  var realReviews=(d.id!=null)?cmCommissionReviews(d.id):[];
  var goodCnt=realReviews.filter(function(r){return r.commissionSentiment==='good'}).length;
  var badCnt=realReviews.filter(function(r){return r.commissionSentiment==='bad'}).length;
  var canReview=AUTH.user&&d.authorId&&AUTH.user.id!==d.authorId;
  var isOwner=AUTH.user&&d.authorId&&AUTH.user.id===d.authorId; // 이 커미션의 작가 본인
  var revBenefit=(d.reviewEventBenefit||'').trim();
  var showRevEvent=!!(d.reviewEventOn&&revBenefit); // 리뷰 이벤트 표시 여부
  var bookmarked=(d.id!=null)&&cmBookmarkIds&&cmBookmarkIds.has(d.id);
  var satisfactionHTML=realReviews.length>0
    ?('<div class="cm-verify"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>만족율 '+Math.round(goodCnt/realReviews.length*100)+'%</div>')
    :'';
  var channel=d.channel||(artist==='나'?'내 커미션':(artist+' 커미션'));
  return '<div class="cm-root">'+
    '<div class="cm-d-top"><div class="cm-left"><svg onclick="screenBack()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></div>'+
      '<div class="cm-right">'+
        
        '<svg onclick="cmShare('+(d.id!=null?d.id:'null')+')" style="cursor:pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15V4M8 8l4-4 4 4"/><path d="M4 15v5h16v-5"/></svg>'+
        '<svg onclick="cmOpenMoreMenu('+(d.id!=null?d.id:'null')+')" style="cursor:pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>'+
      '</div></div>'+
    '<div class="cm-slider" style="background:'+sliderBg+'"><div class="cm-dots"><i class="on"></i><i></i><i></i><i></i><i></i></div></div>'+
    '<div class="cm-d-body">'+
      satisfactionHTML+
      '<div class="cm-d-title">'+esc(title)+(showRevEvent?' <span class="cm-revevent-tag">🎁 리뷰 이벤트 중</span>':'')+'</div>'+
      (d.hidePrice?'':'<div class="cm-d-price">'+esc(price)+'원</div>')+
      '<div class="cm-artist-row" onclick="'+(d.authorId?('cmOpenAuthorProfile(\''+cmQ(d.authorId)+'\')'):('cmOpenArtistProfile(\''+cmQ(artist)+'\')'))+'">'+
        '<div class="cm-l"><div class="cm-ava"></div><div><span class="cm-nm">'+esc(artist)+'</span> <span class="cm-rv">'+realReviews.length+'개 후기</span></div></div>'+
        '<div class="cm-r"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 2l4 4-4 4M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 0 1-4 4H3"/></svg>0</span>'+
        '<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/></svg>'+(d.views||0)+'</span></div>'+
      '</div>'+
      '<div class="cm-stats"><div class="cm-stat"><span class="cm-k">신청 가능</span><span class="cm-v">'+esc(d.slots||'8')+'개 남음</span></div>'+
        '<div class="cm-stat"><span class="cm-k">작업 기간</span><span class="cm-v">'+esc(period)+'</span></div></div>'+
      cmAdminScoreHTML(d)+
      ((isOwner&&d.id!=null)?'<div class="cm-owner-bar"><button class="cm-owner-del" onclick="cmDeleteCommission('+d.id+')">🗑 이 커미션 삭제</button></div>':'')+
      '<div class="cm-desc">'+(descHTML?descHTML:esc(desc))+'</div>'+
      (showRevEvent?('<div class="cm-revevent">'+
        '<div class="cm-revevent-h">🎁 리뷰 이벤트 진행 중</div>'+
        '<div class="cm-revevent-benefit">'+esc(revBenefit).replace(/\n/g,'<br>')+'</div>'+
        ((canReview&&d.id!=null)?'<button class="cm-revevent-cta" onclick="cmOpenWrite('+d.id+')">✍️ 후기 쓰고 혜택 받기</button>':'')+
        '<div class="cm-revevent-note">💡 이 혜택은 작가님이 직접 제공하며, commi는 중개하지 않아요.</div>'+
      '</div>'):'')+
      '<div class="cm-rv-sec"><div class="cm-rv-head"><b>커미션 후기 '+realReviews.length+'</b><span class="cm-rv-more" onclick="cmOpenReviews('+(d.id!=null?d.id:'null')+')">더보기 ></span></div>'+
        '<div class="cm-rv-summary"><div class="cm-rv-box good"><div class="cm-ic">😊</div><div class="cm-n">'+goodCnt+'</div><div class="cm-l">만족 후기</div></div>'+
          '<div class="cm-rv-box bad"><div class="cm-ic">😐</div><div class="cm-n">'+badCnt+'</div><div class="cm-l">불호 후기</div></div></div>'+
        '<div>'+(realReviews.length?reviewListHTML(realReviews.slice(0,3)):'<div class="cm-my-empty">아직 후기가 없어요.</div>')+'</div>'+
        (canReview?'<button class="cm-write-btn" style="margin-top:10px" onclick="cmOpenWrite('+d.id+')">✍️ 후기 쓰기</button>':'')+
      '</div>'+
      (d.id!=null?('<div class="cm-ws-sec"><div class="cm-rv-head"><b>최신 작업물</b>'+
        ((AUTH.user&&d.authorId&&AUTH.user.id===d.authorId)?'<span class="cm-rv-more" onclick="cmOpenWorksampleForm('+d.id+')">+ 최신 작업물 올리기</span>':'')+
        '</div><div class="cm-ws-list" id="cmWsList"><div class="cm-my-empty">불러오는 중...</div></div></div>'):'')+
      '<div class="cm-samples">'+samples+'</div>'+
      (usageHTML?('<div class="cm-acc open"><div class="cm-acc-h" onclick="this.parentElement.classList.toggle(\'open\')"><b>작업물 사용 권한</b><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 15l6-6 6 6"/></svg></div>'+
        '<div class="cm-acc-c"><p>'+usageHTML+'</p></div></div>'):'')+
      '<div class="cm-acc"><div class="cm-acc-h" onclick="this.parentElement.classList.toggle(\'open\')"><b>거래 정책 안내</b><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 15l6-6 6 6"/></svg></div>'+
        '<div class="cm-acc-c">'+policyHTML+'</div></div>'+
      '<div class="cm-d-tags">'+tags.map(function(t){return '<div class="cm-t">#'+esc(t)+'</div>';}).join('')+'</div>'+
      '<div class="cm-sub-card"><div class="cm-l"><div class="cm-ci">P</div><div><div class="cm-nm">'+esc(channel)+'</div></div></div>'+
      // 구독 = 이 작가 팔로우. 본인 커미션에는 의미가 없어 숨긴다.
      ((d.authorId&&(!AUTH.user||AUTH.user.id!==d.authorId))
        ?('<div class="cm-btn'+(FOLLOW.has(d.authorId)?' on':'')+'" id="cmSubBtn" '+
          'onclick="cmToggleSubscribe(&quot;'+cmQ(d.authorId)+'&quot;,&quot;'+cmQ(d.artist||d.author||'')+'&quot;)">'+(FOLLOW.has(d.authorId)?'구독 중':'구독')+'</div>')
        :'')+
      '</div>'+
    '</div>'+
    '<div class="cm-pad"></div>'+
    '<div class="cm-apply-bar"><div class="cm-bm'+(bookmarked?' on':'')+'"'+(d.id!=null?(' onclick="cmToggleBookmark('+d.id+',this)"'):'')+'><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12v18l-6-4-6 4z"/></svg></div>'+
      '<div class="cm-ask" onclick="'+((d.authorId&&d.id!=null)?('cmOpenChatAbout(\''+cmQ(d.authorId)+'\','+d.id+',\''+cmQ(title)+'\')'):'cmComingSoon()')+'">문의하기</div>'+
      '<div class="cm-apply" onclick="'+((d.authorId&&d.id!=null)?('cmApply(\''+cmQ(d.authorId)+'\','+d.id+',\''+cmQ(title)+'\')'):'cmComingSoon()')+'">신청하기</div></div>'+
  '</div>';
}
function cmOpenDetail(idx){
  track("commission_view");
  enterScreen("cmDetail",cmDetailBack);
  cmDetailCtx={from:'list',idx:idx};
  var d=cmData[idx];
  document.getElementById("main").innerHTML=cmDetailHTML(d,idx);
  _cmSetDetailUrl(d.id);
  window.scrollTo({top:0,behavior:"smooth"});
  cmLoadWorksamples(d.id);
  // 조회수 +1 (추천 점수의 '인기' 요소에 쓰임) — 서버에서 증가, 조작 방지 위해 딱 이 동작만 하는 RPC
  if(d&&d.id!=null&&window.supabase){d.views=(d.views||0)+1;window.supabase.rpc("increment_commission_views",{p_id:d.id}).then(function(){});}
}
function cmDetailBack(){
  if(cmDetailCtx.from==='register')cmRenderRegisterScreen();
  else openCommissionList();
}
function cmBackToDetail(){
  if(cmDetailCtx.from==='register'&&cmPreviewObj){
    document.getElementById("main").innerHTML=cmDetailHTML(cmPreviewObj,cmDetailCtx.idx);
    window.scrollTo({top:0,behavior:"smooth"});
  }else{
    cmOpenDetail(cmDetailCtx.idx);
  }
}
// 커미션 상세에서 작가(실제 회원) 프로필로 이동 — 뒤로가기 스택에 얹어(뒤로 시 커미션 상세로 복귀)
// keepStack 모드로 openUserProfile을 열어, 커미션 흐름의 단계별 뒤로가기가 끊기지 않게 함.
function cmOpenAuthorProfile(userId){
  enterScreen("cmAuthorProfile",cmBackToDetail);
  openUserProfile(userId,true);
}
function cmOpenArtistProfile(name){
  enterScreen("cmArtist",cmBackToDetail);
  document.getElementById("main").innerHTML='<div class="cm-root">'+
    '<div class="cm-pf-top"><svg onclick="screenBack()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg><b>작가 프로필</b></div>'+
    '<div class="cm-pf-head"><div class="cm-pf-ava"></div><div class="cm-pf-name">'+esc(name)+'</div><div class="cm-pf-grade">🎨 채색반</div>'+
      '<div class="cm-pf-stats"><div><div class="cm-n">'+cmReviews.length+'</div><div class="cm-l">후기</div></div>'+
        '<div><div class="cm-n">'+cmReviews.filter(function(r){return r.type==="호"}).length+'</div><div class="cm-l">만족 후기</div></div>'+
        '<div><div class="cm-n">115</div><div class="cm-l">구독자</div></div></div></div>'+
    '<div class="cm-pf-note">※ 실제로는 기존에 만든 작가 프로필 화면으로 연결됩니다.<br>(여기선 연결 예시만 표시)</div>'+
  '</div>';
  window.scrollTo({top:0,behavior:"smooth"});
}
/* ---------- 커미션 최신 작업물 (worksamples) — 커미션별 작업 결과물 쇼케이스 ---------- */
var cmWsCache={};                            // {commissionId: [worksample...]} — 상세를 재조회 없이 재사용
var cmWsForm={commissionId:null,images:[]};  // 등록 폼 상태
// 커미션 상세의 "최신 작업물" 목록을 비동기로 불러와 채움(상세 렌더 직후 호출)
async function cmLoadWorksamples(commissionId){
  var el=document.getElementById("cmWsList");
  if(!el||commissionId==null||!window.supabase)return;
  var res=await window.supabase.from("commission_worksamples")
    .select("id,title,description,work_date,created_at,commission_worksample_images(url,sort)")
    .eq("commission_id",commissionId).order("created_at",{ascending:false});
  if(res.error){el.innerHTML='<div class="cm-my-empty">최신 작업물을 불러오지 못했어요.</div>';return;}
  cmWsCache[commissionId]=res.data||[];
  if(document.getElementById("cmWsList"))document.getElementById("cmWsList").innerHTML=cmWorksampleListHTML(res.data||[],commissionId);
}
function cmWsThumb(ws){
  var imgs=(ws.commission_worksample_images||[]).slice().sort(function(a,b){return a.sort-b.sort;});
  return imgs.length?("url('"+cmQ(imgs[0].url)+"') center/cover"):cmGrads[ws.id%cmGrads.length];
}
function cmWorksampleListHTML(list,commissionId){
  if(!list.length)return '<div class="cm-my-empty">아직 올라온 작업물이 없어요.</div>';
  return '<div class="cm-ws-strip">'+list.map(function(ws){
    return '<div class="cm-ws-card" onclick="cmOpenWorksample('+ws.id+','+commissionId+')">'+
      '<div class="cm-ws-thumb" style="background:'+cmWsThumb(ws)+'"></div>'+
      '<div class="cm-ws-cap"><div class="cm-ws-t">'+esc(ws.title)+'</div>'+
        (ws.work_date?'<div class="cm-ws-dt">'+esc(ws.work_date)+'</div>':'')+'</div>'+
    '</div>';
  }).join('')+'</div>';
}
// 최신 작업물 상세 보기
function cmOpenWorksample(worksampleId,commissionId){
  enterScreen("cmWorksample",cmBackToDetail);
  var backSvg='<svg onclick="screenBack()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';
  var list=cmWsCache[commissionId]||[];
  var ws=list.find(function(x){return x.id===worksampleId;});
  var main=document.getElementById("main");
  if(!ws){main.innerHTML='<div class="cm-root"><div class="cm-sub-top">'+backSvg+'<b>최신 작업물</b></div><div class="cm-my-empty">작업물을 찾을 수 없어요.</div></div>';return;}
  var imgs=(ws.commission_worksample_images||[]).slice().sort(function(a,b){return a.sort-b.sort;});
  main.innerHTML='<div class="cm-root">'+
    '<div class="cm-sub-top">'+backSvg+'<b>최신 작업물</b></div>'+
    '<div class="cm-ws-detail">'+
      '<div class="cm-ws-d-title">'+esc(ws.title)+'</div>'+
      (ws.work_date?'<div class="cm-ws-d-date">📅 '+esc(ws.work_date)+'</div>':'')+
      '<div class="cm-ws-d-imgs">'+imgs.map(function(im){return '<img class="cm-ws-d-img" src="'+esc(im.url)+'" alt="">';}).join('')+'</div>'+
      (ws.description?'<div class="cm-ws-d-desc">'+esc(ws.description).replace(/\n/g,'<br>')+'</div>':'')+
    '</div>'+
  '</div>';
  window.scrollTo({top:0,behavior:"smooth"});
}
// 최신 작업물 올리기 폼 (그 커미션의 작가 본인만 진입 — 버튼도 본인에게만 보이고, RLS로도 서버가 막음)
// back: 뒤로/등록 후 돌아갈 화면 함수. 기본은 커미션 상세(cmBackToDetail), 등록 페이지 흐름에선 커미션 선택 화면.
function cmOpenWorksampleForm(commissionId,back){
  if(!AUTH.user){toast('로그인 후 이용할 수 있어요','🔒');loginWithGoogle();return;}
  enterScreen("cmWsForm",back||cmBackToDetail);
  cmWsForm={commissionId:commissionId,images:[]};
  document.getElementById("main").innerHTML='<div class="cm-root">'+
    '<div class="cm-sub-top"><svg onclick="screenBack()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg><b>최신 작업물 올리기</b></div>'+
    '<div class="cm-ws-tip"><b>최근에 작업한 커미션을 올리면 해당 커미션 타입의 추천 점수가 올라가요!</b><span>신청자들은 최근 작업물을 보고 평균 퀄리티를 확인할 수 있고, 커미션 등록자는 추천 순위가 올라가는 시스템이에요!</span></div>'+
    '<div class="cm-reg">'+
      '<div class="cm-reg-label">제목 <span class="cm-reg-req">*</span></div>'+
      '<input class="cm-reg-input" id="cmWsTitle" placeholder="예: LD 반신 채색 작업" oninput="cmWsCheck()">'+
      '<div class="cm-reg-label">작업 이미지 <span class="cm-reg-req">*</span> <span class="cm-reg-sub">여러 장 가능 · 최대 10장</span></div>'+
      '<input type="file" id="cmWsFileInput" accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" class="hidden" onchange="cmWsOnFileChange(event)">'+
      '<div class="cm-reg-imgs" id="cmWsImgs">'+cmWsImgsHTML()+'</div>'+
      '<div class="cm-reg-label">상세 설명 <span class="cm-reg-sub">작업 내용, 소요 기간 등 자유롭게</span></div>'+
      '<textarea class="cm-reg-textarea" id="cmWsDesc" placeholder="어떤 작업이었는지, 소요 기간, 특이사항 등을 자유롭게 적어주세요."></textarea>'+
      '<div class="cm-reg-label">작업 날짜 <span class="cm-reg-sub">선택</span></div>'+
      '<div class="cm-date-row">'+cmDateSelectsHTML()+'</div>'+
    '</div>'+
    '<div class="cm-reg-bottom"><button class="cm-reg-btn" id="cmWsSubmit" onclick="cmSubmitWorksample()" disabled>등록하기</button></div>'+
  '</div>';
  window.scrollTo({top:0,behavior:"smooth"});
}
// 커미션 등록 페이지에서 "최신 작업물 올리기"를 누르면: 내 커미션 중 어느 것에 붙일지 고르는 화면.
// 고르면 기존 등록 폼(cmOpenWorksampleForm)을 그대로 재사용하되, 뒤로는 이 선택 화면으로 돌아오게 함.
async function cmOpenWsCommissionPicker(back){
  if(!AUTH.user){toast('로그인 후 이용할 수 있어요','🔒');loginWithGoogle();return;}
  enterScreen("cmWsPicker",back||cmRenderRegisterScreen);
  document.getElementById("main").innerHTML='<div class="cm-root">'+
    '<div class="cm-sub-top"><svg onclick="screenBack()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg><b>최신 작업물을 올릴 커미션</b></div>'+
    '<div class="cm-ws-tip"><b>최근에 작업한 커미션을 올리면 해당 커미션 타입의 추천 점수가 올라가요!</b><span>신청자들은 최근 작업물을 보고 평균 퀄리티를 확인할 수 있고, 커미션 등록자는 추천 순위가 올라가는 시스템이에요!</span></div>'+
    '<div class="cm-ws-pick" id="cmWsPickList"><div class="cm-my-empty">불러오는 중...</div></div>'+
  '</div>';
  window.scrollTo({top:0,behavior:"smooth"});
  var res=await window.supabase.from('commissions').select('id,title,commission_images(url,sort)').eq('author_id',AUTH.user.id).order('created_at',{ascending:false});
  var el=document.getElementById("cmWsPickList"); if(!el)return;
  if(res.error){el.innerHTML='<div class="cm-my-empty">불러오지 못했어요: '+esc(res.error.message)+'</div>';return;}
  var list=res.data||[];
  if(!list.length){el.innerHTML='<div class="cm-my-empty">아직 등록한 커미션이 없어요.<br>먼저 커미션을 등록해주세요.</div>';return;}
  el.innerHTML=list.map(function(c){
    var imgs=(c.commission_images||[]).slice().sort(function(a,b){return a.sort-b.sort;});
    var thumb=imgs.length?("url('"+cmQ(imgs[0].url)+"') center/cover"):cmGrads[c.id%cmGrads.length];
    return '<div class="cm-ws-pick-row" onclick="cmOpenWorksampleForm('+c.id+',cmOpenWsCommissionPicker)">'+
      '<div class="cm-ws-pick-thumb" style="background:'+thumb+'"></div>'+
      '<div class="cm-ws-pick-title">'+esc(c.title||'제목 없음')+'</div>'+
      '<svg class="cm-ws-pick-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>'+
    '</div>';
  }).join('');
}
// 작업 날짜: 네이티브 date 대신 Palo 스타일 드롭다운 3개(연/월/일). y/m/d는 초기 선택값(선택).
function cmDaysInMonth(y,m){ if(!m)return 31; return new Date(y||2000,m,0).getDate(); } // 윤년 포함 그 달의 일수
function cmDateSelectsHTML(y,m,d){
  var cy=new Date().getFullYear();
  var years='<option value="">연도</option>';
  for(var yy=cy;yy>=cy-10;yy--)years+='<option value="'+yy+'"'+(y==yy?' selected':'')+'>'+yy+'년</option>';
  var months='<option value="">월</option>';
  for(var mm=1;mm<=12;mm++)months+='<option value="'+mm+'"'+(m==mm?' selected':'')+'>'+mm+'월</option>';
  var days='<option value="">일</option>';
  var dim=cmDaysInMonth(y,m);
  for(var dd=1;dd<=dim;dd++)days+='<option value="'+dd+'"'+(d==dd?' selected':'')+'>'+dd+'일</option>';
  return '<select class="cm-reg-input cm-date-sel" id="cmWsYear" onchange="cmWsSyncDays()">'+years+'</select>'+
         '<select class="cm-reg-input cm-date-sel" id="cmWsMonth" onchange="cmWsSyncDays()">'+months+'</select>'+
         '<select class="cm-reg-input cm-date-sel" id="cmWsDay">'+days+'</select>';
}
// 연/월이 바뀌면 그 달의 실제 일수로 '일' 목록을 다시 생성(2월 30일 같은 잘못된 날짜 방지)
function cmWsSyncDays(){
  var y=document.getElementById('cmWsYear').value, m=document.getElementById('cmWsMonth').value;
  var daySel=document.getElementById('cmWsDay'); if(!daySel)return;
  var cur=daySel.value, dim=cmDaysInMonth(y?+y:0,m?+m:0);
  var html='<option value="">일</option>';
  for(var dd=1;dd<=dim;dd++)html+='<option value="'+dd+'"'+(cur==dd?' selected':'')+'>'+dd+'일</option>';
  daySel.innerHTML=html;
}
function cmWsImgsHTML(){
  var h=cmWsForm.images.map(function(url,i){
    return '<div class="cm-reg-img" style="background-image:url(\''+cmQ(url)+'\');background-size:cover;background-position:center"><div class="cm-del" onclick="cmWsDelImg('+i+')">×</div></div>';
  }).join('');
  h+='<div class="cm-reg-addimg" onclick="cmWsPickImg()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/></svg><span class="cm-cnt" id="cmWsImgCnt">'+cmWsForm.images.length+'/10</span></div>';
  return h;
}
function cmWsPickImg(){if(cmWsForm.images.length>=10){toast('최대 10장까지 올릴 수 있어요','⚠');return;}document.getElementById('cmWsFileInput').click();}
function cmWsOnFileChange(e){var f=e.target.files[0];e.target.value='';if(f)cmWsUploadImg(f);}
async function cmWsUploadImg(file){
  if(!AUTH.user){toast('로그인 후 이용할 수 있어요','🔒');return;}
  if(ALLOWED_IMAGE_TYPES.indexOf(file.type)===-1){toast('이미지 파일만 올릴 수 있어요');return;}
  if(file.size>MAX_IMAGE_BYTES){toast('40MB 이하 이미지만 올릴 수 있어요');return;}
  if(cmWsForm.images.length>=10){toast('최대 10장까지 올릴 수 있어요','⚠');return;}
  var uploadBlob=file,ext=(file.name.match(/\.([^.]+)$/)||[,'png'])[1];
  if(file.type!=='image/gif'){
    toast('이미지 압축 중...');
    try{var c=await compressImage(file);uploadBlob=c.blob;ext=c.ext;}catch(err){console.error('압축 실패, 원본 업로드:',err);}
  }
  toast('이미지 업로드 중...');
  var wsUrl=await uploadToStorage(uploadBlob,'worksample');
  if(!wsUrl)return;
  cmWsForm.images.push(wsUrl);
  cmWsRenderImgs();cmWsCheck();
  toast('이미지를 넣었어요');
}
function cmWsRenderImgs(){var el=document.getElementById('cmWsImgs');if(el)el.innerHTML=cmWsImgsHTML();}
function cmWsDelImg(i){cmWsForm.images.splice(i,1);cmWsRenderImgs();cmWsCheck();}
function cmWsCheck(){
  var el=document.getElementById('cmWsTitle');var t=el?el.value.trim():'';
  var btn=document.getElementById('cmWsSubmit');if(btn)btn.disabled=!(t&&cmWsForm.images.length);
}
async function cmSubmitWorksample(){
  if(!AUTH.user){toast('로그인이 필요해요');return;}
  var title=document.getElementById('cmWsTitle').value.trim();
  var desc=document.getElementById('cmWsDesc').value.trim();
  var y=document.getElementById('cmWsYear').value,m=document.getElementById('cmWsMonth').value,dd=document.getElementById('cmWsDay').value;
  var date=(y&&m&&dd)?(y+'-'+(m<10?'0'+m:m)+'-'+(dd<10?'0'+dd:dd)):null;
  if(!title){toast('제목을 입력해주세요');return;}
  if(!cmWsForm.images.length){toast('작업 이미지를 최소 1장 올려주세요');return;}
  var btn=document.getElementById('cmWsSubmit');btn.disabled=true;btn.textContent='등록 중...';
  var ins=await window.supabase.from('commission_worksamples').insert({
    commission_id:cmWsForm.commissionId,author_id:AUTH.user.id,title:title,description:desc||null,work_date:date
  }).select('id').single();
  if(ins.error){toast('등록 실패: '+ins.error.message);btn.disabled=false;btn.textContent='등록하기';return;}
  var rows=cmWsForm.images.map(function(url,i){return {worksample_id:ins.data.id,url:url,sort:i};});
  var imgIns=await window.supabase.from('commission_worksample_images').insert(rows);
  if(imgIns.error){toast('이미지 저장 실패: '+imgIns.error.message);}
  delete cmWsCache[cmWsForm.commissionId];  // 캐시 무효화 → 상세 복귀 시 새로 로드
  toast('최신 작업물을 올렸어요','✅');
  screenBack();  // 폼 → 커미션 상세로 복귀(상세가 다시 그려지며 목록도 갱신됨)
}
function cmCommissionReviews(commissionId){
  return POSTS.filter(function(p){return p.board==='review'&&p.commissionId===commissionId;});
}
var cmReviewCommissionId=null;
function cmOpenReviews(commissionId){
  enterScreen("cmReviews",cmBackToDetail);
  cmReviewCommissionId=commissionId;
  var reviews=(commissionId!=null)?cmCommissionReviews(commissionId):[];
  var goodCnt=reviews.filter(function(r){return r.commissionSentiment==='good'}).length;
  var badCnt=reviews.filter(function(r){return r.commissionSentiment==='bad'}).length;
  var commission=(commissionId!=null)?cmData.find(function(c){return c.id===commissionId;}):null;
  var canReview=AUTH.user&&commission&&commission.authorId&&AUTH.user.id!==commission.authorId;
  document.getElementById("main").innerHTML='<div class="cm-root">'+
    '<div class="cm-sub-top"><svg onclick="screenBack()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>'+
      '<b>커미션 후기</b>'+(canReview?'<button class="cm-write-btn" onclick="cmOpenWrite('+commissionId+')">후기 쓰기</button>':'')+'</div>'+
    '<div class="cm-rv-all"><div class="cm-rv-summary">'+
      '<div class="cm-rv-box good"><div class="cm-ic">😊</div><div class="cm-n">'+goodCnt+'</div><div class="cm-l">만족 후기</div></div>'+
      '<div class="cm-rv-box bad"><div class="cm-ic">😐</div><div class="cm-n">'+badCnt+'</div><div class="cm-l">불호 후기</div></div></div>'+
      '<div>'+(reviews.length?reviewListHTML(reviews):'<div class="cm-my-empty">아직 후기가 없어요.</div>')+'</div>'+
    '</div></div>';
  window.scrollTo({top:0,behavior:"smooth"});
}
var cmWr={images:[]};
function cmWrImgsHTML(){
  var imgsHTML=cmWr.images.map(function(url,i){
    return '<div class="cm-reg-img" style="background-image:url(\''+cmQ(url)+'\');background-size:cover;background-position:center"><div class="cm-del" onclick="cmDelWrImg('+i+')">×</div></div>';
  }).join('');
  imgsHTML+='<div class="cm-reg-addimg" onclick="cmPickWrImg()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/></svg><span class="cm-cnt" id="cmWrImgCnt">'+cmWr.images.length+'/5</span></div>';
  return imgsHTML;
}
function cmPickWrImg(){
  if(cmWr.images.length>=5){toast('최대 5장까지 올릴 수 있어요','⚠');return;}
  document.getElementById('cmWrFileInput').click();
}
function cmOnWrFileChange(e){
  var f=e.target.files[0];
  e.target.value='';
  if(f)cmUploadWrImg(f);
}
async function cmUploadWrImg(file){
  if(!AUTH.user){toast('로그인 후 이용할 수 있어요','🔒');return;}
  if(ALLOWED_IMAGE_TYPES.indexOf(file.type)===-1){toast('이미지 파일만 올릴 수 있어요');return;}
  if(file.size>MAX_IMAGE_BYTES){toast('40MB 이하 이미지만 올릴 수 있어요');return;}
  if(cmWr.images.length>=5){toast('최대 5장까지 올릴 수 있어요','⚠');return;}
  var uploadBlob=file,ext=(file.name.match(/\.([^.]+)$/)||[,'png'])[1];
  if(file.type!=='image/gif'){
    toast('이미지 압축 중...');
    try{
      var compressed=await compressImage(file);
      uploadBlob=compressed.blob;ext=compressed.ext;
    }catch(err){console.error('이미지 압축 실패, 원본으로 업로드:',err);}
  }
  toast('이미지 업로드 중...');
  var rvUrl=await uploadToStorage(uploadBlob,'review');
  if(!rvUrl)return;
  cmWr.images.push(rvUrl);
  document.getElementById('cmWrImgs').innerHTML=cmWrImgsHTML();
  cmCheckWriteSubmit();
  toast('이미지를 넣었어요');
}
function cmDelWrImg(i){
  cmWr.images.splice(i,1);
  document.getElementById('cmWrImgs').innerHTML=cmWrImgsHTML();
  cmCheckWriteSubmit();
}
function cmOpenWrite(commissionId){
  if(!AUTH.user){
    toast('로그인 후 후기를 작성할 수 있어요','🔒');
    loginWithGoogle();
    return;
  }
  enterScreen("cmWrite",function(){cmOpenReviews(commissionId);});
  cmReviewCommissionId=commissionId;
  cmState.wrType=null;cmState.wrCtype=null;cmState.wrBadReason=null;
  cmWr={images:[]};
  var commission=cmData.find(function(c){return c.id===commissionId;});
  var typeOptions=(commission&&commission.tags&&commission.tags.length)?commission.tags:CM_TYPES;
  document.getElementById("main").innerHTML='<div class="cm-root">'+
    '<div class="cm-sub-top"><svg onclick="screenBack()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg><b>후기 작성</b></div>'+
    '<div class="cm-wr">'+
      '<div class="cm-wr-label">이 커미션 어떠셨나요?</div>'+
      '<div class="cm-hb">'+
        '<div class="cm-hb-btn good" id="cmHbGood" onclick="cmSelectHB(\'good\')"><div class="cm-ic">😊</div><div class="cm-t">만족 후기</div></div>'+
        '<div class="cm-hb-btn bad" id="cmHbBad" onclick="cmSelectHB(\'bad\')"><div class="cm-ic">😐</div><div class="cm-t">불호 후기</div></div>'+
      '</div>'+
      '<div class="cm-wr-label">커미션 타입 <span class="cm-wr-sub">어떤 커미션이었나요?</span></div>'+
      '<div class="cm-wr-types" id="cmWrTypes">'+typeOptions.map(function(t){return '<div class="cm-wr-type" onclick="cmSelectType(this,\''+cmQ(t)+'\')">'+esc(t)+'</div>';}).join('')+'</div>'+
      '<div class="cm-wr-label" id="cmWrReasonLabel" style="display:none">불호 이유 <span class="cm-wr-sub">해당하는 이유를 골라주세요</span></div>'+
      '<div class="cm-wr-types" id="cmWrReasons" style="display:none">'+CM_BAD_REASONS.map(function(r){return '<div class="cm-wr-type cm-wr-reason" onclick="cmSelectBadReason(this,\''+cmQ(r)+'\')">'+esc(r)+'</div>';}).join('')+'</div>'+
      '<div class="cm-wr-label">받은 커미션 사진 <span class="cm-reg-req">*</span> <span class="cm-wr-sub">필수 · 최대 5장</span></div>'+
      '<input type="file" id="cmWrFileInput" accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" class="hidden" onchange="cmOnWrFileChange(event)">'+
      '<div class="cm-reg-imgs" id="cmWrImgs">'+cmWrImgsHTML()+'</div>'+
      '<div class="cm-wr-label">후기 내용 <span class="cm-wr-sub">선택 · 한 줄도 좋아요</span></div>'+
      '<textarea class="cm-wr-text" id="cmWrText" placeholder="작가님과의 거래는 어떠셨나요? (안 쓰셔도 괜찮아요)"></textarea>'+
      '<div class="cm-wr-hint">💡 솔직하고 예의 있는 후기는 다른 분들께 큰 도움이 돼요.</div>'+
    '</div>'+
    '<div class="cm-wr-submit"><button id="cmWrSubmit" onclick="cmSubmitReview()" disabled>후기 등록하기</button></div>'+
  '</div>';
  window.scrollTo({top:0,behavior:"smooth"});
}
function cmSelectHB(v){
  cmState.wrType=v;
  document.getElementById('cmHbGood').classList.toggle('sel',v==='good');
  document.getElementById('cmHbBad').classList.toggle('sel',v==='bad');
  var showReason=v==='bad';
  document.getElementById('cmWrReasonLabel').style.display=showReason?'':'none';
  document.getElementById('cmWrReasons').style.display=showReason?'':'none';
  if(!showReason){
    cmState.wrBadReason=null;
    document.querySelectorAll('.cm-wr-reason').forEach(function(x){x.classList.remove('sel')});
  }
  cmCheckWriteSubmit();
}
function cmSelectType(el,t){
  cmState.wrCtype=t;
  document.querySelectorAll('#cmWrTypes .cm-wr-type').forEach(function(x){x.classList.remove('sel')});
  el.classList.add('sel');
  cmCheckWriteSubmit();
}
function cmSelectBadReason(el,r){
  cmState.wrBadReason=r;
  document.querySelectorAll('.cm-wr-reason').forEach(function(x){x.classList.remove('sel')});
  el.classList.add('sel');
  cmCheckWriteSubmit();
}
function cmCheckWriteSubmit(){
  var ok=cmState.wrType&&cmState.wrCtype&&(cmState.wrType!=='bad'||cmState.wrBadReason)&&cmWr.images.length>0;
  document.getElementById('cmWrSubmit').disabled=!ok;
}
async function cmSubmitReview(){
  if(!AUTH.user){toast('로그인 후 후기를 작성할 수 있어요','🔒');return;}
  if(cmReviewCommissionId==null){toast('커미션 정보를 찾을 수 없어요');return;}
  if(!cmWr.images.length){toast('후기 사진을 최소 1장 넣어주세요','📷');return;}
  var commission=cmData.find(function(c){return c.id===cmReviewCommissionId;});
  var txt=document.getElementById('cmWrText').value.trim();
  var sentiment=cmState.wrType;
  var title=sentimentTitle(sentiment);
  var saved=await window.supabase.from('posts').insert({
    author_id:AUTH.user.id,
    board:'review',
    category:null,
    title:title,
    content:txt,
    content_html:null,
    stage:null,
    reviewed_nickname:commission?commission.artist:null,
    reviewed_user_id:commission?commission.authorId:null,
    commission_post_id:null,
    commission_sentiment:sentiment,
    commission_id:cmReviewCommissionId,
    commission_ctype:cmState.wrCtype,
    commission_bad_reason:sentiment==='bad'?cmState.wrBadReason:null
  }).select().single();
  if(saved.error){toast('저장 실패: '+saved.error.message);return;}
  if(cmWr.images.length){
    var imgRows=cmWr.images.map(function(url,i){return{post_id:saved.data.id,url:url,sort:i};});
    var savedImgs=await window.supabase.from('post_images').insert(imgRows);
    if(savedImgs.error)toast('사진 저장 실패: '+savedImgs.error.message);
  }
  POSTS.unshift({id:100000+saved.data.id,dbId:saved.data.id,authorId:AUTH.user.id,board:'review',title:title,category:null,
    author:ME.nick,authorLevel:AUTH.profile?AUTH.profile.level:null,authorAvatar:AUTH.profile?AUTH.profile.avatar_url:null,
    time:'방금',createdAt:new Date().toISOString(),likes:0,_liked:false,views:0,thumb:'none',stage:null,
    images:cmWr.images.length?cmWr.images.slice():undefined,
    isManagerPick:false,pickPosition:null,pickedAt:null,adLocked:false,
    reviewedNickname:commission?commission.artist:null,reviewedUserId:commission?commission.authorId:null,commissionPostId:null,commissionSentiment:sentiment,
    commissionId:cmReviewCommissionId,commissionCtype:cmState.wrCtype,commissionBadReason:sentiment==='bad'?cmState.wrBadReason:null,
    content:txt?txt.split('\n').filter(Boolean):[],html:undefined,comments:[]});
  toast('후기가 등록되었어요! 감사합니다','😊');
  cmOpenReviews(cmReviewCommissionId);
}
function cmOpenRegister(editId){
  if(!AUTH.user){
    toast('로그인 후 커미션을 등록할 수 있어요','🔒');
    loginWithGoogle();
    return;
  }
  cmReg={images:[],tags:[],status:'open',editingId:editId||null,title:'',price:'',period:'',slots:'',desc:'',descHtml:'',usage:'',policy:'',form:[],reviewEventOn:false,reviewEventBenefit:''};
  if(editId){
    var c=cmMyList.find(function(x){return x.id===editId});
    if(c&&c.adLocked){toast('광고를 집행 중인 커미션은 수정할 수 없어요');return;}
    if(c){
      cmReg.images=c.images.slice();cmReg.tags=c.tags.slice();cmReg.status=c.status;
      cmReg.title=c.title;cmReg.price=c.price;cmReg.period=c.period;cmReg.slots=c.slots;
      cmReg.desc=c.desc;cmReg.descHtml=c.descHtml||'';cmReg.usage=c.usage||'';cmReg.policy=c.policy||'';
      cmReg.reviewEventOn=!!c.reviewEventOn;cmReg.reviewEventBenefit=c.reviewEventBenefit||'';
      cmReg.form=(c.form||[]).map(function(f){return{id:f.id,type:f.type,label:f.label,required:!!f.required};});
    }
  }
  cmRenderRegisterScreen();
}
function cmSyncReg(){
  cmReg.title=document.getElementById('cmRegTitle').value;
  cmReg.price=document.getElementById('cmRegPrice').value;
  cmReg.period=document.getElementById('cmRegPeriod').value;
  cmReg.slots=document.getElementById('cmRegSlots').value;
  var descEl=document.getElementById('cmRegDescEditor');
  if(descEl){cmReg.descHtml=sanitizePostHtml(descEl.innerHTML.trim());cmReg.desc=descEl.textContent.trim();}
  cmReg.usage=document.getElementById('cmRegUsage').value;
  cmReg.policy=document.getElementById('cmRegPolicy').value;
  var rb=document.getElementById('cmRegRevBenefit');
  if(rb)cmReg.reviewEventBenefit=rb.value;
}
function cmRenderRegisterScreen(){
  enterScreen("cmRegister",function(){if(cmReg.editingId)cmOpenMy();else openCommissionList();});
  var editing=!!cmReg.editingId;
  var imgsHTML=cmReg.images.map(function(url,i){
    return '<div class="cm-reg-img" style="background-image:url(\''+cmQ(url)+'\');background-size:cover;background-position:center"><div class="cm-del" onclick="cmDelSampleImg('+i+')">×</div></div>';
  }).join('');
  imgsHTML+='<div class="cm-reg-addimg" onclick="cmPickSampleImg()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/></svg><span class="cm-cnt" id="cmRegImgCnt">'+cmReg.images.length+'/10</span></div>';
  var tagsHTML=cmReg.tags.map(function(t){return '<div class="cm-reg-tagchip">#'+esc(t)+'<span class="cm-x" onclick="cmRemoveTag(\''+cmQ(t)+'\')">×</span></div>';}).join('');
  document.getElementById("main").innerHTML='<div class="cm-root">'+
    '<div class="cm-sub-top"><svg onclick="screenBack()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg><b>'+(editing?'커미션 수정':'커미션 등록')+'</b></div>'+
    '<div class="cm-ws-shortcut" onclick="cmOpenWsCommissionPicker()"><span>🎨 이미 등록한 커미션에 최신 작업물 올리기</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></div>'+
    '<div class="cm-reg">'+
      '<div class="cm-reg-label">샘플 이미지 <span class="cm-reg-req">*</span> <span class="cm-reg-sub">최대 10장</span></div>'+
      '<input type="file" id="cmRegFileInput" accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" class="hidden" onchange="cmOnRegFileChange(event)">'+
      '<div class="cm-reg-imgs" id="cmRegImgs">'+imgsHTML+'</div>'+
      '<div class="cm-reg-label">커미션 제목 <span class="cm-reg-req">*</span></div>'+
      '<input class="cm-reg-input" id="cmRegTitle" placeholder="예: LD 반신 채색 커미션" oninput="cmCheckReg()" value="'+esc(cmReg.title)+'">'+
      '<div class="cm-reg-label">가격 <span class="cm-reg-req">*</span></div>'+
      '<div class="cm-reg-price"><input class="cm-reg-input" id="cmRegPrice" type="number" placeholder="19000" oninput="cmCheckReg()" value="'+esc(cmReg.price)+'"><span class="cm-unit">원 ~</span></div>'+
      '<div class="cm-reg-label">커미션 태그 <span class="cm-reg-req">*</span> <span class="cm-reg-sub">최대 5개 · 검색어 노출에 사용돼요</span></div>'+
      '<input class="cm-reg-input" id="cmRegTagInput" placeholder="예: 반신, 두상, 빠른마감 (입력 후 Enter)" onkeydown="cmOnTagKey(event)">'+
      '<div class="cm-reg-taglist" id="cmRegTagList">'+tagsHTML+'</div>'+
      '<div class="cm-reg-taghint'+(cmReg.tags.length>=5?' full':'')+'" id="cmRegTagHint">'+cmReg.tags.length+'/5개</div>'+
      '<div class="cm-reg-label">접수 상태</div>'+
      '<div class="cm-reg-toggle"><div class="cm-reg-tg'+(cmReg.status==='open'?' sel':'')+'" id="cmTgOpen" onclick="cmSetStatus(\'open\')">🟢 접수중</div>'+
        '<div class="cm-reg-tg'+(cmReg.status==='close'?' sel':'')+'" id="cmTgClose" onclick="cmSetStatus(\'close\')">⛔ 마감</div></div>'+
      '<div class="cm-reg-label">작업 기간 <span class="cm-reg-sub">직접 입력</span></div>'+
      '<input class="cm-reg-input" id="cmRegPeriod" placeholder="예: 3~7일 이내" oninput="cmCheckReg()" value="'+esc(cmReg.period)+'">'+
      '<div class="cm-reg-label">신청 가능 수 <span class="cm-reg-sub">몇 명까지 받을지</span></div>'+
      '<input class="cm-reg-input" id="cmRegSlots" type="number" placeholder="예: 8" oninput="cmCheckReg()" value="'+esc(cmReg.slots)+'">'+
      '<div class="cm-reg-label">커미션 설명 <span class="cm-reg-req">*</span></div>'+
      '<div class="cm-reg-toolbar">'+
        '<button type="button" title="굵게" onmousedown="cmDescFmt(event,\'bold\')"><span style="font-weight:900">B</span></button>'+
        '<span class="cm-reg-tb-div"></span>'+
        '<div class="cm-reg-sizegroup">'+
          '<button type="button" onmousedown="event.preventDefault();cmDescSetSize(12)">작게</button>'+
          '<button type="button" onmousedown="event.preventDefault();cmDescSetSize(14.5)">보통</button>'+
          '<button type="button" onmousedown="event.preventDefault();cmDescSetSize(18)">크게</button>'+
          '<button type="button" onmousedown="event.preventDefault();cmDescSetSize(22)">아주 크게</button>'+
        '</div>'+
        '<span class="cm-reg-tb-div"></span>'+
        '<button type="button" title="이미지" onmousedown="cmDescPickImage(event)"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m4 18 5-5 4 3 3-2 4 4"/></svg></button>'+
      '</div>'+
      '<input type="file" id="cmRegDescFileInput" accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" class="hidden" onchange="cmDescOnFile(event)">'+
      '<div class="cm-reg-editor" id="cmRegDescEditor" contenteditable="true" data-ph="그림체, 작업 범위(두상/흉상/반신), 추가금 안내 등을 자유롭게 적어주세요." oninput="cmCheckReg()">'+(cmReg.descHtml||(cmReg.desc?esc(cmReg.desc).replace(/\n/g,"<br>"):''))+'</div>'+
      '<div class="cm-reg-label">작업물 사용 권한 <span class="cm-reg-sub">선택</span></div>'+
      '<textarea class="cm-reg-textarea" id="cmRegUsage" placeholder="예: 비상업적 굿즈/SNS 게시 가능, 출처 표기 부탁" oninput="cmCheckReg()">'+esc(cmReg.usage)+'</textarea>'+
      '<div class="cm-reg-label">거래 안내 / 정책 <span class="cm-reg-sub">선택</span></div>'+
      '<textarea class="cm-reg-textarea" id="cmRegPolicy" placeholder="예: 작업 시작 후 단순 변심 환불 불가, 저작권은 작가 귀속 등" oninput="cmCheckReg()">'+esc(cmReg.policy)+'</textarea>'+
      '<div class="cm-reg-label">🎁 리뷰 이벤트 <span class="cm-reg-sub">후기를 남기면 혜택을 주는 이벤트 (선택)</span></div>'+
      '<div class="cm-reg-toggle"><div class="cm-reg-tg'+(cmReg.reviewEventOn?' sel':'')+'" id="cmTgRevOn" onclick="cmSetReviewEvent(true)">🎁 진행</div>'+
        '<div class="cm-reg-tg'+(!cmReg.reviewEventOn?' sel':'')+'" id="cmTgRevOff" onclick="cmSetReviewEvent(false)">안 함</div></div>'+
      '<div id="cmRegRevWrap" style="'+(cmReg.reviewEventOn?'':'display:none')+'">'+
        '<div class="cm-reg-label">혜택 내용 <span class="cm-reg-req">*</span> <span class="cm-reg-sub">후기 작성자에게 줄 혜택</span></div>'+
        '<textarea class="cm-reg-textarea" id="cmRegRevBenefit" placeholder="예: 후기 남겨주시면 다음 커미션 10% 할인 / 추가 컷 1장 무료" oninput="cmCheckReg()">'+esc(cmReg.reviewEventBenefit)+'</textarea>'+
        '<div class="cm-reg-note">이 혜택은 작가님이 직접 제공하며, commi는 중개하지 않아요.</div>'+
      '</div>'+
      '<div class="cm-reg-label">신청서 커스텀 항목 <span class="cm-reg-sub">참고 이미지·추가 요청사항은 신청서에 기본으로 포함돼요</span></div>'+
      '<div class="cm-reg-formlist" id="cmRegFormList">'+cmFormListHTML()+'</div>'+
      '<div class="cm-reg-formadd">'+
        '<input class="cm-reg-input" id="cmFormFieldLabel" placeholder="예: 원하는 배경색">'+
        '<select class="cm-reg-input" id="cmFormFieldType"><option value="text">텍스트 입력</option><option value="checkbox">체크박스(예/아니오)</option></select>'+
        '<label class="cm-reg-formreq"><input type="checkbox" id="cmFormFieldRequired"> 필수 항목</label>'+
        '<button type="button" class="cm-reg-formaddbtn" onclick="cmAddFormField()">+ 항목 추가</button>'+
      '</div>'+
    '</div>'+
    '<div class="cm-reg-bottom"><button class="cm-prev" onclick="cmPreviewReg()">미리보기</button>'+
      '<button class="cm-reg-btn" id="cmRegSubmit" onclick="cmSubmitReg()" disabled>'+(editing?'수정 완료':'등록하기')+'</button></div>'+
  '</div>';
  window.scrollTo({top:0,behavior:"smooth"});
  cmCheckReg();
}
function cmFormListHTML(){
  if(cmReg.form.length===0)return '<div class="cm-reg-sub">아직 추가한 항목이 없어요.</div>';
  return cmReg.form.map(function(f,i){
    return '<div class="cm-reg-formitem"><span>['+(f.type==='checkbox'?'체크박스':'텍스트')+'] '+esc(f.label)+(f.required?' <b>(필수)</b>':'')+'</span>'+
      '<button type="button" onclick="cmRemoveFormField('+i+')">삭제</button></div>';
  }).join('');
}
function cmAddFormField(){
  var label=document.getElementById('cmFormFieldLabel').value.trim();
  if(!label){toast('항목 이름을 입력해주세요');return;}
  var type=document.getElementById('cmFormFieldType').value;
  var required=document.getElementById('cmFormFieldRequired').checked;
  cmReg.form.push({id:Date.now()+'-'+Math.random().toString(36).slice(2,8),type:type,label:label,required:required});
  document.getElementById('cmFormFieldLabel').value='';
  document.getElementById('cmFormFieldRequired').checked=false;
  document.getElementById('cmRegFormList').innerHTML=cmFormListHTML();
}
function cmRemoveFormField(i){
  cmReg.form.splice(i,1);
  document.getElementById('cmRegFormList').innerHTML=cmFormListHTML();
}
function cmPickSampleImg(){
  if(cmReg.images.length>=10){toast('최대 10장까지 올릴 수 있어요','⚠');return;}
  document.getElementById('cmRegFileInput').click();
}
function cmOnRegFileChange(e){
  var f=e.target.files[0];
  e.target.value='';
  if(f)cmUploadSampleImg(f);
}
async function cmUploadSampleImg(file){
  if(!AUTH.user){toast('로그인 후 이용할 수 있어요','🔒');return;}
  if(ALLOWED_IMAGE_TYPES.indexOf(file.type)===-1){toast('이미지 파일만 올릴 수 있어요');return;}
  if(file.size>MAX_IMAGE_BYTES){toast('40MB 이하 이미지만 올릴 수 있어요');return;}
  if(cmReg.images.length>=10){toast('최대 10장까지 올릴 수 있어요','⚠');return;}
  var uploadBlob=file,ext=(file.name.match(/\.([^.]+)$/)||[,'png'])[1];
  if(file.type!=='image/gif'){
    toast('이미지 압축 중...');
    try{
      var compressed=await compressImage(file);
      uploadBlob=compressed.blob;ext=compressed.ext;
    }catch(err){console.error('이미지 압축 실패, 원본으로 업로드:',err);}
  }
  toast('이미지 업로드 중...');
  var regUrl=await uploadToStorage(uploadBlob,'commission');
  if(!regUrl)return;
  cmReg.images.push(regUrl);
  cmRenderRegImgs();
  cmCheckReg();
  toast('이미지를 넣었어요');
}
function cmRenderRegImgs(){
  var wrap=document.getElementById('cmRegImgs');
  var addbtn=wrap.querySelector('.cm-reg-addimg');
  wrap.querySelectorAll('.cm-reg-img').forEach(function(x){x.remove()});
  cmReg.images.forEach(function(url,i){
    var img=document.createElement('div');
    img.className='cm-reg-img';
    img.style.backgroundImage="url('"+url.replace(/'/g,"\\'")+"')";
    img.style.backgroundSize='cover';img.style.backgroundPosition='center';
    img.innerHTML='<div class="cm-del" onclick="cmDelSampleImg('+i+')">×</div>';
    wrap.insertBefore(img,addbtn);
  });
  document.getElementById('cmRegImgCnt').textContent=cmReg.images.length+'/10';
}
function cmDelSampleImg(i){
  cmReg.images.splice(i,1);
  cmRenderRegImgs();
  cmCheckReg();
}
/* ---- 커미션 설명란 서식 툴바(굵게/글자크기/이미지) ---- */
function cmDescFmt(e,cmd){
  e.preventDefault();
  document.getElementById('cmRegDescEditor').focus();
  document.execCommand(cmd,false,null);
  cmCheckReg();
}
var cmDescSavedRange=null;
function cmDescSaveSelection(){
  var sel=window.getSelection();
  if(sel&&sel.rangeCount>0){
    var r=sel.getRangeAt(0);
    var el=document.getElementById('cmRegDescEditor');
    if(el&&el.contains(r.commonAncestorContainer))cmDescSavedRange=r.cloneRange();
  }
}
function cmDescRestoreSelection(){
  var el=document.getElementById('cmRegDescEditor');
  el.focus();
  var sel=window.getSelection();
  sel.removeAllRanges();
  if(cmDescSavedRange)sel.addRange(cmDescSavedRange);
  else{var r=document.createRange();r.selectNodeContents(el);r.collapse(false);sel.addRange(r);}
}
function cmDescSetSize(px){
  document.getElementById('cmRegDescEditor').focus();
  document.execCommand('fontSize',false,'7');
  document.querySelectorAll('#cmRegDescEditor font[size="7"]').forEach(function(f){
    var span=document.createElement('span');
    span.style.fontSize=px+'px';
    while(f.firstChild)span.appendChild(f.firstChild);
    f.parentNode.replaceChild(span,f);
  });
  cmCheckReg();
}
function cmDescPickImage(e){
  e.preventDefault();
  cmDescSaveSelection();
  document.getElementById('cmRegDescFileInput').click();
}
function cmDescOnFile(e){
  var f=e.target.files[0];
  e.target.value='';
  if(f)cmUploadDescImg(f);
}
async function cmUploadDescImg(file){
  if(!AUTH.user){toast('로그인 후 이용할 수 있어요','🔒');return;}
  if(ALLOWED_IMAGE_TYPES.indexOf(file.type)===-1){toast('이미지 파일만 올릴 수 있어요');return;}
  if(file.size>MAX_IMAGE_BYTES){toast('40MB 이하 이미지만 올릴 수 있어요');return;}
  var uploadBlob=file,ext=(file.name.match(/\.([^.]+)$/)||[,'png'])[1];
  if(file.type!=='image/gif'){
    toast('이미지 압축 중...');
    try{
      var compressed=await compressImage(file);
      uploadBlob=compressed.blob;ext=compressed.ext;
    }catch(err){console.error('이미지 압축 실패, 원본으로 업로드:',err);}
  }
  toast('이미지 업로드 중...');
  var descUrl=await uploadToStorage(uploadBlob,'cm-desc');
  if(!descUrl)return;
  cmDescRestoreSelection();
  document.execCommand('insertHTML',false,'<img src="'+esc(descUrl)+'"><br>');
  cmCheckReg();
  toast('이미지를 넣었어요');
}
function cmOnTagKey(e){
  if(e.key==='Enter'){
    e.preventDefault();
    var inp=document.getElementById('cmRegTagInput');
    var v=inp.value.trim().replace(/,/g,'');
    if(!v)return;
    if(cmReg.tags.length>=5){toast('태그는 최대 5개까지 입력할 수 있어요','⚠');return;}
    if(cmReg.tags.indexOf(v)>=0){inp.value='';return;}
    cmReg.tags.push(v);
    inp.value='';
    cmRenderTagList();
    cmCheckReg();
  }
}
function cmRemoveTag(t){
  cmReg.tags=cmReg.tags.filter(function(x){return x!==t});
  cmRenderTagList();
  cmCheckReg();
}
function cmRenderTagList(){
  document.getElementById('cmRegTagList').innerHTML=cmReg.tags.map(function(t){
    return '<div class="cm-reg-tagchip">#'+esc(t)+'<span class="cm-x" onclick="cmRemoveTag(\''+cmQ(t)+'\')">×</span></div>';
  }).join('');
  var hint=document.getElementById('cmRegTagHint');
  hint.textContent=cmReg.tags.length+'/5개';
  hint.classList.toggle('full',cmReg.tags.length>=5);
}
function cmSetStatus(v){
  cmReg.status=v;
  document.getElementById('cmTgOpen').classList.toggle('sel',v==='open');
  document.getElementById('cmTgClose').classList.toggle('sel',v==='close');
}
function cmSetReviewEvent(on){
  cmReg.reviewEventOn=!!on;
  document.getElementById('cmTgRevOn').classList.toggle('sel',cmReg.reviewEventOn);
  document.getElementById('cmTgRevOff').classList.toggle('sel',!cmReg.reviewEventOn);
  var wrap=document.getElementById('cmRegRevWrap');
  if(wrap)wrap.style.display=cmReg.reviewEventOn?'':'none';
  cmCheckReg();
}
function cmCheckReg(){
  cmSyncReg();
  var ok=cmReg.images.length>0&&
    cmReg.title.trim()&&
    cmReg.price&&
    cmReg.tags.length>0&&
    cmReg.desc.trim()&&
    (!cmReg.reviewEventOn||cmReg.reviewEventBenefit.trim()); // 리뷰 이벤트 켰으면 혜택 내용 필수
  document.getElementById('cmRegSubmit').disabled=!ok;
}
function cmPreviewReg(){
  cmSyncReg();
  var title=cmReg.title.trim()||'제목 없음';
  var price=(cmReg.price?Number(cmReg.price).toLocaleString():'0')+'원~';
  var period=cmReg.period.trim()||'작가 설정';
  var slots=cmReg.slots.trim();
  var desc=cmReg.desc.trim()||'(설명 없음)';
  var usage=cmReg.usage.trim();
  var policy=cmReg.policy.trim();
  cmPreviewObj={artist:'나',channel:'내 커미션',title:title,price:price,hidePrice:true,period:period,slots:slots,
    desc:desc,descHtml:cmReg.descHtml,usage:usage,policy:policy,tags:cmReg.tags.slice(),images:cmReg.images.slice(),likes:0,
    reviewEventOn:cmReg.reviewEventOn,reviewEventBenefit:cmReg.reviewEventBenefit.trim()};
  cmDetailCtx={from:'register',idx:0};
  document.getElementById('main').innerHTML=cmDetailHTML(cmPreviewObj,0);
  window.scrollTo({top:0,behavior:'smooth'});
}
async function cmSubmitReg(){
  cmSyncReg();
  if(!AUTH.user){toast('로그인 후 이용할 수 있어요','🔒');return;}
  var row={
    title:cmReg.title.trim(),
    price:cmReg.price,
    tags:cmReg.tags.slice(),
    status:cmReg.status,
    period:cmReg.period.trim(),
    slots:cmReg.slots,
    description:cmReg.desc.trim(),
    description_html:cmReg.descHtml||null,
    usage_rights:cmReg.usage.trim(),
    trade_policy:cmReg.policy.trim(),
    application_form:cmReg.form,
    review_event_on:!!cmReg.reviewEventOn,
    review_event_benefit:cmReg.reviewEventOn?(cmReg.reviewEventBenefit.trim()||null):null
  };
  var commissionId;
  if(cmReg.editingId){
    var upd=await window.supabase.from('commissions').update(row).eq('id',cmReg.editingId).select().single();
    if(upd.error){toast('수정 실패: '+upd.error.message);return;}
    commissionId=cmReg.editingId;
    var delImgs=await window.supabase.from('commission_images').delete().eq('commission_id',commissionId);
    if(delImgs.error)console.error(delImgs.error);
  }else{
    row.author_id=AUTH.user.id;
    var saved=await window.supabase.from('commissions').insert(row).select().single();
    if(saved.error){toast('등록 실패: '+saved.error.message);return;}
    commissionId=saved.data.id;
  }
  if(cmReg.images.length){
    var imgRows=cmReg.images.map(function(url,i){return{commission_id:commissionId,url:url,sort:i};});
    var savedImgs=await window.supabase.from('commission_images').insert(imgRows);
    if(savedImgs.error)console.error(savedImgs.error);
  }
  toast(cmReg.editingId?'커미션이 수정되었어요!':'커미션이 등록되었어요!',cmReg.editingId?'✏️':'🎨');
  cmDataLoaded=false;
  cmOpenMy();
}
function cmMyListHTML(){
  if(cmMyList.length===0)return '<div class="cm-my-empty">아직 등록한 커미션이 없어요.<br>+ 새 커미션 버튼으로 등록해보세요!</div>';
  return cmMyList.map(function(c){
    var st=c.status==='open'?'<span class="cm-my-badge open">🟢 접수중</span>':'<span class="cm-my-badge close">⛔ 마감</span>';
    var thumbStyle=c.images[0]?("background-image:url('"+esc(c.images[0])+"');background-size:cover;background-position:center"):'background:var(--brand-soft)';
    var editBtn=c.adLocked
      ?'<span class="cm-my-edit" style="opacity:.55;cursor:default" title="광고를 집행 중인 커미션은 수정할 수 없어요">🔒 수정 불가</span>'
      :'<button class="cm-my-edit" onclick="cmOpenRegister('+c.id+')">수정</button>';
    return '<div class="cm-my-item"><div class="cm-my-thumb" style="'+thumbStyle+'"></div>'+
      '<div class="cm-my-info"><div class="cm-my-title">'+esc(c.title)+'</div>'+
        '<div class="cm-my-price">'+Number(c.price).toLocaleString()+'원~</div>'+st+'</div>'+
      '<div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0">'+cmBumpBtnHTML(c)+editBtn+
        '<button class="cm-my-edit" onclick="openCreateAdForCommission('+c.id+')">📢 광고</button>'+
        '<button class="cm-my-edit cm-my-del" onclick="cmDeleteCommission('+c.id+')">🗑 삭제</button></div></div>';
  }).join('');
}
var cmMyBookmarks=[];
var cmMyApplications=[];
// 커미션 삭제(작가 본인만). 확인창 → DB 삭제(RLS가 서버에서도 본인만 허용) → 목록/상세에서 제거.
// 연결 데이터: commission_images·worksamples·applications·user_ads는 FK on delete cascade로 자동 삭제,
// 후기(posts.commission_id)·알림·메시지는 on delete set null로 남김(작가 평판 보존 — 2단계에서 스토리지 파일도 정리 예정).
/* ===== 액션 시트(더보기 메뉴) =====
   아래에서 올라오는 목록. 게시판 이동 시트(#sheet)와 별개로 두어 서로 덮어쓰지 않게 한다. */
function openActionSheet(title,items){
  var el=document.getElementById("actionSheet"),sc=document.getElementById("actionScrim");
  if(!el||!sc)return;
  document.getElementById("actionSheetTitle").textContent=title||"";
  document.getElementById("actionSheetBody").innerHTML=items.map(function(it){
    return '<button type="button" class="as-item'+(it.danger?' danger':'')+'"'+
      (it.disabled?' disabled':' onclick="'+it.onclick+'"')+'>'+
      '<span class="as-ic">'+it.icon+'</span><span class="as-label">'+esc(it.label)+
      (it.desc?'<span class="as-desc">'+esc(it.desc)+'</span>':'')+'</span></button>';
  }).join("");
  el.classList.add("open");sc.classList.add("open");document.body.style.overflow="hidden";
}
function closeActionSheet(){
  var el=document.getElementById("actionSheet"),sc=document.getElementById("actionScrim");
  if(el)el.classList.remove("open");
  if(sc)sc.classList.remove("open");
  document.body.style.overflow="";
}

/* ── 커미션 상세의 '더보기(점 3개)' ── */
// 커미션 신고는 reports.commission_id 컬럼이 있어야 한다. 아직 없는 환경에서
// 눌렀다가 실패하지 않도록, 한 번만 확인해서 메뉴에 넣을지 정한다.
var _cmReportSupported=null;
async function cmCanReportCommission(){
  if(_cmReportSupported!==null)return _cmReportSupported;
  try{
    var r=await window.supabase.from("reports").select("commission_id").limit(1);
    _cmReportSupported=!r.error;
  }catch(e){_cmReportSupported=false;}
  return _cmReportSupported;
}
async function cmOpenMoreMenu(id){
  if(id==null)return;
  var d=cmData.find(function(c){return c.id===id;})||cmDetail||{};
  var isOwner=!!(AUTH.user&&d.authorId&&AUTH.user.id===d.authorId);
  var adLocked=!!AD_LOCKED_COMMISSION_IDS[id];
  var items=[];

  if(isOwner&&CM_BUMP_READY&&d.status==='open'){
    var bumpLeft=cmBumpLeftMs(d);
    items.push({
      label:bumpLeft>0?(cmFmtLeft(bumpLeft)+" 후에 올릴 수 있어요"):"맨 위로 끌올",
      desc:bumpLeft>0?"끌올은 24시간에 한 번만 할 수 있어요":"홈·신규 목록에서 맨 위로 올라가요",
      icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>',
      onclick:"closeActionSheet();cmBumpCommission("+id+")",
      disabled:bumpLeft>0
    });
  }
  if(isOwner){
    items.push({
      label:adLocked?"수정할 수 없어요":"커미션 수정",
      desc:adLocked?"광고를 집행 중인 커미션은 수정할 수 없어요":"",
      icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
      onclick:"closeActionSheet();cmOpenRegister("+id+")",
      disabled:adLocked
    });
  }
  items.push({
    label:"링크 복사",
    icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
    onclick:"closeActionSheet();cmShare("+id+")"
  });
  if(d.authorId){
    items.push({
      label:"작가 프로필 보기",
      icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
      onclick:"closeActionSheet();openUserProfile('"+cmQ(d.authorId)+"')"
    });
  }
  if(!isOwner&&AUTH.user&&await cmCanReportCommission()){
    items.push({
      label:"신고",
      icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>',
      onclick:"closeActionSheet();reportCommission("+id+")"
    });
  }
  if(isOwner){
    items.push({
      label:"커미션 삭제",
      icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>',
      onclick:"closeActionSheet();cmDeleteCommission("+id+")",
      danger:true
    });
  }
  openActionSheet(d.title||"커미션",items);
}
function reportCommission(id){
  if(!AUTH.user){toast("로그인이 필요해요");return;}
  reportingCommissionId=id;
  document.getElementById("reportReasonInput").value="";
  _resetReportForm();
  document.getElementById("reportModal").classList.add("open");
}

async function cmDeleteCommission(id){
  if(id==null||!window.supabase)return;
  if(!(await confirmDialog("이 커미션을 삭제할까요? 삭제하면 되돌릴 수 없어요.")))return;
  // 1) 삭제 전에 이 커미션(과 그 최신 작업물)의 이미지 URL을 모아둠 — DB 삭제 후엔 조회 불가하므로 먼저.
  var urls=[];
  try{
    var imgRes=await window.supabase.from("commission_images").select("url").eq("commission_id",id);
    (imgRes.data||[]).forEach(function(r){if(r.url)urls.push(r.url);});
    var wsRes=await window.supabase.from("commission_worksamples").select("id").eq("commission_id",id);
    var wsIds=(wsRes.data||[]).map(function(w){return w.id;});
    if(wsIds.length){
      var wsImgRes=await window.supabase.from("commission_worksample_images").select("url").in("worksample_id",wsIds);
      (wsImgRes.data||[]).forEach(function(r){if(r.url)urls.push(r.url);});
    }
  }catch(e){}
  // 2) DB에서 커미션 삭제(RLS로 본인만). cascade로 이미지·작업사례·신청·광고 '기록'이 자동 삭제됨.
  var res=await window.supabase.from("commissions").delete().eq("id",id);
  if(res.error){toast("삭제 실패: "+res.error.message);return;}
  // 3) 스토리지 실제 파일 삭제(본인 uid 폴더의 파일만 — 버킷 RLS가 그렇게 허용). 실패해도 삭제 자체엔 지장 없음.
  await deleteFromStorage(urls);
  cmData=cmData.filter(function(c){return c.id!==id;});
  if(Array.isArray(cmMyList))cmMyList=cmMyList.filter(function(c){return c.id!==id;});
  if(cmWsCache)delete cmWsCache[id];
  toast("커미션을 삭제했어요","🗑");
  if(document.querySelector('#main .cm-d-top')){          // 커미션 상세를 보고 있었으면 → 목록으로 되돌아감
    screenBack();
  }else if(document.getElementById('cmMyList')){          // 내 커미션 목록이면 그 자리에서 갱신
    document.getElementById('cmMyList').innerHTML=cmMyListHTML();
  }else if(document.getElementById('cmGrid')){            // 전체 커미션 목록이면 그리드 갱신
    document.getElementById('cmGrid').innerHTML=cmGridHTML();
  }
}
async function cmOpenMy(tab){
  if(!AUTH.user){
    toast('로그인 후 내 커미션을 볼 수 있어요','🔒');
    loginWithGoogle();
    return;
  }
  enterScreen("cmMy",openCommissionList);
  var activeTab=(tab==='bookmarks')?'bookmarks':(tab==='applications')?'applications':'mine';
  var containerClass=activeTab==='bookmarks'?'cm-grid':'cm-my-list';
  document.getElementById("main").innerHTML='<div class="cm-root">'+
    '<div class="cm-sub-top"><svg onclick="screenBack()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg><b>내 커미션</b>'+
      (activeTab==='mine'?('<div class="cm-sub-actions">'+
        '<button class="cm-write-btn ghost" onclick="cmOpenWsCommissionPicker(cmOpenMy)">🎨 최신 작업물</button>'+
        '<button class="cm-write-btn" onclick="cmOpenRegister()">+ 새 커미션</button>'+
      '</div>'):'')+
    '</div>'+
    '<div class="cm-tabs" style="padding:14px 18px 0">'+
      '<div class="cm-tab'+(activeTab==='mine'?' on':'')+'" onclick="cmOpenMy(\'mine\')">내가 등록한 커미션</div>'+
      '<div class="cm-tab'+(activeTab==='applications'?' on':'')+'" onclick="cmOpenMy(\'applications\')">📝 신청 관리</div>'+
      '<div class="cm-tab'+(activeTab==='bookmarks'?' on':'')+'" onclick="cmOpenMy(\'bookmarks\')">🔖 보관함</div>'+
    '</div>'+
    (activeTab==='mine'?('<div class="cm-my-bulk"><button class="cm-open-all" onclick="cmBulkStatus(\'open\')">🟢 전체 열기</button>'+
      '<button class="cm-close-all" onclick="cmBulkStatus(\'close\')">⛔ 전체 마감</button></div>'):'')+
    '<div class="'+containerClass+'" id="cmMyList"><div class="cm-my-empty">불러오는 중...</div></div>'+
  '</div>';
  window.scrollTo({top:0,behavior:"smooth"});
  if(activeTab==='mine'){
    var res=await window.supabase.from('commissions').select('*,commission_images(url,sort)').eq('author_id',AUTH.user.id).order('created_at',{ascending:false});
    if(res.error){toast('불러오기 실패: '+res.error.message);return;}
    cmMyList=res.data.map(function(row){
      var imgs=(row.commission_images||[]).slice().sort(function(a,b){return a.sort-b.sort;}).map(function(x){return x.url;});
      return{id:row.id,title:row.title,price:row.price,tags:row.tags||[],status:row.status,period:row.period,
        slots:row.slots,desc:row.description,descHtml:row.description_html||null,usage:row.usage_rights,policy:row.trade_policy,images:imgs,
        reviewEventOn:!!row.review_event_on,reviewEventBenefit:row.review_event_benefit||'',
        form:row.application_form||[],adLocked:!!AD_LOCKED_COMMISSION_IDS[row.id],
        createdAt:row.created_at,bumpedAt:row.bumped_at||row.created_at};
    });
    var listEl=document.getElementById('cmMyList');
    if(listEl)listEl.innerHTML=cmMyListHTML();
  }else if(activeTab==='applications'){
    var ares=await window.supabase.from('commission_applications').select('*,commissions!inner(title,author_id)').eq('commissions.author_id',AUTH.user.id).order('created_at',{ascending:false});
    if(ares.error){toast('불러오기 실패: '+ares.error.message);return;}
    var applicantIds=Array.from(new Set(ares.data.map(function(r){return r.applicant_id;})));
    var aprofRes=applicantIds.length?await window.supabase.from('profiles').select('id,nickname').in('id',applicantIds):{data:[]};
    var aprofById={};(aprofRes.data||[]).forEach(function(p){aprofById[p.id]=p.nickname;});
    cmMyApplications=ares.data.map(function(row){
      return{id:row.id,commissionId:row.commission_id,commissionTitle:row.commissions?row.commissions.title:'',
        applicantId:row.applicant_id,applicantName:aprofById[row.applicant_id]||'알 수 없음',
        images:row.reference_images||[],extraRequest:row.extra_request||'',answers:row.answers||[],
        agreedPolicyText:row.agreed_policy_text||'',status:row.status,createdAt:row.created_at};
    });
    var appEl=document.getElementById('cmMyList');
    if(appEl)appEl.innerHTML=cmMyApplicationsHTML();
  }else{
    if(cmBookmarkIds===null)await cmLoadMyBookmarks();
    var bres=await window.supabase.from('commission_bookmarks').select('commission_id,commissions(*,commission_images(url,sort))').eq('user_id',AUTH.user.id).order('created_at',{ascending:false});
    if(bres.error){toast('불러오기 실패: '+bres.error.message);return;}
    var rows=(bres.data||[]).map(function(b){return b.commissions;}).filter(Boolean);
    var authorIds=Array.from(new Set(rows.map(function(r){return r.author_id;})));
    var profRes=authorIds.length?await window.supabase.from('profiles').select('id,nickname').in('id',authorIds):{data:[]};
    var profById={};(profRes.data||[]).forEach(function(p){profById[p.id]=p.nickname;});
    cmMyBookmarks=rows.map(function(row){
      var imgs=(row.commission_images||[]).slice().sort(function(a,b){return a.sort-b.sort;}).map(function(x){return x.url;});
      return{id:row.id,authorId:row.author_id,artist:profById[row.author_id]||'탈퇴한 사용자',
        title:row.title,price:row.price,status:row.status,tags:row.tags||[],images:imgs,likes:0};
    });
    cmMyBookmarks.forEach(function(bm){
      if(!cmData.some(function(d){return d.id===bm.id;}))cmData.push(bm);
    });
    var bmEl=document.getElementById('cmMyList');
    if(bmEl){
      if(cmMyBookmarks.length===0)bmEl.innerHTML='<div class="cm-my-empty">아직 저장한 커미션이 없어요.<br>마음에 드는 커미션을 북마크해보세요!</div>';
      else bmEl.innerHTML=cmMyBookmarks.map(function(bm){
        var idx=cmData.findIndex(function(d){return d.id===bm.id;});
        return cmCardHTML(bm,idx);
      }).join('');
    }
  }
}
function cmMyApplicationsHTML(){
  if(cmMyApplications.length===0)return '<div class="cm-my-empty">아직 들어온 신청이 없어요.</div>';
  return cmMyApplications.map(function(a){
    var statusLabel=a.status==='pending'?'<span class="cm-my-badge open">⏳ 대기중</span>':a.status==='accepted'?'<span class="cm-my-badge open">✅ 수락됨</span>':'<span class="cm-my-badge close">❌ 거절됨</span>';
    var answersHTML=a.answers.length?a.answers.map(function(ans){
      return '<div class="cm-app-answer"><b>'+esc(ans.label)+'</b> '+(ans.type==='checkbox'?(ans.value?'✅ 예':'❌ 아니오'):esc(ans.value||'(미입력)'))+'</div>';
    }).join(''):'';
    var imagesHTML=a.images.length?('<div class="cm-app-refimgs">'+a.images.map(function(u){return '<img src="'+esc(u)+'" alt="">';}).join('')+'</div>'):'';
    var actionsHTML=a.status==='pending'?('<div class="cm-app-actions"><button class="cm-open-all" onclick="cmDecideApplication('+a.id+',\'accepted\')">✅ 수락</button>'+
      '<button class="cm-close-all" onclick="cmDecideApplication('+a.id+',\'rejected\')">❌ 거절</button></div>'):'';
    return '<div class="cm-app-card">'+
      '<div class="cm-app-head"><b>'+esc(a.commissionTitle)+'</b>'+statusLabel+'</div>'+
      '<div class="cm-app-applicant">신청자: '+esc(a.applicantName)+'</div>'+
      (a.extraRequest?('<div class="cm-app-answer"><b>추가 요청사항</b> '+esc(a.extraRequest)+'</div>'):'')+
      answersHTML+imagesHTML+
      actionsHTML+
    '</div>';
  }).join('');
}
async function cmDecideApplication(applicationId,status){
  var app=cmMyApplications.find(function(x){return x.id===applicationId;});
  if(!app)return;
  var upd=await window.supabase.from('commission_applications').update({status:status,decided_at:new Date().toISOString()}).eq('id',applicationId);
  if(upd.error){toast('처리 실패: '+upd.error.message);return;}
  app.status=status;
  var listEl=document.getElementById('cmMyList');
  if(listEl)listEl.innerHTML=cmMyApplicationsHTML();
  if(status==='accepted'){
    toast('신청을 수락했어요. 채팅으로 연결할게요','✅');
    await cmOpenChatAbout(app.applicantId,app.commissionId,app.commissionTitle);
    var acceptInp=document.getElementById('chatInput');
    if(acceptInp){
      var myNick=AUTH.profile?AUTH.profile.nickname:ME.nick;
      acceptInp.value=myNick+'님이 커미션 신청을 수락했어요';
      await sendChatMessage();
    }
  }else{
    toast('신청을 거절했어요');
  }
}
async function cmBulkStatus(status){
  if(!AUTH.user)return;
  if(cmMyList.length===0){toast('등록된 커미션이 없어요','⚠');return;}
  var upd=await window.supabase.from('commissions').update({status:status}).eq('author_id',AUTH.user.id);
  if(upd.error){toast('처리 실패: '+upd.error.message);return;}
  cmMyList.forEach(function(c){c.status=status;});
  document.getElementById('cmMyList').innerHTML=cmMyListHTML();
  cmDataLoaded=false;
  toast(status==='open'?'커미션을 모두 열었어요':'커미션을 모두 마감했어요',status==='open'?'🟢':'⛔');
}
function cmSyncTabbarHeight(){
  var tb=document.querySelector('.tabbar');
  var h=(tb&&getComputedStyle(tb).display!=="none")?tb.getBoundingClientRect().height:0;
  document.documentElement.style.setProperty('--cm-tabbar-h',h+'px');
}
new MutationObserver(function(){
  document.body.classList.toggle('cm-page',!!document.querySelector('#main>.cm-root'));
  cmSyncTabbarHeight();
}).observe(document.body,{childList:true,subtree:true});
window.addEventListener('resize',cmSyncTabbarHeight);
cmSyncTabbarHeight();
function tagFilterBarHTML(){
  var tags=TAGS_BY_BOARD[state.board];
  if(!tags||state.query)return"";
  var h='<div class="tagbar">';
  h+='<button class="tagbar-btn'+(!state.tag?' on':'')+'" onclick="toggleTagFilter(null)">전체</button>';
  tags.forEach(function(t){
    h+='<button class="tagbar-btn'+(state.tag===t?' on':'')+'" onclick="toggleTagFilter(\''+esc(t)+'\')">'+esc(t)+'</button>';
  });
  return h+'</div>';
}
function toggleTagFilter(tag,e){
  if(e)e.stopPropagation();
  state.tag=(tag===null?null:(state.tag===tag?null:tag));
  page=1;renderList();
  window.scrollTo({top:0,behavior:"smooth"});
}
function setSort(s){state.sort=s;page=1;renderList()}
function setViewMode(m){state.viewMode=m;page=1;renderList()}
function toggleViewMode(){setViewMode(state.viewMode==="album"?"list":"album");}

/* ===== 목록 화면 상단 영역 =====
   게시판 탭(맨 위) → 같은 줄에 말머리(왼쪽) + 정렬 드롭다운·보기 토글(오른쪽).
   제목은 표시하지 않음(게시판 탭에서 현재 게시판이 강조되므로 중복). */
var ICON_LIST='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
var ICON_GRID='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/></svg>';
function _sortDropdownHTML(){ // 정렬(최신/인기)을 드롭다운 하나로
  return '<select class="sort-dd" aria-label="정렬 기준" onchange="setSort(this.value)">'+
    '<option value="new"'+(state.sort==="new"?" selected":"")+'>최신</option>'+
    '<option value="hot"'+(state.sort==="hot"?" selected":"")+'>인기</option></select>';
}
function _viewToggleHTML(){ // 보기 방식을 아이콘 하나로 토글(지금 상태를 아이콘으로 표시)
  var isAlbum=state.viewMode==="album";
  return '<button class="viewtoggle" onclick="toggleViewMode()" aria-label="보기 전환" title="'+(isAlbum?"앨범형 · 누르면 목록형":"목록형 · 누르면 앨범형")+'">'+(isAlbum?ICON_GRID:ICON_LIST)+'</button>';
}
function _searchNoteHTML(sub){ return state.query?'<div class="bh-note">'+sub+'</div>':''; } // 제목이 없으므로 검색 결과 안내는 여기로
function boardHeaderHTML(sub){
  return boardTabsHTML()+
    '<div class="bh-row bh-a">'+tagFilterBarHTML()+_searchNoteHTML(sub)+
      '<div class="bh-right">'+_sortDropdownHTML()+_viewToggleHTML()+'</div></div>';
}
function postCardHTML(p){
  var c=catFor(p);
  return '<div class="post-card" onclick="openPost('+p.id+')">'+
    '<div class="post-card-img"><img src="'+esc(p.images[0])+'" alt="" loading="lazy"></div>'+
    '<div class="post-card-body">'+
      (p.isManagerPick?'<span class="pick-badge">📌 매니저 픽</span> ':'')+
      '<div class="post-card-title">'+esc(p.title)+'</div>'+
      '<div class="post-card-meta"><span class="cat '+c.cls+'">'+c.label+'</span><span class="post-card-author">'+esc(dispName(p.author))+anonIpHTML(p.ipMasked)+'</span></div>'+
      '<div class="post-card-stats"><span>👁 '+fmtViews(p.views)+'</span><span>♥ '+p.likes+'</span><span>💬 '+p.comments.length+'</span></div>'+
    '</div>'+
  '</div>';
}
function postAlbumHTML(posts){
  if(!posts.length)return"";
  return '<div class="post-album">'+posts.map(postCardHTML).join("")+'</div>';
}
function showMore(){state.shown+=6;renderList()}
function goHome(){
  // 이미 '전체 글' 홈 피드를 보고 있으면 캐시로 다시 안 그림 → refreshFeed가 새 글 있을 때만 딱 한 번,
  // 그것도 최신(새 글 포함)으로 그림. 다른 화면/게시판에서 왔으면 즉시 전환용으로 캐시를 그림.
  curTab="home";navSeq++;
  var onHomeFeed=(!userLeftHome&&state.board==="all"&&!state.query&&!state.tag);
  resetScreens();userLeftHome=false;
  selectBoard("all",onHomeFeed);
  // 홈 탭을 누르는 건 "지금 새로 보여줘"라는 명시적 요청이다.
  // force로 넘겨서 8초 쓰로틀을 건너뛰고, 새 글이 없어도 화면을 다시 그린다
  // (그래야 조회수·시간 표시 같은 것도 최신으로 바뀐다).
  refreshFeed(true);
}
// 홈 피드를 DB에서 다시 불러와 갱신. goHome이 이미 캐시로 한 번 그렸으므로, 재조회 후에는
// 내용이 실제로 바뀐 경우에만 딱 한 번 더 그림(안 바뀌면 다시 안 그려서 껌뻑임 없음).
function feedSignature(){
  return POSTS.filter(function(p){return p.dbId;})
    .map(function(p){return p.dbId+"."+p.likes+"."+(p.comments?p.comments.length:0);}).join(",");
}
async function refreshFeed(force){
  if(!window.supabase||feedRefreshing)return;
  if(!force&&Date.now()-postsLoadedAt<REFRESH_THROTTLE_MS)return; // 최근에 불러왔으면 재조회 생략(캐시 그대로 사용). 당겨서 새로고침 등은 force로 강제.
  feedRefreshing=true;
  var before=feedSignature();
  try{await loadRealPosts(true);}catch(e){} // true = loadRealPosts는 목록을 안 그림(중복 렌더 방지)
  feedRefreshing=false;
  // 홈 탭·당겨서 새로고침처럼 사용자가 직접 요청한 경우(force)는 내용이 그대로여도 다시 그린다.
  // 안 그러면 "눌러도 아무 일도 안 일어나는" 것처럼 보인다(새 글이 없으면 서명이 같아서 건너뛰므로).
  // 반대로 배경 자동 갱신은 예전대로 — 바뀐 게 있을 때만 그려서 목록이 껌뻑이지 않게 둔다.
  if(!userLeftHome&&(force||feedSignature()!==before))renderList();
}
var _searchT;
function liveSearch(v){clearTimeout(_searchT);_searchT=setTimeout(function(){doSearch(v)},180);}
function doSearch(v){state.query=v.trim();page=1;if(state.query)state.board="all";
  renderNav(document.getElementById("boardNav"));renderNav(document.getElementById("boardNavM"));renderNav(document.getElementById("boardNavS"));
  renderChips();renderList();closeDrawer();window.scrollTo({top:0,behavior:"smooth"})}
function syncTabs(id){
  document.querySelectorAll(".tab[data-tab]").forEach(function(t){
    var d=t.getAttribute("data-tab");
    t.classList.toggle("on",(id==="all"&&d==="home")||(id===d));
  });
}
/* ---------- editor ---------- */
var TAGS_BY_BOARD={
  talk:["잡담","질문","정보"],ask:["질문","시세문의"],crit:["피드백 요청"],doodle:["낙서","크로키"],
  wip:["러프","선화","채색","완성"],sketch:["러프","선화","채색"],tip:["강좌","꿀팁","자료"],challenge:["참가작"],
  collab:["협업","팀원모집"],
  vote:["투표","수요조사"],request:["모집중","모집완료","리퀘완료","후기글"],recruit:["개인용","비상업용","방송용","상업용","외주"],
  trade:["구인","구직"],used:["판매","구매"],suggest:["버그","건의","개선"]
};
var edState={board:null,tag:null,img:false,images:[]};
var editingPostId=null;
function stripTag(title,cat){
  if(cat&&title.indexOf("["+cat+"] ")===0)return title.slice(cat.length+3);
  return title;
}
function sentimentTitle(s){return s==="good"?"😊 만족 후기":"😞 불호 후기";}
function updateReviewNickField(){
  var isReview=(edState.board==="review");
  document.getElementById("edReviewNickInput").style.display=isReview?"block":"none";
  document.getElementById("wTitle").style.display=isReview?"none":"block";
  document.getElementById("edRatingRow").style.display=isReview?"flex":"none";
  document.getElementById("edContentHint").style.display=isReview?"block":"none";
  if(!isReview){
    document.getElementById("edCommissionList").style.display="none";
    document.getElementById("edCommissionList").innerHTML="";
  }
  renderCommissionSelected();
  renderEdSentiment();
}
function setEdSentiment(v){edState.sentiment=v;renderEdSentiment();}
function renderEdSentiment(){
  var btns=document.querySelectorAll("#edSentimentBtns .ed-sentiment-btn");
  btns.forEach(function(btn){
    var isGood=btn.classList.contains("good");
    btn.classList.toggle("on",edState.sentiment===(isGood?"good":"bad"));
  });
}
function searchCommissionPosts(){
  var q=document.getElementById("edReviewNickInput").value.trim();
  var list=document.getElementById("edCommissionList");
  if(!q){list.style.display="none";list.innerHTML="";return;}
  var matches=POSTS.filter(function(p){
    return p.board==="trade"&&p.category==="구직"&&p.author&&p.author.indexOf(q)>-1;
  }).slice(0,8);
  if(!matches.length){
    list.innerHTML='<div class="ed-commission-empty">일치하는 구직 글이 없어요. 닉네임을 다시 확인해주세요.</div>';
  }else{
    list.innerHTML=matches.map(function(p){
      return '<div class="ed-commission-item" onclick="selectCommissionPost('+p.id+')"><b>'+esc(p.author)+'</b> · '+esc(p.title)+'</div>';
    }).join("");
  }
  list.style.display="block";
}
function selectCommissionPost(postId){
  var p=POSTS.find(function(x){return x.id===postId});if(!p)return;
  edState.commissionPostId=p.dbId;
  edState.reviewedNick=p.author;
  edState.reviewedUserId=p.authorId||null;
  document.getElementById("edReviewNickInput").value="";
  document.getElementById("edCommissionList").style.display="none";
  document.getElementById("edCommissionList").innerHTML="";
  renderCommissionSelected();
}
function clearCommissionSelection(){
  edState.commissionPostId=null;edState.reviewedNick=null;edState.reviewedUserId=null;
  renderCommissionSelected();
}
function renderCommissionSelected(){
  var el=document.getElementById("edCommissionSelected");
  if(edState.board!=="review"||!edState.commissionPostId){el.style.display="none";el.innerHTML="";return;}
  var p=POSTS.find(function(x){return x.dbId===edState.commissionPostId});
  el.innerHTML='<span>✅ 확인됨: <b>'+esc(edState.reviewedNick||"")+'</b> · '+(p?esc(p.title):"(글 정보 없음)")+'</span><button type="button" onclick="clearCommissionSelection()">변경</button>';
  el.style.display="flex";
}
function openWrite(){
  userLeftHome=true;
  resetScreens();
  editingPostId=null;
  edState={board:(state.board!=="all")?state.board:null,tag:null,img:false,images:[],commissionPostId:null,reviewedNick:null,reviewedUserId:null,sentiment:null};
  buildBoardMenu();refreshBoardLabel();renderEdTags();
  document.getElementById("wTitle").value="";
  document.getElementById("edReviewNickInput").value="";
  updateReviewNickField();
  document.getElementById("wContent").innerHTML="";
  document.getElementById("edImages").innerHTML="";
  edState.polls={};
  document.getElementById("edCrit").checked=(edState.board==="crit");
  document.getElementById("edTitleLabel").textContent="글쓰기";
  document.getElementById("edSubmitBtn").textContent="등록";
  document.getElementById("writeModal").classList.add("open");document.body.style.overflow="hidden";
  document.getElementById("edBoardMenu").classList.remove("open");
}
function openEditPost(id){
  var p=POSTS.find(function(x){return x.id===id});if(!p)return;
  if(!p.dbId||!AUTH.user||p.authorId!==AUTH.user.id){toast("수정 권한이 없어요");return;}
  if(p.adLocked){toast("광고를 집행 중인 글은 수정할 수 없어요");return;}
  if(postEditLocked(p)){toast("다른 분의 댓글이 달려 수정할 수 없어요");return;}
  editingPostId=id;
  edState={board:p.board,tag:p.category||null,img:!!(p.images&&p.images.length),images:p.images?p.images.slice():[],commissionPostId:p.commissionPostId||null,reviewedNick:p.reviewedNickname||null,reviewedUserId:p.reviewedUserId||null,sentiment:p.commissionSentiment||null};
  buildBoardMenu();refreshBoardLabel();renderEdTags();
  document.getElementById("wTitle").value=stripTag(p.title,p.category);
  document.getElementById("edReviewNickInput").value="";
  document.getElementById("edCommissionList").style.display="none";
  updateReviewNickField();
  document.getElementById("wContent").innerHTML=p.html?sanitizePostHtml(p.html):p.content.map(function(x){return"<p>"+esc(x)+"</p>"}).join("");
  renderEdImages();
  edState.polls={}; // 수정 시엔 투표 편집 미지원(1단계) — 버튼도 숨김
  document.getElementById("edCrit").checked=(edState.board==="crit");
  document.getElementById("edTitleLabel").textContent="글 수정";
  document.getElementById("edSubmitBtn").textContent="수정 완료";
  document.getElementById("writeModal").classList.add("open");document.body.style.overflow="hidden";
  document.getElementById("edBoardMenu").classList.remove("open");
}
var commissionReviewFilter=null;
function openCommissionReviews(postId){
  commissionReviewFilter=null;
  renderCommissionReviews(postId);
}
function setCommissionReviewFilter(postId,sentiment){
  commissionReviewFilter=(sentiment===null)?null:(commissionReviewFilter===sentiment?null:sentiment);
  renderCommissionReviews(postId);
}
function renderCommissionReviews(postId){
  var p=POSTS.find(function(x){return x.id===postId});if(!p||!p.dbId)return;
  var allReviews=POSTS.filter(function(r){return r.board==="review"&&r.commissionPostId===p.dbId});
  var goodCount=allReviews.filter(function(r){return r.commissionSentiment==="good"}).length;
  var badCount=allReviews.filter(function(r){return r.commissionSentiment==="bad"}).length;
  var reviews=commissionReviewFilter?allReviews.filter(function(r){return r.commissionSentiment===commissionReviewFilter}):allReviews;
  var h='<div class="profile"><button class="d-back" onclick="openPost('+postId+')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>글로 돌아가기</button>'+
    '<div class="pf-sec">📝 '+esc(stripTag(p.title,p.category))+' 후기 ('+allReviews.length+')</div>';
  if(allReviews.length){
    h+='<div class="tagbar">'+
      '<button class="tagbar-btn'+(!commissionReviewFilter?' on':'')+'" onclick="setCommissionReviewFilter('+postId+',null)">전체 ('+allReviews.length+')</button>'+
      '<button class="tagbar-btn'+(commissionReviewFilter==="good"?' on':'')+'" onclick="setCommissionReviewFilter('+postId+',\'good\')">😊 만족 ('+goodCount+')</button>'+
      '<button class="tagbar-btn'+(commissionReviewFilter==="bad"?' on':'')+'" onclick="setCommissionReviewFilter('+postId+',\'bad\')">😞 불호 ('+badCount+')</button>'+
    '</div>';
  }
  h+=reviews.length?reviewAlbumHTML(reviews):'<div class="pf-empty">'+(commissionReviewFilter?'해당하는 후기가 없어요.':'아직 이 커미션에 대한 후기가 없어요.')+'</div>';
  h+='</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
function openReviewFor(postId){
  if(!AUTH.user){toast("로그인 후 후기를 작성할 수 있어요");return;}
  var p=POSTS.find(function(x){return x.id===postId});
  if(!p||!p.dbId){toast("글 정보를 찾을 수 없어요");return;}
  openWrite();
  pickBoard("review");
  edState.commissionPostId=p.dbId;
  edState.reviewedNick=p.author;
  edState.reviewedUserId=p.authorId||null;
  renderCommissionSelected();
}
function closeWrite(){editingPostId=null;document.getElementById("writeModal").classList.remove("open");document.body.style.overflow=""}
function buildBoardMenu(){
  var h="";
  BOARDS.forEach(function(g){
    var items=g.items.filter(function(b){return b.id!=="all"});
    if(!items.length)return;
    h+='<div class="ed-bm-g">'+g.group+'</div>';
    items.forEach(function(b){
      h+='<div class="ed-bm-a'+(edState.board===b.id?' on':'')+'" onclick="pickBoard(\''+b.id+'\')">'+
        '<span class="ed-bm-ic '+boardCls(b.id)+'">'+boardEmoji(b.id)+'</span>'+
        '<span class="ed-bm-n">'+esc(b.name)+'</span></div>';
    });
  });
  document.getElementById("edBoardMenu").innerHTML=h;
}
function toggleBoardMenu(e){e.stopPropagation();document.getElementById("edBoardMenu").classList.toggle("open")}
function pickBoard(id){
  // 미인증 계정이 성인 게시판을 고르면 여기서 막는다(DB 정책으로도 저장이 거부된다)
  if(id==="adult"&&!isAdultVerified()){openAdultGate();return;}
  if(id==="review"&&!AUTH.user){toast("로그인 후 후기를 작성할 수 있어요");return;}
  edState.board=id;edState.tag=null;buildBoardMenu();refreshBoardLabel();renderEdTags();
  document.getElementById("edBoardMenu").classList.remove("open");
  document.getElementById("edCrit").checked=(id==="crit");
  if(id!=="review"){
    document.getElementById("edReviewNickInput").value="";
    edState.commissionPostId=null;edState.reviewedNick=null;edState.reviewedUserId=null;edState.sentiment=null;
  }
  updateReviewNickField();}
var BOARD_GUIDE={
  talk:"주제 제한 없이 자유롭게 이야기 나누는 공간이에요. 가입 인사도 여기에 남겨주세요!",
  doodle:"가볍게 그린 낙서·자유 그림을 올리는 곳이에요.",
  wip:"작업 중이거나 완성한 그림을 공유해요.",
  sketch:"연습·강좌 등 그림 공부 기록을 나눠요.",
  ask:"궁금한 점이나 커미션 시세를 물어봐요.",
  vote:"투표로 의견·수요를 모으는 곳이에요.",
  crit:"내 그림에 대한 피드백(크리틱)을 요청해요.",
  collab:"함께 작업할 팀원·협업 상대를 찾아요.",
  challenge:"챌린지 주제·참가작을 공유해요.",
  tip:"유용한 자료·꿀팁·강좌를 나눠요.",
  request:"리퀘스트 글을 올려보세요! 원하는 사람들이 댓글로 캐릭터와 설명을 달아줄 거예요!",
  recruit:"커미션 작가를 구인해요. 거래는 당사자끼리 직접 진행해요.",
  used:"중고 장비를 사고팔아요. 거래 책임은 당사자에게 있어요.",
  adult:"성인 대상 게시판이에요. 청소년은 이용할 수 없어요.",
  suggest:"버그 제보·건의사항을 남겨주세요. 운영에 참고할게요.",
  ilchim:"돌려 말하지 않는 솔직한 지적을 주고받는 곳이에요. 그림에 대해서만 말하고, 사람을 깎아내리지 말아주세요.",
  review:"커미션 이용 후기를 남기는 곳이에요."
};
function refreshBoardLabel(){
  // 고른 게시판도 목록과 같은 모양(이모지+색)으로 보여줘서 무엇을 골랐는지 바로 알게 한다
  var lb=document.getElementById("edBoardLabel");
  if(edState.board){
    lb.innerHTML='<span class="ed-bm-ic '+boardCls(edState.board)+'">'+boardEmoji(edState.board)+'</span>'+
      esc(boardName(edState.board));
  }else lb.textContent="게시판 선택";
  var bg=document.getElementById("edBoardGuide");
  if(bg){
    var g=edState.board?BOARD_GUIDE[edState.board]:null;
    if(g){bg.style.display="";bg.textContent="📋 "+g;}
    else{bg.style.display="none";bg.textContent="";}
  }
  var ln=document.getElementById("edLockNotice");
  if(ln){
    if(POST_EDIT_LOCK_BOARDS.indexOf(edState.board)>=0){
      ln.style.display="";
      ln.textContent="⚠️ 다른 분의 댓글이 달리면 이 글을 수정·삭제할 수 없어요. 신중하게 작성해주세요.";
    }else{ln.style.display="none";ln.textContent="";}
  }
  var an=document.getElementById("edAcceptNotice");
  if(an){
    if(edState.board==="crit"){
      an.style.display="";
      an.textContent="💡 답변을 채택하면 그 작성자에게 포인트를 지급해요 — 광고 25점 + 활동 25점 (하루 최대 100점).";
    }else{an.style.display="none";an.textContent="";}
  }
}
function renderEdTags(){
  var el=document.getElementById("edTags");
  var tags=edState.board?TAGS_BY_BOARD[edState.board]:null;
  if(!tags){el.innerHTML="";return;}
  el.innerHTML='<span style="font-size:12.5px;font-weight:800;color:var(--muted);align-self:center;margin-right:2px">말머리</span>'+
    tags.map(function(t){return '<button class="ed-tag'+(edState.tag===t?' on':'')+'" onclick="pickTag(\''+t+'\')">'+t+'</button>'}).join("");
}
function pickTag(t){edState.tag=(edState.tag===t?null:t);renderEdTags()}
/* formatting */
function fmt(e,cmd,val){e.preventDefault();document.getElementById("wContent").focus();document.execCommand(cmd,false,val||null)}
function insertQuote(e){e.preventDefault();document.getElementById("wContent").focus();document.execCommand("formatBlock",false,"blockquote")}
var savedEditorRange=null;
function saveEditorSelection(){
  var sel=window.getSelection();
  if(sel&&sel.rangeCount>0){
    var r=sel.getRangeAt(0);
    var cEl=document.getElementById("wContent");
    if(cEl&&cEl.contains(r.commonAncestorContainer))savedEditorRange=r.cloneRange();
  }
}
function restoreEditorSelection(){
  var cEl=document.getElementById("wContent");
  cEl.focus();
  var sel=window.getSelection();
  sel.removeAllRanges();
  if(savedEditorRange){
    sel.addRange(savedEditorRange);
  }else{
    var r=document.createRange();
    r.selectNodeContents(cEl);
    r.collapse(false);
    sel.addRange(r);
  }
}
function advanceSavedSelection(){
  var sel=window.getSelection();
  if(sel&&sel.rangeCount>0)savedEditorRange=sel.getRangeAt(0).cloneRange();
}
function insertInlineMedia(url){
  restoreEditorSelection();
  document.execCommand("insertHTML",false,'<img src="'+esc(url)+'" style="max-width:100%;border-radius:10px;display:block;margin:10px 0"><br>');
  advanceSavedSelection();
}
function pickImage(e){e.preventDefault();saveEditorSelection();document.getElementById("edFile").click()}
function loadImageFromFile(file){
  return new Promise(function(resolve,reject){
    var img=new Image();
    var url=URL.createObjectURL(file);
    img.onload=function(){URL.revokeObjectURL(url);resolve(img);};
    img.onerror=function(err){URL.revokeObjectURL(url);reject(err);};
    img.src=url;
  });
}
/* ===== 파일 저장소 (Cloudflare R2) =====
   예전엔 supabase.storage에 직접 올렸다. 이제는 서버에서 짧은 수명의 서명 URL을 받아
   브라우저가 R2로 **직접** PUT 한다. 파일이 우리 서버를 거치지 않으므로
   Vercel의 요청 본문 제한(4.5MB)에 걸리지 않고, 40MB짜리 GIF도 올라간다.

   저장 경로는 서버가 정한다(클라이언트가 경로를 고르면 남의 파일을 덮어쓸 수 있다).
   성공하면 공개 주소를, 실패하면 null을 돌려주고 안내는 여기서 띄운다. */
async function uploadToStorage(blob,folder){
  if(!window.supabase){toast("업로드를 사용할 수 없어요");return null;}
  var sess=await window.supabase.auth.getSession();
  var token=sess.data.session?sess.data.session.access_token:null;
  if(!token){toast("로그인이 필요해요");return null;}
  var type=blob.type||"application/octet-stream";
  try{
    var r=await fetch("/api/storage/upload-url",{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
      body:JSON.stringify({folder:folder,contentType:type,size:blob.size})
    });
    var j=null;try{j=await r.json();}catch(e){}
    if(!r.ok||!j||!j.ok){toast("업로드 실패: "+((j&&j.message)||"잠시 후 다시 시도해주세요"));return null;}
    // 서명에 Content-Type이 포함돼 있으므로 여기서도 같은 값을 보내야 한다
    var put=await fetch(j.uploadUrl,{method:"PUT",body:blob,headers:{"Content-Type":type}});
    if(!put.ok){toast("업로드 실패: 파일을 저장하지 못했어요");return null;}
    return j.publicUrl;
  }catch(e){
    toast("업로드 실패: 네트워크를 확인해주세요");return null;
  }
}
// 커미션을 지울 때 딸린 이미지 정리. 실패해도 서비스 동작엔 지장 없으므로 조용히 넘어간다.
async function deleteFromStorage(urls){
  if(!urls||!urls.length||!window.supabase)return;
  try{
    var sess=await window.supabase.auth.getSession();
    var token=sess.data.session?sess.data.session.access_token:null;
    if(!token)return;
    await fetch("/api/storage/delete",{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
      body:JSON.stringify({urls:urls})
    });
  }catch(e){}
}

/* ===== 이모티콘 =====
   회원이 만든 이모티콘을 팩 단위로 담아 댓글에서 쓴다.
   본문에는 주소가 아니라 `[[e:12]]` 같은 **번호 토큰만** 저장하고, 그릴 때 우리 DB의
   주소로만 바꾼다. 본문에 URL을 그대로 넣게 하면 외부 이미지를 심을 수 있기 때문. */
var EMO_BY_ID={};      // 번호 → {url} — 화면에 그릴 때 쓰는 캐시
var MY_EMO_PACKS=[];   // 내 이모티콘함(담아둔 팩)
var EMO_PICKER_TARGET=null; // 이모티콘을 넣을 입력창 id
var EMO_RECENT=[];          // 최근 쓴 이모티콘 번호(최신순) — 자주 쓰는 걸 앞에 두려고
try{var _er=JSON.parse(localStorage.getItem("palo_emo_recent")||"[]");if(Array.isArray(_er))EMO_RECENT=_er;}catch(e){}
function noteEmoticonUsed(id){
  EMO_RECENT=[id].concat(EMO_RECENT.filter(function(x){return x!==id;})).slice(0,20);
  try{localStorage.setItem("palo_emo_recent",JSON.stringify(EMO_RECENT));}catch(e){}
}

function emoIdsIn(text){
  var ids=[],m,re=/\[\[e:(\d+)\]\]/g;
  while((m=re.exec(String(text||""))))ids.push(Number(m[1]));
  return ids;
}
// 아직 모르는 번호만 골라 한 번에 채운다(댓글마다 조회하지 않도록)
async function ensureEmoticons(ids){
  if(!window.supabase||!ids||!ids.length)return;
  var need=[];
  ids.forEach(function(id){if(id&&!EMO_BY_ID[id]&&need.indexOf(id)<0)need.push(id);});
  if(!need.length)return;
  try{
    var r=await window.supabase.from("emoticons").select("id,url").in("id",need);
    (r.data||[]).forEach(function(e){EMO_BY_ID[e.id]={url:e.url};});
  }catch(e){}
}
// esc()를 거친 문자열에서 토큰만 이미지로 바꾼다.
// 모르는 번호(지워진 이모티콘)는 조용히 지운다.
function withEmoticons(escapedText){
  return String(escapedText).replace(/\[\[e:(\d+)\]\]/g,function(_,id){
    var e=EMO_BY_ID[id];
    if(!e)return "";
    return '<img class="emo" src="'+esc(e.url)+'" alt="이모티콘" loading="lazy">';
  });
}

async function loadMyEmoticons(){
  MY_EMO_PACKS=[];
  if(!AUTH.user||!window.supabase)return;
  try{
    var mine=await window.supabase.from("user_emoticon_packs").select("pack_id").order("added_at",{ascending:false});
    var ids=(mine.data||[]).map(function(r){return r.pack_id;});
    if(!ids.length)return;
    var res=await Promise.all([
      window.supabase.from("emoticon_packs").select("id,title,status").in("id",ids),
      window.supabase.from("emoticons").select("id,pack_id,url,sort").in("pack_id",ids).order("sort")
    ]);
    var byId={};
    (res[0].data||[]).forEach(function(p){ if(p.status==="public")byId[p.id]={id:p.id,title:p.title,items:[]}; });
    (res[1].data||[]).forEach(function(e){
      EMO_BY_ID[e.id]={url:e.url};
      if(byId[e.pack_id])byId[e.pack_id].items.push({id:e.id,url:e.url});
    });
    MY_EMO_PACKS=ids.map(function(id){return byId[id];}).filter(Boolean); // 담은 순서 유지
  }catch(e){}
}

/* ── 피커 ── */
function openEmoticonPicker(targetInputId){
  if(!AUTH.user){toast("로그인이 필요해요");return;}
  EMO_PICKER_TARGET=targetInputId;
  var m=document.getElementById("emoPicker");if(!m)return;
  renderEmoticonPicker();
  m.classList.add("open");
}
function closeEmoticonPicker(){
  var m=document.getElementById("emoPicker");if(m)m.classList.remove("open");
  EMO_PICKER_TARGET=null;
}
var _emoTab=0;
function renderEmoticonPicker(){
  var body=document.getElementById("emoPickerBody");if(!body)return;
  if(!MY_EMO_PACKS.length){
    body.innerHTML='<div class="emo-empty">담아둔 이모티콘이 없어요.<br>'+
      '<button class="emo-go" onclick="closeEmoticonPicker();openEmoticonMarket()">이모티콘 둘러보기</button></div>';
    return;
  }
  if(_emoTab>=MY_EMO_PACKS.length)_emoTab=0;
  var tabs=MY_EMO_PACKS.map(function(p,i){
    return '<button class="emo-tab'+(i===_emoTab?' on':'')+'" onclick="_emoTab='+i+';renderEmoticonPicker()">'+esc(p.title)+'</button>';
  }).join("");
  var pack=MY_EMO_PACKS[_emoTab];
  var grid=pack.items.map(function(e){
    return '<button class="emo-cell" onclick="pickEmoticon('+e.id+')"><img src="'+esc(e.url)+'" alt="" loading="lazy"></button>';
  }).join("")||'<div class="emo-empty">이 팩은 비어 있어요.</div>';
  body.innerHTML='<div class="emo-tabs">'+tabs+'</div><div class="emo-grid">'+grid+'</div>';
}
// 입력창 커서 위치에 토큰을 넣는다
function pickEmoticon(id,target){
  noteEmoticonUsed(id);
  var inp=document.getElementById(target||EMO_PICKER_TARGET||"cmInput");
  if(!inp){closeEmoticonPicker();return;}
  var tok="[[e:"+id+"]]";
  var s=inp.selectionStart==null?inp.value.length:inp.selectionStart;
  var e=inp.selectionEnd==null?s:inp.selectionEnd;
  inp.value=inp.value.slice(0,s)+tok+inp.value.slice(e);
  var pos=s+tok.length;
  try{inp.setSelectionRange(pos,pos);}catch(err){}
  inp.focus();
  closeEmoticonPicker();
}

/* 입력칸 아래에 담아둔 이모티콘을 바로 펼쳐 둔다.
   버튼을 눌러 창을 여는 것보다 한 번 덜 누르고, 이모티콘이 있다는 걸 눈으로 알 수 있다. */
function emoStripHTML(target){
  var t=target||"cmInput";
  var owned={};
  MY_EMO_PACKS.forEach(function(p){p.items.forEach(function(e){owned[e.id]=e;});});
  // 최근 쓴 것 → 나머지 순. 매번 팩을 넘기지 않아도 자주 쓰는 게 바로 잡힌다.
  var flat=[],seen={};
  EMO_RECENT.forEach(function(id){if(owned[id]&&!seen[id]&&flat.length<14){flat.push(owned[id]);seen[id]=1;}});
  MY_EMO_PACKS.forEach(function(p){
    p.items.forEach(function(e){if(!seen[e.id]&&flat.length<14){flat.push(e);seen[e.id]=1;}});
  });
  if(!flat.length){
    return '<button type="button" class="emo-strip-go" onclick="openEmoticonMarket()">🙂 이모티콘 담으러 가기</button>';
  }
  return flat.map(function(e){
    return '<button type="button" class="emo-s" onclick="pickEmoticon('+e.id+',&quot;'+t+'&quot;)"><img src="'+esc(e.url)+'" alt="" loading="lazy"></button>';
  }).join("")+'<button type="button" class="emo-s more" onclick="openEmoticonPicker(&quot;'+t+'&quot;)" aria-label="이모티콘 전체 보기">⋯</button>';
}
// 이모티콘함이 바뀌면 열려 있는 댓글 입력줄도 갱신
function refreshEmoStrip(){
  var cm=document.querySelector(".emo-strip:not(.chat)");
  if(cm)cm.innerHTML=emoStripHTML("cmInput");
  var ch=document.getElementById("chatEmoStrip");
  if(ch)ch.innerHTML=emoStripHTML("chatInput");
}

/* ── 내 이모티콘 관리 ── */
async function openEmoticonManage(){
  if(!AUTH.user||!window.supabase){toast("로그인이 필요해요");return;}
  emoEditPackId=null;
  enterScreen("emoManage",openEmoticonMarket);
  document.getElementById("main").innerHTML='<div class="profile"><div class="pf-sec">🗂 이모티콘 관리</div><div class="pf-empty">불러오는 중…</div></div>';
  var res=await Promise.all([
    window.supabase.from("emoticon_packs").select("id,title,status,created_at").eq("author_id",AUTH.user.id).order("created_at",{ascending:false}),
    window.supabase.from("user_emoticon_packs").select("pack_id")
  ]);
  var made=res[0].data||[];
  var addedIds=(res[1].data||[]).map(function(r){return r.pack_id;});
  var madeIds=made.map(function(p){return p.id;});
  var cntRes=madeIds.length?await window.supabase.from("emoticons").select("id,pack_id").in("pack_id",madeIds):{data:[]};
  var cnt={};(cntRes.data||[]).forEach(function(e){cnt[e.pack_id]=(cnt[e.pack_id]||0)+1;});
  // 담은 팩 중 내가 만들지 않은 것(내가 만든 건 위에 이미 나옴)
  var otherIds=addedIds.filter(function(id){return madeIds.indexOf(id)<0;});
  var otherRes=otherIds.length?await window.supabase.from("emoticon_packs").select("id,title").in("id",otherIds):{data:[]};

  var h='<div class="profile">'+
    '<button class="d-back" onclick="screenBack()">← 이모티콘으로</button>'+
    '<div class="pf-sec">✏️ 내가 만든 이모티콘 ('+made.length+')</div>';
  h+= made.length ? made.map(function(p){
    return '<div class="emo-mrow"><div class="emo-mname">'+esc(p.title)+
      '<span class="emo-msub">'+(cnt[p.id]||0)+'개'+(p.status!=="public"?' · 비공개 처리됨':'')+'</span></div>'+
      '<div class="emo-macts">'+
        '<button class="d-act" onclick="openEmoticonPackEdit('+p.id+')">편집</button>'+
        '<button class="d-act" onclick="renameEmoticonPack('+p.id+',&quot;'+esc(p.title).replace(/"/g,"&quot;")+'&quot;)">이름 변경</button>'+
        '<button class="d-act" onclick="deleteEmoticonPack('+p.id+')">삭제</button>'+
      '</div></div>';
  }).join("") : '<div class="pf-empty">아직 만든 이모티콘이 없어요.</div>';

  h+='<div class="pf-sec" style="margin-top:20px">📥 담아둔 이모티콘 ('+(otherRes.data||[]).length+')</div>';
  h+= (otherRes.data||[]).length ? (otherRes.data||[]).map(function(p){
    return '<div class="emo-mrow"><div class="emo-mname">'+esc(p.title)+'</div>'+
      '<div class="emo-macts"><button class="d-act" onclick="unaddEmoticonPack('+p.id+')">빼기</button></div></div>';
  }).join("") : '<div class="pf-empty">담아둔 이모티콘이 없어요.</div>';
  h+='</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
var emoEditPackId=null; // 편집 중인 팩(파일 선택 시 이 팩에 바로 넣는다)
async function openEmoticonPackEdit(packId){
  if(!AUTH.user||!window.supabase)return;
  emoEditPackId=packId;
  enterScreen("emoPackEdit",openEmoticonManage);
  document.getElementById("main").innerHTML='<div class="profile"><div class="pf-sec">✏️ 팩 편집</div><div class="pf-empty">불러오는 중…</div></div>';
  await renderEmoticonPackEdit();
}
async function renderEmoticonPackEdit(){
  var res=await Promise.all([
    window.supabase.from("emoticon_packs").select("id,title").eq("id",emoEditPackId).single(),
    window.supabase.from("emoticons").select("id,url,sort").eq("pack_id",emoEditPackId).order("sort")
  ]);
  var pack=res[0].data,items=res[1].data||[];
  if(!pack){toast("팩을 찾을 수 없어요");screenBack();return;}
  var grid=items.map(function(e){
    return '<div class="emo-slot"><img src="'+esc(e.url)+'" alt="">'+
      '<button class="emo-del" onclick="removeEmoticonFromPack('+e.id+')">×</button></div>';
  }).join("");
  document.getElementById("main").innerHTML='<div class="profile">'+
    '<button class="d-back" onclick="screenBack()">← 관리로</button>'+
    '<div class="pf-sec">✏️ '+esc(pack.title)+'</div>'+
    '<p class="nick-hint">× 를 눌러 잘못 넣은 이모티콘을 뺄 수 있어요. 최소 1개는 남아야 합니다.</p>'+
    '<div class="emo-slots">'+grid+
      (items.length<24?'<button class="emo-slot add" onclick="document.getElementById(&quot;emoFile&quot;).click()">+</button>':'')+
    '</div>'+
    '<p class="nick-hint">현재 '+items.length+'개 / 최대 24개</p>'+
    '</div>';
}
async function removeEmoticonFromPack(emoId){
  var cnt=await window.supabase.from("emoticons").select("id").eq("pack_id",emoEditPackId);
  if((cnt.data||[]).length<=1){toast("최소 1개는 남아야 해요");return;}
  if(!(await confirmDialog("이 이모티콘을 팩에서 뺄까요?")))return;
  var row=(cnt.data||[]).find(function(x){return x.id===emoId;});
  var urlRes=await window.supabase.from("emoticons").select("url").eq("id",emoId).single();
  var r=await window.supabase.from("emoticons").delete().eq("id",emoId);
  if(r.error){toast("실패: "+r.error.message);return;}
  if(urlRes.data&&urlRes.data.url)deleteFromStorage([urlRes.data.url]); // 저장소 파일도 정리
  delete EMO_BY_ID[emoId];
  await loadMyEmoticons();refreshEmoStrip();
  toast("뺐어요");
  renderEmoticonPackEdit();
}
async function renameEmoticonPack(id,cur){
  var v=prompt("팩 이름을 입력하세요",cur||"");
  if(v==null)return;
  v=v.trim();
  if(v.length<2){toast("2자 이상 적어주세요");return;}
  var r=await window.supabase.from("emoticon_packs").update({title:v}).eq("id",id);
  if(r.error){toast("변경 실패: "+r.error.message);return;}
  toast("이름을 바꿨어요");
  await loadMyEmoticons();
  openEmoticonManage();
}
async function deleteEmoticonPack(id){
  if(!(await confirmDialog("이 이모티콘 팩을 삭제할까요? 담아간 사람들에게서도 사라지고, 이미 쓴 댓글에서는 보이지 않게 됩니다.")))return;
  // 지우기 전에 파일 주소를 모아둔다(행이 사라지면 알 수 없다)
  var urls=[];
  try{
    var u=await window.supabase.from("emoticons").select("url").eq("pack_id",id);
    urls=(u.data||[]).map(function(x){return x.url;}).filter(Boolean);
  }catch(e){}
  var r=await window.supabase.from("emoticon_packs").delete().eq("id",id);
  if(r.error){toast("삭제 실패: "+r.error.message);return;}
  if(urls.length)deleteFromStorage(urls); // 저장소에 파일만 남지 않게
  toast("삭제했어요","🗑");
  await loadMyEmoticons();refreshEmoStrip();
  openEmoticonManage();
}
async function unaddEmoticonPack(id){
  var r=await window.supabase.from("user_emoticon_packs").delete().eq("user_id",AUTH.user.id).eq("pack_id",id);
  if(r.error){toast("실패: "+r.error.message);return;}
  toast("이모티콘함에서 뺐어요");
  await loadMyEmoticons();
  openEmoticonManage();
}

/* ── 이모티콘 둘러보기 ── */
var EMO_MARKET=[]; // 공개된 팩 목록
var EMO_SORT="hot";   // hot(인기순) / new(최신순)
var EMO_QUERY="";
async function openEmoticonMarket(){
  if(!window.supabase)return;
  enterScreen("emoMarket",openProfile); // 뒤로가기가 프로필로 복귀
  document.getElementById("main").innerHTML='<div class="profile"><div class="pf-sec">🙂 이모티콘</div><div class="pf-empty">불러오는 중…</div></div>';
  await reloadEmoticonMarket();
}
async function reloadEmoticonMarket(){
  // 인기순은 점수를 계산해 둔 뷰(emoticon_pack_rank)에서 가져온다.
  // 점수 = 최근 사용 40% + 최근 담김 30% + 누적 사용 20% + 누적 담김 10% (+ 신규 보정)
  var hot=(EMO_SORT==="hot");
  var q=window.supabase.from(hot?"emoticon_pack_rank":"emoticon_packs")
    .select(hot?"id,title,author_id,created_at,saved_count,use_count,recent_saves,recent_uses,score"
               :"id,title,author_id,created_at,saved_count,use_count")
    .eq("status","public");
  if(EMO_QUERY)q=q.ilike("title","%"+EMO_QUERY+"%");
  q=hot?q.order("score",{ascending:false}).order("created_at",{ascending:false})
       :q.order("created_at",{ascending:false});
  var res=await Promise.all([
    q.limit(60),
    AUTH.user?window.supabase.from("user_emoticon_packs").select("pack_id"):Promise.resolve({data:[]})
  ]);
  // 3차 SQL을 아직 실행하지 않아 점수 뷰가 없으면, 담은 수 기준으로라도 보여준다
  if(hot&&res[0].error){
    res[0]=await window.supabase.from("emoticon_packs")
      .select("id,title,author_id,created_at,saved_count")
      .eq("status","public").order("saved_count",{ascending:false}).limit(60);
  }
  var packs=res[0].data||[];
  var mineSet={};(res[1].data||[]).forEach(function(r){mineSet[r.pack_id]=true;});
  var ids=packs.map(function(p){return p.id;});
  var itemsRes=ids.length?await window.supabase.from("emoticons").select("id,pack_id,url,sort").in("pack_id",ids).order("sort"):{data:[]};
  var byPack={};
  (itemsRes.data||[]).forEach(function(e){
    EMO_BY_ID[e.id]={url:e.url};
    (byPack[e.pack_id]=byPack[e.pack_id]||[]).push(e);
  });
  var authorIds=Array.from(new Set(packs.map(function(p){return p.author_id;}).filter(Boolean)));
  var profRes=authorIds.length?await window.supabase.from("profiles").select("id,nickname").in("id",authorIds):{data:[]};
  var nick={};(profRes.data||[]).forEach(function(p){nick[p.id]=p.nickname;});
  EMO_MARKET=packs.map(function(p){
    return {id:p.id,title:p.title,author:nick[p.author_id]||"알 수 없음",authorId:p.author_id,
      saved:p.saved_count||0,used:p.use_count||0,recentUses:p.recent_uses||0,
      items:byPack[p.id]||[],count:(byPack[p.id]||[]).length,mine:!!mineSet[p.id]};
  });
  renderEmoticonMarket();
}
function renderEmoticonMarket(){
  var isAdmin=!!(AUTH.profile&&AUTH.profile.is_admin);
  var h='<div class="profile">'+
    '<button class="d-back" onclick="screenBack()">← 내 정보로</button>'+
    '<div class="pf-sec">🙂 이모티콘</div>'+
    (AUTH.user?'<button class="pf-edit" onclick="openEmoticonStudio()">+ 내 이모티콘 만들기</button>'+
      '<button class="pf-edit" onclick="openEmoticonManage()" style="margin:8px 0 4px">🗂 내 이모티콘 관리</button>':'')+
    '<div class="emo-search">'+
      '<input id="emoSearchInput" placeholder="이모티콘 이름 검색" value="'+esc(EMO_QUERY)+'" '+
        'onkeydown="if(event.key===&quot;Enter&quot;)doEmoticonSearch()">'+
      '<button onclick="doEmoticonSearch()">검색</button>'+
      (EMO_QUERY?'<button class="clear" onclick="clearEmoticonSearch()">×</button>':'')+
    '</div>'+
    '<div class="emo-sorts">'+
      '<button class="emo-sort'+(EMO_SORT==="hot"?" on":"")+'" onclick="setEmoticonSort(&quot;hot&quot;)">🔥 인기순</button>'+
      '<button class="emo-sort'+(EMO_SORT==="new"?" on":"")+'" onclick="setEmoticonSort(&quot;new&quot;)">🆕 최신순</button>'+
    '</div>'+
    (EMO_SORT==="hot"&&!EMO_QUERY?'<p class="emo-rank-note">최근에 실제로 쓰인 이모티콘을 먼저 보여줘요</p>':'');
  if(!EMO_MARKET.length){
    h+='<div class="pf-empty">'+(EMO_QUERY?'검색 결과가 없어요.':'아직 등록된 이모티콘이 없어요.<br>처음으로 만들어보세요!')+'</div>';
  }else{
    h+=EMO_MARKET.map(function(p,i){
      // 인기순으로 볼 때, 검색 중이 아니면 상위 3개에 순위를 붙인다
      var rank=(EMO_SORT==="hot"&&!EMO_QUERY&&i<3)?'<span class="emo-rank r'+(i+1)+'">'+(i+1)+'</span>':'';
      var prev=p.items.slice(0,6).map(function(e){return '<img src="'+esc(e.url)+'" alt="" loading="lazy">';}).join("");
      return '<div class="emo-pack">'+
        '<div class="emo-pack-head">'+
          '<div class="emo-pack-info" onclick="openEmoticonPack('+p.id+')">'+rank+
            '<div><div class="emo-pack-title">'+esc(p.title)+'</div>'+
            '<div class="emo-pack-sub">'+esc(p.author)+' · '+p.count+'개 · 담음 '+p.saved+' · 사용 '+p.used+'</div></div></div>'+
          (AUTH.user?'<button class="emo-add'+(p.mine?' on':'')+'" onclick="togglePack('+p.id+')">'+(p.mine?'담음':'담기')+'</button>':'')+
        '</div>'+
        '<div class="emo-pack-prev" onclick="openEmoticonPack('+p.id+')">'+prev+'</div>'+
        '<div class="emo-pack-foot">'+
          (AUTH.user?'<button onclick="reportEmoticonPack('+p.id+')">🚩 신고</button>':'')+
          (isAdmin?'<button class="danger" onclick="adminDeleteEmoticonPack('+p.id+')">삭제</button>':'')+
        '</div></div>';
    }).join("");
  }
  h+='</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
function setEmoticonSort(v){EMO_SORT=v;reloadEmoticonMarket();}
function doEmoticonSearch(){
  var el=document.getElementById("emoSearchInput");
  EMO_QUERY=el?el.value.trim():"";
  reloadEmoticonMarket();
}
function clearEmoticonSearch(){EMO_QUERY="";reloadEmoticonMarket();}

// 팩 상세 — 미리보기 6개 말고 전부 보기
function openEmoticonPack(packId){
  var p=EMO_MARKET.find(function(x){return x.id===packId;});if(!p)return;
  enterScreen("emoPack",openEmoticonMarket);
  var grid=p.items.map(function(e){return '<div class="emo-slot"><img src="'+esc(e.url)+'" alt=""></div>';}).join("");
  var isAdmin=!!(AUTH.profile&&AUTH.profile.is_admin);
  document.getElementById("main").innerHTML='<div class="profile">'+
    '<button class="d-back" onclick="screenBack()">← 이모티콘으로</button>'+
    '<div class="pf-sec">'+esc(p.title)+'</div>'+
    '<div class="emo-pack-sub" style="margin-bottom:12px">'+
      (p.authorId?'<span style="cursor:pointer;text-decoration:underline" onclick="openUserProfile(\''+p.authorId+'\')">'+esc(p.author)+'</span>':esc(p.author))+
      ' · '+p.count+'개 · 담음 '+p.saved+' · 사용 '+p.used+'</div>'+
    (AUTH.user?'<button class="pf-edit" onclick="togglePack('+p.id+')">'+(p.mine?'이모티콘함에서 빼기':'이모티콘함에 담기')+'</button>':'')+
    '<div class="emo-slots" style="margin-top:14px">'+grid+'</div>'+
    (AUTH.user?'<div class="emo-pack-foot" style="margin-top:10px"><button onclick="reportEmoticonPack('+p.id+')">🚩 신고</button>'+
      (isAdmin?'<button class="danger" onclick="adminDeleteEmoticonPack('+p.id+')">삭제</button>':'')+'</div>':'')+
    '</div>';
  window.scrollTo({top:0,behavior:"smooth"});
}

// 신고 — 기존 신고창을 그대로 쓴다(사유를 직접 적는 방식)
function reportEmoticonPack(packId){
  if(!AUTH.user){toast("로그인이 필요해요");return;}
  reportingEmoticonPackId=packId;
  document.getElementById("reportReasonInput").value="";
  _resetReportForm();
  document.getElementById("reportModal").classList.add("open");
}
// 관리자는 신고가 없어도 바로 내릴 수 있다
async function adminDeleteEmoticonPack(packId){
  if(!(AUTH.profile&&AUTH.profile.is_admin))return;
  if(!(await confirmDialog("이 이모티콘 팩을 삭제할까요? 담아간 사람들에게서도 사라집니다.")))return;
  var r=await window.supabase.from("emoticon_packs").delete().eq("id",packId);
  if(r.error){toast("삭제 실패: "+r.error.message);return;}
  await _logModeration("delete",null,null,"이모티콘 팩 #"+packId);
  toast("이모티콘을 삭제했어요","🗑");
  await loadMyEmoticons();refreshEmoStrip();
  reloadEmoticonMarket();
}


async function togglePack(packId){
  if(!AUTH.user){toast("로그인이 필요해요");return;}
  var p=EMO_MARKET.find(function(x){return x.id===packId;});if(!p)return;
  if(p.mine){
    var d=await window.supabase.from("user_emoticon_packs").delete().eq("user_id",AUTH.user.id).eq("pack_id",packId);
    if(d.error){toast("실패: "+d.error.message);return;}
    p.mine=false;toast("이모티콘함에서 뺐어요");
  }else{
    var i=await window.supabase.from("user_emoticon_packs").insert({user_id:AUTH.user.id,pack_id:packId});
    if(i.error){toast("실패: "+i.error.message);return;}
    p.mine=true;toast("이모티콘함에 담았어요","🙂");
  }
  await loadMyEmoticons();
  refreshEmoStrip();
  renderEmoticonMarket();
}

/* ── 이모티콘 만들기 ── */
var emoStudio={title:"",images:[]};
function openEmoticonStudio(){
  if(!AUTH.user){toast("로그인이 필요해요");return;}
  emoStudio={title:"",images:[]};
  emoEditPackId=null; // 새로 만드는 중 — 파일 선택이 편집 팩으로 새지 않게
  enterScreen("emoStudio",openEmoticonMarket);
  renderEmoticonStudio();
}
function renderEmoticonStudio(){
  document.getElementById("main").innerHTML='<div class="profile">'+
    '<button class="d-back" onclick="screenBack()">← 이모티콘 목록으로</button>'+
    '<div class="pf-sec">✏️ 이모티콘 만들기</div>'+
    '<input id="emoTitle" class="nick-in" maxlength="20" placeholder="팩 이름 (예: 우리 고양이)" value="'+esc(emoStudio.title)+'" oninput="emoStudio.title=this.value">'+
    '<p class="nick-hint">투명 배경 PNG를 권장해요. 움직이는 GIF도 됩니다. 2~24개까지 넣을 수 있어요.</p>'+
    '<div class="emo-notice"><b>등록하면 모든 회원이 담아서 쓸 수 있어요.</b><br>'+
      '나만 쓰는 이모티콘으로는 만들 수 없어요. 직접 그렸거나 사용 허락을 받은 그림만 올려주세요 — '+
      '남의 그림을 올리면 저작권 침해로 삭제·제재될 수 있어요.</div>'+
    '<div class="emo-slots" id="emoSlots">'+emoSlotsHTML()+'</div>'+
    '<p class="login-hint" id="emoStudioHint"></p>'+
    '<button class="r-ok" id="emoSaveBtn" onclick="saveEmoticonPack()" style="margin-top:6px">이모티콘 등록</button>'+
    '</div>';
  window.scrollTo({top:0,behavior:"smooth"});
}
// 슬롯만 따로 그린다 — 이미지를 추가할 때 화면 전체를 다시 그리면
// 제목 입력칸이 사라지면서 입력 중이던 커서와 포커스가 날아간다.
function emoSlotsHTML(){
  var imgs=emoStudio.images.map(function(url,i){
    return '<div class="emo-slot"><img src="'+esc(url)+'" alt=""><button class="emo-del" onclick="emoRemoveImage('+i+')">×</button></div>';
  }).join("");
  return imgs+(emoStudio.images.length<24
    ? '<button class="emo-slot add" onclick="document.getElementById(&quot;emoFile&quot;).click()">+</button>' : '');
}
function renderEmoSlots(){
  var el=document.getElementById("emoSlots");
  if(el)el.innerHTML=emoSlotsHTML(); else renderEmoticonStudio();
}
function emoRemoveImage(i){emoStudio.images.splice(i,1);renderEmoSlots();}
async function onEmoticonFile(ev){
  var files=Array.from(ev.target.files||[]);ev.target.value="";
  if(!files.length)return;
  if(emoEditPackId){await addEmoticonsToPack(files);return;} // 팩 편집 중이면 그 팩에 바로 추가
  for(var i=0;i<files.length;i++){
    if(emoStudio.images.length>=24){toast("24개까지만 넣을 수 있어요");break;}
    var f=files[i];
    if(ALLOWED_IMAGE_TYPES.indexOf(f.type)===-1){toast("이미지 파일만 올릴 수 있어요");continue;}
    if(f.size>MAX_IMAGE_BYTES){toast("40MB 이하만 올릴 수 있어요");continue;}
    toast("올리는 중… ("+(i+1)+"/"+files.length+")");
    // GIF는 움직임이 깨지니 원본 그대로, 나머지는 줄여서 올린다
    var blob=f;
    if(f.type!=="image/gif"){
      try{var c=await compressImage(f);blob=c.blob;}catch(e){}
    }
    var url=await uploadToStorage(blob,"emoticon");
    if(!url)break;
    emoStudio.images.push(url);
    renderEmoSlots();
  }
  toast("이미지를 넣었어요");
}
// 이미 만든 팩에 이모티콘을 더 넣는다
async function addEmoticonsToPack(files){
  var cur=await window.supabase.from("emoticons").select("id,sort").eq("pack_id",emoEditPackId).order("sort");
  var n=(cur.data||[]).length;
  var nextSort=n?((cur.data[n-1].sort||0)+1):0;
  for(var i=0;i<files.length;i++){
    if(n>=24){toast("24개까지만 넣을 수 있어요");break;}
    var f=files[i];
    if(ALLOWED_IMAGE_TYPES.indexOf(f.type)===-1){toast("이미지 파일만 올릴 수 있어요");continue;}
    if(f.size>MAX_IMAGE_BYTES){toast("40MB 이하만 올릴 수 있어요");continue;}
    toast("올리는 중… ("+(i+1)+"/"+files.length+")");
    var blob=f;
    if(f.type!=="image/gif"){try{var c=await compressImage(f);blob=c.blob;}catch(e){}}
    var url=await uploadToStorage(blob,"emoticon");
    if(!url)break;
    var ins=await window.supabase.from("emoticons").insert({pack_id:emoEditPackId,url:url,sort:nextSort++});
    if(ins.error){toast("추가 실패: "+ins.error.message);break;}
    n++;
  }
  await loadMyEmoticons();refreshEmoStrip();
  toast("이모티콘을 추가했어요");
  renderEmoticonPackEdit();
}
async function saveEmoticonPack(){
  var hint=document.getElementById("emoStudioHint");
  var setHint=function(t){if(hint)hint.textContent=t||"";};
  var title=(emoStudio.title||"").trim();
  if(title.length<2){setHint("팩 이름을 2자 이상 적어주세요.");return;}
  if(emoStudio.images.length<2){setHint("이모티콘을 2개 이상 넣어주세요.");return;}
  if(!(await confirmDialog("‘"+title+"’ 이모티콘을 등록할까요? 등록하면 모든 회원이 담아서 쓸 수 있어요.")))return;
  var btn=document.getElementById("emoSaveBtn");
  if(btn){btn.disabled=true;btn.textContent="등록 중…";}
  var pack=await window.supabase.from("emoticon_packs")
    .insert({author_id:AUTH.user.id,title:title,cover_url:emoStudio.images[0]}).select().single();
  if(pack.error){
    setHint("등록에 실패했어요: "+pack.error.message);
    if(btn){btn.disabled=false;btn.textContent="이모티콘 등록";}
    return;
  }
  var rows=emoStudio.images.map(function(url,i){return {pack_id:pack.data.id,url:url,sort:i};});
  var ins=await window.supabase.from("emoticons").insert(rows);
  if(ins.error){
    // 이모티콘이 하나도 안 들어간 빈 팩이 남지 않게 되돌린다
    try{await window.supabase.from("emoticon_packs").delete().eq("id",pack.data.id);}catch(e){}
    setHint("등록에 실패했어요: "+ins.error.message);
    if(btn){btn.disabled=false;btn.textContent="이모티콘 등록";}
    return;
  }
  // 만든 사람은 바로 쓸 수 있게 자동으로 담아준다
  try{await window.supabase.from("user_emoticon_packs").insert({user_id:AUTH.user.id,pack_id:pack.data.id});}catch(e){}
  await loadMyEmoticons();
  toast("이모티콘을 등록했어요","🙂");
  openEmoticonMarket();
}

function canvasToBlob(canvas,type,quality){
  return new Promise(function(resolve){canvas.toBlob(resolve,type,quality);});
}
async function compressImage(file){
  var img=await loadImageFromFile(file);
  var w=img.naturalWidth,h=img.naturalHeight;
  var maxSide=1800;
  var longSide=Math.max(w,h);
  if(longSide>maxSide){
    var scale=maxSide/longSide;
    w=Math.round(w*scale);
    h=Math.round(h*scale);
  }
  var canvas=document.createElement("canvas");
  canvas.width=w;canvas.height=h;
  canvas.getContext("2d").drawImage(img,0,0,w,h);

  var quality=0.8;
  var blob=await canvasToBlob(canvas,"image/webp",quality);
  var ext="webp";
  if(!blob||blob.type!=="image/webp"){
    blob=await canvasToBlob(canvas,"image/jpeg",quality);
    ext="jpg";
  }
  return{blob:blob,ext:ext};
}
var ALLOWED_IMAGE_TYPES=["image/jpeg","image/png","image/webp","image/gif","image/bmp"];
var MAX_IMAGE_BYTES=40*1024*1024;
async function uploadAndInsertImage(f){
  if(!window.supabase){toast("이미지 업로드를 사용할 수 없어요");return;}
  if(ALLOWED_IMAGE_TYPES.indexOf(f.type)===-1){toast("이미지 파일만 올릴 수 있어요");return;}
  if(f.size>MAX_IMAGE_BYTES){toast("40MB 이하 이미지만 올릴 수 있어요");return;}
  var uploadBlob=f,ext=(f.name.match(/\.([^.]+)$/)||[,"png"])[1],skippedCompression=false;
  if(f.type==="image/gif"){
    skippedCompression=true; // GIF는 애니메이션이 깨지니 압축 없이 원본 그대로 업로드
  }else{
    toast("이미지 압축 중...");
    try{
      var compressed=await compressImage(f);
      uploadBlob=compressed.blob;ext=compressed.ext;
      console.log("[이미지 압축] "+f.name+": "+(f.size/1024).toFixed(1)+"KB → "+(uploadBlob.size/1024).toFixed(1)+"KB ("+Math.round((1-uploadBlob.size/f.size)*100)+"% 감소)");
    }catch(err){
      console.error("이미지 압축 실패, 원본으로 업로드:",err);
      skippedCompression=true;
    }
  }

  toast("이미지 업로드 중...");
  var postUrl=await uploadToStorage(uploadBlob,"post");
  if(!postUrl)return;
  edState.images.push(postUrl);
  edState.img=true;
  renderEdImages();
  insertInlineMedia(pub.data.publicUrl);
  toast("이미지를 넣었어요");
}
async function onImage(e){
  var f=e.target.files[0];if(!f)return;
  e.target.value="";
  await uploadAndInsertImage(f);
}
function rangeFromPoint(x,y){
  if(document.caretRangeFromPoint)return document.caretRangeFromPoint(x,y);
  if(document.caretPositionFromPoint){
    var pos=document.caretPositionFromPoint(x,y);
    if(!pos)return null;
    var r=document.createRange();
    r.setStart(pos.offsetNode,pos.offset);
    r.collapse(true);
    return r;
  }
  return null;
}
function onEditorDragOver(e){
  e.preventDefault();
  document.getElementById("wContent").classList.add("drag-over");
}
function onEditorDragLeave(){
  document.getElementById("wContent").classList.remove("drag-over");
}
async function onEditorDrop(e){
  var files=e.dataTransfer&&e.dataTransfer.files;
  if(!files||!files.length)return; // 파일이 아니면(내부 텍스트 드래그 등) 브라우저 기본 동작을 그대로 둠
  e.preventDefault();
  document.getElementById("wContent").classList.remove("drag-over");
  if(!window.supabase){toast("업로드를 사용할 수 없어요");return;}
  var range=rangeFromPoint(e.clientX,e.clientY);
  if(range){
    var sel=window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
  saveEditorSelection();
  for(var i=0;i<files.length;i++){
    await uploadAndInsertImage(files[i]);
  }
}
function renderEdImages(){
  var el=document.getElementById("edImages");if(!el)return;
  el.innerHTML=edState.images.map(function(url,i){
    return '<div style="position:relative;width:64px;height:64px">'+
      '<img src="'+esc(url)+'" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:10px">'+
      '<button type="button" onclick="removeEdImage('+i+')" style="position:absolute;top:-6px;right:-6px;width:20px;height:20px;border-radius:50%;background:#000;color:#fff;border:none;font-size:11px;cursor:pointer">×</button>'+
    '</div>';
  }).join("");
}
function removeEdImage(i){
  var url=edState.images[i];
  edState.images.splice(i,1);
  renderEdImages();
  var cEl=document.getElementById("wContent");
  if(cEl)cEl.querySelectorAll('img[src="'+url+'"]').forEach(function(img){img.remove()});
}
// 본문 서식에 쓰는 안전한 CSS 속성만 허용한다.
// position·top/left·width/height·z-index·transform 같은 '레이아웃 탈취' 속성을 빼서
// 글이 화면 전체를 덮는 오버레이(클릭재킹·가짜 UI 피싱)를 만들지 못하게 한다.
var _SAFE_CSS=/^(color|background-color|font-weight|font-style|font-size|font-family|text-decoration|text-decoration-line|text-align|line-height|letter-spacing|max-width|border-radius|opacity|margin|margin-top|margin-bottom|margin-left|margin-right|padding|display|white-space)$/;
function _filterStyle(v){
  return String(v||"").split(";").map(function(d){
    var i=d.indexOf(":");if(i<0)return "";
    var prop=d.slice(0,i).trim().toLowerCase(), val=d.slice(i+1).trim();
    if(!_SAFE_CSS.test(prop))return "";                       // 허용 목록 밖 속성 제거
    if(/url\s*\(|expression|javascript:|\/\*/i.test(val))return ""; // url()·expression 등 제거
    if(/\d\s*v[wh]/i.test(val))return "";                     // 100vw/100vh 등 뷰포트 크기 제거
    if(prop==="display"&&!/^(inline|inline-block|block|none)$/i.test(val))return ""; // flex/grid 등 차단
    return prop+":"+val;
  }).filter(Boolean).join(";");
}
// 본문 이미지·영상은 우리 저장소만 허용 — 외부 주소를 넣어 열람자 IP를 수집하는 추적 픽셀 차단.
function _safeMediaSrc(src){
  src=String(src||"");
  if(/^https:\/\/img\.commi\.kr\//i.test(src))return src;     // R2(현재 저장소)
  if(/^https:\/\/[a-z0-9-]+\.supabase\.co\/storage\//i.test(src))return src; // 옛 이미지(마이그레이션 전)
  if(/^data:image\//i.test(src))return src;
  return "";                                                  // 그 외 외부 주소는 제거
}
var _domPurifyHooked=false;
function _hookDomPurify(){
  if(_domPurifyHooked||!window.DOMPurify)return;
  _domPurifyHooked=true;
  window.DOMPurify.addHook("afterSanitizeAttributes",function(node){
    if(node.hasAttribute&&node.hasAttribute("style")){
      var f=_filterStyle(node.getAttribute("style"));
      if(f)node.setAttribute("style",f);else node.removeAttribute("style");
    }
    var tag=node.tagName&&node.tagName.toLowerCase();
    if((tag==="img"||tag==="video"||tag==="source")&&node.getAttribute("src")){
      var s=_safeMediaSrc(node.getAttribute("src"));
      if(s)node.setAttribute("src",s);else node.removeAttribute("src");
    }
  });
}
function sanitizePostHtml(html){
  if(!html)return "";
  if(!window.DOMPurify)return "";
  _hookDomPurify();
  return window.DOMPurify.sanitize(html,{
    ALLOWED_TAGS:["b","strong","i","em","u","font","span","ul","ol","li","blockquote","br","div","p","img","video","source"],
    ALLOWED_ATTR:["style","color","src","controls","alt","data-poll"]
  });
}
/* ===== 글쓰기 투표(다중·본문 삽입형) ===== edState.polls = {key:{question,options,allowMultiple,anonymous,closesDays}} */
function edPollBlockInner(key){ // 본문 안 투표 블록의 표시 내용(라벨+편집/삭제)
  var pd=edState.polls[key]||{};
  var label=(pd.question||'').trim()?esc(pd.question.trim()):'투표 (편집을 눌러 설정)';
  var n=(pd.options||[]).filter(function(o){return (o||'').trim();}).length;
  return '<span class="pa-q">📊 '+label+(n?' · '+n+'개 선택지':'')+'</span>'+
    '<span class="pa-act"><button type="button" onmousedown="event.preventDefault()" onclick="edEditPoll(\''+key+'\')">편집</button>'+
    '<button type="button" onmousedown="event.preventDefault()" onclick="edRemovePoll(\''+key+'\')">삭제</button></span>';
}
function edInsertPoll(e){ // 커서 위치에 투표 블록 삽입 → 편집 모달 열기 (Range API로 안정 삽입)
  if(e)e.preventDefault();
  var ed=document.getElementById("wContent"); if(!ed)return; ed.focus();
  var key='p'+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36);
  if(!edState.polls)edState.polls={};
  edState.polls[key]={question:'',options:['',''],allowMultiple:false,anonymous:false,closesDays:null};
  var wrap=document.createElement('div');
  wrap.innerHTML='<div class="poll-anchor" data-poll="'+key+'" contenteditable="false">'+edPollBlockInner(key)+'</div><p><br></p>';
  var frag=document.createDocumentFragment(), nodes=[];
  while(wrap.firstChild){nodes.push(wrap.firstChild);frag.appendChild(wrap.firstChild);}
  var sel=window.getSelection();
  var range=(sel&&sel.rangeCount&&ed.contains(sel.anchorNode))?sel.getRangeAt(0):null;
  if(range){
    range.deleteContents(); range.insertNode(frag);
    var last=nodes[nodes.length-1];
    if(last){try{var nr=document.createRange();nr.setStart(last,0);nr.collapse(true);sel.removeAllRanges();sel.addRange(nr);}catch(e2){}}
  }else{ nodes.forEach(function(n){ed.appendChild(n);}); }
  edEditPoll(key);
}
function refreshPollBlockLabel(key){
  var el=document.querySelector('#wContent .poll-anchor[data-poll="'+key+'"]');
  if(el)el.innerHTML=edPollBlockInner(key);
}
function edRemovePoll(key){
  var el=document.querySelector('#wContent .poll-anchor[data-poll="'+key+'"]');
  if(el)el.remove();
  if(edState.polls)delete edState.polls[key];
  if(_edPollKey===key)closePollEdit();
}
var _edPollKey=null, _pmOpts=[];
function edEditPoll(key){
  var pd=edState.polls&&edState.polls[key]; if(!pd)return;
  _edPollKey=key;
  _pmOpts=(pd.options&&pd.options.length?pd.options.slice():['','']);
  document.getElementById('pmQ').value=pd.question||'';
  document.getElementById('pmMulti').checked=!!pd.allowMultiple;
  document.getElementById('pmAnon').checked=!!pd.anonymous;
  document.getElementById('pmClose').value=pd.closesDays?String(pd.closesDays):'';
  pmRenderOpts();
  document.getElementById('pollEditModal').classList.add('open');
  document.body.style.overflow='hidden';
}
function pmSyncOpts(){ var arr=[]; document.querySelectorAll('#pmOpts .ed-poll-opt-in').forEach(function(inp){arr.push(inp.value);}); if(arr.length)_pmOpts=arr; }
function pmRenderOpts(){
  document.getElementById('pmOpts').innerHTML=_pmOpts.map(function(o,i){
    return '<div class="ed-poll-optrow"><input class="ed-poll-opt-in" placeholder="선택지 '+(i+1)+'" value="'+esc(o||'')+'"><button type="button" class="ed-poll-optdel" onclick="pmRemoveOption('+i+')" title="선택지 삭제">×</button></div>';
  }).join('');
}
function pmAddOption(){ pmSyncOpts(); if(_pmOpts.length>=8){toast('선택지는 최대 8개예요');return;} _pmOpts.push(''); pmRenderOpts(); }
function pmRemoveOption(i){ pmSyncOpts(); if(_pmOpts.length<=2){toast('선택지는 최소 2개가 필요해요');return;} _pmOpts.splice(i,1); pmRenderOpts(); }
function closePollEdit(){ var m=document.getElementById('pollEditModal'); if(m)m.classList.remove('open'); document.body.style.overflow=''; _edPollKey=null; }
function edRemovePollFromModal(){ var k=_edPollKey; closePollEdit(); if(k)edRemovePoll(k); }
function edSavePollModal(){
  var key=_edPollKey; if(!key||!edState.polls||!edState.polls[key])return;
  pmSyncOpts();
  var q=(document.getElementById('pmQ').value||'').trim();
  var opts=_pmOpts.map(function(o){return (o||'').trim();}).filter(Boolean);
  if(!q){toast('투표 질문을 입력해주세요');return;}
  if(opts.length<2){toast('선택지를 2개 이상 입력해주세요');return;}
  edState.polls[key]={question:q,options:opts,allowMultiple:document.getElementById('pmMulti').checked,anonymous:document.getElementById('pmAnon').checked,closesDays:(document.getElementById('pmClose').value?parseInt(document.getElementById('pmClose').value,10):null)};
  refreshPollBlockLabel(key);
  closePollEdit();
  toast('투표를 저장했어요','📊');
}
async function submitPost(){
  var t=document.getElementById("wTitle").value.trim();
  var cEl=document.getElementById("wContent");
  var html=sanitizePostHtml(cEl.innerHTML.trim());
  var text=cEl.textContent.trim();
  var isReview=edState.board==="review";
  if(!edState.board){toast("게시판을 선택해주세요");document.getElementById("edBoardMenu").classList.add("open");return}
  if(isReview&&!AUTH.user){toast("로그인 후 후기를 작성할 수 있어요");return}
  if(!isReview&&!t){toast("제목을 입력해주세요");return}
  if(!isReview&&!text&&!edState.img){toast("내용을 입력해주세요");return}
  if(isReview&&!edState.commissionPostId){toast("확인할 커미션 구직 글을 검색해서 선택해주세요");return}
  if(isReview&&!edState.sentiment){toast("만족 후기인지 불호 후기인지 선택해주세요");return}
  var sentiment=isReview?edState.sentiment:null;
  var title=isReview?sentimentTitle(sentiment):((edState.tag?"["+edState.tag+"] ":"")+t);
  var stage=(["러프","선화","채색","완성"].indexOf(edState.tag)>-1)?edState.tag:null;
  var reviewedNick=isReview?edState.reviewedNick:null;
  var reviewedUserId=isReview?edState.reviewedUserId:null;
  var commissionPostId=isReview?edState.commissionPostId:null;

  // 본문에 넣은 투표들: 각각 질문 + 선택지 2개 이상 필수
  var _tmpv=document.createElement('div'); _tmpv.innerHTML=html;
  var _pmk=[].slice.call(_tmpv.querySelectorAll('[data-poll]'));
  for(var _vi=0;_vi<_pmk.length;_vi++){
    var _vk=_pmk[_vi].getAttribute('data-poll'); var _vpd=edState.polls&&edState.polls[_vk];
    if(!_vpd||!(_vpd.question||'').trim()){toast('투표 질문을 입력해주세요 (본문의 투표 블록에서 [편집])');return;}
    if((_vpd.options||[]).map(function(o){return (o||'').trim();}).filter(Boolean).length<2){toast('투표 선택지를 2개 이상 입력해주세요');return;}
  }

  if(editingPostId){
    var ep=POSTS.find(function(x){return x.id===editingPostId});
    if(!ep){editingPostId=null;toast("수정할 글을 찾을 수 없어요");return;}
    if(window.supabase&&ep.dbId){
      var upd=await window.supabase.from("posts").update({
        board:edState.board,category:edState.tag,title:title,content:text,content_html:html||null,
        stage:edState.img?stage:null,reviewed_nickname:reviewedNick,reviewed_user_id:reviewedUserId,commission_post_id:commissionPostId,
        commission_sentiment:sentiment
      }).eq("id",ep.dbId);
      if(upd.error){toast("수정 실패: "+upd.error.message);return;}
      var delImgs=await window.supabase.from("post_images").delete().eq("post_id",ep.dbId);
      if(delImgs.error)console.error(delImgs.error);
      if(edState.images.length){
        var newImgRows=edState.images.map(function(url,i){return{post_id:ep.dbId,url:url,sort:i};});
        var savedNewImgs=await window.supabase.from("post_images").insert(newImgRows);
        if(savedNewImgs.error)console.error(savedNewImgs.error);
      }
    }
    ep.board=edState.board;ep.category=edState.tag;ep.title=title;
    ep.stage=edState.img?stage:null;
    ep.images=edState.images.length?edState.images.slice():undefined;
    ep.reviewedNickname=reviewedNick;
    ep.reviewedUserId=reviewedUserId;
    ep.commissionPostId=commissionPostId;
    ep.commissionSentiment=sentiment;
    ep.html=html;ep.content=text.split("\n").filter(Boolean);
    editingPostId=null;
    closeWrite();
    toast("글을 수정했어요");
    openPost(ep.id);
    return;
  }

  if(window.supabase){
    var saved=await window.supabase.from("posts").insert({
      author_id:AUTH.user?AUTH.user.id:null,
      board:edState.board,
      category:edState.tag,
      title:title,
      content:text,
      content_html:html||null,
      stage:edState.img?stage:null,
      reviewed_nickname:reviewedNick,
      reviewed_user_id:reviewedUserId,
      commission_post_id:commissionPostId,
      commission_sentiment:sentiment
    }).select().single();
    if(saved.error){
      console.error(saved.error);
      toast("저장 실패: "+saved.error.message);
      return;
    }
    if(edState.images.length){
      var imgRows=edState.images.map(function(url,i){return{post_id:saved.data.id,url:url,sort:i};});
      var savedImgs=await window.supabase.from("post_images").insert(imgRows);
      if(savedImgs.error)console.error(savedImgs.error);
    }
    // 투표 저장: 본문에 남은 투표 마커(data-poll)마다 polls 1행 + options. RLS가 '이 글 작성자만' 확인.
    var _insertedPolls=[];
    if(edState.polls){
      var _tmp=document.createElement('div'); _tmp.innerHTML=html;
      var _mk=[].slice.call(_tmp.querySelectorAll('[data-poll]'));
      var _psort=0;
      for(var _mi=0;_mi<_mk.length;_mi++){
        var _key=_mk[_mi].getAttribute('data-poll'); var _pd=edState.polls[_key]; if(!_pd)continue;
        var _q=(_pd.question||'').trim();
        var _opts=(_pd.options||[]).map(function(o){return (o||'').trim();}).filter(Boolean);
        if(!_q||_opts.length<2)continue;
        var _closesAt=_pd.closesDays?new Date(Date.now()+_pd.closesDays*86400000).toISOString():null;
        var pollRes=await window.supabase.from("polls").insert({post_id:saved.data.id,question:_q,
          allow_multiple:!!_pd.allowMultiple,is_anonymous:!!_pd.anonymous,closes_at:_closesAt,anchor_key:_key,sort:_psort++}).select().single();
        if(pollRes.error){console.error(pollRes.error);toast("투표 저장 실패: "+pollRes.error.message);continue;}
        var optRows=_opts.map(function(b,i){return {poll_id:pollRes.data.id,body:b,sort:i};});
        var optIns=await window.supabase.from("poll_options").insert(optRows);
        if(optIns.error)console.error(optIns.error);
        _insertedPolls.push({id:pollRes.data.id,anchor:_key});
      }
    }
    refreshMyProfile();
  }

  var np={id:Date.now(),board:edState.board,title:title,author:"나",time:"방금",createdAt:new Date().toISOString(),likes:0,views:1,
    thumb:edState.img?"t1":"none",stage:edState.img?stage:null,
    images:edState.images.length?edState.images.slice():undefined,
    dbId:saved&&saved.data?saved.data.id:undefined,authorId:saved&&saved.data?saved.data.author_id:undefined,
    reviewedNickname:reviewedNick,reviewedUserId:reviewedUserId,commissionPostId:commissionPostId,commissionSentiment:sentiment,
    polls:(typeof _insertedPolls!=="undefined"?_insertedPolls:[]),pollId:(typeof _insertedPolls!=="undefined"&&_insertedPolls[0]?_insertedPolls[0].id:null),
    html:html,content:text.split("\n").filter(Boolean),comments:[]};
  justAddedId=np.id;setTimeout(function(){justAddedId=null},1800);POSTS.unshift(np);
  closeWrite();state.board=edState.board;state.query="";state.sort="new";state.shown=8;
  renderNav(document.getElementById("boardNav"));renderNav(document.getElementById("boardNavM"));renderNav(document.getElementById("boardNavS"));
  page=1;renderChips();renderList();track("write");toast("글을 올렸어요! ✏️");window.scrollTo({top:0,behavior:"smooth"});
}
/* drawer / sheet / toast */
var drawer=document.getElementById('drawer'),scrim=document.getElementById('scrim');
function openDrawer(){drawer.classList.add('open');scrim.classList.add('open');document.body.style.overflow='hidden'}
function closeDrawer(){drawer.classList.remove('open');scrim.classList.remove('open');document.body.style.overflow=''}
document.getElementById('menuBtn').addEventListener('click',openDrawer);
document.getElementById('drawerClose').addEventListener('click',closeDrawer);
scrim.addEventListener('click',closeDrawer);

var sheet=document.getElementById('sheet'),sheetScrim=document.getElementById('sheetScrim');
function openSheet(){sheet.classList.add('open');sheetScrim.classList.add('open');document.body.style.overflow='hidden'}
function closeSheet(){sheet.classList.remove('open');sheetScrim.classList.remove('open');document.body.style.overflow=''}
sheetScrim.addEventListener('click',closeSheet);

document.addEventListener('click',function(e){
  var menu=document.getElementById('edBoardMenu');
  if(menu&&menu.classList.contains('open')&&!e.target.closest('.ed-metarow'))menu.classList.remove('open');
});
var toastEl=document.getElementById('toast'),toastT;
function toast(msg,icon){toastEl.innerHTML=(icon?'<span style="font-size:15px">'+icon+'</span>':'')+'<span>'+msg+'</span>';toastEl.classList.add('show');clearTimeout(toastT);toastT=setTimeout(function(){toastEl.classList.remove('show')},2000)}
document.getElementById("searchInput").addEventListener("keydown",function(e){if(e.key==="Enter")doSearch(this.value)});
var mSearch=document.getElementById("searchInputM");if(mSearch)mSearch.addEventListener("keydown",function(e){if(e.key==="Enter")doSearch(this.value)});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){closeWrite();closeDrawer();closeSheet()}});

renderNav(document.getElementById("boardNav"));renderNav(document.getElementById("boardNavM"));renderNav(document.getElementById("boardNavS"));
if(!getPostIdFromPath()&&!getUserIdFromPath()&&!getCommissionIdFromPath()){
  renderChips();renderHot();
  // renderTrend()는 이제 실제 글의 인기 순위를 보여주므로 loadRealPosts()가 끝난 뒤에 그림(아래 참고).
  // 실제 글은 loadRealPosts()가 곧 채워줌 — 여기서 더미 글로 renderList()를 한 번 더 돌리면
  // "더미 글이 잠깐 보였다 실제 글로 바뀌는" 깜빡임과 그로 인한 스크롤 튐이 생김.
  // Supabase 연동이 없는 로컬 데모 환경 등에서만 폴백으로 더미 글을 보여줌.
  if(!window.__paloHasBackend){renderTrend();renderList();}
}

var toTop=document.getElementById('toTop');
if(toTop){
  var getY=function(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;};
  var onScroll=function(){getY()>360?toTop.classList.add('show'):toTop.classList.remove('show');};
  window.addEventListener('scroll',onScroll,{passive:true});
  document.addEventListener('scroll',onScroll,{passive:true,capture:true});
  toTop.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});document.documentElement.scrollTop=0;document.body.scrollTop=0;});
}
document.addEventListener('click',function(e){
  var el=e.target.closest('.rip');if(!el)return;
  var r=el.getBoundingClientRect();var d=Math.max(r.width,r.height);
  var sp=document.createElement('span');sp.className='ripple';
  sp.style.width=sp.style.height=d+'px';
  sp.style.left=(e.clientX-r.left-d/2)+'px';sp.style.top=(e.clientY-r.top-d/2)+'px';
  el.appendChild(sp);setTimeout(function(){sp.remove()},520);
},true);


// ---- easier search wiring ----
var si=document.getElementById("searchInput"), sc=document.getElementById("searchClear");
if(si){
  si.addEventListener("input",function(){
    if(sc)sc.style.display=this.value?"flex":"none";
    liveSearch(this.value);
  });
}
if(sc){
  sc.addEventListener("click",function(){
    si.value="";sc.style.display="none";state.query="";state.board=state.board||"all";
    doSearch("");si.focus();
  });
}
// mobile search overlay
var msEl=document.getElementById("msearch"), msi=document.getElementById("msearchInput");
function openMSearch(){msEl.classList.add("open");setTimeout(function(){msi.focus()},50);}
function closeMSearch(){msEl.classList.remove("open");}
if(msi){
  msi.addEventListener("input",function(){liveSearch(this.value);});
  msi.addEventListener("keydown",function(e){if(e.key==="Enter"){doSearch(this.value);closeMSearch();}});
}


// ===== 알림함 =====
function syncNotifBadge(){
  var un=NOTIFS.filter(function(n){return !n.read}).length;
  var dot=document.getElementById("notiDot");if(dot)dot.style.display=un?"block":"none";
  var bd=document.getElementById("notiBadge");
  if(bd){bd.textContent=un;bd.style.display=un?"flex":"none";}
}
function setNotifFilter(f){notifFilter=f;renderNotifs();}
function delNotif(i){
  var n=NOTIFS[i];
  if(n&&n.dbId)window.supabase.from("notifications").delete().eq("id",n.dbId).then(function(){});
  NOTIFS.splice(i,1);renderNotifs();syncNotifBadge();toast("알림을 삭제했어요");
}
function renderNotifs(){
  var el=document.getElementById("npList");if(!el)return;
  var tabs=[["all","전체"],["cm","댓글"],["like","좋아요"],["chat","채팅"],["commission","커미션"],["sys","공지"]];
  var th='<div class="np-tabs">'+tabs.map(function(t){
    return '<button class="np-tab'+(notifFilter===t[0]?' on':'')+'" onclick="event.stopPropagation();setNotifFilter(\''+t[0]+'\')">'+t[1]+'</button>';
  }).join("")+'</div>';
  var items=[];
  NOTIFS.forEach(function(n,i){ if(notifFilter==="all"||n.type===notifFilter) items.push([n,i]); });
  var body=items.length?items.map(function(pair){
    var n=pair[0],i=pair[1];
    return '<div class="np-item'+(n.read?'':' unread')+'" onclick="notifClick('+i+')">'+
      '<span class="np-ico">'+n.icon+'</span>'+
      '<span class="np-txt">'+esc(n.txt)+'<div class="np-time">'+esc(n.time)+'</div></span>'+
      '<button class="np-del" onclick="event.stopPropagation();delNotif('+i+')" aria-label="삭제">✕</button></div>';
  }).join(""):'<div class="np-empty">해당 알림이 없어요</div>';
  el.innerHTML=th+body;
}
function toggleNotif(e){
  if(e)e.stopPropagation();
  var p=document.getElementById("notifPanel");
  var opening=!p.classList.contains("open");
  p.classList.toggle("open");
  if(opening)renderNotifs();
}
function closeNotif(){document.getElementById("notifPanel").classList.remove("open");}
function notifClick(i){
  var n=NOTIFS[i];n.read=true;syncNotifBadge();closeNotif();
  if(n.dbId)window.supabase.from("notifications").update({is_read:true}).eq("id",n.dbId).then(function(){});
  if(n.type==="review_alert")openReviewAnalysis(n.reviewUser);
  else if(n.chatUser)openChat(n.chatUser);
  else if(n.post)openPost(n.post);
  else if(n.commission)cmOpenCommissionById(n.commission);
  else if(n.cmTarget==="reviews")cmOpenReviews();
  else if(n.type==="commission")cmOpenMy('applications');
  else openRules();
}
function markAllRead(){
  NOTIFS.forEach(function(n){n.read=true});renderNotifs();syncNotifBadge();toast("모든 알림을 읽음 처리했어요");
  if(AUTH.user&&window.supabase)window.supabase.from("notifications").update({is_read:true}).eq("user_id",AUTH.user.id).eq("is_read",false).then(function(){});
}
/* ===== 웹 푸시 알림 설정 (PWA) ===== */
function toggleNotifPref(key,on,label){
  SETTINGS[key]=on;
  try{localStorage.setItem("palo_notif_prefs",JSON.stringify(SETTINGS));}catch(e){}
  // 서버 발송이 이 설정을 참고하므로 내 구독의 prefs도 갱신
  if(AUTH.user&&window.supabase)window.supabase.from("push_subscriptions").update({prefs:SETTINGS}).eq("user_id",AUTH.user.id).then(function(){});
  toast(on?(label+" 알림을 켰어요"):(label+" 알림을 껐어요"));
}
function urlBase64ToUint8Array(base64String){
  var padding="=".repeat((4-base64String.length%4)%4);
  var base64=(base64String+padding).replace(/-/g,"+").replace(/_/g,"/");
  var raw=window.atob(base64);var arr=new Uint8Array(raw.length);
  for(var i=0;i<raw.length;i++)arr[i]=raw.charCodeAt(i);
  return arr;
}
async function subscribeToPush(){
  if(!AUTH.user||!pushSupported()||!window.supabase)return false;
  if(!window.VAPID_PUBLIC_KEY)return false; // VAPID 공개키 미설정(2단계 환경변수 설정 전)
  try{
    var reg=await navigator.serviceWorker.ready;
    var sub=await reg.pushManager.getSubscription();
    if(!sub)sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:urlBase64ToUint8Array(window.VAPID_PUBLIC_KEY)});
    var j=sub.toJSON();
    if(!j||!j.endpoint||!j.keys)return false;
    var res=await window.supabase.from("push_subscriptions").upsert({
      user_id:AUTH.user.id,endpoint:j.endpoint,p256dh:j.keys.p256dh,auth:j.keys.auth,prefs:SETTINGS
    },{onConflict:"endpoint"});
    return !res.error;
  }catch(e){console.error("푸시 구독 실패:",e);return false;}
}
function pushSupported(){return ("Notification" in window)&&("serviceWorker" in navigator)&&("PushManager" in window);}
function isIOSDevice(){return /iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;}
function isStandalonePWA(){return window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;}
function notifPermState(){return (typeof Notification!=="undefined")?Notification.permission:"unsupported";}
async function enablePushNotifications(){
  if(!pushSupported()){toast("이 브라우저는 알림을 지원하지 않아요");return;}
  if(isIOSDevice()&&!isStandalonePWA()){toast("먼저 홈 화면에 추가한 뒤 그 아이콘으로 열어주세요","📲");return;}
  if(!AUTH.user){toast("로그인 후 알림을 켤 수 있어요","🔒");loginWithGoogle();return;}
  var perm;
  try{perm=await Notification.requestPermission();}catch(e){perm=notifPermState();}
  if(perm==="granted"){
    var ok=await subscribeToPush(); // 실제 푸시 구독을 서버에 저장
    try{
      var reg=await navigator.serviceWorker.ready;
      reg.showNotification("commi",{body:"알림이 켜졌어요! 🔔 받고 싶은 알림 종류를 골라주세요.",icon:"/icon-192.png",badge:"/icon-192.png",data:{url:"/?notif=settings"}});
    }catch(e){}
    toast(ok?"알림을 켰어요 🔔":"알림 권한을 켰어요 (발송 준비 중)");
  }else if(perm==="denied"){
    toast("알림이 차단돼 있어요. 브라우저 설정에서 허용해주세요");
  }else{
    toast("알림 권한을 허용하지 않았어요");
  }
  if(document.getElementById("myProfileView"))openProfile();
}
function notifEnableHTML(){
  if(isIOSDevice()&&!isStandalonePWA()){
    return '<div class="pf-notif-guide">'+
      '<b>📲 iPhone에서 알림 받기</b>'+
      '<ol><li>Safari 하단 <b>공유</b> 버튼(<span aria-hidden="true">⎋</span>)을 탭</li>'+
      '<li><b>"홈 화면에 추가"</b> 선택</li>'+
      '<li>홈 화면의 <b>commi 아이콘</b>으로 다시 열기</li>'+
      '<li>그 화면에서 <b>알림 켜기</b> 누르기</li></ol>'+
      '<span class="pf-notif-sub">아이폰은 홈 화면에 추가해야만 알림이 와요 (iOS 16.4 이상).</span></div>';
  }
  if(!pushSupported()){
    return '<div class="pf-notif-guide"><b>이 브라우저는 알림을 지원하지 않아요</b><span class="pf-notif-sub">크롬·엣지·최신 사파리에서 사용해주세요.</span></div>';
  }
  var st=notifPermState();
  if(st==="granted")return '<div class="pf-notif-guide on"><b>🔔 알림이 켜져 있어요</b><span class="pf-notif-sub">아래에서 받고 싶은 알림 종류를 골라주세요.</span></div>';
  if(st==="denied")return '<div class="pf-notif-guide"><b>알림이 차단돼 있어요</b><span class="pf-notif-sub">주소창 옆 자물쇠 → 알림 → 허용으로 바꿔주세요.</span></div>';
  return '<button class="pf-notif-btn" onclick="enablePushNotifications()">🔔 알림 켜기</button>';
}

// ===== 내 정보 (프로필) =====
function reviewCardHTML(p){
  var isGood=p.commissionSentiment==="good";
  var img=(p.images&&p.images.length)?p.images[0]:null;
  return '<div class="review-card" onclick="openPost('+p.id+')">'+
    (img?'<div class="review-img"><img src="'+esc(img)+'" alt="" loading="lazy"></div>':'<div class="review-img review-img-empty">💬</div>')+
    '<div class="review-meta">'+
      '<span class="review-sentiment '+(isGood?"good":"bad")+'">'+(isGood?"😊 만족":"😞 불호")+'</span>'+
      '<span class="review-author">'+esc(dispName(p.author))+'</span>'+
      '<span class="review-time">'+p.time+'</span>'+
    '</div>'+
  '</div>';
}
function reviewAlbumHTML(reviews){
  if(!reviews.length)return"";
  return '<div class="review-album">'+reviews.map(reviewCardHTML).join("")+'</div>';
}
function profileRow(p){
  var c=catFor(p);
  return '<div class="post rip" onclick="openPost('+p.id+')">'+
    '<div class="pmain"><div class="ptitle">'+esc(p.title)+'</div>'+
    '<div class="pmeta"><span class="cat '+c.cls+'">'+c.label+'</span>'+
    '<span class="mt">'+p.time+'</span><span class="sep"></span><span class="mv">조회 '+fmtViews(p.views)+'</span>'+
    (p.likes?'<span class="sep"></span><span class="ml">추천 '+p.likes+'</span>':'')+'</div></div>'+
    postThumbHTML(p)+
    '<div class="pcmt"><span class="cn">'+p.comments.length+'</span><span class="cl">댓글</span></div></div>';
}
function pinnedPostCardHTML(pinnedPostId){
  if(!pinnedPostId)return"";
  var p=POSTS.find(function(x){return x.dbId===pinnedPostId});
  if(!p)return"";
  var c=catFor(p);
  var thumb=p.images&&p.images.length?p.images[0]:null;
  return '<div class="pinned-post" onclick="openPost('+p.id+')">'+
    '<span class="pinned-label">📌 대표 글</span>'+
    (thumb?'<img src="'+esc(thumb)+'" alt="" class="pinned-thumb">':'')+
    '<div class="pinned-body"><div class="pinned-title">'+esc(p.title)+'</div>'+
    '<div class="pinned-meta"><span class="cat '+c.cls+'">'+c.label+'</span><span>추천 '+p.likes+' · 댓글 '+p.comments.length+'</span></div></div>'+
  '</div>';
}
function setPfTab(t){pfTab=t;openProfile();}
function listOrEmpty(arr,emptyMsg,cta){
  if(arr.length)return '<div class="list">'+arr.map(profileRow).join("")+'</div>';
  return '<div class="pf-empty">'+emptyMsg+(cta?'<button onclick="openWrite()">✏️ 첫 글 쓰기</button>':'')+'</div>';
}
// 포스타입식 메뉴 한 줄: 왼쪽 선(line) 아이콘 + 이름, 오른쪽 개수/화살표. opts:{count, chev:false, danger}
function pfMiniIcon(inner){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+inner+'</svg>';}
/* 프로필 섹션 카드 — 제목 + 한 줄 설명 + 내용을 연한 회색 카드로 묶는다 */
function pfSection(title,desc,inner,id){
  // 줄 목록은 하나의 이어진 카드로 감싼다 — 낱개로 띄워 두면 경계가 흐려 구분이 안 된다.
  // 2x2 타일은 격자라 감싸지 않는다.
  var body=(inner.indexOf('class="pf-tiles"')>-1)?inner:('<div class="pf-list">'+inner+'</div>');
  return '<div class="pf-group"'+(id?' id="'+id+'"':'')+'>'+
    '<div class="pf-group-head"><div class="pf-group-title">'+title+'</div>'+
    (desc?'<div class="pf-group-desc">'+desc+'</div>':'')+'</div>'+body+'</div>';
}
/* 자주 쓰는 기능은 2x2 타일로 — 아이콘 + 제목 + 작은 설명 */
function pfTile(icon,title,sub,onclick,count){
  return '<button type="button" class="pf-tile" onclick="'+onclick+'">'+
    '<span class="pf-tile-ic">'+icon+'</span>'+
    '<span class="pf-tile-t">'+title+(count!=null?'<i>'+count+'</i>':'')+'</span>'+
    '<span class="pf-tile-s">'+sub+'</span></button>';
}
function pfRow(icon,label,onclick,opts){
  opts=opts||{};
  var right='';
  if(opts.count!=null)right+='<span class="pf-item-count">'+opts.count+'</span>';
  if(opts.chev!==false)right+='<svg class="pf-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';
  return '<button type="button" class="pf-item'+(opts.danger?' danger':'')+'" onclick="'+onclick+'">'+
    '<span class="pf-item-ic">'+icon+'</span>'+
    '<span class="pf-item-label">'+label+'</span>'+
    '<span class="pf-item-right">'+right+'</span></button>';
}
// 프로필의 '내 글' 계열(쓴 글/댓글 단 글/좋아요/최근 본 글)을 각각 별도 화면으로 표시(메뉴 행에서 진입)
function openPfList(kind){
  if(!AUTH.user)return;
  userLeftHome=true;
  enterScreen("pfList",openProfile); // 히스토리에 프로필을 남겨, 스와이프/뒤로가기가 프로필로 정확히 복귀
  var mine=POSTS.filter(function(p){return p.author==="나"||(AUTH.user&&p.authorId===AUTH.user.id)});
  var commented=POSTS.filter(function(p){return p.author!=="나"&&p.comments.some(function(c){return c.n==="나"})});
  var likedArr=POSTS.filter(function(p){return p._liked});
  var recent=[];Array.from(READ).reverse().forEach(function(id){var p=POSTS.find(function(x){return x.id===id});if(p)recent.push(p)});
  recent=recent.slice(0,10);
  var M={mine:["쓴 글",mine,'아직 쓴 글이 없어요.<br>첫 이야기를 올려볼까요?',true],
         cm:["댓글 단 글",commented,'댓글을 단 글이 아직 없어요.<br>마음에 드는 글에 훈수를 남겨보세요!',false],
         liked:["좋아요",likedArr,'좋아요한 글이 아직 없어요.<br>마음에 드는 그림에 하트를 눌러보세요!',false],
         recent:["최근 본 글",recent,'최근 본 글이 없어요.',false]};
  var m=M[kind]||M.mine;
  var h='<div class="profile">'+
    '<button class="d-back" onclick="screenBack()"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>내 정보로</button>'+
    '<div class="pf-list-head">'+m[0]+' <span>'+m[1].length+'</span></div>'+
    listOrEmpty(m[1],m[2],m[3])+
  '</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"auto"});
}
// keepStack=true면 커미션·채팅 같은 앱 내부 화면 흐름 '안에서' 열린 것 — 스택을 비우거나
// URL(/user/)로 바꾸지 않고, 그 화면 흐름의 뒤로가기 스택에 그대로 얹혀 한 단계씩 돌아가게 함.
async function openUserProfile(userId,keepStack){
  if(!userId||!window.supabase)return;
  userLeftHome=true;
  if(!keepStack)resetScreens();
  leaveChat();
  closeNotif();
  var res=await window.supabase.from("profiles").select("*").eq("id",userId).single();
  if(res.error||!res.data){
    document.getElementById("main").innerHTML='<div class="profile"><div class="empty"><h3>사용자를 찾을 수 없어요</h3></div></div>';
    return;
  }
  var profile=res.data;
  if(!keepStack){
    var targetPath="/user/"+userId;
    if(location.pathname!==targetPath)history.pushState({},"",targetPath);
  }
  document.title=profile.nickname+"님의 프로필 · commi";
  var theirPosts=POSTS.filter(function(p){return p.authorId===userId});
  var likeSum=theirPosts.reduce(function(a,p){return a+p.likes},0);
  var canChat=AUTH.user&&AUTH.user.id!==userId;
  var theirReviewStats=pfReviewStats(userId,profile.nickname);
  var theirBookmarkCount=await pfBookmarkCount(userId);
  var artistCommissions=await pfArtistCommissions(userId,profile.nickname);
  artistCommissions.forEach(function(d){if(!cmData.some(function(x){return x.id===d.id;}))cmData.push(d);});
  if(AUTH.user&&cmBookmarkIds===null)await cmLoadMyBookmarks();
  if(pfReviewsForUserId!==userId){pfReviewsExpanded=false;pfReviewsForUserId=userId;}
  var theirReviewList=pfArtistReviewList(userId,profile.nickname);
  var h='<div class="profile">';
  h+=pfHeroHTML({nickname:profile.nickname,level:profile.level,avatar_url:profile.avatar_url,
    cover_url:profile.cover_url,bio:profile.bio,sns_twitter:profile.sns_twitter,sns_instagram:profile.sns_instagram,sns_email:profile.sns_email},
    false,theirReviewStats,theirBookmarkCount);
  if(canChat)h+='<button class="pf-edit" style="margin-top:14px;width:100%" onclick="openChat(\''+userId+'\')">💬 채팅하기</button>';
  h+=pfCommissionListHTML(artistCommissions);
  h+=pinnedPostCardHTML(profile.pinned_post_id);
  h+=pfReviewListHTML(theirReviewList,userId);
  h+='<div class="pf-stats">'+
     '<div class="pf-st"><b>'+(profile.score||0)+'</b><span>활동 점수</span></div>'+
     '<div class="pf-st"><b>'+theirPosts.length+'</b><span>쓴 글</span></div>'+
     '<div class="pf-st"><b>'+likeSum+'</b><span>받은 추천</span></div></div>';
  h+='<div class="pf-follow-bar" id="pfFollowBar"></div>';
  h+='<div class="pf-sec">쓴 글 ('+theirPosts.length+')</div>';
  h+=listOrEmpty(theirPosts,esc(profile.nickname)+'님이 쓴 글이 아직 없어요.');
  h+='<button class="pf-edit" style="margin-top:16px" onclick="renderList()">← 목록으로</button>';
  h+='</div>';
  document.getElementById("main").innerHTML=h;
  loadFollowBar(userId);
  window.scrollTo({top:0,behavior:"smooth"});
}
function getUserIdFromPath(){
  var m=location.pathname.match(/^\/user\/([0-9a-fA-F-]{36})$/);
  return m?m[1]:null;
}

/* ---------- 1:1 채팅 ---------- */
var currentConversationId=null;
var currentChatPartnerId=null;
var currentChatPartnerName="";
var currentChatPartnerAvatar=null;
var chatChannel=null;
var chatRoomVpListener=null;
var chatScrollLockY=null;
function unsubscribeFromChat(){
  if(chatChannel){window.supabase.removeChannel(chatChannel);chatChannel=null;}
}
// 채팅방이 열려 있는 동안 배경(피드) 스크롤을 잠가, iOS가 입력창 포커스 시 페이지를 스크롤(→고정 헤더가 위로 사라지고 하단에 빈 여백 생김)하는 것을 막는다.
function lockBodyForChat(){
  if(chatScrollLockY!=null)return;
  chatScrollLockY=window.scrollY||window.pageYOffset||0;
  var b=document.body.style;
  b.position="fixed";b.top=(-chatScrollLockY)+"px";b.left="0";b.right="0";b.width="100%";
}
function unlockBodyForChat(){
  if(chatScrollLockY==null)return;
  var b=document.body.style;
  b.position="";b.top="";b.left="";b.right="";b.width="";
  window.scrollTo(0,chatScrollLockY);
  chatScrollLockY=null;
}
// 입력창 높이를 내용에 맞춰 한 줄 → 여러 줄로 자연스럽게 확장(최대 100px)
function autoGrowChatInput(ta){
  if(!ta)return;
  ta.style.height="auto";
  ta.style.height=Math.min(ta.scrollHeight,100)+"px";
  var box=document.getElementById("chatMessages");if(box)box.scrollTop=box.scrollHeight;
}
// 채팅방 오버레이: top은 고정(헤더 안 움직임)하고 bottom만 키보드 높이만큼 올려 아래에서만 줄어들게 함.
// CSS transition(bottom)으로 한 프레임 점프가 아니라 부드럽게 올라오는 효과.
function fitChatRoom(){
  var el=document.getElementById("chatRoom");if(!el||!el.classList.contains("open"))return;
  var vv=window.visualViewport;
  var kb=vv?Math.max(0,Math.round((window.innerHeight||0)-vv.height-(vv.offsetTop||0))):0;
  el.style.bottom=kb+"px";
  el.classList.toggle("kb-up",kb>2); // 키보드가 떠 있으면 입력줄 하단 여백 축소
  var box=document.getElementById("chatMessages");if(box)box.scrollTop=box.scrollHeight;
}
function leaveChat(){
  unsubscribeFromChat();
  currentConversationId=null;
  currentChatPartnerId=null;
  cmPendingChatRef=null;
  document.body.classList.remove("chat-open");
  unlockBodyForChat();
  var el=document.getElementById("chatRoom");
  if(el){el.classList.remove("open","kb-up");el.innerHTML="";el.style.height="";el.style.transform="";el.style.bottom="";}
  if(chatRoomVpListener&&window.visualViewport){window.visualViewport.removeEventListener("resize",chatRoomVpListener);window.visualViewport.removeEventListener("scroll",chatRoomVpListener);chatRoomVpListener=null;}
}
/* ---------- 알림 (DB 저장, notifications 테이블) ---------- */
var globalNotifChannel=null;
function dbRowToNotif(row){
  return {dbId:row.id,type:row.type,icon:row.icon||"🔔",txt:row.content,time:timeAgo(row.created_at),chatUser:row.link_chat_user,post:row.link_post_id?100000+row.link_post_id:null,commission:row.link_commission_id||null,reviewUser:row.link_reviewed_user_id||null,read:row.is_read};
}
async function loadNotificationsFromDB(){
  var res=await window.supabase.from("notifications").select("*").eq("user_id",AUTH.user.id).order("created_at",{ascending:false}).limit(50);
  if(res.error)return;
  var dbNotifs=(res.data||[]).map(dbRowToNotif);
  NOTIFS=dbNotifs.concat(NOTIFS.filter(function(n){return !n.dbId}));
  syncNotifBadge();
}
async function initGlobalChatNotifications(){
  if(!AUTH.user||!window.supabase)return;
  await loadNotificationsFromDB();
  subscribeToNotifications();
}
function subscribeToNotifications(){
  unsubscribeFromNotifications();
  globalNotifChannel=window.supabase.channel("notifications-"+AUTH.user.id)
    .on("postgres_changes",{event:"INSERT",schema:"public",table:"notifications",filter:"user_id=eq."+AUTH.user.id},function(payload){
      var row=payload.new;
      if(row.type==="chat"){
        if(!SETTINGS.chat)return;
        if(row.link_conversation_id===currentConversationId)return;
      }else if(row.type==="cm"&&!SETTINGS.cm)return;
      else if(row.type==="like"&&!SETTINGS.like)return;
      else if(row.type==="cm_inquiry"&&!SETTINGS.cminquiry)return;
      NOTIFS.unshift(dbRowToNotif(row));
      syncNotifBadge();
      toast(row.content,row.icon||"🔔");
    })
    .subscribe();
}
function unsubscribeFromNotifications(){
  if(globalNotifChannel){window.supabase.removeChannel(globalNotifChannel);globalNotifChannel=null;}
}
function subscribeToChat(conversationId){
  unsubscribeFromChat();
  chatChannel=window.supabase.channel("chat-"+conversationId)
    .on("postgres_changes",{event:"INSERT",schema:"public",table:"messages",filter:"conversation_id=eq."+conversationId},function(payload){
      var m=payload.new;
      if(m.sender_id===AUTH.user.id)return;
      appendChatMessage(m);
      window.supabase.rpc("mark_messages_read",{p_conversation_id:conversationId}).then(function(){});
    })
    .on("postgres_changes",{event:"UPDATE",schema:"public",table:"messages",filter:"conversation_id=eq."+conversationId},function(payload){
      var m=payload.new;
      if(m.sender_id===AUTH.user.id&&m.is_read)markBubbleAsRead(m.id);
    })
    .subscribe();
}
function markBubbleAsRead(messageId){
  var el=document.querySelector('[data-msg-id="'+messageId+'"] .chat-read-status');
  if(el)el.textContent="읽음";
}
function appendChatMessage(m){
  var box=document.getElementById("chatMessages");
  if(!box)return;
  // 처음 보는 이모티콘이면 주소를 받아온 뒤 그 말풍선만 다시 그린다
  var need=emoIdsIn(m.content).filter(function(id){return !EMO_BY_ID[id];});
  if(need.length){
    ensureEmoticons(need).then(function(){
      var el=box.querySelector('[data-msg-id="'+m.id+'"] .chat-bubble');
      if(el)el.innerHTML=withEmoticons(esc(m.content));
    });
  }
  var empty=box.querySelector(".pf-empty");if(empty)empty.remove();
  var div=document.createElement("div");
  div.className="chat-msg";
  div.setAttribute("data-msg-id",m.id);
  div.innerHTML='<div class="chat-bubble"></div>';
  // 이모티콘 토큰을 이미지로 바꿔야 하므로 innerHTML을 쓴다.
  // esc()로 먼저 막고, withEmoticons가 우리 DB의 이모티콘만 넣는다(임의 HTML은 못 들어옴).
  div.querySelector(".chat-bubble").innerHTML=m.image_url
    ? '<img class="cr-img" src="'+esc(m.image_url)+'" alt="사진" loading="lazy">'
    : withEmoticons(esc(m.content));
  box.appendChild(div);
  box.scrollTop=box.scrollHeight;
}
async function findOrCreateConversation(otherUserId){
  var q="and(user1_id.eq."+AUTH.user.id+",user2_id.eq."+otherUserId+"),and(user1_id.eq."+otherUserId+",user2_id.eq."+AUTH.user.id+")";
  var find=await window.supabase.from("conversations").select("*").or(q).maybeSingle();
  if(find.data)return find.data;
  var ins=await window.supabase.from("conversations").insert({user1_id:AUTH.user.id,user2_id:otherUserId}).select().single();
  if(!ins.error)return ins.data;
  var retry=await window.supabase.from("conversations").select("*").or(q).maybeSingle();
  if(retry.data)return retry.data;
  toast("채팅방을 여는 데 실패했어요: "+ins.error.message);
  return null;
}
async function openChat(otherUserId){
  if(!AUTH.user){toast("로그인이 필요해요");loginWithGoogle();return;}
  if(otherUserId===AUTH.user.id){toast("나 자신과는 채팅할 수 없어요");return;}
  closeNotif();
  document.getElementById("main").innerHTML='<div class="profile"><p style="padding:40px 0;text-align:center;color:var(--muted)">불러오는 중...</p></div>';

  var conv=await findOrCreateConversation(otherUserId);
  if(!conv)return;
  currentConversationId=conv.id;
  currentChatPartnerId=otherUserId;

  var profRes=await window.supabase.from("profiles").select("nickname,avatar_url").eq("id",otherUserId).single();
  var partnerName=profRes.data?profRes.data.nickname:"상대방";
  currentChatPartnerName=partnerName;
  currentChatPartnerAvatar=profRes.data?profRes.data.avatar_url:null;

  var msgRes=await window.supabase.from("messages").select("*").eq("conversation_id",conv.id).order("created_at",{ascending:true});
  if(msgRes.error){toast("대화를 불러오지 못했어요: "+msgRes.error.message);return;}
  enterScreen("chatRoom",openChatList);
  await ensureChatEmoticons(msgRes.data||[]); // 말풍선을 그리기 전에 이모티콘 주소를 채운다
  await chatImageSupported();                // '+' 버튼을 보여줄지 미리 판단
  renderChatView(partnerName,msgRes.data||[]);
  subscribeToChat(conv.id);
  window.supabase.rpc("mark_messages_read",{p_conversation_id:conv.id}).then(function(){});
}
var CHAT_WEEKDAYS=["일","월","화","수","목","금","토"];
function chatTimeLabel(iso){var d=new Date(iso);var hh=d.getHours(),ampm=hh<12?"오전":"오후",h12=hh%12||12;return ampm+" "+String(h12).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");}
function chatDividerLabel(iso){var d=new Date(iso);return d.getFullYear()+"."+String(d.getMonth()+1).padStart(2,"0")+"."+String(d.getDate()).padStart(2,"0")+" ("+CHAT_WEEKDAYS[d.getDay()]+")";}
// 대화에 쓰인 이모티콘을 한 번에 불러온다. 없으면 말풍선이 빈 채로 보인다.
async function ensureChatEmoticons(messages){
  var ids=[];
  (messages||[]).forEach(function(m){ids=ids.concat(emoIdsIn(m.content));});
  if(ids.length)await ensureEmoticons(ids);
}
function chatMessagesHtml(messages){
  if(!messages.length)return '<div class="cr-empty">아직 대화가 없어요. 첫 메시지를 보내보세요!</div>';
  var h="",lastDay="",prevSender=null;
  messages.forEach(function(m){
    var dayKey=new Date(m.created_at).toDateString();
    if(dayKey!==lastDay){h+='<div class="cr-divider"><span>'+esc(chatDividerLabel(m.created_at))+'</span></div>';lastDay=dayKey;prevSender=null;}
    var mine=m.sender_id===AUTH.user.id;
    var firstOfGroup=(m.sender_id!==prevSender);prevSender=m.sender_id;
    var time='<span class="cr-time">'+esc(chatTimeLabel(m.created_at))+'</span>';
    var bcls='cr-bubble'+(m.commission_id?' cr-commission':'');
    var bclick=m.commission_id?(' onclick="cmOpenCommissionById('+m.commission_id+')"'):'';
    // 사진 메시지는 이미지로, 그 외엔 글자로. 주소는 우리가 저장한 값만 쓴다.
    var content=(m.image_url
        ? '<img class="cr-img" src="'+esc(m.image_url)+'" alt="사진" loading="lazy" onclick="openImageViewer(&quot;'+cmQ(m.image_url)+'&quot;)">'
        : withEmoticons(esc(m.content)))
      +(m.commission_id?' <span class="cr-arrow">→</span>':'');
    if(mine){
      h+='<div class="cr-row mine">'+
        '<div class="cr-meta">'+(m.is_read?'<span class="cr-read">읽음</span>':'')+time+'</div>'+
        '<div class="'+bcls+'"'+bclick+'>'+content+'</div>'+
      '</div>';
    }else{
      h+='<div class="cr-row other'+(firstOfGroup?' first':'')+'">'+
        '<div class="cr-ava">'+(firstOfGroup?avatarHTML(currentChatPartnerName,currentChatPartnerAvatar):'')+'</div>'+
        '<div class="cr-other-main">'+
          (firstOfGroup?'<div class="cr-name">'+esc(currentChatPartnerName)+'</div>':'')+
          '<div class="cr-other-line"><div class="'+bcls+'"'+bclick+'>'+content+'</div>'+time+'</div>'+
        '</div>'+
      '</div>';
    }
  });
  return h;
}
var chatListCache=null; // 마지막으로 그린 채팅 목록 데이터 — 재방문 시 즉시 표시용(뒤에서 최신으로 교체)
var _chatListBack=null; // 채팅 목록에서 '뒤로' 갈 곳(들어온 곳 기억): 홈 탭이면 goHome, 프로필 메뉴면 openProfile
async function openChatList(origin){
  if(!AUTH.user){toast("로그인이 필요해요");loginWithGoogle();return;}
  // origin: 'profile'→뒤로=프로필, 'home'→뒤로=홈, 미지정→기존 유지(채팅방에서 목록으로 복귀할 때 원래 자리 보존)
  if(origin==='profile')_chatListBack=openProfile;
  else if(origin==='home')_chatListBack=goHome;
  curTab="chat";navSeq++;
  var mySeq=navSeq; // 이 로딩을 시작한 시점의 번호표. 아래 렌더 직전에 아직 최신인지 확인.
  userLeftHome=true;
  if(!navigatingBack)resetScreens();
  enterScreen("chatList",function(){(_chatListBack||goHome)();}); // 뒤로가기 시 기억해 둔 곳(홈/프로필)으로
  leaveChat();
  closeNotif();
  syncTabs("chat");
  // 캐시가 있으면 즉시 그려서 대기 없이 바로 보이게(아래에서 최신 데이터로 교체). 없으면 로딩 표시.
  if(chatListCache){
    renderChatList(chatListCache.convs,chatListCache.partnerIds,chatListCache.nickById,chatListCache.avaById,chatListCache.lastMsgByConv,chatListCache.unreadByConv);
  }else{
    document.getElementById("main").innerHTML='<div class="profile"><p style="padding:40px 0;text-align:center;color:var(--muted)">불러오는 중...</p></div>';
  }

  var convRes=await window.supabase.from("conversations").select("*")
    .or("user1_id.eq."+AUTH.user.id+",user2_id.eq."+AUTH.user.id)
    .order("last_message_at",{ascending:false});
  if(mySeq!==navSeq)return; // 로딩 중 사용자가 다른 탭으로 이동함 → 더 진행하지 않음(현재 화면 유지)
  if(convRes.error){toast("채팅 목록을 불러오지 못했어요: "+convRes.error.message);return;}
  var convs=convRes.data||[];
  var partnerIds=convs.map(function(c){return c.user1_id===AUTH.user.id?c.user2_id:c.user1_id;});
  var convIds=convs.map(function(c){return c.id;});

  // 프로필·메시지 조회는 서로 독립적이라 병렬로 실행(예전엔 순차 await라 왕복 지연이 2배로 쌓였음 → 채팅 로딩이 느려 씹힘 창이 컸음)
  var profMsg=await Promise.all([
    partnerIds.length?window.supabase.from("profiles").select("id,nickname,avatar_url").in("id",partnerIds):Promise.resolve({data:[]}),
    convIds.length?window.supabase.from("messages").select("conversation_id,sender_id,content,is_read,created_at,commission_id,image_url").in("conversation_id",convIds).order("created_at",{ascending:true}):Promise.resolve({data:[]})
  ]);
  var profRes=profMsg[0],msgRes=profMsg[1];
  var nickById={},avaById={};(profRes.data||[]).forEach(function(p){nickById[p.id]=p.nickname;avaById[p.id]=p.avatar_url;});

  var lastMsgByConv={},unreadByConv={};
  (msgRes.data||[]).forEach(function(m){
    lastMsgByConv[m.conversation_id]=m;
    if(m.sender_id!==AUTH.user.id&&!m.is_read)unreadByConv[m.conversation_id]=(unreadByConv[m.conversation_id]||0)+1;
  });

  chatListCache={convs:convs,partnerIds:partnerIds,nickById:nickById,avaById:avaById,lastMsgByConv:lastMsgByConv,unreadByConv:unreadByConv}; // 다음 재방문 시 즉시 표시용
  if(mySeq!==navSeq)return; // 로딩이 끝났지만 그새 다른 탭으로 이동함 → 채팅으로 화면을 덮어쓰지 않음
  renderChatList(convs,partnerIds,nickById,avaById,lastMsgByConv,unreadByConv);
}
function chatListDate(iso){
  if(!iso)return"";
  var d=new Date(iso),now=new Date();
  if(d.toDateString()===now.toDateString()){
    var hh=d.getHours(),ampm=hh<12?"오전":"오후",h12=hh%12||12;
    return ampm+" "+h12+":"+String(d.getMinutes()).padStart(2,"0");
  }
  if(d.getFullYear()===now.getFullYear())return (d.getMonth()+1)+"월 "+d.getDate()+"일";
  return d.getFullYear()+". "+(d.getMonth()+1)+". "+d.getDate();
}
function renderChatList(convs,partnerIds,nickById,avaById,lastMsgByConv,unreadByConv){
  var h='<div class="chatlist">'+
    '<div class="chatlist-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>'+
      '<input id="chatSearchInput" placeholder="채팅방, 대화내용 검색" oninput="filterChatList(this.value)"></div>';
  if(!convs.length){
    h+='<div class="pf-empty">아직 채팅한 사람이 없어요.<br>회원 프로필에서 "채팅하기"로 시작해보세요.</div>';
  }else{
    h+='<div class="chatlist-rows" id="chatlistRows">';
    convs.forEach(function(c,i){
      var pid=partnerIds[i];
      var name=nickById[pid]||"알 수 없음";
      var last=lastMsgByConv[c.id];
      var preview=last?(last.commission_id?"🎨 커미션 문의":(last.image_url?"📷 사진":last.content)):"";
      var unread=unreadByConv[c.id]||0;
      var srch=(name+" "+(last?last.content:"")).toLowerCase();
      h+='<div class="clist-row" data-search="'+esc(srch)+'" onclick="openChat(\''+cmQ(pid)+'\')">'+
        '<div class="clist-ava">'+avatarHTML(name,avaById&&avaById[pid])+'</div>'+
        '<div class="clist-mid"><div class="clist-name">'+esc(name)+'</div>'+
          '<div class="clist-last">'+esc(preview)+'</div></div>'+
        '<div class="clist-right"><div class="clist-date">'+(last?chatListDate(last.created_at):"")+'</div>'+
          (unread>0?'<span class="clist-unread">'+unread+'</span>':'')+'</div>'+
      '</div>';
    });
    h+='</div>';
  }
  h+='</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
function filterChatList(q){
  q=(q||"").trim().toLowerCase();
  var rows=document.querySelectorAll("#chatlistRows .clist-row");
  for(var i=0;i<rows.length;i++){
    var s=rows[i].getAttribute("data-search")||"";
    rows[i].style.display=(!q||s.indexOf(q)>=0)?"":"none";
  }
}
function renderChatView(partnerName,messages){
  var el=document.getElementById("chatRoom");
  if(!el)return;
  el.innerHTML=
    '<div class="cr-top">'+
      '<button class="cr-back" onclick="screenBack()" aria-label="뒤로"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>'+
      '<div class="cr-title">'+esc(partnerName)+'</div>'+
      '<button class="cr-report" onclick="reportChat()" aria-label="신고"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg></button>'+
    '</div>'+
    '<div id="chatMessages" class="cr-msgs">'+chatMessagesHtml(messages)+'</div>'+
    '<div class="cr-inputrow">'+
      '<button class="cr-icon" id="chatAttachBtn" style="display:'+(_chatImgSupported?'':'none')+'" onclick="pickChatImage()" aria-label="사진 보내기"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>'+
      '<textarea id="chatInput" rows="1" placeholder="메시지를 입력하세요." oninput="autoGrowChatInput(this)" onkeydown="if(event.key===\'Enter\'&&!event.shiftKey){event.preventDefault();sendChatMessage();}"></textarea>'+
      '<button class="cr-send" onclick="sendChatMessage()" aria-label="전송"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></button>'+
    '</div>'+
    '<div class="emo-strip chat" id="chatEmoStrip">'+emoStripHTML("chatInput")+'</div>';
  el.classList.add("open");
  lockBodyForChat();
  fitChatRoom();
  autoGrowChatInput(document.getElementById("chatInput"));
  if(window.visualViewport&&!chatRoomVpListener){
    chatRoomVpListener=fitChatRoom;
    window.visualViewport.addEventListener("resize",chatRoomVpListener);
    window.visualViewport.addEventListener("scroll",chatRoomVpListener);
  }
  var box=document.getElementById("chatMessages");
  if(box)box.scrollTop=box.scrollHeight;
}
/* ── 채팅 이미지 첨부 ──
   messages.image_url 칸이 있어야 동작한다. 없는 환경에서 눌렀다 실패하지 않도록
   한 번만 확인해서 '+' 버튼 자체를 숨긴다(SQL을 실행하면 자동으로 나타남). */
var _chatImgSupported=null;
async function chatImageSupported(){
  if(_chatImgSupported!==null)return _chatImgSupported;
  try{
    var r=await window.supabase.from("messages").select("image_url").limit(1);
    _chatImgSupported=!r.error;
  }catch(e){_chatImgSupported=false;}
  return _chatImgSupported;
}
/* 사진 원본 보기 — 말풍선 속 이미지는 작게 나오므로 눌러서 크게 볼 수 있게 한다 */
function openImageViewer(url){
  var v=document.getElementById("imgViewer"),im=document.getElementById("imgViewerImg");
  if(!v||!im||!url)return;
  im.src=url;
  v.classList.add("open");
  document.body.style.overflow="hidden";
}
function closeImageViewer(){
  var v=document.getElementById("imgViewer"),im=document.getElementById("imgViewerImg");
  if(v)v.classList.remove("open");
  if(im)im.src="";               // 큰 이미지를 메모리에 물고 있지 않게
  document.body.style.overflow="";
}
function pickChatImage(){
  if(!currentConversationId||!AUTH.user){toast("채팅방을 먼저 열어주세요");return;}
  document.getElementById("chatImgFile").click();
}
async function onChatImageFile(ev){
  var f=ev.target.files&&ev.target.files[0];ev.target.value="";
  if(!f)return;
  if(!currentConversationId||!AUTH.user)return;
  if(ALLOWED_IMAGE_TYPES.indexOf(f.type)===-1){toast("이미지 파일만 보낼 수 있어요");return;}
  if(f.size>MAX_IMAGE_BYTES){toast("40MB 이하만 보낼 수 있어요");return;}
  toast("사진 보내는 중…");
  // GIF는 움직임이 깨지니 원본 그대로, 나머지는 줄여서 보낸다
  var blob=f;
  if(f.type!=="image/gif"){
    try{var c=await compressImage(f);blob=c.blob;}catch(e){}
  }
  var url=await uploadToStorage(blob,"chat");
  if(!url)return;
  var payload={conversation_id:currentConversationId,sender_id:AUTH.user.id,content:"",image_url:url};
  var res=await window.supabase.from("messages").insert(payload);
  if(res.error){toast("전송 실패: "+res.error.message);return;}
  await refreshChatRoom();
}

async function sendChatMessage(){
  var inp=document.getElementById("chatInput");
  var v=inp.value.trim();
  if(!v||!currentConversationId||!AUTH.user)return;
  inp.disabled=true;
  var payload={conversation_id:currentConversationId,sender_id:AUTH.user.id,content:v};
  var usingRef=cmPendingChatRef&&cmPendingChatRef.conversationId===currentConversationId;
  if(usingRef)payload.commission_id=cmPendingChatRef.commissionId;
  var res=await window.supabase.from("messages").insert(payload);
  inp.disabled=false;
  if(res.error){toast("전송 실패: "+res.error.message);return;}
  if(usingRef)cmCancelChatRef();
  window.supabase.from("conversations").update({last_message_at:new Date().toISOString()}).eq("id",currentConversationId).then(function(){});
  inp.value="";
  autoGrowChatInput(inp); // 전송 후 입력창을 한 줄 높이로 복귀
  var msgRes=await window.supabase.from("messages").select("*").eq("conversation_id",currentConversationId).order("created_at",{ascending:true});
  var box=document.getElementById("chatMessages");
  if(box){
    await ensureChatEmoticons(msgRes.data||[]);
    box.innerHTML=chatMessagesHtml(msgRes.data||[]);box.scrollTop=box.scrollHeight;
  }
}

/* ---------- 등급 시스템 (점수·등급은 서버 트리거가 계산 — profiles.score/level 그대로 신뢰) ---------- */
var LEVEL_THRESHOLDS=[]; // {level,min_score,name}[], loadRealPosts()에서 DB로부터 채워짐 — 기준을 바꾸려면 level_thresholds 테이블만 수정하면 됨
function levelName(lv){
  var t=LEVEL_THRESHOLDS.find(function(x){return x.level===lv});
  return t?t.name:"새싹";
}
function levelBadgeHtml(lv,extraClass){
  if(!lv)return "";
  var t=LEVEL_THRESHOLDS.find(function(x){return x.level===lv});
  if(!t)return "";
  return '<span class="pf-lv'+(extraClass?" "+extraClass:"")+'">'+esc(t.emoji||"")+' '+esc(t.name)+'</span>';
}
function levelProgress(score,level){
  var sorted=LEVEL_THRESHOLDS.slice().sort(function(a,b){return a.level-b.level});
  var cur=sorted.find(function(x){return x.level===level});
  var next=sorted.find(function(x){return x.level===level+1});
  if(!next)return{pct:100,remain:0,nextName:null,maxed:true};
  var span=next.min_score-(cur?cur.min_score:0);
  var progressed=score-(cur?cur.min_score:0);
  var pct=span>0?Math.max(0,Math.min(100,Math.round(progressed/span*100))):100;
  return{pct:pct,remain:Math.max(0,next.min_score-score),nextName:next.name,maxed:false};
}
async function refreshMyProfile(){
  if(!AUTH.user||!window.supabase)return;
  var res=await window.supabase.from("profiles").select("*").eq("id",AUTH.user.id).single();
  if(!res.error)AUTH.profile=res.data;
}
var SCORE_EVENT_LABELS={post_create:"글 작성",comment_create:"댓글 작성",like_received:"글이 추천받음",helpful_received:"댓글이 도움돼요 받음"};
async function openScoreLog(){
  if(!AUTH.user||!window.supabase)return;
  enterScreen("scoreLog",openProfile); // 뒤로가기가 프로필로 정확히 복귀하도록 히스토리 남김
  document.getElementById("main").innerHTML='<div class="profile"><p style="padding:40px 0;text-align:center;color:var(--muted)">불러오는 중...</p></div>';
  var res=await window.supabase.from("score_log").select("*").eq("user_id",AUTH.user.id).order("created_at",{ascending:false}).limit(100);
  if(res.error){toast("불러오기 실패: "+res.error.message);return;}
  renderScoreLog(res.data||[]);
}
function renderScoreLog(rows){
  var h='<div class="profile">'+
    '<button class="d-back" onclick="screenBack()">← 내 정보로</button>'+
    '<div class="pf-sec">포인트 내역</div>';
  if(!rows.length){
    h+='<div class="pf-empty">아직 받은 점수가 없어요.</div>';
  }else{
    h+='<div class="list">';
    rows.forEach(function(r){
      var label=SCORE_EVENT_LABELS[r.event]||r.event;
      h+='<div class="post rip"><div class="pmain"><div class="ptitle">'+esc(label)+'</div>'+
        '<div class="pmeta"><span class="mt">'+timeAgo(r.created_at)+'</span></div></div>'+
        '<div class="pcmt"><span class="cn" style="color:var(--brand)">+'+r.amount+'</span><span class="cl">점</span></div></div>';
    });
    h+='</div>';
  }
  h+='</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
async function openLeaderboard(period){
  period=(period==="month")?"month":"week";
  closeNotif();
  document.getElementById("main").innerHTML='<div class="profile"><p style="padding:40px 0;text-align:center;color:var(--muted)">불러오는 중...</p></div>';
  if(!window.supabase){toast("사용할 수 없어요");return;}
  var days=period==="month"?30:7;
  var res=await window.supabase.rpc("get_score_leaderboard",{p_days:days,p_limit:10});
  if(res.error){toast("불러오기 실패: "+res.error.message);return;}
  renderLeaderboard(res.data||[],period);
}
function renderLeaderboard(rows,period){
  var h='<div class="profile">'+
    '<button class="d-back" onclick="renderList()">← 목록으로</button>'+
    '<div class="pf-sec">🏆 포인트 랭킹</div>'+
    '<div style="display:flex;gap:8px;margin-bottom:14px">'+
      '<button class="d-act'+(period==="week"?" liked":"")+'" onclick="openLeaderboard(\'week\')">이번 주</button>'+
      '<button class="d-act'+(period==="month"?" liked":"")+'" onclick="openLeaderboard(\'month\')">이번 달</button>'+
    '</div>';
  if(!rows.length){
    h+='<div class="pf-empty">아직 순위가 없어요.</div>';
  }else{
    h+='<div class="chat-room-list">';
    rows.forEach(function(r,i){
      h+='<div class="chat-room-row" style="cursor:pointer" onclick="openUserProfile(\''+r.user_id+'\')">'+
        '<div class="pf-ava" style="width:40px;height:40px;font-size:15px;flex-shrink:0;position:relative">'+avatarHTML(r.nickname,r.avatar_url)+'<span class="rank-badge">'+(i+1)+'</span></div>'+
        '<div class="chat-room-info"><div class="chat-room-name">'+esc(r.nickname)+levelBadgeHtml(r.level,"lv-badge")+'</div></div>'+
        '<div class="chat-room-meta" style="color:var(--brand);font-weight:800">'+r.total_points+'점</div>'+
      '</div>';
    });
    h+='</div>';
  }
  h+='</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
function openProfile(){
  curTab="me";navSeq++;
  userLeftHome=true;
  resetScreens();
  leaveChat();
  closeNotif();
  if(!AUTH.user){
    if(!authReady){
      // 세션 확인이 아직 안 끝남 — 로그인돼 있는데 로그아웃 화면이 잠깐 뜨는 걸 막기 위해 로딩 표시
      document.getElementById("main").innerHTML=
        '<div class="profile" id="myProfileView" data-auth="loading"><div class="empty" style="color:var(--muted)">불러오는 중…</div></div>';
      syncTabs("me");return;
    }
    document.getElementById("main").innerHTML=
      '<div class="profile" id="myProfileView" data-auth="out"><div class="empty"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>'+
      '<h3>로그인이 필요해요</h3><p>로그인하면 내 닉네임으로 글을 쓰고 활동을 볼 수 있어요.</p>'+
      '<button onclick="loginWithGoogle()">로그인하기</button></div></div>';
    syncTabs("me");window.scrollTo({top:0,behavior:"smooth"});
    return;
  }
  // 이미 내 정보 화면이면 캐시로 다시 안 그림(스크롤만) → refreshProfile이 내용 바뀐 경우에만 한 번 그림.
  // 다른 화면에서 왔으면 캐시로 즉시 렌더.
  // 이미 '로그인된 내 정보'가 그려져 있을 때만 다시 안 그림.
  // (로그아웃·로딩 화면도 같은 id를 쓰기 때문에 data-auth로 구분 — 안 그러면 로그인 직후에도 옛 화면이 남음)
  var _pv=document.getElementById("myProfileView");
  if(_pv&&_pv.getAttribute("data-auth")==="in"){syncTabs("me");pfScrollAfterRender();}
  else renderMyProfile();
  refreshProfile();
}
// 내 정보 화면을 실제로 그리는 부분(캐시 데이터 기준). openProfile/refreshProfile 양쪽에서 호출.
function renderMyProfile(){
  if(!AUTH.user)return;
  var mine=POSTS.filter(function(p){return p.author==="나"||(AUTH.user&&p.authorId===AUTH.user.id)});
  var commented=POSTS.filter(function(p){return p.author!=="나"&&p.comments.some(function(c){return c.n==="나"})});
  var likedArr=POSTS.filter(function(p){return p._liked});
  var recent=[];Array.from(READ).reverse().forEach(function(id){var p=POSTS.find(function(x){return x.id===id});if(p)recent.push(p)});
  recent=recent.slice(0,10);
  var likeSum=mine.reduce(function(a,p){return a+p.likes},0);
  var cmSum=mine.reduce(function(a,p){return a+p.comments.length},0);
  var myScore=AUTH.profile?(AUTH.profile.score||0):0;
  var myLevel=AUTH.profile?(AUTH.profile.level||1):1;
  var lvName=levelName(myLevel);
  var prog=levelProgress(myScore,myLevel);
  var myReviewStats=pfReviewStats(AUTH.user.id,ME.nick);
  var h='<div class="profile" id="myProfileView" data-auth="in">';
  // 화면 제목 + 알림 (참고 디자인의 상단 구조)
  h+='<div class="pf-pagetop"><h1>내 정보</h1>'+
     '<button type="button" class="pf-bell" aria-label="알림" onclick="toggleNotif(event)">'+
     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg></button></div>';
  h+=pfHeroHTML({nickname:ME.nick,level:myLevel,avatar_url:AUTH.profile&&AUTH.profile.avatar_url,
    cover_url:AUTH.profile&&AUTH.profile.cover_url,bio:AUTH.profile&&AUTH.profile.bio,
    sns_twitter:AUTH.profile&&AUTH.profile.sns_twitter,sns_instagram:AUTH.profile&&AUTH.profile.sns_instagram,sns_email:AUTH.profile&&AUTH.profile.sns_email},
    true,myReviewStats,null);
  // 내 공개 프로필 보기 (포스타입식 '프로필 보기' 링크)
  h+='<button type="button" class="pf-viewpublic" onclick="openUserProfile(\''+AUTH.user.id+'\')"><span>내 공개 프로필 보기</span>'+
     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>';
  h+='<div class="pf-follow-bar" id="pfFollowBar"></div>'; // 팔로잉/팔로워 수(비동기 채움)
  // 등급 진행바
  h+='<div class="pf-progress"><div class="pp-row"><span>'+lvName+'</span><span>'+
     (prog.maxed?'최고 등급 달성! 🎉':('다음 등급('+prog.nextName+')까지 '+prog.remain+'점'))+'</span></div>'+
     '<div class="pp-bar"><div class="pp-fill" style="width:'+prog.pct+'%"></div></div></div>';
  // 통계 3개. 광고 포인트는 광고 낼 때만 쓰는 값이라 상단에서 빼고 [내 활동]으로 옮겼다.
  h+='<div class="pf-stats">'+
     '<div class="pf-st"><b>'+myScore+'</b><span>활동 점수</span></div>'+
     '<div class="pf-st"><b>'+likeSum+'</b><span>받은 추천</span></div>'+
     '<div class="pf-st"><b>'+cmSum+'</b><span>받은 댓글</span></div></div>';
  // 고정한 글 + 받은 후기(콘텐츠)
  h+=pinnedPostCardHTML(AUTH.profile?AUTH.profile.pinned_post_id:null);
  if(pfReviewsForUserId!==AUTH.user.id){pfReviewsExpanded=false;pfReviewsForUserId=AUTH.user.id;}
  h+=pfReviewListHTML(pfArtistReviewList(AUTH.user.id,ME.nick),AUTH.user.id);
  // ===== 메뉴 (포스타입식 섹션: 소제목 + 한 줄에 하나씩) =====
  h+=pfSection('내 글','내가 쓴 글과 반응을 확인해요','<div class="pf-tiles">'+
     pfTile(pfMiniIcon('<path d="M4 20h4L20 8l-4-4L4 16v4z"/><path d="M14 6l4 4"/>'),'쓴 글','내가 올린 글',"openPfList('mine')",mine.length)+
     pfTile(pfMiniIcon('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),'댓글 단 글','내가 남긴 훈수',"openPfList('cm')",commented.length)+
     pfTile(pfMiniIcon('<path d="M12 20s-7-4.5-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5c0 5-7 9.5-7 9.5z"/>'),'좋아요','내가 누른 글',"openPfList('liked')",likedArr.length)+
     pfTile(pfMiniIcon('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>'),'최근 본 글','다시 찾아보기',"openPfList('recent')",recent.length)+
     '</div>');
  h+=pfSection('내 활동','커미션·채팅·이모티콘을 관리해요','<div class="pf-tiles">'+
     pfTile(pfMiniIcon('<path d="M8 12l3 3 5-5"/><path d="M3 10l5-5 4 3 4-3 5 5-6 8H9z"/>'),'내 커미션','등록·신청 관리',"cmOpenMy()")+
     pfTile(pfMiniIcon('<path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8 8.38 8.38 0 0 1 8.5-8.5 8.5 8.5 0 0 1 8.5 8.5z"/>'),'채팅','주고받은 대화',"openChatList('profile')")+
     pfTile(pfMiniIcon('<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/>'),'이모티콘','담기·만들기',"openEmoticonMarket()")+
     pfTile(pfMiniIcon('<circle cx="12" cy="12" r="9"/><path d="M12 8v8M9 12h6"/>'),'포인트','광고 P '+(AUTH.profile?(AUTH.profile.ad_points||0):0),"openScoreLog()")+
     '</div>');
  h+=pfSection('알림','받고 싶은 알림만 골라서 켜요',notifEnableHTML()+
     '<label class="pf-toggle-row"><span class="pf-item-label">내 글에 댓글이 달리면 알림</span><input type="checkbox" '+(SETTINGS.cm?'checked':'')+' onchange="toggleNotifPref(\'cm\',this.checked,\'댓글\')"></label>'+
     '<label class="pf-toggle-row"><span class="pf-item-label">좋아요 알림</span><input type="checkbox" '+(SETTINGS.like?'checked':'')+' onchange="toggleNotifPref(\'like\',this.checked,\'좋아요\')"></label>'+
     '<label class="pf-toggle-row"><span class="pf-item-label">공지·챌린지 알림</span><input type="checkbox" '+(SETTINGS.notice?'checked':'')+' onchange="toggleNotifPref(\'notice\',this.checked,\'공지\')"></label>'+
     '<label class="pf-toggle-row"><span class="pf-item-label">채팅 알림</span><input type="checkbox" '+(SETTINGS.chat?'checked':'')+' onchange="toggleNotifPref(\'chat\',this.checked,\'채팅\')"></label>'+
     '<label class="pf-toggle-row"><span class="pf-item-label">커미션 문의 알림</span><input type="checkbox" '+(SETTINGS.cminquiry?'checked':'')+' onchange="toggleNotifPref(\'cminquiry\',this.checked,\'커미션 문의\')"></label>'
     ,'notifSettingsSec');
  h+=pfSection('설정','프로필과 계정 정보를 관리해요',
     pfRow(pfMiniIcon('<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>'),'닉네임 변경',"openNickModal()",{})+
     pfRow(pfMiniIcon('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),'복구용 이메일',"openRecoveryEmail()",{}));
  h+=pfSection('약관','서비스 약관과 개인정보 처리방침을 확인해요',
     pfRow(pfMiniIcon('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>'),'이용약관',"location.href='/terms'",{})+
     pfRow(pfMiniIcon('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),'개인정보처리방침',"location.href='/privacy'",{}));
  if(AUTH.profile&&AUTH.profile.is_admin){
    var suspN=(function(){var n=reviewSuspicionCountSync();return n?' <span class="pf-item-badge">'+n+'</span>':'';})();
    h+='<div class="pf-group"><div class="pf-group-title">🛡 관리자</div>'+
       pfRow(pfMiniIcon('<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/>'),'신고 목록',"openAdminReports()",{})+
       pfRow(pfMiniIcon('<path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8 8.38 8.38 0 0 1 8.5-8.5 8.5 8.5 0 0 1 8.5 8.5z"/>'),'전체 채팅 목록',"openAdminChatList()",{})+
       pfRow(pfMiniIcon('<path d="M3 3v18h18"/><path d="M7 14l3-3 3 3 4-5"/>'),'광고 심사',"openAdminAdReview()",{})+
       pfRow(pfMiniIcon('<path d="M3 3v18h18"/><path d="M7 14l3-3 3 3 4-5"/>'),'전체 광고 목록',"openAdminAdList()",{})+
       pfRow(pfMiniIcon('<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>'),'유료 광고 관리',"openAdminCampaigns()",{})+
       pfRow(pfMiniIcon('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),'후기 분석'+suspN,"openReviewAnalysis()",{})+
       pfRow(pfMiniIcon('<path d="M9 3v6l-4 4v8h14v-8l-4-4V3z"/>'),'매니저 픽 관리',"openManagerPickList()",{})+
       pfRow(pfMiniIcon('<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>'),'삭제 기록',"openAdminDeletionLog()",{})+
       pfRow(pfMiniIcon('<path d="M3 3v18h18"/><path d="M7 15l3-4 3 2 4-6"/><circle cx="17" cy="7" r="1.6"/>'),'광고 성과',"openAdminMkt()",{})+
       pfRow(pfMiniIcon('<path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6"/><path d="M16 3l5 5-9 9H7v-5z"/>'),'커미션 추천 관리',"openAdminCommissionMgmt()",{})+
       pfRow(pfMiniIcon('<path d="M12 2l2.4 7.4H22l-6 4.3 2.3 7.3-6.3-4.6-6.3 4.6 2.3-7.3-6-4.3h7.6z"/>'),'추천 점수 조정 기록',"openCommissionBonusLog()",{})+
       '</div>';
  }
  h+='</div>';
  h+='<div class="pf-bottom"><button type="button" class="pf-logout" onclick="logout()">로그아웃</button>'+
     '<button type="button" class="pf-withdraw" onclick="openWithdraw()">회원 탈퇴</button></div>';
  document.getElementById("main").innerHTML=h;
  syncTabs("me");pfScrollAfterRender();
  loadFollowBar(AUTH.user.id);
  pfBookmarkCount(AUTH.user.id).then(function(n){
    var el=document.getElementById("pfhBmCount");
    if(el)el.textContent=n;
  });
}
// 내 정보 내용(점수/등급/광고포인트, 내 글 수, 받은 후기 수)이 바뀌었는지 판단용 서명
function profileSignature(){
  var p=AUTH.profile||{}; var uid=AUTH.user&&AUTH.user.id;
  var posts=POSTS.filter(function(x){return x.dbId&&x.authorId===uid;}).length;
  var reviews=POSTS.filter(function(x){return x.dbId&&x.board==='review'&&x.reviewedUserId===uid;}).length;
  return (p.score||0)+"."+(p.level||0)+"."+(p.ad_points||0)+"|"+posts+"|"+reviews;
}
// 내 프로필(AUTH.profile)과 글/후기(POSTS)를 다시 불러와, 내 정보 화면을 보고 있고 내용이 바뀐 경우에만 한 번 다시 그림.
async function refreshProfile(){
  if(!window.supabase||profileRefreshing||!AUTH.user)return;
  if(Date.now()-postsLoadedAt<REFRESH_THROTTLE_MS)return; // 홈에서 방금 불러왔으면 내 정보 진입 시 재조회 생략
  profileRefreshing=true;
  var before=profileSignature();
  try{await refreshMyProfile();await loadRealPosts(true);}catch(e){} // loadRealPosts(true)=피드는 안 그림
  profileRefreshing=false;
  if(curTab==="me"&&document.getElementById("myProfileView")&&profileSignature()!==before)renderMyProfile();
}
// "알림 설정" 딥링크(시스템 알림 클릭 → /?notif=settings) 처리: 내 정보를 열고 알림 설정 섹션으로 스크롤
function handleNotifSettingsDeeplink(){
  var params;
  try{params=new URLSearchParams(location.search);}catch(e){return;}
  if(params.get("notif")!=="settings")return;
  history.replaceState({},"","/");        // 파라미터 정리(새로고침·공유 시 재실행 방지)
  if(!AUTH.user)return;                     // 비로그인이면 스킵(로그인 후 내 정보에서 설정 가능)
  notifDeeplinkPending=true;
  openProfile();
  setTimeout(function(){notifDeeplinkPending=false;},2200); // 이 시간 동안의 렌더는 알림 설정으로 스크롤
}
// 프로필 렌더 직후 스크롤: 알림 설정 딥링크 중이면 그 섹션으로, 아니면 맨 위로
function pfScrollAfterRender(){
  if(notifDeeplinkPending){
    var ns=document.getElementById("notifSettingsSec");
    if(ns){ns.scrollIntoView({behavior:"smooth",block:"start"});return;}
  }
  window.scrollTo({top:0,behavior:"smooth"});
}
function pfScrollToFollowing(){var el=document.getElementById("pfFollowingSec");if(el)el.scrollIntoView({behavior:"smooth",block:"start"});}
/* ===== SNS식 팔로잉/팔로워 수 + 목록 모달 ===== */
async function getFollowCounts(userId){
  var g=await window.supabase.from("follows").select("*",{count:"exact",head:true}).eq("follower_id",userId);
  var r=await window.supabase.from("follows").select("*",{count:"exact",head:true}).eq("followee_id",userId);
  return {following:(g.count||0), followers:(r.count||0)};
}
// 프로필의 '팔로잉 N · 팔로워 N' 바를 비동기로 채움(두 프로필 공용)
var _followBarUserId=null; // 현재 보고 있는 프로필의 userId(모달에서 팔로우 토글 후 수 갱신용)
async function loadFollowBar(userId){
  var bar=document.getElementById("pfFollowBar"); if(!bar||!window.supabase||!userId)return;
  _followBarUserId=userId;
  var c=await getFollowCounts(userId);
  if(!document.getElementById("pfFollowBar"))return; // 그새 화면 이동
  bar.innerHTML=
    '<div class="pf-fb" onclick="openFollowList(\''+esc(userId)+'\',\'following\')"><b>'+c.following+'</b><span>팔로잉</span></div>'+
    '<div class="pf-fb" onclick="openFollowList(\''+esc(userId)+'\',\'followers\')"><b>'+c.followers+'</b><span>팔로워</span></div>';
}
// 목록 모달: tab='following'(그 사람이 팔로우한 사람들) / 'followers'(그 사람을 팔로우한 사람들)
async function openFollowList(userId,tab){
  var modal=document.getElementById("followListModal"); if(!modal||!window.supabase)return;
  document.getElementById("followModalTitle").textContent=(tab==="followers"?"팔로워":"팔로잉");
  document.getElementById("followModalList").innerHTML='<div class="follow-modal-msg">불러오는 중…</div>';
  modal.classList.add("open");document.body.style.overflow="hidden";
  var joinCol=(tab==="followers")?"follower_id":"followee_id";   // 화면에 보여줄 사람
  var filterCol=(tab==="followers")?"followee_id":"follower_id"; // 기준 사용자
  var res=await window.supabase.from("follows")
    .select("profiles:"+joinCol+"(id,nickname,avatar_url,level)")
    .eq(filterCol,userId).order("created_at",{ascending:false});
  var listEl=document.getElementById("followModalList"); if(!listEl)return;
  if(res.error){listEl.innerHTML='<div class="follow-modal-msg">불러오지 못했어요</div>';return;}
  var users=(res.data||[]).map(function(r){return r.profiles;}).filter(Boolean);
  if(!users.length){listEl.innerHTML='<div class="follow-modal-msg">'+(tab==="followers"?"아직 팔로워가 없어요":"아직 팔로우한 사람이 없어요")+'</div>';return;}
  var meId=AUTH.user?AUTH.user.id:null;
  listEl.innerHTML=users.map(function(u){
    // 로그인 상태 + 내가 아닐 때만 팔로우/언팔로우 버튼(내 팔로우 상태 반영)
    var btn=(meId&&u.id!==meId)
      ? '<button class="follow-item-btn'+(FOLLOW.has(u.id)?' following':'')+'" onclick="event.stopPropagation();toggleFollowFromList(\''+esc(u.id)+'\',\''+esc(u.nickname)+'\',this)">'+(FOLLOW.has(u.id)?'팔로잉':'＋ 팔로우')+'</button>'
      : '';
    return '<div class="follow-item" onclick="closeFollowList();openUserProfile(\''+esc(u.id)+'\')">'+
      '<div class="follow-item-ava">'+avatarHTML(u.nickname,u.avatar_url)+'</div>'+
      '<div class="follow-item-info"><span class="follow-item-nick">'+esc(u.nickname)+'</span>'+levelBadgeHtml(u.level,"lv-badge")+'</div>'+
      btn+
    '</div>';
  }).join("");
}
// 목록에서 팔로우/언팔로우(로그인 필수, 서버 저장). 버튼 즉시 갱신 + 프로필 숫자 갱신.
async function toggleFollowFromList(userId,nickname,btnEl){
  if(!AUTH.user){toast("로그인 후 팔로우할 수 있어요","🔒");loginWithGoogle();return;}
  if(userId===AUTH.user.id||!window.supabase)return;
  var following=FOLLOW.has(userId);
  if(btnEl)btnEl.disabled=true;
  if(following){
    var del=await window.supabase.from("follows").delete().eq("follower_id",AUTH.user.id).eq("followee_id",userId);
    if(del.error){toast("처리 실패: "+del.error.message);if(btnEl)btnEl.disabled=false;return;}
    FOLLOW.delete(userId);
  }else{
    var ins=await window.supabase.from("follows").insert({follower_id:AUTH.user.id,followee_id:userId});
    if(ins.error){toast("처리 실패: "+ins.error.message);if(btnEl)btnEl.disabled=false;return;}
    FOLLOW.add(userId);if(nickname)FOLLOW_NAME[userId]=nickname;
  }
  var nowF=FOLLOW.has(userId);
  if(btnEl){btnEl.disabled=false;btnEl.classList.toggle("following",nowF);btnEl.textContent=nowF?"팔로잉":"＋ 팔로우";}
  if(_followBarUserId)loadFollowBar(_followBarUserId); // 프로필의 팔로잉/팔로워 수 갱신
}
function closeFollowList(){var m=document.getElementById("followListModal");if(m)m.classList.remove("open");document.body.style.overflow="";}
async function unfollowFromProfile(uid){
  if(!AUTH.user||!window.supabase)return;
  var del=await window.supabase.from("follows").delete().eq("follower_id",AUTH.user.id).eq("followee_id",uid);
  if(del.error){toast("처리 실패: "+del.error.message);return;}
  var nm=FOLLOW_NAME[uid]||"회원";
  FOLLOW.delete(uid);
  toast(dispName(nm)+"님 팔로우를 취소했어요");openProfile();
}
async function openAdminReports(){
  var res=await window.supabase.from("reports").select("*").eq("resolved",false).order("created_at",{ascending:false});
  if(res.error){toast("불러오기 실패: "+res.error.message);return;}
  var reports=res.data;
  // 긴급 신고(불법촬영물·아동성착취물)를 맨 위로 올린다 — 시간순만으로는 묻히기 때문
  reports.sort(function(a,b){
    var ua=_isUrgentReport(a)?0:1, ub=_isUrgentReport(b)?0:1;
    if(ua!==ub)return ua-ub;
    return new Date(b.created_at)-new Date(a.created_at);
  });
  var postIds=Array.from(new Set(reports.filter(function(r){return r.post_id}).map(function(r){return r.post_id})));
  var postRes=postIds.length?await window.supabase.from("posts").select("id,title,board,blinded").in("id",postIds):{data:[]};
  var postById={};(postRes.data||[]).forEach(function(pr){postById[pr.id]=pr;});
  var cmIds=Array.from(new Set(reports.filter(function(r){return r.commission_id}).map(function(r){return r.commission_id})));
  var cmRes2=cmIds.length?await window.supabase.from("commissions").select("id,title,author_id").in("id",cmIds):{data:[]};
  var cmById={};(cmRes2.data||[]).forEach(function(c){cmById[c.id]=c;});
  var emoIds=Array.from(new Set(reports.filter(function(r){return r.emoticon_pack_id}).map(function(r){return r.emoticon_pack_id})));
  var emoRes=emoIds.length?await window.supabase.from("emoticon_packs").select("id,title,author_id").in("id",emoIds):{data:[]};
  var emoById={};(emoRes.data||[]).forEach(function(e){emoById[e.id]=e;});
  var adIds=Array.from(new Set(reports.filter(function(r){return r.ad_id}).map(function(r){return r.ad_id})));
  var adRes=adIds.length?await window.supabase.from("user_ads").select("id,user_id,image_url,status,linked_post_id,linked_commission_id").in("id",adIds):{data:[]};
  var adById={};(adRes.data||[]).forEach(function(a){adById[a.id]=a;});
  var reportedUserIds=Array.from(new Set(reports.filter(function(r){return r.reported_user_id}).map(function(r){return r.reported_user_id})));
  var adUserIds=(adRes.data||[]).map(function(a){return a.user_id});
  reportedUserIds=Array.from(new Set(reportedUserIds.concat(adUserIds)));
  var profRes=reportedUserIds.length?await window.supabase.from("profiles").select("id,nickname").in("id",reportedUserIds):{data:[]};
  var nickById={};(profRes.data||[]).forEach(function(p){nickById[p.id]=p.nickname;});
  var h='<div class="profile"><div class="pf-sec">🛡 신고 목록 ('+reports.length+')</div>';
  if(!reports.length){
    h+='<div class="pf-empty">처리할 신고가 없어요.</div>';
  }else{
    h+='<div class="list">';
    reports.forEach(function(r){
      if(r.conversation_id){
        var name=nickById[r.reported_user_id]||"알 수 없음";
        h+='<div class="post rip"><div class="pmain" style="cursor:pointer" onclick="adminViewConversation('+r.conversation_id+','+r.id+',\'reports\')"><div class="ptitle">💬 채팅 신고 — '+esc(name)+'</div>'+
          '<div class="pmeta"><span class="mt">'+timeAgo(r.created_at)+'</span>'+(r.reason?'<span class="sep"></span><span class="mv">사유: '+esc(r.reason)+'</span>':'')+'</div></div>'+
          '<div style="display:flex;gap:8px;flex-shrink:0">'+
            '<button class="d-act" onclick="adminViewConversation('+r.conversation_id+','+r.id+',\'reports\')">대화 보기</button>'+
            '<button class="d-act" onclick="dismissReport('+r.id+')">무시</button>'+
          '</div></div>';
      }else if(r.commission_id){
        var cm=cmById[r.commission_id];
        h+='<div class="post rip"><div class="pmain"'+(cm?' style="cursor:pointer" onclick="cmOpenCommissionById('+r.commission_id+')"':'')+'>'+
          '<div class="ptitle">🎨 커미션 신고 — '+(cm?esc(cm.title):"(이미 삭제된 커미션)")+'</div>'+
          '<div class="pmeta"><span class="mt">'+timeAgo(r.created_at)+'</span>'+(r.reason?'<span class="sep"></span><span class="mv">사유: '+esc(r.reason)+'</span>':'')+'</div></div>'+
          '<div style="display:flex;gap:8px;flex-shrink:0">'+
            (cm?'<button class="d-act" onclick="adminDeleteReportedCommission('+r.id+','+r.commission_id+')">커미션 삭제</button>':'')+
            '<button class="d-act" onclick="dismissReport('+r.id+')">무시</button>'+
          '</div></div>';
      }else if(r.emoticon_pack_id){
        var pack=emoById[r.emoticon_pack_id];
        h+='<div class="post rip"><div class="pmain">'+
          '<div class="ptitle">🙂 이모티콘 신고 — '+(pack?esc(pack.title):"(이미 삭제된 팩)")+'</div>'+
          '<div class="pmeta"><span class="mt">'+timeAgo(r.created_at)+'</span>'+(r.reason?'<span class="sep"></span><span class="mv">사유: '+esc(r.reason)+'</span>':'')+'</div></div>'+
          '<div style="display:flex;gap:8px;flex-shrink:0">'+
            (pack?'<button class="d-act" onclick="adminDeleteReportedEmoticon('+r.id+','+r.emoticon_pack_id+')">팩 삭제</button>':'')+
            '<button class="d-act" onclick="dismissReport('+r.id+')">무시</button>'+
          '</div></div>';
      }else if(r.ad_id){
        var ad=adById[r.ad_id];
        var adName=ad?(nickById[ad.user_id]||"알 수 없음"):null;
        h+='<div class="post rip"><div class="pmain"'+(ad?' style="cursor:pointer" onclick="'+adTargetOnclick(ad)+'"':'')+'>'+
          (ad?'<img src="'+esc(ad.image_url)+'" alt="" style="width:100%;max-width:220px;height:56px;object-fit:cover;border-radius:8px;margin-bottom:6px;display:block">':'')+
          '<div class="ptitle">📢 광고 신고 — '+(ad?((ad.linked_commission_id?'🎨 ':'📝 ')+esc(adName)):"(이미 삭제된 광고)")+'</div>'+
          '<div class="pmeta"><span class="mt">'+timeAgo(r.created_at)+'</span>'+(r.reason?'<span class="sep"></span><span class="mv">사유: '+esc(r.reason)+'</span>':'')+'</div></div>'+
          '<div style="display:flex;gap:8px;flex-shrink:0">'+
            (ad&&ad.status==="active"?'<button class="d-act" onclick="adminDeleteReportedAd('+r.id+','+r.ad_id+',true)">삭제+환수</button>'+
            '<button class="d-act" onclick="adminDeleteReportedAd('+r.id+','+r.ad_id+',false)">삭제만</button>':'')+
            '<button class="d-act" onclick="dismissReport('+r.id+')">무시</button>'+
          '</div></div>';
      }else{
        var post=postById[r.post_id];
        var blinded=post&&post.blinded;
        h+='<div class="post rip"><div class="pmain"'+(post?' style="cursor:pointer" onclick="openPost('+(100000+post.id)+')"':'')+'>'+
          '<div class="ptitle">'+(blinded?'<span class="blind-tag">가림</span>':'')+(_isUrgentReport(r)?'<span class="blind-tag">⚠️ 확인 요망</span>':'')+(post?esc(post.title):"(이미 삭제된 글)")+'</div>'+
          '<div class="pmeta"><span class="mt">'+timeAgo(r.created_at)+'</span>'+(r.reason?'<span class="sep"></span><span class="mv">사유: '+esc(r.reason)+'</span>':'')+'</div></div>'+
          '<div style="display:flex;gap:8px;flex-shrink:0">'+
            (post?(blinded
              ?'<button class="d-act" onclick="adminBlindPost('+r.id+','+post.id+',false)">가림 해제</button>'
              :'<button class="d-act" onclick="adminBlindPost('+r.id+','+post.id+',true)">임시 가림</button>'):'')+
            (post?'<button class="d-act" onclick="adminDeleteReportedPost('+r.id+','+post.id+')">글 삭제</button>':'')+
            '<button class="d-act" onclick="dismissReport('+r.id+')">무시</button>'+
          '</div></div>';
      }
    });
    h+='</div>';
  }
  h+='<button class="pf-edit" onclick="openProfile()" style="margin-top:16px">내 정보로 돌아가기</button></div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
// 조치 이력 기록 — 이의신청이나 분쟁이 생겼을 때 근거가 된다. 실패해도 조치 자체는 진행.
async function _logModeration(action,postId,reportId,note){
  try{
    await window.supabase.from("moderation_log").insert({
      post_id:postId||null,report_id:reportId||null,
      actor_id:AUTH.user?AUTH.user.id:null,action:action,note:note||null
    });
  }catch(e){}
}
/* 임시조치(블라인드) — 삭제와 달리 글은 남고 작성자·운영자에게만 보인다.
   판단이 끝나기 전에 노출만 멈추는 조치라, 오신고였으면 되돌릴 수 있다.
   (정보통신망법 제44조의2가 말하는 '임시조치'에 해당) */
async function adminBlindPost(reportId,postDbId,on){
  if(on&&!(await confirmDialog("이 글을 임시로 가릴까요?\\n작성자와 운영자에게만 보이게 됩니다.")))return;
  if(!on&&!(await confirmDialog("가림을 해제할까요? 다시 모두에게 보이게 됩니다.")))return;
  var res=await window.supabase.from("posts").update(
    on?{blinded:true,blinded_at:new Date().toISOString(),blind_reason:"운영자 임시조치"}
      :{blinded:false,blinded_at:null,blind_reason:null}
  ).eq("id",postDbId);
  if(res.error){toast("처리 실패: "+res.error.message);return;}
  await _logModeration(on?"blind":"unblind",postDbId,reportId,null);
  postsLoadedAt=0; // 목록에 반영되도록 다음 이동 때 새로 불러옴
  toast(on?"글을 가렸어요":"가림을 해제했어요");
  openAdminReports();
}
async function adminDeleteReportedCommission(reportId,commissionId){
  // 커미션은 돈이 오가는 거래라 근거가 특히 중요하다 → 보관본을 남기는 RPC로 지운다.
  // (이미지 파일은 지우지 않아 보관본에서 그림이 그대로 보인다)
  var q=await adminDeleteReasonDialog();
  if(!q)return;
  if(!(await confirmDialog(q.notify?"이 커미션을 삭제할까요? 작가에게 알림이 전송돼요.":"이 커미션을 삭제할까요? (작가에게 알림을 보내지 않습니다)")))return;
  var r=await window.supabase.rpc("admin_delete_commission",{p_commission_id:commissionId,p_reason:q.reason,p_notify:q.notify});
  if(r.error){toast("삭제 실패: "+r.error.message);return;}
  var rd=r.data||{};
  if(!rd.ok){toast(rd.error==="not_admin"?"관리자만 사용할 수 있어요":("삭제할 수 없어요 ("+(rd.error||"오류")+")"));return;}
  await window.supabase.from("reports").update({resolved:true}).eq("id",reportId);
  await _logModeration("delete",null,reportId,"커미션 #"+commissionId+(q.reason?(" — "+q.reason):""));
  cmData=cmData.filter(function(c){return c.id!==commissionId;});
  toast("커미션을 삭제했어요","🗑");
  openAdminReports();
}
async function adminDeleteReportedEmoticon(reportId,packId){
  if(!(await confirmDialog("이 이모티콘 팩을 삭제할까요? 담아간 사람들에게서도 사라집니다.")))return;
  var r=await window.supabase.from("emoticon_packs").delete().eq("id",packId);
  if(r.error){toast("삭제 실패: "+r.error.message);return;}
  await window.supabase.from("reports").update({resolved:true}).eq("id",reportId);
  await _logModeration("delete",null,reportId,"이모티콘 팩 #"+packId);
  toast("이모티콘을 삭제했어요","🗑");
  await loadMyEmoticons();refreshEmoStrip();
  openAdminReports();
}
async function dismissReport(reportId){
  var res=await window.supabase.from("reports").update({resolved:true}).eq("id",reportId);
  if(res.error){toast("처리 실패: "+res.error.message);return;}
  await _logModeration("dismiss",null,reportId,null);
  toast("신고를 처리했어요");
  openAdminReports();
}
async function adminDeleteReportedPost(reportId,postDbId){
  // ⚠️ 예전엔 여기서 posts를 직접 지워 보관본이 남지 않았다. 글 상세의 관리자 삭제와 같은 RPC를 써서
  //    사유 입력과 원본 스냅샷이 똑같이 남게 한다(신고 건이야말로 나중에 이의신청이 들어온다).
  var r=await adminDeleteReasonDialog();
  if(!r)return;
  if(!(await confirmDialog(r.notify?"이 글을 삭제할까요? 작성자에게 알림이 전송돼요.":"이 글을 삭제할까요? (작성자에게 알림을 보내지 않습니다)")))return;
  var res=await window.supabase.rpc("admin_delete_post",{p_post_id:postDbId,p_reason:r.reason,p_notify:r.notify});
  if(res.error){toast("삭제 실패: "+res.error.message);return;}
  var data=res.data||{};
  if(!data.ok){toast(data.error==="not_admin"?"관리자만 사용할 수 있어요":("삭제할 수 없어요 ("+(data.error||"오류")+")"));return;}
  await window.supabase.from("reports").update({resolved:true}).eq("id",reportId);
  await _logModeration("delete",postDbId,reportId,r.reason||null);
  POSTS=POSTS.filter(function(x){return x.dbId!==postDbId});
  toast("글을 삭제했어요");
  openAdminReports();
}
async function adminDeleteReportedAd(reportId,adId,refund){
  if(!(await confirmDialog(refund?"이 광고를 삭제하고 포인트를 환수할까요?":"이 광고를 삭제할까요? (환수 없음)")))return;
  var res=await window.supabase.rpc("admin_remove_ad",{p_ad_id:adId,p_refund:refund});
  if(res.error){toast("삭제 실패: "+res.error.message);return;}
  if(reportId)await window.supabase.from("reports").update({resolved:true}).eq("id",reportId);
  ACTIVE_ADS=ACTIVE_ADS.filter(function(a){return a.id!==adId});
  toast("광고를 삭제했어요");
  if(reportId)openAdminReports();else openAdminAdList();
}
async function openAdminAdList(){
  var res=await window.supabase.from("user_ads").select("id,user_id,image_url,status,points_spent,duration_days,created_at,expires_at,linked_post_id,linked_commission_id").order("created_at",{ascending:false});
  if(res.error){toast("불러오기 실패: "+res.error.message);return;}
  var ads=res.data;
  var userIds=Array.from(new Set(ads.map(function(a){return a.user_id})));
  var profRes=userIds.length?await window.supabase.from("profiles").select("id,nickname").in("id",userIds):{data:[]};
  var nickById={};(profRes.data||[]).forEach(function(p){nickById[p.id]=p.nickname;});
  var statusLabel={active:"진행중",expired:"기간 만료",removed_by_admin:"관리자 삭제",pending:"심사 대기",rejected:"반려됨"};
  var h='<div class="profile"><div class="pf-sec">🛡 전체 광고 목록 ('+ads.length+')</div>';
  if(!ads.length){
    h+='<div class="pf-empty">등록된 광고가 없어요.</div>';
  }else{
    h+='<div class="list">';
    ads.forEach(function(a){
      var actions="";
      if(a.status==="pending"){
        actions='<button class="d-act" onclick="approveUserAd('+a.id+',\'list\')">승인</button>'+
          '<button class="d-act" onclick="rejectUserAd('+a.id+',\'list\')">거절</button>';
      }else if(a.status==="active"){
        actions='<button class="d-act" onclick="adminDeleteReportedAd(null,'+a.id+',true)">삭제+환수</button>'+
          '<button class="d-act" onclick="adminDeleteReportedAd(null,'+a.id+',false)">삭제만</button>';
      }
      h+='<div class="post rip"><div class="pmain" style="cursor:pointer" onclick="'+adTargetOnclick(a)+'">'+
        '<img src="'+esc(a.image_url)+'" alt="" style="width:100%;max-width:220px;height:56px;object-fit:cover;border-radius:8px;margin-bottom:6px;display:block">'+
        '<div class="ptitle">'+(a.linked_commission_id?'🎨 ':'📝 ')+esc(nickById[a.user_id]||"알 수 없음")+' · '+(statusLabel[a.status]||a.status)+'</div>'+
        '<div class="pmeta"><span class="mt">'+timeAgo(a.created_at)+'</span><span class="sep"></span><span class="mv">'+a.points_spent+'P · '+a.duration_days+'일</span></div></div>'+
        '<div style="display:flex;gap:8px;flex-shrink:0">'+actions+'</div></div>';
    });
    h+='</div>';
  }
  h+='<button class="pf-edit" onclick="openProfile()" style="margin-top:16px">내 정보로 돌아가기</button></div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
async function openAdminAdReview(){
  var res=await window.supabase.from("user_ads").select("id,user_id,image_url,linked_post_id,linked_commission_id,points_spent,duration_days,created_at").eq("status","pending").order("created_at",{ascending:true});
  if(res.error){toast("불러오기 실패: "+res.error.message);return;}
  var ads=res.data;
  var userIds=Array.from(new Set(ads.map(function(a){return a.user_id})));
  var profRes=userIds.length?await window.supabase.from("profiles").select("id,nickname").in("id",userIds):{data:[]};
  var nickById={};(profRes.data||[]).forEach(function(p){nickById[p.id]=p.nickname;});
  var h='<div class="profile"><div class="pf-sec">🛡 광고 심사 ('+ads.length+')</div>';
  if(!ads.length){
    h+='<div class="pf-empty">심사할 광고가 없어요.</div>';
  }else{
    h+='<div class="list">';
    ads.forEach(function(a){
      h+='<div class="post rip"><div class="pmain" style="cursor:pointer" onclick="'+adTargetOnclick(a)+'">'+
        '<img src="'+esc(a.image_url)+'" alt="" style="width:100%;max-width:220px;height:56px;object-fit:cover;border-radius:8px;margin-bottom:6px;display:block">'+
        '<div class="ptitle">'+(a.linked_commission_id?'🎨 ':'📝 ')+esc(nickById[a.user_id]||"알 수 없음")+'</div>'+
        '<div class="pmeta"><span class="mt">'+timeAgo(a.created_at)+'</span><span class="sep"></span><span class="mv">'+a.points_spent+'P · '+a.duration_days+'일 신청</span></div></div>'+
        '<div style="display:flex;gap:8px;flex-shrink:0">'+
          '<button class="d-act" onclick="approveUserAd('+a.id+',\'queue\')">승인</button>'+
          '<button class="d-act" onclick="rejectUserAd('+a.id+',\'queue\')">거절</button>'+
        '</div></div>';
    });
    h+='</div>';
  }
  h+='<button class="pf-edit" onclick="openProfile()" style="margin-top:16px">내 정보로 돌아가기</button></div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
async function approveUserAd(adId,backTo){
  var res=await window.supabase.rpc("approve_user_ad",{p_ad_id:adId});
  if(res.error){toast("승인 실패: "+res.error.message);return;}
  toast("광고를 승인했어요");
  if(backTo==="list")openAdminAdList();else openAdminAdReview();
}
var rejectingAdId=null,rejectingAdBackTo=null;
function rejectUserAd(adId,backTo){
  rejectingAdId=adId;rejectingAdBackTo=backTo;
  document.getElementById("adRejectReasonInput").value="";
  document.getElementById("adRejectRefundInput").checked=true;
  document.getElementById("adRejectModal").classList.add("open");
}
function closeAdRejectModal(){
  rejectingAdId=null;rejectingAdBackTo=null;
  document.getElementById("adRejectModal").classList.remove("open");
}
async function submitAdReject(){
  if(!rejectingAdId)return;
  var adId=rejectingAdId,backTo=rejectingAdBackTo;
  var refund=document.getElementById("adRejectRefundInput").checked;
  var reason=document.getElementById("adRejectReasonInput").value.trim()||null;
  var res=await window.supabase.rpc("reject_user_ad",{p_ad_id:adId,p_refund:refund,p_reason:reason});
  if(res.error){toast("반려 실패: "+res.error.message);return;}
  closeAdRejectModal();
  toast("광고를 반려했어요");
  if(backTo==="list")openAdminAdList();else openAdminAdReview();
}

/* ---------- 유료 광고 캠페인 (관리자, CPM) ---------- */
var campaignDraft={imageUrl:null};
function campDate(iso){if(!iso)return"";var d=new Date(iso);return d.getFullYear()+"."+String(d.getMonth()+1).padStart(2,"0")+"."+String(d.getDate()).padStart(2,"0");}
async function openAdminCampaigns(){
  if(!AUTH.profile||!AUTH.profile.is_admin){toast("관리자만 사용할 수 있어요");return;}
  var res=await window.supabase.from("ad_campaigns").select("*").order("created_at",{ascending:false});
  if(res.error){toast("불러오기 실패: "+res.error.message);return;}
  var camps=res.data||[];
  var statusLabel={active:"진행중",paused:"멈춤",completed:"완료",archived:"보관"};
  var h='<div class="profile"><div class="pf-sec">🎯 유료 광고 캠페인 등록</div>';
  h+='<div style="padding:0 2px 8px">'+
     '<div style="font-size:13px;font-weight:700;color:var(--muted);margin:4px 2px 6px">배너 이미지 <span style="color:var(--brand)">*</span></div>'+
     '<div id="campBannerPreview" style="margin-bottom:8px">'+(campaignDraft.imageUrl?'<img src="'+esc(campaignDraft.imageUrl)+'" style="width:100%;border-radius:10px;display:block">':'')+'</div>'+
     '<input type="file" id="campBannerFile" accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" class="hidden" onchange="onCampaignBannerFile(event)">'+
     '<button class="pf-edit" onclick="document.getElementById(\'campBannerFile\').click()" style="width:100%;justify-content:center;margin-bottom:10px">배너 이미지 선택</button>'+
     '<input id="campAdvertiser" class="nick-in" placeholder="광고주 이름(메모용)" style="margin-bottom:8px">'+
     '<input id="campTarget" class="nick-in" placeholder="클릭 시 이동할 주소 (https://...)" style="margin-bottom:8px">'+
     '<input id="campGoal" type="number" min="1" step="1" class="nick-in" placeholder="판매한 총 노출수 (예: 50000)" style="margin-bottom:8px">'+
     '<input id="campCpm" type="number" min="0" step="0.01" class="nick-in" placeholder="CPM 단가 (1000노출당, 선택)" style="margin-bottom:8px">'+
     '<div style="font-size:13px;font-weight:700;color:var(--muted);margin:4px 2px 6px">집행 기간</div>'+
     '<div style="display:flex;gap:8px;margin-bottom:12px"><input id="campStart" type="date" class="nick-in" style="flex:1"><input id="campEnd" type="date" class="nick-in" style="flex:1"></div>'+
     '<button class="r-ok" onclick="submitCampaign()" style="width:100%">캠페인 등록</button>'+
     '</div>';
  h+='<div class="pf-sec">등록된 캠페인 ('+camps.length+')</div>';
  if(!camps.length){
    h+='<div class="pf-empty">아직 등록된 캠페인이 없어요.</div>';
  }else{
    h+='<div class="list">';
    camps.forEach(function(c){
      var pct=c.impression_goal?Math.min(100,Math.round(c.impressions_served/c.impression_goal*100)):0;
      var actions='<button class="d-act" onclick="openCampaignReport('+c.id+')">📊 리포트</button>';
      if(c.status==="active")actions+='<button class="d-act" onclick="setCampaignStatus('+c.id+',\'paused\')">멈춤</button>';
      else if(c.status==="paused")actions+='<button class="d-act" onclick="setCampaignStatus('+c.id+',\'active\')">재개</button>';
      if(c.status!=="archived")actions+='<button class="d-act" onclick="setCampaignStatus('+c.id+',\'archived\')">보관</button>';
      actions+='<button class="d-act" onclick="deleteCampaign('+c.id+')">삭제</button>';
      h+='<div class="post rip"><div class="pmain">'+
        '<img src="'+esc(c.image_url)+'" alt="" style="width:100%;max-width:220px;height:56px;object-fit:cover;border-radius:8px;margin-bottom:6px;display:block">'+
        '<div class="ptitle">'+esc(c.advertiser||"(광고주 미기재)")+' · '+(statusLabel[c.status]||c.status)+'</div>'+
        '<div class="pmeta"><span class="mv">'+Number(c.impressions_served).toLocaleString()+' / '+Number(c.impression_goal).toLocaleString()+' 노출 ('+pct+'%)</span></div>'+
        '<div class="pp-bar" style="margin:6px 0"><div class="pp-fill" style="width:'+pct+'%"></div></div>'+
        '<div class="pmeta"><span class="mt">'+campDate(c.flight_start)+' ~ '+campDate(c.flight_end)+'</span>'+(c.cpm_price!=null?'<span class="sep"></span><span class="mv">CPM '+Number(c.cpm_price).toLocaleString()+'</span>':'')+'</div></div>'+
        '<div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0">'+actions+'</div></div>';
    });
    h+='</div>';
  }
  h+='<button class="pf-edit" onclick="openProfile()" style="margin-top:16px">내 정보로 돌아가기</button></div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
async function onCampaignBannerFile(e){
  var f=e.target.files[0];if(!f)return;
  e.target.value="";
  if(!window.supabase){toast("업로드를 사용할 수 없어요");return;}
  if(ALLOWED_IMAGE_TYPES.indexOf(f.type)===-1){toast("이미지 파일만 올릴 수 있어요");return;}
  if(f.size>MAX_IMAGE_BYTES){toast("40MB 이하 이미지만 올릴 수 있어요");return;}
  var uploadBlob=f,ext=(f.name.match(/\.([^.]+)$/)||[,"png"])[1];
  if(f.type!=="image/gif"){
    toast("배너 이미지 압축 중...");
    try{var c=await compressImage(f);uploadBlob=c.blob;ext=c.ext;}catch(err){console.error("배너 압축 실패, 원본 사용:",err);}
  }
  toast("배너 업로드 중...");
  var campUrl=await uploadToStorage(uploadBlob,"campaign");
  if(!campUrl)return;
  campaignDraft.imageUrl=campUrl;
  var prev=document.getElementById("campBannerPreview");
  if(prev)prev.innerHTML='<img src="'+esc(campaignDraft.imageUrl)+'" style="width:100%;border-radius:10px;display:block">';
  toast("배너 이미지를 등록했어요");
}
async function submitCampaign(){
  if(!campaignDraft.imageUrl){toast("배너 이미지를 선택해주세요");return;}
  var advertiser=document.getElementById("campAdvertiser").value.trim();
  var target=document.getElementById("campTarget").value.trim();
  var goal=parseInt(document.getElementById("campGoal").value,10);
  var cpmRaw=document.getElementById("campCpm").value.trim();
  var cpm=cpmRaw===""?null:parseFloat(cpmRaw);
  var start=document.getElementById("campStart").value;
  var end=document.getElementById("campEnd").value;
  if(!/^https?:\/\//i.test(target)){toast("이동 주소는 http:// 또는 https://로 시작해야 해요");return;}
  if(!goal||goal<1){toast("판매한 총 노출수를 입력해주세요");return;}
  if(!start||!end){toast("집행 기간(시작일·종료일)을 입력해주세요");return;}
  var startIso=new Date(start+"T00:00:00").toISOString();
  var endIso=new Date(end+"T23:59:59").toISOString();
  if(new Date(endIso)<=new Date(startIso)){toast("종료일이 시작일보다 뒤여야 해요");return;}
  var row={advertiser:advertiser||null,image_url:campaignDraft.imageUrl,target_url:target,
    impression_goal:goal,cpm_price:(cpm==null||isNaN(cpm))?null:cpm,
    flight_start:startIso,flight_end:endIso,status:"active"};
  var res=await window.supabase.from("ad_campaigns").insert(row);
  if(res.error){toast("등록 실패: "+res.error.message);return;}
  campaignDraft={imageUrl:null};
  toast("캠페인을 등록했어요 🎯");
  openAdminCampaigns();
}
async function setCampaignStatus(id,status){
  var res=await window.supabase.from("ad_campaigns").update({status:status}).eq("id",id);
  if(res.error){toast("변경 실패: "+res.error.message);return;}
  openAdminCampaigns();
}
async function deleteCampaign(id){
  if(!(await confirmDialog("이 캠페인을 삭제할까요? 집계된 노출 기록도 함께 삭제됩니다.")))return;
  var res=await window.supabase.from("ad_campaigns").delete().eq("id",id);
  if(res.error){toast("삭제 실패: "+res.error.message);return;}
  toast("캠페인을 삭제했어요");
  openAdminCampaigns();
}
async function openCampaignReport(id){
  if(!AUTH.profile||!AUTH.profile.is_admin){toast("관리자만 사용할 수 있어요");return;}
  var cRes=await window.supabase.from("ad_campaigns").select("*").eq("id",id).single();
  if(cRes.error){toast("불러오기 실패: "+cRes.error.message);return;}
  var c=cRes.data;
  var dRes=await window.supabase.from("ad_impression_daily").select("date,count").eq("campaign_id",id).order("date");
  if(dRes.error){toast("불러오기 실패: "+dRes.error.message);return;}
  var byDate={};(dRes.data||[]).forEach(function(r){byDate[r.date]=r.count;});
  // 집행 시작 ~ min(오늘, 종료)까지 하루 단위로 채움(데이터 없는 날은 0)
  var start=new Date(c.flight_start),end=new Date(c.flight_end),today=new Date();
  var last=end<today?end:today;
  var d=new Date(start.getFullYear(),start.getMonth(),start.getDate());
  var lastD=new Date(last.getFullYear(),last.getMonth(),last.getDate());
  var days=[],guard=0;
  while(d<=lastD&&guard<400){
    var key=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
    days.push({label:(d.getMonth()+1)+"/"+d.getDate(),count:byDate[key]||0});
    d.setDate(d.getDate()+1);guard++;
  }
  var maxc=days.reduce(function(m,x){return Math.max(m,x.count);},1);
  var sum=days.reduce(function(s,x){return s+x.count;},0);
  var pct=c.impression_goal?Math.min(100,Math.round(c.impressions_served/c.impression_goal*100)):0;
  var avg=days.length?Math.round(sum/days.length):0;
  var bars=days.map(function(x){
    var hpct=Math.round(x.count/maxc*100);
    return '<div style="flex:0 0 auto;width:26px;height:100%;display:flex;flex-direction:column;align-items:center" title="'+x.label+': '+x.count.toLocaleString()+'회">'+
      '<div style="flex:1;width:100%;display:flex;align-items:flex-end;justify-content:center">'+
        '<div style="width:60%;min-height:'+(x.count?2:0)+'px;height:'+hpct+'%;background:var(--brand);border-radius:4px 4px 0 0"></div></div>'+
      '<div style="font-size:9px;color:var(--muted);margin-top:5px;white-space:nowrap">'+x.label+'</div></div>';
  }).join('');
  var h='<div class="profile"><div class="pf-sec">📊 광고 리포트</div>';
  h+='<div class="post"><div class="pmain">'+
    '<img src="'+esc(c.image_url)+'" alt="" style="width:100%;max-width:280px;height:70px;object-fit:cover;border-radius:8px;margin-bottom:8px;display:block">'+
    '<div class="ptitle">'+esc(c.advertiser||"(광고주 미기재)")+'</div>'+
    '<div class="pmeta"><span class="mv">'+Number(c.impressions_served).toLocaleString()+' / '+Number(c.impression_goal).toLocaleString()+' 노출 ('+pct+'%)</span></div>'+
    '<div class="pp-bar" style="margin:8px 0"><div class="pp-fill" style="width:'+pct+'%"></div></div>'+
    '<div class="pmeta"><span class="mt">'+campDate(c.flight_start)+' ~ '+campDate(c.flight_end)+'</span><span class="sep"></span><span class="mv">일 평균 '+avg.toLocaleString()+'회</span></div>'+
  '</div></div>';
  h+='<div class="pf-sec">일별 노출</div>';
  if(!sum){
    h+='<div class="pf-empty">아직 집계된 노출이 없어요.</div>';
  }else{
    h+='<div style="display:flex;gap:5px;overflow-x:auto;align-items:flex-end;height:170px;padding:10px 2px;border-bottom:1px solid var(--line-2)">'+bars+'</div>';
  }
  h+='<button class="pf-edit" onclick="openAdminCampaigns()" style="margin-top:16px">← 광고 관리로 돌아가기</button></div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}

/* ---------- 후기 조작 탐지·분석 (관리자) — DB 트리거와 같은 임계값을 클라이언트에서 재계산 ---------- */
var REVIEW_SURGE=5, REVIEW_REPEAT=2, REVIEW_NEWACCT=3;
function reviewPosts(){return POSTS.filter(function(p){return p.board==='review'&&p.reviewedUserId;});}
function reviewPairSet(){ // "X가 Y를 후기함" 쌍 집합 — 상호 후기 판정용
  var s={};reviewPosts().forEach(function(p){if(p.authorId&&p.reviewedUserId)s[p.authorId+'|'+p.reviewedUserId]=true;});return s;
}
function reviewAnalysisScan(createdMap){ // createdMap 있으면 신규계정 신호 포함
  var byArtist={};
  reviewPosts().forEach(function(p){
    (byArtist[p.reviewedUserId]=byArtist[p.reviewedUserId]||{id:p.reviewedUserId,nick:p.reviewedNickname||'(알 수 없음)',revs:[]}).revs.push(p);
  });
  var pairs=reviewPairSet(),now=Date.now(),D=86400000,out=[];
  Object.keys(byArtist).forEach(function(aid){
    var g=byArtist[aid],revs=g.revs,times=revs.map(function(r){return new Date(r.createdAt).getTime();});
    var surge=0;
    for(var i=0;i<times.length;i++){var cnt=0;for(var j=0;j<times.length;j++){if(times[j]>=times[i]&&times[j]<times[i]+D)cnt++;}if(cnt>surge)surge=cnt;}
    var byAuthor={};revs.forEach(function(r){if(r.authorId)byAuthor[r.authorId]=(byAuthor[r.authorId]||0)+1;});
    var repeatMax=0,repeatReviewers=0;
    Object.keys(byAuthor).forEach(function(k){if(byAuthor[k]>repeatMax)repeatMax=byAuthor[k];if(byAuthor[k]>=REVIEW_REPEAT)repeatReviewers++;});
    var recip=Object.keys(byAuthor).some(function(rv){return pairs[aid+'|'+rv];});
    var newAcct=0;
    if(createdMap){var seen={};revs.forEach(function(r){if(!r.authorId||seen[r.authorId])return;var ca=createdMap[r.authorId];if(ca&&(now-new Date(ca).getTime()<7*D)&&(now-new Date(r.createdAt).getTime()<7*D)){seen[r.authorId]=true;newAcct++;}});}
    var sig=[];
    if(surge>=REVIEW_SURGE)sig.push('급증 24h '+surge+'건');
    if(repeatReviewers>0)sig.push('중복 리뷰어 '+repeatReviewers+'명(최다 '+repeatMax+'건)');
    if(recip)sig.push('상호 후기(품앗이)');
    if(newAcct>=REVIEW_NEWACCT)sig.push('신규 계정 '+newAcct+'명');
    if(!sig.length)return;
    var score=(surge>=REVIEW_SURGE?2:0)+(repeatReviewers>0?3:0)+(recip?3:0)+(newAcct>=REVIEW_NEWACCT?2:0);
    out.push({id:aid,nick:g.nick,revs:revs,signals:sig,score:score,total:revs.length,byAuthor:byAuthor});
  });
  out.sort(function(a,b){return b.score-a.score||b.total-a.total;});
  return out;
}
function reviewSuspicionCountSync(){try{return reviewAnalysisScan(null).length;}catch(e){return 0;}}
async function reviewFetchCreatedMap(){
  var ids={};reviewPosts().forEach(function(p){if(p.authorId)ids[p.authorId]=true;});
  var list=Object.keys(ids);
  if(!list.length||!window.supabase)return {};
  var res=await window.supabase.from('profiles').select('id,created_at').in('id',list);
  var m={};(res.data||[]).forEach(function(r){m[r.id]=r.created_at;});
  return m;
}
async function openReviewAnalysis(focusArtistId){
  if(!AUTH.profile||!AUTH.profile.is_admin){toast("관리자만 사용할 수 있어요");return;}
  var createdMap=await reviewFetchCreatedMap();
  var flagged=reviewAnalysisScan(createdMap);
  if(focusArtistId){
    var target=flagged.find(function(x){return x.id===focusArtistId;});
    if(!target){
      var rv=reviewPosts().filter(function(p){return p.reviewedUserId===focusArtistId;});
      var ba={};rv.forEach(function(r){if(r.authorId)ba[r.authorId]=(ba[r.authorId]||0)+1;});
      target={id:focusArtistId,nick:(rv[0]&&rv[0].reviewedNickname)||'(알 수 없음)',revs:rv,signals:[],score:0,total:rv.length,byAuthor:ba};
    }
    document.getElementById("main").innerHTML=reviewAnalysisArtistHTML(target,createdMap);
    window.scrollTo({top:0,behavior:"smooth"});return;
  }
  var h='<div class="profile"><div class="pf-sec">🔍 후기 조작 분석</div>';
  h+='<div style="text-align:left;padding:12px 14px;background:var(--surface-2);border-radius:10px;margin-bottom:12px;font-size:12.5px;line-height:1.7;color:var(--ink-2)">'+
     '의심 <b>신호</b>가 걸린 작가만 표시됩니다. 정상적인 인기 급증도 걸릴 수 있어 최종 판단은 관리자 몫이에요.<br>'+
     '기준: 급증 24h '+REVIEW_SURGE+'건↑ · 중복 리뷰어 '+REVIEW_REPEAT+'건↑ · 신규계정 '+REVIEW_NEWACCT+'명↑ · 상호 후기</div>';
  if(!flagged.length){
    h+='<div class="pf-empty">의심되는 후기 패턴이 없어요 👍</div>';
  }else{
    h+='<div class="list">';
    flagged.forEach(function(f){
      h+='<div class="post rip" onclick="openReviewAnalysis(\''+cmQ(f.id)+'\')"><div class="pmain">'+
        '<div class="ptitle">⚠️ '+esc(f.nick)+' <span style="font-size:12px;color:var(--muted);font-weight:500">· 후기 '+f.total+'건 · 위험도 '+f.score+'</span></div>'+
        '<div class="pmeta" style="flex-wrap:wrap;gap:5px">'+f.signals.map(function(s){return '<span style="background:#fbe6ec;color:#c0392b;padding:2px 7px;border-radius:6px;font-size:11.5px">'+esc(s)+'</span>';}).join('')+'</div>'+
      '</div></div>';
    });
    h+='</div>';
  }
  h+='<button class="pf-edit" onclick="openProfile()" style="margin-top:16px">내 정보로 돌아가기</button></div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
function reviewAnalysisArtistHTML(f,createdMap){
  var now=Date.now(),D=86400000;
  var revs=f.revs.slice().sort(function(a,b){return new Date(b.createdAt)-new Date(a.createdAt);});
  var good=revs.filter(function(r){return r.commissionSentiment==='good';}).length;
  var bad=revs.filter(function(r){return r.commissionSentiment==='bad';}).length;
  var byDay={};revs.forEach(function(r){var d=new Date(r.createdAt);var k=(d.getMonth()+1)+'/'+d.getDate();byDay[k]=(byDay[k]||0)+1;});
  var days=[];for(var i=13;i>=0;i--){var d=new Date(now-i*D);var k=(d.getMonth()+1)+'/'+d.getDate();days.push({label:k,count:byDay[k]||0});}
  var maxc=days.reduce(function(m,x){return Math.max(m,x.count);},1);
  var bars=days.map(function(x){var hp=Math.round(x.count/maxc*100);return '<div style="flex:0 0 auto;width:22px;height:100%;display:flex;flex-direction:column;align-items:center" title="'+x.label+': '+x.count+'건"><div style="flex:1;width:100%;display:flex;align-items:flex-end;justify-content:center"><div style="width:60%;min-height:'+(x.count?2:0)+'px;height:'+hp+'%;background:'+(x.count>=REVIEW_SURGE?'#c0392b':'var(--brand)')+';border-radius:3px 3px 0 0"></div></div><div style="font-size:8px;color:var(--muted);margin-top:4px;white-space:nowrap">'+x.label+'</div></div>';}).join('');
  var pairs=reviewPairSet();
  var authors=Object.keys(f.byAuthor).map(function(aid){
    var rev=revs.find(function(r){return r.authorId===aid;});
    var ca=createdMap&&createdMap[aid];
    return {id:aid,nick:(rev&&rev.author)||'(익명)',count:f.byAuthor[aid],newAcct:ca&&(now-new Date(ca).getTime()<7*D),recip:!!pairs[f.id+'|'+aid]};
  }).sort(function(a,b){return b.count-a.count;});
  var h='<div class="profile"><div class="pf-sec">🔍 '+esc(f.nick)+' 후기 분석</div>';
  if(f.signals.length){
    h+='<div class="pmeta" style="flex-wrap:wrap;gap:5px;margin-bottom:12px">'+f.signals.map(function(s){return '<span style="background:#fbe6ec;color:#c0392b;padding:3px 9px;border-radius:7px;font-size:12px;font-weight:700">⚠️ '+esc(s)+'</span>';}).join('')+'</div>';
  }
  h+='<div class="pf-stats"><div class="pf-st"><b>'+revs.length+'</b><span>총 후기</span></div>'+
     '<div class="pf-st"><b>'+good+'</b><span>😊 만족</span></div>'+
     '<div class="pf-st"><b>'+bad+'</b><span>😞 불호</span></div></div>';
  h+='<div class="pf-sec">최근 14일 후기 추이</div>';
  h+='<div style="display:flex;gap:4px;overflow-x:auto;align-items:flex-end;height:130px;padding:8px 2px;border-bottom:1px solid var(--line-2)">'+bars+'</div>';
  h+='<div class="pf-sec">리뷰어별 ('+authors.length+'명)</div><div class="list">';
  authors.forEach(function(a){
    var tags=[];
    if(a.count>=REVIEW_REPEAT)tags.push('중복 '+a.count+'건');
    if(a.recip)tags.push('품앗이');
    if(a.newAcct)tags.push('신규계정');
    h+='<div class="post"><div class="pmain">'+
      '<div class="ptitle" style="cursor:pointer" onclick="openUserProfile(\''+cmQ(a.id)+'\')">'+esc(a.nick)+'</div>'+
      '<div class="pmeta"><span class="mv">후기 '+a.count+'건</span>'+(tags.length?'<span class="sep"></span><span class="mv" style="color:#c0392b;font-weight:700">'+esc(tags.join(' · '))+'</span>':'')+'</div>'+
    '</div></div>';
  });
  h+='</div>';
  h+='<div class="pf-sec">후기 목록</div><div class="list">';
  revs.forEach(function(r){
    var body=(r.content&&r.content.length)?r.content.join(' ').slice(0,60):'';
    h+='<div class="post rip" onclick="openPost('+r.id+')"><div class="pmain">'+
      '<div class="ptitle">'+(r.commissionSentiment==='good'?'😊':'😞')+' '+esc(r.author)+' <span style="font-size:12px;color:var(--muted);font-weight:500">'+esc(r.time)+'</span></div>'+
      (body?'<div class="pmeta"><span class="mv">'+esc(body)+'</span></div>':'')+
    '</div></div>';
  });
  h+='</div>';
  h+='<button class="pf-edit" onclick="openReviewAnalysis()" style="margin-top:16px">← 분석 목록으로</button></div>';
  return h;
}
async function adminViewConversation(conversationId,reportId,backTo){
  var convRes=await window.supabase.from("conversations").select("*").eq("id",conversationId).single();
  if(convRes.error){toast("대화를 불러오지 못했어요: "+convRes.error.message);return;}
  var conv=convRes.data;
  var profRes=await window.supabase.from("profiles").select("id,nickname").in("id",[conv.user1_id,conv.user2_id]);
  var nickById={};(profRes.data||[]).forEach(function(p){nickById[p.id]=p.nickname;});
  var msgRes=await window.supabase.from("messages").select("*").eq("conversation_id",conversationId).order("created_at",{ascending:true});
  if(msgRes.error){toast("메시지를 불러오지 못했어요: "+msgRes.error.message);return;}
  var logRes=await window.supabase.from("chat_admin_access_logs").insert({admin_id:AUTH.user.id,conversation_id:conversationId,report_id:reportId||null});
  if(logRes.error)console.error("관리자 채팅 열람 로그 기록 실패:",logRes.error.message);
  renderAdminChatView(conv,nickById,msgRes.data||[],backTo);
}
function renderAdminChatView(conv,nickById,messages,backTo){
  var backOnclick=backTo==="all"?"openAdminChatList()":"openAdminReports()";
  var backLabel=backTo==="all"?"← 전체 채팅 목록으로":"← 신고 목록으로";
  var h='<div class="profile">'+
    '<button class="d-back" onclick="'+backOnclick+'">'+backLabel+'</button>'+
    '<div class="pf-sec">🛡 대화 내용 (읽기 전용)</div>'+
    '<div class="pf-card"><div class="pf-info"><div class="pf-name">'+esc(nickById[conv.user1_id]||"알 수 없음")+' ↔ '+esc(nickById[conv.user2_id]||"알 수 없음")+'</div></div></div>'+
    '<div class="chat-list">'+(messages.length?messages.map(function(m){
      return '<div class="chat-msg"><div class="chat-bubble">'+esc(nickById[m.sender_id]||"알 수 없음")+': '+withEmoticons(esc(m.content))+'</div></div>';
    }).join(""):'<div class="pf-empty">메시지가 없어요.</div>')+'</div>'+
  '</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
async function openAdminChatList(searchTerm){
  searchTerm=(searchTerm||"").trim();
  enterScreen("admChat",openProfile); // 뒤로가기가 프로필로 복귀(검색 재호출은 같은 key라 중복 안 쌓임)
  document.getElementById("main").innerHTML='<div class="profile"><p style="padding:40px 0;text-align:center;color:var(--muted)">불러오는 중...</p></div>';
  var convRes;
  if(searchTerm){
    var profRes=await window.supabase.from("profiles").select("id,nickname").ilike("nickname","%"+searchTerm+"%");
    if(profRes.error){toast("검색 실패: "+profRes.error.message);return;}
    var ids=(profRes.data||[]).map(function(p){return p.id});
    if(!ids.length){renderAdminChatList([],{},searchTerm);return;}
    var orExpr=ids.map(function(id){return "user1_id.eq."+id+",user2_id.eq."+id}).join(",");
    convRes=await window.supabase.from("conversations").select("*").or(orExpr).order("last_message_at",{ascending:false}).limit(200);
  }else{
    convRes=await window.supabase.from("conversations").select("*").order("last_message_at",{ascending:false}).limit(200);
  }
  if(convRes.error){toast("불러오기 실패: "+convRes.error.message);return;}
  var convs=convRes.data||[];
  var partnerIds=Array.from(new Set(convs.reduce(function(acc,c){acc.push(c.user1_id,c.user2_id);return acc;},[])));
  var nickRes=partnerIds.length?await window.supabase.from("profiles").select("id,nickname").in("id",partnerIds):{data:[]};
  var nickById={};(nickRes.data||[]).forEach(function(p){nickById[p.id]=p.nickname;});
  renderAdminChatList(convs,nickById,searchTerm);
}
function renderAdminChatList(convs,nickById,searchTerm){
  var h='<div class="profile">'+
    '<button class="d-back" onclick="screenBack()">← 내 정보로</button>'+
    '<div class="pf-sec">🛡 전체 채팅 목록 ('+convs.length+')</div>'+
    '<div style="display:flex;gap:8px;margin-bottom:14px">'+
      '<input id="adminChatSearchInput" class="nick-in" style="flex:1;margin-bottom:0" placeholder="닉네임으로 검색" value="'+esc(searchTerm||"")+'" onkeydown="if(event.key===\'Enter\'){openAdminChatList(this.value)}">'+
      '<button class="d-act" onclick="openAdminChatList(document.getElementById(\'adminChatSearchInput\').value)">검색</button>'+
    '</div>';
  if(!convs.length){
    h+='<div class="pf-empty">'+(searchTerm?"검색 결과가 없어요.":"채팅방이 없어요.")+'</div>';
  }else{
    h+='<div class="chat-room-list">';
    convs.forEach(function(c){
      var n1=nickById[c.user1_id]||"알 수 없음",n2=nickById[c.user2_id]||"알 수 없음";
      h+='<div class="chat-room-row" onclick="adminViewConversation('+c.id+',null,\'all\')">'+
        '<div class="pf-ava" style="width:44px;height:44px;font-size:16px;flex-shrink:0">'+esc(n1[0])+'</div>'+
        '<div class="chat-room-info"><div class="chat-room-name">'+esc(n1)+' ↔ '+esc(n2)+'</div>'+
        '<div class="chat-room-preview">마지막 메시지: '+timeAgo(c.last_message_at||c.created_at)+'</div></div>'+
      '</div>';
    });
    h+='</div>';
  }
  h+='</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
function openNickModal(){
  document.getElementById("nickInput").value=ME.nick==="나"?"":ME.nick;
  document.getElementById("nickModal").classList.add("open");
  setTimeout(function(){document.getElementById("nickInput").focus()},60);
}
function closeNick(){document.getElementById("nickModal").classList.remove("open");}
async function saveNick(){
  var v=document.getElementById("nickInput").value.trim();
  if(v.length<2||v.length>12){toast("닉네임은 2~12자여야 해요");return;}
  if(!/^[가-힣a-zA-Z0-9]+$/.test(v)){toast("닉네임에는 한글·영문·숫자만 사용할 수 있어요");return;}
  if(AUTH.user&&window.supabase){
    var res=await window.supabase.from("profiles").update({nickname:v}).eq("id",AUTH.user.id);
    if(res.error){
      if(res.error.code==="23505"){toast("이미 사용 중인 닉네임이에요");}
      else{toast("저장 실패: "+res.error.message);}
      return;
    }
    if(AUTH.profile)AUTH.profile.nickname=v;
  }
  ME.nick=v;closeNick();toast("닉네임을 \'"+v+"\'(으)로 바꿨어요","✓");
  openProfile();
}
// ===== 회원 탈퇴 (계정 삭제) =====
// 서버 RPC delete_my_account()가 처리: 글·댓글은 익명화(내용 유지), 프로필·커미션·채팅·팔로우·투표·알림·좋아요 등은 삭제, 로그인 계정 삭제.
function openWithdraw(){
  if(!AUTH.user){toast("로그인 후 이용할 수 있어요");return;}
  var i=document.getElementById("withdrawConfirm");if(i)i.value="";
  withdrawCheck();
  document.getElementById("withdrawModal").classList.add("open");
  setTimeout(function(){try{i.focus();}catch(e){}},60);
}
function closeWithdraw(){document.getElementById("withdrawModal").classList.remove("open");}
function withdrawCheck(){ // 실수 방지: '회원탈퇴'를 정확히 입력해야 버튼 활성화
  var i=document.getElementById("withdrawConfirm");var b=document.getElementById("withdrawGoBtn");
  if(!i||!b)return;
  b.disabled=((i.value||"").trim()!=="회원탈퇴");
}
async function doWithdraw(){
  var i=document.getElementById("withdrawConfirm");var b=document.getElementById("withdrawGoBtn");
  if(!i||(i.value||"").trim()!=="회원탈퇴")return;
  if(!AUTH.user||!window.supabase){toast("로그인 상태를 확인해주세요");return;}
  if(b){b.disabled=true;b.textContent="처리 중…";}
  try{
    var res=await window.supabase.rpc("delete_my_account");
    if(res.error){toast("탈퇴 실패: "+res.error.message);if(b){b.disabled=false;b.textContent="탈퇴하기";}return;}
    var d=res.data||{};
    if(d.ok===false){toast("탈퇴 실패: "+(d.error==="not_authenticated"?"로그인 상태가 아니에요":(d.error||"알 수 없는 오류")));if(b){b.disabled=false;b.textContent="탈퇴하기";}return;}
    // 성공 → 세션 정리 후 홈으로
    try{await window.supabase.auth.signOut();}catch(e){}
    closeWithdraw();
    toast("회원 탈퇴가 완료되었어요. 그동안 감사했습니다.","👋");
    setTimeout(function(){location.href="/";},1400);
  }catch(e){
    toast("탈퇴 처리 중 오류: "+((e&&e.message)||e));
    if(b){b.disabled=false;b.textContent="탈퇴하기";}
  }
}
// ===== 이용규칙 =====
function openRules(){document.getElementById("rulesModal").classList.add("open");document.body.style.overflow="hidden";}
function closeRules(){document.getElementById("rulesModal").classList.remove("open");document.body.style.overflow="";}

// ===== 팔로우 =====
async function toggleFollow(followeeId,nickname){
  if(!AUTH.user){toast("로그인 후 팔로우할 수 있어요","🔒");loginWithGoogle();return;}
  if(!followeeId||followeeId===AUTH.user.id||!window.supabase)return;
  var following=FOLLOW.has(followeeId);
  if(following){
    var del=await window.supabase.from("follows").delete().eq("follower_id",AUTH.user.id).eq("followee_id",followeeId);
    if(del.error){toast("처리 실패: "+del.error.message);return;}
    FOLLOW.delete(followeeId);
    toast(dispName(nickname)+"님 팔로우를 취소했어요");
  }else{
    var ins=await window.supabase.from("follows").insert({follower_id:AUTH.user.id,followee_id:followeeId});
    if(ins.error){toast("처리 실패: "+ins.error.message);return;}
    FOLLOW.add(followeeId);
    if(nickname)FOLLOW_NAME[followeeId]=nickname;
    toast(dispName(nickname)+"님을 팔로우했어요","✓");
  }
  var btn=document.getElementById("followBtn");
  if(btn){var f=FOLLOW.has(followeeId);btn.classList.toggle("following",f);btn.textContent=f?"팔로잉 ✓":"＋ 팔로우";}
}
// 로그인 시 내 팔로우 목록을 DB에서 불러옴(회원 id 기준 + 표시용 닉)
async function loadMyFollows(){
  FOLLOW=new Set();FOLLOW_NAME={};
  if(!AUTH.user||!window.supabase)return;
  var f=await window.supabase.from("follows").select("followee_id").eq("follower_id",AUTH.user.id);
  if(f.error)return;
  var ids=(f.data||[]).map(function(x){return x.followee_id;});
  ids.forEach(function(id){FOLLOW.add(id);});
  if(ids.length){
    var pr=await window.supabase.from("profiles").select("id,nickname").in("id",ids);
    (pr.data||[]).forEach(function(p){FOLLOW_NAME[p.id]=p.nickname;});
  }
}

// ===== 댓글 상호작용 =====
async function helpful(pid,ci,el){
  var p=POSTS.find(function(x){return x.id===pid});if(!p)return;
  var c=p.comments[ci];
  if(!c.dbId||!window.supabase){toast("이 댓글엔 지원하지 않아요");return;}
  if(!AUTH.user){toast("로그인이 필요해요");loginWithGoogle();return;}
  var b=el.querySelector("b");
  if(c._me){
    var del=await window.supabase.from("comment_helpful").delete().eq("comment_id",c.dbId).eq("user_id",AUTH.user.id);
    if(del.error){toast("처리 실패: "+del.error.message);return;}
    c.h=Math.max(0,(c.h||1)-1);c._me=false;
    if(c.h<=0&&b)b.remove();else if(b)b.textContent=c.h;
    toast("도움돼요를 취소했어요");return;
  }
  var ins=await window.supabase.from("comment_helpful").insert({comment_id:c.dbId,user_id:AUTH.user.id});
  if(ins.error){toast("처리 실패: "+ins.error.message);return;}
  c.h=(c.h||0)+1;c._me=true;
  if(!b){b=document.createElement("b");b.style.marginLeft="3px";el.appendChild(b);}
  b.textContent=c.h;
  toast("도움돼요를 눌렀어요","👍");
}
function replyTo(name){
  var t=document.getElementById("cmInput");
  if(t){t.value="@"+name+" ";t.focus();t.scrollIntoView({behavior:"smooth",block:"center"});}
}

// notif: close on outside click / Escape
document.addEventListener("click",function(e){
  var p=document.getElementById("notifPanel");
  if(!p||!p.classList.contains("open"))return;
  if(!e.target.isConnected)return;               // 필터 탭 등 재렌더로 분리된 요소 → 무시
  if(e.target.closest(".notif-panel"))return;    // 패널 내부 클릭 → 유지
  if(e.target.closest('[aria-label="알림"]'))return; // 종 아이콘 → toggleNotif가 처리
  closeNotif();
});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){closeNotif();closeRules();}});
syncNotifBadge();


// Safari 방어: 렌더 누락 시 재시도
(function(){
  function ensureRendered(){
    var m=document.getElementById("main");
    if(m && m.innerHTML.trim().length<50){
      // postsLoaded가 false면 loadRealPosts()가 아직 안 끝난 것 — 여기서 데모 글로 renderList()를 돌리면
      // "더미 글이 잠깐 보였다 실제 글로 바뀌는" 깜빡임이 생김(로그인 리다이렉트 직후 특히 잘 보임).
      // 곧 loadRealPosts()가 끝나면 스스로 renderList()를 부르니, 그때까진 목록만 건너뛰고 기다림.
      if(!postsLoaded&&window.supabase)return;
      try{ renderChips();renderHot();renderTrend();renderList(); }catch(e){}
    }
  }
  if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",ensureRendered);}
  else{ensureRendered();}
  window.addEventListener("load",ensureRendered);
})();

// ===== 서비스워커 등록 (PWA·웹 푸시 기반) =====
(function(){
  if(!("serviceWorker" in navigator))return;
  function reg(){navigator.serviceWorker.register("/sw.js").catch(function(err){console.error("SW 등록 실패:",err);});}
  // palo.js는 afterInteractive로 로드돼 load 이벤트 뒤에 실행될 수 있으므로, 이미 로드됐으면 즉시 등록
  if(document.readyState==="complete")reg();
  else window.addEventListener("load",reg);
})();

// ===== 모바일 키보드: 텍스트 입력창 포커스 시 하단 탭바 숨김(키보드에 밀려 튀는 것 방지) =====
// 단, 화면 키보드가 뜨는 터치 기기(주 포인터가 coarse)에서만. PC는 물리 키보드라 화면을 안 가리므로
// 좁게 봐도(모바일처럼) 탭바를 숨기지 않음.
/* 하단 탭 — 손을 뗄 때(pointerup) 곧바로 실행한다.
   브라우저는 터치를 클릭으로 바꾸기 전에 "두 번 두드리기(확대)"인지 잠깐 지켜본다.
   그 사이에 다음 탭을 눌러 버리면 지켜보던 클릭이 통째로 사라진다 —
   탭을 연달아 빠르게 누를 때 마지막 것이 씹히던 원인이 이것이다.
   pointerup은 그 판정을 기다리지 않으므로 몇 번을 연달아 눌러도 전부 들어간다.
   (누른 채 손가락을 끌어서 버튼 밖에서 떼면 취소되는 동작은 그대로 유지) */
(function(){
  if(!window.PointerEvent)return;              // 지원 안 하면 기존 클릭 방식 그대로
  function tabAt(e){return e.target&&e.target.closest?e.target.closest(".tabbar .tab"):null;}
  var down=null,ranAt=0,ours=false;
  document.addEventListener("pointerdown",function(e){
    if(e.button!==0)return;
    var btn=tabAt(e);
    down=btn?{btn:btn,x:e.clientX,y:e.clientY,id:e.pointerId}:null;
  });
  document.addEventListener("pointerup",function(e){
    var d=down;down=null;
    if(!d||e.pointerId!==d.id)return;
    if(Math.abs(e.clientX-d.x)>10||Math.abs(e.clientY-d.y)>10)return; // 끌었으면 누른 걸로 안 봄
    if(tabAt(e)!==d.btn)return;                                       // 다른 탭 위에서 뗐으면 취소
    ranAt=Date.now();
    // 마크업의 onclick을 그대로 실행 — 탭별 동작 정의는 한 곳에만 둔다.
    // click()은 동기라 아래 ours=false가 반드시 처리 후에 실행된다.
    ours=true;
    try{d.btn.click();}finally{ours=false;}
  });
  document.addEventListener("pointercancel",function(){down=null;});
  // 위에서 이미 실행했으니, 브라우저가 뒤늦게 보내오는 클릭은 한 번만 무시(중복 실행 방지).
  // 키보드(엔터·스페이스)로 온 클릭은 pointerup을 거치지 않아 ranAt이 비어 있으므로 그대로 통과한다.
  document.addEventListener("click",function(e){
    if(ours||!ranAt||Date.now()-ranAt>700||!tabAt(e))return;
    ranAt=0;e.stopPropagation();e.preventDefault();
  },true);
})();

(function(){
  /* PC에서 가로로 넘기는 줄(게시판 칩·말머리·이모티콘)을 마우스로 끌어서 스크롤.
     터치는 브라우저가 알아서 해주지만 마우스는 휠 말고는 방법이 없어서,
     "잡아 끌기"가 안 먹는 것처럼 느껴진다. */
  var HSCROLLERS="#chips,.boardtabs,.tagbar,.emo-strip,.emo-tabs,.catbar-inner,.emo-pack-prev";
  var hdrag=null;
  document.addEventListener("pointerdown",function(e){
    if(e.pointerType!=="mouse"||e.button!==0)return;      // 터치·오른쪽 버튼은 그대로 둔다
    if(!e.target||!e.target.closest)return;
    if(e.target.closest("input,textarea,select"))return;  // 글자 선택을 방해하지 않게
    var el=e.target.closest(HSCROLLERS);
    if(!el||el.scrollWidth<=el.clientWidth+2)return;      // 넘칠 내용이 없으면 할 일 없음
    hdrag={el:el,startX:e.clientX,startScroll:el.scrollLeft,moved:0};
  });
  document.addEventListener("pointermove",function(e){
    if(!hdrag)return;
    var dx=e.clientX-hdrag.startX;
    if(Math.abs(dx)<=3)return;                            // 손떨림 정도는 클릭으로 본다
    if(!hdrag.moved)document.body.classList.add("hscroll-drag"); // 끄는 동안 글자 선택 끔
    hdrag.moved=Math.max(hdrag.moved,Math.abs(dx));
    hdrag.el.scrollLeft=hdrag.startScroll-dx;
    e.preventDefault();
  });
  function endHDrag(){
    if(!hdrag)return;
    var moved=hdrag.moved;
    hdrag=null;
    document.body.classList.remove("hscroll-drag");
    if(moved>5){
      // 끌고 나서 손을 뗀 자리의 칩이 눌리지 않게, 바로 뒤따르는 클릭 한 번만 막는다
      var block=function(ev){ev.stopPropagation();ev.preventDefault();};
      document.addEventListener("click",block,{capture:true,once:true});
      setTimeout(function(){document.removeEventListener("click",block,true);},80);
    }
  }
  document.addEventListener("pointerup",endHDrag);
  document.addEventListener("pointercancel",endHDrag);
  window.addEventListener("blur",endHDrag);

  function isTextInput(el){return el&&(el.tagName==="INPUT"||el.tagName==="TEXTAREA"||el.isContentEditable);}
  function touchKeyboard(){return !!(window.matchMedia&&window.matchMedia("(pointer: coarse)").matches);}
  document.addEventListener("focusin",function(e){if(isTextInput(e.target)&&touchKeyboard())document.body.classList.add("kb-open");});
  document.addEventListener("focusout",function(e){if(isTextInput(e.target))document.body.classList.remove("kb-open");});
  // 포커스된 입력칸이 화면 교체로 **사라지면 focusout이 오지 않는** 브라우저가 있다.
  // 그러면 하단 탭이 숨은 채 남는다 → 화면이 바뀔 때 실제 포커스를 보고 맞춘다.
  window.syncKbOpen=function(){
    var a=document.activeElement;
    if(!(a&&isTextInput(a)&&touchKeyboard()))document.body.classList.remove("kb-open");
  };
})();

// ===== 피드 pull-to-refresh: 목록 최상단에서 아래로 당기면 새로고침 =====
// iOS 자체 고무줄(rubber-band) 스크롤이 '당기는 움직임'을 담당하므로 콘텐츠(#main)는 직접 안 옮김
// (안 그러면 네이티브 바운스 + 내 이동이 겹쳐 이중으로 움직여 부자연스러움). 당김 정도에 반응하는
// 스피너만 보여주고, 당기는 동안은 transition을 꺼서 손가락을 즉시 따라오게 함.
(function(){
  var startY=0, dist=0, active=false, refreshing=false, THRESH=72;
  // 목록 화면인지 판단 — 게시판 탭(.boardtabs)이 있으면 피드(상단 제목 .board-head는 이제 안 씀)
  function onFeed(){var m=document.getElementById("main");return !!(m&&m.querySelector(".boardtabs")&&!m.querySelector(".detail,.cm-root,.profile"));}
  function ind(){var el=document.getElementById("ptrSpin");if(!el){el=document.createElement("div");el.id="ptrSpin";el.className="ptr";el.innerHTML='<div class="ptr-spin"></div>';document.body.appendChild(el);}return el;}
  document.addEventListener("touchstart",function(e){
    if(refreshing||window.scrollY>4||!onFeed())return;
    startY=e.touches[0].clientY; active=true; dist=0;
  },{passive:true});
  document.addEventListener("touchmove",function(e){
    if(!active)return;
    dist=e.touches[0].clientY-startY;
    var el=ind(), sp=el.querySelector(".ptr-spin");
    if(dist<=0){el.style.transition="";el.style.opacity="0";el.style.transform="translateY(0)";if(sp){sp.style.transition="";sp.style.transform="";}return;}
    el.style.transition="none"; // 당기는 동안 지연 없이 손가락 따라오게
    el.style.opacity=String(Math.min(1,dist/THRESH));
    el.style.transform="translateY("+Math.min(dist*0.4,48)+"px)";
    el.classList.toggle("ready",dist>THRESH);
    // 당긴(그리고 다시 올린) 정도에 비례해 스피너 회전 — 손가락을 즉시 따라 돌고, 올리면 되돌아감
    if(sp){sp.style.transition="none";sp.style.transform="rotate("+(dist*2)+"deg)";}
  },{passive:true});
  document.addEventListener("touchend",function(){
    if(!active)return; active=false;
    var el=ind(), sp=el.querySelector(".ptr-spin");
    el.style.transition="opacity .22s,transform .22s"; // 놓는 순간부터는 부드럽게
    if(dist>THRESH){
      refreshing=true;
      el.classList.remove("ready");
      if(sp){sp.style.transition="";sp.style.transform="";} // 인라인 회전 제거 → CSS 연속 스핀 애니메이션이 이어받음
      el.classList.add("spinning");
      el.style.opacity="1"; el.style.transform="translateY(34px)";
      Promise.resolve(typeof refreshFeed==="function"?refreshFeed(true):null).then(function(){
        setTimeout(function(){el.classList.remove("spinning");el.style.opacity="0";el.style.transform="translateY(0)";refreshing=false;},450);
      });
    }else{
      el.classList.remove("ready"); el.style.opacity="0"; el.style.transform="translateY(0)";
      if(sp){sp.style.transition="transform .22s";sp.style.transform="rotate(0deg)";} // 임계값 미만이면 부드럽게 원위치
    }
    dist=0;
  });
})();


// ===== 스와이프/드래그로 닫기 =====
(function(){
  // 1) 바텀시트: 아래로 스와이프하면 닫기
  var sheet=document.getElementById("sheet");
  if(sheet){
    var sy=0,cur=0,drag=false;
    sheet.addEventListener("touchstart",function(e){
      // 스크롤이 최상단일 때만 드래그 시작
      if(sheet.scrollTop>0)return;
      sy=e.touches[0].clientY;drag=true;sheet.classList.add("dragging");
    },{passive:true});
    sheet.addEventListener("touchmove",function(e){
      if(!drag)return;
      cur=e.touches[0].clientY-sy;
      if(cur<0)cur=0;
      sheet.style.transform="translateY("+cur+"px)";
    },{passive:true});
    sheet.addEventListener("touchend",function(){
      if(!drag)return;drag=false;sheet.classList.remove("dragging");
      sheet.style.transform="";
      if(cur>110){ if(typeof closeSheet==="function")closeSheet(); }
      cur=0;
    });
  }

  // 2) 상세글: 최상단에서 아래로 당기면 목록으로 (당김 제스처)
  var pullStartY=0, pulling=false, pullDist=0;
  function onMain(){
    document.addEventListener("touchstart",function(e){
      var d=document.querySelector("#main .detail");
      if(!d)return;
      if(window.scrollY>4)return;              // 페이지 최상단일 때만
      pullStartY=e.touches[0].clientY;pulling=true;pullDist=0;
    },{passive:true});
    document.addEventListener("touchmove",function(e){
      if(!pulling)return;
      var d=document.querySelector("#main .detail");if(!d)return;
      pullDist=e.touches[0].clientY-pullStartY;
      if(pullDist>0){
        d.classList.add("dragging");
        d.style.transform="translateY("+Math.min(pullDist*0.5,80)+"px)";
        d.style.opacity=String(Math.max(0.5,1-pullDist/400));
      }
    },{passive:true});
    document.addEventListener("touchend",function(){
      if(!pulling)return;pulling=false;
      var d=document.querySelector("#main .detail");if(!d){return;}
      d.classList.remove("dragging");
      if(pullDist>90){
        d.classList.add("closing");
        setTimeout(function(){ if(typeof renderList==="function")renderList(); },240);
      }else{
        d.style.transform="";d.style.opacity="";
      }
      pullDist=0;
    });
  }
  onMain();
})();

// 재진입 시 즉시 표시: 지난번 피드를 캐시에서 꺼내 바로 그림(빈 스켈레톤 대기 없이).
// 곧이어 initAuth→loadRealPosts가 최신 데이터로 교체함. 딥링크(글·유저)나 이미 다른 화면으로
// 이동한 경우엔 캐시로 홈을 그리지 않음.
// 읽은 글(READ) 표시를 기기에 저장(localStorage) — 새로고침해도 유지. 최근 1000개까지만.
function loadReadCache(){ try{var a=JSON.parse(localStorage.getItem("palo_read")||"[]");if(Array.isArray(a))READ=new Set(a);}catch(e){} }
function saveRead(){ try{var a=Array.from(READ);if(a.length>1000)a=a.slice(a.length-1000);localStorage.setItem("palo_read",JSON.stringify(a));}catch(e){} }
loadReadCache();
(function primeFromCache(){
  if(getPostIdFromPath()||getUserIdFromPath()||getCommissionIdFromPath()||userLeftHome)return;
  if(!window.__paloHasBackend)return; // 백엔드 없는 로컬 데모는 기존 폴백에 맡김
  var cached=loadFeedCache();
  if(cached&&cached.length){
    POSTS=cached.concat(POSTS.filter(function(p){return !p.dbId;}));
    try{renderChips();renderHot();renderTrend();renderList();}catch(e){}
  }
})();
// palo.js는 이제 하이드레이션 전에 실행된다(위 primeFromCache가 캐시 피드를 즉시 그림).
// window.supabase는 React 모듈이 평가될 때 주입되므로, 준비 신호를 받고 나서 이어간다.
// 이미 와 있으면(스크립트 순서가 뒤바뀐 경우) 곧바로 시작 — 어느 쪽이든 한 번만 돈다.
function _bootBackend(){
  track("view");
  initAuth().then(function(){loadRealPosts();handleNotifSettingsDeeplink();handleLoginError();});
}
if(window.supabase)_bootBackend();
else window.addEventListener("palo-supabase-ready",_bootBackend,{once:true});
// 네이버 로그인 실패 시 서버가 /?login_error=... 로 돌려보냄 → 사유를 토스트로 안내하고 주소 정리
function handleLoginError(){
  var params;try{params=new URLSearchParams(location.search);}catch(e){return;}
  var code=params.get("login_error");if(!code)return;
  try{history.replaceState({},"","/");}catch(_){}
  var msg={state:"보안 확인에 실패했어요. 다시 시도해 주세요.",no_email:"네이버 이메일 제공에 동의해야 로그인할 수 있어요.",config:"네이버 로그인이 아직 준비 중이에요. 잠시 후 다시 시도해 주세요.",token:"네이버 인증에 실패했어요. 다시 시도해 주세요.",profile:"네이버 정보를 불러오지 못했어요.",link:"로그인 처리에 실패했어요. 다시 시도해 주세요."}[code]||"네이버 로그인에 실패했어요.";
  toast(msg);
}

// ===== 게시글 이미지 미리보기 (PC 마우스 호버 / 모바일 길게 누르기) =====
var _imgPrevEl=null,_imgPrevTimer=null,_imgPrevActive=false,_imgPrevStart=null,_imgPrevSuppressClick=false;
var _canHover=(function(){try{return window.matchMedia("(hover:hover) and (pointer:fine)").matches;}catch(e){return false;}})();
function _ensureImgPrev(){
  if(_imgPrevEl)return _imgPrevEl;
  _imgPrevEl=document.createElement("div");
  _imgPrevEl.id="imgPreview";
  _imgPrevEl.innerHTML='<img alt="미리보기">';
  document.body.appendChild(_imgPrevEl);
  return _imgPrevEl;
}
// 그 게시글에 이미지가 있으면 첫 이미지 주소 반환(미리보기용). 없으면 null.
function _postImgSrc(post){var img=post&&post.querySelector(".nthumb img");return img?img.src:null;}
// 선택한 게시글의 '왼쪽 아래'에 붙여 배치. 문서 좌표(absolute)라 스크롤하면 그 게시글과 함께 움직임.
function _anchorImgPrev(post){
  var el=_imgPrevEl;if(!el||!post)return;
  var r=post.getBoundingClientRect();
  var sx=window.pageXOffset||document.documentElement.scrollLeft||0;
  var sy=window.pageYOffset||document.documentElement.scrollTop||0;
  el.style.left=Math.round(r.left+sx)+"px";
  el.style.top=Math.round(r.bottom+sy)+"px";
}
function showImgPreview(src,post){
  if(!src)return;
  var el=_ensureImgPrev(),im=el.querySelector("img");
  if(im.getAttribute("src")!==src)im.src=src;
  el.classList.add("show");
  _anchorImgPrev(post);
}
function hideImgPreview(){if(_imgPrevEl)_imgPrevEl.classList.remove("show");_imgPrevActive=false;}
function initImgPreview(){
  var main=document.getElementById("main");if(!main||main._imgPrevInit)return;main._imgPrevInit=true;
  // PC: 호버하면 그 글의 왼쪽 아래에 표시, 글에서 벗어나면 숨김
  if(_canHover){
    main.addEventListener("mouseover",function(e){
      var post=e.target.closest(".post");if(!post)return;
      var src=_postImgSrc(post);if(!src)return;
      showImgPreview(src,post);
    });
    main.addEventListener("mouseout",function(e){
      var post=e.target.closest(".post");
      if(post&&(!e.relatedTarget||!post.contains(e.relatedTarget)))hideImgPreview();
    });
  }
  // 모바일: 손가락을 대면 곧바로 그 글의 왼쪽 아래에 표시. 손을 떼도 계속 남아 있고, 스크롤하면 글과 함께 움직임.
  // 짧게 탭하면 평소처럼 글이 열리고(그때 미리보기 정리), 오래 눌렀다 떼면 글은 안 열리고 미리보기만 남음.
  // 미리보기를 닫으려면 빈 곳(글이 아닌 곳)을 탭하면 됨.
  main.addEventListener("touchstart",function(e){
    var post=e.target.closest(".post");if(!post)return;
    var src=_postImgSrc(post);if(!src)return;
    var t=e.touches[0];_imgPrevStart={x:t.clientX,y:t.clientY,at:Date.now()};
    _imgPrevActive=true;
    showImgPreview(src,post);
  },{passive:true});
  main.addEventListener("touchend",function(e){
    var held=_imgPrevStart?(Date.now()-_imgPrevStart.at):0;
    // 오래 눌렀다 뗀 경우에만 뒤따르는 click(글 열기)을 막음 → 미리보기를 보던 중이므로 글은 열지 않음
    if(_imgPrevActive&&held>=350){_imgPrevSuppressClick=true;setTimeout(function(){_imgPrevSuppressClick=false;},450);}
    _imgPrevStart=null; // 미리보기는 그대로 유지(손을 떼도 안 사라짐)
  });
  main.addEventListener("touchcancel",function(){_imgPrevStart=null;});
  // 길게 눌러 미리보기를 띄운 경우 뒤이어 오는 click(글 열기)은 무시. 그 외의 클릭은 화면이 바뀌므로 미리보기 정리.
  main.addEventListener("click",function(e){
    if(_imgPrevSuppressClick){e.stopPropagation();e.preventDefault();return;}
    hideImgPreview();
  },true);
  // 글이 아닌 빈 곳을 탭/클릭하면 미리보기 닫기
  document.addEventListener("touchstart",function(e){if(!e.target.closest(".post"))hideImgPreview();},{passive:true,capture:true});
  document.addEventListener("click",function(e){if(!e.target.closest(".post"))hideImgPreview();},true);
}
initImgPreview();

