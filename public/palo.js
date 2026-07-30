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
var AD_USER_SHARE_MAX=0.20; // 유저 광고가 전체 광고 자리 노출에서 차지할 수 있는 최대 비중
var AD_PER_AD_SHARE_MAX=0.04; // 광고 하나가 차지할 수 있는 최대 비중(초기엔 광고가 적어 소수가 20%를 독점하는 걸 막기 위함)
function computeAdWeights(ads){
  var total=ads.reduce(function(s,a){return s+(a.points_spent||0);},0);
  if(!total)return ads.map(function(){return 0;});
  return ads.map(function(a){
    return Math.min(AD_PER_AD_SHARE_MAX,AD_USER_SHARE_MAX*(a.points_spent/total));
  });
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

  var adRes=await window.supabase.from("user_ads").select("id,image_url,linked_post_id,points_spent").eq("status","active").gt("expires_at",new Date().toISOString());
  if(!adRes.error)ACTIVE_ADS=adRes.data||[];

  var adLockRes=await window.supabase.from("user_ads").select("linked_post_id,status,expires_at").in("status",["pending","active"]);
  var adLockedIds={};
  var nowIso=new Date().toISOString();
  (adLockRes.data||[]).forEach(function(a){
    if(a.status==="pending"||(a.status==="active"&&a.expires_at&&a.expires_at>nowIso))adLockedIds[a.linked_post_id]=true;
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
      reviewedNickname:row.reviewed_nickname||null,commissionPostId:row.commission_post_id||null,commissionSentiment:row.commission_sentiment||null,
      content:(row.content||"").split("\n").filter(Boolean),html:row.content_html||undefined,comments:commentsByPost[row.id]||[]};
  });
  POSTS=real.concat(POSTS);
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
function skeletonHTML(){
  var r='<div class="list">';
  for(var i=0;i<5;i++)r+='<div class="skel-row"><div class="skel-main"><div class="skel-line t"></div><div class="skel-line m"></div></div><div class="skel-thumb"></div></div>';
  return r+'</div>';
}
function adRow(){
  if(ACTIVE_ADS.length){
    var weights=computeAdWeights(ACTIVE_ADS);
    var r=Math.random(),cum=0;
    for(var i=0;i<ACTIVE_ADS.length;i++){
      cum+=weights[i];
      if(r<cum){
        var ad=ACTIVE_ADS[i];
        return '<div class="ad ad-banner" role="complementary" aria-label="광고" style="cursor:pointer;position:relative" onclick="openPost('+(100000+ad.linked_post_id)+')">'+
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
    '<div class="ad-d">이 자리에 광고가 노출됩니다 · 그림 관련 브랜드 우대</div></div>'+
  '</div>';
}
function renderList(){
  leaveChat();
  if(location.pathname!=="/"){history.pushState({},"","/");document.title="Palo · 그림 그리는 사람들의 커뮤니티";}
  var main=document.getElementById("main");var arr=filteredPosts();
  var sub=state.query?('"'+esc(state.query)+'" 검색 결과 '+arr.length+'건'):(state.sort==="new"?"방금 올라온 이야기부터":"반응 많은 순으로");
  var isCommission=(state.board==="trade"||state.board==="review")&&!state.query;
  var h='<div class="board-head">'+
    (isCommission?
      ('<div class="bh-title commission-tabs">'+
        '<button class="commission-tab'+(state.board==="trade"?" on":"")+'" onclick="switchCommissionTab(\'trade\')">구인구직</button>'+
        '<button class="commission-tab'+(state.board==="review"?" on":"")+'" onclick="switchCommissionTab(\'review\')">후기</button>'+
      '</div>'):
      ('<div class="bh-title"><h1 class="serif">'+esc(state.query?"검색":boardName(state.board))+'</h1><span class="sub">'+sub+'</span></div>')
    )+
    '<div class="bh-controls">'+
      '<div class="sortbar"><button class="'+(state.sort==="new"?"on":"")+'" onclick="setSort(\'new\')">최신</button><button class="'+(state.sort==="hot"?"on":"")+'" onclick="setSort(\'hot\')">인기</button></div>'+
      (state.board!=="review"?('<div class="sortbar viewbar"><button class="'+(state.viewMode==="list"?"on":"")+'" onclick="setViewMode(\'list\')">☰ 목록형</button><button class="'+(state.viewMode==="album"?"on":"")+'" onclick="setViewMode(\'album\')">▦ 앨범형</button></div>'):'')+
      (isCommission?'<button class="d-act" onclick="openCommissionWrite()">＋ 글쓰기</button>':'')+
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
var adState={postId:null,bannerUrl:null};
function openCreateAd(postId){
  var p=POSTS.find(function(x){return x.id===postId});if(!p||!p.dbId)return;
  if(!AUTH.user||p.authorId!==AUTH.user.id){toast("본인 글만 광고할 수 있어요");return;}
  adState={postId:postId,bannerUrl:null};
  document.getElementById("adNoticeModal").classList.add("open");
}
function closeAdNoticeModal(){document.getElementById("adNoticeModal").classList.remove("open");}
function agreeAdNotice(){
  closeAdNoticeModal();
  document.getElementById("adBannerPreview").innerHTML="";
  document.getElementById("adRateInput").value="";
  document.getElementById("adDaysInput").value="";
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
  if(!adState.postId){toast("글 정보를 찾을 수 없어요");return;}
  if(!adState.bannerUrl){toast("배너 이미지를 선택해주세요");return;}
  var rate=parseInt(document.getElementById("adRateInput").value,10);
  var days=parseInt(document.getElementById("adDaysInput").value,10);
  if(!rate||rate<1){toast("1일당 사용할 포인트를 입력해주세요");return;}
  if(!days||days<1){toast("노출할 날짜를 입력해주세요");return;}
  if(rate*days<500){toast("최소 500포인트부터 집행할 수 있어요");return;}
  var p=POSTS.find(function(x){return x.id===adState.postId});if(!p||!p.dbId)return;
  var res=await window.supabase.rpc("create_user_ad",{p_post_id:p.dbId,p_image_url:adState.bannerUrl,p_points_per_day:rate,p_duration_days:days});
  if(res.error){toast("광고 등록 실패: "+res.error.message);return;}
  p.adLocked=true;
  closeAdModal();
  await refreshMyProfile();
  if(typeof renderPostDetail==="function")renderPostDetail(p.id);
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
  var main=document.getElementById("main");
  main.innerHTML=skeletonHTML();
  window.scrollTo({top:0,behavior:"smooth"});
  setTimeout(renderList,200);
}
function openCommissionHub(tab){
  state.board=(tab==="review")?"review":"trade";
  state.query="";state.tag=null;page=1;
  document.getElementById("searchInput").value="";var m=document.getElementById("searchInputM");if(m)m.value="";
  renderNav(document.getElementById("boardNav"));renderNav(document.getElementById("boardNavM"));renderNav(document.getElementById("boardNavS"));
  renderChips();closeDrawer();closeSheet();syncTabs("commission");
  var main=document.getElementById("main");
  main.innerHTML=skeletonHTML();
  window.scrollTo({top:0,behavior:"smooth"});
  setTimeout(renderList,200);
}
function switchCommissionTab(tab){
  state.board=(tab==="review")?"review":"trade";
  state.query="";state.tag=null;page=1;
  syncTabs("commission");
  renderList();
  window.scrollTo({top:0,behavior:"smooth"});
}
function openCommissionWrite(){
  var board=(state.board==="trade"||state.board==="review")?state.board:"trade";
  openWrite();
  pickBoard(board);
}
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
  document.getElementById("edReviewNickInput").value="";
  document.getElementById("edCommissionList").style.display="none";
  document.getElementById("edCommissionList").innerHTML="";
  renderCommissionSelected();
}
function clearCommissionSelection(){
  edState.commissionPostId=null;edState.reviewedNick=null;
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
  edState={board:(state.board!=="all"&&state.board!=="sketch")?state.board:null,tag:null,img:false,images:[],commissionPostId:null,reviewedNick:null,sentiment:null};
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
  edState={board:p.board,tag:p.category||null,img:!!(p.images&&p.images.length),images:p.images?p.images.slice():[],commissionPostId:p.commissionPostId||null,reviewedNick:p.reviewedNickname||null,sentiment:p.commissionSentiment||null};
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
    edState.commissionPostId=null;edState.reviewedNick=null;edState.sentiment=null;
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
  var commissionPostId=isReview?edState.commissionPostId:null;

  if(editingPostId){
    var ep=POSTS.find(function(x){return x.id===editingPostId});
    if(!ep){editingPostId=null;toast("수정할 글을 찾을 수 없어요");return;}
    if(window.supabase&&ep.dbId){
      var upd=await window.supabase.from("posts").update({
        board:edState.board,category:edState.tag,title:title,content:text,content_html:html||null,
        stage:edState.img?(stage||"완성"):null,reviewed_nickname:reviewedNick,commission_post_id:commissionPostId,
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
    reviewedNickname:reviewedNick,commissionPostId:commissionPostId,commissionSentiment:sentiment,
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
  var tabs=[["all","전체"],["cm","댓글"],["like","좋아요"],["chat","채팅"],["sys","공지"]];
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
function reviewsAboutHTML(nickname){
  if(!nickname)return"";
  var reviews=POSTS.filter(function(p){return p.board==="review"&&p.reviewedNickname===nickname});
  if(!reviews.length)return"";
  var groups=[],byKey={};
  reviews.forEach(function(r){
    var key=r.commissionPostId||"deleted";
    if(!byKey[key]){
      var cp=r.commissionPostId?POSTS.find(function(p){return p.dbId===r.commissionPostId}):null;
      byKey[key]={title:cp?cp.title:"삭제된 커미션 글",deleted:!cp,posts:[]};
      groups.push(byKey[key]);
    }
    byKey[key].posts.push(r);
  });
  groups.sort(function(a,b){return(a.deleted===b.deleted)?0:(a.deleted?1:-1)});
  var h='<div class="pf-sec">📝 '+esc(nickname)+'님에 대한 커미션 후기 ('+reviews.length+')</div>';
  groups.forEach(function(g){
    h+='<div class="commission-group'+(g.deleted?' deleted':'')+'">'+
      '<div class="commission-group-title">'+(g.deleted?'🗑️ ':'🎨 ')+esc(g.title)+' <span class="ccount">'+g.posts.length+'</span></div>'+
      reviewAlbumHTML(g.posts)+
    '</div>';
  });
  return h;
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
  var h='<div class="profile">';
  h+='<div class="pf-card"><div class="pf-ava">'+avatarHTML(profile.nickname,profile.avatar_url)+'</div><div class="pf-info">'+
     '<div class="pf-name">'+esc(profile.nickname)+levelBadgeHtml(profile.level)+'</div>'+
     '</div>'+(canChat?'<button class="pf-edit" onclick="openChat(\''+userId+'\')">💬 채팅하기</button>':'')+'</div>';
  h+=pinnedPostCardHTML(profile.pinned_post_id);
  h+=reviewsAboutHTML(profile.nickname);
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
}
/* ---------- 알림 (DB 저장, notifications 테이블) ---------- */
var globalNotifChannel=null;
function dbRowToNotif(row){
  return {dbId:row.id,type:row.type,icon:row.icon||"🔔",txt:row.content,time:timeAgo(row.created_at),chatUser:row.link_chat_user,post:row.link_post_id?100000+row.link_post_id:null,read:row.is_read};
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
    return '<div class="chat-msg'+(mine?' mine':'')+'" data-msg-id="'+m.id+'">'+
      '<div class="chat-bubble">'+esc(m.content)+'</div>'+
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
  var res=await window.supabase.from("messages").insert({conversation_id:currentConversationId,sender_id:AUTH.user.id,content:v});
  inp.disabled=false;
  if(res.error){toast("전송 실패: "+res.error.message);return;}
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
        '<div class="pf-ava" style="width:40px;height:40px;font-size:15px;flex-shrink:0">'+(i+1)+'</div>'+
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
  var h='<div class="profile" id="myProfileView">';
  h+='<div class="pf-card"><div class="pf-ava" style="cursor:pointer" title="프로필 이미지 변경" onclick="document.getElementById(\'avatarFile\').click()">'+avatarHTML(ME.nick,AUTH.profile&&AUTH.profile.avatar_url)+
     '<button type="button" class="pf-ava-edit" onclick="event.stopPropagation();document.getElementById(\'avatarFile\').click()" title="프로필 이미지 변경" aria-label="프로필 이미지 변경">📷</button>'+
     '</div><div class="pf-info">'+
     '<div class="pf-name">'+esc(ME.nick)+levelBadgeHtml(myLevel)+'</div>'+
     '<div class="pf-sub">Palo와 함께 그리는 중 · 팔로잉 '+FOLLOW.size+'명</div></div>'+
     '<div class="pf-actions">'+
       '<button class="pf-edit" onclick="openNickModal()">닉네임 변경</button>'+
       '<button class="pf-edit" onclick="openChatList()">💬 채팅 목록</button>'+
       '<button class="pf-edit" onclick="openScoreLog()">포인트 내역</button>'+
       '<button class="pf-edit" onclick="logout()">로그아웃</button>'+
     '</div></div>';
  if(AUTH.profile&&AUTH.profile.is_admin){
    h+='<div class="pf-sec">🛡 관리자 메뉴</div>'+
       '<div class="pf-actions pf-admin-actions">'+
         '<button class="pf-edit" onclick="openAdminReports()">신고 목록</button>'+
         '<button class="pf-edit" onclick="openAdminChatList()">전체 채팅 목록</button>'+
         '<button class="pf-edit" onclick="openAdminAdReview()">광고 심사</button>'+
         '<button class="pf-edit" onclick="openAdminAdList()">전체 광고 목록</button>'+
         '<button class="pf-edit" onclick="openManagerPickList()">📌 매니저 픽 관리</button>'+
       '</div>';
  }
  h+=pinnedPostCardHTML(AUTH.profile?AUTH.profile.pinned_post_id:null);
  h+=reviewsAboutHTML(ME.nick);
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
  var adRes=adIds.length?await window.supabase.from("user_ads").select("id,user_id,image_url,status,linked_post_id").in("id",adIds):{data:[]};
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
        h+='<div class="post rip"><div class="pmain"'+(ad?' style="cursor:pointer" onclick="openPost('+(100000+ad.linked_post_id)+')"':'')+'>'+
          (ad?'<img src="'+esc(ad.image_url)+'" alt="" style="width:100%;max-width:220px;height:56px;object-fit:cover;border-radius:8px;margin-bottom:6px;display:block">':'')+
          '<div class="ptitle">📢 광고 신고 — '+(ad?esc(adName):"(이미 삭제된 광고)")+'</div>'+
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
  var res=await window.supabase.from("user_ads").select("id,user_id,image_url,status,points_spent,duration_days,created_at,expires_at,linked_post_id").order("created_at",{ascending:false});
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
      h+='<div class="post rip"><div class="pmain" style="cursor:pointer" onclick="openPost('+(100000+a.linked_post_id)+')">'+
        '<img src="'+esc(a.image_url)+'" alt="" style="width:100%;max-width:220px;height:56px;object-fit:cover;border-radius:8px;margin-bottom:6px;display:block">'+
        '<div class="ptitle">'+esc(nickById[a.user_id]||"알 수 없음")+' · '+(statusLabel[a.status]||a.status)+'</div>'+
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
  var res=await window.supabase.from("user_ads").select("id,user_id,image_url,linked_post_id,points_spent,duration_days,created_at").eq("status","pending").order("created_at",{ascending:true});
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
      h+='<div class="post rip"><div class="pmain" style="cursor:pointer" onclick="openPost('+(100000+a.linked_post_id)+')">'+
        '<img src="'+esc(a.image_url)+'" alt="" style="width:100%;max-width:220px;height:56px;object-fit:cover;border-radius:8px;margin-bottom:6px;display:block">'+
        '<div class="ptitle">'+esc(nickById[a.user_id]||"알 수 없음")+'</div>'+
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

