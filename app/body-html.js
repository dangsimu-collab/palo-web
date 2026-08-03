export const BODY_HTML = `

<header>
  <div class="wrap bar">
    <button class="menu-btn" id="menuBtn" aria-label="메뉴 열기"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>
    <div class="brand" onclick="goHome()">
      <span class="logo"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1-1.5-.5-.8 0-1.5 1-1.5h1a4 4 0 0 0 4-4c0-5-3-9-8-9z"/><circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="10.5" r="1" fill="currentColor" stroke="none"/></svg></span>
      <span class="mark">commi</span>
    </div>
    <div class="search desktop">
      <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="text" id="searchInput" placeholder="제목, 작성자, 내용 검색" autocomplete="off"><button class="s-clear" id="searchClear" aria-label="지우기" style="display:none"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    </div>
    <div class="h-actions">
      <button class="icon-btn msearch-ico-btn" aria-label="검색" onclick="openMSearch()"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg></button>
      <button class="icon-btn cm-header-my-btn" aria-label="내 커미션" onclick="cmOpenMy()"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/></svg></button>
      <button class="icon-btn" aria-label="랭킹" onclick="openLeaderboard()"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4a2 2 0 0 0 2 4M17 6h3a2 2 0 0 1-2 4"/></svg></button>
      <button class="icon-btn" aria-label="알림" onclick="toggleNotif(event)"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg><span class="hbadge" id="notiBadge">3</span></button>
      <button class="icon-btn" aria-label="내 프로필" onclick="openProfile()"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg></button>
      <button class="write-btn commission-btn" onclick="openCommissionList()"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12l3 3 5-5"/><path d="M3 10l5-5 4 3 4-3 5 5-6 8H9z"/></svg>커미션</button>
      <button class="write-btn" onclick="openWrite()"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L20 8l-4-4L4 16v4z"/><path d="M14 6l4 4"/></svg>글쓰기</button>
    </div>
  </div>
</header>

<div class="msearch" id="msearch">
  <span class="ms-ic"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg></span>
  <input type="text" id="msearchInput" placeholder="제목, 작성자, 내용 검색" autocomplete="off">
  <button class="ms-cancel" onclick="closeMSearch()">취소</button>
</div>

<div class="catbar" id="catbar">
  <div class="wrap"><div class="catbar-inner" id="chips"><button class="chip on" onclick="selectBoard('all')">전체 글</button><button class="chip" onclick="selectBoard('talk')">수다 광장</button><button class="chip" onclick="selectBoard('doodle')">낙서</button><button class="chip" onclick="selectBoard('wip')">작업물</button><button class="chip" onclick="selectBoard('sketch')">그림공부</button><button class="chip" onclick="selectBoard('ask')">질문/시세문의</button><button class="chip" onclick="selectBoard('vote')">투표/수요조사</button><button class="chip" onclick="selectBoard('crit')">피드백 요청</button><button class="chip" onclick="selectBoard('collab')">협업/팀원모집</button><button class="chip" onclick="selectBoard('challenge')">챌린지</button><button class="chip" onclick="selectBoard('tip')">자료/TIP</button><button class="chip" onclick="selectBoard('request')">리퀘스트</button><button class="chip" onclick="selectBoard('recruit')">커미션 구인</button><button class="chip" onclick="selectBoard('used')">중고 장비</button></div></div>
</div>
<div class="trendbar">
  <div class="wrap"><div class="trend-inner" id="trendStrip"><div class="trend-lead"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 7-7"></path><path d="M17 8h4v4"></path></svg>이번 주 인기</div><div class="trend-item"><span class="skel-thumb" style="width:30px;height:40px;border-radius:6px"></span><span class="trend-meta"><span class="skel-line t" style="width:110px"></span></span></div><div class="trend-item"><span class="skel-thumb" style="width:30px;height:40px;border-radius:6px"></span><span class="trend-meta"><span class="skel-line t" style="width:110px"></span></span></div><div class="trend-item"><span class="skel-thumb" style="width:30px;height:40px;border-radius:6px"></span><span class="trend-meta"><span class="skel-line t" style="width:110px"></span></span></div></div></div>
</div>

<div class="wrap grid">
  <aside class="side-l"><nav class="board-nav" id="boardNav"><div class="bn-group"><p class="bn-gl">이야기</p><div class="bn-a on" onclick="selectBoard('all')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M3 7l2-3h6l2 3"></path></svg>전체 글</div><div class="bn-a" onclick="selectBoard('talk')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"></path></svg>수다 광장<span class="cnt">5</span></div><div class="bn-a" onclick="selectBoard('ask')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7M12 17h.01"></path></svg>물어보기<span class="cnt">3</span></div></div><div class="bn-group"><p class="bn-gl">그리는 중</p><div class="bn-a" onclick="selectBoard('wip')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L18 10l-4-4L4 16v4z"></path><path d="M13 7l4 4"></path></svg>작업물<span class="cnt">2</span></div><div class="bn-a" onclick="selectBoard('crit')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>봐주세요<span class="cnt">3</span></div><div class="bn-a" onclick="selectBoard('sketch')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6C10 4 6 4 3 5v14c3-1 7-1 9 1 2-2 6-2 9-1V5c-3-1-7-1-9 1z"></path><path d="M12 6v14"></path></svg>스케치북<span class="cnt">1</span></div></div><div class="bn-group"><p class="bn-gl">함께</p><div class="bn-a" onclick="selectBoard('challenge')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18"></path><path d="M5 4h13l-2 4 2 4H5"></path></svg>챌린지<span class="cnt">1</span></div><div class="bn-a" onclick="selectBoard('tip')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4 2 9l10 5 10-5-10-5z"></path><path d="M6 11v5c0 1 3 2 6 2s6-1 6-2v-5"></path></svg>팁 · 강좌<span class="cnt">4</span></div></div><div class="bn-group trade"><p class="bn-gl">거래</p><div class="bn-a" onclick="selectBoard('trade')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12l3 3 5-5"></path><path d="M3 10l5-5 4 3 4-3 5 5-6 8H9z"></path></svg>커미션 구인구직<span class="cnt">1</span></div><div class="bn-a" onclick="selectBoard('used')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l8-8h6a2 2 0 0 1 2 2v6l-8 8z"></path><circle cx="15" cy="9" r="1.4" fill="currentColor" stroke="none"></circle></svg>중고 장비</div></div></nav></aside>
  <main id="main"><div class="board-head"><h1 class="serif">전체 글</h1><span class="sub">방금 올라온 이야기부터</span><div class="sortbar"><button class="on" onclick="setSort('new')">최신</button><button class="" onclick="setSort('hot')">인기</button></div></div><div class="list"><div class="skel-row"><div class="skel-main"><div class="skel-line t"></div><div class="skel-line m"></div></div><div class="skel-thumb"></div></div><div class="skel-row"><div class="skel-main"><div class="skel-line t"></div><div class="skel-line m"></div></div><div class="skel-thumb"></div></div><div class="skel-row"><div class="skel-main"><div class="skel-line t"></div><div class="skel-line m"></div></div><div class="skel-thumb"></div></div><div class="skel-row"><div class="skel-main"><div class="skel-line t"></div><div class="skel-line m"></div></div><div class="skel-thumb"></div></div><div class="skel-row"><div class="skel-main"><div class="skel-line t"></div><div class="skel-line m"></div></div><div class="skel-thumb"></div></div></div></main>
  <aside class="side-r">
    <div class="widget join">
      <h4>같이 그리실래요?</h4>
      <p>스케치북을 열고, 남의 러프에 피드백 남기고, 오늘 그린 한 장을 공유해요.</p>
      <button onclick="openWrite()">commi 시작하기</button>
    </div>
    <div class="widget">
      <div class="w-title"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18"/><path d="M5 4h13l-2 4 2 4H5"/></svg>이번 주 챌린지</div>
      <div class="chal">
        <div class="k">7월 넷째 주</div>
        <h5 class="serif">"비 오는 창가"</h5>
        <div class="d"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3 2 6M19 3l3 3"/></svg>마감 2일 · 38명 참여 중</div>
        <button class="chal-cta" onclick="selectBoard('challenge')">챌린지 보기</button>
      </div>
    </div>
    <div class="widget">
      <div class="w-title"><svg class="ic" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 1-3s0 2 2 2 1-4 2-8z"/></svg>지금 뜨거운 이야기</div>
      <div id="hotList"><div class="hot" onclick="openPost(7)"><span class="rank serif">1</span><div><div class="ht">AI 그림, 우리 커뮤니티에선 어디까지 허용할지 의견 모아요</div><div class="hm">💬 3 · 수다</div></div></div><div class="hot" onclick="openPost(2)"><span class="rank serif">2</span><div><div class="ht">몇 년째 실력이 제자리인 것 같을 때 다들 어떻게 뚫으셨어요?</div><div class="hm">💬 2 · 고민</div></div></div><div class="hot" onclick="openPost(4)"><span class="rank serif">3</span><div><div class="ht">클립스튜디오 손 그림자 3초 만에 넣는 루틴 공유합니다</div><div class="hm">💬 1 · 팁</div></div></div></div>
    </div>
  
    <div class="widget ad-widget" role="complementary" aria-label="광고">
      <span class="ad-label">AD</span>
      <div class="ad-ph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" style="width:26px;height:26px"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m4 18 5-5 4 3 3-2 4 4"/></svg></div>
      <div class="ad-t">열심히 활동해서 포인트를 모아보세요!</div>
      <div class="ad-d">포인트를 사용하여 이 자리에 광고를 집행할 수 있어요!</div>
    </div>
  </aside>
</div>

<footer><div class="wrap">commi · 그림 그리는 사람들의 커뮤니티 · 잘 그린 그림보다 그리는 이야기가 먼저인 곳<div class="foot-biz">상호 디자인마켓 · 대표 전승우 · 사업자등록번호 685-14-02733 · 통신판매업 신고 2025-강원원주-00895<br>주소 강원특별자치도 원주시 무실동 2025 (제일풍경채원주무실) 103동 3201호 · 문의 yssj1202@gmail.com</div><div class="foot-links"><a href="/terms">이용약관</a> · <a href="/privacy">개인정보 처리방침</a></div></div></footer>

<!-- drawer -->
<div class="scrim" id="scrim"></div>
<nav class="drawer" id="drawer" aria-label="게시판 메뉴">
  <div class="dh"><span class="brand"><span class="logo"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1-1.5-.5-.8 0-1.5 1-1.5h1a4 4 0 0 0 4-4c0-5-3-9-8-9z"/><circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="10.5" r="1" fill="currentColor" stroke="none"/></svg></span><span class="mark">commi</span></span>
    <button class="dclose" id="drawerClose" aria-label="닫기"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
  <div class="search" style="max-width:none;margin:0 0 16px">
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
    <input type="text" id="searchInputM" placeholder="검색 후 Enter">
  </div>
  <nav class="board-nav" id="boardNavM" style="border:none;box-shadow:none"><div class="bn-group"><p class="bn-gl">이야기</p><div class="bn-a on" onclick="selectBoard('all')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M3 7l2-3h6l2 3"></path></svg>전체 글</div><div class="bn-a" onclick="selectBoard('talk')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"></path></svg>수다 광장<span class="cnt">5</span></div><div class="bn-a" onclick="selectBoard('ask')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7M12 17h.01"></path></svg>물어보기<span class="cnt">3</span></div></div><div class="bn-group"><p class="bn-gl">그리는 중</p><div class="bn-a" onclick="selectBoard('wip')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L18 10l-4-4L4 16v4z"></path><path d="M13 7l4 4"></path></svg>작업물<span class="cnt">2</span></div><div class="bn-a" onclick="selectBoard('crit')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>봐주세요<span class="cnt">3</span></div><div class="bn-a" onclick="selectBoard('sketch')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6C10 4 6 4 3 5v14c3-1 7-1 9 1 2-2 6-2 9-1V5c-3-1-7-1-9 1z"></path><path d="M12 6v14"></path></svg>스케치북<span class="cnt">1</span></div></div><div class="bn-group"><p class="bn-gl">함께</p><div class="bn-a" onclick="selectBoard('challenge')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18"></path><path d="M5 4h13l-2 4 2 4H5"></path></svg>챌린지<span class="cnt">1</span></div><div class="bn-a" onclick="selectBoard('tip')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4 2 9l10 5 10-5-10-5z"></path><path d="M6 11v5c0 1 3 2 6 2s6-1 6-2v-5"></path></svg>팁 · 강좌<span class="cnt">4</span></div></div><div class="bn-group trade"><p class="bn-gl">거래</p><div class="bn-a" onclick="selectBoard('trade')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12l3 3 5-5"></path><path d="M3 10l5-5 4 3 4-3 5 5-6 8H9z"></path></svg>커미션 구인구직<span class="cnt">1</span></div><div class="bn-a" onclick="selectBoard('used')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l8-8h6a2 2 0 0 1 2 2v6l-8 8z"></path><circle cx="15" cy="9" r="1.4" fill="currentColor" stroke="none"></circle></svg>중고 장비</div></div></nav>
</nav>

<!-- board sheet (게시판 탭) -->
<div class="sheet-scrim" id="sheetScrim"></div>
<div class="sheet" id="sheet" aria-label="게시판 선택">
  <div class="grip"></div>
  <div class="sh-title">게시판 이동</div>
  <nav class="board-nav" id="boardNavS" style="border:none;box-shadow:none"><div class="bn-group"><p class="bn-gl">이야기</p><div class="bn-a on" onclick="selectBoard('all')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M3 7l2-3h6l2 3"></path></svg>전체 글</div><div class="bn-a" onclick="selectBoard('talk')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"></path></svg>수다 광장<span class="cnt">5</span></div><div class="bn-a" onclick="selectBoard('ask')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7M12 17h.01"></path></svg>물어보기<span class="cnt">3</span></div></div><div class="bn-group"><p class="bn-gl">그리는 중</p><div class="bn-a" onclick="selectBoard('wip')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L18 10l-4-4L4 16v4z"></path><path d="M13 7l4 4"></path></svg>작업물<span class="cnt">2</span></div><div class="bn-a" onclick="selectBoard('crit')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>봐주세요<span class="cnt">3</span></div><div class="bn-a" onclick="selectBoard('sketch')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6C10 4 6 4 3 5v14c3-1 7-1 9 1 2-2 6-2 9-1V5c-3-1-7-1-9 1z"></path><path d="M12 6v14"></path></svg>스케치북<span class="cnt">1</span></div></div><div class="bn-group"><p class="bn-gl">함께</p><div class="bn-a" onclick="selectBoard('challenge')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18"></path><path d="M5 4h13l-2 4 2 4H5"></path></svg>챌린지<span class="cnt">1</span></div><div class="bn-a" onclick="selectBoard('tip')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4 2 9l10 5 10-5-10-5z"></path><path d="M6 11v5c0 1 3 2 6 2s6-1 6-2v-5"></path></svg>팁 · 강좌<span class="cnt">4</span></div></div><div class="bn-group trade"><p class="bn-gl">거래</p><div class="bn-a" onclick="selectBoard('trade')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12l3 3 5-5"></path><path d="M3 10l5-5 4 3 4-3 5 5-6 8H9z"></path></svg>커미션 구인구직<span class="cnt">1</span></div><div class="bn-a" onclick="selectBoard('used')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l8-8h6a2 2 0 0 1 2 2v6l-8 8z"></path><circle cx="15" cy="9" r="1.4" fill="currentColor" stroke="none"></circle></svg>중고 장비</div></div></nav>
</div>

<!-- bottom tabs -->
<nav class="tabbar" aria-label="빠른 이동">
  <div class="tabbar-inner">
    <button class="tab on" data-tab="home" onclick="goHome()"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>홈</button>
    <button class="tab" data-tab="commission" onclick="openCommissionList()"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12l3 3 5-5"/><path d="M3 10l5-5 4 3 4-3 5 5-6 8H9z"/></svg>커미션</button>
    <button class="tab write" onclick="openWrite()"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L20 8l-4-4L4 16v4z"/><path d="M14 6l4 4"/></svg><span class="lbl">글쓰기</span></button>
    <button class="tab" data-tab="chat" onclick="openChatList()"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8 8.38 8.38 0 0 1 8.5-8.5 8.5 8.5 0 0 1 8.5 8.5z"/></svg>채팅</button>
    <button class="tab" data-tab="me" onclick="openProfile()"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>내 정보</button>
  </div>
</nav>

<!-- 1:1 채팅방 (전체화면 오버레이, body 최상위라 fixed가 iOS에서도 정상 동작) -->
<div id="chatRoom" class="chatroom" aria-label="채팅방"></div>

<!-- write editor (full screen, cafe-style) -->
<div class="editor" id="writeModal" aria-label="글쓰기">
  <div class="ed-top">
    <div class="wrap ed-top-in">
      <button class="ed-cancel" onclick="closeWrite()"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg><span>나가기</span></button>
      <span class="ed-title" id="edTitleLabel">글쓰기</span>
      <button class="ed-submit" id="edSubmitBtn" onclick="submitPost()">등록</button>
    </div>
  </div>

  <div class="ed-scroll">
    <div class="wrap ed-body">
      <!-- 게시판 + 말머리 -->
      <div class="ed-metarow">
        <button class="ed-boardpick" id="edBoardPick" onclick="toggleBoardMenu(event)">
          <span id="edBoardLabel">게시판 선택</span><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="ed-boardmenu" id="edBoardMenu"></div>
      </div>
      <div class="ed-tags" id="edTags"></div>
      <div class="ed-lock-notice" id="edLockNotice" style="display:none"></div>
      <div class="ed-accept-notice" id="edAcceptNotice" style="display:none"></div>

      <!-- 제목 -->
      <input type="text" id="wTitle" class="ed-title-input" placeholder="제목을 입력해 주세요">
      <input type="text" id="edReviewNickInput" class="ed-title-input" placeholder="커미션 제작자 닉네임으로 구직 글 검색" oninput="searchCommissionPosts()" style="display:none;margin-top:8px;font-size:14px">
      <div class="ed-commission-list" id="edCommissionList" style="display:none"></div>
      <div class="ed-commission-selected" id="edCommissionSelected" style="display:none"></div>
      <div class="ed-rating-row" id="edRatingRow" style="display:none">
        <span class="ed-rating-label">이 커미션, 어떠셨나요?</span>
        <span class="ed-sentiment" id="edSentimentBtns">
          <button type="button" class="ed-sentiment-btn good" onclick="setEdSentiment('good')">😊 만족 후기</button>
          <button type="button" class="ed-sentiment-btn bad" onclick="setEdSentiment('bad')">😞 불호 후기</button>
        </span>
      </div>

      <!-- 서식 툴바 (제목 아래·본문 위, 스크롤해도 상단 고정) -->
      <div class="ed-toolbar" id="edToolbar">
        <button title="굵게" onmousedown="fmt(event,'bold')"><span class="ei" style="font-weight:900">B</span><span class="ed-tool-lbl">굵게</span></button>
        <button title="기울임" onmousedown="fmt(event,'italic')"><span class="ei" style="font-style:italic;font-family:serif">I</span><span class="ed-tool-lbl">기울임</span></button>
        <button title="밑줄" onmousedown="fmt(event,'underline')"><span class="ei" style="text-decoration:underline">U</span><span class="ed-tool-lbl">밑줄</span></button>
        <span class="ed-div"></span>
        <button title="글자색" onmousedown="fmt(event,'foreColor','#bf400c')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1-1.5-.5-.8 0-1.5 1-1.5h1a4 4 0 0 0 4-4c0-5-3-9-8-9z"/><circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="10.5" r="1" fill="currentColor" stroke="none"/></svg><span class="ed-tool-lbl">글자색</span></button>
        <button title="형광펜" onmousedown="fmt(event,'hiliteColor','#fbe9c8')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4l10-10-4-4L4 16v4z"/><path d="M13 7l4 4"/></svg><span class="ed-tool-lbl">형광펜</span></button>
        <span class="ed-div"></span>
        <button title="목록" onmousedown="fmt(event,'insertUnorderedList')"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg><span class="ed-tool-lbl">목록</span></button>
        <button title="인용" onmousedown="insertQuote(event)"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h4v6H7c0-3 0-4 2-6M15 7h4v6h-4c0-3 0-4 2-6"/></svg><span class="ed-tool-lbl">인용</span></button>
        <span class="ed-div"></span>
        <button title="이미지" onmousedown="pickImage(event)"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m4 18 5-5 4 3 3-2 4 4"/></svg><span class="ed-tool-lbl">이미지</span></button>
      </div>

      <!-- 본문 (contenteditable) -->
      <p class="ed-content-hint" id="edContentHint" style="display:none">한 줄 후기도 좋아요 — 내용 없이 별점만 남겨도 괜찮아요.</p>
      <div id="wContent" class="ed-content" contenteditable="true"
        ondragover="onEditorDragOver(event)" ondragleave="onEditorDragLeave(event)" ondrop="onEditorDrop(event)"
        data-ph="이야기를 자유롭게 적어 주세요. 커서를 원하는 위치에 두고 위 🖼 버튼으로 그림을 그 자리에 넣을 수 있어요. 이미지 파일을 끌어다 놓아도 돼요."></div>
      <input type="file" id="edFile" accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" class="hidden" onchange="onImage(event)">
      <div id="edImages" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"></div>

      <!-- 투표 첨부 -->
      <div id="edPollBox" class="ed-poll-box" style="display:none"></div>
      <button type="button" id="edPollAddBtn" class="ed-poll-addbtn" onclick="edPollAdd()">📊 투표 추가</button>

      <!-- 옵션 -->
      <div class="ed-options">
        <label class="ed-opt"><input type="checkbox" id="edCrit"><span>크리틱(피드백) 받고 싶어요</span></label>
        <label class="ed-opt"><input type="checkbox" id="edNotify" checked><span>댓글 알림 받기</span></label>
      </div>
      <p class="ed-guide"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg> 인신공격·도용·AI 무단 도배는 삭제될 수 있어요. 서로의 그림을 존중해 주세요.</p>
    </div>
  </div>

</div>


<div class="notif-panel" id="notifPanel" aria-label="알림함">
  <div class="np-head">알림<button onclick="markAllRead()">모두 읽음</button></div>
  <div id="npList"></div>
</div>
<div class="rules-scrim" id="rulesModal" onclick="if(event.target===this)closeRules()">
  <div class="rules">
    <h3>📌 이용 규칙 &amp; 피드백 매너 (처음 오셨다면 꼭!)</h3>
    <ol>
      <li><b>사람보다 그림을 이야기해요.</b> 인신공격·조롱은 즉시 삭제됩니다.</li>
      <li><b>피드백은 구체적으로.</b> "별로예요" 대신 어디를 어떻게 바꾸면 좋을지 적어주세요.</li>
      <li><b>도용 금지.</b> 남의 그림을 내 것처럼 올리거나, 무단으로 AI 학습에 쓰면 제재됩니다.</li>
      <li><b>AI 생성물 금지.</b> commi는 사람의 창작을 위한 공간이에요. AI로 생성한 이미지는 올릴 수 없어요.</li>
      <li><b>거래는 커미션 게시판에서.</b> commi는 거래를 중개하지 않아요. 거래·환불은 당사자끼리 직접 진행하며, 트러블은 스스로 조심해주세요.</li>
      <li><b>질문·투표·피드백 글은 댓글이 달리면 수정·삭제가 제한돼요.</b> 신중하게 작성해주세요.</li>
      <li>처음이라면 <b>수다 광장에 인사 글 하나!</b> 환영합니다 🎨</li>
    </ol>
    <button class="r-ok" onclick="closeRules()">확인했어요</button>
  </div>
</div>

<div class="rules-scrim" id="noticeModal" onclick="if(event.target===this)closeNotice()">
  <div class="rules">
    <h3 id="noticeModalTitle">📢 공지</h3>
    <p id="noticeModalBody" style="white-space:pre-wrap;line-height:1.7;color:var(--ink-2);margin-bottom:16px"></p>
    <button class="r-ok" onclick="closeNotice()">확인했어요</button>
  </div>
</div>

<div class="rules-scrim" id="confirmModal" onclick="if(event.target===this)document.getElementById('confirmModalCancelBtn').click()">
  <div class="rules">
    <h3>⚠️ 확인해주세요</h3>
    <p id="confirmModalBody" style="color:var(--ink-2);line-height:1.6;margin-bottom:20px"></p>
    <div style="display:flex;gap:10px">
      <button id="confirmModalCancelBtn" class="r-ok" style="background:var(--surface-2);color:var(--ink)">취소</button>
      <button id="confirmModalOkBtn" class="r-ok" style="background:linear-gradient(120deg,#e0607a,#c0392b)">확인</button>
    </div>
  </div>
</div>

<div class="rules-scrim" id="followListModal" onclick="if(event.target===this)closeFollowList()">
  <div class="follow-modal">
    <div class="follow-modal-head"><b id="followModalTitle">팔로잉</b><button class="follow-modal-close" onclick="closeFollowList()" aria-label="닫기">✕</button></div>
    <div class="follow-modal-list" id="followModalList"></div>
  </div>
</div>

<div class="rules-scrim" id="adminDelModal" onclick="if(event.target===this)closeAdminDel()">
  <div class="rules">
    <h3>🗑️ 관리자 삭제</h3>
    <p style="font-size:13px;color:var(--ink-2);line-height:1.6;margin-bottom:12px">삭제 사유는 선택이에요(입력하면 작성자 알림에 함께 표시). 자주 쓰는 사유를 눌러 채운 뒤 수정할 수 있어요.</p>
    <div class="admin-del-chips">
      <button type="button" class="admin-del-chip" onclick="adminDelPick('규칙 위반')">규칙 위반</button>
      <button type="button" class="admin-del-chip" onclick="adminDelPick('스팸·도배')">스팸·도배</button>
      <button type="button" class="admin-del-chip" onclick="adminDelPick('욕설·비방')">욕설·비방</button>
      <button type="button" class="admin-del-chip" onclick="adminDelPick('선정적·부적절한 내용')">선정적·부적절</button>
      <button type="button" class="admin-del-chip" onclick="adminDelPick('저작권 침해')">저작권 침해</button>
    </div>
    <textarea id="adminDelReason" class="nick-in" style="height:84px;resize:vertical" placeholder="삭제 사유 (선택 · 예: 규칙 위반, 스팸)"></textarea>
    <label class="admin-del-silent"><input type="checkbox" id="adminDelSilent"> 작성자에게 삭제 알림을 보내지 않음</label>
    <div style="display:flex;gap:10px;margin-top:14px">
      <button id="adminDelCancelBtn" class="r-ok" style="background:var(--surface-2);color:var(--ink)" onclick="closeAdminDel()">취소</button>
      <button id="adminDelOkBtn" class="r-ok" style="background:linear-gradient(120deg,#e0607a,#c0392b)">삭제하기</button>
    </div>
  </div>
</div>

<div class="rules-scrim" id="reportModal" onclick="if(event.target===this)closeReport()">
  <div class="rules">
    <h3>🚩 신고하기</h3>
    <textarea id="reportReasonInput" class="nick-in" style="height:90px;resize:vertical" placeholder="신고 사유를 알려주세요 (선택사항)"></textarea>
    <p class="nick-hint">신고 내용은 운영진만 확인할 수 있어요.</p>
    <button class="r-ok" onclick="submitReport()">신고 접수</button>
  </div>
</div>

<div class="rules-scrim" id="adNoticeModal" onclick="if(event.target===this)closeAdNoticeModal()">
  <div class="rules">
    <h3>📢 광고 집행 전 꼭 확인해주세요</h3>
    <p style="font-size:13.5px;line-height:1.7;color:var(--ink-2);margin-bottom:14px">commi의 유저 광고는 회원님이 활동으로 모은 광고 포인트로 배너를 노출하는 기능이에요!<br>집행 전에 아래 내용을 확인해주세요.</p>
    <ul class="ad-notice-list">
      <li><b>이미지 배너만 가능해요</b><br>직접 만든 배너 이미지 한 장을 올리고 내 글을 홍보할 수 있어요!</li>
      <li><b>포인트는 집행과 동시에 차감돼요</b><br>노출 기간·횟수에 따라 광고 포인트가 사용되며, 한 번 집행하면 환불되지 않아요. 포인트와 노출 설정을 다시 확인해주세요.</li>
      <li><b>연결된 게시글·커미션이 삭제되면 광고도 함께 내려가요</b><br>링크한 게시글이나 커미션을 지우면 광고가 자동으로 중단돼요. 남은 포인트는 돌려드리지 않으니 주의해주세요.</li>
      <li><b>이런 광고는 제한돼요</b>
        <ul>
          <li>타인 비방·분쟁 유발, 특정 유저·채널 저격</li>
          <li>선정적이거나 부적절한 이미지</li>
          <li>그림·창작과 무관한 상업 광고, 도배성 홍보</li>
          <li>저작권을 침해한 이미지</li>
        </ul>
      </li>
      <li><b>관리자 심사가 있어요</b><br>집행된 광고는 관리자가 검토하며 위 기준에 어긋나면 사전 통보 없이 삭제되고 포인트가 환수될 수 있어요. 신고가 접수된 광고도 검토 대상이에요. 또한 광고 집행을 시작했다면 광고 대상(게시글·커미션)은 수정이 불가능해요.</li>
    </ul>
    <p style="font-size:13.5px;line-height:1.7;color:var(--ink-2);margin:14px 0 18px">위 내용에 동의하시면 광고를 집행할 수 있어요.<br>즐겁고 건강한 홍보 문화를 함께 만들어가요! 🎨</p>
    <button class="r-ok" onclick="agreeAdNotice()">동의하고 계속하기</button>
  </div>
</div>

<div class="rules-scrim" id="adModal" onclick="if(event.target===this)closeAdModal()">
  <div class="rules">
    <h3 id="adModalTitle">📢 이 글 광고하기</h3>
    <div id="adBannerPreview" style="margin-bottom:10px"></div>
    <input type="file" id="adBannerFile" accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" class="hidden" onchange="onAdBannerFile(event)">
    <button class="pf-edit" onclick="document.getElementById('adBannerFile').click()" style="width:100%;margin-bottom:6px;justify-content:center">배너 이미지 선택</button>
    <p class="nick-hint">권장 크기: 가로 800 × 세로 200px (4:1 비율). 이보다 정사각형이거나 세로로 긴 이미지는 위아래가 잘려서 보일 수 있어요.</p>
    <input type="number" id="adRateInput" class="nick-in" min="1" step="1" placeholder="1일당 사용할 포인트" oninput="updateAdPreview()" style="margin-bottom:8px">
    <input type="number" id="adDaysInput" class="nick-in" min="1" step="1" placeholder="노출할 날짜 (일수)" oninput="updateAdPreview()">
    <p class="nick-hint" id="adPreviewText">1일당 포인트와 노출 일수를 입력하면 총 포인트가 계산돼요.</p>
    <button class="r-ok" onclick="submitAd()">광고 등록</button>
  </div>
</div>

<div class="rules-scrim" id="adRejectModal" onclick="if(event.target===this)closeAdRejectModal()">
  <div class="rules">
    <h3>🚫 광고 반려</h3>
    <label class="pf-toggle" style="margin-bottom:4px"><span>유저에게 포인트 돌려주기</span><input type="checkbox" id="adRejectRefundInput" checked></label>
    <p class="nick-hint" style="margin-bottom:10px">체크하면 유저가 썼던 포인트를 돌려받아요. 체크를 풀면 포인트를 돌려받지 못해요(악의적인 광고 등에 사용).</p>
    <textarea id="adRejectReasonInput" class="nick-in" style="height:90px;resize:vertical" placeholder="반려 사유를 알려주세요 (선택사항)"></textarea>
    <p class="nick-hint">작성한 사유는 신청자에게 알림으로 전달돼요.</p>
    <button class="r-ok" onclick="submitAdReject()">반려 확정</button>
  </div>
</div>

<div class="rules-scrim" id="nickModal" onclick="if(event.target===this)closeNick()">
  <div class="rules">
    <h3>✏️ 닉네임 변경</h3>
    <input id="nickInput" class="nick-in" maxlength="12" placeholder="새 닉네임 (2~12자)">
    <p class="nick-hint">커뮤니티 어디서나 이 이름으로 표시돼요.</p>
    <button class="r-ok" onclick="saveNick()">저장</button>
  </div>
</div>
<div class="rules-scrim" id="withdrawModal" onclick="if(event.target===this)closeWithdraw()">
  <div class="rules">
    <h3>⚠️ 회원 탈퇴</h3>
    <p class="wd-desc">탈퇴하면 아래 내용이 <b>즉시·영구적으로</b> 처리되며 <b>되돌릴 수 없어요.</b></p>
    <ul class="wd-list">
      <li>프로필·닉네임·소개 등 <b>개인정보가 삭제</b>돼요</li>
      <li>내 커미션·채팅·팔로우·투표·알림·좋아요가 <b>삭제</b>돼요</li>
      <li>보유한 포인트·등급·광고포인트가 <b>사라져요</b></li>
      <li>내가 쓴 글·댓글은 내용은 남고 <b>작성자만 "익명"</b>으로 바뀌어요</li>
    </ul>
    <p class="nick-hint">확인을 위해 아래 칸에 <b>회원탈퇴</b> 를 입력해주세요.</p>
    <input id="withdrawConfirm" class="nick-in" placeholder="회원탈퇴" oninput="withdrawCheck()" autocomplete="off">
    <div class="wd-actions">
      <button class="wd-cancel" onclick="closeWithdraw()">취소</button>
      <button class="wd-go" id="withdrawGoBtn" onclick="doWithdraw()" disabled>탈퇴하기</button>
    </div>
  </div>
</div>
<div class="rules-scrim" id="consentModal">
  <div class="rules">
    <h3>commi 시작하기</h3>
    <p class="consent-desc">commi 이용을 위해 아래 약관에 동의해주세요.</p>
    <label class="consent-all"><input type="checkbox" id="consentAll" onchange="consentToggleAll(this.checked)"><span>전체 동의</span></label>
    <label class="consent-row"><input type="checkbox" id="consentTerms" onchange="consentCheck()"><span>[필수] <a href="/terms" target="_blank" rel="noopener">이용약관</a>에 동의합니다</span></label>
    <label class="consent-row"><input type="checkbox" id="consentPrivacy" onchange="consentCheck()"><span>[필수] <a href="/privacy" target="_blank" rel="noopener">개인정보 처리방침</a>에 동의합니다</span></label>
    <button class="r-ok" id="consentOkBtn" onclick="submitConsent()" disabled>동의하고 시작하기</button>
    <button class="consent-decline" onclick="declineConsent()">동의하지 않고 로그아웃</button>
  </div>
</div>
<div class="rules-scrim" id="loginModal" onclick="if(event.target===this)closeLoginModal()">
  <div class="rules login-modal">
    <h3>commi 시작하기</h3>
    <p class="login-desc">구글 계정으로 간편하게 시작해요.</p>
    <div id="gsiButton" class="gsi-wrap"></div>
    <p class="login-hint" id="loginHint"></p>
    <button class="login-alt" onclick="_loginRedirectFallback()">로그인이 안 되나요? 다른 방법으로 로그인</button>
  </div>
</div>
<div class="rules-scrim" id="pfEditModal" onclick="if(event.target===this)closePfEdit()">
  <div class="rules">
    <h3>✏️ 소개글 · 링크 편집</h3>
    <textarea id="pfBioInput" class="nick-in" style="height:90px;resize:vertical" maxlength="150" placeholder="자기소개를 적어보세요 (최대 150자)"></textarea>
    <input id="pfTwitterInput" class="nick-in" placeholder="트위터(X) 아이디 또는 링크">
    <input id="pfInstaInput" class="nick-in" placeholder="인스타그램 아이디 또는 링크">
    <input id="pfEmailInput" class="nick-in" placeholder="이메일 주소">
    <p class="nick-hint">비워두면 프로필에 안 보여요.</p>
    <button class="r-ok" onclick="savePfEdit()">저장</button>
  </div>
</div>
<input type="file" id="avatarFile" accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" class="hidden" onchange="onAvatarFile(event)">
<input type="file" id="coverFile" accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" class="hidden" onchange="onCoverFile(event)">
<div class="toast" id="toast"></div>
<button class="toTop" id="toTop" aria-label="맨 위로"><span class="sr-only">맨 위로</span><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button>


`;
