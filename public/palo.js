var BOARDS=[
  {group:"이야기",items:[
    {id:"all",name:"전체 글",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"7\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M3 7l2-3h6l2 3\"/></svg>"},
    {id:"talk",name:"수다 광장",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z\"/></svg>"},
    {id:"ask",name:"물어보기",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7M12 17h.01\"/></svg>"}]},
  {group:"그리는 중",items:[
    {id:"wip",name:"작업 과정",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 20h4L18 10l-4-4L4 16v4z\"/><path d=\"M13 7l4 4\"/></svg>"},
    {id:"crit",name:"피드백 해주세요",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>"},
    {id:"sketch",name:"그림공부",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 6C10 4 6 4 3 5v14c3-1 7-1 9 1 2-2 6-2 9-1V5c-3-1-7-1-9 1z\"/><path d=\"M12 6v14\"/></svg>"}]},
  {group:"함께",items:[
    {id:"challenge",name:"챌린지",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 3v18\"/><path d=\"M5 4h13l-2 4 2 4H5\"/></svg>"},
    {id:"tip",name:"팁 · 강좌",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 4 2 9l10 5 10-5-10-5z\"/><path d=\"M6 11v5c0 1 3 2 6 2s6-1 6-2v-5\"/></svg>"}]},
  {group:"거래",trade:true,items:[
    {id:"used",name:"중고 장비",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 12l8-8h6a2 2 0 0 1 2 2v6l-8 8z\"/><circle cx=\"15\" cy=\"9\" r=\"1.4\" fill=\"currentColor\" stroke=\"none\"/></svg>"}]},
  {group:"기타",items:[
    {id:"adult",name:"에치치",icon:"<span class=\"ic\" style=\"font-size:18px;line-height:1\">🔞</span>"}]}
];
var CATMAP={talk:{label:"수다",cls:"talk-c"},ask:{label:"고민",cls:"help-c"},crit:{label:"피드백",cls:"crit-c"},
  wip:{label:"작업과정",cls:"crit-c"},tip:{label:"팁",cls:"tip-c"},challenge:{label:"챌린지",cls:"chal-c"},
  sketch:{label:"그림공부",cls:"tip-c"},trade:{label:"거래",cls:"free-c"},used:{label:"거래",cls:"free-c"},
  review:{label:"후기",cls:"free-c"},adult:{label:"에치치",cls:"help-c"}};

var postsLoaded=false; // loadRealPosts()가 실제 글을 POSTS에 합친 뒤 true — 이 전에는 데모 글로 renderList()를 강제로 돌리지 않음(로그인 리다이렉트 직후 더미 글이 잠깐 보이는 버그 방지)
var POSTS=[
  {id:1,board:"crit",title:"숲 속 마녀 러프 구도 3개 뽑았는데 뭐가 제일 나을까요?",author:"달빛초",time:"10분 전",likes:34,views:210,thumb:"t1",stage:"러프",
   content:["구도를 세 개 잡아봤는데 각각 장단이 있어서 결정을 못 하겠어요.","1번은 안정적인데 심심하고, 2번은 역동적인데 시선이 분산되고, 3번은 마음엔 드는데 배경이 비어 보여요.","여러분이라면 어떤 걸 밀고 가시겠어요? 이유도 같이 들려주시면 정말 감사하겠습니다 🙏"],
   comments:[{n:"노을공방",t:"5분 전",txt:"저는 3번이요. 배경 빈 건 오히려 여백으로 살리면 분위기 살 것 같아요. 마녀 시선 방향으로 새 한 마리만 넣어도 채워질 듯!"},{n:"먹구름",t:"2분 전",txt:"2번 구도에서 주인공을 살짝 왼쪽으로 옮기면 시선 분산 문제 잡을 수 있어요."}]},
  {id:2,board:"ask",title:"몇 년째 실력이 제자리인 것 같을 때 다들 어떻게 뚫으셨어요?",author:"붓끝",time:"25분 전",likes:51,views:402,thumb:"none",
   content:["그림 그린 지 4년쯤 됐는데 최근 1년은 정말 안 느는 느낌이에요.","매일 그리긴 하는데 늘 그리던 것만 그리게 되네요. 다들 이런 정체기 어떻게 넘기셨나요?"],
   comments:[{n:"뎃생왕",t:"20분 전",txt:"편한 것만 그리면 딱 그 자리예요. 일부러 못 그리는 걸(손, 발, 배경) 한 달만 파보세요. 확 뚫립니다."},{n:"연필깎이",t:"14분 전",txt:"모작 추천이요. 좋아하는 작가 그림 한 장을 진짜 똑같이 따라 그려보면 내 약점이 보여요."}]},
  {id:3,board:"crit",title:"밤 씬인데 광원이 붕 뜨는 느낌... 명암 조언 구합니다",author:"노을공방",time:"40분 전",likes:28,views:188,thumb:"t2",stage:"채색",
   content:["도시 야경을 그리는데 빛이 자연스럽게 안 붙고 스티커처럼 떠 보여요.","광원 주변에만 밝기를 주고 나머지는 어둡게 했는데도 어색합니다."],
   comments:[{n:"달빛초",t:"30분 전",txt:"광원에서 멀어질수록 채도도 같이 떨어뜨려 보세요. 밝기만 조절하면 붕 떠요."}]},
  {id:4,board:"tip",title:"클립스튜디오 손 그림자 3초 만에 넣는 루틴 공유합니다",author:"연필깎이",time:"1시간 전",likes:96,views:720,thumb:"t3",stage:"완성",
   content:["매번 그림자 레이어 만들기 귀찮으셨죠? 오토액션 하나면 끝납니다.","곱하기 레이어 생성 → 클리핑 → 저채도 보라 채우기를 액션으로 묶어두면 클릭 한 번이에요.","자세한 설정값은 아래 이미지 참고하세요!"],
   comments:[{n:"붓끝",t:"50분 전",txt:"이거 진짜 꿀팁이네요. 바로 저장했습니다 🙏"}]},
  {id:5,board:"talk",title:"다들 그림 그릴 때 뭐 틀어놓으세요? 저는 빗소리 ASMR파",author:"먹구름",time:"2시간 전",likes:44,views:531,thumb:"none",
   content:["집중 안 될 때 빗소리 틀면 이상하게 잘 되더라고요.","다들 작업할 때 배경음 뭐 들으시는지 궁금해요!"],
   comments:[{n:"노을공방",t:"1시간 전",txt:"저는 로파이 힙합이요. 가사 있으면 손이 멈춰서요 ㅋㅋ"},{n:"뎃생왕",t:"40분 전",txt:"팟캐스트 틀어놓고 그리는데 가끔 내용 놓쳐서 되감기 반복합니다..."}]},
  {id:6,board:"tip",title:"[연재] 처음 배우는 인체 비례 ③ — 어깨는 왜 이렇게 어려운가",author:"뎃생왕",time:"3시간 전",likes:112,views:905,thumb:"t4",stage:"선화",
   content:["3편입니다. 이번 주제는 많은 분들이 어려워하는 어깨예요.","어깨는 관절이 아니라 '움직이는 판'이라고 생각하면 훨씬 쉬워집니다.","쇄골-견갑골 세트가 통째로 움직인다는 걸 기억하세요."],
   comments:[{n:"달빛초",t:"2시간 전",txt:"연재 잘 보고 있어요! 다음 편은 손목이었으면..."}]},
  {id:7,board:"talk",title:"AI 그림, 우리 커뮤니티에선 어디까지 허용할지 의견 모아요",author:"운영자",time:"5시간 전",likes:133,views:2100,thumb:"none",
   content:["Palo에서 AI 생성 이미지를 어떻게 다룰지 회원 의견을 모읍니다.","① 전면 금지 ② 전용 게시판에서만 허용 ③ 출처 표기 시 허용 — 어느 쪽이 좋을까요?","댓글로 의견 남겨주세요. 2주 뒤 규정에 반영하겠습니다."],
   comments:[{n:"뎃생왕",t:"4시간 전",txt:"전용 게시판 분리에 한 표. 완전 금지는 현실적으로 관리가 어려울 것 같아요."},{n:"먹구름",t:"3시간 전",txt:"최소한 출처 표기는 필수여야 한다고 봅니다."},{n:"붓끝",t:"2시간 전",txt:"저는 창작 과정 공유가 핵심인 곳이라 전면 금지 쪽이요."}]},
  {id:8,board:"trade",title:"귀여운 SD 캐릭터 커미션 열었어요 (잔여 2슬롯 · 15,000원~)",author:"작가_레몬",time:"6시간 전",likes:42,views:310,thumb:"t1",stage:"완성",
   content:["오랜만에 커미션 오픈합니다! SD 캐릭터 전문이에요.","슬롯 2자리 남았고, 자세한 가격표와 샘플은 프로필에서 확인 가능합니다."],
   comments:[{n:"달빛초",t:"5시간 전",txt:"샘플 너무 귀여워요 ㅠㅠ 신청 넣었습니다!"}]},
  {id:9,board:"wip",title:"3일째 붙잡고 있는 배경 일러스트, 드디어 채색 들어갑니다",author:"노을공방",time:"7시간 전",likes:67,views:445,thumb:"t2",stage:"채색",
   content:["선화만 이틀 걸렸네요. 이제 밑색 깔고 있어요.","완성되면 스케치북에 과정 통째로 올릴게요!"],
   comments:[{n:"연필깎이",t:"6시간 전",txt:"디테일 미쳤다... 완성본 기대할게요"}]},
  {id:10,board:"ask",title:"타블렛 입문하려는데 액정형 vs 판형 뭐가 나을까요?",author:"새싹",time:"8시간 전",likes:39,views:288,thumb:"none",
   content:["완전 입문자입니다. 예산은 30만 원 안쪽이에요.","판형이 싸다는 건 아는데 적응이 어렵다고 해서 고민이에요."],
   comments:[{n:"뎃생왕",t:"7시간 전",txt:"입문이면 판형으로 손 먼저 익히는 걸 추천해요. 어차피 나중에 액정 가도 판형 감각이 도움 됩니다."}]},
  {id:11,board:"challenge",title:"[7월 4주 챌린지] 비 오는 창가 — 제 참가작이에요",author:"먹구름",time:"9시간 전",likes:58,views:376,thumb:"t4",stage:"완성",
   content:["이번 주 주제 '비 오는 창가'로 그려봤어요.","유리에 맺힌 물방울 표현이 제일 어려웠네요. 다들 참여해요!"],
   comments:[{n:"달빛초",t:"8시간 전",txt:"물방울 표현 어떻게 하셨어요?? 튜토리얼 각인데요"}]},
  {id:12,board:"sketch",title:"오늘의 낙서 모음 — 지하철에서 그린 사람들",author:"붓끝",time:"10시간 전",likes:73,views:512,thumb:"t5",stage:"러프",
   content:["출퇴근길에 몰래 그린 크로키들이에요.","움직이는 사람 그리는 게 정물보다 훨씬 도움 되는 것 같아요."],
   comments:[{n:"새싹",t:"9시간 전",txt:"선이 살아있네요 부럽습니다"}]}
  ,{id:13,board:"talk",title:"작업할 때 손목 아픈 분들 어떻게 관리하세요? 스트레칭 공유해요",author:"손목지킴이",time:"11시간 전",likes:81,views:640,thumb:"none",
   content:["장시간 작업하니 손목이 너무 아파서요.","다들 어떻게 관리하시는지, 좋은 스트레칭이나 보조기구 있으면 공유해요!"],
   comments:[{n:"연필깎이",t:"10시간 전",txt:"저는 1시간마다 알람 맞춰놓고 손목 돌려줍니다. 확실히 덜 아파요."}]},
  {id:14,board:"tip",title:"무료로 쓸 수 있는 그림 레퍼런스 사이트 모음 (포즈·손·배경)",author:"자료수집가",time:"12시간 전",likes:154,views:1320,thumb:"t3",stage:"완성",
   content:["제가 자주 쓰는 무료 레퍼런스 사이트들 정리했어요.","포즈, 손, 배경, 명암까지 종류별로 모아봤습니다. 도움 되시길!"],
   comments:[{n:"새싹",t:"11시간 전",txt:"이런 거 찾고 있었는데 감사합니다 ㅠㅠ"},{n:"붓끝",t:"10시간 전",txt:"저장 완료! 정성 글 감사해요"}]},
  {id:15,board:"crit",title:"손 그리는 게 너무 어려워요... 이 손 어디가 이상한지 봐주세요",author:"초보자",time:"13시간 전",likes:22,views:180,thumb:"t2",stage:"선화",
   content:["손을 그렸는데 뭔가 어색한데 어디가 문제인지 모르겠어요.","솔직한 피드백 부탁드립니다!"],
   comments:[{n:"뎃생왕",t:"12시간 전",txt:"손가락 관절 위치가 조금 높아요. 마디를 살짝 내려보세요."}]},
  {id:16,board:"talk",title:"드디어 첫 커미션 완료했어요! 후기 남깁니다 :)",author:"신입작가",time:"14시간 전",likes:97,views:710,thumb:"t5",stage:"완성",
   content:["긴장했는데 의뢰인분이 너무 만족해주셔서 뿌듯했어요.","커미션 처음 여시는 분들 응원합니다!"],
   comments:[{n:"레몬",t:"13시간 전",txt:"축하드려요! 첫 완료가 제일 기억에 남죠"}]},
  {id:17,board:"ask",title:"아이패드 vs 액정타블렛, 그림 입문용으로 뭐가 나을까요?",author:"고민중",time:"15시간 전",likes:45,views:390,thumb:"none",
   content:["둘 다 장단점이 있는 것 같아서 고민이에요.","휴대성은 아이패드인데 화면 큰 건 액정타블렛이고...","입문자 기준으로 조언 부탁드려요."],
   comments:[{n:"도비",t:"14시간 전",txt:"입문이면 아이패드 추천이요. 어디서든 그릴 수 있는 게 실력 향상에 큰 도움 됩니다."}]},
  {id:18,board:"wip",title:"한 달째 그리고 있는 대형 일러스트, 드디어 마무리 단계",author:"장인정신",time:"16시간 전",likes:128,views:960,thumb:"t4",stage:"채색",
   content:["캐릭터 5명이 나오는 단체 일러라 시간이 오래 걸렸네요.","이제 배경 디테일만 남았어요. 완성되면 꼭 보여드릴게요!"],
   comments:[{n:"먹구름",t:"15시간 전",txt:"벌써부터 대작 느낌... 완성 기대합니다"}]},
  {id:19,board:"tip",title:"[강좌] 채색 초보를 위한 명암 넣기 기초 3단계",author:"채색마스터",time:"18시간 전",likes:203,views:1580,thumb:"t1",stage:"완성",
   content:["채색 입문자분들이 제일 어려워하는 명암을 3단계로 쉽게 설명해봤어요.","1) 광원 정하기 2) 그림자 영역 나누기 3) 반사광 넣기","순서대로만 하면 훨씬 입체감이 살아납니다."],
   comments:[{n:"초보자",t:"17시간 전",txt:"명암 항상 어려웠는데 단계별로 보니 이해돼요!"},{n:"신입작가",t:"16시간 전",txt:"저장했습니다. 감사해요"}]},
  {id:20,board:"talk",title:"다들 하루에 그림 몇 시간씩 그리세요? 루틴 궁금해요",author:"성실러",time:"20시간 전",likes:66,views:520,thumb:"none",
   content:["꾸준히 그리고 싶은데 다들 어떻게 시간 관리하시는지 궁금해요.","하루 루틴 공유해주시면 참고할게요!"],
   comments:[{n:"장인정신",t:"19시간 전",txt:"저는 아침에 1시간 러프, 저녁에 2시간 채색으로 나눠서 해요."}]}
];
var HOT=[POSTS[6],POSTS[1],POSTS[3]];
var TREND=[
  {name:"비 오는 창가",tag:"챌린지 1위",thumb:"t1",sub:"참여 38명"},
  {name:"인체 비례 연재",tag:"강좌 급상승",thumb:"t4",sub:"조회 905"},
  {name:"숲 속 마녀",tag:"크리틱 화제",thumb:"t2",sub:"훈수 12"},
  {name:"손 그림자 루틴",tag:"팁 인기",thumb:"t3",sub:"좋아요 96"},
  {name:"AI 정책 투표",tag:"토론 뜨거움",thumb:"t5",sub:"댓글 214"}
];
var GRADS={t1:"#6b7d63,#414f3a",t2:"#7a5a8a,#493a58",t3:"#c2410c,#8a2f08",t4:"#3a5674,#26384c",t5:"#b08968,#7a5c42"};
var state={board:"all",sort:"new",query:"",shown:8,tag:null,viewMode:"list"};
var PER=40;var page=1;var READ=new Set();var FOLLOW=new Set();
var ME={nick:"나"};
var AUTH={user:null,profile:null};
var SETTINGS={cm:true,like:true,notice:true,chat:true};
var notifFilter="all";var pfTab="mine";
function dispName(a){return a==="나"?ME.nick:a}
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
  var path='cover-'+Date.now()+'-'+f.name.replace(/\.[^.]+$/,'').replace(/[^a-zA-Z0-9_.-]/g,'_')+'.'+ext;
  var up=await window.supabase.storage.from('post-images').upload(path,uploadBlob,f.type==='image/gif'?undefined:{contentType:uploadBlob.type});
  if(up.error){toast('업로드 실패: '+up.error.message);return;}
  var pub=window.supabase.storage.from('post-images').getPublicUrl(path);
  var url=pub.data.publicUrl;
  var res=await window.supabase.from('profiles').update({cover_url:url}).eq('id',AUTH.user.id);
  if(res.error){toast('저장 실패: '+res.error.message);return;}
  if(AUTH.profile)AUTH.profile.cover_url=url;
  toast('커버 이미지를 변경했어요');
  openProfile();
}
var NOTIFS=[
  {type:"cm",icon:"💬",txt:"뎃생왕님이 회원님의 글에 훈수를 남겼어요",time:"5분 전",post:15,read:false},
  {type:"like",icon:"❤️",txt:"달빛초님 외 3명이 회원님의 글을 좋아해요",time:"30분 전",post:14,read:false},
  {type:"sys",icon:"🏁",txt:"7월 넷째 주 챌린지 마감이 2일 남았어요",time:"2시간 전",post:6,read:false},
  {type:"sys",icon:"📌",txt:"공지: 크리틱 매너 안내가 업데이트됐어요",time:"어제",post:null,read:true},
  {type:"cm",icon:"💬",txt:"연필깎이님이 회원님의 댓글에 답글을 남겼어요",time:"어제",post:4,read:true},
  {type:"like",icon:"❤️",txt:"노을공방님이 회원님의 댓글을 좋아해요",time:"2일 전",post:2,read:true},
  {type:"sys",icon:"🏁",txt:"7월 셋째 주 챌린지가 마감됐어요 — 참여작 41개!",time:"3일 전",post:6,read:true},
  {type:"cm",icon:"💬",txt:"먹구름님이 회원님의 글에 훈수를 남겼어요",time:"4일 전",post:8,read:true},
  {type:"like",icon:"❤️",txt:"붓끝님 외 5명이 회원님의 글을 좋아해요",time:"5일 전",post:10,read:true}
];
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
var AD_LOCKED_COMMISSION_IDS={}; // 광고 심사중/집행중인 커미션 id들 — 수정 잠금용(POSTS의 adLocked와 동일한 목적)
var AD_USER_SHARE_MAX=0.20; // 유저 광고가 전체 광고 자리 노출에서 차지할 수 있는 최대 비중
var AD_PER_AD_SHARE_MAX=0.04; // 광고 하나가 차지할 수 있는 최대 비중(초기엔 광고가 적어 소수가 20%를 독점하는 걸 막기 위함)
function computeAdWeights(ads){
  var total=ads.reduce(function(s,a){return s+(a.points_spent||0);},0);
  if(!total)return ads.map(function(){return 0;});
  return ads.map(function(a){
    return Math.min(AD_PER_AD_SHARE_MAX,AD_USER_SHARE_MAX*(a.points_spent/total));
  });
}
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
async function loadRealPosts(){
  if(!window.supabase)return;
  var noticeRes=await window.supabase.from("notices").select("*").order("created_at",{ascending:false}).limit(1);
  if(!noticeRes.error&&noticeRes.data.length)LATEST_NOTICE=noticeRes.data[0];

  var lvRes=await window.supabase.from("level_thresholds").select("*").order("level");
  if(!lvRes.error)LEVEL_THRESHOLDS=lvRes.data||[];

  var adRes=await window.supabase.from("user_ads").select("id,image_url,linked_post_id,linked_commission_id,points_spent").eq("status","active").gt("expires_at",new Date().toISOString());
  if(!adRes.error)ACTIVE_ADS=adRes.data||[];

  var adLockRes=await window.supabase.from("user_ads").select("linked_post_id,linked_commission_id,status,expires_at").in("status",["pending","active"]);
  var adLockedIds={};
  AD_LOCKED_COMMISSION_IDS={};
  var nowIso=new Date().toISOString();
  (adLockRes.data||[]).forEach(function(a){
    if(a.status==="pending"||(a.status==="active"&&a.expires_at&&a.expires_at>nowIso)){
      if(a.linked_post_id)adLockedIds[a.linked_post_id]=true;
      if(a.linked_commission_id)AD_LOCKED_COMMISSION_IDS[a.linked_commission_id]=true;
    }
  });

  var res=await window.supabase.from("posts").select("*").order("created_at",{ascending:false});
  if(res.error){console.error(res.error);return;}
  var dbIds=res.data.map(function(row){return row.id});

  var profRes=await window.supabase.from("profiles").select("id,nickname,level,avatar_url");
  var profById={};
  if(!profRes.error)profRes.data.forEach(function(row){profById[row.id]={nickname:row.nickname,level:row.level,avatarUrl:row.avatar_url};});
  function nameFor(uid){return uid&&profById[uid]?profById[uid].nickname:"익명";}
  function levelFor(uid){return uid&&profById[uid]?profById[uid].level:null;}
  function avatarFor(uid){return uid&&profById[uid]?profById[uid].avatarUrl:null;}

  var cmRes=dbIds.length?await window.supabase.from("comments").select("*").in("post_id",dbIds).order("created_at"):{data:[]};
  var commentIds=(cmRes.data||[]).map(function(c){return c.id});
  var helpfulRes=commentIds.length?await window.supabase.from("comment_helpful").select("comment_id,user_id").in("comment_id",commentIds):{data:[]};
  var helpfulCountByComment={},helpfulMine={};
  (helpfulRes.data||[]).forEach(function(hf){
    helpfulCountByComment[hf.comment_id]=(helpfulCountByComment[hf.comment_id]||0)+1;
    if(AUTH.user&&hf.user_id===AUTH.user.id)helpfulMine[hf.comment_id]=true;
  });
  var commentsByPost={};
  (cmRes.data||[]).forEach(function(c){
    (commentsByPost[c.post_id]=commentsByPost[c.post_id]||[]).push({n:nameFor(c.author_id),t:timeAgo(c.created_at),txt:c.content,dbId:c.id,authorId:c.author_id,lv:levelFor(c.author_id),av:avatarFor(c.author_id),h:helpfulCountByComment[c.id]||0,_me:!!helpfulMine[c.id]});
  });

  var likeRes=dbIds.length?await window.supabase.from("likes").select("post_id,user_id").in("post_id",dbIds):{data:[]};
  var likesByPost={};
  (likeRes.data||[]).forEach(function(l){
    (likesByPost[l.post_id]=likesByPost[l.post_id]||[]).push(l.user_id);
  });

  var imgRes=dbIds.length?await window.supabase.from("post_images").select("post_id,url,sort").in("post_id",dbIds).order("sort"):{data:[]};
  var imagesByPost={};
  (imgRes.data||[]).forEach(function(im){
    (imagesByPost[im.post_id]=imagesByPost[im.post_id]||[]).push(im.url);
  });

  var real=res.data.map(function(row){
    var likers=likesByPost[row.id]||[];
    return {id:100000+row.id,dbId:row.id,authorId:row.author_id,board:row.board,title:row.title,category:row.category,author:nameFor(row.author_id),authorLevel:levelFor(row.author_id),authorAvatar:avatarFor(row.author_id),
      time:timeAgo(row.created_at),createdAt:row.created_at,likes:likers.length,_liked:likers.indexOf(myLikeId())>-1,
      views:row.views,thumb:"none",stage:row.stage,images:imagesByPost[row.id],
      isManagerPick:!!row.is_manager_pick,pickPosition:row.pick_position,pickedAt:row.picked_at,adLocked:!!adLockedIds[row.id],
      reviewedNickname:row.reviewed_nickname||null,reviewedUserId:row.reviewed_user_id||null,commissionPostId:row.commission_post_id||null,commissionSentiment:row.commission_sentiment||null,
      commissionId:row.commission_id||null,commissionCtype:row.commission_ctype||null,commissionBadReason:row.commission_bad_reason||null,
      content:(row.content||"").split("\n").filter(Boolean),html:row.content_html||undefined,comments:commentsByPost[row.id]||[]};
  });
  POSTS=real.concat(POSTS);
  postsLoaded=true;
  renderNav(document.getElementById("boardNav"));renderNav(document.getElementById("boardNavM"));renderNav(document.getElementById("boardNavS"));
  renderTrend();
  var initialDbId=getPostIdFromPath();
  var initialPost=initialDbId?POSTS.find(function(x){return x.dbId===initialDbId}):null;
  var initialUserId=getUserIdFromPath();
  if(initialPost)openPost(initialPost.id);
  else if(initialUserId)openUserProfile(initialUserId);
  else renderList();
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
window.addEventListener("popstate",function(){
  var dbId=getPostIdFromPath();
  var post=dbId?POSTS.find(function(x){return x.dbId===dbId}):null;
  var userId=getUserIdFromPath();
  if(post)openPost(post.id);
  else if(userId)openUserProfile(userId);
  // 구글 로그인 리다이렉트 직후 Supabase가 URL의 인증 토큰을 정리하면서 popstate 이벤트를
  // 발생시키는 경우가 있음 — 그때 postsLoaded가 아직 false면(실제 글을 아직 못 불러온 상태)
  // 더미 글로 목록을 그리지 않고 기다림(loadRealPosts()가 끝나면 스스로 그림).
  else if(postsLoaded||!window.supabase)renderList();
});

/* ---------- 로그인 (Supabase Auth) ---------- */
async function initAuth(){
  if(!window.supabase)return;
  var res=await window.supabase.auth.getSession();
  await applySession(res.data.session);
  window.supabase.auth.onAuthStateChange(function(event,session){
    applySession(session);
  });
}
var globalChatNotifUserId=null;
async function applySession(session){
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
  }else{
    ME.nick="나";
    globalChatNotifUserId=null;
    unsubscribeFromNotifications();
    NOTIFS=NOTIFS.filter(function(n){return !n.dbId});
    syncNotifBadge();
  }
  if(document.getElementById("myProfileView"))openProfile();
}
function loginWithGoogle(){
  window.supabase.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin}});
}
async function logout(){
  await window.supabase.auth.signOut();
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
function postThumbHTML(p){
  var imgCount=p.images?p.images.length:((p.thumb!=="none")?(Math.floor(p.likes/18)%6+1):0); // demo image-count badge
  if(p.images&&p.images.length){
    return '<div class="nthumb"><img src="'+esc(p.images[0])+'" alt="" style="width:100%;height:100%;object-fit:cover">'+
      (p.stage?'<span class="nstage">'+p.stage+'</span>':'')+
      (imgCount>1?'<span class="ncount">'+imgCount+'+</span>':'')+
    '</div>';
  }
  if(p.thumb==="none")return"";
  return '<div class="nthumb '+p.thumb+'">'+
    (p.stage?'<span class="nstage">'+p.stage+'</span>':'')+
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
      h+='<div class="bn-a'+(state.board===b.id?' on':'')+'" onclick="selectBoard(\''+b.id+'\')">'+b.icon+''+b.name+(cnt?'<span class="cnt">'+cnt+'</span>':'')+'</div>';
    });
    h+='</div>';
  });
  el.innerHTML=h;
}
function renderChips(){
  var flat=[{id:"all",name:"전체 글"}];
  BOARDS.forEach(function(g){g.items.forEach(function(b){if(b.id!=="all")flat.push(b)})});
  document.getElementById("chips").innerHTML=flat.map(function(b){
    return '<button class="chip'+(state.board===b.id?' on':'')+'" onclick="selectBoard(\''+b.id+'\')">'+b.name+'</button>';
  }).join("");
}
function renderHot(){
  document.getElementById("hotList").innerHTML=HOT.map(function(p,i){
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
function emberHTML(){
  var top=POSTS.filter(function(p){return p.board!=="adult"&&p.board!=="trade"&&p.board!=="review"}).sort(function(a,b){return(b.likes+b.comments.length*3)-(a.likes+a.comments.length*3)}).slice(0,6);
  var h='<div class="ember"><div class="ember-head"><span class="fire"><svg class="ic" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 1-3s0 2 2 2 1-4 2-8z"/></svg></span>이글이글 · 지금 반응 뜨거운 글</div><div class="ember-scroll">';
  top.forEach(function(p){
    h+='<div class="ember-card" onclick="openPost('+p.id+')"><div class="ec-cat">'+catFor(p).label+'</div>'+
       '<div class="ec-t">'+esc(p.title)+'</div><div class="ec-m"><span class="up">🔥 '+p.likes+'</span><span>💬 '+p.comments.length+'</span></div></div>';
  });
  return h+'</div></div>';
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
function adRow(){
  if(ACTIVE_ADS.length){
    var weights=computeAdWeights(ACTIVE_ADS);
    var r=Math.random(),cum=0;
    for(var i=0;i<ACTIVE_ADS.length;i++){
      cum+=weights[i];
      if(r<cum){
        var ad=ACTIVE_ADS[i];
        return '<div class="ad ad-banner" role="complementary" aria-label="광고" style="cursor:pointer;position:relative" onclick="'+adTargetOnclick(ad)+'">'+
          '<span class="ad-label">유저 광고</span>'+
          '<button class="ad-report-btn" onclick="reportAd('+ad.id+',event)" title="이 광고 신고">🚩</button>'+
          '<img src="'+esc(ad.image_url)+'" alt="유저 광고">'+
        '</div>';
      }
    }
  }
  return '<div class="ad" role="complementary" aria-label="광고">'+
    '<span class="ad-label">AD</span>'+
    '<div class="ad-ph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" style="width:22px;height:22px"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m4 18 5-5 4 3 3-2 4 4"/></svg></div>'+
    '<div class="ad-body"><div class="ad-t">광고 문의 환영</div>'+
    '<div class="ad-d">이 자리에 유저 광고와 유료 광고가 노출됩니다</div></div>'+
  '</div>';
}
function renderList(){
  leaveChat();
  if(location.pathname!=="/"){history.pushState({},"","/");document.title="Palo · 그림 그리는 사람들의 커뮤니티";}
  var main=document.getElementById("main");var arr=filteredPosts();
  var sub=state.query?('"'+esc(state.query)+'" 검색 결과 '+arr.length+'건'):(state.sort==="new"?"방금 올라온 이야기부터":"반응 많은 순으로");
  var h='<div class="board-head">'+
    ('<div class="bh-title"><h1 class="serif">'+esc(state.query?"검색":boardName(state.board))+'</h1><span class="sub">'+sub+'</span></div>')+
    '<div class="bh-controls">'+
      '<div class="sortbar"><button class="'+(state.sort==="new"?"on":"")+'" onclick="setSort(\'new\')">최신</button><button class="'+(state.sort==="hot"?"on":"")+'" onclick="setSort(\'hot\')">인기</button></div>'+
      '<div class="sortbar viewbar"><button class="'+(state.viewMode==="list"?"on":"")+'" onclick="setViewMode(\'list\')">☰ 목록형</button><button class="'+(state.viewMode==="album"?"on":"")+'" onclick="setViewMode(\'album\')">▦ 앨범형</button></div>'+
    '</div>'+
    '</div>';
  h+=tagFilterBarHTML();
  if(state.board==="all"&&!state.query){
    if(LATEST_NOTICE)h+='<div class="notice" onclick="showNotice()"><span class="pin">공지</span><span class="nt">📢 '+esc(LATEST_NOTICE.title)+'</span></div>';
    h+='<div class="notice" onclick="openRules()"><span class="pin">공지</span><span class="nt">📌 Palo 이용 규칙 & 크리틱 매너 안내 (처음 오셨다면 꼭!)</span></div>';
  }
  if(arr.length===0){
    h+='<div class="empty"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg><h3>아직 글이 없어요</h3><p>이 게시판의 첫 글을 남겨보세요.</p><button onclick="openWrite()">글쓰기</button></div>';
    main.innerHTML=h;return;
  }
  var totalPages=Math.max(1,Math.ceil(arr.length/PER));if(page>totalPages)page=totalPages;var visible=arr.slice((page-1)*PER,page*PER);
  if(state.board==="all"&&!state.query&&state.sort==="new")h+=emberHTML();
  if(state.board==="review"&&!state.query){
    h+=reviewAlbumHTML(visible);
    if(totalPages>1)h+=pagerHTML(totalPages);
    main.innerHTML=h;
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
    main.innerHTML=h;
    return;
  }
  h+='<div class="list">';
  visible.forEach(function(p,idx){
    var c=catFor(p);
    var isHot=p.likes>=90;
    var thumb=postThumbHTML(p);
    h+='<div class="post rip'+(isHot?' hot-post':'')+(READ.has(p.id)?' read':'')+(p.id===justAddedId?' justAdded':'')+'" tabindex="0" role="button" onclick="openPost('+p.id+')" onkeydown="if(event.key===\'Enter\')openPost('+p.id+')">'+
      '<div class="pmain">'+
        '<div class="ptitle">'+(p.isManagerPick?'<span class="pick-badge">📌 매니저 픽</span> ':'')+esc(p.title)+'</div>'+
        '<div class="pmeta">'+
          '<span class="cat '+c.cls+'">'+c.label+'</span>'+
          '<span class="who"'+(p.authorId?' style="cursor:pointer" onclick="event.stopPropagation();openUserProfile(\''+p.authorId+'\')"':'')+'>'+esc(dispName(p.author))+'</span>'+
          '<span class="sep"></span><span class="mt">'+p.time+'</span>'+
          '<span class="sep"></span><span class="mv">조회 '+fmtViews(p.views)+'</span>'+
          (p.likes?'<span class="sep"></span><span class="ml">추천 '+p.likes+'</span>':'')+
        '</div>'+
      '</div>'+
      thumb+
      '<div class="pcmt"><span class="cn">'+p.comments.length+'</span><span class="cl">댓글</span></div>'+
    '</div>';
    if((idx+1)%5===0 && idx!==visible.length-1) h+=adRow();
  });
  h+='</div>';
  if(totalPages>1)h+=pagerHTML(totalPages);
  main.innerHTML=h;
}
function openPost(id){
  leaveChat();
  var p=POSTS.find(function(x){return x.id===id});if(!p)return;p.views++;READ.add(id);
  if(p.dbId&&window.supabase)window.supabase.rpc("increment_post_views",{p_id:p.dbId}).then(function(){});
  if(p.dbId){
    var targetPath="/post/"+p.dbId;
    if(location.pathname!==targetPath)history.pushState({},"",targetPath);
    document.title=p.title+" · Palo";
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
    '<div class="d-author"><div class="d-ava serif">'+avatarHTML(p.author,p.authorAvatar)+'</div><div class="d-au-info"><div class="n"'+(p.authorId?' style="cursor:pointer" onclick="openUserProfile(\''+p.authorId+'\')"':'')+'>'+esc(dispName(p.author))+levelBadgeHtml(p.authorLevel,"lv-badge")+'</div><div class="meta">'+p.time+' · 조회 '+fmtViews(p.views)+'</div></div>'+
    '<button class="d-follow'+(FOLLOW.has(p.author)?' following':'')+'" id="followBtn" onclick="toggleFollow(\''+esc(p.author)+'\','+p.id+')">'+(FOLLOW.has(p.author)?'팔로잉 ✓':'＋ 팔로우')+'</button></div></div>'+
    canvas+'<div class="d-content">'+(safeHtml?safeHtml:p.content.map(function(x){return'<p>'+esc(x)+'</p>'}).join(""))+'</div>'+
    '<div class="d-actions"><button class="d-act'+liked+'" id="likeBtn" onclick="toggleLike('+p.id+')">'+likeIconSvg(p._liked)+'좋아요 '+p.likes+'</button>'+
    '<button class="d-act" onclick="sharePost('+p.id+')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 15l6-6"/><path d="M10 6l1-1a4 4 0 0 1 6 6l-1 1M14 18l-1 1a4 4 0 0 1-6-6l1-1"/></svg>공유</button>'+
    '<button class="d-act" onclick="reportPost('+p.id+')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>신고</button>'+
    ((p.dbId&&p.board==="trade"&&p.category==="구직")?'<button class="d-act" onclick="openCommissionReviews('+p.id+')">📝 후기 보기 ('+POSTS.filter(function(r){return r.board==="review"&&r.commissionPostId===p.dbId}).length+')</button>':'')+
    ((p.dbId&&p.board==="trade"&&p.category==="구직"&&AUTH.user&&AUTH.user.id!==p.authorId)?'<button class="d-act" onclick="openReviewFor('+p.id+')">✍️ 이 커미션 후기 쓰기</button>':'')+
    ((p.dbId&&AUTH.user&&p.authorId===AUTH.user.id)?(
    (p.adLocked?'<span class="d-act" style="opacity:.55;cursor:default" title="광고를 집행 중인 글은 수정할 수 없어요">🔒 수정 불가(광고 집행 중)</span>':
    '<button class="d-act" onclick="openEditPost('+p.id+')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L20 8l-4-4L4 16v4z"/><path d="M14 6l4 4"/></svg>수정</button>')+
    '<button class="d-act" onclick="deletePost('+p.id+')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>삭제</button>'+
    '<button class="d-act" onclick="openCreateAd('+p.id+')">📢 이 글 광고하기</button>'+
    '<button class="d-act'+((AUTH.profile&&AUTH.profile.pinned_post_id===p.dbId)?' liked':'')+'" onclick="togglePinnedPost('+p.id+')">📌 '+((AUTH.profile&&AUTH.profile.pinned_post_id===p.dbId)?"대표 글 해제":"대표 글로 고정하기")+'</button>'):'')+
    ((p.dbId&&AUTH.profile&&AUTH.profile.is_admin)?('<button class="d-act'+(p.isManagerPick?' liked':'')+'" onclick="toggleManagerPick('+p.id+')">📌 '+(p.isManagerPick?"매니저 픽 해제":"매니저 픽 지정")+'</button>'):'')+
    '</div>'+
    '<div class="comments"><div class="cm-head"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/></svg>훈수 · 크리틱 '+p.comments.length+'</div>'+
    '<div class="cm-write"><div class="d-ava serif" id="cmAva">'+avatarHTML("나",AUTH.profile&&AUTH.profile.avatar_url)+'</div><div class="box"><textarea id="cmInput" placeholder="따뜻한 피드백을 남겨주세요. 사람보다 그림을 이야기해요."></textarea>'+
    '<div class="row"><span class="hint">인신공격·조롱은 삭제될 수 있어요</span><button class="send" onclick="addComment('+p.id+')">등록</button></div></div></div>'+
    '<div class="ad d-ad" role="complementary" aria-label="광고"><span class="ad-label">AD</span><div class="ad-ph"><svg viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.6\\" style=\\"width:22px;height:22px\\"><rect x=\\"3\\" y=\\"4\\" width=\\"18\\" height=\\"16\\" rx=\\"2\\"/><circle cx=\\"8.5\\" cy=\\"9.5\\" r=\\"1.6\\"/><path d=\\"m4 18 5-5 4 3 3-2 4 4\\"/></svg></div><div class="ad-body"><div class="ad-t">광고 문의 환영</div><div class="ad-d">이 자리에 광고가 노출됩니다</div></div></div>'+'<div class="cm-list" id="cmList">'+renderComments(p)+'</div></div></div>';
  main.innerHTML=h;
}
async function deletePost(id){
  var p=POSTS.find(function(x){return x.id===id});if(!p)return;
  if(!(await confirmDialog("이 글을 삭제할까요? 되돌릴 수 없어요.")))return;
  if(p.dbId&&window.supabase){
    var res=await window.supabase.from("posts").delete().eq("id",p.dbId);
    if(res.error){toast("삭제 실패: "+res.error.message);return;}
  }
  POSTS=POSTS.filter(function(x){return x.id!==id});
  toast("글을 삭제했어요");
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
  var picks=POSTS.filter(function(p){return p.isManagerPick}).slice().sort(function(a,b){return (a.pickPosition||1)-(b.pickPosition||1);});
  renderManagerPickList(picks);
}
function renderManagerPickList(picks){
  var h='<div class="profile">'+
    '<button class="d-back" onclick="openProfile()">← 내 정보로</button>'+
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
  var path="ad-"+Date.now()+"-"+f.name.replace(/\.[^.]+$/,"").replace(/[^a-zA-Z0-9_.-]/g,"_")+"."+ext;
  var up=await window.supabase.storage.from("post-images").upload(path,uploadBlob,f.type==="image/gif"?undefined:{contentType:uploadBlob.type});
  if(up.error){toast("업로드 실패: "+up.error.message);return;}
  var pub=window.supabase.storage.from("post-images").getPublicUrl(path);
  adState.bannerUrl=pub.data.publicUrl;
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
  var path="avatar-"+Date.now()+"-"+f.name.replace(/\.[^.]+$/,"").replace(/[^a-zA-Z0-9_.-]/g,"_")+"."+ext;
  var up=await window.supabase.storage.from("post-images").upload(path,uploadBlob,f.type==="image/gif"?undefined:{contentType:uploadBlob.type});
  if(up.error){toast("업로드 실패: "+up.error.message);return;}
  var pub=window.supabase.storage.from("post-images").getPublicUrl(path);
  var url=pub.data.publicUrl;
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
function reportAd(adId,e){
  if(e)e.stopPropagation();
  if(!window.supabase){toast("사용할 수 없어요");return;}
  reportingAdId=adId;
  document.getElementById("reportReasonInput").value="";
  document.getElementById("reportModal").classList.add("open");
  setTimeout(function(){document.getElementById("reportReasonInput").focus()},60);
}
function reportPost(id){
  var p=POSTS.find(function(x){return x.id===id});if(!p)return;
  if(!p.dbId||!window.supabase){toast("신고가 접수되었어요");return;}
  reportingPostId=id;
  document.getElementById("reportReasonInput").value="";
  document.getElementById("reportModal").classList.add("open");
  setTimeout(function(){document.getElementById("reportReasonInput").focus()},60);
}
function reportChat(){
  if(!AUTH.user||!currentConversationId){toast("로그인이 필요해요");return;}
  reportingConversationId=currentConversationId;
  reportingReportedUserId=currentChatPartnerId;
  document.getElementById("reportReasonInput").value="";
  document.getElementById("reportModal").classList.add("open");
  setTimeout(function(){document.getElementById("reportReasonInput").focus()},60);
}
function closeReport(){
  reportingPostId=null;reportingConversationId=null;reportingReportedUserId=null;reportingAdId=null;
  document.getElementById("reportModal").classList.remove("open");
}
async function submitReport(){
  var reason=document.getElementById("reportReasonInput").value.trim()||null;
  if(reportingConversationId){
    var convId=reportingConversationId,reportedUserId=reportingReportedUserId;
    var res=await window.supabase.from("reports").insert({conversation_id:convId,reported_user_id:reportedUserId,reporter_id:AUTH.user.id,reason:reason});
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
  return p.comments.map(function(c,ci){
    var canDelete=c.dbId&&AUTH.user&&c.authorId===AUTH.user.id;
    return '<div class="cm"><div class="d-ava serif">'+avatarHTML(c.n,c.av)+'</div><div class="cbody"><div class="ch"><span class="cn"'+(c.authorId?' style="cursor:pointer" onclick="openUserProfile(\''+c.authorId+'\')"':'')+'>'+esc(c.n)+'</span>'+levelBadgeHtml(c.lv,"lv-badge")+'<span class="ct">'+esc(c.t)+'</span></div><div class="ctext">'+esc(c.txt).replace(/^@(\S+)/,'<b class="mention">@$1</b>')+'</div><div class="cfoot"><span onclick="helpful('+p.id+','+ci+',this)"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11v9H4v-9zM7 11l4-8a2 2 0 0 1 3 2l-1 6h5a2 2 0 0 1 2 2l-1 6a2 2 0 0 1-2 1H7"/></svg>도움돼요'+(c.h?' <b>'+c.h+'</b>':'')+'</span><span onclick="replyTo(\''+esc(c.n)+'\')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/></svg>답글</span>'+(canDelete?'<span onclick="deleteComment('+p.id+','+ci+')">삭제</span>':'')+'</div></div></div>';
  }).join("");
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
  inp.value="";toast("훈수를 남겼어요 🙏");
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
      p._liked=true;p.likes++;
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
function selectBoard(id){
  state.board=id;state.query="";state.tag=null;page=1;
  document.getElementById("searchInput").value="";var m=document.getElementById("searchInputM");if(m)m.value="";
  renderNav(document.getElementById("boardNav"));renderNav(document.getElementById("boardNavM"));renderNav(document.getElementById("boardNavS"));
  renderChips();closeDrawer();closeSheet();syncTabs(id);
  renderList();
  window.scrollTo({top:0,behavior:"smooth"});
}
/* ===== 커미션 페이지 (cm-) : 화면 시안 이식 · 데모 데이터 ===== */
var cmGrads=['linear-gradient(135deg,#f7d5e6,#e8a5c8)','linear-gradient(135deg,#d5e3f7,#a5c0e8)',
  'linear-gradient(135deg,#f7e6d5,#e8c8a5)','linear-gradient(135deg,#e0d5f7,#bfa5e8)',
  'linear-gradient(135deg,#d5f7e3,#a5e8c0)','linear-gradient(135deg,#f7d5d5,#e8a5a5)'];
var cmData=[]; // openCommissionList()가 Supabase에서 실제로 불러와 채움
var cmDataLoaded=false;
var cmReviews=[
  {who:'달빛초',type:'호',ctype:'반신',txt:'퀄리티 미쳤어요... 명암 표현이 진짜 섬세하고 기한도 딱 맞춰주셨어요! 재의뢰 무조건 합니다 🥹',date:'2026.07.28'},
  {who:'구름사탕',type:'호',ctype:'두상',txt:'캐릭터 특징 너무 잘 살려주셨어요 소통도 친절하시고 만족스러운 거래였습니다!',date:'2026.07.20'},
  {who:'초코라떼',type:'불호',ctype:'흉상',txt:'그림은 좋았는데 예정보다 조금 늦어졌어요. 그래도 결과물은 만족합니다.',date:'2026.07.12'}
];
var cmMyList=[]; // cmOpenMy()가 Supabase에서 실제로 불러와 채움
var CM_IMAGE_BUCKET='commission-images';
var CM_TYPES=['두상','흉상','반신','전신','SD','이모티콘','배경','기타'];
var CM_BAD_REASONS=['퀄리티 불만족','마감 기한 미준수','소통이 어려웠어요','스타일이 요청과 달랐어요','기타'];
var cmTopTags=[]; // cmLoadCommissions()가 실제 사용 빈도순으로 채움
var cmBookmarkIds=null; // 로그인 후 Set으로 채워짐(북마크한 커미션 id들)
var cmState={activeTag:null,wrType:null,wrCtype:null,query:'',sort:'home'};
var cmReg={images:[],tags:[],status:'open',editingId:null};
var cmDetailCtx={from:'list',idx:0};
var cmPreviewObj=null;
function cmQ(s){return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'")}
function cmRowToData(row,artistNickname){
  var imgs=(row.commission_images||[]).slice().sort(function(a,b){return a.sort-b.sort;}).map(function(x){return x.url;});
  var revs=POSTS.filter(function(p){return p.board==='review'&&p.commissionId===row.id;});
  var goodCount=revs.filter(function(r){return r.commissionSentiment==='good';}).length;
  return{
    id:row.id,authorId:row.author_id,
    artist:artistNickname||'탈퇴한 사용자',
    title:row.title,price:row.price,status:row.status,tags:row.tags||[],
    period:row.period,slots:row.slots,desc:row.description,descHtml:row.description_html||null,usage:row.usage_rights,policy:row.trade_policy,
    images:imgs,likes:0,createdAt:row.created_at,form:row.application_form||[],
    reviewCount:revs.length,satisfaction:revs.length?(goodCount/revs.length):0,
    adLocked:!!AD_LOCKED_COMMISSION_IDS[row.id]
  };
}
async function cmLoadCommissions(){
  var res=await window.supabase.from('commissions').select('*,commission_images(url,sort)').order('created_at',{ascending:false});
  if(res.error){console.error(res.error);cmData=[];cmDataLoaded=true;return;}
  var authorIds=Array.from(new Set(res.data.map(function(r){return r.author_id;})));
  var profRes=authorIds.length?await window.supabase.from('profiles').select('id,nickname,avatar_url').in('id',authorIds):{data:[]};
  var profById={};
  (profRes.data||[]).forEach(function(p){profById[p.id]={nickname:p.nickname,avatarUrl:p.avatar_url};});
  cmData=res.data.map(function(row){
    var prof=profById[row.author_id];
    return cmRowToData(row,prof?prof.nickname:null);
  });
  cmTopTags=cmComputeTopTags();
  cmDataLoaded=true;
}
function cmComputeTopTags(){
  var counts={};
  cmData.forEach(function(d){(d.tags||[]).forEach(function(t){counts[t]=(counts[t]||0)+1;});});
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
async function cmToggleBookmark(commissionId,el){
  if(!AUTH.user){toast('로그인 후 북마크할 수 있어요','🔒');loginWithGoogle();return;}
  if(cmBookmarkIds===null)await cmLoadMyBookmarks();
  var isBookmarked=cmBookmarkIds.has(commissionId);
  if(isBookmarked){
    var del=await window.supabase.from('commission_bookmarks').delete().eq('user_id',AUTH.user.id).eq('commission_id',commissionId);
    if(del.error){toast('처리 실패: '+del.error.message);return;}
    cmBookmarkIds.delete(commissionId);
    toast('북마크를 해제했어요');
  }else{
    var ins=await window.supabase.from('commission_bookmarks').insert({user_id:AUTH.user.id,commission_id:commissionId});
    if(ins.error){toast('처리 실패: '+ins.error.message);return;}
    cmBookmarkIds.add(commissionId);
    toast('북마크에 저장했어요','🔖');
  }
  if(el){
    var wrap=el.classList.contains('cm-bookmark')||el.classList.contains('cm-bm')?el:el.closest('.cm-bookmark,.cm-bm');
    if(wrap)wrap.classList.toggle('on',cmBookmarkIds.has(commissionId));
  }
}
async function openCommissionList(){
  closeDrawer();closeSheet();syncTabs("commission");
  document.getElementById("main").innerHTML=cmListHTML();
  window.scrollTo({top:0,behavior:"smooth"});
  var needsRefresh=false;
  if(!cmDataLoaded){await cmLoadCommissions();needsRefresh=true;}
  if(cmBookmarkIds===null){await cmLoadMyBookmarks();needsRefresh=true;}
  if(needsRefresh){
    var chipsEl=document.querySelector('.cm-chips');
    if(chipsEl)chipsEl.innerHTML=cmChipsHTML();
    var gridEl=document.getElementById('cmGrid');
    if(gridEl)gridEl.innerHTML=cmGridHTML();
  }
}
function cmCardHTML(d,idx){
  var thumb=(d.images&&d.images[0])?("background-image:url('"+cmQ(d.images[0])+"');background-size:cover;background-position:center"):('background:'+cmGrads[idx%cmGrads.length]);
  var status=d.status==='open'?'<div class="cm-status open">오픈중</div>':'';
  var tagsLine=(d.tags&&d.tags.length)?d.tags.map(function(t){return '#'+t;}).join(' '):'';
  var bookmarked=cmBookmarkIds&&cmBookmarkIds.has(d.id);
  return '<div class="cm-card" onclick="cmOpenDetail('+idx+')">'+
    '<div class="cm-thumb" style="'+thumb+'">'+status+
      '<div class="cm-bookmark'+(bookmarked?' on':'')+'" onclick="event.stopPropagation();cmToggleBookmark('+d.id+',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12v18l-6-4-6 4z"/></svg></div></div>'+
    '<div class="cm-c-artist">'+esc(d.artist)+'</div>'+
    '<div class="cm-c-title">'+esc(d.title)+'</div>'+
    '<div class="cm-c-price">'+esc(d.price)+'</div>'+
    (tagsLine?'<div class="cm-c-tags">'+esc(tagsLine)+'</div>':'')+
    '<div class="cm-c-meta"><span>♥ '+(d.likes||0)+'</span><span>💬 '+(d.reviewCount||0)+'</span></div></div>';
}
function cmFilteredIdx(){
  var q=(cmState.query||'').trim().toLowerCase();
  var idxs=cmData.map(function(d,i){return i;});
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
    idxs=idxs.slice().sort(function(a,b){return (cmData[b].createdAt||'').localeCompare(cmData[a].createdAt||'');});
  }else if(cmState.sort==='hot'){
    idxs=idxs.slice().sort(function(a,b){return (cmData[b].reviewCount||0)-(cmData[a].reviewCount||0);});
  }else if(cmState.sort==='recommend'){
    idxs=idxs.slice().sort(function(a,b){
      var ra=cmData[a],rb=cmData[b];
      var sa=ra.reviewCount?ra.satisfaction:-1,sb=rb.reviewCount?rb.satisfaction:-1;
      if(sb!==sa)return sb-sa;
      return (rb.reviewCount||0)-(ra.reviewCount||0);
    });
  }
  return idxs;
}
function cmGridHTML(){
  if(!cmDataLoaded)return '<div class="cm-my-empty">불러오는 중...</div>';
  if(cmData.length===0)return '<div class="cm-my-empty">아직 등록된 커미션이 없어요.</div>';
  var idxs=cmSortedFilteredIdx();
  if(idxs.length===0)return '<div class="cm-my-empty">'+(cmState.query?'검색 결과가 없어요.<br>다른 제목이나 태그로 찾아보세요.':'이 태그의 커미션이 아직 없어요.')+'</div>';
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
  '</div>';
}
function cmSetTag(t){
  cmState.activeTag=t;
  var chipsEl=document.querySelector('.cm-chips');
  if(chipsEl)chipsEl.innerHTML=cmChipsHTML();
  var gridEl=document.getElementById('cmGrid');
  if(gridEl)gridEl.innerHTML=cmGridHTML();
}
function cmComingSoon(){toast("아직 준비 중인 기능이에요","🛠")}
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
  var form=commission.form||[];
  var policyHTML=commission.policy?esc(commission.policy).replace(/\n/g,'<br>'):'Palo는 결제를 중계하지 않아요. 작업 범위·기한·환불 등 세부 사항은 작가와 직접 협의해주세요.';
  document.getElementById("main").innerHTML='<div class="cm-root">'+
    '<div class="cm-sub-top"><svg onclick="cmOpenCommissionById('+commission.id+')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg><b>커미션 신청서</b></div>'+
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
  var path=AUTH.user.id+'/applications/'+Date.now()+'-'+file.name.replace(/\.[^.]+$/,'').replace(/[^a-zA-Z0-9_.-]/g,'_')+'.'+ext;
  var up=await window.supabase.storage.from(CM_IMAGE_BUCKET).upload(path,uploadBlob,{contentType:uploadBlob.type});
  if(up.error){toast('업로드 실패: '+up.error.message);return;}
  var pub=window.supabase.storage.from(CM_IMAGE_BUCKET).getPublicUrl(path);
  cmApp.images.push(pub.data.publicUrl);
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
  toast('신청서를 제출했어요! 작가의 확인을 기다려주세요','📝');
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
  var idx=await cmEnsureCommissionInData(commissionId);
  if(idx<0){toast('커미션을 찾을 수 없어요(삭제되었을 수 있어요)');return;}
  closeDrawer();closeSheet();syncTabs("commission");
  cmDetailCtx={from:'list',idx:idx};
  document.getElementById("main").innerHTML=cmDetailHTML(cmData[idx],idx);
  window.scrollTo({top:0,behavior:'smooth'});
}
function cmDetailHTML(d,idx){
  var artist=d.artist||'나';
  var title=d.title||'제목 없음';
  var price=d.price||'0P~';
  var period=d.period||'작가 설정 (예: 3~7일)';
  var desc=d.desc||'그림체 아래 샘플(팬아트, 커미션 샘플) 확인해주세요.\n\n두상: 어깨선\n흉상: 명치선 - 허리 위\n반신: 골반 - 허벅지 중간\n\n추가금 문의 편하게 주세요.';
  var descHTML=d.descHtml?sanitizePostHtml(d.descHtml):null;
  var usageHTML=d.usage?esc(d.usage).replace(/\n/g,'<br>'):'';
  var policyHTML=d.policy?('<p>'+esc(d.policy).replace(/\n/g,'<br>')+'</p>'):('<p>Palo는 결제를 중계하지 않으니, 작업 범위·기한·환불 등 세부 사항은 작가와 직접 협의해주세요.</p>');
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
  var bookmarked=(d.id!=null)&&cmBookmarkIds&&cmBookmarkIds.has(d.id);
  var satisfactionHTML=realReviews.length>0
    ?('<div class="cm-verify"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>만족율 '+Math.round(goodCnt/realReviews.length*100)+'%</div>')
    :'';
  var channel=d.channel||(artist==='나'?'내 커미션':(artist+' 커미션'));
  return '<div class="cm-root">'+
    '<div class="cm-d-top"><div class="cm-left"><svg onclick="cmDetailBack()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></div>'+
      '<div class="cm-right">'+
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M5 12H3M21 12h-2M6 6l1.5 1.5M18 6l-1.5 1.5M6 18l1.5-1.5M18 18l-1.5-1.5"/></svg>'+
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15V4M8 8l4-4 4 4"/><path d="M4 15v5h16v-5"/></svg>'+
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>'+
      '</div></div>'+
    '<div class="cm-slider" style="background:'+sliderBg+'"><div class="cm-dots"><i class="on"></i><i></i><i></i><i></i><i></i></div></div>'+
    '<div class="cm-d-body">'+
      satisfactionHTML+
      '<div class="cm-d-title">'+esc(title)+'</div>'+
      '<div class="cm-d-price">'+esc(price)+'</div>'+
      '<div class="cm-artist-row" onclick="'+(d.authorId?('openUserProfile(\''+cmQ(d.authorId)+'\')'):('cmOpenArtistProfile(\''+cmQ(artist)+'\')'))+'">'+
        '<div class="cm-l"><div class="cm-ava"></div><div><span class="cm-nm">'+esc(artist)+'</span> <span class="cm-rv">'+realReviews.length+'개 후기</span></div></div>'+
        '<div class="cm-r"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 2l4 4-4 4M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 0 1-4 4H3"/></svg>0</span>'+
        '<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/></svg>'+(d.likes||0)+'</span></div>'+
      '</div>'+
      '<div class="cm-stats"><div class="cm-stat"><span class="cm-k">신청 가능</span><span class="cm-v">'+esc(d.slots||'8')+'개 남음</span></div>'+
        '<div class="cm-stat"><span class="cm-k">작업 기간</span><span class="cm-v">'+esc(period)+'</span></div></div>'+
      '<div class="cm-desc">'+(descHTML?descHTML:esc(desc))+'</div>'+
      '<div class="cm-rv-sec"><div class="cm-rv-head"><b>커미션 후기 '+realReviews.length+'</b><span class="cm-rv-more" onclick="cmOpenReviews('+(d.id!=null?d.id:'null')+')">더보기 ></span></div>'+
        '<div class="cm-rv-summary"><div class="cm-rv-box good"><div class="cm-ic">😊</div><div class="cm-n">'+goodCnt+'</div><div class="cm-l">만족 후기</div></div>'+
          '<div class="cm-rv-box bad"><div class="cm-ic">😐</div><div class="cm-n">'+badCnt+'</div><div class="cm-l">불호 후기</div></div></div>'+
        '<div>'+(realReviews.length?reviewListHTML(realReviews.slice(0,3)):'<div class="cm-my-empty">아직 후기가 없어요.</div>')+'</div>'+
        (canReview?'<button class="cm-write-btn" style="margin-top:10px" onclick="cmOpenWrite('+d.id+')">✍️ 후기 쓰기</button>':'')+
      '</div>'+
      '<div class="cm-samples">'+samples+'</div>'+
      (usageHTML?('<div class="cm-acc open"><div class="cm-acc-h" onclick="this.parentElement.classList.toggle(\'open\')"><b>작업물 사용 권한</b><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 15l6-6 6 6"/></svg></div>'+
        '<div class="cm-acc-c"><p>'+usageHTML+'</p></div></div>'):'')+
      '<div class="cm-acc open"><div class="cm-acc-h" onclick="this.parentElement.classList.toggle(\'open\')"><b>거래 정책 안내</b><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 15l6-6 6 6"/></svg></div>'+
        '<div class="cm-acc-c">'+policyHTML+'</div></div>'+
      '<div class="cm-d-tags">'+tags.map(function(t){return '<div class="cm-t">#'+esc(t)+'</div>';}).join('')+'</div>'+
      '<div class="cm-sub-card"><div class="cm-l"><div class="cm-ci">P</div><div><div class="cm-nm">'+esc(channel)+'</div><div class="cm-cnt">구독자 115명</div></div></div><div class="cm-btn" onclick="cmComingSoon()">구독</div></div>'+
    '</div>'+
    '<div class="cm-pad"></div>'+
    '<div class="cm-apply-bar"><div class="cm-bm'+(bookmarked?' on':'')+'"'+(d.id!=null?(' onclick="cmToggleBookmark('+d.id+',this)"'):'')+'><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12v18l-6-4-6 4z"/></svg></div>'+
      '<div class="cm-ask" onclick="'+((d.authorId&&d.id!=null)?('cmOpenChatAbout(\''+cmQ(d.authorId)+'\','+d.id+',\''+cmQ(title)+'\')'):'cmComingSoon()')+'">문의하기</div>'+
      '<div class="cm-apply" onclick="'+((d.authorId&&d.id!=null)?('cmApply(\''+cmQ(d.authorId)+'\','+d.id+',\''+cmQ(title)+'\')'):'cmComingSoon()')+'">신청하기</div></div>'+
  '</div>';
}
function cmOpenDetail(idx){
  cmDetailCtx={from:'list',idx:idx};
  document.getElementById("main").innerHTML=cmDetailHTML(cmData[idx],idx);
  window.scrollTo({top:0,behavior:"smooth"});
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
function cmOpenArtistProfile(name){
  document.getElementById("main").innerHTML='<div class="cm-root">'+
    '<div class="cm-pf-top"><svg onclick="cmBackToDetail()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg><b>작가 프로필</b></div>'+
    '<div class="cm-pf-head"><div class="cm-pf-ava"></div><div class="cm-pf-name">'+esc(name)+'</div><div class="cm-pf-grade">🎨 채색반</div>'+
      '<div class="cm-pf-stats"><div><div class="cm-n">'+cmReviews.length+'</div><div class="cm-l">후기</div></div>'+
        '<div><div class="cm-n">'+cmReviews.filter(function(r){return r.type==="호"}).length+'</div><div class="cm-l">만족 후기</div></div>'+
        '<div><div class="cm-n">115</div><div class="cm-l">구독자</div></div></div></div>'+
    '<div class="cm-pf-note">※ 실제로는 기존에 만든 작가 프로필 화면으로 연결됩니다.<br>(여기선 연결 예시만 표시)</div>'+
  '</div>';
  window.scrollTo({top:0,behavior:"smooth"});
}
function cmCommissionReviews(commissionId){
  return POSTS.filter(function(p){return p.board==='review'&&p.commissionId===commissionId;});
}
var cmReviewCommissionId=null;
function cmOpenReviews(commissionId){
  cmReviewCommissionId=commissionId;
  var reviews=(commissionId!=null)?cmCommissionReviews(commissionId):[];
  var goodCnt=reviews.filter(function(r){return r.commissionSentiment==='good'}).length;
  var badCnt=reviews.filter(function(r){return r.commissionSentiment==='bad'}).length;
  var commission=(commissionId!=null)?cmData.find(function(c){return c.id===commissionId;}):null;
  var canReview=AUTH.user&&commission&&commission.authorId&&AUTH.user.id!==commission.authorId;
  document.getElementById("main").innerHTML='<div class="cm-root">'+
    '<div class="cm-sub-top"><svg onclick="cmBackToDetail()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>'+
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
  var path='review-'+Date.now()+'-'+file.name.replace(/\.[^.]+$/,'').replace(/[^a-zA-Z0-9_.-]/g,'_')+'.'+ext;
  var up=await window.supabase.storage.from('post-images').upload(path,uploadBlob,{contentType:uploadBlob.type});
  if(up.error){toast('업로드 실패: '+up.error.message);return;}
  var pub=window.supabase.storage.from('post-images').getPublicUrl(path);
  cmWr.images.push(pub.data.publicUrl);
  document.getElementById('cmWrImgs').innerHTML=cmWrImgsHTML();
  toast('이미지를 넣었어요');
}
function cmDelWrImg(i){
  cmWr.images.splice(i,1);
  document.getElementById('cmWrImgs').innerHTML=cmWrImgsHTML();
}
function cmOpenWrite(commissionId){
  if(!AUTH.user){
    toast('로그인 후 후기를 작성할 수 있어요','🔒');
    loginWithGoogle();
    return;
  }
  cmReviewCommissionId=commissionId;
  cmState.wrType=null;cmState.wrCtype=null;cmState.wrBadReason=null;
  cmWr={images:[]};
  var commission=cmData.find(function(c){return c.id===commissionId;});
  var typeOptions=(commission&&commission.tags&&commission.tags.length)?commission.tags:CM_TYPES;
  document.getElementById("main").innerHTML='<div class="cm-root">'+
    '<div class="cm-sub-top"><svg onclick="cmOpenReviews('+commissionId+')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg><b>후기 작성</b></div>'+
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
      '<div class="cm-wr-label">받은 커미션 사진 <span class="cm-wr-sub">선택 · 최대 5장</span></div>'+
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
  var ok=cmState.wrType&&cmState.wrCtype&&(cmState.wrType!=='bad'||cmState.wrBadReason);
  document.getElementById('cmWrSubmit').disabled=!ok;
}
async function cmSubmitReview(){
  if(!AUTH.user){toast('로그인 후 후기를 작성할 수 있어요','🔒');return;}
  if(cmReviewCommissionId==null){toast('커미션 정보를 찾을 수 없어요');return;}
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
  cmReg={images:[],tags:[],status:'open',editingId:editId||null,title:'',price:'',period:'',slots:'',desc:'',descHtml:'',usage:'',policy:'',form:[]};
  if(editId){
    var c=cmMyList.find(function(x){return x.id===editId});
    if(c&&c.adLocked){toast('광고를 집행 중인 커미션은 수정할 수 없어요');return;}
    if(c){
      cmReg.images=c.images.slice();cmReg.tags=c.tags.slice();cmReg.status=c.status;
      cmReg.title=c.title;cmReg.price=c.price;cmReg.period=c.period;cmReg.slots=c.slots;
      cmReg.desc=c.desc;cmReg.descHtml=c.descHtml||'';cmReg.usage=c.usage||'';cmReg.policy=c.policy||'';
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
}
function cmRenderRegisterScreen(){
  var editing=!!cmReg.editingId;
  var imgsHTML=cmReg.images.map(function(url,i){
    return '<div class="cm-reg-img" style="background-image:url(\''+cmQ(url)+'\');background-size:cover;background-position:center"><div class="cm-del" onclick="cmDelSampleImg('+i+')">×</div></div>';
  }).join('');
  imgsHTML+='<div class="cm-reg-addimg" onclick="cmPickSampleImg()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/></svg><span class="cm-cnt" id="cmRegImgCnt">'+cmReg.images.length+'/10</span></div>';
  var tagsHTML=cmReg.tags.map(function(t){return '<div class="cm-reg-tagchip">#'+esc(t)+'<span class="cm-x" onclick="cmRemoveTag(\''+cmQ(t)+'\')">×</span></div>';}).join('');
  document.getElementById("main").innerHTML='<div class="cm-root">'+
    '<div class="cm-sub-top"><svg onclick="'+(editing?'cmOpenMy()':'openCommissionList()')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg><b>'+(editing?'커미션 수정':'커미션 등록')+'</b></div>'+
    '<div class="cm-reg">'+
      '<div class="cm-reg-label">샘플 이미지 <span class="cm-reg-req">*</span> <span class="cm-reg-sub">최대 10장</span></div>'+
      '<input type="file" id="cmRegFileInput" accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" class="hidden" onchange="cmOnRegFileChange(event)">'+
      '<div class="cm-reg-imgs" id="cmRegImgs">'+imgsHTML+'</div>'+
      '<div class="cm-reg-label">커미션 제목 <span class="cm-reg-req">*</span></div>'+
      '<input class="cm-reg-input" id="cmRegTitle" placeholder="예: LD 반신 채색 커미션" oninput="cmCheckReg()" value="'+esc(cmReg.title)+'">'+
      '<div class="cm-reg-label">가격 <span class="cm-reg-req">*</span></div>'+
      '<div class="cm-reg-price"><input class="cm-reg-input" id="cmRegPrice" type="number" placeholder="19000" oninput="cmCheckReg()" value="'+esc(cmReg.price)+'"><span class="cm-unit">P ~</span></div>'+
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
  var path=AUTH.user.id+'/'+Date.now()+'-'+file.name.replace(/\.[^.]+$/,'').replace(/[^a-zA-Z0-9_.-]/g,'_')+'.'+ext;
  var up=await window.supabase.storage.from(CM_IMAGE_BUCKET).upload(path,uploadBlob,{contentType:uploadBlob.type});
  if(up.error){toast('업로드 실패: '+up.error.message);return;}
  var pub=window.supabase.storage.from(CM_IMAGE_BUCKET).getPublicUrl(path);
  cmReg.images.push(pub.data.publicUrl);
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
  var path=AUTH.user.id+'/desc/'+Date.now()+'-'+file.name.replace(/\.[^.]+$/,'').replace(/[^a-zA-Z0-9_.-]/g,'_')+'.'+ext;
  var up=await window.supabase.storage.from(CM_IMAGE_BUCKET).upload(path,uploadBlob,{contentType:uploadBlob.type});
  if(up.error){toast('업로드 실패: '+up.error.message);return;}
  var pub=window.supabase.storage.from(CM_IMAGE_BUCKET).getPublicUrl(path);
  cmDescRestoreSelection();
  document.execCommand('insertHTML',false,'<img src="'+esc(pub.data.publicUrl)+'"><br>');
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
function cmCheckReg(){
  cmSyncReg();
  var ok=cmReg.images.length>0&&
    cmReg.title.trim()&&
    cmReg.price&&
    cmReg.tags.length>0&&
    cmReg.desc.trim();
  document.getElementById('cmRegSubmit').disabled=!ok;
}
function cmPreviewReg(){
  cmSyncReg();
  var title=cmReg.title.trim()||'제목 없음';
  var price=(cmReg.price?Number(cmReg.price).toLocaleString():'0')+'P~';
  var period=cmReg.period.trim()||'작가 설정';
  var slots=cmReg.slots.trim();
  var desc=cmReg.desc.trim()||'(설명 없음)';
  var usage=cmReg.usage.trim();
  var policy=cmReg.policy.trim();
  cmPreviewObj={artist:'나',channel:'내 커미션',title:title,price:price,period:period,slots:slots,
    desc:desc,descHtml:cmReg.descHtml,usage:usage,policy:policy,tags:cmReg.tags.slice(),images:cmReg.images.slice(),likes:0};
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
    application_form:cmReg.form
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
        '<div class="cm-my-price">'+Number(c.price).toLocaleString()+'P~</div>'+st+'</div>'+
      '<div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0">'+editBtn+
        '<button class="cm-my-edit" onclick="openCreateAdForCommission('+c.id+')">📢 광고</button></div></div>';
  }).join('');
}
var cmMyBookmarks=[];
var cmMyApplications=[];
async function cmOpenMy(tab){
  if(!AUTH.user){
    toast('로그인 후 내 커미션을 볼 수 있어요','🔒');
    loginWithGoogle();
    return;
  }
  var activeTab=(tab==='bookmarks')?'bookmarks':(tab==='applications')?'applications':'mine';
  var containerClass=activeTab==='bookmarks'?'cm-grid':'cm-my-list';
  document.getElementById("main").innerHTML='<div class="cm-root">'+
    '<div class="cm-sub-top"><svg onclick="openCommissionList()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg><b>내 커미션</b>'+
      (activeTab==='mine'?'<button class="cm-write-btn" onclick="cmOpenRegister()">+ 새 커미션</button>':'')+
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
        form:row.application_form||[],adLocked:!!AD_LOCKED_COMMISSION_IDS[row.id]};
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
function postCardHTML(p){
  var c=catFor(p);
  return '<div class="post-card" onclick="openPost('+p.id+')">'+
    '<div class="post-card-img"><img src="'+esc(p.images[0])+'" alt="" loading="lazy"></div>'+
    '<div class="post-card-body">'+
      (p.isManagerPick?'<span class="pick-badge">📌 매니저 픽</span> ':'')+
      '<div class="post-card-title">'+esc(p.title)+'</div>'+
      '<div class="post-card-meta"><span class="cat '+c.cls+'">'+c.label+'</span><span class="post-card-author">'+esc(dispName(p.author))+'</span></div>'+
      '<div class="post-card-stats"><span>👁 '+fmtViews(p.views)+'</span><span>♥ '+p.likes+'</span><span>💬 '+p.comments.length+'</span></div>'+
    '</div>'+
  '</div>';
}
function postAlbumHTML(posts){
  if(!posts.length)return"";
  return '<div class="post-album">'+posts.map(postCardHTML).join("")+'</div>';
}
function showMore(){state.shown+=6;renderList()}
function goHome(){selectBoard("all")}
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
  talk:["잡담","질문","정보"],ask:["고민","질문","장비"],crit:["러프","선화","채색","완성"],
  wip:["러프","선화","채색","완성"],tip:["강좌","꿀팁","자료"],challenge:["참가작"],
  trade:["구인","구직"],used:["판매","구매"]
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
  editingPostId=null;
  edState={board:(state.board!=="all"&&state.board!=="sketch")?state.board:null,tag:null,img:false,images:[],commissionPostId:null,reviewedNick:null,reviewedUserId:null,sentiment:null};
  buildBoardMenu();refreshBoardLabel();renderEdTags();
  document.getElementById("wTitle").value="";
  document.getElementById("edReviewNickInput").value="";
  updateReviewNickField();
  document.getElementById("wContent").innerHTML="";
  document.getElementById("edImages").innerHTML="";
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
  editingPostId=id;
  edState={board:p.board,tag:p.category||null,img:!!(p.images&&p.images.length),images:p.images?p.images.slice():[],commissionPostId:p.commissionPostId||null,reviewedNick:p.reviewedNickname||null,reviewedUserId:p.reviewedUserId||null,sentiment:p.commissionSentiment||null};
  buildBoardMenu();refreshBoardLabel();renderEdTags();
  document.getElementById("wTitle").value=stripTag(p.title,p.category);
  document.getElementById("edReviewNickInput").value="";
  document.getElementById("edCommissionList").style.display="none";
  updateReviewNickField();
  document.getElementById("wContent").innerHTML=p.html?sanitizePostHtml(p.html):p.content.map(function(x){return"<p>"+esc(x)+"</p>"}).join("");
  renderEdImages();
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
    var items=g.items.filter(function(b){return b.id!=="all"&&b.id!=="sketch"});
    if(!items.length)return;
    h+='<div class="ed-bm-g">'+g.group+'</div>';
    items.forEach(function(b){
      h+='<div class="ed-bm-a'+(edState.board===b.id?' on':'')+'" onclick="pickBoard(\''+b.id+'\')">'+b.name+'</div>';
    });
  });
  document.getElementById("edBoardMenu").innerHTML=h;
}
function toggleBoardMenu(e){e.stopPropagation();document.getElementById("edBoardMenu").classList.toggle("open")}
function pickBoard(id){
  if(id==="review"&&!AUTH.user){toast("로그인 후 후기를 작성할 수 있어요");return;}
  edState.board=id;edState.tag=null;buildBoardMenu();refreshBoardLabel();renderEdTags();
  document.getElementById("edBoardMenu").classList.remove("open");
  document.getElementById("edCrit").checked=(id==="crit");
  if(id!=="review"){
    document.getElementById("edReviewNickInput").value="";
    edState.commissionPostId=null;edState.reviewedNick=null;edState.reviewedUserId=null;edState.sentiment=null;
  }
  updateReviewNickField();}
function refreshBoardLabel(){
  document.getElementById("edBoardLabel").textContent=edState.board?boardName(edState.board):"게시판 선택";
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
  var path=Date.now()+"-"+f.name.replace(/\.[^.]+$/,"").replace(/[^a-zA-Z0-9_.-]/g,"_")+"."+ext;
  var up=await window.supabase.storage.from("post-images").upload(path,uploadBlob,skippedCompression?undefined:{contentType:uploadBlob.type});
  if(up.error){toast("업로드 실패: "+up.error.message);return;}
  var pub=window.supabase.storage.from("post-images").getPublicUrl(path);
  edState.images.push(pub.data.publicUrl);
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
function sanitizePostHtml(html){
  if(!html)return "";
  if(!window.DOMPurify)return "";
  return window.DOMPurify.sanitize(html,{
    ALLOWED_TAGS:["b","strong","i","em","u","font","span","ul","ol","li","blockquote","br","div","p","img","video","source"],
    ALLOWED_ATTR:["style","color","src","controls","alt"]
  });
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

  if(editingPostId){
    var ep=POSTS.find(function(x){return x.id===editingPostId});
    if(!ep){editingPostId=null;toast("수정할 글을 찾을 수 없어요");return;}
    if(window.supabase&&ep.dbId){
      var upd=await window.supabase.from("posts").update({
        board:edState.board,category:edState.tag,title:title,content:text,content_html:html||null,
        stage:edState.img?(stage||"완성"):null,reviewed_nickname:reviewedNick,reviewed_user_id:reviewedUserId,commission_post_id:commissionPostId,
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
    ep.stage=edState.img?(stage||"완성"):null;
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
      stage:edState.img?(stage||"완성"):null,
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
    refreshMyProfile();
  }

  var np={id:Date.now(),board:edState.board,title:title,author:"나",time:"방금",createdAt:new Date().toISOString(),likes:0,views:1,
    thumb:edState.img?"t1":"none",stage:edState.img?(stage||"완성"):null,
    images:edState.images.length?edState.images.slice():undefined,
    dbId:saved&&saved.data?saved.data.id:undefined,authorId:saved&&saved.data?saved.data.author_id:undefined,
    reviewedNickname:reviewedNick,reviewedUserId:reviewedUserId,commissionPostId:commissionPostId,commissionSentiment:sentiment,
    html:html,content:text.split("\n").filter(Boolean),comments:[]};
  justAddedId=np.id;setTimeout(function(){justAddedId=null},1800);POSTS.unshift(np);
  closeWrite();state.board=edState.board;state.query="";state.sort="new";state.shown=8;
  renderNav(document.getElementById("boardNav"));renderNav(document.getElementById("boardNavM"));renderNav(document.getElementById("boardNavS"));
  page=1;renderChips();renderList();toast("글을 올렸어요! ✏️");window.scrollTo({top:0,behavior:"smooth"});
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
if(!getPostIdFromPath()&&!getUserIdFromPath()){
  renderChips();renderHot();
  // renderTrend()는 이제 실제 글의 인기 순위를 보여주므로 loadRealPosts()가 끝난 뒤에 그림(아래 참고).
  // 실제 글은 loadRealPosts()가 곧 채워줌 — 여기서 더미 글로 renderList()를 한 번 더 돌리면
  // "더미 글이 잠깐 보였다 실제 글로 바뀌는" 깜빡임과 그로 인한 스크롤 튐이 생김.
  // Supabase 연동이 없는 로컬 데모 환경 등에서만 폴백으로 더미 글을 보여줌.
  if(!window.supabase){renderTrend();renderList();}
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
  if(n.chatUser)openChat(n.chatUser);
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
async function openUserProfile(userId){
  if(!userId||!window.supabase)return;
  leaveChat();
  closeNotif();
  var res=await window.supabase.from("profiles").select("*").eq("id",userId).single();
  if(res.error||!res.data){
    document.getElementById("main").innerHTML='<div class="profile"><div class="empty"><h3>사용자를 찾을 수 없어요</h3></div></div>';
    return;
  }
  var profile=res.data;
  var targetPath="/user/"+userId;
  if(location.pathname!==targetPath)history.pushState({},"",targetPath);
  document.title=profile.nickname+"님의 프로필 · Palo";
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
  h+='<div class="pf-sec">쓴 글 ('+theirPosts.length+')</div>';
  h+=listOrEmpty(theirPosts,esc(profile.nickname)+'님이 쓴 글이 아직 없어요.');
  h+='<button class="pf-edit" style="margin-top:16px" onclick="renderList()">← 목록으로</button>';
  h+='</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
function getUserIdFromPath(){
  var m=location.pathname.match(/^\/user\/([0-9a-fA-F-]{36})$/);
  return m?m[1]:null;
}

/* ---------- 1:1 채팅 ---------- */
var currentConversationId=null;
var currentChatPartnerId=null;
var chatChannel=null;
function unsubscribeFromChat(){
  if(chatChannel){window.supabase.removeChannel(chatChannel);chatChannel=null;}
}
function leaveChat(){
  unsubscribeFromChat();
  currentConversationId=null;
  currentChatPartnerId=null;
  cmPendingChatRef=null;
}
/* ---------- 알림 (DB 저장, notifications 테이블) ---------- */
var globalNotifChannel=null;
function dbRowToNotif(row){
  return {dbId:row.id,type:row.type,icon:row.icon||"🔔",txt:row.content,time:timeAgo(row.created_at),chatUser:row.link_chat_user,post:row.link_post_id?100000+row.link_post_id:null,commission:row.link_commission_id||null,read:row.is_read};
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
  var empty=box.querySelector(".pf-empty");if(empty)empty.remove();
  var div=document.createElement("div");
  div.className="chat-msg";
  div.setAttribute("data-msg-id",m.id);
  div.innerHTML='<div class="chat-bubble"></div>';
  div.querySelector(".chat-bubble").textContent=m.content;
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

  var profRes=await window.supabase.from("profiles").select("nickname").eq("id",otherUserId).single();
  var partnerName=profRes.data?profRes.data.nickname:"상대방";

  var msgRes=await window.supabase.from("messages").select("*").eq("conversation_id",conv.id).order("created_at",{ascending:true});
  if(msgRes.error){toast("대화를 불러오지 못했어요: "+msgRes.error.message);return;}
  renderChatView(partnerName,msgRes.data||[]);
  subscribeToChat(conv.id);
  window.supabase.rpc("mark_messages_read",{p_conversation_id:conv.id}).then(function(){});
}
function chatMessagesHtml(messages){
  if(!messages.length)return '<div class="pf-empty">아직 대화가 없어요. 첫 메시지를 보내보세요!</div>';
  return messages.map(function(m){
    var mine=m.sender_id===AUTH.user.id;
    var bubble=m.commission_id
      ?('<div class="chat-bubble chat-commission-ref" onclick="cmOpenCommissionById('+m.commission_id+')">'+esc(m.content)+' <span class="chat-ref-arrow">→</span></div>')
      :('<div class="chat-bubble">'+esc(m.content)+'</div>');
    return '<div class="chat-msg'+(mine?' mine':'')+'" data-msg-id="'+m.id+'">'+
      bubble+
      (mine?'<span class="chat-read-status">'+(m.is_read?'읽음':'')+'</span>':'')+
    '</div>';
  }).join("");
}
async function openChatList(){
  if(!AUTH.user){toast("로그인이 필요해요");loginWithGoogle();return;}
  leaveChat();
  closeNotif();
  document.getElementById("main").innerHTML='<div class="profile"><p style="padding:40px 0;text-align:center;color:var(--muted)">불러오는 중...</p></div>';

  var convRes=await window.supabase.from("conversations").select("*")
    .or("user1_id.eq."+AUTH.user.id+",user2_id.eq."+AUTH.user.id)
    .order("last_message_at",{ascending:false});
  if(convRes.error){toast("채팅 목록을 불러오지 못했어요: "+convRes.error.message);return;}
  var convs=convRes.data||[];
  var partnerIds=convs.map(function(c){return c.user1_id===AUTH.user.id?c.user2_id:c.user1_id;});
  var convIds=convs.map(function(c){return c.id;});

  var profRes=partnerIds.length?await window.supabase.from("profiles").select("id,nickname").in("id",partnerIds):{data:[]};
  var nickById={};(profRes.data||[]).forEach(function(p){nickById[p.id]=p.nickname;});

  var msgRes=convIds.length?await window.supabase.from("messages").select("*").in("conversation_id",convIds).order("created_at",{ascending:true}):{data:[]};
  var lastMsgByConv={},unreadByConv={};
  (msgRes.data||[]).forEach(function(m){
    lastMsgByConv[m.conversation_id]=m;
    if(m.sender_id!==AUTH.user.id&&!m.is_read)unreadByConv[m.conversation_id]=(unreadByConv[m.conversation_id]||0)+1;
  });

  renderChatList(convs,partnerIds,nickById,lastMsgByConv,unreadByConv);
}
function renderChatList(convs,partnerIds,nickById,lastMsgByConv,unreadByConv){
  var h='<div class="profile">'+
    '<button class="d-back" onclick="renderList()">← 목록으로</button>'+
    '<div class="pf-sec">💬 채팅</div>';
  if(!convs.length){
    h+='<div class="pf-empty">아직 채팅한 사람이 없어요.<br>회원 프로필에서 "채팅하기"로 시작해보세요.</div>';
  }else{
    h+='<div class="chat-room-list">';
    convs.forEach(function(c,i){
      var partnerId=partnerIds[i];
      var name=nickById[partnerId]||"알 수 없음";
      var last=lastMsgByConv[c.id];
      var unread=unreadByConv[c.id]||0;
      h+='<div class="chat-room-row" onclick="openChat(\''+partnerId+'\')">'+
        '<div class="pf-ava" style="width:44px;height:44px;font-size:16px;flex-shrink:0">'+esc(name[0])+'</div>'+
        '<div class="chat-room-info"><div class="chat-room-name">'+esc(name)+'</div>'+
        '<div class="chat-room-preview">'+(last?esc(last.content):"")+'</div></div>'+
        '<div class="chat-room-meta">'+(last?timeAgo(last.created_at):'')+
        (unread>0?'<span class="chat-unread-badge">'+unread+'</span>':'')+'</div>'+
      '</div>';
    });
    h+='</div>';
  }
  h+='</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
function renderChatView(partnerName,messages){
  var h='<div class="profile">'+
    '<button class="d-back" onclick="renderList()">← 목록으로</button>'+
    '<div class="pf-card"><div class="pf-ava">'+esc(partnerName[0])+'</div><div class="pf-info"><div class="pf-name">'+esc(partnerName)+'</div></div>'+
      '<button class="d-act" onclick="reportChat()"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>신고</button>'+
    '</div>'+
    '<div id="chatMessages" class="chat-list">'+chatMessagesHtml(messages)+'</div>'+
    '<div class="chat-inputrow">'+
      '<textarea id="chatInput" placeholder="메시지를 입력하세요" onkeydown="if(event.key===\'Enter\'&&!event.shiftKey){event.preventDefault();sendChatMessage();}"></textarea>'+
      '<button class="chat-send" onclick="sendChatMessage()">보내기</button>'+
    '</div>'+
  '</div>';
  document.getElementById("main").innerHTML=h;
  var box=document.getElementById("chatMessages");
  if(box)box.scrollTop=box.scrollHeight;
  window.scrollTo({top:0,behavior:"smooth"});
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
  var msgRes=await window.supabase.from("messages").select("*").eq("conversation_id",currentConversationId).order("created_at",{ascending:true});
  var box=document.getElementById("chatMessages");
  if(box){box.innerHTML=chatMessagesHtml(msgRes.data||[]);box.scrollTop=box.scrollHeight;}
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
  document.getElementById("main").innerHTML='<div class="profile"><p style="padding:40px 0;text-align:center;color:var(--muted)">불러오는 중...</p></div>';
  var res=await window.supabase.from("score_log").select("*").eq("user_id",AUTH.user.id).order("created_at",{ascending:false}).limit(100);
  if(res.error){toast("불러오기 실패: "+res.error.message);return;}
  renderScoreLog(res.data||[]);
}
function renderScoreLog(rows){
  var h='<div class="profile">'+
    '<button class="d-back" onclick="openProfile()">← 내 정보로</button>'+
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
  leaveChat();
  closeNotif();
  if(!AUTH.user){
    document.getElementById("main").innerHTML=
      '<div class="profile" id="myProfileView"><div class="empty"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>'+
      '<h3>로그인이 필요해요</h3><p>로그인하면 내 닉네임으로 글을 쓰고 활동을 볼 수 있어요.</p>'+
      '<button onclick="loginWithGoogle()">구글로 로그인</button></div></div>';
    syncTabs("me");window.scrollTo({top:0,behavior:"smooth"});
    return;
  }
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
  var h='<div class="profile" id="myProfileView">';
  h+=pfHeroHTML({nickname:ME.nick,level:myLevel,avatar_url:AUTH.profile&&AUTH.profile.avatar_url,
    cover_url:AUTH.profile&&AUTH.profile.cover_url,bio:AUTH.profile&&AUTH.profile.bio,
    sns_twitter:AUTH.profile&&AUTH.profile.sns_twitter,sns_instagram:AUTH.profile&&AUTH.profile.sns_instagram,sns_email:AUTH.profile&&AUTH.profile.sns_email},
    true,myReviewStats,null);
  h+='<div class="pf-actions">'+
       '<button class="pf-edit" onclick="openUserProfile(\''+AUTH.user.id+'\')">👤 내 공개 프로필 보기</button>'+
       '<button class="pf-edit" onclick="openNickModal()">닉네임 변경</button>'+
       '<button class="pf-edit" onclick="openChatList()">💬 채팅 목록</button>'+
       '<button class="pf-edit" onclick="openScoreLog()">포인트 내역</button>'+
       '<button class="pf-edit" onclick="logout()">로그아웃</button>'+
     '</div>';
  if(AUTH.profile&&AUTH.profile.is_admin){
    h+='<div class="pf-sec">🛡 관리자 메뉴</div>'+
       '<div class="pf-actions pf-admin-actions">'+
         '<button class="pf-edit" onclick="openAdminReports()">신고 목록</button>'+
         '<button class="pf-edit" onclick="openAdminChatList()">전체 채팅 목록</button>'+
         '<button class="pf-edit" onclick="openAdminAdReview()">광고 심사</button>'+
         '<button class="pf-edit" onclick="openAdminAdList()">전체 광고 목록</button>'+
         '<button class="pf-edit" onclick="openAdminCampaigns()">🎯 유료 광고 관리</button>'+
         '<button class="pf-edit" onclick="openManagerPickList()">📌 매니저 픽 관리</button>'+
       '</div>';
  }
  h+=pinnedPostCardHTML(AUTH.profile?AUTH.profile.pinned_post_id:null);
  if(pfReviewsForUserId!==AUTH.user.id){pfReviewsExpanded=false;pfReviewsForUserId=AUTH.user.id;}
  h+=pfReviewListHTML(pfArtistReviewList(AUTH.user.id,ME.nick),AUTH.user.id);
  h+='<div class="pf-progress"><div class="pp-row"><span>'+lvName+'</span><span>'+
     (prog.maxed?'최고 등급 달성! 🎉':('다음 등급('+prog.nextName+')까지 '+prog.remain+'점'))+'</span></div>'+
     '<div class="pp-bar"><div class="pp-fill" style="width:'+prog.pct+'%"></div></div></div>';
  h+='<div class="pf-stats">'+
     '<div class="pf-st"><b>'+myScore+'</b><span>활동 점수</span></div>'+
     '<div class="pf-st"><b>'+(AUTH.profile?(AUTH.profile.ad_points||0):0)+'</b><span>광고 포인트</span></div>'+
     '<div class="pf-st"><b>'+mine.length+'</b><span>쓴 글</span></div>'+
     '<div class="pf-st"><b>'+likeSum+'</b><span>받은 추천</span></div>'+
     '<div class="pf-st"><b>'+cmSum+'</b><span>받은 댓글</span></div></div>';
  if(FOLLOW.size){
    h+='<div class="pf-sec">팔로잉</div><div class="pf-follow">';
    Array.from(FOLLOW).forEach(function(n){
      h+='<span class="pf-fl">'+esc(dispName(n))+'<button onclick="unfollowFromProfile(\''+esc(n)+'\')">언팔로우</button></span>';
    });
    h+='</div>';
  }
  var tabs=[["mine","쓴 글 "+mine.length],["cm","댓글 단 글 "+commented.length],["liked","좋아요 "+likedArr.length],["recent","최근 본 글 "+recent.length]];
  h+='<div class="pf-tabs">'+tabs.map(function(t){
    return '<button class="pf-tab'+(pfTab===t[0]?' on':'')+'" onclick="setPfTab(\''+t[0]+'\')">'+t[1]+'</button>';
  }).join("")+'</div>';
  if(pfTab==="mine")h+=listOrEmpty(mine,'아직 쓴 글이 없어요.<br>첫 이야기를 올려볼까요?',true);
  else if(pfTab==="cm")h+=listOrEmpty(commented,'댓글을 단 글이 아직 없어요.<br>마음에 드는 글에 훈수를 남겨보세요!');
  else if(pfTab==="liked")h+=listOrEmpty(likedArr,'좋아요한 글이 아직 없어요.<br>마음에 드는 그림에 하트를 눌러보세요!');
  else h+=listOrEmpty(recent,'최근 본 글이 없어요.');
  h+='<div class="pf-sec">알림 설정</div><div class="pf-set">'+
     '<label class="pf-toggle"><span>내 글에 댓글이 달리면 알림</span><input type="checkbox" '+(SETTINGS.cm?'checked':'')+' onchange="SETTINGS.cm=this.checked;toast(this.checked?\'댓글 알림을 켰어요\':\'댓글 알림을 껐어요\')"></label>'+
     '<label class="pf-toggle"><span>좋아요 알림</span><input type="checkbox" '+(SETTINGS.like?'checked':'')+' onchange="SETTINGS.like=this.checked;toast(this.checked?\'좋아요 알림을 켰어요\':\'좋아요 알림을 껐어요\')"></label>'+
     '<label class="pf-toggle"><span>공지·챌린지 알림</span><input type="checkbox" '+(SETTINGS.notice?'checked':'')+' onchange="SETTINGS.notice=this.checked;toast(this.checked?\'공지 알림을 켰어요\':\'공지 알림을 껐어요\')"></label>'+
     '<label class="pf-toggle"><span>채팅 알림</span><input type="checkbox" '+(SETTINGS.chat?'checked':'')+' onchange="SETTINGS.chat=this.checked;toast(this.checked?\'채팅 알림을 켰어요\':\'채팅 알림을 껐어요\')"></label></div>';
  h+='</div>';
  document.getElementById("main").innerHTML=h;
  syncTabs("me");window.scrollTo({top:0,behavior:"smooth"});
  pfBookmarkCount(AUTH.user.id).then(function(n){
    var el=document.getElementById("pfhBmCount");
    if(el)el.textContent=n;
  });
}
function unfollowFromProfile(n){FOLLOW.delete(n);toast(dispName(n)+"님 팔로우를 취소했어요");openProfile();}
async function openAdminReports(){
  var res=await window.supabase.from("reports").select("*").eq("resolved",false).order("created_at",{ascending:false});
  if(res.error){toast("불러오기 실패: "+res.error.message);return;}
  var reports=res.data;
  var postIds=Array.from(new Set(reports.filter(function(r){return r.post_id}).map(function(r){return r.post_id})));
  var postRes=postIds.length?await window.supabase.from("posts").select("id,title,board").in("id",postIds):{data:[]};
  var postById={};(postRes.data||[]).forEach(function(pr){postById[pr.id]=pr;});
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
        h+='<div class="post rip"><div class="pmain"'+(post?' style="cursor:pointer" onclick="openPost('+(100000+post.id)+')"':'')+'><div class="ptitle">'+(post?esc(post.title):"(이미 삭제된 글)")+'</div>'+
          '<div class="pmeta"><span class="mt">'+timeAgo(r.created_at)+'</span>'+(r.reason?'<span class="sep"></span><span class="mv">사유: '+esc(r.reason)+'</span>':'')+'</div></div>'+
          '<div style="display:flex;gap:8px;flex-shrink:0">'+
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
async function dismissReport(reportId){
  var res=await window.supabase.from("reports").update({resolved:true}).eq("id",reportId);
  if(res.error){toast("처리 실패: "+res.error.message);return;}
  toast("신고를 처리했어요");
  openAdminReports();
}
async function adminDeleteReportedPost(reportId,postDbId){
  if(!(await confirmDialog("이 글을 삭제할까요?")))return;
  var res=await window.supabase.from("posts").delete().eq("id",postDbId);
  if(res.error){toast("삭제 실패: "+res.error.message);return;}
  await window.supabase.from("reports").update({resolved:true}).eq("id",reportId);
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
      var actions="";
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
  var path="campaign-"+Date.now()+"-"+f.name.replace(/\.[^.]+$/,"").replace(/[^a-zA-Z0-9_.-]/g,"_")+"."+ext;
  var up=await window.supabase.storage.from("post-images").upload(path,uploadBlob,f.type==="image/gif"?undefined:{contentType:uploadBlob.type});
  if(up.error){toast("업로드 실패: "+up.error.message);return;}
  campaignDraft.imageUrl=window.supabase.storage.from("post-images").getPublicUrl(path).data.publicUrl;
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
      return '<div class="chat-msg"><div class="chat-bubble">'+esc(nickById[m.sender_id]||"알 수 없음")+': '+esc(m.content)+'</div></div>';
    }).join(""):'<div class="pf-empty">메시지가 없어요.</div>')+'</div>'+
  '</div>';
  document.getElementById("main").innerHTML=h;
  window.scrollTo({top:0,behavior:"smooth"});
}
async function openAdminChatList(searchTerm){
  searchTerm=(searchTerm||"").trim();
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
    '<button class="d-back" onclick="openProfile()">← 내 정보로</button>'+
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
// ===== 이용규칙 =====
function openRules(){document.getElementById("rulesModal").classList.add("open");document.body.style.overflow="hidden";}
function closeRules(){document.getElementById("rulesModal").classList.remove("open");document.body.style.overflow="";}

// ===== 팔로우 =====
function toggleFollow(name,pid){
  if(FOLLOW.has(name)){FOLLOW.delete(name);toast(dispName(name)+"님 팔로우를 취소했어요");}
  else{FOLLOW.add(name);toast(dispName(name)+"님을 팔로우했어요","✓");}
  var btn=document.getElementById("followBtn");
  if(btn){
    var following=FOLLOW.has(name);
    btn.classList.toggle("following",following);
    btn.textContent=following?"팔로잉 ✓":"＋ 팔로우";
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

initAuth().then(loadRealPosts);

