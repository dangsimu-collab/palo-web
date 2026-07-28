var BOARDS=[
  {group:"이야기",items:[
    {id:"all",name:"전체 글",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"7\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M3 7l2-3h6l2 3\"/></svg>"},
    {id:"talk",name:"수다 광장",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z\"/></svg>"},
    {id:"ask",name:"물어보기",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7M12 17h.01\"/></svg>"}]},
  {group:"그리는 중",items:[
    {id:"wip",name:"작업 과정",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 20h4L18 10l-4-4L4 16v4z\"/><path d=\"M13 7l4 4\"/></svg>"},
    {id:"crit",name:"봐주세요",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>"},
    {id:"sketch",name:"스케치북",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 6C10 4 6 4 3 5v14c3-1 7-1 9 1 2-2 6-2 9-1V5c-3-1-7-1-9 1z\"/><path d=\"M12 6v14\"/></svg>"}]},
  {group:"함께",items:[
    {id:"challenge",name:"챌린지",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 3v18\"/><path d=\"M5 4h13l-2 4 2 4H5\"/></svg>"},
    {id:"tip",name:"팁 · 강좌",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 4 2 9l10 5 10-5-10-5z\"/><path d=\"M6 11v5c0 1 3 2 6 2s6-1 6-2v-5\"/></svg>"}]},
  {group:"거래",trade:true,items:[
    {id:"trade",name:"커미션 구인구직",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 12l3 3 5-5\"/><path d=\"M3 10l5-5 4 3 4-3 5 5-6 8H9z\"/></svg>"},
    {id:"used",name:"중고 장비",icon:"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 12l8-8h6a2 2 0 0 1 2 2v6l-8 8z\"/><circle cx=\"15\" cy=\"9\" r=\"1.4\" fill=\"currentColor\" stroke=\"none\"/></svg>"}]}
];
var CATMAP={talk:{label:"수다",cls:"talk-c"},ask:{label:"고민",cls:"help-c"},crit:{label:"봐주세요",cls:"crit-c"},
  wip:{label:"작업과정",cls:"crit-c"},tip:{label:"팁",cls:"tip-c"},challenge:{label:"챌린지",cls:"chal-c"},
  sketch:{label:"스케치북",cls:"tip-c"},trade:{label:"거래",cls:"free-c"},used:{label:"거래",cls:"free-c"}};

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
var state={board:"all",sort:"new",query:"",shown:8};
var PER=15;var page=1;var READ=new Set();var FOLLOW=new Set();
var ME={nick:"나"};
var AUTH={user:null,profile:null};
var SETTINGS={cm:true,like:true,notice:true};
var notifFilter="all";var pfTab="mine";
var MEMBERS=["달빛초","뎃생왕","연필깎이","붓끝","노을공방","먹구름"];
function dispName(a){return a==="나"?ME.nick:a}
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

  var res=await window.supabase.from("posts").select("*").order("created_at",{ascending:false});
  if(res.error){console.error(res.error);return;}
  var dbIds=res.data.map(function(row){return row.id});

  var profRes=await window.supabase.from("profiles").select("id,nickname");
  var nickById={};
  if(!profRes.error)profRes.data.forEach(function(row){nickById[row.id]=row.nickname;});
  function nameFor(uid){return uid&&nickById[uid]?nickById[uid]:"익명";}

  var cmRes=dbIds.length?await window.supabase.from("comments").select("*").in("post_id",dbIds).order("created_at"):{data:[]};
  var commentsByPost={};
  (cmRes.data||[]).forEach(function(c){
    (commentsByPost[c.post_id]=commentsByPost[c.post_id]||[]).push({n:nameFor(c.author_id),t:timeAgo(c.created_at),txt:c.content,dbId:c.id,authorId:c.author_id});
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
    return {id:100000+row.id,dbId:row.id,authorId:row.author_id,board:row.board,title:row.title,category:row.category,author:nameFor(row.author_id),
      time:timeAgo(row.created_at),likes:likers.length,_liked:likers.indexOf(myLikeId())>-1,
      views:row.views,thumb:"none",stage:row.stage,images:imagesByPost[row.id],
      content:(row.content||"").split("\n").filter(Boolean),comments:commentsByPost[row.id]||[]};
  });
  POSTS=real.concat(POSTS);
  renderNav(document.getElementById("boardNav"));renderNav(document.getElementById("boardNavM"));renderNav(document.getElementById("boardNavS"));
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
  else renderList();
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
async function applySession(session){
  AUTH.user=session?session.user:null;
  AUTH.profile=null;
  if(AUTH.user){
    var res=await window.supabase.from("profiles").select("*").eq("id",AUTH.user.id).single();
    if(!res.error)AUTH.profile=res.data;
    ME.nick=AUTH.profile?AUTH.profile.nickname:"새싹 작가";
  }else{
    ME.nick="나";
  }
  if(document.getElementById("main")&&document.querySelector(".profile"))openProfile();
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
function boardName(id){for(var g of BOARDS)for(var b of g.items)if(b.id===id)return b.name;return"전체 글"}
function catFor(p){return CATMAP[p.board]||{label:"글",cls:"free-c"}}
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
function filteredPosts(){
  var arr=POSTS.slice();
  if(state.board!=="all")arr=arr.filter(function(p){return p.board===state.board});
  if(state.query){var q=state.query.toLowerCase();arr=arr.filter(function(p){var body=(p.content||[]).join(" ").toLowerCase();return p.title.toLowerCase().indexOf(q)>-1||p.author.toLowerCase().indexOf(q)>-1||body.indexOf(q)>-1})}
  if(state.sort==="hot")arr.sort(function(a,b){return(b.likes+b.views/10)-(a.likes+a.views/10)});
  return arr;
}
function renderTrend(){
  var g={t1:"#e07aa6,#9784d6",t2:"#e0a074,#e07aa6",t3:"#7cc3e0,#9784d6",t4:"#a3c07a,#7cc3e0",t5:"#ecd291,#e0a074"};
  var h='<div class="trend-lead"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 7-7"/><path d="M17 8h4v4"/></svg>이번 주 인기</div>';
  TREND.forEach(function(t,i){
    h+='<div class="trend-item" onclick="goHome()"><span class="trend-rank">'+(i+1)+'</span>'+
       '<span class="trend-thumb" style="background:linear-gradient(135deg,'+g[t.thumb]+')"><svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"8\" cy=\"10\" r=\"1.3\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"12\" cy=\"8\" r=\"1.3\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"16\" cy=\"10\" r=\"1.3\" fill=\"currentColor\" stroke=\"none\"/></svg></span>'+
       '<span class="trend-meta"><span class="tt">'+esc(t.name)+'</span><span class="ts">'+esc(t.tag)+' · '+esc(t.sub)+'</span></span></div>';
  });
  var el=document.getElementById("trendStrip");if(el)el.innerHTML=h;
}
function emberHTML(){
  var top=POSTS.slice().sort(function(a,b){return(b.likes+b.comments.length*3)-(a.likes+a.comments.length*3)}).slice(0,6);
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
function skeletonHTML(){
  var r='<div class="list">';
  for(var i=0;i<5;i++)r+='<div class="skel-row"><div class="skel-main"><div class="skel-line t"></div><div class="skel-line m"></div></div><div class="skel-thumb"></div></div>';
  return r+'</div>';
}
function adRow(){
  return '<div class="ad" role="complementary" aria-label="광고">'+
    '<span class="ad-label">AD</span>'+
    '<div class="ad-ph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" style="width:22px;height:22px"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m4 18 5-5 4 3 3-2 4 4"/></svg></div>'+
    '<div class="ad-body"><div class="ad-t">광고 문의 환영</div>'+
    '<div class="ad-d">이 자리에 광고가 노출됩니다 · 그림 관련 브랜드 우대</div></div>'+
  '</div>';
}
function renderList(){
  if(location.pathname!=="/"){history.pushState({},"","/");document.title="Palo · 그림 그리는 사람들의 커뮤니티";}
  var main=document.getElementById("main");var arr=filteredPosts();
  var sub=state.query?('"'+esc(state.query)+'" 검색 결과 '+arr.length+'건'):(state.sort==="new"?"방금 올라온 이야기부터":"반응 많은 순으로");
  var h='<div class="board-head"><h1 class="serif">'+esc(state.query?"검색":boardName(state.board))+'</h1><span class="sub">'+sub+'</span>'+
    '<div class="sortbar"><button class="'+(state.sort==="new"?"on":"")+'" onclick="setSort(\'new\')">최신</button><button class="'+(state.sort==="hot"?"on":"")+'" onclick="setSort(\'hot\')">인기</button></div></div>';
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
  h+='<div class="list">';
  visible.forEach(function(p,idx){
    var c=catFor(p);
    var isHot=p.likes>=90;
    var imgCount=p.images?p.images.length:((p.thumb!=="none")?(Math.floor(p.likes/18)%6+1):0); // demo image-count badge
    var thumb = p.images&&p.images.length ?
      '<div class="nthumb"><img src="'+esc(p.images[0])+'" alt="" style="width:100%;height:100%;object-fit:cover">'+
        (p.stage?'<span class="nstage">'+p.stage+'</span>':'')+
        (imgCount>1?'<span class="ncount">'+imgCount+'+</span>':'')+
      '</div>' :
      p.thumb==="none" ?
      '<div class="nthumb nthumb-empty"><span class="ne-ico">'+CATICON(p.board)+'</span></div>' :
      '<div class="nthumb '+p.thumb+'">'+
        (p.stage?'<span class="nstage">'+p.stage+'</span>':'')+
        (imgCount>1?'<span class="ncount">'+imgCount+'+</span>':'')+
      '</div>';
    h+='<div class="post rip'+(isHot?' hot-post':'')+(READ.has(p.id)?' read':'')+(p.id===justAddedId?' justAdded':'')+'" tabindex="0" role="button" onclick="openPost('+p.id+')" onkeydown="if(event.key===\'Enter\')openPost('+p.id+')">'+
      '<div class="pmain">'+
        '<div class="ptitle">'+esc(p.title)+'</div>'+
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
  var p=POSTS.find(function(x){return x.id===id});if(!p)return;p.views++;READ.add(id);
  if(p.dbId&&window.supabase)window.supabase.rpc("increment_post_views",{p_id:p.dbId}).then(function(){});
  if(p.dbId){
    var targetPath="/post/"+p.dbId;
    if(location.pathname!==targetPath)history.pushState({},"",targetPath);
    document.title=p.title+" · Palo";
  }
  var main=document.getElementById("main");var c=catFor(p);
  var canvas=(p.images&&p.images.length)?
    '<div class="d-canvas" style="height:auto;display:block;padding:0">'+(p.stage?'<span class="stage-tag">'+p.stage+' 단계</span>':'')+
      p.images.map(function(url){return '<img src="'+esc(url)+'" alt="" style="width:100%;display:block;max-height:520px;object-fit:cover">'}).join("")+
    '</div>' :
    p.thumb==="none"?"":'<div class="d-canvas" style="background:linear-gradient(135deg,'+GRADS[p.thumb]+')">'+(p.stage?'<span class="stage-tag">'+p.stage+' 단계</span>':'')+'🎨 작품 이미지 영역</div>';
  var liked=p._liked?" liked":"";
  var h='<div class="detail"><div class="d-grip"></div><button class="d-back" onclick="renderList()"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>목록으로</button>'+
    '<div class="d-head"><div class="line1"><span class="cat '+c.cls+'">'+c.label+'</span></div><h1 class="serif">'+esc(p.title)+'</h1>'+
    '<div class="d-author"><div class="d-ava serif">'+esc(dispName(p.author)[0])+'</div><div class="d-au-info"><div class="n"'+(p.authorId?' style="cursor:pointer" onclick="openUserProfile(\''+p.authorId+'\')"':'')+'>'+esc(dispName(p.author))+'</div><div class="meta">'+p.time+' · 조회 '+fmtViews(p.views)+'</div></div>'+
    '<button class="d-follow'+(FOLLOW.has(p.author)?' following':'')+'" onclick="toggleFollow(\''+esc(p.author)+'\','+p.id+')">'+(FOLLOW.has(p.author)?'팔로잉 ✓':'＋ 팔로우')+'</button></div></div>'+
    canvas+'<div class="d-content">'+(p.html?p.html:p.content.map(function(x){return'<p>'+esc(x)+'</p>'}).join(""))+'</div>'+
    '<div class="d-actions"><button class="d-act'+liked+'" onclick="toggleLike('+p.id+')">'+(p._liked?"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"none\"><path d=\"M12 20s-7-4.5-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5c0 5-7 9.5-7 9.5z\"/></svg>":"<svg class=\"ic\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 20s-7-4.5-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5c0 5-7 9.5-7 9.5z\"/></svg>")+'좋아요 '+p.likes+'</button>'+
    '<button class="d-act" onclick="sharePost('+p.id+')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 15l6-6"/><path d="M10 6l1-1a4 4 0 0 1 6 6l-1 1M14 18l-1 1a4 4 0 0 1-6-6l1-1"/></svg>공유</button>'+
    '<button class="d-act" onclick="reportPost('+p.id+')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>신고</button>'+
    ((p.dbId&&AUTH.user&&p.authorId===AUTH.user.id)?('<button class="d-act" onclick="openEditPost('+p.id+')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L20 8l-4-4L4 16v4z"/><path d="M14 6l4 4"/></svg>수정</button>'+
    '<button class="d-act" onclick="deletePost('+p.id+')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>삭제</button>'):'')+
    '</div>'+
    '<div class="comments"><div class="cm-head"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/></svg>훈수 · 크리틱 '+p.comments.length+'</div>'+
    '<div class="cm-write"><div class="d-ava serif" id="cmAva">나</div><div class="box"><textarea id="cmInput" placeholder="따뜻한 피드백을 남겨주세요. 사람보다 그림을 이야기해요."></textarea>'+
    '<div class="row"><span class="hint">인신공격·조롱은 삭제될 수 있어요</span><button class="send" onclick="addComment('+p.id+')">등록</button></div></div></div>'+
    '<div class="ad d-ad" role="complementary" aria-label="광고"><span class="ad-label">AD</span><div class="ad-ph"><svg viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.6\\" style=\\"width:22px;height:22px\\"><rect x=\\"3\\" y=\\"4\\" width=\\"18\\" height=\\"16\\" rx=\\"2\\"/><circle cx=\\"8.5\\" cy=\\"9.5\\" r=\\"1.6\\"/><path d=\\"m4 18 5-5 4 3 3-2 4 4\\"/></svg></div><div class="ad-body"><div class="ad-t">광고 문의 환영</div><div class="ad-d">이 자리에 광고가 노출됩니다</div></div></div>'+'<div class="cm-list" id="cmList">'+renderComments(p)+'</div></div></div>';
  main.innerHTML=h;window.scrollTo({top:0,behavior:"smooth"});
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
var reportingPostId=null;
function reportPost(id){
  var p=POSTS.find(function(x){return x.id===id});if(!p)return;
  if(!p.dbId||!window.supabase){toast("신고가 접수되었어요");return;}
  reportingPostId=id;
  document.getElementById("reportReasonInput").value="";
  document.getElementById("reportModal").classList.add("open");
  setTimeout(function(){document.getElementById("reportReasonInput").focus()},60);
}
function closeReport(){reportingPostId=null;document.getElementById("reportModal").classList.remove("open");}
async function submitReport(){
  var id=reportingPostId;var p=POSTS.find(function(x){return x.id===id});if(!p)return;
  var reason=document.getElementById("reportReasonInput").value.trim()||null;
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
    return '<div class="cm"><div class="d-ava serif">'+esc(dispName(c.n)[0])+'</div><div class="cbody"><div class="ch"><span class="cn"'+(c.authorId?' style="cursor:pointer" onclick="openUserProfile(\''+c.authorId+'\')"':'')+'>'+esc(c.n)+'</span><span class="ct">'+esc(c.t)+'</span></div><div class="ctext">'+esc(c.txt).replace(/^@(\S+)/,'<b class="mention">@$1</b>')+'</div><div class="cfoot"><span onclick="helpful('+p.id+','+ci+',this)"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11v9H4v-9zM7 11l4-8a2 2 0 0 1 3 2l-1 6h5a2 2 0 0 1 2 2l-1 6a2 2 0 0 1-2 1H7"/></svg>도움돼요'+(c.h?' <b>'+c.h+'</b>':'')+'</span><span onclick="replyTo(\''+esc(c.n)+'\')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/></svg>답글</span>'+(canDelete?'<span onclick="deleteComment('+p.id+','+ci+')">삭제</span>':'')+'</div></div></div>';
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
  var wasLiked=p._liked;openPost(id);p.views--;
  var btn=document.querySelector(".d-act");if(btn){btn.classList.add("pop");setTimeout(function(){btn.classList.remove("pop")},340);}
  if(wasLiked)toast("좋아요를 눌렀어요","♥");
}
function selectBoard(id){
  state.board=id;state.query="";page=1;
  document.getElementById("searchInput").value="";var m=document.getElementById("searchInputM");if(m)m.value="";
  renderNav(document.getElementById("boardNav"));renderNav(document.getElementById("boardNavM"));renderNav(document.getElementById("boardNavS"));
  renderChips();closeDrawer();closeSheet();syncTabs(id);
  var main=document.getElementById("main");
  main.innerHTML=skeletonHTML();
  window.scrollTo({top:0,behavior:"smooth"});
  setTimeout(renderList,200);
}
function setSort(s){state.sort=s;page=1;renderList()}
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
function openWrite(){
  editingPostId=null;
  edState={board:(state.board!=="all"&&state.board!=="sketch")?state.board:null,tag:null,img:false,images:[]};
  buildBoardMenu();refreshBoardLabel();renderEdTags();
  document.getElementById("wTitle").value="";
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
  editingPostId=id;
  edState={board:p.board,tag:p.category||null,img:!!(p.images&&p.images.length),images:p.images?p.images.slice():[]};
  buildBoardMenu();refreshBoardLabel();renderEdTags();
  document.getElementById("wTitle").value=stripTag(p.title,p.category);
  document.getElementById("wContent").innerHTML=p.html?p.html:p.content.map(function(x){return"<p>"+esc(x)+"</p>"}).join("");
  renderEdImages();
  document.getElementById("edCrit").checked=(edState.board==="crit");
  document.getElementById("edTitleLabel").textContent="글 수정";
  document.getElementById("edSubmitBtn").textContent="수정 완료";
  document.getElementById("writeModal").classList.add("open");document.body.style.overflow="hidden";
  document.getElementById("edBoardMenu").classList.remove("open");
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
function pickBoard(id){edState.board=id;edState.tag=null;buildBoardMenu();refreshBoardLabel();renderEdTags();
  document.getElementById("edBoardMenu").classList.remove("open");
  document.getElementById("edCrit").checked=(id==="crit");}
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
function pickImage(e){e.preventDefault();document.getElementById("edFile").click()}
async function onImage(e){
  var f=e.target.files[0];if(!f)return;
  e.target.value="";
  if(!window.supabase){toast("이미지 업로드를 사용할 수 없어요");return;}
  toast("이미지 업로드 중...");
  var path=Date.now()+"-"+f.name.replace(/[^a-zA-Z0-9_.-]/g,"_");
  var up=await window.supabase.storage.from("post-images").upload(path,f);
  if(up.error){toast("업로드 실패: "+up.error.message);return;}
  var pub=window.supabase.storage.from("post-images").getPublicUrl(path);
  edState.images.push(pub.data.publicUrl);
  edState.img=true;
  renderEdImages();
  toast("이미지를 넣었어요");
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
function removeEdImage(i){edState.images.splice(i,1);renderEdImages();}
async function submitPost(){
  var t=document.getElementById("wTitle").value.trim();
  var cEl=document.getElementById("wContent");
  var html=cEl.innerHTML.trim();
  var text=cEl.textContent.trim();
  if(!edState.board){toast("게시판을 선택해주세요");document.getElementById("edBoardMenu").classList.add("open");return}
  if(!t){toast("제목을 입력해주세요");return}
  if(!text&&!edState.img){toast("내용을 입력해주세요");return}
  var title=(edState.tag?"["+edState.tag+"] ":"")+t;
  var stage=(["러프","선화","채색","완성"].indexOf(edState.tag)>-1)?edState.tag:null;

  if(editingPostId){
    var ep=POSTS.find(function(x){return x.id===editingPostId});
    if(!ep){editingPostId=null;toast("수정할 글을 찾을 수 없어요");return;}
    if(window.supabase&&ep.dbId){
      var upd=await window.supabase.from("posts").update({
        board:edState.board,category:edState.tag,title:title,content:text,
        stage:edState.img?(stage||"완성"):null
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
      stage:edState.img?(stage||"완성"):null
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
  }

  var np={id:Date.now(),board:edState.board,title:title,author:"나",time:"방금",likes:0,views:1,
    thumb:edState.img?"t1":"none",stage:edState.img?(stage||"완성"):null,
    images:edState.images.length?edState.images.slice():undefined,
    dbId:saved&&saved.data?saved.data.id:undefined,authorId:saved&&saved.data?saved.data.author_id:undefined,
    html:html,content:text.split("\n").filter(Boolean),comments:[]};
  justAddedId=np.id;setTimeout(function(){justAddedId=null},1800);POSTS.unshift(np);scheduleLiveReply(np.id);
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
if(!getPostIdFromPath()&&!getUserIdFromPath()){renderChips();renderHot();renderTrend();renderList();}

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
function delNotif(i){NOTIFS.splice(i,1);renderNotifs();syncNotifBadge();toast("알림을 삭제했어요");}
function renderNotifs(){
  var el=document.getElementById("npList");if(!el)return;
  var tabs=[["all","전체"],["cm","댓글"],["like","좋아요"],["sys","공지"]];
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
  if(n.post)openPost(n.post);else openRules();
}
function markAllRead(){NOTIFS.forEach(function(n){n.read=true});renderNotifs();syncNotifBadge();toast("모든 알림을 읽음 처리했어요");}

// ===== 내 정보 (프로필) =====
function profileRow(p){
  var c=catFor(p);
  return '<div class="post rip" onclick="openPost('+p.id+')">'+
    '<div class="pmain"><div class="ptitle">'+esc(p.title)+'</div>'+
    '<div class="pmeta"><span class="cat '+c.cls+'">'+c.label+'</span>'+
    '<span class="mt">'+p.time+'</span><span class="sep"></span><span class="mv">조회 '+fmtViews(p.views)+'</span>'+
    (p.likes?'<span class="sep"></span><span class="ml">추천 '+p.likes+'</span>':'')+'</div></div>'+
    '<div class="pcmt"><span class="cn">'+p.comments.length+'</span><span class="cl">댓글</span></div></div>';
}
function setPfTab(t){pfTab=t;openProfile();}
function listOrEmpty(arr,emptyMsg,cta){
  if(arr.length)return '<div class="list">'+arr.map(profileRow).join("")+'</div>';
  return '<div class="pf-empty">'+emptyMsg+(cta?'<button onclick="openWrite()">✏️ 첫 글 쓰기</button>':'')+'</div>';
}
async function openUserProfile(userId){
  if(!userId||!window.supabase)return;
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
  var h='<div class="profile">';
  h+='<div class="pf-card"><div class="pf-ava">'+esc(profile.nickname[0])+'</div><div class="pf-info">'+
     '<div class="pf-name">'+esc(profile.nickname)+'<span class="pf-lv">'+esc(profile.level||"새싹 작가")+'</span></div>'+
     '</div></div>';
  h+='<div class="pf-stats">'+
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
function openProfile(){
  closeNotif();
  if(!AUTH.user){
    document.getElementById("main").innerHTML=
      '<div class="profile"><div class="empty"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>'+
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
  var nextLv=Math.max(0,3-mine.length);
  var lvName=mine.length>=3?"연필 견습":"새싹 작가";
  var pct=Math.min(100,Math.round(mine.length/3*100));
  var h='<div class="profile">';
  h+='<div class="pf-card"><div class="pf-ava">'+esc(ME.nick[0])+'</div><div class="pf-info">'+
     '<div class="pf-name">'+esc(ME.nick)+'<span class="pf-lv">'+lvName+'</span></div>'+
     '<div class="pf-sub">Palo와 함께 그리는 중 · 팔로잉 '+FOLLOW.size+'명</div></div>'+
     '<button class="pf-edit" onclick="openNickModal()">닉네임 변경</button>'+
     '<button class="pf-edit" onclick="logout()">로그아웃</button>'+
     (AUTH.profile&&AUTH.profile.is_admin?'<button class="pf-edit" onclick="openAdminReports()">🛡 신고 목록</button>':'')+
     '</div>';
  h+='<div class="pf-progress"><div class="pp-row"><span>'+lvName+'</span><span>'+
     (nextLv?('다음 등급까지 글 '+nextLv+'개'):'등급 달성! 🎉')+'</span></div>'+
     '<div class="pp-bar"><div class="pp-fill" style="width:'+pct+'%"></div></div></div>';
  h+='<div class="pf-stats">'+
     '<div class="pf-st"><b>'+mine.length+'</b><span>쓴 글</span></div>'+
     '<div class="pf-st"><b>'+likeSum+'</b><span>받은 추천</span></div>'+
     '<div class="pf-st"><b>'+cmSum+'</b><span>받은 댓글</span></div>'+
     '<div class="pf-st"><b>'+READ.size+'</b><span>읽은 글</span></div></div>';
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
     '<label class="pf-toggle"><span>공지·챌린지 알림</span><input type="checkbox" '+(SETTINGS.notice?'checked':'')+' onchange="SETTINGS.notice=this.checked;toast(this.checked?\'공지 알림을 켰어요\':\'공지 알림을 껐어요\')"></label></div>';
  h+='</div>';
  document.getElementById("main").innerHTML=h;
  syncTabs("me");window.scrollTo({top:0,behavior:"smooth"});
}
function unfollowFromProfile(n){FOLLOW.delete(n);toast(dispName(n)+"님 팔로우를 취소했어요");openProfile();}
async function openAdminReports(){
  var res=await window.supabase.from("reports").select("*").eq("resolved",false).order("created_at",{ascending:false});
  if(res.error){toast("불러오기 실패: "+res.error.message);return;}
  var reports=res.data;
  var postIds=Array.from(new Set(reports.map(function(r){return r.post_id})));
  var postRes=postIds.length?await window.supabase.from("posts").select("id,title,board").in("id",postIds):{data:[]};
  var postById={};(postRes.data||[]).forEach(function(pr){postById[pr.id]=pr;});
  var h='<div class="profile"><div class="pf-sec">🛡 신고된 글 ('+reports.length+')</div>';
  if(!reports.length){
    h+='<div class="pf-empty">처리할 신고가 없어요.</div>';
  }else{
    h+='<div class="list">';
    reports.forEach(function(r){
      var post=postById[r.post_id];
      h+='<div class="post rip"><div class="pmain"'+(post?' style="cursor:pointer" onclick="openPost('+(100000+post.id)+')"':'')+'><div class="ptitle">'+(post?esc(post.title):"(이미 삭제된 글)")+'</div>'+
        '<div class="pmeta"><span class="mt">'+timeAgo(r.created_at)+'</span>'+(r.reason?'<span class="sep"></span><span class="mv">사유: '+esc(r.reason)+'</span>':'')+'</div></div>'+
        '<div style="display:flex;gap:8px;flex-shrink:0">'+
          (post?'<button class="d-act" onclick="adminDeleteReportedPost('+r.id+','+post.id+')">글 삭제</button>':'')+
          '<button class="d-act" onclick="dismissReport('+r.id+')">무시</button>'+
        '</div></div>';
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
function openNickModal(){
  document.getElementById("nickInput").value=ME.nick==="나"?"":ME.nick;
  document.getElementById("nickModal").classList.add("open");
  setTimeout(function(){document.getElementById("nickInput").focus()},60);
}
function closeNick(){document.getElementById("nickModal").classList.remove("open");}
async function saveNick(){
  var v=document.getElementById("nickInput").value.trim();
  if(v.length<2){toast("닉네임은 2자 이상이어야 해요");return;}
  if(AUTH.user&&window.supabase){
    var res=await window.supabase.from("profiles").update({nickname:v}).eq("id",AUTH.user.id);
    if(res.error){toast("저장 실패: "+res.error.message);return;}
    if(AUTH.profile)AUTH.profile.nickname=v;
  }
  ME.nick=v;closeNick();toast("닉네임을 \'"+v+"\'(으)로 바꿨어요","✓");
  openProfile();
}
function scheduleLiveReply(pid){
  if(!SETTINGS.cm)return;
  setTimeout(function(){
    var p=POSTS.find(function(x){return x.id===pid});if(!p)return;
    var who=MEMBERS[Math.floor(Math.random()*MEMBERS.length)];
    p.comments.push({n:who,t:"방금",txt:"오 잘 보고 가요! 다음 글도 기대할게요 🎨"});
    NOTIFS.unshift({type:"cm",icon:"💬",txt:who+"님이 회원님의 글 「"+p.title.slice(0,14)+"…」에 훈수를 남겼어요",time:"방금",post:pid,read:false});
    syncNotifBadge();
    toast("새 알림이 도착했어요","🔔");
  },7000);
}

// ===== 이용규칙 =====
function openRules(){document.getElementById("rulesModal").classList.add("open");document.body.style.overflow="hidden";}
function closeRules(){document.getElementById("rulesModal").classList.remove("open");document.body.style.overflow="";}

// ===== 팔로우 =====
function toggleFollow(name,pid){
  if(FOLLOW.has(name)){FOLLOW.delete(name);toast(dispName(name)+"님 팔로우를 취소했어요");}
  else{FOLLOW.add(name);toast(dispName(name)+"님을 팔로우했어요","✓");}
  var p=POSTS.find(function(x){return x.id===pid});openPost(pid);if(p)p.views--;
}

// ===== 댓글 상호작용 =====
function helpful(pid,ci,el){
  var p=POSTS.find(function(x){return x.id===pid});if(!p)return;
  var c=p.comments[ci];
  var b=el.querySelector("b");
  if(c._me){
    c.h=Math.max(0,(c.h||1)-1);c._me=false;
    if(c.h<=0&&b)b.remove();else if(b)b.textContent=c.h;
    toast("도움돼요를 취소했어요");return;
  }
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

