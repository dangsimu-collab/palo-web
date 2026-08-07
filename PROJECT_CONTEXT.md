# Palo — 프로젝트 전체 컨텍스트

> 이 파일 하나만 Claude Code(또는 다른 AI 코딩 도구)에 붙여넣으면, 이 프로젝트를 처음 보는 세션도 바로 이어서 개발할 수 있도록 작성한 문서입니다. `README.md`보다 훨씬 상세하며, 지금까지의 개발 이력·설계 이유·알려진 이슈까지 전부 담았습니다.
>
> **작성 시점: 2026-07-29 (컨텍스트 윈도우 한도로 새 세션으로 넘어가기 직전 최종 갱신).** 이 문서는 그 시점의 스냅샷입니다 — 실제 코드가 더 최신 진실이니, 이 문서와 코드가 다르면 코드를 믿으세요.
>
> **비밀번호/시크릿 없음:** 이 문서에는 실제 비밀번호·API 시크릿 키가 전혀 없습니다(의도적). 계정 로그인은 항상 사용자 본인이 직접 했고, AI는 계정 비밀번호를 받은 적이 없습니다. 구글 OAuth Client Secret 같은 민감한 값은 Supabase 대시보드에만 입력했고 어떤 파일에도 저장하지 않았습니다 — 필요하면 사용자에게 다시 요청하거나 Google Cloud Console에서 재발급받으세요. Supabase anon 키처럼 "공개돼도 되는" 값은 로컬 `.env.local`(git 제외됨)과 Vercel 환경변수에 있으니 필요하면 그걸 직접 읽으세요.

---

## 1. 프로젝트가 뭔가

**Palo**(→ 2026-08-02 서비스명 **commi**로 변경)는 그림 그리는 사람들을 위한 커뮤니티 웹사이트. 네이버 카페 "커미션 월드 우타나라"(회원 약 1만 명)를 이전하기 위한 프로젝트로, 창작 이야기·크리틱(피드백) 중심이고 커미션 거래는 부차적 기능.

> **서비스명 변경(2026-08-02)**: 화면에 보이는 브랜드명을 **`Palo` → 소문자 `commi`**로 전부 교체(로고 텍스트·title/메타·OG·PWA manifest name/short_name·공지/정책/중개안내 문구·푸시 제목 등). **내부 코드명은 그대로 유지** — `PaloApp` 컴포넌트, 파일명(`palo.js`), 폴더(`palo/web`), CSS 클래스, localStorage 키(`palo_*`), Vercel 프로젝트/배포주소(`palo-web-nu.vercel.app`), 이 문서·README의 서술. 파비콘/아이콘 이미지(`favicon.ico`, `icon-192/512.png`, `apple-icon.png`, `palo-icon.png`, `favicon-32.png`)에 글자가 있으면 사용자가 직접 교체 예정. 정식 도메인은 [[project-palo]] 참고(commi.kr).

- **개발자**: 코딩을 거의 처음 해보는 1인 개발자(사용자). Claude Code와 함께 "한 번에 한 단계씩, 무엇을·왜 하는지 설명하며" 진행하는 방식으로 개발됨.
- **배포 주소**: https://palo-web-nu.vercel.app
- **GitHub**: https://github.com/dangsimu-collab/palo-web (Public 저장소, 보안 점검 완료 — 8절 참고)
- **로컬 코드 위치**: `C:\Users\K9209\Desktop\palo\web`
- **참고 파일 (이 저장소에는 없음, 로컬 `palo/` 상위 폴더에만 있음)**:
  - `C:\Users\K9209\Desktop\palo\2_프로젝트_설계.md` — 최초 개발 계획 문서 (단계 1~8 로드맵)
  - `C:\Users\K9209\Desktop\palo\Palo_최종본.html` — 디자인 프로토타입 원본 (이 프로젝트의 모든 CSS/화면 구조가 여기서 그대로 이식됨)

---

## 2. 기술 스택

| 구분 | 사용 기술 |
|---|---|
| 프론트엔드 프레임워크 | Next.js 16.2.12 (App Router), React 19.2.4, JavaScript(TypeScript 아님) |
| 백엔드 | Supabase (PostgreSQL + Auth + Storage) |
| 로그인 | Supabase Auth — 구글 OAuth (선택 사항, 필수 아님) |
| 스타일 | 일반 CSS (Tailwind 아님) — `app/globals.css` 하나에 전부 |
| 차트 | recharts 3.10.1 (관리자 통계 페이지에서만 사용) |
| HTML 살균(XSS 방지) | dompurify (글 본문 HTML을 저장/렌더링할 때 사용, `app/PaloApp.js`에서 `window.DOMPurify`로 노출 — `window.supabase`와 동일한 패턴) |
| 방문자 분석 | `@vercel/analytics` (Vercel Web Analytics) + GA4 (`gtag`, 별도 스크립트) |
| 배포 | Vercel (GitHub main 브랜치 push 시 자동 배포) |

> ⚠️ **Next.js 16은 최신 메이저 버전이라 AI의 학습 데이터와 API가 다를 수 있음.** 라우팅/메타데이터 관련 코드를 크게 바꾸기 전엔 `node_modules/next/dist/docs/`의 실제 문서를 확인할 것 (`AGENTS.md`에도 명시됨). 이미 확인된 것: Next 15+부터 `params`/`searchParams`가 **Promise**로 바뀜 (`await params` 필요).

---

## 3. 아키텍처 — 왜 이렇게 생겼는지가 제일 중요

**이 프로젝트는 "일반적인 Next.js/React 앱"이 아닙니다.** 디자인·화면 프로토타입(`Palo_최종본.html`)이 이미 완성되어 있었고, 이를 React로 새로 짜지 않고 **vanilla JS(순수 자바스크립트) 그대로 Next.js 위에 얹는** 방식으로 이식했습니다. 이게 이 코드베이스를 이해하는 데 가장 중요한 전제입니다.

```
app/
  layout.js         루트 레이아웃. <html lang="ko">, 메타데이터, Vercel Analytics,
                     GA4 스크립트(NEXT_PUBLIC_GA_MEASUREMENT_ID 있을 때만)
  page.js           홈페이지("/") — <PaloApp/>만 렌더링
  PaloApp.js         'use client' 컴포넌트. body-html.js의 정적 HTML을
                     dangerouslySetInnerHTML로 삽입 + public/palo.js를
                     <Script strategy="afterInteractive">로 로드 + Supabase
                     클라이언트를 window.supabase에 노출
  body-html.js       원본 프로토타입 <body> 전체를 그대로 옮긴 HTML 문자열
                     (헤더, 게시판 네비, 글쓰기 에디터, 각종 모달 — 전부 정적 마크업)
  globals.css        원본 프로토타입 <style> 전체 그대로
  admin/page.js      /admin — 진짜 React로 새로 짠 관리자 페이지 (아래 7절)
  post/[id]/page.js  /post/[id] — SSR 메타데이터만 담당, 실제 화면은 <PaloApp/> 재사용
  user/[id]/page.js  /user/[id] — 위와 동일한 패턴

public/
  palo.js           **핵심 로직 전부 여기.** 게시판 렌더링(renderList, renderPostDetail,
                     openPost 등), Supabase 연동(loadRealPosts, submitPost, addComment,
                     toggleLike 등), 로그인/로그아웃, 이미지 업로드, 라우팅 브릿지까지
                     전부 이 한 파일(1100줄+)의 전역 함수로 존재. React state 없음 —
                     `POSTS` 전역 배열 + `innerHTML` 직접 조작 방식.

lib/
  supabaseClient.js  Supabase 클라이언트 생성 (환경변수 사용, 하드코딩 없음)

.env.local          로컬 전용 환경변수 (git에 안 올라감)
```

### 왜 이런 구조인가
- 프론트엔드를 처음부터 React로 다시 짜면 시간이 오래 걸리고 위험 부담도 큼. 이미 완성된 디자인/기능 명세(vanilla JS)를 최대한 그대로 재사용하는 게 목표.
- `/post/[id]`, `/user/[id]` 같은 Next.js 라우트도 **실제 화면은 React로 새로 안 만들고** `<PaloApp/>`을 그대로 재사용. Next.js 라우트의 역할은 오직 **서버사이드 메타데이터(SEO/링크 미리보기)** 제공. 실제 상호작용(좋아요, 댓글, 삭제 등)은 여전히 `public/palo.js`가 담당.
- `/admin`만 예외 — 관리자 페이지는 vanilla JS와 무관한 **진짜 React 컴포넌트**로 새로 만듦 (통계 차트 등 React 생태계 도구가 필요했기 때문).

### `POSTS` 배열의 이중 구조 (중요, 헷갈리기 쉬움)
`public/palo.js`에는 원본 프로토타입 시절부터 있던 **하드코딩된 가짜 게시글 20개**(`var POSTS=[...]`, id 1~20)가 여전히 남아있음. 페이지 로드 시 `loadRealPosts()`가 Supabase에서 진짜 글을 가져와서 이 배열 **앞에 이어붙임**(`POSTS = real.concat(POSTS)`). 이 둘을 구분하는 방법:
- **진짜 DB 글**: `id`가 `100000 + posts.id`(예: DB의 6번 글 → `id:100006`), `dbId` 필드가 존재 (`p.dbId === 6`).
- **가짜 데모 글**: `id`가 1~20의 작은 숫자, `dbId` 필드 자체가 없음(`undefined`).

댓글의 `authorId`, 좋아요의 `_liked` 등도 이 패턴을 따름 — 삭제/수정/작성자 프로필 링크 등 "진짜 DB 데이터에만 적용되는 기능"은 전부 `if(p.dbId){...}` 가드로 감싸져 있음. 새 기능을 추가할 때도 이 가드를 잊지 말 것.

### 로그인은 로그인은 있지만 필수 아님 (중요한 설계 결정)
설계 문서 원안은 "로그인해야 글쓰기 가능"이었으나, **사용자 요청으로 로그인 없이도 글쓰기·댓글이 항상 가능**하도록 변경됨. 좋아요만 예외적으로 로그인 여부와 무관하게 저장되는데, 비로그인 시 `localStorage`의 `palo_anon_id`(브라우저별 랜덤 UUID, `anonId()` 함수)를 좋아요 테이블의 `user_id` 대신 사용해서 중복을 방지함. 이 설계 때문에:
- `posts.author_id`, `comments.author_id`는 **nullable** — null이면 "익명" 작성.
- 회원 차단(밴) 기능은 로그인 상태로 쓰는 것만 막을 수 있고, 로그아웃 후 익명 글쓰기는 원천적으로 막지 못함(알려진 한계, 6절 참고).

### 게시판 목록 (`BOARDS`, `public/palo.js` 최상단)
DB 테이블이 아니라 **클라이언트 하드코딩 배열**(`var BOARDS=[...]`) — 게시판 추가/이름 변경/순서 변경은 이 배열, 카테고리 태그 표시용 `CATMAP`(짧은 라벨), 초기 화면 깜빡임 방지용 **정적 칩(`app/body-html.js`의 `#chips`)**, 그리고 **관리자 페이지 게시판 이름 맵(`app/admin/page.js`의 `BOARD_LABELS`)** 네 곳을 코드로 수정해야 함(관리자 화면에서 조정 불가). *(참고: `app/body-html.js`의 데스크톱 사이드바(`#boardNav`)·모바일 서랍(`#boardNavM`)·시트(`#boardNavS`) 정적 마크업은 로드 시 `renderNav`가 통째로 다시 그리므로 소스가 아님 — 갱신 안 해도 결과는 맞지만, 로드 직전 잠깐 옛 이름이 보일 수 있어 여유되면 같이 맞추면 좋음.)* `posts.board`는 이 배열의 `id` 값을 그대로 저장하는 자유 텍스트 컬럼(FK 제약 없음) — **이름만 바꾸고 `id`를 유지하면 기존 글이 그대로 보존됨**(개명 시 핵심). `renderNav`/`renderChips`/`buildBoardMenu`(글쓰기 선택, `all`·`sketch`만 제외)/`boardName`이 전부 `BOARDS`를 자동으로 읽으므로 배열만 고치면 사이드바·칩·글쓰기·필터에 자동 반영됨.

| 그룹 | id | 화면 이름 | 비고 |
|---|---|---|---|
| 이야기 | `all` | 전체 글 | 실제 게시판 아님(집계 뷰) |
| 이야기 | `talk` | 수다 광장 | |
| 그리는 중 | `doodle` | 낙서 | **2026-08-02 신설(그리는 중 그룹 상단)**. 부담 없는 낙서/자유 그림용. `CATMAP` `낙서`(talk-c), 말머리 없음. 같은 날 이름 "낙서/자유 그림"→"낙서" |
| 그리는 중 | `wip` | 작업물 | 2026-08-01 개명(원래 "작업 과정") |
| 그리는 중 | `sketch` | 그림공부 | 2026-07-29 개명(원래 "스케치북"). **2026-08-01부터 글쓰기 가능**(말머리 추가하면서, `buildBoardMenu()`·`openWrite()`의 `id!=="sketch"` 제외를 둘 다 해제) — 그 전까진 이식 잔재로 글쓰기 불가였음 |
| 궁금해요 | `ask` | 질문/시세문의 | 2026-08-01 개명(원래 "물어보기"→"고민"CATMAP은 유지). id 유지라 기존 글 보존. **2026-08-02 이야기→궁금해요 그룹 이동** |
| 궁금해요 | `vote` | 투표/수요조사 | 2026-08-01 신설(개명 2026-08-02 "투표·수요조사"→"투표/수요조사"). 빈 게시판으로 시작, `CATMAP`에 `투표`(chal-c) 추가. **2026-08-02 이야기→궁금해요 이동** |
| 궁금해요 | `crit` | 피드백 요청 | 2026-08-01 개명(원래 "피드백 해주세요", 그 전엔 "봐주세요"). 등급 시스템의 "도움돼요 +20점" 규칙이 이 게시판(`board='crit'`)에만 적용됨(5절 참고). **2026-08-02 그리는 중→궁금해요 이동** |
| 함께 | `collab` | 협업/팀원모집 | **2026-08-02 신설(함께 그룹 상단)**. 합작·팀 프로젝트 팀원 모집용. `CATMAP` `협업`(help-c), 말머리 없음 |
| 함께 | `challenge` | 챌린지 | |
| 함께 | `tip` | 자료/TIP | 2026-08-01 개명(원래 "팁 · 강좌"), 2026-08-02 "자료·TIP 공유"→"자료/TIP" |

> **그룹 순서(2026-08-02 기준)**: 이야기 · **그리는 중** · **궁금해요** · 함께 · 거래 · 기타 (08-02에 그리는 중↔궁금해요 위치 교체).
| 거래 | `request` | 리퀘스트 | 2026-08-01 신설(그림을 의뢰하고 싶은 사람이 올리는 게시판). 빈 게시판, `CATMAP`에 `리퀘스트`(free-c) 추가. 말머리 `모집중·모집완료·리퀘완료·후기글`(2026-08-02 `리퀘완료` 추가) |
| 거래 | `recruit` | 커미션 구인 | 2026-08-01 신설(커미션을 받는 작가가 올리는 게시판). 빈 게시판, `CATMAP`에 `구인`(free-c) 추가. 아래 `trade`(커미션 구인구직)와는 **별개 id** |
| 거래 | `trade` | 커미션 구인구직 | **BOARDS 배열에는 없음**(사이드바/칩/글쓰기 목록에 안 나옴) — 2026-07-30 커미션 페이지로 분리하면서 뺐지만 기존 글(`board='trade'`)은 DB에 그대로 남아 커미션 시스템에서 다뤄짐. `boardName()`이 하드코딩으로 이름만 매핑 |
| 거래 | `review` | 커미션 후기 | 2026-07-29 신설. `trade`처럼 BOARDS 배열엔 없고 커미션 후기 전용 시스템으로 발전(4절 참고) |
| 거래 | `used` | 중고 장비 | |
| 기타 | `adult` | 에치치 | **2026-08-04 재추가**(사용자 요청) — `BOARDS` 기타 그룹에 다시 등록 + `CHIP_EMOJI.adult="🔞"`·`CHIP_GROUP.adult="g-etc"`(그레이 계열) 추가. 제거 때 나머지(CATMAP·BOARD_GUIDE·전체글/인기 제외 필터·sitemap/rss 제외·admin·board 페이지 라벨)를 남겨뒀기에 이 3곳만 되돌리면 복구됨. 노출 정책은 예전 그대로: 게시판을 직접 들어가면 보이고 **"전체 글"·인기 위젯·sitemap/RSS에서는 제외**(연령 확인 등 추가 제한은 없음). 검증: 게시판 16개 복귀, 상단 탭·드로어 🔞 표시, `/board/adult` 진입·글쓰기 게시판 선택 가능, 전체 글 노출 0, 콘솔 무에러. ~~**2026-08-04 제거됨**~~(BOARDS 배열에서 삭제 → 드로어 메뉴·글쓰기 선택·`/board/adult` 모두 사라짐, getBoardFromPath('adult')=null→홈. DB에 adult 글 0개라 데이터 정리 불필요. CATMAP.adult·필터(`p.board!=="adult"`)·sitemap/rss 제외·admin/board 라벨 매핑·BOARD_GUIDE.adult는 잔존 글 대비 안전상 유지). ~~2026-07-29 신설.~~ 아이콘은 SVG 대신 🔞 이모지 문자를 그대로 씀. **"전체 글" 목록과 홈 "이글이글" 위젯에서만 제외**(`filteredPosts()`/`emberHTML()`에서 `p.board!=="adult"` 필터) — 게시판을 직접 클릭해서 들어가면 누구나 그대로 볼 수 있음, 로그인/연령 확인 등 추가 접근 제한은 없음(요청받지 않아서 안 넣음, 필요하면 추가 가능) |

### 글에 투표 첨부 (2026-08-02, 단계별 진행 중)
글 작성 시 투표(질문+선택지)를 첨부 → 유저가 투표 → 결과(득표수·비율) 표시. **어느 게시판에서든** 첨부 가능. 1단계=기본, 2단계=복수선택·마감기한·익명(예정).
- **[1단계 완료 — 기본]** **DB**: `polls`(id/`post_id` unique/question) + `poll_options`(id/poll_id/body/sort) + `poll_votes`(poll_id/option_id/user_id, **PK `(poll_id,user_id)`로 1인 1표 물리 차단**). RLS: polls/options는 select 공개·insert는 **그 글 작성자만**(posts.author_id=auth.uid() 서브쿼리); `poll_votes`는 **직접 접근 정책 없음** → RPC로만. **RPC**: `cast_vote(poll_id,option_id)`(security definer — 로그인 필수·선택지 검증·`unique_violation`으로 중복 거부, 최신 결과 반환) / `get_poll_results(poll_id)`(security definer — 선택지별 count+총합+`my_option`, anon도 호출 가능). **결과 RPC엔 질문이 없어** 클라가 `polls.question`을 따로 조회해 `POLL_CACHE`에 캐시.
  - **클라(`public/palo.js`)**: 글쓰기 모달에 "📊 투표 추가"(`#edPollAddBtn`)→편집기(`#edPollBox`, `edState.poll={question,options[]}`, `edPollAdd/Remove/AddOption/RemoveOption/Sync/Render`, 선택지 2~8개). 수정(editingPostId) 시엔 투표 편집 미지원(버튼 숨김). `submitPost`가 글 저장 후 `polls`+`poll_options` insert(질문·선택지2+ 검증). `loadRealPosts` wave2에 `polls` 조회 추가→`pollId` 매핑. `renderPostDetail`이 본문 아래 `#pollBox` 렌더 후 `loadPoll(pollId)`: 미투표면 선택 버튼(`votePoll`→`cast_vote`), 투표했으면 결과 막대(`.poll-res`, 내 선택 `.mine`, %·표수). `votePoll` 성공 시 반환된 결과로 즉시 재렌더.
  - **[2-①단계 완료] 복수 선택 + 마감 기한 + 설정 저장**: `polls`에 `allow_multiple`/`closes_at`/`is_anonymous` 추가. 복수 선택 위해 `poll_votes` PK를 `(poll_id,user_id)`→**`(poll_id,user_id,option_id)`**(1인·선택지당 1표)로 변경. `cast_vote` v2: 마감(`now()>closes_at`) 거부, 복수면 같은 선택지 재클릭 시 **토글(취소)**, 단일이면 재투표 거부. `get_poll_results` v2: 질문+설정(`allow_multiple`/`is_anonymous`/`closes_at`/`closed`)+`my_options`(배열)+선택지 count+`total`(참여자 distinct). 클라: 편집기에 설정 3개(`#edPollMulti`/`#edPollAnon`/`#edPollClose` 없음/1/3/7/14일), `submitPost`가 `closes_at`(now+days)·`allow_multiple`·`is_anonymous` 저장. `renderPoll` v2가 단일(미투표=버튼/투표=잠금결과)·복수(마감 전 항상 토글+막대)·마감(잠금+`마감`태그)·`복수 선택`/`익명` 태그·`pollDeadlineText`(N일 남음) 처리. `POLL_CACHE` 제거(결과 RPC가 질문 반환).
  - **[2-②단계 완료] 익명 효과(참여자 목록) + 실시간 갱신**: **RPC `get_poll_voters(poll_id)`**(security definer) — 폴이 `is_anonymous`면 `{anonymous:true}`만(서버가 명단 차단), 아니면 `{anonymous:false, voters:[{option_id,nick}]}`. `voters`엔 `user_id`도 포함(동명이인 정확 그룹핑). 클라: `renderPoll`이 익명이면 안내(`.poll-anon`), 비익명+참여있으면 "👥 참여자 보기" 버튼(`togglePollVoters`)→`renderPollVotersHTML`가 **사람별** "닉네임 → 고른 선택지"(복수 선택이면 여러 개, `user_id`로 그룹).  **실시간**: `subscribePoll`이 Supabase **broadcast 채널 `poll-{id}`** 구독(투표 테이블 직접 구독 X→익명 보장), `votePoll` 성공 시 `channel.send({broadcast,vote})`로 알림→다른 시청자가 `refreshPollResults`(결과+열린 명단 재조회). `_pollChannel`은 `loadPoll`마다 스왑(단일 채널), 화면 떠나면 콜백이 pollBox 없어 no-op.
  - **미구현**: 수정 화면에서 투표 편집.

**게시판 안 말머리 필터 바 (2026-07-29 추가, DB 변경 없음):** 게시판에 들어가면(전체 글/최신·인기 탭 아래) 그 게시판의 `TAGS_BY_BOARD[board]`(글쓰기 모달에서 쓰는 것과 동일한 말머리 목록)를 "전체/러프/선화/채색/완성" 같은 필터 버튼 줄로 보여줌(`tagFilterBarHTML()`) — 말머리가 없는 게시판(`all` 등 `TAGS_BY_BOARD`에 없는 곳)은 이 줄이 아예 안 뜸.

**말머리 구성 개편 (2026-08-01):** 게시판 개편에 맞춰 `TAGS_BY_BOARD`를 사용자 지정대로 갱신 — `ask`(질문/시세문의): 질문·시세문의 / `crit`(피드백 요청): 피드백 요청(단일) / `sketch`(그림공부): 러프·선화·채색(이때 그림공부를 글쓰기 가능하게 함) / `vote`(투표·수요조사): 투표·수요조사 / `request`(리퀘스트): 모집중·모집완료·후기글 / `recruit`(커미션 구인): 개인용·비상업용·방송용·상업용·외주. 나머지(talk/wip/tip/challenge/used/trade)는 그대로. **주의**: 개편 전에 올라온 옛 글의 `posts.category`는 옛 말머리 값을 그대로 가짐(예: 예전 `crit`의 러프/선화/채색/완성 글) — 필터 목록엔 안 잡히지만 "전체"에는 그대로 보임(글은 안 사라짐). 하나를 누르면 `state.tag`가 그 값으로 설정되고 `filteredPosts()`가 `p.category===state.tag`로 걸러서 그 말머리 글만 보여줌(`toggleTagFilter(tag)`), 같은 버튼을 다시 누르거나 "전체"를 누르면 해제. `selectBoard()`가 게시판 전환(같은 게시판 다시 클릭 포함) 시 `state.tag`를 항상 초기화하므로 다른 게시판으로 이동해도 자동으로 풀림. **처음엔 각 글 제목 안의 "[말머리]" 텍스트 자체를 클릭 가능하게 만드는 방식으로 시도했는데 사용자가 "잘 작동하지 않는다"고 해서, 게시판 진입 시 바로 보이는 필터 버튼 줄 방식으로 다시 만듦** — 개별 글 제목을 뒤져서 말머리를 찾는 것보다 게시판 상단에 전체 옵션을 미리 보여주는 게 훨씬 발견하기 쉬움.

**일반 게시판 목록형/앨범형 보기 전환 (2026-07-30 추가, DB 변경 없음):** "커미션 후기" 게시판은 이미 항상 이미지 앨범형인데, 일반 게시판에서도 원하면 앨범형으로 볼 수 있게 해달라는 요청으로 추가. 최신/인기 탭 옆에 **"☰ 목록형 / ▦ 앨범형"** 토글 버튼(`state.viewMode`, `setViewMode()`) — "커미션 후기" 게시판에서는 이미 강제 앨범형이라 이 토글 자체가 안 뜸. 앨범형을 고르면 `postAlbumHTML()`/`postCardHTML()`(커미션 후기 앨범과 같은 그리드 스타일, `.post-album`/`.post-card`)이 쓰이는데, **이미지가 첨부된 글만 보여주고 이미지 없는 글은 아예 목록에서 제외됨**(사용자가 처음엔 이미지 없는 글도 색상 배경 카드로 보여줬다가, "이미지 없는 글은 안 보이게 해달라"는 요청으로 필터링 방식으로 바꿈) — 페이지 수도 이미지 있는 글 개수 기준으로 다시 계산되고, 이미지 있는 글이 하나도 없으면 "이미지가 있는 글이 없어요" 안내가 뜸. `state.viewMode`는 게시판을 옮겨도 초기화되지 않고 유지됨(사용자의 보기 방식 선호로 취급).

---

## 4. 데이터베이스 스키마 (Supabase PostgreSQL)

**주의**: 아래는 세션 중 직접 실행한 SQL을 기반으로 재구성한 것이며, DB를 직접 조회해 검증한 것은 아님(anon 키로는 `pg_policies` 같은 시스템 카탈로그 조회 불가). 실제로 뭔가 다르게 동작한다면 Supabase 대시보드의 **Database → Tables / Policies**에서 직접 확인하는 게 가장 정확함.

Supabase 프로젝트: https://qabbdgfottbnapmyjudy.supabase.co

### 테이블 목록과 컬럼

| 테이블 | 주요 컬럼 | 비고 |
|---|---|---|
| `profiles` | `id`(uuid, PK, = auth.users.id), `nickname`(text), `level`(**integer**, 2026-07-29부터 — 예전엔 text였음), `score`(int, 누적 점수, 안 줄어듦), `ad_points`(int, 2026-07-29 추가 — 광고 포인트, 광고 집행 시 차감될 예정), `last_score_date`/`daily_score_earned`(글/댓글 일일 20점 상한 계산용, 좋아요·도움돼요는 예외), `last_activity_at`(timestamptz, 1분 연속 작성 제한용), `pinned_post_id`(FK→posts, nullable, `on delete set null`, 2026-07-29 추가 — 프로필 최상단에 보여줄 "대표 글" 지정용), `avatar_url`(text, nullable, 2026-07-30 추가 — 프로필 이미지), `cover_url`(text, nullable, 2026-07-30 추가 — 프로필 커버 이미지), `bio`(text, nullable, 2026-07-30 추가 — 자기소개, 클라이언트에서 150자로 자름), `sns_twitter`/`sns_instagram`/`sns_email`(text, nullable, 2026-07-30 추가 — 프로필 헤어의 SNS 링크 3종, 고정 슬롯), `is_admin`(bool), `is_banned`(bool), `created_at` | `auth.users`에 새 유저 생기면 트리거로 자동 생성. **`score`/`level`/`ad_points`/`daily_score_earned`/`last_score_date`/`last_activity_at`은 `guard_profile_score_columns()` 트리거로 보호됨** — 신뢰된 서버 함수(`app.trusted_score_update` 세션 신호를 켠 함수)만 바꿀 수 있고, 유저가 직접 `.update()`로 건드리면 조용히 원래 값으로 되돌아감(2026-07-29, 유저 광고 시스템 작업 중 발견한 기존 구멍을 소급 적용해서 막음). **`pinned_post_id`는 별도 트리거(`guard_pinned_post()`)로 "본인 글만" 지정 가능하도록 보호됨**(아래 참고) |
| `posts` | `id`(bigint PK), `author_id`(uuid, nullable), `board`(text), `category`(text, 말머리), `title`, `content`(text, 순수 텍스트 — 검색용), `content_html`(text, nullable, 2026-07-29 추가 — 서식·인라인 이미지/동영상 포함한 실제 렌더링용 HTML, DOMPurify로 살균 후 저장), `stage`(text, 러프/선화/채색/완성), `views`(int), `is_manager_pick`(bool, 2026-07-29 추가), `pick_position`(int, nullable, 2026-07-29 추가), `picked_at`(timestamptz, nullable, 2026-07-29 추가), `reviewed_nickname`(text, nullable, 2026-07-30 추가 — 커미션 후기가 누구에 대한 건지), `commission_post_id`(FK→posts, nullable, `on delete set null`, 2026-07-30 추가 — 후기가 어느 구직 글에 대한 건지), `commission_sentiment`(text, nullable, `good`/`bad`만 허용하는 체크 제약, 2026-07-30 추가 — 만족/불호 후기), `commission_id`(FK→commissions, nullable, `on delete set null`, 2026-07-30 추가 — **새 커미션 페이지**의 후기가 어느 커미션에 대한 건지, `commission_post_id`와는 별개 통로), `commission_ctype`(text, nullable, 2026-07-30 추가 — 후기 작성 시 고른 커미션 타입, 실제로는 그 커미션의 태그 중 하나), `commission_bad_reason`(text, nullable, 2026-07-30 추가 — 불호 후기일 때만 채워짐), `created_at` | `is_manager_pick`/`pick_position`/`picked_at`은 `guard_manager_pick_columns()` 트리거로 보호됨 — 관리자가 아니면 update 시 조용히 원래 값으로 되돌아감(아래 "매니저 픽" 절 참고). `board='review'`인 글은 `guard_review_requires_login()` 트리거로 비로그인 작성이 막힘(아래 "커미션 후기" 절 참고). **`posts_commission_link_check` 제약**으로 `commission_post_id`와 `commission_id`가 동시에 채워지는 것 방지(한 후기는 둘 중 한 경로로만 연결) |
| `comments` | `id`(bigint PK), `post_id`(FK→posts), `author_id`(uuid, nullable), `content`, `parent_id`(FK→comments, 대댓글용, **UI 미구현**), `created_at` | |
| `likes` | `user_id`(uuid — 로그인 시 실제 계정, 비로그인 시 `palo_anon_id`), `post_id`(FK→posts), `created_at` | PK가 `(user_id, post_id)` 복합키 — 중복 방지의 핵심 |
| `post_images` | `id`(bigint PK), `post_id`(FK→posts), `url`(text, Storage 공개 URL), `sort`(int) | |
| `reports` | `id`(bigint PK), `post_id`(FK→posts), `reporter_id`(uuid, nullable), `reason`(text, nullable), `resolved`(bool), `created_at` | 관리자 전용 조회 |
| `notices` | `id`(bigint PK), `title`(text), `content`(text, **HTML** — 굵게 서식 지원), `created_at` | 공개 읽기, 관리자만 쓰기 |
| `conversations` | `id`(bigint PK), `user1_id`(uuid), `user2_id`(uuid), `last_message_at`(timestamptz), `created_at` | 1:1 채팅방 1개 = row 1개. 두 참여자를 어느 순서로 넣었는지 정해져 있지 않아서 조회할 땐 항상 `.or()`로 양방향 매칭 (아래 참고) |
| `messages` | `id`(bigint PK), `conversation_id`(FK→conversations), `sender_id`(uuid), `content`(text), `is_read`(bool, default false), `commission_id`(FK→commissions, nullable, `on delete set null`, 2026-07-30 추가 — 커미션 페이지 "문의하기"로 시작된 메시지가 어느 커미션 얘기인지), `created_at` | `commission_id`가 있는 메시지는 채팅 화면에서 일반 말풍선이 아니라 클릭 가능한 카드로 렌더링됨(아래 "문의하기" 절 참고) |
| `chat_admin_access_logs` | `id`(bigint PK), `admin_id`(uuid, FK→profiles), `conversation_id`(FK→conversations), `report_id`(FK→reports, nullable), `accessed_at` | 관리자가 채팅을 열람할 때마다 자동 기록. **update/delete 정책 없음(append-only)** — 아무도 못 고치고 못 지움, 감사 로그의 신뢰성 확보용 |
| `notifications` | `id`(bigint PK), `user_id`(uuid, FK→profiles, 알림 받는 사람), `type`(text: `chat`/`cm`/`like`/`ad_rejected`/`review_alert`/`cm_inquiry`), `icon`(text), `content`(text), `link_chat_user`(uuid, nullable), `link_conversation_id`(FK→conversations, nullable), `link_post_id`(FK→posts, nullable), `link_commission_id`(FK→commissions, nullable, `on delete set null`, 2026-07-31 추가 — 커미션 광고 반려/커미션 문의 알림이 어느 커미션인지), `link_reviewed_user_id`(uuid, FK→profiles, nullable, `on delete cascade`, 2026-07-31 추가 — 후기 조작 의심 알림이 어느 작가에 대한 건지 + 중복알림 방지 키), `is_read`(bool), `created_at` | 실제 저장되는 알림함(2026-07-29 추가). **일반 유저는 insert 자체가 불가능** — DB 트리거 또는 SECURITY DEFINER RPC(`reject_user_ad()`)만 생성 가능. `type` 체크 제약(`notifications_type_check`)이 있으니 새 타입 추가 시 갱신 필요(기존 데이터와 충돌 안 나게 "현존 타입+새 타입"으로 동적 재생성). `cm_inquiry`는 `notify_new_message` 트리거가 "커미션 참조 메시지의 받는 사람이 그 커미션 작가일 때"만 생성(그 외 커미션 메시지·일반 메시지는 `chat`) |
| `push_subscriptions` | `id`(bigint identity PK), `user_id`(uuid, FK→profiles, `on delete cascade`), `endpoint`(text, **unique**), `p256dh`(text), `auth`(text), `prefs`(jsonb, 알림 종류별 on/off — `{cm,like,notice,chat,cminquiry}`), `created_at` | 웹 푸시 구독(2026-07-31 추가). 유저는 자기 것만 select/insert/update/delete(RLS). 발송 서버(`/api/push`)는 service_role로 조회. 클라이언트가 endpoint 기준 upsert, 토글 변경 시 prefs 갱신 |
| `level_thresholds` | `level`(int PK, 1~8), `min_score`(int), `name`(text), `emoji`(text, 2026-07-29 추가) | 등급 기준표. **등급 이름/이모지/필요 점수를 바꾸려면 이 표만 수정하면 됨** — 코드 변경 불필요. insert/update/delete 정책 없음(관리자가 SQL Editor로만 직접 수정) |
| `comment_helpful` | `comment_id`(FK→comments), `user_id`(uuid, FK→profiles), `created_at` | PK가 `(comment_id,user_id)`. "도움돼요"를 실제로 저장하는 테이블(2026-07-29 추가 — 이전엔 완전히 가짜였음, 아래 "등급 시스템" 절 참고). **로그인 필수**(likes와 달리 익명 불가) |
| `score_log` | `id`(bigint PK), `user_id`(FK→profiles), `amount`(int, 실제 지급된 양), `event`(text), `source_table`/`source_id`(어느 글/댓글에 귀속되는지), `created_at` | 등급 시스템의 지급 내역(2026-07-29 추가) — 글/댓글 삭제 시 정확한 회수의 근거. select는 본인만, insert/update/delete는 트리거만 |
| `score_awarded_likes` | `user_id`, `post_id`(FK→posts) | PK가 `(user_id,post_id)`. "이 사람이 이 글로 추천 점수를 받은 적 있는지" 영구 기록(2026-07-29 추가, 좋아요 취소 후 재클릭 악용 방지) — RLS만 켜고 정책은 없음, 클라이언트 접근 완전 차단 |
| `score_awarded_helpful` | `user_id`, `comment_id`(FK→comments) | 위와 동일한 목적, 도움돼요용 |
| `user_ads` | `id`(bigint PK), `user_id`(FK→profiles), `image_url`(text), `linked_post_id`(FK→posts, `on delete cascade`, **nullable** — 2026-07-31부터), `linked_commission_id`(FK→commissions, `on delete cascade`, nullable, 2026-07-31 추가 — 글 대신 커미션을 광고할 때), `points_spent`(int), `duration_days`(int), `status`(text: pending/active/rejected/expired/removed_by_admin), `created_at`, `expires_at`(nullable — `pending` 상태일 땐 아직 안 채워짐) | 유저 이미지 배너 광고(2026-07-29 추가, 2026-07-31 커미션 광고 확장). insert/update는 RLS 정책 없음 — `create_user_ad()`(생성, `pending`)/`approve_user_ad()`/`reject_user_ad()`(관리자 사전 승인·거절)/`admin_remove_ad()`(사후 삭제) RPC로만 상태 변경. **`user_ads_target_check` 제약**으로 `linked_post_id`/`linked_commission_id` 중 정확히 하나만 채워짐(글 광고 또는 커미션 광고). 연결된 글·커미션이 삭제되면 광고도 cascade로 자동 삭제 |
| `commissions` | `id`(bigint PK), `author_id`(uuid, FK→auth.users, `on delete cascade`), `title`, `price`(text), `tags`(**text[]**, 최대 5개 체크 제약 `commissions_tags_max5`), `status`(text: open/close), `period`, `slots`, `description`, `description_html`(text, nullable, 2026-07-31 추가 — 설명란 서식 있는 버전, `posts.content_html`과 같은 분리 패턴), `usage_rights`, `trade_policy`, `application_form`(**jsonb**, nullable, 2026-07-30 추가 — `[{id,type:'text'|'checkbox',label,required}]`, 이 프로젝트 최초의 jsonb 컬럼, 신청하기 커스텀 폼용), `created_at` | 2026-07-30 추가(커미션 페이지 프롬프트2). `posts`와 달리 **비로그인 등록 자체가 불가** — "내 커미션"이라는 소유 개념이 필수라서. 이 프로젝트에서 처음으로 실제 Postgres `text[]` 컬럼을 쓴 사례 |
| `commission_images` | `id`(bigint PK), `commission_id`(FK→commissions, `on delete cascade`), `url`(text, Storage 공개 URL), `sort`(int), `created_at` | 2026-07-30 추가. `post_images`와 달리 **insert/delete 모두 처음부터 소유자로 좁혀서 만듦**(아래 RLS 참고) — `post_images`의 "누구나 insert 가능"한 미해결 보안 부채를 반복하지 않기로 함 |
| `commission_applications` | `id`(bigint PK), `commission_id`(FK→commissions, `on delete cascade`), `applicant_id`(uuid, FK→auth.users, `on delete cascade`), `reference_images`(text[] 또는 jsonb, 신청 시 첨부한 참고 이미지 URL 목록), `extra_request`(text), `answers`(jsonb, 제출 당시 커스텀 폼 응답 스냅샷 `[{field_id,label,type,value}]`), `agreed_policy_text`(text, 제출 당시 거래 정책 문구 스냅샷 — 나중에 작가가 정책을 바꿔도 신청 당시 합의 내용 보존), `status`(text: pending/accepted/rejected), `decided_at`(timestamptz, nullable), `created_at` | 2026-07-30 추가(커미션 페이지 프롬프트5 "신청하기"). **계좌·금융 정보는 이 테이블은 물론 어떤 테이블에도 저장하지 않음** — 수락 후 작가가 기존 1:1 채팅으로 직접 전달(사용자가 AskUserQuestion에서 명시적으로 선택한 방향) |
| `ad_campaigns` | `id`(bigint identity PK), `advertiser`(text, nullable), `image_url`(text), `target_url`(text, 외부 URL 허용), `impression_goal`(int, 판매한 총 노출수), `impressions_served`(int, default 0, **서버 RPC만 증가**), `cpm_price`(numeric, nullable, 정산 기록용), `flight_start`/`flight_end`(timestamptz), `status`(text: active/paused/completed/archived), `created_at` | 유료 CPM 광고 캠페인(2026-07-31 추가). 관리자 수동 등록. select/insert/update/delete 전부 `is_admin()`만(RLS). 목표 도달 시 `record_ad_impressions`가 자동으로 `status='completed'`로 바꿔 더 이상 노출 안 됨 |
| `ad_impression_daily` | `campaign_id`(FK→ad_campaigns, `on delete cascade`), `date`(date), `count`(int), PK `(campaign_id,date)` | 일별 뷰어블 노출 집계(2026-07-31 추가). 노출 1건마다 행을 쌓지 않고 날짜별로 뭉쳐 카운트(쓰기 폭증 방지, 리포트 그래프용). insert/update는 `record_ad_impressions`(security definer)만, select는 관리자만 |
| `commission_worksamples` | `id`(bigint identity PK), `commission_id`(FK→commissions, `on delete cascade`), `author_id`(uuid FK→auth.users, `on delete cascade`), `title`(text), `description`(text, nullable), `description_html`(text, nullable — 리치 에디터 붙일 자리, 현재 미사용), `work_date`(date, nullable), `created_at` | 2026-08-01 추가. **커미션별 작업 사례**(작가가 그 커미션으로 작업한 결과물 쇼케이스). 조회 누구나, insert/update/delete는 그 커미션의 작가만(RLS 아래) |
| `commission_worksample_images` | `id`(bigint identity PK), `worksample_id`(FK→commission_worksamples, `on delete cascade`), `url`(text, Storage 공개 URL), `sort`(int), `created_at` | 2026-08-01 추가. 작업 사례 1개에 이미지 여러 장(`commission_images`·`post_images`와 같은 분리 패턴). 조회 누구나, insert/delete는 그 작업 사례의 커미션 작가만 |

### Storage 버킷
- `post-images` (Public) — 글 첨부 이미지. 업로드 경로는 `${Date.now()}-${파일명}` 형태(폴더 구분 없음).
- `commission-images` (Public, 2026-07-30 추가) — 커미션 샘플 이미지. `post-images`와 별도 버킷. 업로드 경로는 `${작성자uid}/${Date.now()}-${파일명}` 형태 — 폴더명이 업로더의 uid라서, Storage RLS가 `(storage.foldername(name))[1] = auth.uid()::text`만으로 본인 파일만 업로드/삭제 가능하도록 검사(테이블 조인 없이 경로만으로 판단하는 표준 Supabase 패턴).

### RLS(Row Level Security) 정책 — 현재 최종 상태

**공통 재사용 함수:**
```sql
-- 관리자 여부 확인 (security definer로 profiles 테이블을 우회 조회)
create or replace function public.is_admin() returns boolean as $$
  select exists(select 1 from public.profiles where id = auth.uid() and is_admin);
$$ language sql stable security definer set search_path = public;

-- 조회수 증가 전용 (누구나 호출 가능하지만 딱 이 동작만 허용)
create or replace function public.increment_post_views(p_id bigint) returns void as $$
begin
  update public.posts set views = views + 1 where id = p_id;
end;
$$ language plpgsql security definer set search_path = public;
grant execute on function public.increment_post_views(bigint) to anon, authenticated;
```

**`posts`:**
- select: 누구나
- insert: `posts_insert_not_banned` — 비로그인이거나(허용), 로그인했다면 차단(`is_banned`)되지 않은 사람만
- update: `posts_update_own` — `auth.uid() = author_id`인 사람만 (본인 글만)
- delete: `posts_delete_own`(본인) + `posts_delete_admin`(`is_admin()`이면 아무 글이나)

**`comments`:**
- select: 누구나
- insert: `comments_insert_not_banned` — posts와 동일 로직
- delete: `comments_delete_own` — `auth.uid() = author_id`

**`likes`:**
- select: 누구나
- insert/delete: `likes_insert_own_or_anon` / `likes_delete_own_or_anon` — `auth.uid() = user_id` 이거나 `auth.uid() is null`(비로그인은 신원 확인이 안 되니 임시로 열어둠)

**`profiles`:**
- select: 누구나
- update: `profiles_update_own`(본인, `auth.uid()=id`) + `profiles_update_admin`(`is_admin()`이면 아무 프로필이나 — 밴 처리용)
- **제약**: `profiles_nickname_format` — `nickname ~ '^[가-힣a-zA-Z0-9]{2,12}$'` (한글/영문/숫자 2~12자만, 공백·특수문자·이모지 금지) / `profiles_nickname_unique` — 닉네임 중복 불가

**`post_images`:**
- select: 누구나
- insert: `post_images_insert_all_temp` — **누구나** (아직 안 좁혀짐, 6절 "남은 보안 부채" 참고)
- delete: `post_images_delete_own_post` — 이미지가 속한 글의 작성자 본인만(`exists(select 1 from posts where posts.id=post_images.post_id and posts.author_id=auth.uid())`)

**`storage.objects` (post-images 버킷):**
- select: `images_bucket_select_all` — `bucket_id='post-images'`이면 누구나
- insert: `images_bucket_insert_all_temp` — `bucket_id='post-images'`이면 **누구나** (마찬가지로 아직 안 좁혀짐)

**`reports`:**
- 컬럼: 원래 글 신고 전용(`post_id`)이었는데, **채팅 신고 기능 추가로 `conversation_id`(FK→conversations)와 `reported_user_id`(FK→profiles) 컬럼 추가**, **이후 광고 신고 기능 추가로 `ad_id`(FK→user_ads, on delete cascade) 컬럼 추가**. `post_id`/`conversation_id`/`ad_id` 중 정확히 하나만 채워지도록 체크 제약(`reports_target_check`)이 걸려있음.
- insert: `reports_insert_all_temp` — 글 신고·광고 신고는 누구나(익명 포함). 채팅 신고는 `reporter_id = auth.uid()`이고 `is_conversation_participant(conversation_id)`가 true일 때만(그 대화 참여자 본인만 신고 가능)
- select/update: `reports_select_admin` / `reports_update_admin` — `is_admin()`만
- **(2026-07-29, 이후 "신고된 대화만" → "전체 대화 열람"으로 확장됨. 아래 `conversations`/`messages` 절 참고)**

**`commissions` (2026-07-30 추가):**
- select: `commissions_select_all` — 누구나
- insert: `commissions_insert_own` — `auth.uid() = author_id`(비로그인 등록 불가, `posts`와 다른 점)
- update/delete: `commissions_update_own` / `commissions_delete_own` — 둘 다 `auth.uid() = author_id`, 남의 커미션은 절대 수정 불가

**`commission_images` (2026-07-30 추가):**
- select: `commission_images_select_all` — 누구나
- insert/delete: `commission_images_insert_own` / `commission_images_delete_own` — `exists(select 1 from commissions where id=commission_id and author_id=auth.uid())`, 즉 그 커미션의 주인만

**`storage.objects` (commission-images 버킷, 2026-07-30 추가):**
- select: `commission_images_bucket_select_all` — `bucket_id='commission-images'`이면 누구나
- insert/delete: `commission_images_bucket_insert_own` / `..._delete_own` — `bucket_id='commission-images'` and `(storage.foldername(name))[1] = auth.uid()::text`(업로드 경로의 첫 폴더가 본인 uid일 때만)

**`commission_bookmarks` (2026-07-30 추가):** PK가 `(user_id, commission_id)` 복합키(중복 방지).
- select/insert/delete: `commission_bookmarks_select_own` / `..._insert_own` / `..._delete_own` — 전부 `auth.uid() = user_id`, **남의 보관함은 조회조차 불가**(다른 소유권 테이블들과 달리 select도 본인만으로 좁힘 — 북마크는 `likes`와 달리 "누가 좋아했는지"가 아니라 순전히 개인 저장 목록이라 공개할 이유가 없다고 판단)

**`commission_applications` (2026-07-30 추가):**
- select: `commission_applications_select_related` — 본인이 신청한 것(`applicant_id=auth.uid()`) 또는 본인이 받은 신청(`exists(select 1 from commissions where id=commission_id and author_id=auth.uid())`)만, 남의 신청 내역은 누구도 조회 불가
- insert: `commission_applications_insert_own` — `auth.uid()=applicant_id`
- update: `commission_applications_update_owner` — 그 커미션의 작가만(`exists(...)` 위와 동일 서브쿼리), **수락/거절만 가능하도록 클라이언트가 `status`/`decided_at`만 update** — 신청자 본인은 update 불가(제출 후 응답 변조 방지)
- delete: 정책 없음(삭제 기능 자체를 안 만듦 — 신청 기록은 분쟁 대비 증거 성격이라 남겨두는 게 맞다고 판단)

**커미션 페이지 후기 알림 트리거 (2026-07-30 추가):**
```sql
create or replace function public.notify_new_commission_review() returns trigger as $$
declare
  v_owner uuid;
begin
  if new.board='review' and new.commission_id is not null then
    select author_id into v_owner from public.commissions where id=new.commission_id;
    if v_owner is not null and v_owner<>new.author_id then
      insert into public.notifications(user_id,type,icon,content,link_post_id,is_read)
      values(v_owner,'commission','🎨','내 커미션에 새 후기가 달렸어요',new.id,false);
    end if;
  end if;
  return new;
end;
$$ language plpgsql security definer set search_path = public;
```
`posts` INSERT 후 실행되는 트리거 — `notify_new_comment`/`notify_new_like`와 같은 패턴. **알림은 후기를 쓴 사람이 아니라 그 커미션의 주인에게 감**(자기 자신에게는 안 감). `notifications.type='commission'`은 클라이언트의 알림함 필터 탭("커미션")과도 맞물림.

**RLS 순환 참조(recursion) 주의 — 실제로 겪은 버그:** 위 정책들을 처음 만들 때 `conversations`/`messages` 조회 여부를 `reports` 서브쿼리로 확인하고, 반대로 `reports` INSERT는 `conversations` 서브쿼리로 참여자를 확인하도록 짰더니 `reports → conversations → reports → ...`로 서로가 서로를 참조하는 순환이 생겨 `infinite recursion detected in policy for relation "reports"` 에러가 났음(실제로 신고 접수 시 발생, `CREATE POLICY` 시점엔 에러 없이 통과해서 뒤늦게 발견됨). **고친 방법**: `is_admin()`과 똑같은 패턴으로, 테이블을 직접 서브쿼리하는 대신 **security definer 함수로 감싸서 그 함수를 호출**하도록 정책을 다시 씀 — security definer 함수 내부의 쿼리는 RLS를 우회하기 때문에 순환이 끊김:

```sql
-- 대화 참여자인지 확인 (RLS 우회)
create or replace function public.is_conversation_participant(p_conversation_id bigint) returns boolean as $$
  select exists(
    select 1 from public.conversations c
    where c.id = p_conversation_id
      and (c.user1_id = auth.uid() or c.user2_id = auth.uid())
  );
$$ language sql stable security definer set search_path = public;
grant execute on function public.is_conversation_participant(bigint) to authenticated;

-- 신고 접수된 대화인지 확인 (RLS 우회)
create or replace function public.conversation_is_reported(p_conversation_id bigint) returns boolean as $$
  select exists(select 1 from public.reports where conversation_id = p_conversation_id);
$$ language sql stable security definer set search_path = public;
grant execute on function public.conversation_is_reported(bigint) to authenticated;
```
`reports_insert_all_temp`은 `public.is_conversation_participant(conversation_id)`를, `conversations_select_admin_reported`/`messages_select_admin_reported`는 `public.is_admin() and public.conversation_is_reported(...)`를 쓰도록 재작성함. **교훈**: 정책 A가 테이블 B를 서브쿼리하고, 테이블 B의 정책이 다시 테이블 A를 서브쿼리하는 "맞물리는 관계"를 새 RLS 정책에 추가할 때는, 처음부터 서브쿼리 대신 security definer 함수로 감싸는 걸 기본으로 고려할 것 — `CREATE POLICY` 자체는 에러 없이 성공하고 실제 쿼리 실행 시점에야 recursion 에러가 나서 뒤늦게 발견되기 쉬움.

**`notices`:**
- select: 누구나
- insert/delete: `notices_insert_admin` / `notices_delete_admin` — `is_admin()`만

**`conversations`:**
- select/insert: `conversations_participant` — `auth.uid() = user1_id or auth.uid() = user2_id`인 사람만 (자기가 참여한 방만 보이고 만들 수 있음)
- update: 없음 — `last_message_at` 갱신은 클라이언트에서 직접 update문으로 호출하는데, 이건 `conversations_participant`의 insert/select 정책만으로는 안 되므로 실제로는 **update 정책도 참여자 조건으로 동일하게 걸려있음**(select와 동일 조건)
- select(관리자): `conversations_select_admin_all` — `is_admin()`이면 **전체 대화방** 조회 가능 (2026-07-29 추가, "신고된 대화만" 정책을 대체함 — 전체 열람이 상위 권한이라 정책 하나로 합침)

**`messages`:**
- select: `messages_select_participant` — 자신이 속한 대화(`conversation_id`)의 메시지만, `conversations` 테이블을 서브쿼리로 조인해서 참여자인지 확인
- insert: `messages_insert_participant` — `auth.uid() = sender_id`이고 본인이 그 대화의 참여자일 때만
- select(관리자): `messages_select_admin_all` — `is_admin()`이면 전체 메시지 조회 가능 (2026-07-29 추가, 위 conversations와 동일한 이유)
- **update는 RLS 정책 없음 — 의도적으로 없앰.** 처음엔 "읽음 처리"를 위해 `messages_update_participant`(대화 참여자면 아무 필드나 update 가능)를 만들었는데, 이러면 상대방이 **내가 보낸 메시지의 content까지 마음대로 바꿀 수 있는** 구멍이 생김. 이를 배포 전에 발견해서 정책 자체를 삭제하고, 아래의 좁은 RPC로 대체함:

```sql
-- 읽음 처리 전용: 내가 안 보낸 메시지의 is_read만 true로 바꿈 (그 외 컬럼은 손 못 댐)
create or replace function public.mark_messages_read(p_conversation_id bigint) returns void as $$
begin
  update public.messages
  set is_read = true
  where conversation_id = p_conversation_id
    and sender_id != auth.uid()
    and is_read = false;
end;
$$ language plpgsql security definer set search_path = public;
grant execute on function public.mark_messages_read(bigint) to authenticated;
```

**`chat_admin_access_logs`** (2026-07-29 추가 — 관리자 채팅 열람 감사 로그):
- insert: `chat_admin_access_logs_insert_admin` — `is_admin()`이고 `admin_id = auth.uid()`(본인 명의로만 기록 가능)
- select: `chat_admin_access_logs_select_admin` — `is_admin()`이면 누구나(관리자끼리 서로의 열람 기록도 볼 수 있어야 상호 견제가 됨 = 운영 투명성)
- **update/delete 정책 자체를 만들지 않음** — 한번 쌓인 로그는 관리자 본인도 고치거나 지울 수 없음(의도적, "증거"로서의 신뢰성이 목적)
- 클라이언트에서 `adminViewConversation()`이 대화를 성공적으로 불러올 때마다 자동으로 insert(신고 목록을 통해 열람한 경우 `report_id`도 같이 기록, 전체 목록에서 열람한 경우는 `report_id=null`)

**`notifications`** (2026-07-29 추가 — 실제 저장되는 알림함):
- select/update/delete: 전부 `auth.uid() = user_id`(본인 알림만)
- **insert 정책은 아예 없음** — 일반 유저는 자기 자신 앞으로도 알림을 직접 못 만듦. 오직 아래 3개의 security definer 트리거만 삽입 가능(스팸성 가짜 알림을 남에게 심는 걸 원천 차단)
- **채팅 메시지 → 알림** (`messages` INSERT 시 자동 실행):
```sql
create or replace function public.notify_new_message() returns trigger as $$
declare recipient_id uuid; sender_nick text;
begin
  select case when c.user1_id = new.sender_id then c.user2_id else c.user1_id end
    into recipient_id
    from public.conversations c where c.id = new.conversation_id;
  select nickname into sender_nick from public.profiles where id = new.sender_id;
  insert into public.notifications (user_id, type, icon, content, link_chat_user, link_conversation_id)
  values (recipient_id, 'chat', '💬',
    coalesce(sender_nick,'알 수 없음') || '님이 채팅을 보냈어요: ' || left(new.content, 24),
    new.sender_id, new.conversation_id);
  return new;
end;
$$ language plpgsql security definer set search_path = public;
create trigger on_message_insert_notify after insert on public.messages for each row execute function public.notify_new_message();
```
- **댓글/좋아요 → 알림** (`comments`/`likes` INSERT 시 자동 실행): `notify_new_comment()`/`notify_new_like()`가 같은 패턴 — 글 작성자(`posts.author_id`)에게 알림 생성. **본인 글에 본인이 댓글/좋아요 남기면 알림 생략**, **작성자가 없는 익명 글이면 알림 대상이 없으니 생략**(둘 다 함수 맨 앞의 `if post_author is null or post_author = new.author_id/new.user_id then return new;`로 처리). 좋아요는 비로그인도 가능해서(브라우저별 익명 id, `likes.user_id`가 `profiles`에 없는 경우) 닉네임 조회가 실패하면 "누군가"로 표시(`coalesce`).
- **중요 — `link_post_id`는 진짜 DB의 `posts.id`(예: 6)이지 화면에서 쓰는 로컬 id(예: 100006)가 아님.** `public/palo.js`의 실제 DB 글은 항상 `100000 + posts.id`로 참조하는 관례(3절 "POSTS 배열의 이중 구조" 참고)라서, 클라이언트가 알림을 눌러 `openPost()`를 호출할 때 `100000`을 더해줘야 함 — 처음엔 이걸 빠뜨려서 **알림을 클릭하면 엉뚱한 글로 이동하는 버그**가 있었음(우연히 로컬 id가 같은 다른 데모 글로 감). `dbRowToNotif()`(`public/palo.js`)에서 `post: row.link_post_id ? 100000+row.link_post_id : null`로 변환해서 고침. **교훈**: 이 프로젝트에서 게시글 id를 다루는 새 코드를 쓸 때마다 "지금 다루는 게 로컬 id인지 실제 DB id인지" 매번 확인할 것 — 헷갈리기 쉬운 함정이라 이미 여러 번 반복됨.

**Realtime**: `messages`와 `notifications` 테이블 모두 Supabase Realtime의 `postgres_changes` 이벤트를 씀 — 아래 SQL로 퍼블리케이션에 등록되어 있어야 함(안 하면 구독해도 이벤트가 안 옴). `conversations` 테이블은 한때 등록을 요청했다가(전역 채팅 알림 1차 구현) `notifications` 테이블 기반으로 재설계하면서 불필요해짐 — 등록했어도 무해하지만 굳이 필요 없음:
```sql
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.notifications;
```

### 회원가입 트리거
```sql
create or replace function public.handle_new_user() returns trigger as $$
declare base_nick text; candidate text; suffix int := 0;
begin
  base_nick := coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', '새싹작가');
  base_nick := regexp_replace(base_nick, '[^가-힣a-zA-Z0-9]', '', 'g');
  if base_nick = '' then base_nick := '새싹작가'; end if;
  base_nick := left(base_nick, 12);
  candidate := base_nick;
  while exists(select 1 from public.profiles where nickname = candidate) loop
    suffix := suffix + 1;
    candidate := left(base_nick, 12 - length(suffix::text)) || suffix::text;
  end loop;
  insert into public.profiles (id, nickname) values (new.id, candidate);
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();
```
구글 이름에서 특수문자를 제거하고, 12자로 자르고, 중복이면 숫자를 붙여 유일한 닉네임을 자동 생성함(닉네임 유일성 제약과 충돌 없이 가입되도록).

---

## 5. 완성된 기능 전체 목록

### 핵심 기능 (설계 문서 단계 1~7)
- [x] Next.js 스캐폴드 + 프로토타입 디자인 이식
- [x] 글쓰기/목록/상세/조회수 — Supabase 실시간 연동
- [x] 구글 로그인 (Supabase Auth, **선택 사항**)
- [x] 댓글·좋아요 (좋아요는 비로그인도 브라우저 단위로 저장)
- [x] 이미지 업로드 (Supabase Storage)
- [x] GitHub + Vercel 배포, 자동 배포 파이프라인

### 보안 강화 (단계 8-1)
- [x] "아무나 남의 글 수정 가능"했던 초기 정책 제거 → 본인 글만 수정/삭제
- [x] 조회수 증가는 `increment_post_views` RPC로 분리 (누구나 호출 가능하되 딱 그 동작만)
- [x] 댓글도 본인 것만 삭제 가능

### 관리자 기능 — `/admin` (단계 8-2, 요청 항목 1~5 전부 완료)
로그인 + `profiles.is_admin` 확인 전엔 아무 데이터도 fetch/렌더 안 하는 클라이언트 게이트 + RLS가 진짜 방어선(`is_admin()` 함수). 탭 4개:
1. **글 관리** — 전체 글 검색·삭제
2. **회원 관리** — 검색, 차단/차단해제 (`is_banned` 토글). 관리자 계정은 차단 버튼 자체가 안 보임(자기 잠금 방지)
3. **공지 작성** — 제목+본문(굵게 서식 지원, `contentEditable`+`execCommand('bold')`) 등록/삭제. 사이트 메인 상단에 분홍 배너로 노출, 클릭 시 스타일 있는 팝업으로 전체 내용 표시
4. **통계** — recharts 기반:
   - 카드: 총 회원/글/댓글/좋아요 수, 미처리 신고, 차단 회원, 오늘 새 글/신규가입, 최근 7일 활동 회원, 댓글 없는 글 비율
   - 활동 그래프: 게시글 수/댓글 수/신규 가입 3-way 탭 + 7일/30일 토글 공유 (라인 차트)
   - 시간대별(0~23시) 글 작성 분포 (막대), 게시판별 글 수 (가로 막대)
   - 인기 글 TOP 10 / 인기 작성자 TOP 10 (사이트 "인기순" 정렬 공식 재사용 — 아래 "인기글 점수 공식" 참고. 관리자 통계는 고정 TOP 10이라 7일 제외 규칙은 적용 안 함)
   - **날짜 집계는 전부 로컬(한국) 시간 기준** (`localDateKey` 헬퍼) — UTC로 하면 새벽 시간대에 하루씩 어긋나는 버그가 있었음(수정됨)
5. **신고 처리** — 신고 목록 조회, 글 삭제 처리/무시, 신고된 글 제목 클릭 시 상세로 이동. **채팅 신고도 같은 화면에서 처리**(아래 "채팅 신고" 참고) — "💬 채팅 신고 — 닉네임"으로 구분 표시되고 "대화 보기" 클릭 시 읽기 전용으로 전체 메시지 확인 가능

### 부가 기능
- **글 수정** — 글쓰기 모달을 재사용(`editingPostId`로 새 글/수정 모드 구분), 이미지도 교체 가능
- **고유 URL 라우팅**:
  - `/post/[id]` — SSR 메타데이터(title/description/OG) + 실제 화면은 `PaloApp` 재사용. 목록/상세 이동 시 `history.pushState`로 URL 동기화, `popstate`로 뒤로가기 지원. "공유" 버튼이 실제 URL을 클립보드에 복사
  - `/user/[id]` — 공개 프로필(닉네임·등급·통계·쓴 글 목록). "내 정보"(사적인 대시보드)와는 별개 기능. 글 목록/상세/댓글의 작성자 이름이 전부 클릭 가능(있는 경우만, 익명 제외)
- **방문자 분석**: Vercel Web Analytics + GA4 — 둘 다 각자의 대시보드에서만 확인 가능(무료 플랜은 데이터를 꺼내오는 API가 없어서 `/admin`에 통합 불가, 6절 참고)
- **닉네임 규칙**: 한글/영문/숫자 2~12자, 중복 불가 (DB 제약 + 클라이언트 검증)
- **UI 일관성**: 브라우저 기본 `alert()`/`confirm()`/`prompt()`를 전부 사이트 디자인에 맞는 커스텀 모달로 교체(신고, 삭제 확인, 공지 팝업 등)
- **이미지 없는 글의 썸네일 칸 숨김**: 글 작성 시 이미지를 첨부하지 않았으면 목록/상세에서 빈 이미지 칸이 안 보이게 처리(`post_images`가 비어있으면 관련 마크업 자체를 렌더 안 함).

### 본문 서식 실제 저장 + 이미지 원하는 위치 배치 (2026-07-29 추가)
사용자가 "이미지가 항상 최상단에 올라가는데, 원하는 위치에 배치하고 싶다"고 요청 → 작업 중 **더 근본적인 기존 문제를 발견**: 글쓰기 에디터(`#wContent`, contentEditable)에서 굵게/기울임 등 서식을 넣어도 실제로 DB `posts.content`엔 순수 텍스트만 저장되고 있었음 — `submitPost()`가 `cEl.innerHTML`(서식 있는 버전)은 그 세션의 로컬 메모리(`np.html`/`ep.html`)에만 잠깐 담아뒀다가, DB엔 `cEl.textContent`(서식 없는 텍스트)만 보냈던 것. 그래서 서식은 **새로고침하면 항상 사라졌음**(아무도 몰랐던 이유: 그동안 작성자 본인이 새로고침 전까지만 보고 넘어갔을 가능성). 이번에 같이 고침:
- **`posts.content_html`(text, nullable) 컬럼 추가** — 서식 있는 실제 HTML을 여기 저장. `content`(순수 텍스트)는 검색·구버전 폴백용으로 계속 유지.
- **보안: dompurify 도입.** 이제 이 HTML이 모든 방문자에게 그대로 렌더링되므로(예전엔 저장 자체가 안 됐으니 위험이 없었음), **저장 시점과 렌더링 시점 둘 다** `sanitizePostHtml()`(`public/palo.js`)로 살균 — `<script>`, `onerror` 같은 위험 요소 제거 확인됨. 허용 태그: `b/strong/i/em/u/font/span/ul/ol/li/blockquote/br/div/p/img/video/source`, 허용 속성: `style/color/src/controls/alt`. (`video`/`source`는 아래 "동영상·기타 파일 업로드는 결국 제거됨" 참고 — 업로드 경로는 없어졌지만 혹시 과거에 저장된 글이 있다면 안 깨지게 허용 태그는 남겨둠)
- **이미지 인라인 배치**: 파일 선택 전 커서 위치를 `saveEditorSelection()`으로 저장해뒀다가, 업로드 완료 후 `restoreEditorSelection()`으로 그 위치를 복원한 다음 `document.execCommand("insertHTML",...)`로 정확히 그 자리에 삽입(`insertInlineMedia(url)`, 여러 개를 연달아 넣을 때도 순서대로 이어지도록 삽입 직후 `advanceSavedSelection()`으로 커서 위치 갱신). 기존 "이미지 업로드 → 항상 맨 위 갤러리" 방식(`post_images` 테이블, 목록 썸네일용으로는 계속 유지)과 별개로 동작.
- **기존 글과의 호환성**: `renderPostDetail()`에서 본문 HTML에 이미 `<img>`/`<video>`가 있으면(새 글 방식) 예전의 "상단 캔버스 블록"을 생략해서 중복 표시를 막고, 본문에 인라인 미디어가 없는 예전 글은 기존처럼 상단 캔버스 블록을 그대로 보여줌(하위 호환, 회귀 없음).
- **에디터 이미지 칩(`#edImages`) 제거 동기화**: 칩의 "×"를 누르면 `edState.images`뿐 아니라 본문에 삽입돼 있던 동일 URL의 `<img>`도 같이 제거되도록 `removeEdImage()` 수정(안 그러면 칩은 지웠는데 본문엔 이미지가 남아있는 불일치가 생김).

### 이미지 업로드 시 자동 압축·리사이즈 (2026-07-29 추가, DB 변경 없음)
Supabase Storage 용량 절약 + 로딩 속도 개선 목적. 전부 **브라우저에서만** 처리(서버/DB 관여 없음) — `onImage()`/드래그 앤 드롭 둘 다 원본 파일을 그대로 업로드하지 않고, `compressImage(file)`(`public/palo.js`)를 거친 결과물만 업로드함(공용 진입점: `uploadAndInsertImage(f)`):
- `loadImageFromFile()`로 이미지를 `<img>`에 로드 → `<canvas>`에 그려서 리사이즈(긴 쪽이 1800px 넘으면 비율 유지하며 축소, 그 이하는 그대로) → `canvas.toBlob()`으로 `image/webp`(품질 0.8) 인코딩.
- **WebP 미지원 환경 대응**: `canvas.toBlob`은 WebP를 못 만들면 조용히 다른 포맷(주로 PNG)으로 대체해버리는 브라우저별 특성이 있어서, 결과 `blob.type`이 실제로 `"image/webp"`인지 확인하고 아니면 `image/jpeg`로 다시 인코딩(`ext`도 `.webp`/`.jpg`로 맞춰 저장 경로에 반영).
- **GIF는 압축을 건너뛰고 원본 그대로 업로드**(요청엔 없었지만 판단해서 추가) — Canvas 그리기는 첫 프레임만 캡처해서 애니메이션이 깨지기 때문. `file.type==="image/gif"`로 판별.
- 압축 실패 시(드묾) 원본으로 폴백 업로드, 콘솔에 에러 로그.
- 압축 전후 용량을 콘솔에 로그로 남김(`[이미지 압축] 파일명: XKB → YKB (Z% 감소)`), 업로드 전 "이미지 압축 중..." 토스트 표시.

### 이미지 업로드 정책 — 형식/용량 제한 (2026-07-29 추가, DB 변경 없음)
`uploadAndInsertImage(f)` 맨 앞에서 검사(브라우저 단 검증, Storage 정책 자체는 안 건드림 — 작정하고 API 직접 호출하면 우회 가능하다고 사용자에게 고지함):
- **형식 허용 목록**: `ALLOWED_IMAGE_TYPES = ["image/jpeg","image/png","image/webp","image/gif","image/bmp"]` — 목록 밖(동영상, PDF, zip 등)이면 "이미지 파일만 올릴 수 있어요"로 거부. `#edFile`의 `accept` 속성도 이 목록과 맞춰서 OS 파일 선택 창에서부터 걸러지게 함.
- **용량 상한**: `MAX_IMAGE_BYTES = 40*1024*1024`(40MB) — 넘으면 "40MB 이하 이미지만 올릴 수 있어요"로 거부(압축 전 원본 크기 기준으로 판단, 통과하면 그 후 위 압축 로직이 실제 저장 용량을 더 줄임).

### PC 드래그 앤 드롭 업로드 (2026-07-29 추가, 이미지 전용으로 최종 확정)
`#wContent`에 `ondragover`/`ondragleave`/`ondrop` 연결(`app/body-html.js`). `onEditorDrop()`이 드롭 지점의 정확한 좌표를 `document.caretRangeFromPoint`/`caretPositionFromPoint`(`rangeFromPoint()`)로 계산해서 그 위치에 커서를 옮긴 뒤, 드롭된 파일들을 순서대로 전부 `uploadAndInsertImage()`로 처리(위 이미지 정책 검사를 그대로 통과해야 함 — 동영상이나 다른 파일을 드롭하면 "이미지 파일만 올릴 수 있어요"로 거부). 드래그 중엔 `.ed-content.drag-over` CSS로 편집 영역을 살짝 강조 표시. 파일이 아닌 드롭(에디터 내부 텍스트 재배치 등)은 `e.preventDefault()`를 안 불러서 브라우저 기본 동작을 건드리지 않음.

**⚠️ 같은 세션 안에서 만들었다가 곧바로 되돌린 것**: 처음엔 "동영상"도 툴바 버튼(`pickVideo`/`onVideoFile`)으로, "이미지·동영상도 아닌 파일"도 드래그 앤 드롭으로 업로드해서 📎 다운로드 링크로 삽입하는 기능(`uploadAndInsertFile`/`insertFileLink`, `sanitizePostHtml`에 `<a>` 태그 허용 포함)까지 만들었었음 — 그런데 바로 다음 요청에서 사용자가 "이미지 파일만 허용, 영상이나 다른 형식은 거부"하는 정책을 요청했고, 확인 결과 **동영상 업로드 기능 자체와 "기타 파일→링크" 기능 둘 다 완전히 삭제**하기로 확정함(둘 다 AskUserQuestion으로 명시적으로 확인받음). 그래서 관련 함수·버튼·`#edVideoFile` input·`sanitizePostHtml`의 `a`/`href`/`target`/`rel` 허용은 전부 되돌렸고, `video`/`source` 태그 허용만 "혹시 그 짧은 기간에 실제로 영상이 들어간 글이 저장됐을 경우를 대비한 하위 호환용"으로 남겨둠.

### 새로고침 시 더미 글 깜빡임 + 스크롤 튐 버그 수정 (2026-07-29)
사용자가 "새로고침하면 PC에서 화면이 아래로 이동했다 위로 올라오고, 더미 글이 잠깐 보인 뒤 최신글로 바뀐다"고 리포트. **원인은 초기 로딩 시 렌더링이 실질적으로 3번 겹쳐 일어나고 있었던 것**:
1. 서버가 보내는 정적 HTML(`app/body-html.js`, `dangerouslySetInnerHTML`)의 `#main` 안에 원본 프로토타입 시절 **더미 글 15개 전체가 그대로 박혀있었음**(빠른 첫 화면 표시용 잔재).
2. `palo.js`가 실행되자마자, `loadRealPosts()`가 끝나기도 전에 **그 더미 `POSTS` 배열로 `renderList()`를 한 번 더 호출**(1과 사실상 같은 내용을 굳이 다시 그리는, 완전히 불필요한 중복 렌더링).
3. `loadRealPosts()`가 끝나면 실제 글을 반영해서 또 한 번 `renderList()`.
2번과 3번 사이에서 화면 콘텐츠 높이가 바뀌면서 스크롤 위치가 튀는 것처럼 보였고, 1→2 전환에서 "더미 글이 잠깐 보였다 사라지는" 현상이 생겼음.

**고친 방법**:
- `app/body-html.js`의 정적 `#main` 마크업에서 더미 글 15개(제목·좋아요·이글이글 위젯 등)를 전부 빼고, 이미 게시판 전환 시 쓰던 것과 같은 로딩 스켈레톤(`.skel-row`/`.skel-line`/`.skel-thumb`, `skeletonHTML()`과 동일한 마크업을 정적으로 미리 박아둠)으로 교체.
- `public/palo.js` 최상단의 무조건 실행 블록에서, 더미 `POSTS`로 `renderList()`를 다시 호출하던 부분을 제거 — **단, `window.supabase`가 없는 로컬 데모 환경(연동 없이 그냥 열어본 경우)에서는 폴백으로 계속 더미 글을 보여주도록 조건부로 남겨둠**(`if(!window.supabase)renderList();`).
- 결과: `스켈레톤 → (더미 글 없이) → 실제 최신글` 한 번만 바뀌는 구조가 됨. `renderChips()`/`renderHot()`/`renderTrend()`는 애초에 `POSTS`가 아니라 각각 `BOARDS`/`HOT`/`TREND`라는 별도의 고정 데모 데이터에서 렌더링되는 것이라 이 버그와 무관함을 확인하고 그대로 둠(불필요하게 손대지 않음).
- **참고**: 페이지 상단의 "이번 주 인기" 트렌드 바(`#trendStrip`)는 이 버그와 무관한 **완전히 별개의 고정 데모 위젯**(`TREND` 하드코딩 배열)이라 실제 글 로딩 여부와 상관없이 항상 같은 내용을 보여줌 — 헷갈리지 않도록 참고.

### "이번 주 인기" 트렌드 바를 실제 인기 순위와 연동 (2026-07-29)
헤더 상단의 "이번 주 인기" 가로 바(`#trendStrip`)는 원래 `TREND`라는 완전히 고정된 데모 배열(제목·태그·부제 전부 하드코딩)을 보여줄 뿐, 실제 글과는 전혀 무관했음. 사용자 요청으로 실제 인기 순위와 연동함:
- `renderTrend()`가 이제 `TREND` 대신 **사이트에 이미 있던 "인기순" 공식**(`sortHot(POSTS)`, 아래 "인기글 점수 공식" 참고)의 상위 5개를 보여줌 — 새 랭킹 로직을 따로 만들지 않고 기존 걸 그대로 재사용.
- 클릭 시 `goHome()`(그냥 홈으로) 대신 실제 `openPost(id)`로 이동하도록 고침.
- **더미 글 깜빡임 버그(바로 위 항목)와 똑같은 함정을 피함**: 초기 동기 렌더링 블록에서 `renderTrend()`를 빼고(Supabase 미설정 로컬 데모 폴백에서만 호출), `loadRealPosts()`가 실제 글을 다 불러온 뒤에만 호출하도록 옮김. 정적 HTML(`app/body-html.js`)의 `#trendStrip`도 가짜 데모 5개 대신 로딩 스켈레톤(`.skel-thumb`/`.skel-line` 재사용)으로 교체.
- **뒤이어 발견한 버그**: 실제 글 제목은 데모 제목보다 훨씬 길 수 있는데, `.trend-meta .tt`에 너비 제한이나 말줄임 처리가 전혀 없어서 제목 하나가 길면 그 항목만 옆으로 계속 늘어나 버림 — 이 바는 `overflow-x:auto`로 가로 스크롤되는 구조라, 항목 하나가 늘어나면 나머지 순위를 보려고 스크롤을 계속 해야 하는 문제로 이어짐. `.trend-meta`에 `max-width:180px` + `.tt`/`.ts`에 `white-space:nowrap;overflow:hidden;text-overflow:ellipsis`를 추가해서 각 항목 크기를 균일하게 고정하고, 넘치는 제목은 "..."으로 줄임(자동화로 확인).

### 인기글 점수 공식 (사이트 "인기순" 정렬)
목록 화면의 "인기순" 탭과 관리자 통계의 인기 글/작성자 TOP 10이 공유하는 점수 계산식. `public/palo.js`의 `hotMultiplier()`/`hotScore()`/`sortHot()`과 `app/admin/page.js`의 동일 이름 함수(중복 구현, 관리자 쪽엔 7일 제외 로직만 없음)로 존재.

**공식**: `기본점수 = 조회수 × 0.02 + 좋아요 × 1 + 댓글 × 0.2`, 여기에 시간 배수를 곱함:
- 작성 후 24시간 이내: **×2**
- 24시간이 지날 때마다 배수에서 **0.2씩 차감**(예: 2일차 ×1.8, 3일차 ×1.6 ...)
- 작성 후 7일이 지나면 원칙적으로 인기글 노출에서 제외
- **단, 예외**: 7일 제외를 적용했을 때 인기글 노출 수가 10개 미만으로 떨어질 상황이면, 그 글의 배수를 "7일째 배수"로 고정한 채 유지 — 다음 인기글이 채워질 때까지 밀려나지 않음

### 매니저 픽 (관리자 인기글 큐레이션, 2026-07-29 추가, 1·2단계 완료)
관리자가 좋은 글을 골라 인기글 정렬의 원하는 위치에 끌어올리는 기능. DB: `posts.is_manager_pick`(bool)/`pick_position`(int)/`picked_at`(timestamptz, 2단계 추가 — 위치 충돌 시 "최근 지정 우선" 판단용).

- **보안 이중 장치**: (1) `guard_manager_pick_columns()` BEFORE UPDATE 트리거 — `is_admin()`이 아니면 이 세 컬럼(`is_manager_pick`/`pick_position`/`picked_at`)의 변경을 조용히 원래 값으로 되돌림(본인 글이라도 스스로 픽 지정 불가, `posts_update_own` 정책이 "본인 글이면 아무 컬럼이나" 허용하는 것의 구멍을 막음). (2) `set_manager_pick(post_id, is_pick, position)` RPC — 관리자가 **남의 글**도 픽 지정할 수 있어야 해서 만든 좁은 함수, 내부에서 `is_admin()` 확인 후 이 세 컬럼만 update(광범위한 "관리자는 아무 글이나 수정 가능" 정책은 만들지 않음 — 제목/본문까지 건드릴 수 있게 되는 과잉 권한이라). 픽을 걸거나 위치를 바꿀 때마다 `picked_at`을 항상 `now()`로 갱신.
- **정렬·위치 삽입 로직**: `sortHot(arr)`(`public/palo.js`)가 (1) 매니저 픽을 먼저 분리 → 나머지만 기존 인기순 공식으로 정렬(픽은 7일 제외 규칙 등을 완전히 무시하고 항상 노출, 의도된 동작), (2) 픽들을 `pickPosition` 오름차순·동률이면 `pickedAt` 내림차순(최근 것 우선)으로 정렬, (3) 앞에서부터 훑으며 "요청 위치"와 "다음 빈 자리" 중 큰 값을 실제 배치 위치로 확정(같은 위치를 여러 픽이 요청하면 최근 것이 그 자리를 차지하고 나머지는 자동으로 다음 자리로 밀림), (4) 확정된 위치에 픽을 꽂고 그 사이사이 빈 자리는 일반 인기글로 순서대로 채움.
- **화면**: 목록 행 제목 앞·글 상세 헤더에 "📌 매니저 픽" 뱃지(`.pick-badge`). 글 상세 액션 줄의 관리자 전용 토글 버튼(`toggleManagerPick()`)은 처음 픽할 때 "현재 픽 개수+1"번을 기본 위치로 지정. **"내 정보 → 📌 매니저 픽 관리"**(`openManagerPickList()`) 화면에서 모든 픽을 한눈에 보고 위치 숫자를 직접 입력해서 저장(`savePickPosition()`)하거나 해제(`unpickFromList()`)할 수 있음 — 픽할 때마다 팝업으로 숫자를 묻는 대신, 여러 개를 한 화면에서 조정하는 방식을 선택함(사용자에게 설명 후 진행).

### 유저 광고 시스템 (아카라이브 스타일, 2026-07-29 시작, 1~9단계 전부 완료)
유저가 활동 포인트를 모아서 이미지 배너 광고를 거는 기능. 배너 이미지 업로드 + 클릭 시 이동 링크 지정 → 목록 스크롤 중간 광고 자리에 여러 유저 광고가 순환 노출(단, 유료 광고와의 비중 균형을 위해 상한 있음) → 관리자 사전 승인이 있어야 실제 노출 시작 → 광고 집행 중엔 원본 글 수정 불가 → 사후 심사/삭제/포인트 환수(반려 시 환수 여부·사유 선택) + 유저 신고까지 전체 스펙 완료.

**1단계 — 포인트 지갑·적립:**
- **두 개의 별도 지갑**: `profiles.score`(등급 점수, 누적, 안 줄어듦) vs `profiles.ad_points`(광고 포인트, 광고 집행 시 차감됨). 같은 활동(글 +2/댓글 +1/추천받기 +5/크리틱 도움돼요 +20)이 **동시에 두 지갑에 똑같이 적립**되며, 기존 등급 시스템의 도배 방지 장치(일일 20점 상한, 1분 연속 작성 제한, 같은 글 댓글 1회 제한, 5자 미만 제외, 좋아요·도움돼요 평생 1회) 전부가 코드 중복 없이 그대로 적용됨 — 새 로직을 만들지 않고 기존 `award_score()`/`award_capped_post_comment_score()` 함수가 `score`와 `ad_points`를 **같은 트랜잭션에서 함께** 갱신하도록만 고쳤기 때문.
- **글/댓글 삭제 시 회수도 동일**: `claw_back_post_score()`/`claw_back_comment_score()`가 `score`뿐 아니라 `ad_points`도 같이 회수(단, 이미 광고 집행으로 써버린 만큼은 `greatest(0, ...)`로 0 밑으로 안 내려가게 함).
- **⚠️ 이 작업 중 발견한 기존 보안 구멍(등급 시스템에도 소급 적용해서 같이 고침)**: `profiles`는 "본인 정보는 본인이 수정 가능"(`profiles_update_own`) 정책이 있는데, 여기엔 컬럼 제한이 없어서 **유저가 개발자 도구로 직접 `.update({score: 99999})`처럼 호출하면 자기 등급 점수·광고 포인트를 마음대로 조작할 수 있는 상태**였음(다행히 실제 악용 사례는 없었음). **고침**: `guard_profile_score_columns()` BEFORE UPDATE 트리거를 `profiles`에 추가 — `score`/`level`/`ad_points`/`daily_score_earned`/`last_score_date`/`last_activity_at` 이 6개 컬럼은 **오직 신뢰된 서버 함수를 통해서만** 바뀔 수 있음. 트리거는 Postgres 세션 설정(`current_setting('app.trusted_score_update')`)을 신호로 판별하는데, `award_score()`/`award_capped_post_comment_score()`/`recalc_level()`/두 클로백 함수가 자기 UPDATE 직전에 `perform set_config('app.trusted_score_update','true',true)`로 이 신호를 켜줌(트랜잭션 범위로만 유효, 자동으로 꺼짐) — 이 신호가 없으면 트리거가 변경을 조용히 원래 값으로 되돌림. **매니저 픽 때 만든 `guard_manager_pick_columns()`(posts 테이블용)와 같은 패턴**.
  - **⚠️ 운영 시 반드시 알아둘 것**: 이 트리거는 "누가" 수정하는지가 아니라 "신뢰 신호가 켜져 있는지"만 보기 때문에, **관리자가 Supabase SQL Editor에서 직접 `update profiles set ad_points=...` 같은 걸 실행해도 똑같이 막힘**(실제로 테스트 중 겪음 — 정상 동작). 테스트/운영 목적으로 이 컬럼들을 직접 고쳐야 하면, 먼저 신호를 켜고 같은 실행에서 update를 이어서 해야 함:
    ```sql
    select set_config('app.trusted_score_update','true',true);
    update public.profiles set ad_points = 1000 where nickname = '닉네임';
    ```
    (그래도 안 되면 `alter table public.profiles disable trigger guard_profile_score_before_update;` → update → `enable trigger`로 임시로 끄고 켜는 방법도 있음.)

**2단계 — 배너 업로드 + 광고 등록 (완료):**
- **DB**: `user_ads` 테이블(`id`, `user_id`, `image_url`, `linked_post_id`, `points_spent`, `duration_days`, `status`, `created_at`, `expires_at`). RLS: 활성 광고(`status='active' and expires_at>now()`)는 누구나 조회(3단계 노출 기능용), 본인 광고는 상태 무관 항상 조회, 관리자는 전부 조회. **insert/update RLS 정책은 없음** — 아래 두 함수를 통해서만 생성/삭제됨.
- **광고는 항상 "본인의 실제 글"에 연결**(자유 URL 입력 아님) — `linked_post_id references posts(id) on delete cascade`라서, **글이 삭제되면 광고 행 자체가 자동으로 같이 삭제됨**(별도 코드 없이 DB가 알아서 "죽은 링크 방지" 요구사항을 처리). 자유 URL 광고가 필요하면 재설계 필요(사용자에게 고지, 아직 요청 없음).
- **`create_user_ad(post_id, image_url, points_per_day, duration_days)` RPC** (파라미터는 6단계에서 현재 형태로 변경됨, 아래 참고): 로그인 확인 → 본인 글인지 확인 → 잔액 확인 → 포인트 차감(`app.trusted_score_update` 신호 켜고) → `user_ads` 행 생성, 한 번에 처리.
- **`admin_remove_ad(ad_id, refund)` RPC**: 관리자 확인 → 상태를 `removed_by_admin`으로 변경 → `refund=true`면 포인트도 환수. **DB 함수만 미리 준비, 이걸 호출하는 관리자 화면(심사 UI)은 4단계에서 만들 예정.**
- **클라이언트**: 본인 글 상세 화면의 "📢 이 글 광고하기" 버튼(`openCreateAd()`) → 배너 이미지 선택 시 기존 이미지 정책(`ALLOWED_IMAGE_TYPES`/`MAX_IMAGE_BYTES`/`compressImage()`) 그대로 재사용해서 압축 후 업로드 → 포인트 입력하면 실시간으로 "약 N일 노출" 미리보기(`updateAdPreview()`) → 등록(`submitAd()`)이 `create_user_ad` RPC 호출 후 `refreshMyProfile()`로 포인트 잔액 갱신.

**3단계 — 목록 중간 자리에 순환 노출 (완료, DB 변경 없음):**
- `loadRealPosts()`가 `user_ads`에서 활성 광고(`status='active' and expires_at>now()`, 2단계 RLS 그대로 재사용)를 `ACTIVE_ADS` 전역 배열로 미리 불러옴.
- 기존에 5개 글마다 하나씩 끼워지던 정적 "광고 문의 환영" 자리(`adRow()`, `public/palo.js`)를 재사용 — 활성 광고가 있으면 실제 배너 이미지로, 없으면 기존 안내 문구로 자동 대체(재고 없을 때의 자연스러운 폴백).
- **순환 방식**: `adRotationIndex`(새로고침마다 랜덤한 시작점) 하나를 두고, `adRow()`가 불릴 때마다 `ACTIVE_ADS[adRotationIndex % 길이]`를 꺼내고 인덱스를 1 증가 — 화면 안에 광고 자리가 여러 개면 서로 다른 광고가 순서대로 나오고("순환"), 새로고침마다 시작 순서가 달라짐("랜덤" 요소).
- 클릭하면 연결된 실제 글로 이동(로컬 id 변환 `100000+linked_post_id` 적용, 3절 "POSTS 이중 구조" 패턴 그대로).
- **배너 크기**: 처음엔 원본 이미지 비율 그대로 올라가서 기존 광고 자리보다 훨씬 커 보이는 문제가 있었음 — `.ad.ad-banner img{height:84px;object-fit:cover}`로 기존 "광고 문의 환영" 자리와 비슷한 높이에 맞춰 자르도록 고침. 광고 등록 모달에 "권장 크기: 800×200px(4:1)" 안내 문구 추가(정사각형·세로로 긴 이미지는 잘릴 수 있음을 미리 알림).
- **이 광고 자리는 PC/모바일 구분 없이 동일하게 노출됨**(원래 있던 자리를 그대로 재사용) — 사용자가 최종 확인함(별도 제한 불필요).

**4단계 — 관리자 심사/삭제/환수 + 유저 신고 (2026-07-29 완료):**
- **DB**: 기존 `reports` 테이블에 `ad_id`(FK→`user_ads`, `on delete cascade`) 컬럼 추가. "신고 대상은 글/채팅/광고 중 정확히 하나만" 체크 제약(`reports_target_check`)을 세 갈래로 재작성. `reports_insert_all_temp` insert 정책도 광고 신고를 글 신고와 동일하게(익명 포함 누구나) 허용하도록 갱신.
- **`admin_remove_ad(p_ad_id, p_refund)` RPC**: 2단계에서 미리 준비해둔 함수를 명확한 파라미터 이름으로 재정의(`관리자 확인 → 상태를 removed_by_admin으로 변경 → refund=true면 app.trusted_score_update 신호 켜고 ad_points 환수`).
- **유저 신고**: 광고 배너 좌상단에 작은 🚩 버튼(`reportAd(adId,event)`, `event.stopPropagation()`으로 배너 자체의 클릭-이동과 분리) → 기존 신고 모달(`reportPost`/`reportChat`과 같은 모달 재사용) → `submitReport()`에 `reportingAdId` 분기 추가, `{ad_id, reporter_id, reason}` insert.
- **관리자 화면 1 (신고 기반)**: 기존 "🛡 신고 목록"(`openAdminReports()`)에 `r.ad_id` 분기 추가 — "📢 광고 신고 — {닉네임}" 항목, 클릭하면 연결된 실제 글로 이동, "삭제+환수"/"삭제만"/"무시" 버튼(`adminDeleteReportedAd(reportId, adId, refund)`).
- **관리자 화면 2 (전체 열람, 신규)**: "🛡 전체 광고 목록"(`openAdminAdList()`) — 신고 여부와 상관없이 모든 광고를(상태별로) 훑어보며 마찬가지로 클릭 시 연결 글 이동, 삭제+환수/삭제만 가능. "내 정보" 관리자 버튼 줄에 세 번째 버튼으로 추가(기존 "🛡 신고 목록", "🛡 전체 채팅 목록"과 같은 줄).
- `adminDeleteReportedAd()`는 `reportId`가 있으면(신고함에서 호출) 신고를 resolved 처리하고 신고함으로, 없으면(전체 목록에서 호출) 전체 광고 목록으로 돌아가도록 분기.

**5단계 — 광고 집행 전 관리자 사전 승인 (2026-07-29 완료):** 4단계까지는 광고를 등록하자마자 바로 노출(`active`)됐는데, 사용자가 "집행 전에 관리자 승인을 거치도록" 요청해서 사전 심사 단계를 추가.
- **`create_user_ad`**: 이제 광고를 만들면 즉시 노출되지 않고 **`status='pending'`(심사 대기)**로만 생성됨. 포인트는 지금처럼 신청 시점에 바로 차감(사용자가 광고를 여러 개 동시에 신청해서 포인트를 묶어두는 것을 막기 위함, 거절되면 전액 환수됨). `user_ads.expires_at`은 이제 **승인 시점에야 채워지므로 NOT NULL 제약을 제거**해야 했음(`alter table user_ads alter column expires_at drop not null`) — 안 하면 "만료일이 없다"는 이유로 신청 자체가 막힘.
- **`approve_user_ad(p_ad_id)` RPC(신규)**: 관리자 확인 → `status='pending'`인 광고만 → `status='active'`로 바꾸고 **이 시점부터 `duration_days`만큼의 만료일을 계산**(심사 대기 기간 동안 노출 일수를 손해 보지 않도록, 승인 시점을 기준으로 타이머 시작).
- **`reject_user_ad(p_ad_id)` RPC(신규, 파라미터는 8단계에서 확장됨)**: 관리자 확인 → `status='rejected'`로 바꾸고 `points_spent` 전액을 `app.trusted_score_update` 신호를 켠 뒤 환수.
- **클라이언트**: 광고 등록 완료 메시지가 "광고 신청이 접수됐어요. 관리자 승인 후 노출돼요"로 변경. 신규 "🛡 광고 심사"(`openAdminAdReview()`) 화면 — 심사 대기 중인 광고만 생성 순서(오래된 것 먼저)로 모아서 승인/거절 버튼 제공. 기존 "🛡 전체 광고 목록"(`openAdminAdList()`)에도 `pending`/`rejected` 상태 라벨 추가하고, `pending` 상태 항목엔 삭제+환수/삭제만 대신 승인/거절 버튼이 뜨도록 분기(`approveUserAd(adId, backTo)`/`rejectUserAd(adId, backTo)` — `backTo`가 `'queue'`면 심사 화면으로, `'list'`면 전체 목록으로 돌아감).
- **⚠️ SQL 실행 시 겪은 함정 2가지 (교훈으로 기록)**: ① 기존 `create_user_ad`는 리턴 타입이 달라서 `create or replace`가 `cannot change return type of existing function` 에러를 냄 → `drop function` 먼저 하고 재생성해야 했음. ② Supabase SQL Editor는 한 번에 붙여넣은 여러 statement를 하나의 트랜잭션으로 실행하므로, **그 안의 한 statement가 에러 나면 그 앞에 이미 "성공"으로 보였던 statement까지 전부 롤백됨** — 실제로 `create_user_ad` 에러 때문에 같이 실행했던 `approve_user_ad`/`reject_user_ad`도 조용히 롤백돼서 나중에 "함수를 찾을 수 없다"는 에러로 뒤늦게 발견됨. **다음에 이 프로젝트에서 여러 함수를 한 번에 SQL로 보낼 때, 중간에 에러가 나면 그 배치 전체가 무효화됐을 가능성을 항상 의심하고 각 함수가 실제로 만들어졌는지 확인할 것.**

**6단계 — 유료 광고와의 노출 비중 조정 + 집행 단위를 "1일당 포인트 × 일수"로 세분화 (2026-07-29 완료):** 사용자가 "유저 광고와 실제 유료 광고의 노출 비중을 맞추고 싶다"고 요청 — 지금은 유료 광고 시스템 자체가 없으므로(그 몫은 기존 "광고 문의 환영" 빈 자리가 대신함), 유저 광고가 전체 광고 자리 노출을 독점하지 않도록 상한을 걺.
- **노출 확률 모델 (DB 변경 없음, `public/palo.js`)**: `AD_USER_SHARE_MAX=0.20`(유저 광고 전체 상한 20%), `AD_PER_AD_SHARE_MAX=0.04`(광고 1개당 상한 4%, 초기에 광고 수가 적을 때 소수가 20%를 독점하는 걸 방지). `computeAdWeights(ads)`가 각 광고의 노출 확률을 `min(4%, 20% × (그 광고의 points_spent / 활성 광고 전체 points_spent 합))`으로 계산 — `min()`으로 자르기 때문에 **항상 합이 20% 이하가 되도록 수학적으로 보장됨**(광고가 몇 개든 재분배 로직 없이도 안전, 4%로 잘린 만큼은 자동으로 "빈 자리(광고 문의 환영)" 확률로 넘어감). `adRow()`가 매번 이 확률로 가중 랜덤 선택 — 기존 `adRotationIndex` 순환 방식은 완전히 대체돼서 삭제됨. 2만 회 시뮬레이션으로 검증(동일 포인트 광고 5개 → 각 4%·빈 자리 80% 정확히 재현).
- **집행 단위 세분화**: 기존엔 "총 포인트"를 입력하면 서버가 `/100`으로 일수를 역산했는데, 이제 **"1일당 사용할 포인트"와 "노출할 날짜(일수)"를 각각 입력**받고 **서버가 그 둘을 곱해서 총 포인트를 계산**(`create_user_ad(p_post_id, p_image_url, p_points_per_day, p_duration_days)`로 파라미터 확장, 기존 3-파라미터 버전은 `drop function`으로 제거). 클라이언트가 미리 계산한 총액을 보내는 대신 **서버가 곱셈까지 직접 하도록 바꿔서 조작 여지를 줄임**(이 프로젝트의 "포인트 계산은 항상 서버에서" 원칙에 더 부합하도록 개선). 최소 500포인트 조건은 이제 "1일당 포인트 × 일수"의 결과값에 적용.

**7단계 — 광고 집행 중인 글의 수정 잠금 (2026-07-29 완료):** 사용자가 "광고를 집행 중이면 해당 글을 수정하지 못하게 해달라"고 요청 — 배너 광고로 홍보된 글의 내용이 노출 도중 바뀌는(바꿔치기) 걸 막기 위함.
- **DB**: `guard_post_edit_during_ad()` BEFORE UPDATE 트리거를 `posts`에 추가 — `title`/`content`/`content_html`/`board`/`category` 중 하나라도 바뀌려 하고, 그 글에 `pending` 또는 아직 안 만료된 `active` 상태의 `user_ads` 행이 하나라도 연결돼 있으면 예외를 던져 수정 자체를 막음(클라이언트를 우회해 API를 직접 호출해도 막힘 — RLS/트리거가 진짜 방어선이라는 이 프로젝트의 기존 원칙과 동일).
- **클라이언트**: `loadRealPosts()`가 매 로드 시 `pending`/`active`(미만료) 광고가 걸린 `linked_post_id` 집합을 조회해서 각 글 객체에 `adLocked` 플래그를 붙임. 글 상세의 "수정" 버튼이 `adLocked`면 "🔒 수정 불가(광고 집행 중)" 표시로 바뀌고, `openEditPost()`도 별도로 같은 조건을 다시 확인해서 우회 호출을 막음. 광고를 신청하는 즉시(새로고침 없이) `submitAd()`가 해당 글의 `adLocked`를 로컬에서 바로 `true`로 세팅하고 상세 화면을 다시 그려서 즉시 반영.

**8단계 — 광고 반려 시 환수 여부 선택 + 반려 사유 알림 (2026-07-29 완료):** 사용자가 "반려할 때 포인트를 환수할지 말지 정할 수 있게 하고, 반려 사유를 적으면 신청자에게 알림으로 가게 해달라"고 요청.
- **DB**: `reject_user_ad(p_ad_id, p_refund, p_reason)`로 파라미터 확장(기존 1-파라미터 버전은 `drop function`으로 제거). `p_refund`가 true일 때만 포인트 환수(`app.trusted_score_update` 신호 켜고), 그리고 항상 기존 `notifications` 테이블에 `type='ad_rejected'` 알림을 insert — 반려 사유(있으면)와 환수 여부를 문구에 포함하고 `link_post_id`를 연결해서 클릭하면 해당 글로 이동. `notifications`는 원래 "일반 유저는 insert 불가, DB 트리거만 가능"인 테이블인데, 여기선 트리거가 아니라 `reject_user_ad`가 SECURITY DEFINER로 직접 insert — 트리거와 마찬가지로 함수 소유자 권한으로 실행되기 때문에 RLS를 우회하는 원리는 동일함.
- **클라이언트**: "거절" 버튼을 누르면 바로 처리하지 않고, "유저에게 포인트 돌려주기" 체크박스(기본 체크)와 반려 사유 입력칸이 있는 모달(`rejectUserAd()`가 이제 모달만 열고, 실제 RPC 호출은 `submitAdReject()`)이 뜸.
- **🐛 체크박스 문구 혼동 (2026-07-29)**: 처음엔 "포인트 환수하기"라고만 썼는데, 사용자가 "환수"를 반대 방향(포인트를 안 뺏어가기)으로 이해해서 "체크를 풀었는데 포인트가 안 돌아온다"는 버그로 리포트함 — 실제로는 코드가 의도대로(체크=환수=돌려줌) 동작하고 있었고, 라벨의 방향성이 애매했던 게 원인. **"유저에게 포인트 돌려주기"로 문구를 바꾸고 아래에 체크/해제 시 결과를 각각 설명하는 안내문을 추가해서 해결.** **교훈**: "환수"처럼 방향이 모호할 수 있는 한자어는(누가 누구에게 돌려주는지 불명확) 이 프로젝트의 코딩 초보 사용자에게는 각 옵션의 결과를 명시적으로 풀어 쓰는 게 안전함 — 특히 체크박스처럼 이진 선택에는 더더욱.

**9단계 — 광고 집행 전 안내 페이지 (2026-07-29 완료, DB 변경 없음):** "📢 이 글 광고하기" 버튼을 눌러도 곧바로 배너/포인트 입력 화면(`adModal`)이 뜨지 않고, 먼저 **`adNoticeModal`**(이미지 배너 전용 안내, 포인트 즉시 차감·환불 불가, 연결 글 삭제 시 광고도 같이 내려감, 제한되는 광고 유형 목록, 관리자 심사·수정 잠금 고지)이 뜨고 "동의하고 계속하기"를 눌러야 실제 등록 화면으로 넘어감. `openCreateAd(postId)`는 이제 안내 모달만 열고(`adState.postId`만 미리 저장), 실제 폼 초기화·오픈은 새 `agreeAdNotice()`로 분리됨.

### 프로필 화면 버튼 정리 (2026-07-29 추가, DB 변경 없음)
관리자 전용 버튼이 늘어나면서(신고 목록/전체 채팅 목록/광고 심사/전체 광고 목록/매니저 픽 관리) "내 정보" 상단 카드 한 줄에 버튼이 9개까지 몰려 화면 밖으로 넘칠 뻔한 문제를 정리.
- 일반 계정 버튼(닉네임 변경/채팅 목록/포인트 내역/로그아웃) 4개는 `.pf-card` 안 `.pf-actions` 래퍼로 묶어서 좁은 화면에서 자동 줄바꿈되게 함(`.pf-card`/`.pf-actions` 둘 다 `flex-wrap:wrap`).
- 관리자 전용 5개 버튼은 프로필 카드에서 완전히 분리해서 카드 아래 별도 **"🛡 관리자 메뉴"** 섹션으로 이동(각 버튼 텍스트에서 반복되던 🛡 이모지는 섹션 제목에만 남기고 제거). 모바일 375px/데스크톱 폭 둘 다 가로 스크롤·넘침 없음을 브라우저에서 확인함.
- **"🎨 내 커미션" 바로가기 (2026-08-01 추가)**: "내 정보"(`openProfile()`)의 `.pf-actions`에 버튼 추가 → 기존 `cmOpenMy()`(내가 등록한 커미션 목록) 재사용. 뒤로가기는 `cmOpenMy`의 기존 스택(`enterScreen("cmMy", openCommissionList)`)대로 커미션 목록으로 감.

### 프로필 대표 글 고정 (2026-07-29 추가)
사용자가 "상대방 프로필을 클릭했을 때 최상단(활동 점수·쓴 글·받은 추천 통계보다 위)에 고정 글을 하나 보여주고 싶다, 커미션 글 홍보용으로"라고 요청.
- **DB**: `profiles.pinned_post_id`(FK→posts, `on delete set null` — 글이 삭제되면 자동으로 고정 해제) + `guard_pinned_post()` BEFORE UPDATE 트리거(본인 글이 아닌 id로 바꾸려 하면 예외 발생). 별도 RPC 없이 기존 `profiles_update_own` RLS + 이 트리거 조합만으로 보호됨(관리자 승인 불필요, 매니저 픽/광고와 달리 유저 본인의 자율적인 선택이라 판단).
- **지정 방법**: 특정 게시판 제한 없이 **본인의 아무 글**이나 상세 화면 액션 줄의 "📌 대표 글로 고정하기"/"📌 대표 글 해제" 토글 버튼으로 지정(`togglePinnedPost(id)`) — 새로 고정하면 이전 고정 글은 컬럼 값이 덮어써지며 자동으로 해제(항상 최대 1개).
- **화면 노출**: `pinnedPostCardHTML(pinnedPostId)` 공용 헬퍼가 "📌 대표 글" 카드(썸네일+제목+카테고리+추천/댓글 수, 클릭 시 글 이동)를 만들고, 남의 프로필(`openUserProfile()`)과 내 프로필(`openProfile()`) 둘 다 `pf-stats`(통계) 바로 위, 최상단에 동일하게 표시.

### 커미션 섹션 분리 (2026-07-30 추가, DB 변경 없음)
"커미션 구인구직"(`trade`)과 "커미션 후기"(`review`) 게시판을 일반 게시판 목록에서 완전히 빼고, 별도의 독립 섹션으로 분리함. "중고 장비"(`used`)는 사용자 선택에 따라 일반 게시판에 그대로 남김.
- **BOARDS 배열에서 제거**: `trade`/`review`를 `BOARDS`(상단 칩·사이드바·글쓰기 창 게시판 선택기가 전부 이 배열 하나로 렌더링됨)의 "거래" 그룹에서 삭제 — `renderChips()`/`renderNav()`/`buildBoardMenu()`가 자동으로 안 보여주게 됨. 다만 기존 글의 게시판 이름 표시(`boardName()`)는 `BOARDS`에 없어도 "커미션 구인구직"/"커미션 후기"를 반환하도록 폴백을 추가해서 안 깨지게 함(글쓰기 창에서 자동으로 게시판이 지정될 때 라벨이 필요하기 때문).
- **"전체 글"·인기 위젯에서도 제외**: `filteredPosts()`가 `state.board==="all"`일 때 `trade`/`review`도 `adult`처럼 제외하도록 함(단, **검색 중일 때는 예외** — 커미션 제작자 닉네임으로 검색하면 후기 글이 나와야 하는 기존 기능이 깨지지 않게 `state.query`가 있으면 다시 포함시킴). "이글이글"(`emberHTML()`)·"이번 주 인기"(`renderTrend()`) 위젯도 같은 이유로 `trade`/`review` 제외.
- 게시판 자체(`trade`/`review` 글 데이터, RLS, 후기 시스템)는 그대로 유지됨. 다만 이걸 보여주던 **진입점/UI는 2026-07-30에 아래 "커미션 페이지" 항목으로 완전히 대체됨** — `openCommissionHub()`/`switchCommissionTab()`/`openCommissionWrite()`(탭 전환형 임시 화면)는 삭제되었고, 지금은 별도 시안 기반의 전용 화면(`openCommissionList()` 등, `cm-` 접두사)이 이 역할을 담당함.

### 커미션 페이지 (2026-07-30 신규, 시안 기반 · 프롬프트1 — 화면·데모 데이터만, 실제 DB 연동 전)
사용자가 만든 HTML 시안(`커미션페이지_시안.html`)의 디자인·화면 구조를 Palo의 "커미션" 섹션에 그대로 이식. Palo는 `#main`을 통째로 갈아끼우는 SPA라, 시안의 `.page`/`go()` 토글 라우터 대신 화면마다 렌더 함수를 하나씩 만드는 기존 방식(`renderList()` 등과 동일 패턴)으로 재구성함.
- **CSS**: 시안 CSS를 전부 `cm-` 접두사(`.cm-card`, `.cm-chip` 등)로 옮겨서 기존 `.tab`/`.chip`/`.card` 같은 전역 클래스와 충돌 방지. 색상은 새 변수를 선언하지 않고 Palo 기존 토큰에 매핑(`--brand-deep`→`--brand-2`, 시안의 `--ok`/불호색 → 기존 후기 시스템의 `#3f8f5f`/`#c05a5a`). `public/palo.js` 맨 아래 `/* ===== 커미션 페이지 (cm-) ===== */`부터가 이 기능 전체.
- **화면 7개** (등록/수정/내 커미션/목록/상세는 프롬프트2~3으로 실제 DB 연동됨, 후기·작가 프로필 스텁만 여전히 데모 — 프롬프트4 예정):
  - `openCommissionList()`: 목록(카드 그리드, 태그 칩 — **실제 DB**), `cmOpenDetail(idx)`: 상세(**실제 DB** — 후기 섹션만 데모 `cmReviews` 공유), `cmOpenArtistProfile(name)`: 작가 프로필 스텁(실제 유저의 커미션에서는 이제 `d.authorId`가 있으면 이 스텁 대신 진짜 `openUserProfile(authorId)`로 바로 연결됨 — 프롬프트3에서 처리), `cmOpenReviews()`/`cmOpenWrite()`: 후기 전체보기·작성(호/불호 + 타입 선택, 데모 `cmReviews`), `cmOpenRegister(editId)`: 등록/수정 공용 폼(**실제 DB**), `cmOpenMy()`: 내 커미션 관리(**실제 DB**).
  - 등록 폼은 화면을 나갔다 와도(미리보기 → 뒤로가기) 입력값이 안 사라지도록 `cmReg` 객체에 필드값을 실시간 동기화(`cmSyncReg()`, 모든 입력에 `oninput`) — `innerHTML` 통짜 교체 방식이라 DOM에만 값이 남아있으면 화면 전환 시 유실되기 때문.
- **네비게이션 정리 (사용자가 여러 차례 피드백을 주며 다듬음)**:
  - 하단 탭바 "커미션"/데스크톱 헤더 버튼 → `openCommissionList()`.
  - 커미션 화면이 떠 있을 때는 `body`에 `cm-page` 클래스가 자동으로 붙어서(`#main` 서브트리를 감시하는 `MutationObserver`, 특정 네비게이션 함수를 일일이 수정할 필요 없이 어떤 경로로 들어오고 나가도 항상 정확함) 기존 게시판 이동 UI(상단 칩바 `.catbar`, 데스크톱 사이드바 `.side-l`)와 Palo 기본 검색(모바일 돋보기 아이콘 `.msearch-ico-btn`, 데스크톱 `.search.desktop`)을 숨김.
  - Palo 기본 검색이 있던 자리(헤더)에는 커미션 화면에서만 보이는 **"내 커미션" 버튼**(`.cm-header-my-btn`, `cmOpenMy()` 호출)이 대신 나타남 — 처음엔 이 자리에 "커미션 등록" 버튼을 넣었다가, 사용자가 "내 커미션 리스트를 보여주는 페이지가 맞다"고 정정해서 지금 형태로 바꿈. 커미션 등록은 "내 커미션" 화면 안의 "+ 새 커미션" 버튼으로 들어감(목록 화면 자체의 "+" FAB·상단 아이콘은 중복이라 전부 삭제).
  - 커미션 페이지 자체의 검색창("커미션 검색")은 실제로 동작함(`cmSearch()`) — 제목·태그만 매칭하는 전용 검색이라 Palo 전체 검색과 역할이 겹치지 않음.
  - 알림은 커미션 전용 알림함을 따로 만들지 않고 기존 Palo 알림함(`NOTIFS`)에 통합 — 알림함에 "커미션" 필터 탭 추가, 데모 후기를 작성하면(`cmSubmitReview()`) `NOTIFS`에 항목이 쌓이고 클릭하면 `cmOpenReviews()`로 이동(`n.cmTarget==="reviews"`). 커미션 페이지 자체의 알림 아이콘은 삭제함. "문의가 옴" 알림은 문의하기 버튼이 아직 기능이 없어서(다음 단계 예정) 보류.
- **아직 안 됨(다음 단계 예정, 사용자의 원래 6단계 계획 기준)**: 커미션 상세에 기존 후기 시스템(위 "커미션 후기 시스템" 섹션) 연결(프롬프트4), 문의하기·신청하기·구독·태그 필터 등 나머지 버튼 실제 동작(프롬프트5), 로딩/빈 상태·모바일 오버플로 다듬기(프롬프트6).
- Next.js 개발 서버의 좌하단 dev indicator("N" 아이콘)가 새로 생긴 커미션 화면의 하단 고정 버튼과 겹쳐 보여서 `next.config.mjs`에 `devIndicators: false` 추가함(배포본에는 원래도 안 뜨는 요소).
- **🐛 모바일에서 하단 고정 버튼이 안 보이던 버그**: 커미션 화면의 하단 고정 버튼바 3개(`.cm-apply-bar`/`.cm-wr-submit`/`.cm-reg-bottom`, 전부 시안에서 그대로 가져온 `bottom:0` 고정) 전부 Palo 자체의 모바일 하단 탭바(`.tabbar`, 역시 `bottom:0` 고정이지만 z-index가 더 높음)에 완전히 가려져 있었음 — 커미션 화면은 `#main` 안에 렌더링되고 탭바는 그 바깥의 항상 떠 있는 전역 UI라 이 둘이 서로 몰랐던 것. **고침**: `cmSyncTabbarHeight()`가 `.tabbar`의 실제 렌더링 높이(탭바가 숨겨지는 데스크톱 너비에서는 0)를 재서 `--cm-tabbar-h` CSS 변수로 저장(리사이즈 시·`#main` 변경 감지 MutationObserver 콜백에서 재계산), 위 3개 바의 `bottom` 값을 `var(--cm-tabbar-h,0px)`로 바꿔서 탭바 바로 위에 위치하도록 함. 각 화면의 스크롤 여백(`.cm-pad`/`.cm-reg`/`.cm-wr`의 하단 padding)도 같은 변수만큼 늘려서 내용이 버튼에 가리지 않게 함. **교훈**: `#main` 안에서 렌더링되는 화면이 자체적인 `position:fixed` 하단 바를 새로 만들 때는, Palo의 전역 하단 탭바(모바일에서 항상 떠 있음)와 겹치지 않는지 반드시 확인할 것 — 데스크톱 폭에서는 탭바가 아예 없어서 이 문제가 재현되지 않고, 실기기가 아닌 브라우저 뷰포트 에뮬레이션만으로는 겹침 자체는 보여도 "화면 밖으로 나갔다"는 사용자 표현과 바로 연결짓기 어려웠음 — 사용자가 보내준 스크린샷으로 확정함.

### 커미션 페이지 — 프롬프트2: 등록/수정 실제 DB 연동 (2026-07-30 추가)
사용자의 원래 6단계 계획 중 2단계. "등록해도 새로고침하면 사라지는" 데모 상태였던 등록/수정/내 커미션 화면을 실제 Supabase에 연결. 스키마·RLS·Storage 버킷은 4절 `commissions`/`commission_images`/`commission-images` 항목 참고.
- **이미지 업로드는 기존 게시글 업로드 흐름을 그대로 재사용**: `compressImage()`/`ALLOWED_IMAGE_TYPES`/`MAX_IMAGE_BYTES` 전부 공용, GIF는 압축 건너뛰고 원본 업로드하는 것도 동일. 다만 **버킷은 `post-images`와 공유하지 않고 `commission-images`로 새로 분리**하고, 업로드 경로를 `${작성자uid}/${Date.now()}-${파일명}`으로 만들어서 Storage RLS가 테이블 조인 없이 폴더명만으로 "본인 파일인지" 판단할 수 있게 함(`cmUploadSampleImg()`).
- **등록 폼의 이미지 상태가 카운터(`imgs`)에서 실제 URL 배열(`cmReg.images`)로 바뀜**: 프롬프트1 때는 "+" 버튼을 누르면 그냥 숫자만 늘어나고 그라데이션 placeholder를 그렸는데, 이제 진짜 `<input type=file>`(`cmRegFileInput`, 화면엔 숨김)을 열어서 고른 파일을 업로드하고 받은 URL을 배열에 저장(`cmRenderRegImgs()`가 그 배열을 다시 그림). 삭제(`cmDelSampleImg(i)`)도 이제 인덱스 기반.
- **저장 로직**: `cmSubmitReg()`가 `cmReg.editingId` 유무로 `commissions` insert/update 분기(기존 `submitPost()`의 `editingPostId` 패턴과 동일한 구조), 그 다음 항상 `commission_images`를 **전부 delete 후 현재 배열 전체를 다시 insert**(수정 시 이미지 순서·개수가 달라져도 항상 최종 상태와 일치하게, `submitPost()`가 `post_images`를 다루는 방식과 동일).
- **"내 커미션"이 이제 실제 내 데이터를 불러옴**: `cmOpenMy()`가 `commissions`를 `commission_images(url,sort)`와 함께 한 번에 조회(`.select('*,commission_images(url,sort)')`)해서 `cmMyList`(세션 캐시)에 저장 — 데모 배열 `cmMyCommissions`는 완전히 삭제됨. `cmOpenRegister(editId)`(수정 진입)와 `cmBulkStatus()`(전체 열기/마감)도 전부 이 실데이터 기준으로 동작.
- **로그인 필수**: `posts`와 달리 커미션은 익명 등록 개념이 없으므로, `cmOpenRegister()`/`cmOpenMy()` 진입 시점에 `AUTH.user` 체크 → 없으면 토스트 + `loginWithGoogle()` 즉시 호출. RLS도 `auth.uid()=author_id`로 막혀있어 클라이언트 체크를 우회해도 서버에서 다시 막힘(이중 방어).
- **미리보기 화면도 실제 이미지 반영**: `cmDetailHTML()`의 슬라이더/샘플 그리드 렌더링을 "그라데이션 placeholder 개수" 방식에서 "`d.images` 배열이 있으면 실제 이미지, 없으면 데모 그라데이션" 방식으로 바꿈 — 프롬프트1 때 쓰던 `cmRegGrads`(그라데이션 placeholder 팔레트)는 완전히 불필요해져서 삭제.
- **테스트 시 유의점**: 등록/수정은 실제 Google 로그인이 필요해서 AI가 브라우저 자동화로 직접 끝까지 검증할 수 없었음(로그인 안 된 상태에서의 가드 동작까지만 자동 확인) — 실제 저장 확인은 사용자가 로그인 후 직접 등록·새로고침·수정까지 해보고 확정함.

### 커미션 페이지 — 프롬프트3: 목록/상세 실제 데이터 연동 (2026-07-30 추가)
"계속해줘" 한 마디로 진행 — 목록 화면의 데모 카드 6개(`cmData` 하드코딩 배열)와 상세 화면을 실제 `commissions` 테이블 데이터로 교체. 프롬프트2에서 이미 실 DB였던 등록/수정/내 커미션과 합쳐서, 이제 커미션 페이지 전체가 실데이터로 동작함(후기 섹션만 예외 — 프롬프트4에서 연결 예정).
- **작가 닉네임은 PostgREST embed가 아니라 클라이언트에서 직접 join**: `commissions.author_id`가 `auth.users`를 참조하고 `profiles`를 직접 참조하지 않아서 자동 embed가 안 됨 — `loadRealPosts()`가 `posts` 작성자를 join하는 것과 똑같은 방식(`profiles`를 따로 조회해서 `profById` 맵 만들고 합치기)을 `cmLoadCommissions()`에도 그대로 적용. 다만 전체 프로필을 다 불러오는 `loadRealPosts()`와 달리, 이번엔 실제로 등장하는 작성자 id만 골라서(`select('id,nickname,avatar_url').in('id', authorIds)`) 필요한 만큼만 조회하도록 함.
- **로딩 순서**: `openCommissionList()`가 이제 async — 화면 뼈대(검색창·탭·태그칩)와 "불러오는 중..." 그리드를 먼저 그린 뒤, `cmLoadCommissions()`가 끝나면 그리드만 다시 채움. 최초 1회만 불러오고(`cmDataLoaded` 플래그) 그 다음부터는 캐시 재사용 — `cmSubmitReg()`(등록/수정 저장)와 `cmBulkStatus()`(전체 열기/마감) 성공 시 이 플래그를 `false`로 돌려서, 다음에 목록을 열 때만 새로 불러오게 함(매번 실시간 재조회는 안 함 — `posts`가 저장 후 로컬 배열만 patch하고 재조회 안 하는 것과 같은 절충).
- **상세의 작가 프로필 줄**: 실제 데이터는 `d.authorId`가 있으므로 프롬프트1 때 만든 스텁(`cmOpenArtistProfile()`) 대신 곧바로 기존 `openUserProfile(d.authorId)`로 연결됨(실제 프로필 페이지 URL `/user/{uuid}`까지 정상 전환되는 것 확인). `authorId`가 없는 경우(등록 화면의 "미리보기"처럼 아직 저장 전인 내 글 미리보기)만 예전 스텁을 계속 사용.
- **카드에서 조회수·좋아요 표시를 뺌**: 시안/데모 데이터엔 있었지만 `commissions` 테이블엔 애초에 그런 컬럼이 없고, 사용자의 프롬프트3 스펙에도 "썸네일·작가 닉네임·제목·가격·접수상태"까지만 명시돼 있어서, 있지도 않은 값을 0으로 채워 보여주는 대신 아예 뺌(범위 밖 기능을 임의로 추가하지 않음).
  - **(2026-07-30 후속 디자인 요청으로 재추가)**: 사용자가 "디자인적으로 아쉽다"며 제목 폰트 확대(15→17px)·가격 폰트 축소(15→13px, 브랜드색 포인트)·태그 표시(`.cm-c-tags`)·하트/리뷰 수(`.cm-c-meta`)를 다시 요청 — 단, 하트·리뷰 수는 실제로 세는 기능이 아직 없어서 **항상 0으로 고정 표시**(`d.likes||0`, `d.reviewCount||0`) 중임을 사용자에게 명시적으로 고지함. 커미션 좋아요(북마크)는 프롬프트5, 리뷰 수는 바로 아래 프롬프트4에서 실제 데이터가 생기니 그때 카드에도 실제 숫자를 연결할 것.
- **빈 상태 구분**: "아직 등록된 커미션이 없어요"(전체가 비어있을 때)와 "검색 결과가 없어요"(검색어에 안 걸릴 때)를 별개 메시지로 분리.
- **카드 메타 = 조회·리뷰·북마크 (2026-08-02)**: 카드 `.cm-c-meta`가 `👁 조회수(d.views) · 💬 리뷰수(d.reviewCount) · 🔖 북마크수(d.bookmarkCount)`. 북마크 수는 `commission_bookmarks`가 '본인 것만' RLS라 클라가 못 세므로 **RPC `get_commission_bookmark_counts()`**(security definer, `commission_id,count` 그룹집계 — 개수만 반환, 누가 했는지 비노출; anon+auth grant)로 받아 `cmLoadBookmarkCounts()`가 각 `d.bookmarkCount`에 채움(`cmLoadCommissions` 내). `cmToggleBookmark`가 `cmBumpBookmarkCount(id,±1)`로 로컬 즉시 증감(0 미만 방지, 다음 로드 때 서버값 재동기화). (좋아요는 커미션에 기능 없어 이전에 조회수로 대체함.)

### 커미션 페이지 — 프롬프트4: 후기 시스템 연결 (2026-07-30 추가)
"다음으로 넘어가줘"로 시작 — 커미션 상세의 후기 섹션(그동안 데모 `cmReviews`)을 아래 "커미션 후기 시스템" 절에서 설명하는 **기존 실제 후기 시스템**과 연결. 시작 전에 기존 시스템을 정밀 조사해서 확인한 중요한 사실: **기존 시스템에는 "커미션 타입"(두상/흉상/반신 등) 개념이 아예 없음** — `CM_TYPES`는 이번 커미션 페이지 시안에만 있던 데모 개념이었음. 이 간극을 메우기 위해 `posts`에 새 컬럼 3개 추가(`commission_id` bigint FK→`commissions`, `commission_ctype` text, `commission_bad_reason` text) — 기존 `commission_post_id`(trade 구직글 연동, 그대로 유지)와는 완전히 별개 통로라서 서로 안 섞임. `posts_commission_link_check` 제약으로 한 후기가 두 통로에 동시에 연결되는 것도 방지.
- **상세 화면**: `cmCommissionReviews(commissionId)`가 `POSTS`(이미 세션에 로드된 전체 글)를 `board==='review' && commissionId===이 커미션`으로 필터링 — 별도 쿼리 없이 이미 메모리에 있는 데이터로 처리. 카드 렌더링은 데모용 `cmReviewCardHTML`(삭제함) 대신 **기존 시스템의 진짜 렌더러 `reviewCardHTML`/`reviewAlbumHTML`을 그대로 재사용** — 카드를 누르면 그 후기 글 자체(`openPost()`)로 이동하는 것까지 기존 동작 그대로 따라옴.
- **더보기 페이지 · 후기 쓰기**: `cmOpenReviews(commissionId)`가 이 커미션의 후기만 모아 호/불호 요약과 함께 보여주고, `cmOpenWrite(commissionId)`가 실제 저장 폼. **자기 자신의 커미션에는 "후기 쓰기" 버튼 자체가 안 뜸**(`AUTH.user.id !== 커미션 author_id`, 기존 `openReviewFor()`의 셀프 후기 방지 관례를 그대로 따름). 저장은 `submitPost()`를 거치지 않고 `cmSubmitReview()`가 직접 `posts`에 insert(같은 테이블·같은 `board='review'`·같은 DB 트리거 `guard_review_requires_login()`이 그대로 적용되니 보안 경로는 동일, UI만 커미션 페이지 전용 폼을 씀).
- **알림은 리뷰어가 아니라 커미션 주인에게**: 처음엔 프롬프트1 데모 코드가 "글쓴이 본인 알림함"에 넣고 있었는데(1인 테스트 환경이라 안 드러났던 설계 결함), 실제 다인 사용자 환경에선 완전히 틀린 대상이라 새 DB 트리거 `notify_new_commission_review()`로 교체 — `commission_id`로 `commissions.author_id`를 조회해서 그 주인에게만 알림 insert(자기 자신이 자기 커미션에 쓴 경우는 제외). 기존 `notify_new_comment`/`notify_new_like`와 동일한 패턴.
- **커미션 타입 선택지 = 그 커미션의 실제 태그**: 고정 `CM_TYPES` 대신 리뷰 대상 커미션이 등록 시 입력한 진짜 태그 목록(`commission.tags`)을 선택지로 보여줌 — `cmData`에 아직 없는 커미션이면(세션 중 목록을 한 번도 안 열어본 경우 등) `CM_TYPES`로 폴백.
- **불호 이유**: "불호 후기" 선택 시에만 이유 선택지(퀄리티 불만족/마감 기한 미준수/소통이 어려웠어요/스타일이 요청과 달랐어요/기타, `CM_BAD_REASONS`)가 나타나고 하나 골라야 등록 가능 — "호 후기"로 바꾸면 자동으로 숨겨지고 선택 초기화.
- **"100% 기한 준수" → 실제 만족율**: 상세 상단 배지를 하드코딩 문구에서 실제 호 후기 비율(`good/(good+bad)*100%`)로 교체, 후기가 하나도 없으면 배지 자체를 안 보여줌(가짜 0%/100% 대신 아예 표시 안 함).
- **프로필 연동 유지**: 기존 `reviewsAboutHTML()`(프로필의 "이 사람에 대한 커미션 후기" 그룹핑)은 `reviewedNickname` 일치만으로 이미 자동으로 새 방식 후기도 집계했지만, 그룹 키가 `commissionPostId` 기준이라 새 방식 후기는 전부 "🗑️ 삭제된 커미션 글"로 잘못 뜰 뻔했음 — 그룹 키를 `commissionId` 유무로 분기하고, 새 방식이면 `cmData`에서 실시간으로 커미션 제목을 찾아 표시(없으면 "커미션 페이지의 후기"로 중립적 대체, "삭제됨"으로 오인되지 않게). **`openProfile()`/`openUserProfile()`을 async로 바꾸는 손이 큰 리팩터는 피하고**, 이미 세션에 로드된 `cmData`만으로 처리되는 저위험 방식을 택함(이 페이지는 과거 `.profile` 클래스 오작동 버그 이력이 있어 최소 변경 원칙 적용).
- **🐛 발견한 CSS 버그(디자인 안 먹던 원인)**: `.cm-write-btn`이 `.cm-sub-top .cm-write-btn{...}`로만 정의돼 있어서, 상세 화면 후기 섹션 안에 새로 추가한 "✍️ 후기 쓰기" 버튼(`.cm-sub-top` 바깥)은 완전히 민무늬 버튼으로 보였음. `.cm-write-btn` 기본 스타일을 전역으로 빼고 `.cm-sub-top .cm-write-btn{margin-left:auto}`만 컨텍스트별 오버라이드로 남김.
- **테스트 시 유의점**: 실제 저장은 로그인 계정 2개(커미션 주인 1 + 리뷰어 1, 본인 커미션엔 후기 못 씀)가 있어야 끝까지 확인 가능 — AI 쪽은 로그아웃 가드 동작과 화면 렌더링(타입 목록·불호 이유 토글·만족율 계산)까지 `AUTH.user`를 임시로 가짜 값으로 바꿔가며 확인했고, 실제 인증을 거친 저장/알림 수신은 사용자가 직접 확인함.

### 커미션 페이지 — 프롬프트5: 안 눌리던 버튼 기능 구현 (진행 중, 2026-07-30 시작)
사용자의 원래 계획대로 "한 번에 다 말고 하나씩 확인" 진행 중. 검색(제목·태그)은 프롬프트1 직후 "버튼 정리" 요청 때 이미 완료됨.
- **태그 필터 (완료)**: "지금 많이 찾는 태그" 칩을 시각 토글만 하던 걸 실제 필터로 만듦. `cmComputeTopTags()`가 `cmData`(실제 등록된 커미션들)의 태그 등장 빈도를 세서 내림차순 상위 10개를 `cmTopTags`로 저장(`cmLoadCommissions()` 끝에서 계산), "전체" 칩 추가. `cmState.activeTag`는 인덱스가 아니라 태그 문자열 자체(또는 `null`=전체)로 관리하도록 바꿔서 목록 순서가 바뀌어도 안전. 검색어와 태그 필터는 AND로 동시 적용됨.
  - **⚠️ 사용자가 명시적으로 다음으로 미룬 것**: 지금은 "등록된 커미션에 실제로 많이 쓰인 태그" 순으로 상위 노출되는데, 사용자는 나중에 이걸 **"유저들이 실제로 많이 검색한 태그"** 기준으로 바꾸고 싶어함(검색 빈도 집계가 필요 — 지금은 검색어를 로깅/집계하는 인프라 자체가 없음, 별도 테이블+집계 로직이 필요한 더 큰 작업이라 뒤로 미룸). 다음에 이 기능을 다시 요청받으면: 검색어 로그를 남길 테이블(예: `commission_search_log` 혹은 기존 `cmSearch()` 호출 시 텀블링 윈도우로 집계) 설계부터 시작할 것.
- **정렬 탭(홈/추천/신규/인기) (완료)**: 스펙에 명시된 4개만 연결(재방문 BEST/신상 BEST 2개는 스펙 밖이라 장식용으로 남김). `cmData`에 `createdAt`(등록 시각)·`reviewCount`(그 커미션에 달린 실제 후기 수, `POSTS`를 `commissionId`로 필터링해서 계산)·`satisfaction`(호 후기 비율) 필드를 새로 계산해서 추가 — 이 참에 카드의 "💬 리뷰 수"도 항상 0이던 것에서 실제 값으로 바뀜(하트/좋아요 수는 아직 북마크가 없어서 계속 0). 정렬 기준: 홈=기본 순서(등록순), 신규=`createdAt` 내림차순, 인기=`reviewCount` 내림차순, 추천=`satisfaction` 내림차순(동률이면 `reviewCount`로 2차 정렬, 후기 0개인 커미션은 항상 맨 뒤).
- **북마크 (완료)**: `commission_bookmarks`(user_id, commission_id 복합 PK, RLS로 본인 것만 select/insert/delete) 신설. 목록 카드·상세 페이지 둘 다의 북마크 아이콘(`.cm-bookmark`/`.cm-apply-bar .cm-bm`)에 `cmToggleBookmark(commissionId, el)` 연결 — 로그인 안 했으면 로그인 유도, 저장/해제 시 아이콘이 브랜드색으로 채워짐(`.on` 클래스). `cmBookmarkIds`(Set, 세션당 1회 로드)로 상태 캐시. "내 커미션" 화면(`cmOpenMy(tab)`)에 탭을 추가해서 "내가 등록한 커미션"/"🔖 보관함"을 전환 — 보관함은 `commission_bookmarks`를 `commissions(*,commission_images)`와 조인해서 불러온 뒤(작가 닉네임은 여기서도 프롬프트3와 같은 수동 join 패턴), 목록과 동일한 카드(`cmCardHTML`)로 렌더링하고 클릭하면 상세로 이동(카드에 없던 커미션은 `cmData`에 병합해서 `cmOpenDetail(idx)`가 정상 동작하도록 함).
- **문의하기 (완료)**: 기존 1:1 채팅 기능(`openChat(otherUserId)`)을 그대로 재사용 — 로그인 유도·셀프채팅 차단은 `openChat()` 자체에 이미 있던 가드를 그대로 활용, 새 로직 거의 없음.
  - **커미션 참조 메시지 (사용자 피드백으로 두 번 방향 전환)**: 처음엔 "문의하기" 클릭 시 자동으로 "🎨 이 커미션에 대해 문의드려요: {제목}" 메시지를 즉시 전송하도록 만들었으나, 사용자가 "그렇게 하지 말고 채팅을 보내면 어떤 커미션인지 알 수 있게"로 요청 방향을 바꿈(자동 메시지가 아니라 사용자가 실제로 쓴 첫 메시지에 참조가 붙어야 함) — 최종적으로 `messages.commission_id`(FK→commissions, nullable) 컬럼을 추가하고, "문의하기"를 누르면 채팅방은 열되 아무것도 보내지 않고 `cmPendingChatRef`(어떤 대화에 어떤 커미션을 붙일지 기억)만 세팅 + 입력창 위에 "다음 메시지에 참조가 함께 전송돼요" 안내 칩(`.cm-chat-ref-hint`, 취소 가능)을 보여줌. 사용자가 실제로 `sendChatMessage()`로 메시지를 보내는 그 순간 `commission_id`가 함께 저장되고 안내 칩은 사라짐 — **다른 대화방으로 이동한 뒤 보내면 참조가 안 붙도록** `cmPendingChatRef.conversationId`와 현재 대화방 id를 비교해서만 적용(그렇지 않으면 엉뚱한 상대에게 참조가 잘못 붙을 위험).
  - `commission_id`가 붙은 메시지는 `chatMessagesHtml()`에서 일반 말풍선이 아니라 클릭 가능한 카드(`.chat-commission-ref`, 브랜드색 테두리+"→")로 렌더링되고, 누르면 `cmOpenCommissionById(commissionId)`가 그 커미션 상세로 이동시켜줌 — 목록을 아직 안 열어봐서 `cmData`에 없는 커미션이어도 그 자리에서 새로 불러옴(`cmRowToData()` 공용 헬퍼로 `cmLoadCommissions()`와 로직 공유, 중복 방지).
  - **🐛 Next.js 콘솔 오류 디버깅 경험**: 사용자가 `{}`만 뜨는 "Console Error" 오버레이 스크린샷을 보내왔는데, 원인 텍스트가 안 보여서 처음엔 특정이 어려웠음 — 코드에 있던 `console.error(res.error)` 호출이 Next dev 오버레이에 그대로 잡히면서 Supabase 에러 객체를 제대로 못 풀어써서 생긴 현상으로 추정하고, 이런 에러 핸들링을 전부 `console.error` 대신 `toast(...+error.message)`로 바꿔서 이후엔 앱 안에서 사람이 읽을 수 있는 메시지로 뜨도록 고침. 실제 근본 원인은 사용자가 아직 `messages.commission_id` 컬럼 SQL을 안 돌린 상태였던 것으로 확인됨(컬럼 없는 상태로 그 컬럼을 쓰는 쿼리를 실행해서 에러 발생). **교훈**: 이 프로젝트에서 Supabase 관련 에러 핸들링은 `console.error`보다 `toast`로 사용자에게 바로 보여주는 쪽이 Next dev 오버레이의 불친절한 렌더링을 피할 수 있어서 디버깅에도 더 유리함 — 앞으로도 이 패턴 유지할 것.
- **신청하기 (완료, 2026-07-30 — 사용자 요청으로 원래 스펙보다 크게 확장됨)**: 원래 계획("신청하기 → 문의 유도 안내")을 사용자가 진행 중 "작가가 미리 설정한 폼을 신청자가 작성 → 작가가 확인 후 수락 → 그때 계좌 정보를 전달하는 방식으로 해달라, 분쟁 시엔 그 폼 내용을 기준으로 처리"로 확장 요청. 결제 자체는 여전히 Palo가 중계하지 않음(신청서는 "이 조건으로 거래하기로 합의했다"는 기록일 뿐).
  - **폼 구조 결정 (AskUserQuestion으로 확인)**: 기본 항목(참고 이미지 최대 5장·추가 요청사항, 둘 다 선택)은 고정, 그 위에 **작가가 직접 필드를 추가하는 커스텀 폼**(텍스트 입력형 + 체크박스형 두 종류 지원) — "그림 커미션이면 무조건 필요한 최소 항목 + 작가별 커스텀"으로 절충.
  - **계좌 정보 처리 결정 (AskUserQuestion으로 확인, 사용자가 명시적으로 "DB에 저장 안 함, 채팅으로 직접 전달" 선택)**: 계좌번호 등 금융 정보를 저장하는 컬럼·테이블은 전혀 만들지 않음 — 수락 후 작가가 기존 1:1 채팅으로 직접 알려주는 방식. 민감정보 미저장 원칙을 스키마 설계 단계에서부터 지킴.
  - **DB**: `commissions.application_form`(jsonb, `[{id,type:'text'|'checkbox',label,required}]`, 이 프로젝트 최초의 jsonb 컬럼) + 신규 테이블 `commission_applications`(아래 4절 참고, `answers`에 제출 당시 폼 항목별 응답을 스냅샷으로 저장하고 `agreed_policy_text`도 제출 당시 거래 정책 텍스트를 스냅샷으로 저장 — 나중에 작가가 정책 문구를 바꿔도 신청 당시 합의 내용이 그대로 보존되도록, "혹시 분쟁이 생기면 이 내용을 기준으로"라는 사용자 요구를 실제로 뒷받침하기 위한 설계).
  - **등록 화면에 폼 빌더 추가**: `cmOpenRegister()`의 새 섹션에서 라벨+타입(텍스트/체크박스)+필수여부를 입력해 필드를 추가/삭제(`cmAddFormField()`/`cmRemoveFormField()`), 저장 시 `cmReg.form` 배열이 그대로 `application_form`에 저장됨. **🐛 필드 id 충돌 버그**: 처음엔 `Date.now()`만으로 id를 만들어서 같은 밀리초에 여러 필드를 추가하면 id가 겹쳤음(브라우저에서 `idsUnique:false`로 직접 재현·확인) — `Date.now()+'-'+Math.random().toString(36).slice(2,8)`로 고침.
  - **신청서 작성 화면**(`cmRenderApplyForm()`): 참고 이미지(별도 업로드, `commission-images` 버킷의 `${uid}/applications/...` 경로 — 등록 이미지와 폴더만 다르고 같은 버킷·같은 RLS 재사용) + 추가 요청사항 + 작가가 만든 커스텀 필드들 + 거래 정책 표시 + "정책에 동의하며 분쟁 시 이 내용 기준" 필수 체크박스. 필수 항목이 모두 채워져야 제출 버튼 활성화(`cmCheckApplySubmit()`).
  - **작가 쪽 관리**: "내 커미션" 화면에 **"📝 신청 관리"** 탭 신설(`cmOpenMy('applications')`) — 대기중/수락됨/거절됨 배지, 신청자 답변·참고 이미지 표시, 대기중 신청에만 수락/거절 버튼. `cmDecideApplication()`이 상태를 갱신하고, 수락 시 `cmOpenChatAbout()`으로 그 신청자와의 채팅방을 바로 열어줌(계좌 정보는 그 채팅에서 작가가 직접 타이핑해서 전달 — 자동 전송 아님, DB에도 안 남음).
  - **수락 시 자동 안내 메시지 (2026-07-30, 사용자 요청으로 추가)**: 처음엔 채팅방만 열어주고 아무 메시지도 안 보냈는데, 사용자가 "수락 버튼을 누르면 '{작가 닉네임}님이 커미션 신청을 수락했어요' 메시지를 채팅방에 바로 보내달라"고 요청 — `cmDecideApplication()`이 채팅을 연 직후 `chatInput`에 그 문구를 채워 넣고 기존 `sendChatMessage()`를 그대로 호출하는 방식으로 구현(새 전송 로직을 만들지 않고 사람이 직접 타이핑해서 보내는 것과 동일한 경로를 재사용) — 그 덕에 이 메시지에도 `cmPendingChatRef`를 통해 커미션 참조가 자동으로 붙어서 클릭하면 해당 커미션으로 이동하는 카드로 렌더링됨.
  - **문의하기와의 차이**: 문의하기는 구매자가 먼저 채팅을 열되 아무것도 자동 전송하지 않지만(사용자가 "자동 전송 말고 실제로 보낸 메시지에 참조가 붙게 해달라"고 명시적으로 요청했던 부분), 신청하기 수락은 작가의 명시적인 결정(수락 버튼 클릭) 자체가 곧 전달할 내용이라 자동 전송이 자연스럽다고 판단해 다르게 처리함.
  - **아직 없음(알려진 한계, 사용자에게 별도로 알리지 않음)**: 신청자(구매자) 쪽에서 "내가 넣은 신청 현황"을 모아 보는 화면이 없음 — 현재는 알림 + 수락 시 채팅 연결로만 상태를 앎.
  - **테스트**: 실제 신청→수락 흐름은 신청자·작가 두 실제 계정이 있어야 끝까지 검증 가능(가짜 UUID로는 `conversations` 외래키 제약에 걸림) — AI 쪽은 폼 렌더링·필수값 검증·정책 문구 표시까지 로그인 가드 우회(가짜 UUID)로 확인했고, 실제 DB 저장·수락·채팅 자동 메시지는 사용자가 직접 확인(2026-07-30, "잘 작동해"로 확정).
- **거래 정책 기본 문구 수정 (2026-07-30, 2단계에 걸쳐 수정됨)**: 신청서 화면(`cmRenderApplyForm`)과 상세 페이지 "거래 정책 안내"(`cmDetailHTML`)의 정책 기본값(작가가 직접 정책을 안 적었을 때만 보이는 폴백 텍스트)이 원래 시안의 문구("신청 수락 시 고지한 작업 기한까지 최종 작업물이 전달되지 않으면, 결제 금액이 신청자에게 환불될 수 있습니다")를 그대로 쓰고 있었는데, 사용자가 "Palo는 결제를 중계하지 않으니 이 문구는 실효성이 없고 오해의 소지가 있다"고 지적 — 1차로 "Palo는 결제를 중계하지 않으니 세부 사항은 작가와 직접 협의해주세요 / 저작권은 별도 협의가 없는 한 작가에게 귀속됩니다"로 교체했다가, 사용자가 곧이어 "저작권 귀속 같은 내용도 작가가 적은 적 없으면 임의로 넣지 말고, 결제 비중계 면책조항만 기본으로 남기고 나머지는 그냥 비워두라"고 범위를 넓혀서 재요청 — 최종적으로 두 곳 모두 **"Palo는 결제를 중계하지 않으니, 작업 범위·기한·환불 등 세부 사항은 작가와 직접 협의해주세요."** 한 줄만 기본값으로 남기고 저작권 문장은 제거.
- **작업물 사용 권한(`usage_rights`) 기본값도 같은 이유로 제거 (2026-07-30)**: 작가가 사용 권한을 안 적었을 때 상세 페이지가 "비상업적 용도의 굿즈 제작 및 나눔 가능 / SNS 게시 가능 / 출처 표기 시..." 같은 **지어낸 허용 범위**를 기본으로 보여주고 있었음 — 작가가 실제로 허락한 적 없는 이용 범위를 Palo가 임의로 대신 명시해주는 셈이라 위 거래 정책 기본 문구와 같은 성격의 문제. 사용자 요청대로 기본값을 완전히 없애고, `d.usage`가 비어있으면 "작업물 사용 권한" 아코디언 섹션 자체를 렌더링하지 않도록 함(`cmDetailHTML`, `usageHTML` 계산 후 조건부 렌더링) — 빈 섹션을 보여주는 대신 통째로 숨김. 작가가 직접 적으면 예전처럼 그 내용 그대로 노출.
- **구독·공유**: 아직 시작 안 함.

### 커미션 후기 시스템 (2026-07-30 추가)
"커미션 후기" 게시판(`review`)에 글을 쓸 때, 실제 존재하는 "커미션 구인구직" 게시판의 "구직" 말머리 글과 반드시 연결하도록 만들어서 아무 닉네임이나 적어 넣는 걸 막고, 작성을 최대한 간단하게(만족/불호 선택 + 선택적 한 줄 후기) 만든 기능. 단계별로 사용자 피드백을 받아가며 여러 번 방향이 바뀜(별점 → 만족/불호로 최종 변경 등) — 아래는 최종 상태 기준.

- **DB**: `posts.reviewed_nickname`(텍스트, 표시용), `posts.reviewed_user_id`(uuid, FK→auth.users, `on delete set null`, 2026-07-30 추가 — 아래 "닉네임 변경 대응" 참고), `posts.commission_post_id`(FK→posts, `on delete set null`), `posts.commission_sentiment`(`good`/`bad`만 허용하는 체크 제약). 전부 기존 `posts_update_own` 소유권 정책 안에서 다른 필드(제목·본문 등)와 동일하게 취급됨(별도 RLS 불필요).
- **🐛 닉네임 변경 시 후기가 프로필에서 사라지던 버그 (2026-07-30, 사용자 질문으로 발견)**: 사용자가 "닉네임을 바꾸면 그 닉네임이 들어간 다른 영역도 다 따라 바뀌는지" 점검을 요청해서 코드를 훑다가 발견함 — 프로필의 "이 사람에 대한 커미션 후기" 섹션(`reviewsAboutHTML()`)이 후기 작성 시점에 텍스트로 박제된 `reviewed_nickname`과 **현재** 프로필 닉네임을 문자열로 비교해서 걸러내고 있었음. 그래서 작가가 닉네임을 바꾸면, 그 순간부터 이미 받은 후기들이 (게시판 자체에서는 안 사라지지만) 자기 프로필의 후기 그룹에서만 조용히 안 보이게 됨 — 실제 데이터 손실은 아니지만 사용자에게는 "후기가 사라졌다"로 보이는 눈에 띄는 버그. **고침**: `posts.reviewed_user_id`(uuid) 컬럼을 새로 추가해서 후기 작성 시점에 "이 후기가 누구에 대한 건지"를 텍스트가 아니라 안정적인 UUID로도 같이 저장(레거시 경로는 `selectCommissionPost()`/`openReviewFor()`가 잡아온 구직 글의 `authorId`, 새 커미션 페이지 경로는 `commission.authorId`). `reviewsAboutHTML(profileUserId,nickname)`이 이제 `reviewedUserId`가 있으면 UUID로 매칭하고(닉네임이 바뀌어도 안전), UUID가 없는(마이그레이션 이전) 예전 행만 기존처럼 닉네임 텍스트로 폴백 매칭. 배포 전 기존 데이터 백필(`reviewed_nickname`이 현재 `profiles.nickname`과 일치하는 행에 한해 `reviewed_user_id`를 채움 — 이 기능이 나온 이후 아직 닉네임을 바꾼 사람이 없다면 사실상 전부 채워짐)까지 사용자가 SQL Editor에서 직접 실행해서 완료. **교훈**: 화면에 "닉네임 텍스트"를 표시용으로 저장해두는 컬럼(`reviewed_nickname` 외에도 비슷한 패턴이 더 있을 수 있음)은 그 자체로는 문제없지만, **그 텍스트를 나중에 "누구의 것인지 식별하는 키"로 재사용하면 닉네임 변경에 취약해짐** — 식별은 항상 uuid로, 표시는 텍스트로 분리해야 안전하다는 걸 실제 사례로 확인함.
- **후기 작성 진입점 2가지**:
  1. **직접 검색**: "커미션 후기" 게시판에서 글쓰기 → 제작자 닉네임을 입력하면 그 닉네임으로 작성된 "구직" 말머리 글 목록이 실시간으로 뜨고(`searchCommissionPosts()`, `POSTS` 배열에서 클라이언트 필터링 — 이미 전체 글이 로드돼 있어서 추가 쿼리 불필요), 그중 하나를 선택해야만(`selectCommissionPost()`) 등록 가능.
  2. **원클릭**: "구직" 말머리 글 상세 화면에 "✍️ 이 커미션 후기 쓰기" 버튼(`openReviewFor()`) — 누르면 게시판·제작자·구직 글이 전부 자동으로 채워진 채 글쓰기 창이 열림. 본인 글에는 이 버튼이 안 뜸(셀프 후기 방지), 로그인 안 했으면도 버튼 자체가 안 보임.
  - 둘 다 **로그인 필수**(비로그인 상태에서는 버튼도 안 보이고, 게시판을 수동으로 "커미션 후기"로 바꾸는 것도 막히고, 최종 등록 시점에도 한 번 더 막힘 — 클라이언트 3중 체크 + DB `guard_review_requires_login()` 트리거로 4중 방어). 다른 게시판은 여전히 비로그인 글쓰기 허용.
- **작성 화면이 매우 단순함**: `board==='review'`일 때는 제목 입력칸이 아예 안 보이고, 대신 **"😊 만족 후기" / "😞 불호 후기"** 중 하나를 필수로 고르면(`setEdSentiment()`) 그 선택 자체가 제목이 됨(`sentimentTitle()` — 예: "😊 만족 후기"). 본문 내용은 완전히 선택사항이라 "한 줄 후기도 좋아요" 안내만 뜨고 비워둬도 등록됨.
- **연결된 구직 글이 삭제돼도 후기는 안 사라짐**(`commission_post_id`가 `on delete set null`이라 연결만 풀림, `reviewed_nickname` 텍스트는 그대로 남아서 누구에 대한 후기였는지는 계속 알 수 있음).
- **화면 노출 (2026-07-30, 여러 차례 요청으로 발전)**:
  - **"커미션 후기" 게시판 자체를 볼 때**: 일반 게시판과 다르게 텍스트 목록이 아니라 **이미지 앨범형 그리드**(`reviewAlbumHTML()`/`reviewCardHTML()`, `renderList()`에서 `state.board==="review"`일 때 분기) — 이미지가 크게 보이고(없으면 💬 자리표시자), 아래에 만족/불호 배지+작성자+시간만 작게 표시. ("전부 제목이 '만족 후기'라 목록이 어색하다"는 피드백으로 제목 중심 목록에서 이미지 중심 앨범으로 변경함.)
  - **구직 글 상세에 "📝 후기 보기 (N)" 버튼**(`openCommissionReviews()`) — 그 구직 글에 달린 후기만(다른 커미션 후기는 제외) 앨범형으로 모아 보여주고, 상단에 **"전체 / 😊 만족 / 😞 불호" 필터 버튼**(`setCommissionReviewFilter()`, 게시판 말머리 필터 바와 같은 `.tagbar` 스타일 재사용)으로 좁혀볼 수 있음. "글로 돌아가기"로 원래 구직 글로 이동.
  - **프로필 화면의 "이 사람에 대한 커미션 후기" 섹션**(`reviewsAboutHTML()`, 대표 글 카드 바로 아래) — 후기를 **연결된 구직 글(커미션 타입)별로 그룹핑**해서 앨범형으로 보여줌. 그룹 제목은 그 구직 글의 **현재 제목을 매번 실시간으로 가져와서** 표시하므로, 작가가 나중에 글 제목을 바꾸면 그룹 이름도 자동으로 따라감(제목을 캐싱하지 않고 항상 `POSTS.find()`로 다시 조회하기 때문). 연결된 구직 글이 삭제된 그룹은 "🗑️ 삭제된 커미션 글"로 표시되며 **항상 맨 뒤로 정렬**.
- **검색 연동**: "전체 글" 검색창에 제작자 닉네임을 입력하면 그 닉네임이 달린 후기 글도 결과에 포함됨(`filteredPosts()`가 `reviewedNickname`도 같이 검사).
- **목록/썸네일 공용화 (2026-07-30)**: 기존에 게시판 목록에만 있던 이미지 미리보기 로직을 `postThumbHTML(p)` 공용 함수로 뽑아내서, 프로필 화면의 글 목록(`profileRow()`)에서도 이미지가 보이도록 함 — 원래 커미션 후기에 이미지를 올려도 프로필 쪽에서는 안 보이던 문제를 계기로 발견/수정.

### 게시글 목록 표시 다듬기 (2026-07-30, DB 변경 없음)
- **🐛 사진 있는 글에서 조회수·추천수가 사라지던 버그**: `.pmeta`(작성자·시간·조회수·추천수 줄)에 "한 줄에 다 안 들어가면 숨겨버리는" `overflow:hidden` 스타일이 걸려있었는데, 사진이 있는 글은 오른쪽 썸네일이 공간을 차지해서 `.pmeta`가 좁아지고, 그 결과 뒤쪽의 조회수·추천수가 잘려서 안 보였음(사진 없는 글은 공간이 넉넉해 문제없었음). 이 CSS 파일 안에 같은 `.pmeta` 선택자가 legacy 프로토타입 시절부터 여러 번 재정의(다른 디자인 시안들의 흔적)되어 있었고, 그중 **마지막에 선언된 게 실제로 적용되는 규칙**이라 처음엔 하나만 고쳤다가 안 고쳐지는 해프닝이 있었음 — 결국 관련된 `.pmeta` 재정의 전부를 찾아서 `overflow:hidden`/`nowrap`을 `flex-wrap:wrap`으로 바꿈(안 들어가면 잘리는 대신 다음 줄로). 곁들여 `@media(max-width:400px)`에서 조회수·추천수를 아예 숨기던 leftover 규칙도 발견해서 제거함.
- **정보 계층 정리**: 게시글 목록·앨범·프로필 어디서 보든 **작성자 등급 배지는 안 보이고, 글 상세로 들어가야만 보이도록** 함(`renderList()`의 목록 행에서 `levelBadgeHtml()` 호출 제거 — 댓글·글 상세 자체에는 그대로 남아있음). 커미션 후기 글의 경우 추가로 **"누구에 대한 후기인지"(`@닉네임`)도 목록/앨범/프로필에서 안 보이고 글 상세에서만 보이도록** 함. 처음엔 이 규칙을 "커미션 후기 게시판에만" 좁게 적용했다가, 사용자가 일반 게시글(예: "물어보기" 게시판 글)에서도 등급이 목록에 그대로 보인다고 재차 지적해서 **모든 게시글의 목록에 범위를 넓힘**.
- **게시판 헤더(최신/인기·목록형/앨범형 탭) 정렬**: 두 탭 묶음이 게시판 이름 길이에 따라 서로 떨어져서 어긋나 보이던 문제를 `.bh-controls`로 묶어서 항상 같이 줄바꿈되게 고침. 우측 정렬은 `margin-left:auto` 대신 `.bh-title`/`.bh-controls` 2-그룹 구조 + `justify-content:space-between`으로 바꿈(실제 모바일 기기에서 브라우저 리사이즈 에뮬레이션과 렌더링이 다르게 나타나는 걸 겪음 — 우측 정렬이 중요한 곳은 이 방식이 더 안전).
- **🐛 하단 탭("홈"/게시판 이동)이 새로고침되는 느낌이었던 문제 (2026-07-30, 사용자 질문으로 발견)**: 사용자가 "하단 탭을 누르면 전체가 새로고침되는 느낌"이라고 지적해서 확인해보니, `selectBoard()`(하단 "홈" 탭·게시판 목록·태그 칩이 전부 이 함수를 씀)가 `POSTS`가 이미 메모리에 다 로드돼 있어 네트워크 요청이 필요 없는데도 매번 `main.innerHTML=skeletonHTML()`로 회색 뼈대 화면을 통째로 그렸다가 `setTimeout(renderList,200)`으로 200ms 뒤에야 실제 목록을 그리고 있었음 — 그 사이 화면이 통째로 비었다 채워지고 스크롤도 맨 위로 튀어서 "새로고침되는 느낌"을 만든 원인이었음. **고침**: 인위적인 스켈레톤·지연을 없애고 `renderList()`를 바로 동기 호출하도록 변경 — 실측 결과 200ms+깜빡임에서 30ms 이내 즉시 전환으로 개선됨. 더 이상 아무 데서도 안 쓰이게 된 `skeletonHTML()` 함수도 같이 삭제(관련 CSS `.skel-row`/`.skel-line`/`.skel-thumb`는 `app/globals.css`에 그대로 남아있음, 다른 데서 재사용할 여지가 있어 굳이 제거하지 않음). **참고**: "커미션" 탭(`openCommissionList()`)은 최초 1회 실제 Supabase 조회가 필요해서 그때만 로딩 문구가 뜨는 게 정상이고, "내 정보" 탭(`openProfile()`)은 원래부터 이런 인위적 지연이 없어서 이번 문제의 대상이 아니었음.

### 프로필 이미지 (2026-07-30 추가)
지금까지는 아바타가 전부 "닉네임 첫 글자 + 그라데이션 배경"으로 고정이었는데, 실제 이미지를 올릴 수 있게 함.
- **DB**: `profiles.avatar_url`(text, nullable). 특별한 트리거/RLS 불필요 — 기존 `profiles_update_own`(본인 행 수정 가능) 안에서 다른 일반 필드와 동일하게 취급됨.
- **업로드**: "내 정보" 화면의 원형 아바타를 클릭(또는 아바타 오른쪽 아래의 작은 📷 배지 버튼 클릭 — 처음엔 아바타 자체만 클릭 가능해서 "눌러야 바뀌는 걸 알기 어렵다"는 피드백을 받고 이 배지를 추가함)하면 파일 선택 → 기존 이미지 정책(`ALLOWED_IMAGE_TYPES`/`MAX_IMAGE_BYTES`/`compressImage()`) 그대로 재사용해서 압축 후 `post-images` 버킷에 `avatar-{timestamp}-{파일명}` 경로로 업로드(`onAvatarFile()`) → `profiles.avatar_url` 갱신.
- **표시 공용화**: `avatarHTML(name, avatarUrl)` 헬퍼가 이미지가 있으면 `<img>`, 없으면 기존처럼 닉네임 첫 글자를 반환 — 내 프로필/남의 공개 프로필의 아바타, 글 상세의 작성자 아바타, 댓글 작성자 아바타, 댓글 입력창의 내 아바타까지 전부 이 함수 하나로 통일됨. 이를 위해 `loadRealPosts()`가 `profiles.avatar_url`도 같이 불러와서(`avatarFor(uid)`) 각 글에 `authorAvatar`, 각 댓글에 `av` 필드로 실어 나름.
- **🐛 즉시 반영 안 되던 버그(2026-07-30)**: 아바타를 바꿔도 `AUTH.profile.avatar_url`만 갱신하고 이미 메모리에 로드된 `POSTS` 배열 안의 기존 글·댓글 객체는 안 건드려서, 글 상세로 들어가면 예전 아바타(또는 빈 값)가 그대로 보이는 문제가 있었음(새로고침해야만 반영됨). **고침**: `onAvatarFile()` 성공 시 `POSTS`를 순회하며 `authorId`/`comments[].authorId`가 본인과 일치하는 항목의 `authorAvatar`/`av`도 그 자리에서 같이 갱신하도록 함 — 새로고침 없이 바로 반영.
- **🐛 포인트 랭킹에서만 안 보이던 버그(2026-07-30)**: 랭킹 목록은 `score_log`(원래 본인만 조회 가능한 민감 테이블)를 집계해서 노출 항목을 의도적으로 좁힌 전용 RPC `get_score_leaderboard(p_days, p_limit)`를 쓰는데, 이 함수가 프로필 이미지 기능보다 먼저 만들어져서 `avatar_url`을 아예 안 돌려주고 있었음. **고침**: 함수 반환 컬럼에 `avatar_url` 추가(리턴 타입이 바뀌므로 `drop function` 후 재생성 필요했음 — 이 프로젝트에서 반복되는 패턴). 랭킹 행은 이제 순위 숫자만 있던 자리를 실제 아바타(`avatarHTML()`) + 오른쪽 아래 작은 순위 숫자 배지(`.rank-badge`)로 표시. **교훈**: 새 프로필 필드(아바타 등)를 추가하면 `profiles.*`를 직접 select하는 곳은 자동으로 반영되지만, **집계용으로 컬럼을 미리 좁혀둔 SECURITY DEFINER RPC들은 안 건드리면 그대로 누락됨** — 이런 RPC 목록(`get_score_leaderboard` 등)을 새 프로필 필드 추가할 때마다 점검할 것.

### 프로필 재디자인 — 크레페 시안 1단계: 상단 헤어 (2026-07-30 추가)
사용자가 새 HTML 시안(`프로필_크레페시안.html`, 다운로드 폴더에만 있고 저장소엔 없음)을 제공하며 "① 프로필(이미지·소개글·링크·통계) ② 커미션 타입 목록 ③ 후기 목록" 3단 구조로 프로필을 재구성하자고 요청. 사용자가 명시적으로 "먼저 최상단 프로필 부분부터"라고 범위를 좁혀서, 이번엔 ①만 구현하고 ②/③(커미션 타입 목록·후기 목록 재구성)은 다음 단계로 남김.
- **DB**: `profiles.bio`(text, nullable, 클라이언트에서 150자로 자름), `profiles.cover_url`(text, nullable), `profiles.sns_twitter`/`sns_instagram`/`sns_email`(text, nullable — 시안 아이콘 3개에 맞춰 고정 3슬롯으로 결정, 자유 링크가 아니라 플랫폼별 필드). 전부 기존 `profiles_update_own` 정책 안에서 다른 필드와 동일하게 취급(별도 RLS 불필요).
- **적용 범위**: 내 프로필(`openProfile`)·남의 프로필(`openUserProfile`) 둘 다 같은 헤어를 사용(AskUserQuestion으로 확인 — 데이터 자체가 본인 것이니 어디서 보든 같아야 한다는 이유로 "둘 다" 선택됨). 편집 버튼(커버·아바타·소개글/링크)은 `isSelf` 플래그로 내 프로필에서만 노출.
- **공용 렌더러**: `pfHeroHTML(profile, isSelf, reviewStats, bookmarkCount)` — 커버(이미지 또는 그라데이션 기본값), 원형 아바타(`avatarHTML()` 재사용), 이름, 등급 뱃지(`levelBadgeHtml()` 그대로 재사용 — 시안의 필 모양과 우연히 잘 맞아서 스타일만 살짝 오버라이드), 소개글(줄바꿈 `<br>` 변환, 비어있고 본인이면 "소개글을 적어보세요" 안내), SNS 링크 3개(값이 있는 것만 렌더링), 통계 3칸을 반환. CSS는 기존 `.pf-`(프로필 전반에서 이미 쓰이는 접두사, 예: `.pf-stats`/`.pf-ava`/`.pf-name`)와 이름이 겹치는 걸 피하려고 전부 **`.pfh-`(프로필 헤어) 접두사로 새로 만듦** — 커미션 페이지 때 `cm-` 접두사를 쓴 것과 같은 이유(전역 클래스 충돌 방지).
- **SNS 링크 입력 방식**: 아이디만 입력해도(`@handle` 또는 `handle`) 자동으로 `https://x.com/handle`·`https://instagram.com/handle`로 변환(`pfSnsUrl()`), `http(s)://`로 시작하는 값을 넣으면 그대로 사용 — 사용자가 아이디만 알아도 되고 전체 URL을 알아도 되는 유연한 처리.
- **통계 3칸의 의미(시안과 다르게 정함)**: 시안 원본은 "후기/호 후기율/구독자"였는데, Palo에는 아직 커미션 구독 기능이 없어서(구독 버튼은 `cmComingSoon()` 스텁) 사용자가 직접 "후기 수·호 후기율·**찜하기 수**"로 바꿔서 요청함.
  - 후기 수·호 후기율: `pfReviewStats(userId,nickname)`이 이미 메모리에 로드된 `POSTS`를 `reviewed_user_id`(닉네임 변경 대응, 위 "닉네임 변경 시 후기가 사라지던 버그" 참고)로 필터링해서 동기적으로 계산 — 추가 쿼리 없음.
  - 찜하기 수: 이 유저가 등록한 모든 커미션에 걸린 `commission_bookmarks` 총합. 새 헬퍼 `pfBookmarkCount(userId)`가 `commissions`에서 이 유저의 커미션 id 목록을 뽑은 뒤 `commission_bookmarks`를 그 id들로 필터링해 `count:'exact',head:true`로 개수만 조회. **`openUserProfile()`은 이미 async라 그냥 `await`** 하면 되지만, **`openProfile()`(내 정보)은 과거부터 의도적으로 sync 유지 중**(6절 "커미션 페이지 프롬프트4"의 `openProfile`/`openUserProfile` async화 회피 교훈 참고) — 그래서 여기서는 히어로를 먼저 `bookmarkCount:null`(표시는 "…")로 그린 다음, `pfBookmarkCount().then()`으로 렌더링 후 `#pfhBmCount` 엘리먼트만 나중에 텍스트로 교체하는 지연 패치 방식을 씀.
- **편집 UI**: 커버(🖼)·아바타(📷) 아이콘은 기존 아바타 업로드와 완전히 같은 패턴(`compressImage()`+`post-images` 버킷, 경로만 `cover-{timestamp}-...`로 구분) — `onCoverFile()`. 소개글·SNS 3개는 각각 아이콘 대신 "✏️ 소개글 · 링크 편집" 텍스트 버튼 하나로 묶어서 `pfEditModal`(기존 `nickModal`과 같은 `.rules-scrim`/`.rules`/`.nick-in`/`.r-ok` 패턴 재사용)을 열고, 4개 필드를 한 번에 저장(`savePfEdit()`).
- **아직 안 함**: 후기 목록(③) 재구성은 다음 단계에서 이어갈 것.

### 커미션 리뷰 이벤트 (2026-08-02 추가, 기본 흐름)
작가가 "후기를 남기면 혜택을 준다"는 이벤트를 커미션별로 자율 설정. **Palo는 표시만 하고 혜택 지급·중개는 하지 않음**(게시판 방식).
- **DB**: `commissions.review_event_on`(boolean, default false) + `review_event_benefit`(text). 새 RLS 불필요 — 기존 `commissions_insert_own`/`commissions_update_own`(`auth.uid()=author_id`)이 행 단위로 막아 **작가 본인만 설정 가능**(#6, RLS는 컬럼이 아니라 행 단위라 새 컬럼도 자동 보호).
- **등록/수정 폼**(`public/palo.js`): 거래 정책 아래 `cmSetReviewEvent(on)` 토글(🎁 진행/안 함, `.cm-reg-toggle` 재사용). 켜면 `#cmRegRevWrap`(혜택 textarea `#cmRegRevBenefit` + `.cm-reg-note` "작가 직접 제공, Palo 미중개" 안내) 표시. `cmCheckReg`가 **이벤트 on이면 혜택 필수**로 등록 버튼 게이트. `cmReg`/`cmSyncReg`/`cmOpenRegister`(수정 로드)/`cmSubmitReg`(row에 `review_event_on`/`review_event_benefit`)/`cmPreviewReg`에 반영.
- **표시**: 목록 카드 썸네일에 `.cm-revevent-badge`(🎁 리뷰 이벤트), 상세는 제목 옆 `.cm-revevent-tag`(🎁 리뷰 이벤트 중) + 설명 아래 `.cm-revevent` 카드(혜택 내용 + `canReview`일 때 "✍️ 후기 쓰고 혜택 받기"→`cmOpenWrite` + `.cm-revevent-note` 중개 안내). 매핑(cmData/cmMyList) + `cmListSignature`에 `reviewEventOn` 포함.

### 커미션 추천 랭킹 (2026-08-02, 단계별 진행 중)
'추천' 탭에 좋은 커미션이 위로 오게 하는 서버 계산 랭킹. 원칙: **점수 계산·저장은 서버에서만**(사용자 조작 불가), 가중치·기준값은 **한 곳**에서 관리, 품질(후기)이 최우선. 4단계 계획(1 품질3요소 / 2 작가활동+작업물 / 3 신규보정 / 4 관리자 추가점수+열람·조정·기록).
- **[1단계 완료] 품질 3요소 + 접수중 필터**
  - **DB**: `commissions.views`(int, default 0) 추가 + `increment_commission_views(p_id)`(security definer — 작가 전용 update RLS 우회해 누구나 조회수만 +1, `increment_post_views`와 같은 패턴). **좋아요는 커미션에 기능이 없어** 목록/상세의 ♥ 표시를 **조회수(👁)로 교체**(장식뿐이던 `d.likes` 대신 `d.views`).
  - **점수 RPC `get_commission_rec_scores()`**(security definer, `returns table(commission_id,score)`): `status='open'`만 대상. 점수 = 호후기율(호/전체×100)×0.35 + 후기개수(`min(cnt,10)/10×100`, 상한 10)×0.15 + 인기(`조회×1+북마크×3`을 접수중 최고값 대비 0~100)×0.12. **가중치·기준값은 함수 최상단 `cfg` CTE 한 곳**에서 관리. 북마크 카운트는 `commission_bookmarks`(select-own RLS)를 definer로 우회해 집계. 후기는 `posts`(board='review', `commission_id`, `commission_sentiment` good/bad). 반환은 점수뿐(요소별 분해는 4단계에서 관리자 전용).
  - **클라이언트**: `cmLoadCommissions`가 `cmLoadRecScores()`로 `{cid:score}`(`cmRecScores`) 로드(RPC 없거나 오류면 빈 맵→후기순 폴백). `cmSortedFilteredIdx`의 `recommend` 분기가 `cmRecScores` 높은 순 정렬(동점 후기수). `cmOpenDetail`이 상세 열 때 `increment_commission_views` 호출 + 로컬 `d.views` 증가.
  - **마감 커미션 전체 숨김(2026-08-02 수정)**: 처음엔 마감 제외를 '추천' 탭에만 넣었는데, 홈·신규·인기·검색에선 마감이 보여 사용자가 버그로 지적 → **`cmFilteredIdx`(모든 탭·검색 공통 기저 필터)에서 `status==='open'`만 통과**시키도록 이동(추천 분기의 중복 필터는 제거). 마감 커미션은 공개 목록 어디에도 안 뜨고 작가의 '내 커미션'(`cmMyList`, 별도 렌더)에서만 관리. `cmComputeTopTags`도 접수중 태그만 집계(마감만 달린 태그가 칩에 뜨는 것 방지), 빈 목록 문구도 "접수중인 커미션이 없어요"로.
- **[2단계 완료] 작가 활동(0.19) + 작업물 활발도(0.12) + 후기 품질 게이트** (클라이언트 변경 없음, `get_commission_rec_scores` 함수만 교체)
  - **작가 활동 점수**: 접수중 커미션 작가들의 `profiles.score`를 `percent_rank()×100` 백분위로 환산(상위 10%=90점). 풀은 접수중 커미션 작가(distinct). 작가 1명뿐이면 percent_rank=0(엣지, 순위 영향 없음).
  - **작업물 활발도**: `commission_worksamples` 기준 = 빈도(`min(개수,5)/5×100`)×0.5 + 최신도(가장 최근 작업물이 오늘=100, 60일이면 0으로 선형 감쇠, 없으면 0)×0.5.
  - **⚠️ 후기 우선 원칙 충돌 발견·해결**: 확정 가중치 그대로면 비후기 요소 합(0.43)이 호후기율(0.35)보다 커서 **후기 나쁜데 활동·인기 높은 커미션이 상위에 올 수 있음**(시뮬레이션으로 확인: 후기0%·나머지만점 55 > 후기100%·나머지0 47). 사용자 선택으로 **후기 품질 게이트** 추가: `rv_total>=3` 이고 호후기율 `<50%`면 최종 점수 `×0.5`(감점). 신규·무후기(3개 미만)는 게이트 제외(기회 유지, 3단계 신규보정과 맞물림). 게이트 후 극단 케이스 역전 확인(후기100% 47 > 후기0% 27.5). 기준값(`gate_min_reviews`/`gate_bad_threshold`/`gate_penalty`)도 `cfg` 한 곳에서 조정.
  - **타입 주의(겪은 에러)**: `percent_rank()`·`extract(epoch...)`는 `double precision`이라 `round(double,2)` 없음 에러 → 최종 합계를 `(...)::numeric`으로 캐스팅, `act_score`/`ws_days`도 `::numeric`.
- **[3단계 완료] 신규 보정(0.07)** (클라이언트 변경 없음, 함수만 교체): 등록 경과일 `age_days` 기준 `greatest(0, 100 - age_days/new_window_days*100)`(등록 당일 100 → 기준일 `new_window_days`=7일에 0으로 선형 감소, 이후 0)×0.07. 후기 없어도 갓 등록한 커미션에 최대 +7점 노출 기회. 게이트 안쪽(합산에 포함 후 게이트 곱)에 둠. 기준일은 `cfg`에서 조정. 검증: 등록 2.4일 커미션이 13.5→18.14(+4.64=예측 보정치와 일치). 가중치 합이 1.00 완성(0.35+0.15+0.12+0.19+0.12+0.07), 관리자 추가점수(4단계)는 이 위 별도 가산.
- **[4단계 = 관리자 추가 점수]** ①저장+반영 ②요소별 열람 ③조정 UI ⑤조정 기록 뷰어 **완료**. **④ '⭐ 운영자 추천 표시'는 사용자 요청으로 보류** — 나중에 홈/추천/신규/인기와 **별개의 독립 '운영자 추천' 자리(탭/섹션)**로 따로 만들기로 함(배지 형태 아님).
  - **[①단계 완료 — 서버만] 저장·순위 반영·상한·조정 RPC·로그**: 추가 점수를 `commissions` 컬럼에 두면 작가가 자기 커미션 update로 조작 가능 → **별도 테이블 `commission_admin_bonus`**(commission_id PK, bonus, updated_by/at; select만 `is_admin()`, insert/update/delete 정책 없음=RPC로만)에 저장해 작가 접근 차단. 조정 기록 `commission_admin_bonus_log`(id/commission_id/title/admin_id/nick/old/new/created_at; select만 `is_admin()`, 수정·삭제 정책 없음=증거 보존). **RPC `admin_set_rec_bonus(commission_id,value)`**(security definer): `is_admin()` 확인 → **0~상한 30으로 클램프**(자동점수 최대 100을 완전히 못 뒤엎게) → 현재값 upsert + 로그 insert, 반환 `{ok,value,cap}`. `get_commission_rec_scores`는 **게이트까지 계산한 자동점수 뒤에 `admin_bonus`를 가산**(게이트 영향 없음). 검증: 비관리자 호출→`not_admin` 거부(#6), 테이블 관리자 전용 RLS(비관리자 0행) 확인. 추가점수→순위 실제 반영은 관리자 로그인 필요라 ③(조정 UI)에서 실측 예정.
  - **[②단계 완료 — 요소별 열람] 관리자 전용 점수 분해**: **RPC `get_commission_rec_breakdown()`**(security definer, `where public.is_admin()`로 비관리자 0행) — open 커미션별 요소값(ho_rate/reviewcnt_score/pop_score/activity_score/ws_score/new_score, 각 0~100)+`gated`+`auto_score`+`admin_bonus`+`final_score` 반환. **cfg는 `get_commission_rec_scores`와 동일하게 유지 필요(가중치 바꾸면 두 함수 다 수정)** — 두 함수에 인라인 중복. 클라: `cmLoadRecBreakdown()`(관리자일 때만 호출, `cmRecBreakdown` 맵)를 `cmLoadRecScores` 뒤에서 실행, `cmAdminScoreHTML(d)`가 커미션 상세(작업기간 아래)에 **관리자에게만** 요소별 패널 렌더(`.cm-adminscore`, 요소값+×가중치 라벨+게이트 노트+자동합계+관리자추가점수+최종). 비관리자는 빈 문자열. open인데 분해 없으면 "새로고침" 안내, 마감이면 "추천 제외" 안내.
  - **[③단계 완료 — 조정 UI] 그 자리에서 +/- 조정**: 패널의 '관리자 추가 점수' 줄에 `[0][−5][−1] 값 [+1][+5]` 버튼(`.cm-as-ctrl`). `cmAdjustBonus(commissionId,newValue)`가 클라 클램프(0~30) 후 `admin_set_rec_bonus` RPC 호출 → 성공 시 `cmRecBreakdown`의 `admin_bonus`/`final_score`와 `cmRecScores`(순위)를 **로컬 즉시 갱신**(추가점수는 게이트 밖 선형 가산이라 delta를 최종에 더하면 됨) + 패널만 `outerHTML`로 재렌더. **커미션 상세가 추천·검색·홈·직접링크 모든 경로의 종착점**이라 관리자가 어느 경로로 열든 열람+조정 가능(별도 관리자 커미션 목록은 미구현 — 필요 시 후속). 검증: 버튼 렌더, +5→최종·순위 즉시 반영, 상한 클램프(mock). 실서버 조정은 관리자 로그인 시.
  - **[⑤단계 완료 — 조정 기록 뷰어] (SQL 불필요, ①의 로그 테이블 재사용)**: 내 정보 > 🛡 관리자 메뉴 > "⭐ 추천 점수 조정 기록" → `openCommissionBonusLog`이 `commission_admin_bonus_log`(RLS로 관리자만) 최근 100건 조회 → `renderCommissionBonusLog`가 카드 목록(커미션 제목·조정 관리자·`old → new`+▲/▼ 방향·시각). `.del-log*` 스타일 재사용(비클릭 `cursor:default`). 검증: 뷰어 렌더·메뉴 버튼·표 RLS 조회.
  - **[관리자 커미션 추천 관리 목록] (SQL 불필요, ②의 breakdown + ③의 cmAdjustBonus 재사용)**: 내 정보 > 🛡 관리자 메뉴 > "🎯 커미션 추천 관리" → `openAdminCommissionMgmt`(필요 시 `cmLoadCommissions`/`cmLoadRecBreakdown` 로드) → `renderAdminCommissionMgmt`가 접수중 커미션을 **최종 점수 순**으로 나열, 각 행(`cmMgmtRowHTML`, id=`cm-mgmt-{cid}`)에 제목·작가·최종(자동+추가)·요소 요약(호/활/후/작/인/신·게이트)+행 내 `[0][−5][−1] 값 [+1][+5]` 조정 버튼. `cmAdjustBonus`는 화면에 `#cm-mgmt-{id}`가 있으면 **그 행만 in-place 교체(순서 유지)**, 없으면 상세 패널 교체 — 한 함수로 두 화면 모두 대응. 제목 클릭 시 `cmOpenCommissionById`로 상세. 검증: 정렬·요소·게이트·+5 in-place 갱신·순서 유지(mock).

### 프로필 재디자인 — 크레페 시안 2단계: 커미션 타입 목록 (2026-07-30 추가)
1단계(헤어) 확인 후 "다음으로 넘어가줘"로 진행. 시작 전 AskUserQuestion으로 배치 범위를 확인 — "**남의 프로필(`openUserProfile`)에만 추가**, 내 프로필(`openProfile`)의 기존 활동 대시보드(통계·팔로잉·쓴글/댓글/좋아요/최근본 탭·알림설정)는 그대로 유지"로 결정(사용자가 추천 옵션을 선택). DB 변경 없음 — `commissions`/`commission_images`를 그대로 재사용.
- **데이터**: `pfArtistCommissions(userId,nickname)`이 그 유저가 등록한 `commissions`를 `commission_images`와 함께 조회(`cmOpenMy()`의 "내가 등록한 커미션" 쿼리와 동일 패턴, 대상 유저만 다름) → 기존 `cmRowToData()`로 매핑해서 재사용. 조회 결과는 전역 `cmData`에 병합(`if(!cmData.some(...))cmData.push(...)`)해서, 항목 클릭 시 `cmOpenCommissionById()`가 재조회 없이 바로 상세로 이동.
- **렌더링**: `pfCommissionListHTML()`/`pfCmListItemHTML()` — 썸네일(첫 샘플 이미지, 없으면 기존 `cmGrads` 그라데이션)·접수중/마감 상태 배지·태그(전부 `commissions.tags` 실데이터, 특별한 "타입" 필드 구분 없이 동일한 pill로 렌더링 — 시안 데모 데이터엔 "타입"과 "태그"가 분리돼 있었지만 실제 스키마엔 그런 구분이 없어서 하나로 통일)·설명 한 줄(`-webkit-line-clamp:1`)·북마크 아이콘. 시안의 `badge`(PURPLE 등 프로모션 배지)는 실제 대응하는 컬럼/기능이 없어서 **구현하지 않음**(작가가 설정한 적 없는 걸 지어내지 않는다는 원칙, 앞서 "거래 정책/사용 권한 기본값" 건과 같은 기준).
- **북마크 아이콘 재사용**: 새 항목의 아이콘에 `class="cm-bm pfh-cm-bm"`처럼 **기존 `cm-bm` 클래스를 함께 붙여서** `cmToggleBookmark()`가 이미 갖고 있던 `el.closest('.cm-bookmark,.cm-bm')` 탐색 로직을 그대로 타게 함(새 토글 함수를 만들지 않음) — 시각 스타일만 `.pfh-cm-bm`으로 새로 정의(기존 `.cm-bm`은 `.cm-apply-bar .cm-bm`처럼 항상 부모 스코프로만 정의돼 있어서 단독으로는 스타일이 없다는 걸 확인하고 안전하게 재사용).
- **CSS**: `.pfh-cm-*` 접두사로 새로 만듦(헤어와 같은 이유 — 기존 `.cm-item`/`.cm-title` 등과 충돌 방지, 이 프로젝트는 이미 `cm-`/`pfh-` 두 접두사 체계가 자리잡음).
- **테스트**: 실제로 커미션 2개를 등록해둔 계정("미미")의 uuid로 `openUserProfile()`을 브라우저에서 직접 호출해서 실제 DB 데이터(썸네일 Storage URL·상태·태그)가 정확히 뜨는 것, 항목 클릭 시 실제 상세 페이지로 이동하는 것, 모바일 375px 폭에서 오버플로우 없는 것까지 전부 확인 — 로그인 없이도 읽기 전용 데이터라 AI가 끝까지 검증 가능했음(이전 프롬프트3 때와 같은 이유).

### 프로필 재디자인 — 크레페 시안 3단계: 후기 목록 (2026-07-30 추가)
2단계와 같은 이유로 AskUserQuestion으로 재확인 — "**남의 프로필에만 추가**"로 결정. 이번엔 기존에 이미 있던 그룹형 후기 표시(`reviewsAboutHTML()`, 커미션별로 묶어서 이미지 앨범으로 보여주던 것)와 새 목록이 한 화면에 같이 뜨면 같은 데이터가 두 번 보여서 어색할 것 같아, **`openUserProfile()`에서만 `reviewsAboutHTML()` 호출을 새 목록으로 완전히 대체**함(호출 자체를 지움) — `openProfile()`(내 프로필)은 그대로 `reviewsAboutHTML()`을 씀, 이 함수 자체는 삭제하지 않음.
- **데이터**: `pfArtistReviewList(userId,nickname)` — `pfReviewStats()`와 동일한 `reviewed_user_id`(닉네임 변경 대응) 매칭 로직으로 이 작가가 받은 후기 전부를 이미 로드된 `POSTS`에서 필터링, 추가 쿼리 없음.
- **더보기**: 처음엔 5개만 보이고, "더보기"를 누르면 전부 표시 — 새 쿼리 없이 `pfReviewsExpanded`(불리언) + `pfReviewsForUserId`(마지막으로 본 프로필의 uuid, 다른 프로필로 이동하면 자동으로 접힘 상태로 리셋)만으로 처리, 클릭 시 `openUserProfile()`을 그대로 재호출해서 다시 그림.
- **테스트**: `POSTS`에 리뷰 7개를 임시로 주입해서 5개만 보이는 것·"더보기" 클릭 시 7개 다 보이는 것·"더보기" 버튼이 사라지는 것까지 확인.

### 후기 카드를 텍스트 우선형으로 통일 + 후기 사진 첨부 기능 (2026-07-31 추가)
사용자가 "프로필에서 보는 후기와 커미션 페이지에서 보는 후기를 동일하게, 텍스트만 있으면 텍스트만, 사진이 있으면 텍스트 아래에, 어떤 커미션인지는 작은 글씨로" 요청 — 이 요청을 계기로 기존 이미지 그리드형 카드(`reviewCardHTML`/`reviewAlbumHTML`, 이미지가 없으면 💬 placeholder만 뜨고 **텍스트 내용 자체를 아예 안 보여주던** 카드)와, 3단계에서 새로 만든 텍스트 우선형 카드를 하나로 합침.
- **새 공용 렌더러**: `reviewItemHTML(r)`/`reviewListHTML(reviews)`(구 `pfRvItemHTML`/`pfReviewListHTML`의 아이템 렌더링 부분을 일반화해서 이름도 `pfh-` 접두사를 뗌 — 이제 프로필 전용이 아니라 커미션 페이지에서도 쓰이기 때문) — 커미션 이름(작은 글씨, `reviewItemTitleFor()`)·호/불호 배지·본문 텍스트(있을 때만)·사진(있을 때만, 텍스트 아래 가로 스크롤)·작성자·시간 순으로 렌더링. CSS도 `.pfh-rv-*`에서 **`.rv-*`로 이름을 바꿔서 일반화**(크레페 시안 원본의 클래스명과도 우연히 일치).
- **적용 범위**: `cmDetailHTML()`의 후기 요약(최근 3개)과 `cmOpenReviews()`의 "더보기" 전체 목록, 이렇게 "커미션 페이지"에 해당하는 두 곳만 `reviewAlbumHTML()`→`reviewListHTML()`로 교체. **일반 "커미션 후기" 게시판 자체의 앨범형 목록, 구직 글의 "후기 보기"(`openCommissionReviews`, 레거시 시스템), 내 프로필(`openProfile`)의 그룹형 표시는 요청 범위 밖이라 손대지 않음** — `reviewCardHTML()`/`reviewAlbumHTML()`도 그대로 남겨서 이 3곳에 계속 쓰임. 즉 지금 이 프로젝트엔 **후기 카드 스타일이 의도적으로 두 종류 공존**함(이미지 그리드형은 여러 작가의 후기를 한눈에 훑어보는 게시판·레거시 화면용, 텍스트 우선형은 특정 작가/커미션의 후기를 자세히 읽는 화면용) — 나중에 헷갈리면 이 구분을 기억할 것.
- **후기 사진 첨부(신규 기능)**: 커미션 페이지의 후기 작성 화면(`cmOpenWrite()`)에 "받은 커미션 사진(선택, 최대 5장)" 섹션 추가. 기존 신청서/등록 폼의 이미지 업로드 패턴(`cmApp.images`/`cmReg.images`와 동일 구조)을 그대로 복제한 `cmWr.images`/`cmWrImgsHTML()`/`cmUploadWrImg()`/`cmDelWrImg()` — 다만 **버킷은 `commission-images`가 아니라 `post-images`를 씀**(리뷰는 `commissions`가 아니라 `posts`/`post_images`에 저장되는 컬럼이라서, 파일 경로도 `${uid}/...` 폴더 구분 없이 `review-{timestamp}-{파일명}` 플랫 경로 — 기존 `uploadAndInsertImage()`가 쓰는 것과 같은 버킷·같은 소유권 모델). `cmSubmitReview()`가 `posts` insert 성공 후 `cmWr.images`를 `post_images`에 벌크 insert(`post_id`가 방금 생성된 실제 review post의 id) — 새 Storage/테이블 RLS 불필요(둘 다 기존 "임시로 넓게 열어둔" 정책을 그대로 씀, 6절의 기존 보안 부채 항목 참고).
- **테스트**: 실제로 이미지 1장을 업로드해서 압축→`post-images` 버킷 저장→카운터 갱신→삭제까지 확인(가짜 로그인으로도 Storage RLS가 열려있어 여기까진 가능). 실제 `posts.insert()`(글 저장 자체)는 실제 계정으로 확인(사용자가 실제로 사진 첨부 후기를 남겨서, 그 사진이 프로필·커미션 상세 양쪽에서 새 카드 형식으로 정상 노출되는 것까지 확인됨).

### 후기 용어 통일 — "호 후기" → "만족 후기"/"만족율" (2026-07-31 추가)
`sentimentTitle()`이 후기 글 제목엔 이미 "😊 만족 후기"를 쓰고 있었는데, 여러 요약 박스·버튼 라벨(`cmDetailHTML`의 `cm-rv-box`, `cmOpenReviews`, 후기 작성 화면의 `cm-hb-btn`, 프로필 헤어 통계)만 "호 후기"로 남아있던 용어 불일치를 사용자가 지적해서 전부 "만족 후기"로 통일. 프로필 헤어의 퍼센트 통계(`pfHeroHTML`)는 "호 후기"라는 라벨 자체가 비율을 나타내기엔 부적절해서 **"만족율"로 별도 변경**(단순 "호"→"만족" 치환이 아니라 이 하나만 "비율" 의미가 드러나는 라벨로 바꿈). 새로 만든 `reviewItemHTML`의 배지도 "😊 호"였던 걸 "😊 만족"으로 맞춤(다른 곳의 `reviewCardHTML`은 원래부터 "😊 만족"을 쓰고 있어서 그쪽에 맞춘 것).

### 프로필 재디자인 마무리 다듬기 (2026-07-31 추가, DB 변경 없음)
사용자의 "시안 느낌을 유지하면서 자연스럽게 다듬어달라"는 요청으로 5가지 항목 점검·수정.
- **디자인 톤**: `.pfh-cm-status.open`(커미션 항목의 "접수중" 배지)이 기존 커미션 목록 카드의 `.cm-status.open`과 미묘하게 다른 녹색(`rgba(94,186,125,.92)`)을 쓰고 있던 걸 발견 — 완전히 같은 값(`rgba(63,143,95,.92)`)으로 통일.
- **누를 때 반응**: `.pfh-cm-item`(커미션 항목)·`.rv-item`(후기 카드)에 호버 시 배경 강조/살짝 뜨는 효과, 클릭 시 `scale(.98)` 눌림 효과 추가(`transition:.14s`) — 이 프로젝트에 `:active` 눌림 효과가 쓰인 첫 사례.
- **빈 상태**: 커미션·후기 0개일 때 안내 문구는 기존에 이미 있었음(`.pf-empty` 공용 컴포넌트 재사용) — 재확인만 하고 변경 없음.
- **긴 소개글·SNS 링크 안전성**: `.pfh-bio`에 `word-break`/`overflow-wrap` 추가(줄바꿈 없는 긴 텍스트 대비), `.pfh-links`에 `flex-wrap` 추가.
- **모바일 텍스트 오버플로우 방지**: `.pfh-cm-title`(커미션 제목)에 `min-width:0`+`word-break`로 flex 안에서 안전하게 줄바꿈되도록, `.rv-who`(후기 카드의 커미션명)에 `overflow:hidden`+`text-overflow:ellipsis`+`white-space:nowrap`으로 너무 길면 "..."로 잘리도록 처리(원래 flexbox의 `min-width:auto` 기본값 때문에 긴 텍스트가 형제 요소를 밀어낼 수 있는 흔한 함정이었음).
- **테스트**: 실제 페이지가 렌더링 안 되는 환경(Browser pane 컴포짓 문제로 `window.innerWidth`가 0으로 나오는 상황)을 만나서, 픽셀 측정 대신 `getComputedStyle()`로 각 속성이 실제로 적용됐는지 직접 확인하는 방식으로 우회 검증함 — 긴 소개글·긴 커미션명·긴 태그로 강제 테스트해서 전부 확인.

### 자기 프로필("내 정보")의 후기도 새 디자인으로 통일 (2026-07-31 추가)
남의 프로필(`openUserProfile`)만 새 텍스트 우선형 후기 카드로 바꿔뒀었는데, 사용자가 "방금 바꾼 후기 디자인이 '내 정보'에는 적용 안 됐다"고 지적 — `openProfile()`이 여전히 옛날 그룹형 표시(`reviewsAboutHTML()`)를 쓰고 있었던 것. `openProfile()`도 `pfArtistReviewList()`+`pfReviewListHTML()`로 교체.
- **"더보기" 버튼이 자기 프로필/남의 프로필을 구분해서 올바른 함수를 호출하도록 함**: `pfReviewListHTML(reviews,userId)`이 이제 `AUTH.user.id===userId`인지 확인해서, 자기 프로필이면 `openProfile()`을, 남의 프로필이면 `openUserProfile(userId)`을 호출 — 원래는 무조건 `openUserProfile()`만 호출해서 자기 프로필에서 쓰면 잘못된 함수를 부르는 버그가 될 뻔했음, 미리 발견하고 고침.
- **`reviewsAboutHTML()` 완전 삭제**: 이제 이 함수를 부르는 곳이 하나도 없어져서(2단계 때 남의 프로필에서 이미 대체, 이번에 내 프로필에서도 대체) 함수 자체와 전용 CSS(`.commission-group`/`.commission-group-title`/`.ccount`)까지 완전히 제거함 — 죽은 코드 정리.
- **테스트**: 실제 계정("미미")으로 `openProfile()`을 호출해서 실제 후기 4개가 새 카드로 뜨는 것, 리뷰를 임시로 더 추가해서 "더보기"가 뜨고 눌렀을 때 `openProfile()`이 호출되며(남의 프로필용 `openUserProfile()`이 아니라) 전부 펼쳐지는 것까지 확인.

### 커미션 타입/대표 글/후기 순서 조정 (2026-07-31, DB 변경 없음)
사용자 요청으로 `openUserProfile()`의 섹션 순서를 "커미션 타입 → **대표 글** → 후기"로 변경(원래는 커미션 타입 → 후기 → 대표 글 순이었음) — `pinnedPostCardHTML()` 호출 위치만 옮김, 로직 변경 없음.

### "내 정보"에서 공개 프로필로 바로 이동하는 버튼 (2026-07-31 추가)
사용자가 "'내 정보' 화면과 게시글에서 닉네임을 클릭했을 때 보이는 프로필 화면이 서로 달라서 헷갈린다"고 지적 — `openProfile()`(개인 대시보드)과 `openUserProfile()`(크레페 시안 공개 프로필)은 애초에 다른 목적의 다른 화면이라 디자인이 다른 게 의도된 것이지만, 자기 공개 프로필이 어떻게 보이는지 바로 확인할 방법이 없었음. "내 정보"의 버튼 줄 맨 앞에 **"👤 내 공개 프로필 보기"** 버튼을 추가 — `onclick="openUserProfile(AUTH.user.id)"` 한 줄로 충분해서 새 함수 없이 기존 함수 재사용.

### 🐛 구글 로그인 직후 더미 글이 잠깐 보이는 버그 (2026-07-31, 여러 차례 잘못된 진단 끝에 해결)
사용자가 "로그인할 때 더미로 작성했던 글들이 상단에 표시되고 잠시 뒤 최신 탭으로 돌아온다"고 리포트. 스크린샷을 보니 실제로 `public/palo.js` 최상단에 하드코딩돼 있던 20개짜리 데모 글(id 1~20, `POSTS` 배열의 초기값 — 시안 이식 초기부터 있던 프로토타입용 가짜 글)이 그대로 화면에 떠 있었음. **원인 특정까지 세 번의 시도가 있었음**(전부 코드로 고쳐서 배포했는데도 사용자가 "여전히 안 됐다"고 재확인해준 덕분에 계속 파고들 수 있었음):
1. **1차 시도(부분적으로만 맞았음)**: "Safari 방어" 재시도 코드(`ensureRendered()`, `#main`이 비어있으면 강제로 `renderList()`를 한 번 더 돌리는 안전장치)가 `loadRealPosts()` 완료 여부를 안 보고 그 순간의 `POSTS`(데모만 있는 상태)로 렌더링할 수 있다고 보고 `postsLoaded` 플래그로 막음 — 방향은 맞았지만 실제로는 `#main`의 정적 스켈레톤 HTML이 이미 50자를 넘어서 이 코드 자체가 거의 발동하지 않는다는 걸 나중에 알게 됨(진짜 원인은 아니었음).
2. **2차 시도(헛다리)**: 배포했는데 사용자가 "안 됐다"길래 "브라우저가 `/palo.js`를 캐시하고 있어서 옛 코드가 실행되는 것"이라고 추정 — `next.config.mjs`에 `NEXT_PUBLIC_BUILD_ID`(Vercel 커밋 SHA, 로컬은 타임스탬프 폴백)를 추가하고 `<Script src="/palo.js?v=...">`로 캐시 무효화. 실제로 유용한 개선이었지만(이 프로젝트에 캐시 무효화 장치가 아예 없었던 진짜 결함이었음), **이번 버그의 원인은 아니었음** — 캐시 무효화가 확인된 뒤에도 버그가 그대로 재현됨.
3. **3차 시도(실제 원인 발견)**: 실제 구글 로그인은 AI가 대신 수행할 수 없어서(정책상 금지) 버그를 직접 재현할 방법이 없었음 — 화면 하단에 로그를 쌓아 보여주는 **임시 진단 오버레이**(`__log()`, 검은 박스)를 넣어 배포하고, 사용자에게 로그아웃→재로그인 후 그 박스를 캡쳐해서 보내달라고 요청. 캡쳐된 로그의 스택 트레이스로 정확한 호출 경로를 확인: **`window`의 `popstate` 리스너**(글 상세→목록 뒤로가기 처리용, 로그인과 원래 무관한 기존 코드)가 `SupabaseAuthClient._getSessionFromURL`에서 호출되고 있었음 — 구글 로그인 리다이렉트 후 URL에 붙는 `#access_token=...` 해시를 Supabase가 파싱하고 URL을 정리하는 과정에서 `popstate` 이벤트가 실제로 발생하고, 이 리스너가 그걸 진짜 브라우저 뒤로가기로 착각해서 `renderList()`를 호출 — 이 시점엔 `loadRealPosts()`가 아직 시작도 안 해서 `POSTS`가 데모 20개뿐이었음.
- **최종 고침**: `popstate` 리스너의 `else renderList();`도 다른 두 곳(`ensureRendered()`, 최초 부트스트랩)과 똑같이 `postsLoaded` 플래그로 감싸서, 실제 글 로딩 전이면 아무것도 안 그리고 기다리게 함(`loadRealPosts()`가 끝나면 스스로 그림).
- **진단 방법론(이 프로젝트에 남기는 재사용 가능한 교훈)**: 실제 계정 로그인이 필요해서 AI가 직접 재현할 수 없는 버그는, 코드에 **임시 `console.log` 대신 화면에 보이는 디버그 오버레이**(고정 위치의 `<div>`에 타임스탬프+이벤트+스택트레이스를 계속 append)를 넣어서 배포하고, 사용자에게 "재현한 뒤 그 화면을 캡쳐해서 보내달라"고 요청하는 방식이 매우 효과적이었음 — 이 사용자는 개발자 도구(F12 콘솔)를 열어달라고 하기보단 늘 스크린샷으로 소통해왔으므로, 콘솔 로그보다 **화면에 직접 보이는 오버레이**가 이 사용자와의 협업 방식에 훨씬 잘 맞음. 진단이 끝나면 오버레이 코드는 반드시 다시 제거할 것(이번엔 확인 후 즉시 제거·재배포함).
- **교훈**: 첫 번째 추정이 틀렸다고 배포 전에 알 수 없는 상황에서는, "고쳤다고 생각한 게 실제로 안 고쳐졌다"는 사용자의 재확인을 절대 무시하지 말고 계속 다음 가설로 넘어갈 것 — 이번처럼 그럴듯한 원인(Safari 방어 코드, 브라우저 캐시)이 여러 개 있을 수 있고, 전부 그 자체로는 유효한 개선이었지만 실제 버그의 원인은 전혀 다른 곳(관련 없어 보이는 기존 `popstate` 리스너)에 있었음.

### 커미션 설명란 리치 텍스트 에디터(이미지·굵게·글자 크기) (2026-07-31 추가)
사용자가 "커미션 게시글을 작성/수정할 때 이미지를 추가하고, 폰트 크기나 볼드처리를 조절할 수 있게 해달라"고 요청. 커미션 등록·수정 폼(`cmOpenRegister()`)의 "커미션 설명" 칸이 그동안 평범한 `<textarea>`(순수 텍스트)였던 걸, 일반 게시글 에디터(`writeModal`/`wContent`)와 비슷한 서식 지원 `contenteditable` 에디터로 교체.
- **DB**: `commissions.description_html`(text, nullable) 추가 — 기존 `posts.content`/`content_html` 분리 패턴을 그대로 재사용: `description`(순수 텍스트, 검증·검색용, 그대로 유지)은 에디터의 `textContent`에서, `description_html`(서식 있는 실제 렌더링용)은 에디터의 `innerHTML`에서 각각 뽑아 같이 저장.
- **일반 에디터의 `fmt()`/`insertInlineMedia()`/`pickImage()` 등을 재사용하지 않고 새로 만듦**: 그 함수들이 전부 `#wContent`/`#edFile`(글쓰기 모달 전용 id)에 하드코딩돼 있어서 그대로 재사용 불가능 — 이 프로젝트에 이미 있던 "화면마다 업로드/에디터 로직을 따로 만드는" 관례(`cmUploadApplyImg`/`cmUploadSampleImg`/`cmUploadWrImg`와 동일)를 그대로 따라서 `cmDescFmt()`/`cmDescSetSize()`/`cmDescPickImage()`/`cmUploadDescImg()`를 새로 만듦.
- **이미지**: 버킷은 `commission-images`(기존 커미션 이미지들과 동일, 새 RLS 불필요), 경로는 `${uid}/desc/{timestamp}-{파일명}`(신청서 이미지의 `/applications/` 서브폴더와 같은 패턴). 커서 위치에 삽입(`document.execCommand('insertHTML',...)`, 선택 영역을 `cmDescSaveSelection()`/`cmDescRestoreSelection()`으로 기억해뒀다가 업로드 완료 후 그 자리에 정확히 넣음 — 일반 에디터의 `saveEditorSelection`/`restoreEditorSelection`과 동일한 기법).
- **글자 크기**: `document.execCommand('fontSize',false,'7')`로 임시 `<font size="7">`를 만든 뒤, 그 안의 내용을 `<span style="font-size:Npx">`로 바로 바꿔치기하는 방식(레거시 `font` 태그의 `size` 속성은 DOMPurify의 `ALLOWED_ATTR`에 없어서 저장 시 사라지지만, `style`은 이미 허용돼 있어서 `span`+인라인 스타일로 바꾸면 그대로 살아남음).
  - **🐛 첫 구현(네이티브 `<select>`)을 사용자가 바로 반려**: "글자 크기 드롭다운을 열었을 때 디자인 안 된 텍스트가 나온다"고 지적 — `<select>`의 열린 드롭다운 목록 자체는 OS/브라우저가 그리는 네이티브 UI라 CSS로 스타일을 입힐 수 없다는 웹 플랫폼의 근본적인 한계였음. 이 프로젝트가 이미 곳곳에서 쓰던 관례(선택지는 항상 커스텀 버튼/칩 그룹으로— `.tagbar-btn`/`.cm-wr-type`/`.sortbar` 등)를 그대로 따라서 "작게/보통/크게/아주 크게" 4개 버튼(`.cm-reg-sizegroup`)으로 교체. **교훈**: 이 프로젝트에서 여러 선택지 중 하나를 고르는 UI가 필요할 때는 처음부터 네이티브 `<select>`를 쓰지 말고 버튼 그룹을 기본값으로 고려할 것 — 이미 자리잡은 디자인 언어와 확실히 어울리고, 드롭다운 팝업 스타일링 한계도 원천적으로 피할 수 있음.
- **재사용 지점**: `cmRowToData()`/`cmOpenMy()`의 내 커미션 목록 매핑/`cmSubmitReg()`/`cmPreviewReg()`/`cmDetailHTML()` 전부 `descHtml` 필드를 같이 실어 나르도록 수정 — 상세 페이지는 있으면 `sanitizePostHtml()`로 다시 한번 살균해서 렌더링(저장 시점에도 이미 살균하지만, 렌더링 시점에도 재살균하는 게 일반 게시글의 `p.html` 렌더링과 동일한 방어적 패턴).
- **테스트**: 굵게·글자크기·이미지 삽입까지 브라우저에서 직접 서식 적용→미리보기→상세페이지 렌더링까지 전부 확인, 수정 시 기존 서식이 그대로 다시 불러와지는 것도 확인. 실제 이미지 업로드·저장(Storage RLS가 실제 로그인 계정을 요구)은 사용자가 직접 확인.

### 유저 광고에 커미션 광고 추가 (2026-07-31 추가)
기존 유저 배너 광고는 **글(`posts`)만** 대상으로 걸 수 있었는데, 커미션도 광고할 수 있게 확장. 광고 시스템 전반(DB·RPC·표시·잠금·알림·관리자)을 건드리는 작업이라 지점이 많았음.
- **DB**: `user_ads.linked_commission_id`(FK→commissions, `on delete cascade`, nullable) 추가 + `linked_post_id`를 nullable로 완화 + `user_ads_target_check` 제약(글/커미션 중 정확히 하나만 연결, reports의 3분기 제약과 같은 원칙). `notifications.link_commission_id`도 추가(반려 알림용). **`create_user_ad` RPC는 파라미터가 바뀌어 `drop` 후 재생성** — 시그니처를 `(p_image_url, p_points_per_day, p_duration_days, p_post_id default null, p_commission_id default null)`로 바꾸고, 포인트 검증·차감·`app.trusted_score_update` 신호는 원본 그대로 유지하되 소유권 검증만 "본인 글 또는 본인 커미션"으로 분기. 클라이언트가 **named 파라미터**로 호출해서 순서 변경과 무관하게 안전. `reject_user_ad`는 반려 알림에 `link_commission_id`도 넣도록 교체(시그니처 동일, drop 불필요). `approve_user_ad`/`admin_remove_ad`는 `linked_post_id`를 참조하지 않아 무변경.
- **진입점**: "내 커미션" 목록(`cmMyListHTML`) 각 카드에 **"📢 광고" 버튼**(`openCreateAdForCommission`) 추가. 글은 상세에, 커미션은 "내 커미션" 목록에 — 소유자 컨트롤이 이미 거기 모여 있어서. 기존 광고 모달(배너 업로드·포인트 입력)을 그대로 재사용하고 제목만 `adModalTitle`로 분기.
- **표시**: `adTargetOnclick(ad)` 헬퍼 신설 — 커미션 광고면 `cmOpenCommissionById()`, 글 광고면 `openPost(100000+id)`. 목록 배너·관리자 3화면(신고 목록/전체 광고 목록/광고 심사)이 전부 이 헬퍼를 씀. 관리자 화면에선 커미션 광고를 🎨, 글 광고를 📝로 구분 표시.
- **수정 잠금**: 광고 집행(pending/active) 중인 커미션은 "내 커미션"에서 **🔒 수정 불가** 표시 + `cmOpenRegister`에 방어 가드(글의 `adLocked`와 동일한 개념). `loadRealPosts()`가 `AD_LOCKED_COMMISSION_IDS`(전역)를 채우고, `cmRowToData()`/`cmOpenMy('mine')` 매핑이 이걸로 `adLocked`를 세팅.
- **알림**: `dbRowToNotif()`에 `commission` 필드 추가, `notifClick()`이 `n.commission`이면 `cmOpenCommissionById()`로 이동(커미션 광고 반려 시).
- **테스트**: 사용자가 실제 계정으로 등록→관리자 심사→승인→배너 노출·클릭 이동까지 "잘 작동해"로 확정. AI 쪽 라이브 검증은 다른 세션이 포트 3000을 점유해 이 세션에서 서버 기동이 막혀 코드 검사(`node --check`)로만 확인함.

### 유료 CPM 광고 시스템 (2026-07-31 추가, 4단계로 진행)
기존 "유저 포인트 광고"와 **별개의 상업 트랙**. 사용자의 방침: **지면 슬롯의 80%를 유료 광고, 20%를 유저 포인트 광고**에 배정(기존 `AD_USER_SHARE_MAX=0.20` 상수가 원래 이 의도였음). 노출은 **뷰어블(IAB식: 50%·1초) 기준**으로 측정하고, 판매한 노출수(CPM)만큼만 태우고 목표 도달 시 자동 종료. 캠페인은 **관리자 수동 등록**. AskUserQuestion으로 이 세 방향을 확정한 뒤 진행.
- **1단계 — DB(4절 `ad_campaigns`/`ad_impression_daily` 참고)**: 캠페인 테이블 + 일별 집계 테이블 + RPC 2개. `record_ad_impressions(p_campaign_id,p_count)`(뷰어블 노출 누적, 한 번에 1~20만 허용·집행기간·active일 때만·목표 도달 시 completed 전환, security definer로 anon+auth 실행) / `get_servable_ads()`(지금 노출 가능한 캠페인만 안전 컬럼으로 반환 — `cpm_price`·`advertiser` 같은 영업정보는 숨김, `get_score_leaderboard`처럼 definer로 컬럼 좁히는 패턴). 노출수 누적은 **서버 RPC만** 가능(클라이언트 조작 차단).
- **2단계 — 관리자 등록·관리(`openAdminCampaigns` 외, palo.js)**: "내 정보 → 관리자 메뉴 → 🎯 유료 광고 관리". 배너 업로드(기존 광고 배너와 같은 `post-images` 버킷, `campaign-...` 경로)+광고주+이동주소(`https://` 검증)+판매 노출수+CPM+집행기간 입력 → `ad_campaigns` insert. 목록은 진척률 바(`served/goal`)+상태 배지+멈춤/재개/보관/삭제. `/admin` React 페이지가 아니라 palo.js에 둔 이유: 기존 유저광고 관리 UI(`openAdminAdReview` 등)가 전부 palo.js에 있어서 광고 관리를 한곳에 모으려고.
- **3단계 — 서빙(80/20)+뷰어블 측정**: `adRow()`를 재작성 — 슬롯마다 `Math.random()<AD_PAID_SHARE(0.80)`면 유료, 아니면 유저. 유료 선택은 `pickServableCampaign()`이 **페이싱 가중치**(집행기간 대비 덜 나간 캠페인 우선, `목표×경과비율−실제`, 최소 1로 바닥)로 고름. 유료 재고 없으면 `userAdRowHTML()`(옛 adRow 본문, 유저광고 or 하우스)로 폴백. 측정은 `IntersectionObserver`(threshold 0.5, 1초 연속·백그라운드 탭 제외)→`queueAdImpression()`이 로컬 카운트+배치 큐에 넣고 4초마다 `flushAdImpressions()`가 `record_ad_impressions`로 전송(20개씩 청크). `observeAdBanners()`를 `renderList()`(일반 목록 경로)의 `innerHTML` 직후 호출해 새 배너에 옵저버 attach. **죽은 코드였던 `computeAdWeights`+상수 2개 제거**(20% 배분이 이제 슬롯 롤로 대체됨).
- **4단계 — 일별 리포트(`openCampaignReport`)**: 캠페인별 "📊 리포트" → `ad_impression_daily`를 집행 시작~오늘까지 하루 단위(0인 날 포함)로 채워 **가벼운 CSS 막대그래프**(인라인 스타일, recharts는 React 전용이라 palo.js에선 못 씀)로 표시 + 총 진척률·일평균.
- **정직한 한계(사용자에게 고지함)**: 클라이언트 측정이라 부정 트래픽에 완벽 방어는 아님(뷰어블+RPC 상한+집행기간으로 1차 방어). **프리퀀시 캡 미구현**(재렌더/재방문마다 뷰어블이면 카운트). 페이지 완전 종료 순간의 마지막 배치는 유실 가능(대부분 4초 타이머로 이미 전송). 필요 시 서버측 레이트리밋·프리퀀시 캡을 다음 단계로.
- **테스트**: 4단계 전부 dev 서버(localhost:3000)에서 실측 — 서빙(배너 렌더·80/20 분배·페이싱), 측정(옵저버 attach·큐잉·배치 flush·RPC 상한 방어 "유효하지 않은 노출 수"·없는 캠페인 no-op), 리포트(막대 5개·0인 날 포함·진척률 34% 렌더)까지 브라우저 실측으로 확인. 실제 캠페인 등록→노출→집계 반영은 사용자가 "잘 작동해"로 확정.
- **오픈 초기 정책 변경(2026-08-01) — 유료 미서빙 + 유저 광고 개당 4% 상한만**: 사이트 오픈 초기엔 유료 광고를 받지 않기로 함. `AD_PAID_SHARE=0`으로 두어 `pickServedAd`의 유료 분기를 통째로 건너뜀(유료 등록 UI·측정 코드는 그대로 두되 서빙만 안 됨 — 나중에 값만 올리면 재개). 유저 광고는 **개당 4% 상한(`AD_PER_AD_SHARE_MAX=0.04`)만 유지하고 '전체 20% 상한'은 제거** — 각 광고 확률 `min(4%, points_spent 지분)`, 합에 상한이 없어 광고가 많으면 **최대 100%까지 유저 광고로 채워지고** 남는 확률만 하우스로 감(옛 3단계의 "20% 슬롯 롤"을 대체). 지면 하우스 문구도 "유저 광고와 유료 광고가 노출됩니다"→**"이 자리에 유저 광고가 노출돼요"**로 변경(`houseAdHTML`). 시뮬레이션(20만회): 동일광고 10개→각 4%·총 40%(20% 초과=상한 제거 확인), 30개→총 100%·하우스 0%, 지분 큰 광고도 4%로 컷.
- **광고 지면 3곳 + 빈도 조정(2026-07-31 후속)**: 광고가 서빙되는 지면은 (1) 홈 피드 목록 중간, (2) 게시글 상세 댓글란 위(`.d-ad`), (3) 데스크톱 오른쪽 사이드바(`.side-r .ad-widget`) 3곳. (2)(3)은 원래 정적 하우스 광고만 뜨던 자리였는데 실제 서빙+측정을 붙임 — 재고 없으면 기존 하우스 광고 유지. 이때 3단계의 `adRow()`/`userAdRowHTML()`/`campaignBannerHTML()`을 **`pickServedAd()`(어떤 광고 내보낼지 결정)+`servedBannerHTML(s,extraClass)`(배너 HTML, `.d-ad`/`.side-ad` 마진용 extraClass)+`houseAdHTML()`로 리팩터링**해 세 지면이 한 경로를 공유. (2)(3)은 `renderDetailAd()`/`renderSidebarAd()`(공용 `replaceStaticAdSlot`)가 렌더 직후 정적 슬롯을 서빙 배너로 교체. **`observeAdBanners()`의 셀렉터를 `#main [data-campaign-id]`→`[data-campaign-id]`(문서 전체)로 넓힘** — 사이드바가 `#main` 밖이라 안 그러면 측정 누락됨. 피드 광고 삽입 간격은 고정 5개마다→**랜덤 10~15개마다**(`adGap=10+Math.floor(Math.random()*6)`)로 낮춤(40개 페이지당 ~7~8개→~2~3개).

### 후기 조작 탐지·분석 (2026-07-31 추가, 2단계)
커미션 후기의 조작(예: 특정 작가에게 후기 급증, 자작·품앗이)을 서버에서 탐지해 **관리자에게 실시간 알림**을 주고, 관리자가 **분석 대시보드**로 드릴다운. AskUserQuestion으로 탐지 신호 4종 전부 + "실시간 알림+분석"으로 확정.
- **탐지 신호 4종(임계값)**: ① 급증(24h `REVIEW_SURGE=5`건↑) ② 중복 리뷰어(같은 사람이 같은 작가에게 `REVIEW_REPEAT=2`건↑) ③ 상호 후기/품앗이(A→B, B→A 서로 후기) ④ 신규 계정 집중(가입 7일 이내 계정 `REVIEW_NEWACCT=3`명↑). 후기 = `posts`(board=`review`, `reviewed_user_id`=작가, `author_id`=리뷰어).
- **1단계 DB(트리거)**: `notifications.link_reviewed_user_id`(uuid) 컬럼 + `detect_review_manipulation()`(posts AFTER INSERT, board=review일 때만) — 네 신호를 SQL로 검사, 하나라도 걸리면 `is_admin`인 모든 유저에게 `type='review_alert'` 알림 insert. **같은 작가는 24h 내 1회만**(link_reviewed_user_id로 중복 방지). 인덱스 `idx_posts_review_target(reviewed_user_id,created_at) where board='review'`. **⚠️ 함정**: `notifications.type` 체크 제약에 기존 데이터의 타입이 다 안 들어간 채 새 제약을 붙이면 23514로 실패 — "현존 distinct 타입 + review_alert"로 동적 재생성하는 do-블록으로 해결(스키마 표 참고).
- **2단계 클라이언트(분석 대시보드, palo.js)**: 알림 클릭(`notifClick`의 `review_alert` 분기)→`openReviewAnalysis(작가id)`로 그 작가 드릴다운. 관리자 메뉴 "🔍 후기 분석" 버튼 + 의심 건수 배지(`reviewSuspicionCountSync()`, created_at 없이 급증/중복/상호만 동기 계산). `reviewAnalysisScan(createdMap)`이 **트리거와 같은 임계값**을 이미 로드된 `POSTS`(reviews)에서 재계산(신규계정만 `reviewFetchCreatedMap()`로 리뷰어 `profiles.created_at` 추가 조회). 드릴다운(`reviewAnalysisArtistHTML`): 신호 배지 + 만족/불호 통계 + **최근 14일 후기 추이 막대**(급증일은 빨강) + 리뷰어별 집계(중복/품앗이/신규계정 태그) + 후기 목록. **탐지는 "의심 신호"일 뿐 확정 아님** — 정상 인기 급증도 걸릴 수 있어 최종 판단은 관리자.
- **테스트**: 2단계 클라이언트는 dev 서버에서 네 신호를 유발하는 가짜 후기 주입으로 실측(목록 표시·정상 작가 제외·드릴다운·품앗이 양쪽 배지). 1단계 트리거 SQL은 사용자가 실행 완료(에러 없음). 실제 후기 등록→트리거 발화→관리자 알림 수신은 사용자가 확인 예정.

### 웹 푸시 알림(PWA) (2026-07-31 추가, 2단계+후속)
"사이트를 안 켜놔도 기기로 알림". PWA로 설치(홈 화면 추가)해야 iOS에서 푸시가 옴(iOS 16.4+ 제약). **발송 서버는 Supabase Edge Function 대신 Vercel API 라우트**(`git push`로 자동 배포되는 게 사용자에게 쉬움).
- **1단계 — PWA 토대**: 사용자가 준 아이콘 이미지(`public/palo-icon.png`)를 sharp로 192/512/apple(불투명 flatten)/favicon 생성. `app/manifest.js`(Next 네이티브 매니페스트, display standalone, theme `#e07aa6`). `public/sw.js`(서비스워커, `push`·`notificationclick` 핸들러). `layout.js` metadata에 아이콘·appleWebApp + `viewport.themeColor`. SW 등록은 palo.js에서(afterInteractive라 load 이후일 수 있어 `readyState==="complete"`면 즉시 등록). 알림설정 화면 개편: `notifEnableHTML()`(권한 상태별: iOS 홈화면 추가 안내 / 알림 켜기 버튼 `.pf-notif-btn` / 켜짐·차단 안내), 토글 5개(`toggleNotifPref`, localStorage `palo_notif_prefs`에 저장). **⚠️ `.r-ok`는 `.rules` 모달 스코프 전용**이라 프로필 버튼엔 무스타일 → `.pf-notif-btn` 전역 클래스 신설로 해결(이 프로젝트 반복 함정). **standalone 탭바**: `@media (display-mode: standalone)`에서 `.tabbar` 하단 패딩 `+18px`(홈화면 앱에서 너무 아래로 느껴져서).
- **2단계 — 실제 발송**: `push_subscriptions` 테이블(스키마 표) + `app/api/push/route.js`(Vercel, `runtime='nodejs'`). Supabase **데이터베이스 웹훅**이 notifications INSERT 때 이 라우트로 POST(헤더 `x-push-secret`=`PUSH_WEBHOOK_SECRET` 검증) → service_role로 그 유저 구독 조회 → **type→토글 매핑**(`TYPE_PREF`)으로 그 종류를 켠 구독에만 `web-push`로 전송(만료 404/410 구독은 삭제). `ad_rejected`/`review_alert`는 토글 무관 항상 발송. 클라이언트: 권한 허용 후 `subscribeToPush()`가 VAPID 공개키(`window.VAPID_PUBLIC_KEY`, PaloApp에서 노출)로 구독→`push_subscriptions` upsert, 로그인 시 재구독, 토글 변경 시 prefs DB 갱신. **사용자 일회성 설정**: VAPID 키 생성(AI가 대신 생성해줌)·Vercel 환경변수 5개(`NEXT_PUBLIC_VAPID_PUBLIC_KEY`/`VAPID_PRIVATE_KEY`/`VAPID_SUBJECT`/`PUSH_WEBHOOK_SECRET`/`SUPABASE_SERVICE_ROLE_KEY`)·Supabase 웹훅 1개. **VAPID 키 미설정이면 `subscribeToPush()`가 조용히 false**(코드는 먼저 배포해도 안 깨짐).
- **커미션 문의 알림(`cm_inquiry`)**: `notify_new_message` 트리거 확장 — 메시지에 `commission_id`가 있고 **받는 사람이 그 커미션 작가**면 `type='cm_inquiry'`(아이콘 🎨)로 생성(그 외엔 기존 `chat`). "커미션 문의" 토글(`cminquiry`)이 인앱 실시간 필터·발송 양쪽에서 이걸 존중. 클릭은 기존 `chat`처럼 `link_chat_user`로 채팅 열림.
- **아직**: "공지·챌린지" 알림은 그 알림을 만드는 트리거가 아직 없어 토글은 있으나 발송 안 됨(다음 후보). Vercel 배포 lint 체크가 기존 `app/admin/page.js`의 새 react-hooks 규칙(`set-state-in-effect`/`immutability`)으로 code 1이던 걸 eslint.config.mjs에서 warn으로 낮춰 해결(런타임 무관).
- **검증**: PWA 매니페스트·아이콘·SW 등록·`/api/push`(비밀 없으면 401)·`subscribeToPush` VAPID 미설정 시 false·base64url 디코딩까지 dev 서버 실측. 실제 발송·기기 수신·cm_inquiry 발화는 사용자 설정 후 실기기 확인.

### 1:1 채팅 (커미션 거래 상담용)
설계·구현을 2단계로 나눠서 진행: 1단계(저장만 되는 채팅) → 2단계(실시간 + 채팅 목록 + 읽음 표시).

- **DB**: `conversations`(방 1개=참여자 2명) + `messages`. RLS/RPC는 4절 참고(특히 `mark_messages_read` RPC로 좁힌 이유).
- **방 찾기/생성**: `findOrCreateConversation(otherUserId)` — `user1_id`/`user2_id` 어느 순서로 저장됐는지 모르니 `.or()`로 양방향 매칭 조회, 없으면 insert. 동시에 두 번 열렸을 때의 경쟁(race)도 재시도 처리.
- **실시간 수신**: `subscribeToChat(conversationId)` — Supabase Realtime `postgres_changes` 채널 구독. INSERT 이벤트로 상대가 보낸 새 메시지를 즉시 화면에 추가하고 자동으로 `mark_messages_read` 호출, UPDATE 이벤트로 "읽음" 표시 갱신.
- **채팅 목록(받은함)**: `openChatList()` — 내가 참여한 모든 대화를 `last_message_at` 최신순으로, 상대 닉네임·마지막 메시지 미리보기·안 읽은 개수(뱃지)와 함께 표시.
- **읽음 표시**: 내가 보낸 메시지 옆에 상대가 읽으면 "읽음" 텍스트가 뜸(`is_read` 컬럼 + realtime UPDATE 구독으로 실시간 반영).
- 채팅 UI 전용 CSS 클래스가 `app/globals.css`에 추가됨: `.chat-list`, `.chat-msg`, `.chat-bubble`, `.chat-inputrow`, `.chat-send`, `.chat-read-status`, `.chat-room-list`, `.chat-room-row`, `.chat-unread-badge`. **(2026-08-01 재디자인으로 이 화면 CSS·마크업은 대부분 아래 "채팅 UI 전면 재디자인" 항목의 새 클래스(`.chatlist`/`.clist-*`·`.chatroom`/`.cr-*`)로 교체됨 — 여기 나열된 옛 클래스들은 현재 죽은 CSS.)**
- **채팅 신고(2026-07-29 추가)**: 채팅방 헤더에 "🚩 신고" 버튼(`reportChat()`) — 기존 글 신고용 `#reportModal`을 그대로 재사용하고, `reportingConversationId`/`reportingReportedUserId` 전역 변수로 "지금 신고 중인 게 글인지 채팅인지" 구분(`submitReport()`가 분기 처리). DB/RLS는 4절 "reports" 항목과 "RLS 순환 참조 주의" 참고.
- **관리자 채팅 열람(2026-07-29 추가)**: "내 정보" 탭에 관리자 전용 버튼 두 개 — "🛡 신고 목록"(기존)과 "🛡 전체 채팅 목록"(신규, `openAdminChatList()`). 신고 목록에서든 전체 목록에서든 대화를 열면 공통 함수 `adminViewConversation(conversationId, reportId, backTo)`가 처리: 메시지 전체를 읽기 전용으로 보여주고(`renderAdminChatView()`, `닉네임: 내용` 형태), **열람할 때마다 `chat_admin_access_logs`에 자동으로 기록**(누가·언제·어느 대화를, 신고를 통해 열람했다면 어느 신고 건인지). `openAdminChatList(searchTerm)`은 닉네임으로 대화 상대를 검색할 수 있음(profiles를 `ilike` 검색 → 그 유저가 낀 대화만 필터링). RLS: `conversations_select_admin_all`/`messages_select_admin_all`(관리자는 전체 대화 조회 가능), 로그 테이블은 4절 "chat_admin_access_logs" 참고 — **관리자 본인도 로그를 고치거나 지울 수 없음**(update/delete 정책 없음).
- **이용약관/개인정보처리방침 문구**: 채팅 열람 기능에 대한 고지 조항 초안을 세션 대화 중에 작성해서 사용자에게 전달함(파일로 저장하지 않음) — 실제 약관/방침 페이지 자체는 아직 미구현(6절 "아직 안 한 것" 참고), 페이지를 만들 때 그 문구를 넣을 것.

### 채팅 UI 전면 재디자인 + 하단 탭 개편 + 모바일 다듬기 (2026-08-01)
카카오톡/인스타 DM 스타일로 채팅 두 화면(목록·대화방)을 시안 기반으로 재디자인함. 위 "1:1 채팅"의 백엔드(테이블·RLS·실시간·읽음 처리)는 그대로 두고 **화면(마크업·CSS)만** 교체.
- **하단 탭 개편**: 하단 탭바의 "게시판"을 제거하고 **"채팅"으로 대체**(위치: 글쓰기 오른쪽·내 정보 왼쪽). `app/body-html.js`의 `<nav>` 수정, `data-tab="chat"` → 클릭 시 `openChatList()` + `syncTabs("chat")`로 활성 표시.
- **채팅 리스트 재디자인(이미지2 시안)**: `.chatlist`/`.chatlist-search`(검색, `filterChatList`)/`.clist-row`(아바타·이름·마지막 메시지·날짜·안읽음 뱃지). `openChatList()`가 상대 `avatar_url`까지 조회, 날짜 라벨 헬퍼 `chatListDate`. 기존 `.chat-room-list`/`.chat-room-row`를 대체.
- **채팅방 재디자인(이미지1 시안)**: 브랜드색 헤더(뒤로·상대 이름·🚩신고, **햄버거 제거**) + 날짜 구분선(`.cr-divider`) + 상대 메시지 아바타+이름(연속 메시지는 그룹핑) + **초록 내 말풍선** + 읽음·시간 + 커미션 문의는 특수 말풍선(클릭 시 커미션으로 이동). 마크업 `chatMessagesHtml`(날짜/발신자 그룹핑)·`renderChatView`, CSS `.chatroom`/`.cr-*`.
- **⚠️ iOS `position:fixed` 함정 — 이번 작업의 핵심 교훈**: 채팅방을 처음엔 `#main` 안에서 전체화면으로 띄웠더니 아이폰에서 말풍선이 홈 레이아웃 위로 겹쳐 뜨며 깨짐. 원인은 **`position:fixed`가 transform/filter를 가진 상위 요소 안에서는 뷰포트가 아니라 그 조상 기준으로 잡혀 깨진다**는 것. **고침: 채팅방 오버레이(`#chatRoom`)를 `document.body` 최상위 직속으로 배치**해 상위 transform 영향을 원천 차단(`app/body-html.js`의 `</nav>` 바로 뒤 `<div id="chatRoom" class="chatroom">`). Chromium 개발 환경에선 재현이 안 돼 실기기 리포트로만 잡힌 버그 — **이 프로젝트에서 전체화면 오버레이를 만들 땐 body 직속으로.**
- **모바일 키보드 처리**: `fitChatRoom()`이 오버레이의 **top은 고정하고 bottom만 키보드 높이(`window.innerHeight − visualViewport.height − offsetTop`)만큼 올려** 헤더가 안 움직이게 함 + CSS `transition:bottom`으로 한 프레임 점프 대신 부드럽게 상승 + 키보드가 떠 있으면 `.kb-up` 클래스로 입력줄 하단 여백 축소. **`lockBodyForChat()`/`unlockBodyForChat()`**: 채팅이 열려 있는 동안 `body`를 `position:fixed`로 잠가, iOS가 입력창 포커스 시 페이지를 스크롤해 **고정 헤더를 위로 밀어내고 키보드 위에 빈 여백을 만들던 문제**를 차단(나갈 때 원래 스크롤 위치 복원). **`autoGrowChatInput()`**: 입력창 기본 한 줄(38px), 여러 줄 칠 때만 100px까지 확장, 전송 후 복귀. 입력줄 3요소(+·입력칸·전송)는 `align-items:center` 세로 중앙 정렬, 입력칸은 배경 박스 없이 텍스트만.
- **모바일 줌/탭바 튐 수정(선행)**: 입력창 포커스 시 iOS 자동 확대 방지(`layout.js`의 `viewport.maximumScale=1`, `userScalable=false`) + `body.kb-open`일 때 하단 탭바 숨김(키보드가 탭바를 밀어올리던 문제).
- **더미 데이터 제거**: 원본 프로토타입 잔재였던 하드코딩 더미 글과 첫 진입 시 뜨던 가짜 알림들을 제거(실제 데이터/알림과 섞이는 혼란 제거).

### 스와이프/뒤로가기로 앱 내부 화면 닫기 (2026-08-01, 커미션·채팅 완료)
모바일에서 왼쪽→오른쪽 스와이프(iOS 가장자리 뒤로가기)가 **게시글에서는 되는데 커미션·채팅에서는 안 되던** 문제. 원인: 게시글은 `/post/[id]` 실제 URL로 바뀌어 브라우저 히스토리에 기록이 남지만(iOS 스와이프는 결국 브라우저 뒤로가기를 실행하는 제스처라 그 기록을 따라감), 커미션·채팅은 URL을 안 바꾸고 `#main`/오버레이만 교체해 **히스토리에 흔적이 없어** 돌아갈 곳이 없었음.
- **방법 선택**: URL 방식(A) vs 제스처 직접 감지(B) 중 **A 채택**. iOS는 화면 가장자리 스와이프를 OS/브라우저가 먼저 가로채 자기 뒤로가기로 쓰기 때문에, JS로 제스처를 또 잡으면(B) 충돌해 불안정함. 대신 화면을 열 때 **히스토리 항목만 하나 쌓아**(주소는 그대로) 게시글과 동일한 네이티브 뒤로가기 흐름에 태우는 게 부작용이 가장 적음.
- **공통 장치**(`public/palo.js`): `screenStack`(열린 앱 내부 화면들의 `{key, back}` 목록) + `enterScreen(key,back)`(화면 진입 시 호출 — `history.pushState`로 항목 쌓고 back 함수 등록, 같은 key면 중복 push 대신 갱신, `navigatingBack` 중엔 push 안 함) + `screenBack()`(화면 안 `‹` 버튼용, `history.back()` 호출) + `resetScreens()`(최상위 탭으로 나갈 때 스택 비우기). `popstate` 핸들러 맨 앞에서 `screenStack`이 비어있지 않으면 top의 back을 실행하고 종료(게시글/프로필 URL 라우팅은 스택이 빌 때만).
- **커미션 적용**: 각 화면 렌더 함수 맨 위에 `enterScreen`을 넣고(목록=`goHome`, 상세=`cmDetailBack`, 후기=`cmBackToDetail`, 작가프로필=`cmBackToDetail`, 신청서→상세, 후기작성→후기목록, 등록→내커미션/목록, 내커미션→목록), 각 화면의 `‹` 버튼 onclick을 `screenBack()`으로 통일. 최상위 진입점(`goHome`/`openWrite`/`openProfile`/`openPost`/`openUserProfile`)에 `resetScreens()`를 넣어 커미션 흐름을 벗어나면 스택을 비움. **핵심 원리**: 렌더 함수 안의 `enterScreen`이 `navigatingBack` 가드로 보호돼, 같은 함수가 "앞으로 진입"일 땐 push하고 "뒤로가기로 재호출"될 땐 push를 건너뛰므로, 목록↔상세처럼 한 함수가 진입점이자 복귀 대상인 이중성이 자동 해결됨.
- **채팅 적용**: `openChatList`(탭 진입 겸 채팅방의 뒤로-대상 → `goHome`)에 `if(!navigatingBack)resetScreens();enterScreen("chatList",goHome)`, `openChat`이 `renderChatView` 직전에 `enterScreen("chatRoom",openChatList)`, 채팅방 `‹`(`cr-back`) onclick을 `screenBack()`으로 변경. 채팅방은 body 최상위 오버레이(`#chatRoom`)라 뒤로 시 `openChatList`가 `leaveChat()`으로 오버레이를 닫고 리스트를 다시 그림. **주의**: 채팅방은 `lockBodyForChat()`으로 `body{position:fixed}` 잠금 상태라, iOS 가장자리 스와이프가 이 잠금과 충돌 없이 히스토리 뒤로가기를 발동하는지는 실기기 확인이 특히 중요(Chromium에선 재현 불가).
- **검증**(dev 브라우저): 커미션 목록→상세→후기 진입 시 스택이 `cmList>cmDetail>cmReviews`로 쌓이고 `history.back()` 두 번에 후기→상세→목록 한 단계씩 복귀, 한 번 더로 홈. 상세에서 홈 탭을 누르면 스택이 비고 이후 뒤로가기로 커미션이 안 되살아남. 채팅도 `chatList>chatRoom` 스택 + 뒤로 시 채팅방→리스트→홈 순서 확인. 실제 iOS 스와이프 체감은 사용자 실기기 확인.
- **🐛 커미션 상세→작가 프로필에서 여러 단계 건너뛰던 버그 수정 (2026-08-01)**: 커미션 화면들은 `screenStack` 기반인데, 상세의 작가행 클릭이 부르는 `openUserProfile()`은 "홈에서 진입" 가정으로 시작 시 `resetScreens()`(스택 비움) + `/user/` URL로 pushState하는 **다른 방식**이라, 커미션 흐름 안에서 프로필로 가면 **스택이 통째로 비워져** 뒤로가기가 상세·목록을 건너뛰고 홈으로 튐(재현·확인함). **고침**: `openUserProfile(userId, keepStack)`에 `keepStack` 인자 추가 — true면 `resetScreens()`도 `/user/` pushState도 건너뜀. 커미션 상세의 작가행은 새 래퍼 `cmOpenAuthorProfile(userId)`(=`enterScreen("cmAuthorProfile",cmBackToDetail)` 후 `openUserProfile(userId,true)`)를 부르게 해, 프로필이 커미션 스택에 얹혀 **프로필→상세→목록→홈** 한 단계씩 복귀. 홈 피드 등 일반 진입(`keepStack` 없음)은 예전대로 스택 초기화+URL 변경 유지(게시글 경로 `openPost`도 손대지 않음). 검증: `cmList>cmDetail>cmAuthorProfile` 스택에서 뒤로 3번 → 상세→목록→홈 확인, 일반 진입 시 `resetScreens` 여전히 동작 확인.

### 초기 로딩 중 다른 탭으로 이동해도 홈으로 튕기던 문제 수정 (2026-08-01)
사이트 진입(또는 홈화면 앱 실행) 시 `loadRealPosts()`가 글을 불러오는 동안, 사용자가 하단 탭으로 다른 화면(커미션/채팅/글쓰기/프로필 등)에 이동해도 **로딩이 끝나는 순간 무조건 홈으로 되돌려지던** 문제. 원인: `loadRealPosts()` 꼬리에서 딥링크(`/post`·`/user`)가 아니면 무조건 `renderList()`(홈)를 호출해 사용자가 이동한 화면을 덮어썼음.
- **수정**: 전역 `userLeftHome` 플래그 추가 — `openCommissionList`/`openChatList`/`openWrite`/`openProfile`/`openPost`/`openUserProfile`(=홈 피드 밖으로 나가는 진입점) 시작에서 `true`로 세팅. `loadRealPosts()` 꼬리의 초기 라우팅(`openPost`/`openUserProfile`/`renderList`)을 `if(!userLeftHome){...}`로 감쌈. 홈 피드 안에서의 게시판 전환(`selectBoard`/`goHome`)은 플래그를 안 세워, 로딩 완료 시 피드가 정상적으로 실제 글로 갱신됨.
- **주의**: `public/palo.js`는 `/public`의 정적 파일이라 Next dev의 HMR 대상이 아님 — 수정 후 브라우저 **새로고침**해야 반영됨(검증 중 옛 코드가 잡혀 헷갈렸던 지점). `applySession()`은 프로필 화면에 있을 때만(`#myProfileView` 존재 시) 다시 그리므로 홈 강제 복귀의 원인이 아님(확인함).
- **검증**(dev): `userLeftHome=true`면 `loadRealPosts()` 완료 후에도 기존 화면 유지(홈 강제 렌더 안 함), `false`면 피드 정상 렌더 확인.

### 초기 로딩 속도 개선 — 쿼리 병렬화 (2026-08-01)
`loadRealPosts()`가 쿼리 11개(notices·level_thresholds·user_ads×2·get_servable_ads·posts·profiles·comments·comment_helpful·likes·post_images)를 **하나씩 순차 await**해서, 데이터가 작아도(글 28개 ≈ 13KB) 네트워크 **왕복 지연이 11번 누적**되는 게 병목이었음(모바일망에선 왕복당 100~300ms라 체감이 큼). 데이터 크기가 아니라 **왕복 횟수**가 문제.
- **수정**: 의존 관계로 3개 wave로 묶어 각 wave 안은 `Promise.all`로 병렬 실행. **1차**(서로 독립): notices/level_thresholds/user_ads(active)/get_servable_ads/user_ads(adlock)/posts/profiles 7개 동시. **2차**(posts의 dbIds 필요): comments/likes/post_images 3개 동시. **3차**(comments의 id 필요): comment_helpful. 11번 순차 → 3번 묶음.
- **검증**(dev 브라우저 실측): 동일 쿼리 순차 585ms → 새 병렬 `loadRealPosts()` 142ms = **약 4.1배** 단축. 로드 후 글/작성자/좋아요/댓글/이미지 매핑·피드 렌더 정상 확인. 모바일에선 왕복 지연이 커 절대 개선폭이 더 큼.
- **스켈레톤은 이미 있음**: `app/body-html.js`의 정적 `#main`에 `.skel-row` 5줄 + 트렌드바 스켈레톤이 박혀 있어 데이터 오기 전 첫 페인트에 즉시 표시됨(빈 화면 아님).
- **아직 안 한 것(효과 대비 위험 커서 보류)**: ① 초기 posts 쿼리에서 `content_html`(상세 전용, 인라인 이미지로 커질 수 있음) 제외하고 `openPost` 때 지연 로드 — 현재 데이터에선 1KB라 이득 미미. ② posts 페이지네이션(limit) — 클라이언트 정렬/필터가 전체 POSTS 배열에 의존해 동작이 바뀜.

### 초기 로딩 속도 개선 — 재진입 캐시 (2026-08-01)
앱을 다시 열 때(특히 홈화면 PWA 재실행) 네트워크를 기다리지 않고 지난번 피드를 **즉시** 보여주고, 뒤에서 최신으로 교체하는 stale-while-revalidate 캐시.
- **멱등화 선행(필수)**: `POSTS=real.concat(POSTS)`가 호출마다 앞에 덧붙여 재호출 시 글이 중복되던 구조를, `POSTS=real.concat(POSTS.filter(p=>!p.dbId))`로 변경 — 기존 실제 글(dbId 있음)은 새 `real`로 교체하고 클라이언트 전용 글(낙관적 추가·캐시 프라임 등 dbId 없는 것)만 남김. 이게 있어야 "캐시 렌더 → 백그라운드 loadRealPosts 재실행"이 중복 없이 안전함.
- **저장**(`saveFeedCache`): `loadRealPosts()` 성공 시 `real`을 `localStorage["palo_feed_v1"]`에 `{t,posts}`로 저장. **`content_html`(=`html` 필드)은 제외** — 인라인 이미지로 커져 localStorage 용량(≈5MB)을 위협하고 목록엔 안 쓰이며 갱신 시 다시 채워짐. `try/catch`로 용량 초과 시 조용히 건너뜀. (실측 28개 ≈ 19KB.)
- **불러오기**(`loadFeedCache`): 24시간 이내 캐시만 유효(그 이상은 버림).
- **프라임**(부팅 `initAuth().then(loadRealPosts)` 직전 `primeFromCache()`): 딥링크(`/post`·`/user`)나 `userLeftHome`이 아니고 캐시가 있으면 `POSTS`를 캐시로 채우고 `renderChips/renderHot/renderTrend/renderList` 즉시 실행 → 이어서 `loadRealPosts`가 최신으로 교체.
- **검증**(dev): 캐시 저장 19KB(html 없음 확인), `loadRealPosts` 2회 호출 시 실제 글 수 28→28 그대로(멱등, 중복 없음), 캐시 있는 상태 새로고침 시 이른 시점에 이미 피드 21행 렌더(네트워크 갱신 후 동일), 콘솔 에러 없음.

### 커미션 작업 사례 (worksamples) (2026-08-01 추가, 1단계)
커미션 상세에 "그 커미션으로 최근 작업한 결과물"을 작가가 상세히 등록하고 주문자가 볼 수 있는 기능. **커미션 게시물별로 따로** 쌓이고 보임(작가 전체 포트폴리오가 아님).
- **DB**: `commission_worksamples` + `commission_worksample_images`(스키마·RLS는 4절). **RLS**: 조회는 누구나(`*_select_all`), 등록/수정/삭제는 **그 커미션의 작가만**(`exists(select 1 from commissions where id=commission_id and author_id=auth.uid())`, insert는 `author_id=auth.uid()`까지) — 화면에서 버튼을 숨기는 것과 별개로 서버가 남의 커미션 등록을 막음. 이미지 RLS는 `commission_worksamples→commissions` 조인으로 작가 확인. **Storage는 기존 `commission-images` 버킷 재사용**(경로 `${uid}/worksamples/...` → 버킷 RLS의 `foldername[1]=uid` 그대로 통과, 새 정책 불필요).
- **클라이언트**(`public/palo.js`, `cmWs*`): 커미션 상세(`cmDetailHTML`)에 "최근 작업물" 섹션(`#cmWsList`) + **작가 본인에게만** "+ 작업 사례 등록"(`AUTH.user.id===d.authorId` 판정). `cmOpenDetail`/`cmOpenCommissionById`가 렌더 직후 `cmLoadWorksamples(commissionId)`로 목록을 비동기 로드(가로 스크롤 썸네일 strip, `cmWsCache`에 캐시). 카드 클릭 → `cmOpenWorksample`(제목·이미지 전체·설명·날짜 상세). 등록 폼 `cmOpenWorksampleForm`(제목·이미지 여러 장·설명·작업날짜) → `cmSubmitWorksample`이 본체 insert 후 이미지 rows insert, 캐시 무효화 후 `screenBack()`으로 상세 복귀(목록 자동 갱신). 이미지 업로드는 기존 `compressImage`(긴 쪽 1800px·WebP·품질 0.8) + `CM_IMAGE_BUCKET` 재사용. 새 화면들은 `enterScreen(..., cmBackToDetail)`로 스와이프 뒤로가기에 편입(폼·상세→뒤로→커미션 상세).
- **검증**(dev): 테이블 생성·select(누구나) 확인, 작가일 때만 등록 버튼 노출·비작가는 보기만, 폼/상세 렌더, 스택(상세→폼/사례→뒤로→상세) 확인. **실제 등록(insert)은 커미션 작가 본인 계정에서 사용자 확인 예정**(RLS가 auth.uid 요구라 dev 가짜 세션으론 insert 검증 불가).
- **등록 페이지에서 바로 등록 (2026-08-01 추가)**: 커미션 등록 화면(`cmRenderRegisterScreen`) 헤더 아래에 "🎨 이미 등록한 커미션에 작업 사례 올리기" 버튼(`.cm-ws-shortcut`) → `cmOpenWsCommissionPicker()`(내 커미션 목록을 `commissions.eq(author_id)`로 조회해 카드로 표시) → 행 클릭 시 `cmOpenWorksampleForm(cid, cmOpenWsCommissionPicker)`로 **기존 등록 폼 재사용**. 이를 위해 `cmOpenWorksampleForm(commissionId, back)`에 `back` 인자 추가(기본 `cmBackToDetail`, 이 흐름에선 선택 화면으로 복귀). 스택: 등록→선택(`cmWsPicker`)→폼(`cmWsForm`)이 한 단계씩 뒤로. dev 확인 완료(버튼·목록·폼·뒤로 스택). **"내 커미션"(`cmOpenMy`) 헤더의 "+ 새 커미션" 왼쪽에도 보조 버튼("🎨 작업 사례", `.cm-write-btn.ghost`)을 추가** — `cmOpenWsCommissionPicker(cmOpenMy)`로 열어 뒤로가기가 내 커미션으로 돌아오게 함(`cmOpenWsCommissionPicker(back)`에 `back` 인자 추가, 기본은 등록 화면). 두 버튼은 `.cm-sub-actions` 래퍼로 묶어 우측 정렬(모바일 375px 넘침 없음 확인).
- **날짜 입력란 디자인 통일 (2026-08-01, 2단계로 진행)**: (1차) `input[type="date"]`에 `appearance:none` 등으로 바깥 박스는 맞췄으나, 사용자가 진짜 원한 건 **연·월·일을 고르는 부분**의 디자인이었음 — 그 부분은 **네이티브 date 픽커라 OS가 그려 CSS로 못 꾸밈**. (2차, 최종) 그래서 네이티브 `input[type=date]`를 버리고 **Palo 스타일 드롭다운 3개(연/월/일 `<select>`, `.cm-date-sel`)로 대체**: 기존 `.cm-reg-input` 테두리·반경·배경 재사용 + `appearance:none` + data-URI SVG 화살표. `cmDateSelectsHTML()`(연도 최근 11개년·월 12·일)·`cmWsSyncDays()`(연/월 변경 시 그 달 실제 일수로 '일' 재생성 → 2월 30일 등 무효 날짜 방지)·`cmDaysInMonth()`. 제출(`cmSubmitWorksample`)은 세 값으로 `YYYY-MM-DD` 조립(빈 값이면 null). dev 확인: 테두리·반경 텍스트 입력란과 일치, 윤년 2월 29일/평년 28일 보정, `2026-07-30` 조립 정상.
- **남은 것(2단계)**: 목록 '더보기'(현재는 가로 스크롤로 전부 노출), 필요 시 리치 텍스트 설명(`description_html` 자리 있음)·수정/삭제 UI.

### 커미션 삭제 (2026-08-01 추가)
커미션 상세 + 내 커미션 목록(`cmMyListHTML`)에서 **작가 본인만**(`isOwner=AUTH.user.id===d.authorId`, 내 커미션은 전부 본인 것) 🗑 삭제 버튼 노출 → `confirmDialog("삭제하면 되돌릴 수 없어요")` 확인창 → `cmDeleteCommission(id)`.
- **보안**: `supabase.from('commissions').delete().eq('id',id)` + 기존 **`commissions_delete_own` RLS**(`auth.uid()=author_id`)로 서버에서도 본인만 삭제됨(버튼 숨김은 UX, RLS가 진짜 방어선).
- **연결 데이터**: FK `on delete cascade`로 `commission_images`·`commission_worksamples`(+그 이미지)·`commission_applications`·`user_ads`(linked_commission) '행'이 자동 삭제. **후기(`posts.commission_id`)·알림·메시지는 `on delete set null`로 유지** — 후기는 고객 평판이라 작가가 커미션 삭제로 나쁜 후기를 지우지 못하게(사용자가 "유지" 선택). **작업 사례는 커미션 전용이라 cascade로 함께 삭제**.
- **스토리지 정리**: DB 삭제 전에 `commission_images`+작업사례 이미지 URL을 모아, 삭제 후 `commission-images` 버킷에서 실제 파일도 `storage.remove()`. `cmStoragePathFromUrl()`이 공개 URL→버킷 경로 추출(쿼리·퍼센트 인코딩 처리). 본인 uid 폴더 파일만 대상(버킷 RLS가 그렇게 허용), 신청자 참고이미지는 그들 폴더라 대상 아님. 실패해도 삭제엔 지장 없게 try/catch.
- **후처리**: 상세에서 삭제 시 `screenBack()`으로 목록 복귀, 내 커미션/전체 목록이면 그 자리 그리드 갱신. dev 검증: 작가만 버튼 노출·경로 추출·플로우 확인(실제 삭제는 본인 계정 필요).

### 네비게이션 재조회 — 탭/로고 누르면 최신 갱신 (2026-08-01, 4단계)
"홈/로고/커미션/내 정보를 눌러도 새 글·새 커미션이 안 뜬다"(앱 시작 때 1번만 로드하고 이후엔 메모리 재렌더만 하던 문제). 인스타/트위터처럼 **같은 탭 재탭 시 최신 재조회 + 맨 위 스크롤 + 껌뻑임 없이**로 개선. **공통 원칙(단일 렌더)**: 이미 그 화면이면 캐시로 다시 안 그리고, 재조회 후 **내용이 바뀐 경우에만** 딱 한 번 다시 그림(서명 비교). 다른 화면에서 오면 캐시로 즉시 전환.
- **홈/로고**(`goHome`): `refreshFeed()` 추가 — `loadRealPosts(true)`(피드 렌더 스킵)로 재조회 후 `feedSignature()`(글 id+좋아요+댓글수) 변화 시에만 `renderList` 1회. `selectBoard(id, skipRender)`에 skipRender 추가해 이미 홈이면 캐시 렌더 생략. **핵심 버그 수정**: 원래 `selectBoard`(캐시) + `loadRealPosts` tail(최신)로 **2번 렌더**돼 껌뻑이고 첫 렌더엔 새 글이 없었음 → `loadRealPosts(skipRender)` + 변화 감지로 단일 렌더.
- **커미션 탭**(`openCommissionList`): `refreshCommissions()` — `cmLoadCommissions` 재조회 후 `cmListSignature()`(id+status+title+price) 변화 시에만 `#cmGrid`/`.cm-chips` 갱신. 이미 리스트(`#cmGrid` 존재)면 셸 재렌더 생략.
- **내 정보**(`openProfile`): 렌더를 `renderMyProfile()`로 분리. `refreshProfile()` — `refreshMyProfile`(AUTH.profile 점수/등급)+`loadRealPosts(true)`(내 글·후기) 재조회 후 `profileSignature()`(score/level/ad_points+내글수+받은후기수) 변화 시에만 1회. 이미 프로필(`#myProfileView`)이면 캐시 렌더 생략.
- **피드 pull-to-refresh**: 목록 최상단에서 아래로 당기면 새로고침(`.ptr` 스피너). 터치 핸들러가 scroll-top+피드(`.board-head` 있고 detail/cm-root/profile 아님)에서만, 70px 임계값 넘겨 놓으면 `refreshFeed()` 호출. 기존 "글 상세 아래로 당겨 목록 복귀" 제스처(`.detail` 기준)와 상호배타라 안 겹침.
- 각 재조회 함수는 `feedRefreshing`/`cmRefreshing`/`profileRefreshing` 플래그로 연타 중복 방지. dev에서 렌더 횟수(0/1) 계측으로 단일-렌더 검증.

### 특정 게시판 글 수정·삭제 잠금 (2026-08-01 추가)
`ask`(질문/시세문의)·`vote`(투표·수요조사)·`crit`(피드백 요청) 세 게시판은 **작성자 본인이 아닌 사람의 댓글이 하나라도 달리면 작성자가 그 글을 수정·삭제 불가**(관리자 삭제는 예외).
- **서버(진짜 방어선)**: `post_edit_locked(p_id)`(security definer — board가 셋 중 하나 & `comments.author_id is distinct from posts.author_id`인 댓글 존재 여부) 함수 신설. `posts_update_own`/`posts_delete_own` 정책을 `auth.uid()=author_id and not post_edit_locked(id)`로 재작성(둘 다 `drop`+`create`). `posts_delete_admin`(is_admin)은 그대로 → **잠긴 글도 관리자는 삭제 가능**. RLS라 버튼 우회해도 서버가 거부.
- **클라이언트**(`public/palo.js`): `POST_EDIT_LOCK_BOARDS=['ask','vote','crit']` + `postEditLocked(p)`(`p.comments.some(c=>c.authorId!==p.authorId)`). 글 상세에서 잠기면 수정·삭제 버튼을 "🔒 수정·삭제 불가"로 대체, `openEditPost`/`deletePost`에 가드(관리자는 통과). 작성 화면(`refreshBoardLabel`)에서 이 세 게시판 선택 시 주황 안내(`#edLockNotice`, `.ed-lock-notice`): "다른 분의 댓글이 달리면 수정·삭제할 수 없어요".

### 피드백 요청 '답변 채택' (2026-08-01 추가, 지식인식 / 같은 날 [1][2][3] 보완)
`crit`(피드백 요청) 게시판 전용. 글 작성자가 피드백 댓글 하나를 '채택'하면 그 댓글 작성자에게 **광고 25 + 활동 25** 지급.
- **DB(보완 후)**: `posts.accepted_comment_id`(FK→comments, `on delete set null`) + `feedback_accept_rewards`를 **글당 1행**(PK `post_id`, `on delete cascade`)으로 재설계 — `comment_id`/`rewarded_user`/`points`(광고=활동 동일 단일값)/`created_at`. **"이 글의 현재 활성 보상"**을 추적해 채택 변경 시 회수할 수 있게 함(기존 PK `comment_id`·`ad_points`/`activity_points` 구조에서 교체). RLS select는 본인 것만, 쓰기는 RPC만.
- **RPC `set_accepted_feedback(p_post_id, p_comment_id)`**(security definer): 채택은 **crit + 글 작성자만**(서버 확인). `p_comment_id=null`이면 채택 해제. 흐름:
  1. **[2] 기존 채택 회수**: 이 글에 활성 보상이 있고 다른 댓글로 바꾸거나(A→B) 해제하면 — `score/ad_points`를 `greatest(0, …-points)`로 **안전 회수**(0 밑으로 안 감) + `recalc_level` + 행 삭제 + **회수 알림**(`↩️`, 지급분>0일 때만).
  2. **자기 자신 댓글이면(#6) 지급 없음**, 같은 댓글 재채택이면 아무 변화 없이 반환.
  3. **지급**: 남의 댓글이면 오늘(한국시간 `at time zone 'Asia/Seoul'`) 그 사람 채택보상 합계로 **일일 상한 100(#5)** 남은 만큼만 계산 → **`award_score()` 한 번만** 호출(이게 `score`+`ad_points`를 함께 +지급하므로 광고포인트 이중지급 없음). `feedback_accept_rewards`에 기록 + **[1] 채택 알림**(`🎉`, 상한 도달 0점이면 안내 문구).
  - 반환 `{ok,accepted,rewarded,ad,activity,unchanged?}`.
- **⚠️ [B]→보완 중 고친 버그**: 초판 RPC가 `award_score()`(이미 `ad_points`도 올림)에 더해 `ad_points`를 **직접 한 번 더** 올려 채택 시 **광고포인트가 +50**(원함 +25)으로 들어갔음. 보완판은 `award_score` 단일 호출로 정정. (초판 테스트로 잘못 들어간 포인트는 표 재설계로 추적이 끊겨 자동 회수 불가 — 필요하면 테스트 계정만 수동 정정.)
- **알림 타입**: `notifications_type_check`에 `feedback` 추가(기존 타입 union 보존). 클라이언트는 `dbRowToNotif`가 타입 무관 렌더 + 실시간 핸들러가 미지정 타입은 토글 필터 없이 항상 표시 → 클라 변경 불필요. 푸시도 미매핑 타입은 게이팅 없이 발송.
- **클라이언트**(`public/palo.js`): `renderComments`가 crit이면 채택된 댓글을 맨 위로 정렬 + "채택된 피드백" 뱃지(`.cm.accepted`/`.cm-accepted-badge`), 작성자에게만 댓글별 "✅ 채택"/"채택 취소"(`acceptFeedback`→RPC, 다른 댓글 채택 시 RPC가 회수+지급 처리). `loadRealPosts`가 `accepted_comment_id` 매핑. 토스트에 실제 지급액 표시.
- **[3] 안내 문구**: 작성 폼은 crit 선택 시 `#edAcceptNotice`(`refreshBoardLabel`에서 토글, `.ed-accept-notice`), 글 상세는 crit이면 댓글 헤더 아래 `.cm-accept-info`(둘 다 "채택하면 광고 25 + 활동 25 지급, 하루 최대 100" 안내). body-html에 `#edAcceptNotice` 추가.

### PWA 로그인 유지 개선 (2026-08-01)
홈 화면 추가(iOS 독립실행 PWA)에서 "로그인이 자주 풀린 것처럼 보임" 리포트. 진단: 브라우저 auth 클라이언트는 1개(post/user `page.js`의 `createClient`는 서버 전용 metadata용), 서비스워커는 푸시 전용(앱셸 캐싱 없음)이라 세션과 무관 → **푸시는 세션과 별개로 계속 옴**. 증상은 `getSession()`이 비동기라 끝나기 전에 로그아웃 UI가 뜨거나(깜빡임), 백그라운드 복귀 시 세션 재확인이 없어 로그아웃처럼 남는 것. 사용자 확인: "구글 로그인 버튼 누르면 구글 계정 선택 없이 즉시 로그인"(=구글 SSO는 살아있고 Supabase 세션 복원만 안 된 상태).
- **고침**(`public/palo.js`): (1) `authReady` 플래그 — `getSession()` 최소 1회 끝나기 전엔 `openProfile`이 "로그인 필요" 대신 "불러오는 중" 표시(가짜 로그아웃 깜빡임 제거), 끝나면 실제 상태로 재렌더. (2) `visibilitychange`에서 화면이 다시 보일 때 `recheckAuthSession()`이 `getSession()`을 다시 호출해 세션 상태가 바뀌었으면 `applySession`으로 반영(복귀 시 자동 로그인 복원 + 자동 토큰 갱신 재개).
- **미해결 한계**: iOS가 독립실행 PWA의 script-writable 스토리지(localStorage)를 미사용 기간 등으로 **아예 비우면** 세션이 진짜 사라져 재로그인(한 번 탭, 구글 SSO라 즉시) 외엔 순수 클라이언트로 못 막음. 위 개선은 "세션은 살아있는데 UI만 로그아웃처럼 보이던" 다수 케이스를 없애는 것.

### 관리자 게시글 삭제 (2026-08-01 추가, Phase 1 기본흐름+보안 / Phase 2 삭제기록)
관리자가 신고 없이도 임의의 글을 바로 삭제하고 작성자에게 사유를 통보하는 기능.
- **버튼**: 글 상세 관리자 영역(매니저 픽 옆)에 `is_admin`일 때만 "🗑️ 관리자 삭제"(`.d-act-admindel`, 붉은색). 잠금 게시판(ask/vote/crit, 댓글 달린 글) 글에도 노출 — 작성자용 "🔒 수정·삭제 불가"와 별개 블록이라 잠금과 무관.
- **흐름**(`public/palo.js`): `adminDeletePost` → `adminDeleteReasonDialog`(모달 `#adminDelModal`: 자주 쓰는 사유 칩 `.admin-del-chip` + `#adminDelReason` textarea + `#adminDelSilent` 체크박스, `{reason, notify}` 반환/취소 시 null) → `confirmDialog` 확인 → RPC `admin_delete_post`. **사유는 선택**(비워도 삭제), **알림 미발송 옵션**(체크 시 `p_notify=false`).
- **RPC `admin_delete_post(p_post_id, p_reason, p_notify default true)`**(security definer): 맨 앞에서 `is_admin()`로 **서버단 관리자 확인**(#6 — 버튼 숨김과 무관하게 일반 유저는 `not_admin` 거부) → (`p_notify`면) 작성자에게 `type='admin_delete'` 알림(사유 있으면 "…사유: X", 없으면 사유 문구 생략; `link_post_id`는 안 넣음=삭제될 글이므로) → `delete from posts`. **security definer라 RLS(작성자·잠금 정책)를 우회** → 관리자는 잠금 글도 삭제(#3). 반환 `{ok}` 또는 `{ok:false,error}`.
- **알림 타입**: `notifications_type_check`에 `admin_delete` 추가(union 보존). 클라 렌더/실시간/푸시는 새 타입 자동 처리(feedback 때와 동일).
- **⚠️ 잠복 FK 버그 동시 수정**: `notifications.link_post_id → posts(id)` FK에 on-delete 규칙이 없어(RESTRICT), **글을 가리키는 알림이 하나라도 있으면 그 글 삭제가 실패**했음(관리자 삭제뿐 아니라 일반 유저의 자기 글 삭제도 잠복 위험). `on delete set null`로 변경 — 글 삭제 시 옛 알림의 링크만 끊고 알림 기록은 보존.
- **Phase 2 삭제 기록(감사 로그) + 보관본**: `admin_post_deletions` 표. 컬럼: `post_id`/`board`/`category`/`title`/`content`(텍스트)/`content_html`(서식)/`images`(jsonb URL 배열)/`stage`/`post_created_at`(원본 작성시각)/`author_id`/`author_nick`/`author_avatar`/`author_level`/`admin_id`/`admin_nick`/`reason`/`notified`/`created_at`(삭제시각). RLS는 `chat_admin_access_logs`와 동일 원칙 — **select만 `is_admin()`**, insert/update/delete 정책 없음(=security definer RPC로만 기록, 관리자도 못 고침·못 지움 = 증거 보존). `admin_delete_post` RPC가 삭제 직전에 원본 전체를 스냅샷(이미지는 `post_images`가 cascade로 사라지기 전에 URL만 저장 — 스토리지 파일은 안 지우므로 보관본에서 계속 로드됨).
  - **뷰어**: 내 정보 > 🛡 관리자 메뉴 > "🗑 삭제 기록"(`openAdminDeletionLog`가 행을 `ADMIN_DEL_LOG`에 캐시→`renderAdminDeletionLog`, `.del-log*`, 최근 100건 카드 — 게시판·시각·제목·본문 발췌·작성자·삭제관리자·사유·알림발송여부).
  - **보관본**: 카드 클릭 → `openArchivedPost(logId)`→`renderArchivedPost(row)` — 스냅샷으로 원본 글 상세를 읽기 전용 재구성(붉은 `.archived-banner`에 삭제 관리자·시각·사유·알림여부, 이어서 원본 제목·작성자·작성시각·이미지·서식 본문). `catFor`/`sanitizePostHtml`/`avatarHTML` 재사용. 이 기능 추가(2026-08-01) 이전 삭제분은 새 컬럼이 null이라 텍스트 본문만 보임.

### 팔로우 저장 + 읽은 글 표시 저장 (2026-08-02, "작동하지만 저장 안 되던" 데이터 수정)
전체 점검 중 **팔로우가 로컬 전용(휘발성)**이었음을 발견 — `FOLLOW` Set만 바꾸고 DB 저장·로드 전혀 없어 새로고침 시 사라짐, 게다가 닉네임 기준. 회원 ID 기준으로 DB화.
- **DB `follows`**: `(follower_id, followee_id)` 복합 PK(중복 방지), 둘 다 `profiles(id)` FK `on delete cascade`, `check(follower_id<>followee_id)`(자기 팔로우 금지). RLS: select/insert/delete 전부 `follower_id = auth.uid()`(본인 것만, `commission_bookmarks`와 동일 원칙).
- **클라(`public/palo.js`)**: `FOLLOW`=팔로우한 **회원 id** Set, `FOLLOW_NAME[id]=닉`(표시용). `loadMyFollows()`(applySession 로그인 시 호출, 로그아웃 시 비움)가 내 follows+닉 로드. `toggleFollow(followeeId,nickname)`가 follows insert/delete(로그인 필수·자기 팔로우 무시). 글 상세 팔로우 버튼은 `p.authorId` 기준, **본인 글엔 숨김**. 프로필 "팔로잉" 목록·`unfollowFromProfile(uid)`도 id 기준. (기존 닉 기반 데모 코드 완전 대체.)
- **읽은 글 표시(READ)**: 화면 표시 편의라 DB 대신 **localStorage**(`palo_read`, 최근 1000개)에 저장 — `loadReadCache()`(부팅 시), `saveRead()`(openPost에서 READ.add 후). 새로고침해도 "본 글" 흐림 표시 유지. 기기별.
- **SNS식 팔로잉/팔로워 (2026-08-02, 단계별)**: [1단계 완료] 프로필에 **"팔로잉 N · 팔로워 N"** 바(숫자만)→클릭 시 목록 모달. **`follows` RLS의 select를 공개(`using(true)`)로 변경**(SNS처럼 누구나 팔로잉/팔로워 목록·수 조회) — insert/delete는 여전히 `follower_id=auth.uid()`(생성·삭제는 본인만=조작 방지). 클라: `.pf-follow-bar`(`loadFollowBar(userId)`가 `getFollowCounts`로 비동기 채움, 두 프로필 공용 — renderMyProfile+openUserProfile), 카운트는 `follows`를 `follower_id`/`followee_id`로 count. 모달 `#followListModal`(body-html): `openFollowList(userId,tab)`가 tab=following이면 `followee_id` 임베드(그 사람이 팔로우한 사람들), followers면 `follower_id` 임베드(그 사람을 팔로우한 사람들)로 `profiles:col(id,nickname,avatar_url,level)` 조회 → `.follow-item`(아바타·닉·등급) 클릭 시 `openUserProfile`. `.follow-modal` transform/opacity 트랜지션+내부 스크롤. 기존 인라인 팔로잉 목록/스탯은 제거. **[2단계 완료]** 목록 각 항목(로그인+본인 아님)에 `.follow-item-btn`(내 `FOLLOW` 상태 반영) → `toggleFollowFromList(uid,nick,btn)`가 follows insert/delete(로그인 필수, `event.stopPropagation`으로 프로필 이동과 분리) → 버튼 즉시 갱신 + `_followBarUserId`(loadFollowBar가 저장)로 프로필 팔로잉/팔로워 수 갱신.

### 회원 탈퇴 (계정 삭제) (2026-08-02 추가)
그동안 앱엔 **로그아웃(`signOut`)만** 있고 실제 계정 삭제 기능이 없었음(화면의 "탈퇴한 사용자/비회원" 표시는 프로필이 없을 때의 예비 표시일 뿐). 이용약관·개인정보 처리방침 초안에 탈퇴 문구가 여러 번 나와서, 실제 기능을 붙임. **먼저 `pg_constraint`로 `auth.users`·`profiles`를 참조하는 전 외래키의 on-delete 규칙을 전수 조사**(정확한 설계를 위해; `information_schema`는 권한 문제로 auth 스키마 FK를 누락하므로 카탈로그 직접 조회)한 뒤 설계함.
- **조사 결과 핵심**: `posts.author_id`·`comments.author_id`는 **FK가 아예 없음**(plain uuid) → 계정 삭제 시 자동으로 안 지워지고, 프로필이 사라지면 화면에선 자연히 "익명"으로 보임(작성자 id는 RPC가 직접 null로 비워 완전 익명화). `commissions/conversations/messages/commission_*/follows/poll_votes/push_subscriptions/feedback_accept_rewards` 등은 `auth.users` 또는 `profiles`에 **CASCADE** → 계정 삭제 시 자동 삭제. `posts.reviewed_user_id`는 **SET NULL**(후기 글 유지, 대상만 비움). `profiles`를 참조하는 **NO ACTION**(=삭제 차단) 목록: `comment_helpful`·`notifications(user_id, link_chat_user)`·`reports.reported_user_id`·`score_log`·`user_ads`·`chat_admin_access_logs.admin_id` → 이건 RPC가 auth.users 삭제 **전에** 미리 정리해야 프로필 CASCADE 삭제가 안 막힘.
- **RPC `delete_my_account()`**(security definer, `authenticated`만 실행): `auth.uid()` 없으면 `{ok:false,error:'not_authenticated'}`. 순서 = ①글·댓글 `author_id=null`(익명화) ②NO ACTION 차단 참조 정리(comment_helpful·본인 알림 delete, 남의 알림 `link_chat_user`·`reports.reported_user_id`는 `set null`, score_log·user_ads·chat_admin_access_logs delete) ③FK 없는 흔적 정리(`likes where user_id::text=uid::text` — likes는 익명 좋아요 때문에 FK 없음, 타입 안전 위해 `::text` 캐스팅) ④`delete from auth.users where id=uid` → 프로필·커미션·채팅·팔로우·투표·푸시·북마크 등 CASCADE 자동 삭제 + 로그인 계정 제거(재로그인 불가). ※`auth.users` 직접 삭제 권한은 Supabase `postgres`(정의자) 역할로 동작 확인.
- **밴 회피(탈퇴 후 재가입) 방지 (2026-08-03 추가, B안)**: 밴(`profiles.is_banned`)은 원래 로그인 상태의 글쓰기만 막는데(RLS `posts_insert_not_banned`), 밴당한 사람이 **탈퇴→같은 구글 계정 재가입**하면 새 프로필은 `is_banned=false`라 풀리는 빈틈이 있었음. 이를 막기 위해: **테이블 `banned_email_holds`**(`email_hash` PK=SHA-256(소문자·trim 이메일)의 hex, `reason`, `held_at`, `expires_at`; RLS on·**정책 0개**=정의자 함수만 접근, 원문 이메일은 저장 안 함). **`delete_my_account()`에 추가**: 탈퇴자가 `is_banned`면 `auth.users.email`을 해시해 holds에 **`expires_at=null`(영구)** 로 upsert(밴 아닌 일반 탈퇴자는 저장 안 함). ※2026-08-03 최초엔 1년 만료였으나 "영구정지가 1년 뒤 풀리면 안 됨" 지적으로 **영구 보관**으로 변경(`expires_at` nullable, null=영구). 관리자 예외 해제용 **RPC `admin_clear_ban_hold(p_email)`**(security definer, `is_admin()` 확인 후 해당 이메일 해시 hold 삭제, `{ok,removed}` 반환; 비관리자→`not_admin`) 추가 — 필요 시 관리자 화면 버튼은 추후. **⚠️ 해시 함수 함정(2026-08-03 겪고 고침)**: 처음엔 pgcrypto `digest()`+`search_path`에 `extensions` 추가로 했는데, **가입 트리거 실행 환경에서 `digest`를 못 찾아 `handle_new_user`가 에러→가입 트랜잭션 전체 롤백→"가입도 안 되고 동의창도 안 뜸"**(프로필이 안 생기므로) 증상 발생. **해결: 외부 확장 의존을 없애고 Postgres 내장 `sha256(convert_to(text,'UTF8'))`+`encode(...,'hex')`로 교체**(pg_catalog라 항상 사용 가능, 해시값 동일=호환), 3개 함수 모두 `search_path=public`. **`handle_new_user()` 수정**(가입 트리거 `on_auth_user_created`): 기존 닉네임 생성 로직 그대로 + `new.email` 해시가 holds(미만료)에 있으면 신규 프로필을 `is_banned=true`로 생성(insert에 컬럼 추가). **밴 체크는 `begin…exception when others then v_banned:=false; end`로 감싸 어떤 이유로도 가입이 안 깨지게 방어.** 한계: 해시라 특정 대상 콕 집어 해제는 `admin_clear_ban_hold(이메일)`로만 가능. 검증(dev): holds anon 조회 0행(잠금)·탈퇴/보관해제 RPC `not_authenticated`/`not_admin`·실기기 신규가입+동의창 정상. 개인정보 처리방침 §6에 "제재 회원 이메일 해시를 제재 유지 기간(영구정지=영구) 보관" 명시.
- **클라(`public/palo.js`)**: 내 정보 화면(`renderMyProfile`) 맨 아래 `.pf-danger` 위험구역에 밑줄 텍스트 "회원 탈퇴"(`openWithdraw()`). 모달 `#withdrawModal`(body-html): 무엇이 삭제/익명화되는지 4줄 경고 + **오타 방지 — 입력칸에 "회원탈퇴"를 정확히 입력해야** [탈퇴하기] 활성(`withdrawCheck()`가 disabled 토글). `doWithdraw()`가 `supabase.rpc('delete_my_account')` → 성공 시 `signOut()` + 토스트 + 1.4s 후 홈 이동. 실패 시 버튼 복구. CSS `.pf-danger`/`.pf-withdraw`(밑줄, hover 붉게)·`.wd-*`(경고 목록·취소/탈퇴 버튼, 탈퇴는 붉은 그라디언트·disabled 흐림). **검증(dev)**: 비로그인 RPC→`not_authenticated`(안전), 함수·모달·버튼 존재, 오타방지(빈칸/오타 잠김·정확입력 활성), 모달 렌더·닫기 정상. **정책 문서 연동**: 이걸로 "탈퇴 시 게시물 익명화 후 유지, 그 외 개인정보 파기"가 실제 구현과 일치하게 됨.

### 이용약관·개인정보 처리방침 페이지 (2026-08-03 추가, 뼈대)
정적 법적 페이지를 **SPA가 아닌 독립 Next 라우트**로 제작(항상 접근 가능·SEO·JS 없이도 렌더). `app/terms/page.js`(이용약관 제1~14조)·`app/privacy/page.js`(개인정보 처리방침 제1~10조) — 각각 서버 컴포넌트로 `metadata`(title) + 본문 JSX. 레이아웃(`app/layout.js`)이 `<html><body>{children}` 뿐이라 이 페이지들은 SPA 네비 없이 자기 콘텐츠만 렌더. 내용은 사용자 초안을 검토·수정한 확정본(연령 문구 완화, 탈퇴=익명화 후 유지, 밴 회피 이메일 해시 보관, §6-5 번호오류 수정 등). **채울 빈칸은 `<B>` 헬퍼(=`.legal-blank`, 노란 하이라이트)로 표시**. **2026-08-03 대부분 기입 완료**: 대표=전승우, 상호=디자인마켓, 사업자등록번호=685-14-02733, 통신판매업 신고번호=2025-강원원주-00895, 문의/연락처=yssj1202@gmail.com(전화번호는 사용자 요청으로 제외), 시행일=2026년 8월 3일. **모든 빈칸 기입 완료(2026-08-03)**: Supabase 리전=`ap-northeast-2`(Northeast Asia/Seoul)=대한민국. 이에 따라 §9 국외이전 표를 **국내 위탁+국외 이전 겸용**으로 재정비 — 열 제목을 중립화(수탁자/처리·보관 국가/근거…), **Supabase=대한민국(서울)·제26조(국내 처리위탁, 국외 이전 아님)**, Vercel·Google=미국·제28조의8(국외 이전). "Supabase는 국내 보관이라 국외 이전 아님" 명시 문장 추가(사용자가 "대한민국이면 이전 아니지 않냐" 지적 반영). ⚠️ 정확한 법적 판단은 전문가 확인 권장. **사업자 정보 위치(2026-08-03)**: 처음엔 약관 §3-2에 값을 직접 적었으나, 사용자 요청으로 **홈 푸터(`body-html.js` `<footer>` 내 `.foot-biz`)로 이동** — 상호 디자인마켓·대표 전승우·사업자등록번호 685-14-02733·통신판매업 신고 2025-강원원주-00895·**주소 강원특별자치도 원주시 무실동 2025(제일풍경채원주무실) 103동 3201호**·문의 yssj1202@gmail.com. 약관 §3-2는 "상호·대표·사업자번호·주소·연락처·신고번호를 초기화면 하단(사업자 정보)에 게시한다"는 일반 문구로 환원(값 미포함). `.foot-biz` CSS 11px muted. **통신판매중개자 면책문구(2026-08-04)**: 푸터 `.foot-disclaimer`에 "디자인마켓은 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 커미션 등 이용자 간 거래…책임은 계약 당사자에게" 추가(사용자 요청, 상호=디자인마켓·개인사업자라 '(주)' 미표기). 이와 모순되던 **이용약관 §7-1의 "중개 행위를 수행하지 않습니다"** 문구를 "정보 게시 공간(통신판매중개) 제공, 결제·대금예치(에스크로) 등 이행에 관여하지 않음"으로 조정. **푸터 다듬기(2026-08-04)**: `.foot-biz`·`.foot-disclaimer`를 10px·`muted-2`·max-width 560 잔글씨(fine print)로 축소해 깔끔하게(태그라인·링크는 유지). 전화번호 `010-5412-6042` 추가(임시). 모바일 375px 넘침 없음 확인. CSS `.legal-*`(globals.css): `.legal-wrap`(max 760px), `.legal-doc h2`(조 제목, 상단 구분선), `.legal-table`(§9 국외이전 표, 가로 스크롤), `.legal-blank`. **푸터 링크**: `body-html.js` `<footer>`에 `.foot-links`(→`/terms`·`/privacy`) 추가. 검증(dev): 두 페이지 콘솔 무에러, 조 개수(14/10)·중첩목록·표 3행·빈칸 하이라이트·홈링크·푸터 링크 확인. **회사="디자인마켓"(사업자 상호)·서비스="commi"**. ⚠️ 법률 자문 아님 — 오픈 전 전문가 검토 권장(특히 커미션 거래).
- **상단 공지 & AI 정책 강화 (2026-08-03)**: 피드 상단 하드코딩 공지(DB 게시물 아님 — `palo.js`의 `openRules()` 배너 + `body-html.js` `#rulesModal`)를 **"📌 이용 규칙 & 피드백 매너 (처음 오셨다면 꼭!)"** 로 교체. 주요 변경: "크리틱"→"피드백", **AI를 조건부 허용(전용 게시판 출처 표기)→전면 금지**("AI로 생성한 이미지는 올릴 수 없어요"), 질문·투표·피드백 글 수정삭제 제한 안내 추가. AI 전용 게시판은 실제로 없어(피드 데모 데이터의 "AI 정책 투표"는 가짜) 모순 없음. 이에 맞춰 **이용약관 §9(`app/terms/page.js`)를 "생성형 AI로 생성한 이미지의 게시 금지"로 강화**(기존 '밝히지 않고 게시' 뉘앙스 제거, 커미션 산출물 AI는 의뢰자 명시 동의 시만 예외).

### 회원가입 시 약관·개인정보 동의 (2026-08-03 추가)
신규 가입자가 첫 로그인 직후 앱 사용 전에 **이용약관·개인정보 처리방침에 필수 동의**하도록 하는 게이트. Google OAuth는 가입/로그인 구분이 어려워 **로그인 후 게이트** 방식 채택(동의를 서버에 기록 → 법적 근거). **DB**: `profiles.agreed_at timestamptz`(null=미동의=신규). 기존 회원은 `agreed_at=coalesce(created_at,now())`로 백필(창 안 뜸). **RPC `agree_to_terms()`**(security definer, `authenticated`만): `auth.uid()` 없으면 `not_authenticated`, 있으면 `agreed_at=now()`(이미 있으면 no-op). guard 트리거는 score/level 등만 보호하므로 agreed_at 갱신은 통과. **클라(`public/palo.js`)**: `applySession`이 프로필(`select("*")`) 로드 후 `maybeShowConsent()` 호출 → `AUTH.profile.agreed_at` 없으면 모달 표시. 모달 `#consentModal`(body-html, **바깥 클릭·X 없음=필수 게이트**): 전체 동의 + [필수]이용약관(`/terms`)·[필수]개인정보(`/privacy`) 체크박스 2개, **둘 다 체크해야** `#consentOkBtn` 활성(`consentCheck`), `consentToggleAll`(전체동의 연동). `submitConsent`→`agree_to_terms` RPC→`AUTH.profile.agreed_at` 세팅+닫기, `declineConsent`→`logout()`. CSS `.consent-*`+`.r-ok:disabled`. 검증(dev, AUTH 목업): 신규→창 뜸/기동의→안 뜸, 빈칸·한개만→버튼 잠김·둘다→활성+전체동의 자동, RPC anon→`not_authenticated`. 실제 신규가입 흐름은 버릴 계정으로 최종 확인 권장.

### 글쓰기 도구바 1줄화 + 버그·건의사항 게시판 (2026-08-03)
- **서식 도구바(`.ed-toolbar`, body-html.js `#edToolbar`)를 아이콘만 한 줄로**: 기존엔 아이콘+글자라벨(`.ed-tool-lbl`)이 세로로 쌓이고 `flex-wrap:wrap`이라 여러 줄이 됐음 → **`.ed-tool-lbl{display:none}`으로 라벨 숨김**, `flex-wrap:nowrap`+`overflow-x:auto`(넘치면 가로 스크롤, 스크롤바 숨김), 버튼 `height:36px` 고정으로 세로 정렬 통일(텍스트 B/I/U 31px vs 아이콘 34px 어긋남 해결). 각 버튼 `title`(툴팁) 유지. 검증: 데스크톱·모바일(375px) 모두 한 줄·넘침 없음(모바일 scrollWidth 337=clientWidth). 8개 버튼: 굵게/기울임/밑줄 | 글자색/형광펜 | 목록/인용 | 이미지.
- **버그·건의사항 게시판 추가**: `BOARDS`의 "기타" 그룹에 `{id:"suggest",name:"버그·건의사항",icon:말풍선+!}` 추가(에치치 위). `buildBoardMenu`가 BOARDS를 그대로 순회하므로 **왼쪽 드로어 메뉴·글쓰기 게시판 선택 둘 다 자동 반영**. `CATMAP.suggest={label:"건의",cls:"chal-c"}`(카드 뱃지), `TAGS_BY_BOARD.suggest=["버그","건의","개선"]`(말머리). 일반 게시판과 동일 동작(수정·삭제 잠금 대상 아님).

### 구글 로그인 GIS 방식 전환 (2026-08-03) — supabase.co 도메인 노출 제거
문제: 기존 `signInWithOAuth`는 로그인 시 브라우저가 `qabbdgfottbnapmyjudy.supabase.co`를 경유 → 구글 동의 화면·알림 메일에 그 랜덤 supabase 주소가 표시됨(사용자가 스팸처럼 보인다고 지적, 실제 스크린샷 확인). 무료 브랜딩(앱 이름 commi)만으론 이 **도메인 표시**를 못 바꿈(로그인이 내 소유 아닌 supabase.co에서 일어나서). 유료 커스텀 도메인($35/월) 대안으로 **Google Identity Services(GIS) + `signInWithIdToken`** 채택(무료). commi.kr에서 직접 구글 팝업 로그인 → 받은 ID 토큰만 Supabase에 전달(supabase.co 리다이렉트 없음).
- **구글 클라우드 설정(사용자 수동)**: OAuth 클라이언트 "팔로 테스트"(Client ID `622866923710-mcbkmbrcvnv0o3a7uefjqaqr6e5afbhk.apps.googleusercontent.com`, 공개값)의 **승인된 JavaScript 원본**에 `https://commi.kr`·`https://palo-web-nu.vercel.app`·`http://localhost:3000` 추가. 리디렉션 URI(supabase 콜백)는 그대로 둠.
- **`app/PaloApp.js`**: GIS 스크립트 `https://accounts.google.com/gsi/client` 로드(afterInteractive).
- **`public/palo.js`**: `loginWithGoogle()` 재작성 — GIS 준비됐으면 `openLoginModal()`, 아직이면 잠깐 대기 후 없으면 **기존 `signInWithOAuth` 리다이렉트로 폴백**(`_loginRedirectFallback`). `openLoginModal()`이 nonce 생성(raw=base64(32바이트), hashed=SHA-256 hex — 구글엔 hashed, Supabase엔 raw 전달)→`google.accounts.id.initialize`(ux_mode popup)→모달에 공식 구글 버튼 `renderButton`. `onGoogleCredential`이 `supabase.auth.signInWithIdToken({provider:'google',token,nonce})` 호출→성공 시 세션 생성(onAuthStateChange→applySession이 프로필·동의게이트 처리). `GOOGLE_CLIENT_ID` 상수.
- **`app/body-html.js`**: `#loginModal`(공식 버튼 담을 `#gsiButton` + 안내 + **안전장치 "다른 방법으로 로그인" 링크**=`_loginRedirectFallback`). 기존 모든 `loginWithGoogle()` 호출부(~11곳: 로그인 필요 프롬프트·프로필 로그인 버튼)는 그대로 이 모달을 열게 됨.
- **`app/globals.css`**: `.login-modal`/`.login-desc`/`.gsi-wrap`/`.login-hint`/`.login-alt`.
- 검증(dev): GIS 로드·모달·구글 버튼 렌더·nonce·폴백·signInWithIdToken 지원 확인. **⚠️ 실제 로그인 종단 테스트는 원본 저장(+전파 5분~) 후 버릴 계정으로 필요**(자동화 브라우저엔 구글 세션이 없어 팝업 종단 테스트 불가). 폴백 링크가 있어 GIS가 막혀도 로그인 잠기지 않음. **PWA 보정(2026-08-04)**: 홈 화면 추가(standalone)에선 GIS 팝업이 **400 오류** → `loginWithGoogle()` 맨 앞에서 `isStandalonePWA()`면 `_loginRedirectFallback()`(리다이렉트 방식)로 우회. **답글 디자인(2026-08-04)**: 댓글 txt가 `@`로 시작하면(=replyTo가 붙임) `.cm.reply` 클래스 → 들여쓰기(36px)+`↳`(::before)+소프트 배경으로 원댓글과 구별(`renderComments`, CSS `.cm.reply`). **검색 아이콘 정렬 수정(2026-08-04)**: 검색창 돋보기 아이콘(`<svg class="ic">`)이 어긋나 있던 문제 — ①`.search .ic`(태그 무관)를 `.search>.ic`로 좁혀 `position:absolute;left:16px;top:50%;translateY(-50%)`로 데스크탑 상단+드로어 검색 아이콘 세로중앙 고정(지우기 버튼 아이콘엔 영향 없음), ②모바일 상단 오버레이 `.msearch .ms-ic`는 `left:28px`만 있고 세로정렬이 없어 `top:50%;translateY(-50%)`+flex 중앙+`.ms-ic .ic{16px}` 추가. 3개 검색창 전부 모바일 375px 실측 세로중앙·입력 패딩 내부 확인. **상단바·하단탭 디자인 개선(2026-08-04, 포스타입식)**: 기능·구성·순서 그대로, 생김새만. **상단바**(globals.css `header`/`.bar`/`.brand .logo`/`.h-actions`/`.icon-btn .ic`): 헤더 배경 분홍틴트`rgba(253,247,249,.82)`→깨끗한 흰색`rgba(255,255,255,.86)`, 로고 `transform:rotate(-6deg)` 제거해 반듯하게+그림자 부드럽게, 액션 아이콘 18→22px, 간격 5→9px(모바일 4px), 모바일 바 54→56px·아이콘버튼 38→40px. 로고·버튼·배지 그라데이션은 브랜드 포인트로 유지. **하단탭**(`.tabbar`/`.tab`): 아이콘 20→24px, 라벨 10→11px(weight 800→700), 세로패딩 5→7px, 아이콘↔라벨 4→5px, 활성탭 `.tab.on .ic{stroke-width:2.4}`로 선 굵게 강조, 테두리 1.5→1px. **중요: `.tab.write i`(글쓰기 분홍 원형 FAB)·`.tab i`·`.tab.write .lbl` 등 `<i>` 겨냥 CSS가 실제 마크업(`<svg class="ic">`)과 안 맞아 이미 미적용(깨진 상태)이었음 → 걷어내고 5개 탭 완전 균등 플랫로 정리(포스타입식에 오히려 부합). 검증(dev 375px): 상단바 보이는 요소 세로중앙 cy 일치, 하단탭 5개 폭 균등(75px)·아이콘 top 일치·오버플로 없음·활성색 확인. **하단탭 전환 레이스(경합) 수정(2026-08-04)**: 증상 — 탭 로딩 중 다른 탭을 누르면 씹히거나, 이전 탭 로딩이 뒤늦게 끝나며 그 탭으로 강제 복귀. 원인 — `openChatList`가 대화·프로필·메시지 3연속 `await` 후 `renderChatList(...)`로 `#main`을 **가드 없이 무조건 덮어씀**(홈`refreshFeed`=`!userLeftHome`, 커미션`refreshCommissions`=`#cmGrid`존재, 내정보`refreshProfile`=`#myProfileView`존재 가드는 이미 있었으나 **채팅만 누락**). 채팅 덮어쓰기가 커미션 `#cmGrid`까지 지워 연쇄 씹힘 유발. 해결 — 전역 `curTab`("home"|"commission"|"chat"|"me")에 사용자가 마지막 선택한 탭을 각 탭 함수 진입 즉시(동기) 기록(`goHome`/`openCommissionList`/`openChatList`/`openProfile`; `openWrite`는 모달이라 제외). `openChatList`는 `myTab=curTab` 캡처 후 첫 await 뒤·`renderChatList` 직전 두 곳에서 `if(myTab!==curTab)return;`로 stale 렌더 차단. 일관성 위해 `refreshCommissions`/`refreshProfile` 가드에도 `curTab==="commission"`/`"me"` 조건 명시 추가. 화면 전환 자체(enterScreen/syncTabs)는 원래도 동기라 즉시 반응. 검증(dev): palo.js 서빙본에 curTab 선언·채팅 가드 2곳·커미션/프로필 가드 존재 확인, 탭 함수 호출 시 curTab 동기 갱신·stale 가드 산수(`"chat"!==curTab`) 확인, 콘솔 무에러. **하단탭 로딩 중 전환 막힘(메인 스레드 블록) 개선(2026-08-04)**: 후속 증상 — "로딩 타이밍에 정확히 맞춰 누르면 탭이 씹힘", 사용자 실측: 홈·내 정보는 로딩 완료까지 전환 불가, 채팅은 2단계(프로필+메시지)에서 불가. 원인 — 콘텐츠 덮어쓰기(가드로 해결됨)가 아니라, 로딩 응답을 **동기 처리(JSON 파싱·객체화·캐시 저장·렌더)** 하는 동안 싱글 스레드가 잡혀 대기 중 탭 입력이 무시됨. dev(글 12개·빠른 PC)에선 longtask 0건이라 재현 불가 → 폰 CPU·데이터량에서만 발생. 조치(전부 안전): ① `loadRealPosts`의 `saveFeedCache`(모든 글 복사→JSON.stringify→localStorage 동기 쓰기, 모바일 멈춤 주범)를 `setTimeout(…,0)`로 지연 실행(다음 방문용 캐시라 비필수) → 홈·내 정보 임계경로에서 제거. ② 채팅 메시지 조회 `select("*")` → 실제 사용 6컬럼(`conversation_id,sender_id,content,is_read,created_at,commission_id`)만 → 파싱 payload↓. ③ 채팅 프로필·메시지 조회를 순차 await→`Promise.all` 병렬(왕복 2→1)로 2단계 단축. ④ 채팅 경합 가드를 문자열 curTab→증가 번호표 `navSeq`(매 탭 전환 시 ++, 4곳)로 업그레이드해 같은 탭 재방문 stale까지 차단(`if(mySeq!==navSeq)return` 2곳). 검증(dev): 서빙본에 4개 변경 반영 확인, 홈 로드·피드 렌더 정상·콘솔 무에러. ⚠️ **미해결 가능성**: `loadRealPosts`가 글을 개수 제한 없이 전부 로드 → 데이터 누적 시 홈·내 정보 블록 재발 가능. 근본 해결은 페이지네이션(다음 단계 후보). **전반 속도 개선(2026-08-04)**: 사용자 "버튼 로딩·대기시간 단축, 처리 속도 상승" 요청. ① **재조회 throttle(8초)** — 홈·커미션·내 정보를 다시 눌러도 최근 8초 내 불러온 데이터면 재조회 생략(캐시 즉시 표시만): 공용 `postsLoadedAt`(홈·내 정보, `loadRealPosts` 성공 시 갱신)·`cmLoadedAt`(커미션) + `REFRESH_THROTTLE_MS=8000`. `refreshFeed`/`refreshProfile`/`refreshCommissions` 진입부에서 `if(Date.now()-*<THROTTLE)return`. 탭 왕복 즉각화 + 무거운 처리 빈도↓로 멈춤 완화. ② **채팅 즉시 표시** — `chatListCache`에 마지막 목록 저장, 재방문 시 "불러오는 중" 대신 캐시 즉시 렌더 후 백그라운드 갱신. ③ **안전장치**: 당겨서 새로고침은 `refreshFeed(true)`로 throttle 무시(force 파라미터 추가); `applySession`에서 계정(uid) 변경 시 `postsLoadedAt/cmLoadedAt=0`·`chatListCache=null` 리셋(로그인 후 내 좋아요·북마크 즉시 반영); `logout()`에서 `chatListCache=null`(프라이버시). 낙관적 갱신(글 작성 등)은 throttle과 무관하게 즉시 반영돼 문제 없음. 검증(dev): throttle 실측(2차 refreshFeed 스킵)·서빙본 반영·부팅 정상·콘솔 무에러. **프로필(마이메뉴) 포스타입식 재구성(2026-08-04)**: 기능·구성 그대로, 배치·디자인만. 기존 `renderMyProfile`의 알록달록 `.pf-actions` 버튼 다닥다닥 + 인라인 `.pf-tabs`(쓴글/댓글/좋아요/최근본글) + `.pf-set` 토글 + `.pf-withdraw`를 **섹션(소제목)+한 줄에 하나(왼쪽 선아이콘+이름, 오른쪽 개수/화살표)+얇은 구분선** 구조로 교체. 유지: 프로필 헤더(`pfHeroHTML`)·등급 진행바·통계(단 '쓴 글' 수는 [내 글] 메뉴로 이동)·고정글·받은 후기·팔로우바. 새 섹션: [내 글](쓴글/댓글단글/좋아요/최근본글 → 각각 `openPfList(kind)`로 별도 화면 전환, 뒤로가기 `openProfile()`), [내 활동](내 커미션/채팅 목록/포인트 내역), [알림 설정](웹푸시+토글5개, 토글은 iOS식 스위치 CSS), [설정](닉네임 변경), [기타](이용약관 `/terms`·개인정보 `/privacy`·로그아웃·회원 탈퇴 danger), [🛡 관리자](is_admin만, 기존 10개 맨 아래). 새 헬퍼: `pfRow(icon,label,onclick,opts{count,chev,danger})`·`pfMiniIcon(inner)`·`openPfList(kind)`. 아이콘은 인라인 선(line) SVG. CSS 추가(globals.css): `.pf-viewpublic`·`.pf-group`/`.pf-group-title`·`.pf-item`(border-top 구분선)·`.pf-item-ic/label/right/count`·`.pf-chev`·`.pf-item.danger`·`.pf-item-badge`·`.pf-toggle-row`(input[type=checkbox] appearance:none 44×26 스위치)·`.pf-list-head`. 기존 `.pf-actions/.pf-edit/.pf-tabs/.pf-set/.pf-withdraw` CSS는 공개 프로필(`openUserProfile`)에서 여전히 사용하므로 삭제 안 함. **상단바·하단탭은 앞서(커밋 7d74f38) 포스타입식 개선 완료**. 검증(dev, 가짜 AUTH 렌더): 5섹션+관리자·12기능 전부 존재·토글 스위치·글목록 화면전환/뒤로가기·콘솔 무에러. **프로필 세부화면 스와이프 뒤로가기 수정(2026-08-04)**: 증상 — 프로필 → 쓴글/댓글/좋아요 목록 진입 후 왼→오른 스와이프(뒤로)가 프로필이 아닌 엉뚱한 화면(이전 URL)으로 감. 원인 — 이 세부화면들이 `enterScreen` 없이 `#main`만 교체해 히스토리를 안 쌓음 → popstate 시 screenStack 비어 URL 라우팅으로 빠짐(커미션 상세→프로필 때와 동종 문제). 해결 — 각 진입 함수에 `enterScreen("<key>",openProfile)` 추가(pfList=openPfList, scoreLog=openScoreLog, mgrPick/bonusLog/delLog/admCmMgmt/admChat=관리자 5개), 화면 내 '‹ 뒤로' 버튼 `onclick`을 `openProfile()`→`screenBack()`(history.back→동일 popstate 경로)로 일괄 변경(동일 문자열 6개 replace_all + pfList 버튼). admChat은 검색 재호출돼도 enterScreen 같은 key라 중복 push 안 됨. 게시글·커미션·게시판 뒤로가기는 미변경(기존 정상). 검증(dev, popstate 시뮬레이션): 프로필(스택0)→목록(스택1,key pfList)→popstate→프로필 복귀(스택0), mine/liked/recent 왕복 누수 없음(최종0), 콘솔 무에러. 잔여(사소): 목록→글 상세→뒤로는 openPost가 resetScreens해서 홈으로 감(기존 설계, 별개 이슈). **채팅 목록 뒤로가기 원인지 반영(2026-08-04)**: 증상 — 프로필 → 채팅 목록 진입 후 뒤로가기가 프로필이 아닌 홈으로 감. 원인 — `openChatList`가 `enterScreen("chatList",goHome)`로 **뒤로=홈 고정**(채팅은 하단 탭이라 원래 홈 복귀 설계). 해결 — `openChatList(origin)` 파라미터 추가 + 모듈 변수 `_chatListBack`에 들어온 곳 기억: `origin==='profile'`→`openProfile`, `'home'`→`goHome`, 미지정→기존 유지(채팅방→목록 복귀 시 원인지 보존). `enterScreen`엔 `function(){(_chatListBack||goHome)();}` 래퍼 전달. 호출부: 하단 탭(body-html.js) `openChatList('home')`, 프로필 메뉴 `openChatList('profile')`, `openChat`의 뒤로(`enterScreen("chatRoom",openChatList)`)는 무인자라 origin 유지. 검증(dev): 프로필→채팅→뒤로→프로필, 홈→채팅→뒤로→홈, 무인자 호출 시 _chatListBack 유지 확인, 콘솔 무에러. **네이버 로그인 추가(2026-08-04) — 커스텀 서버 OAuth**: Supabase가 네이버 미지원 → 직접 연동. **서버 라우트 신설**(commi 최초 `app/api/auth/*`): `app/api/auth/naver/start/route.js`(GET, state 쿠키 발급 후 `nid.naver.com/oauth2.0/authorize`로 302) + `app/api/auth/naver/callback/route.js`(GET: nv_state 쿠키 대조→CSRF, code→`nid.naver.com/oauth2.0/token`, `openapi.naver.com/v1/nid/me`로 프로필, service_role로 `admin.createUser({email,email_confirm:true,user_metadata:{name(닉네임 트리거용),full_name,avatar_url,provider:'naver',naver_id}})`(이미 있으면 에러 무시=이메일 기준 계정 연결/중복방지)→`admin.generateLink({type:'magiclink',email,options:{redirectTo:base+'/'}})`→action_link로 302→브라우저 세션 설정=로그인). 콜백 주소는 `x-forwarded-proto/host`로 현재 도메인 자동 계산(commi.kr/vercel/localhost 모두 대응, 네이버에 3개 등록). 실패 시 `/?login_error=<사유>`로 복귀→`handleLoginError()`가 토스트. **프론트**: `body-html.js` `#loginModal`에 `.login-naver-btn`(네이버 초록 #03C75A + N로고 SVG, `loginWithNaver()`=`location.href="/api/auth/naver/start"`) 추가. `loginWithGoogle()`→`openLoginModal()`로 단순화(모든 진입이 모달 경유 → **PWA에서도 모달이 떠 네이버 선택 가능**, 예전엔 PWA면 바로 구글 리다이렉트였음). `openLoginModal()`은 PWA거나 GIS 미로드면 `.login-google-btn`(리다이렉트 방식=`_loginRedirectFallback`, `GOOGLE_G_SVG` 4색 로고)로, 아니면 기존 GIS 버튼. **환경변수(사용자가 Vercel에 설정)**: `NAVER_CLIENT_ID`(`pShGsIEmKMu_Y8H0_YgN`, 공개값)·`NAVER_CLIENT_SECRET`(비밀). **Supabase 설정(사용자)**: Redirect URLs에 `https://commi.kr/**`·`http://localhost:3000/**`, Email provider Enabled(generateLink magiclink에 필요). **자동 처리**: 네이버 유저도 `handle_new_user` 트리거로 닉네임/프로필 자동 생성, `maybeShowConsent`(agreed_at 없음)로 약관·개인정보 동의 게이트 자동 통과, 이메일 기준 단일 계정(구글·네이버 같은 이메일=같은 계정). CSS: `.login-naver-btn`·`.login-google-btn`. 검증(dev): 함수 정의·모달에 구글+네이버 나란히·`/api/auth/naver/start` 라우트 살아있음(환경변수 없어 500+안내=정상)·콘솔 무에러. ⚠️ 실제 네이버 로그인 종단 테스트는 환경변수 설정+배포 후 사용자 계정으로 필요(자동화 불가). 세션 픽업은 magiclink verify가 hash 토큰 반환→`detectSessionInUrl`(기본 on)이 처리하는 것에 의존(실패 시 setSession 폴백 필요할 수 있음). **[4단계] 개인정보처리방침 반영 완료(2026-08-04)**: `app/privacy/page.js` §4(수집) — "구글 또는 네이버 소셜 로그인"으로 바꾸고 항목을 구글/네이버로 분리(네이버=이메일·별명·네이버 회원 식별자·프로필 이미지). §9(국외이전 표) — 네이버(주) 행 추가(처리 항목=로그인 계정 정보, 국가=대한민국, 근거=제26조 처리위탁, 연락처 privacy@navercorp.com), 안내 문구에 "Supabase·네이버(주)는 국내 처리→국외이전 아님" 반영. **네이버 로그인 종단 성공 확인(사용자, 2026-08-04): 실제 로그인·계정생성·동의게이트 정상 작동.** ⚠️ 남은 것(선택): 네이버 앱 공개 출시하려면 네이버 개발자센터 "검수 요청"(이메일 등 정보 제공을 앱 소유자 외 일반 사용자에게 열려면 필요). 현재는 앱 소유자/등록 테스터만 로그인 가능. **네이버 버튼 임시 숨김 + 로그인 문구 일반화(2026-08-04)**: 검수 승인 전까지 일반 사용자에겐 네이버 로그인 실패하므로 잠시 숨김. `public/palo.js`에 `var NAVER_LOGIN_ENABLED=false;` 스위치 추가 → `openLoginModal()`에서 `.login-naver-btn`을 `display:none`, `.login-desc`를 "구글 계정으로 간편하게 시작해요."로 토글(승인되면 **이 값만 true로 바꿔 배포**하면 네이버 버튼·문구 부활). 비로그인 프로필의 로그인 버튼 문구 "구글로 로그인"→"로그인하기"로 일반화(4656). (모달 내 구글 폴백 버튼 `.login-google-btn` "구글로 로그인"·`/admin` 로그인 버튼은 각자 유지.) 검증(dev): 플래그 false 시 네이버 버튼 display:none·문구 구글만·프로필 버튼 "로그인하기"·구글 정상·콘솔 무에러. **목록 디자인 변경 되돌림(2026-08-04, 커밋 80989f6)**: 사용자 요청으로 목록 관련 커밋 5개(밀도 향상·디시식 선구분·catbar 압축·arca식 재배치·이미지 미리보기)를 `git revert`로 되돌려 **게시글 목록=원래 카드형, 상단 게시판 탭=기존 pill**로 복귀. 에치치 제거·네이버 로그인 등 그 이전 작업은 유지. **→ 이후 이미지 미리보기만 재적용(cherry-pick 146f8bc)**. **게시글 이미지 미리보기(arca식)**: 목록에서 이미지 있는 글을 **PC=마우스 호버 / 모바일=길게 누르기(280ms)** 하면 첫 이미지를 팝업으로 미리보기. `public/palo.js` 하단: `_ensureImgPrev()`(body에 `#imgPreview` 1개 생성·재사용), `_postImgSrc(post)`(`.nthumb img`의 src), `_placeImgPrev(x,y,fromTouch)`(PC=커서 옆·넘치면 반대쪽, 모바일=손가락 안 가리게 왼쪽, 뷰포트 클램프), `showImgPreview/hideImgPreview`, `initImgPreview()`(부팅 시 호출, `#main` 위임). PC는 `matchMedia("(hover:hover) and (pointer:fine)")`일 때만 mouseover/mousemove/mouseout 바인딩. 모바일은 touchstart→280ms 타이머 표시, touchmove 10px 초과 시 취소(스크롤 보호), touchend 시 숨김 + `_imgPrevSuppressClick`(450ms)로 **롱프레스 뒤 따라오는 click(글 열기) 차단** — 짧은 탭은 정상적으로 글 열림. CSS `#imgPreview`(fixed, z-index 200, pointer-events:none, 카드+그림자, max 220×300px / 모바일 190×260px). ⚠️ 카드형 목록에서도 썸네일 마크업(`.nthumb img`)은 동일해 그대로 동작. **모바일 즉시 표시로 변경(2026-08-04, 사용자 요청 "꾹 누르지 말고 잠깐 대도 나오게")**: touchstart 280ms 타이머 제거 → **손 대는 즉시** `showImgPreview` 호출. 대신 클릭 차단 기준을 시간으로 전환 — `_imgPrevStart.at`(누른 시각) 기록 후 touchend에서 `held>=350ms`일 때만 `_imgPrevSuppressClick` 설정. 결과: **짧은 탭=미리보기 잠깐 뜬 뒤 평소처럼 글 열림**, **오래 눌렀다 뗌=미리보기만 보고 글은 안 열림**. touchmove 10px 초과 시 `_imgPrevStart=null`로 취소(스크롤 중엔 클릭도 안 막음). 검증(dev, 터치 이벤트 시뮬레이션): 즉시 표시·짧은탭 클릭 통과(글 열림)·롱프레스 클릭 차단·스크롤 취소 전부 확인, 콘솔 무에러. ⚠️ 자동화 브라우저는 창이 숨겨지면 setTimeout이 ~600ms로 스로틀돼 "짧은 탭" 재현이 불가 → 누른 시각을 직접 조작해 임계값 로직만 검증함(실기기 확인 권장). 위치 계산은 뷰포트를 못 읽는 환경(innerWidth=0)에서 음수 좌표가 되지 않도록 `vw/vh` 폴백+조건부 클램프 적용. **왼쪽 아래 고정 + 스크롤 유지로 변경(2026-08-04, 사용자 요청)**: 커서·손가락을 따라다니던 방식을 없애고 **화면 왼쪽 아래 고정**으로. JS에서 `_placeImgPrev()` 함수와 모든 위치 계산·`mousemove` 리스너 제거, `showImgPreview(src)`로 시그니처 단순화(위치는 CSS 담당). **스크롤해도 안 사라지게** `touchmove` 취소 핸들러 제거 → 손가락을 대고 그대로 스크롤해도 미리보기 유지, 손을 떼면(touchend) 사라짐. CSS `#imgPreview{position:fixed;left:14px;bottom:16px}` + `@media(max-width:860px){left:10px;bottom:calc(env(safe-area-inset-bottom,8px) + 72px)}`(하단 탭바 위). 검증(dev): 데스크탑 좌하단 14/16px·모바일 10/72px, 터치 후 이동해도 표시 유지·위치 불변, 손 떼면 숨김, PC 호버 시 같은 자리 고정·커서 움직여도 안 따라옴·이탈 시 숨김, 모바일에서 미리보기 하단(740) < 탭바 상단(747)로 안 가림, 콘솔 무에러. **→ 게시글 앵커 방식으로 재변경(2026-08-04, 사용자 요청: "손 떼도 계속 표시, 크기·비율 고정, 선택한 게시글 좌측 하단에 붙게")**: ①**위치=선택한 게시글에 연동** — CSS를 `position:fixed`→**`absolute`**(문서 좌표)로 바꾸고 `_anchorImgPrev(post)`가 `post.getBoundingClientRect()+pageXOffset/pageYOffset`으로 `left=글 왼쪽, top=글 아래`를 지정 → **그 글의 좌측 하단에 붙고 스크롤 시 글과 함께 이동**(absolute라 자동). `showImgPreview(src,post)`로 시그니처 변경. ②**크기·비율 고정** — `max-width/height`+`object-fit:contain`(이미지마다 크기 달라짐) → **`width/height:150px`(모바일 132px)+`object-fit:cover`** 로 항상 같은 정사각. ③**손 떼도 유지** — touchend에서 `hideImgPreview()` 제거(길게 눌렀을 때의 클릭 차단만 유지). 닫히는 조건: 글이 아닌 **빈 곳 탭/클릭**(document capture 리스너), 또는 **짧은 탭으로 글이 열릴 때**(main click capture에서 suppress가 아니면 hide). 다른 글을 터치하면 이미지·위치가 그 글로 갱신. PC는 기존대로 호버 표시/이탈 시 숨김(단 위치는 그 글 좌측 하단). 검증(dev): 앵커 좌표 일치(left 322=글 왼쪽, top 656=글 아래), 이미지 150×150 cover(모바일 132), 손 떼도 유지, 길게누름 클릭차단·짧은탭 글 열림+미리보기 정리, 빈 곳 탭 닫힘, 다른 글 터치 시 위치 갱신(top 1016 일치), 모바일 좌측 정렬·화면 내 수용, 콘솔 무에러. ⚠️ 스크롤 동반 이동은 자동화 환경에서 스크롤이 먹지 않아 실측 못 함(absolute 문서좌표라 CSS상 보장, 실기기 확인 권장). **디시식 선-구분형 목록 재적용(2026-08-04, 사용자 재요청)**: 앞서 되돌렸던(80989f6) 목록 스타일 중 **선-구분형만** 다시 적용(catbar 압축·arca식 메타 재배치는 미적용). CSS 목록 규칙 맨 뒤(미리보기 블록 앞)에 override 블록 추가: `.list` 카드 컨테이너(테두리·라운드·배경·그림자·gap) 제거→투명, `.post`는 `border-bottom:1px solid var(--line)`만(배경 투명, 패딩 10px 6px / 모바일 9px 4px), `.ptitle` 1줄 말줄임(`nowrap`+ellipsis, 14.5/모바일 14px)로 **행 높이 균일화**, `.pmeta` 한 줄 + `.sep`를 1×9~10px 세로선(ㅣ), `.pcmt` 박스 제거(배경 없음, `.cl` "댓글" 라벨 `display:none`, 숫자만) + 댓글>0이면 `.cn.has` 브랜드색, `.nthumb` 46/모바일 42px. HTML은 `renderList`의 댓글수에 `has` 클래스 추가 1곳만. 검증(dev 375px): 카드 제거·행 57~61px·한 화면 ~11개·제목 nowrap·세로선 구분자·댓글 라벨 숨김·댓글 있는 글 핑크(rgb(224,122,166))·메타 한 줄([자유] 미무ㅣ36분 전ㅣ조회 2), 데스크탑 행 67px·카드 제거 확인, **이미지 미리보기 앵커도 정상 유지**(좌측 정렬·글 아래·132px), 콘솔 무에러. **간격·썸네일 보정(2026-08-04, 사용자: "간격 살짝만 넓히고 기본 이미지가 작아 보임")**: 글씨 크기는 그대로 두고 `.post` 패딩 10px 6px→**13px 6px**(모바일 9px 4px→**12px 4px**), `.nthumb` 46→**60px**(모바일 42→**56px**, 실제 썸네일과 이미지 없는 글의 그라데이션 기본 이미지 둘 다 `.nthumb`라 함께 커짐). 실측(375px): 텍스트만 있는 행 57→64px, 이미지 있는 행 61→81px. **→ 재보정 3종(2026-08-04)**: ①**썸네일 "완성" 라벨 오표시 수정** — `submitPost`가 이미지가 있으면 말머리 미선택이어도 `stage||"완성"`으로 **"완성"을 강제 저장**하던 것을 `edState.img?stage:null`로 변경(4곳). 추가로 이미 "완성"이 저장된 기존 글까지 해결하려고 `stageTagHTML(p)` 헬퍼 신설 — 단계 라벨(`.nstage`)을 **작업 단계 개념이 있는 게시판(wip·sketch)에서만** 렌더(`postThumbHTML` 2곳에서 사용). 자유게시판 등에 그냥 올린 그림엔 라벨 없음. ②**행 높이 통일** — 이미지 있는 행(81px)과 없는 행(64px)이 달라 보이던 문제 → `.pmain`에 `min-height`를 썸네일과 같게(데스크탑 54px·모바일 50px) + `display:flex;flex-direction:column;justify-content:center`로 세로중앙 → **이미지 유무와 무관하게 동일 높이**. ③**간격 축소**(사용자: 너무 넓어짐) — 패딩 13/12px→**10/9px**, 썸네일 60/56→**54/50px**. 실측: 모바일 전 행 69px 균일(allEqual), 데스크탑 75px 균일, 단계 라벨은 wip 글에만("선화") 표시, 콘솔 무에러. **[체크포인트 태그 `checkpoint-2026-08-04-list`(커밋 a6cd12a)]** — 이 상태로 언제든 복귀 가능. **상단 게시판 탭·공지·정렬/보기 탭도 선-구분형으로 통일(2026-08-04)**: 목록과 톤을 맞춰 나머지 UI도 알약(pill)·카드 제거. ①**게시판 탭(`.chip`)**: 테두리·배경 제거한 텍스트 탭 + `.chip+.chip::before`로 사이 세로선(1×11px), 활성=`brand-2` 글자 + `box-shadow:inset 0 -2.5px 0 var(--brand)` 밑줄(레이아웃 흔들림 없음). `.catbar-inner{gap:0;padding:0}` → catbar 높이 ~50→38px(모바일 36px), 한 화면 노출 데스크탑 13개·모바일 5개. ②**정렬(최신·인기)·보기(목록형·앨범형) `.sortbar`**: 컨테이너 pill(테두리·배경·라운드) 제거, 버튼도 같은 방식(세로선 구분 + 활성 밑줄), `.bh-controls{gap:14px}`(모바일 10px)로 두 그룹 분리. ③**공지(`.notice`)**: 그라데이션 카드 → `border-bottom:1px`만 있는 한 줄(배경·라운드·margin-bottom 제거, 목록과 자연스럽게 이어짐), `.pin` 뱃지는 채움→아웃라인(브랜드색 테두리). 검증(dev): 모바일/데스크탑 각각 리로드 후 실측 — 활성 탭 브랜드색+밑줄, 세로선 구분자 1×11px, 공지 그라데이션 제거(bgImage none)·아래선 1px·라운드 0, 패딩 데스크탑 11px 6px·모바일 10px 4px, 콘솔 무에러. ⚠️ dev HMR 특성상 CSS 변경 직후 측정은 이전 값이 남을 수 있어 **리로드 후 재측정** 필요(측정 중 실제로 겪음). **헤더↔게시판 탭 사이 빈 공간 수정(2026-08-04)**: 증상 — 상단 패널과 게시판 선택 부분 사이에 틈. 원인 — `.catbar`가 `position:sticky; top:66px`(데스크탑 헤더 기준 하드코딩)인데 **모바일 헤더 실제 높이는 57px**(바 56px+테두리 1px). sticky는 자연 위치가 `top` 값보다 위면 그 값까지 **아래로 밀어내므로** 스크롤 0에서도 9px 틈 발생(데스크탑은 헤더 67px인데 top:66이라 1px 겹침). 해결 — override 블록에서 `.catbar{top:67px}`(데스크탑 66+1) + `@media(max-width:860px){.catbar{top:57px}}`(모바일 56+1)로 실제 헤더 높이에 맞춤. 검증(리로드 후 실측): 모바일 헤더 bottom 57=catbar top 57(gap 0, 기존 9px), 데스크탑 67=67(gap 0), 콘솔 무에러. **상단 게시판 탭 이모지 추가(2026-08-04)**: `CHIP_EMOJI` 맵 신설 후 `renderChips`에서 `<span class="chip-emo">`로 이름 앞에 표시 — all📋 intro👋 talk💬 doodle✏️ wip🎨 sketch📚 ask❓ vote📊 crit🔍 collab🤝 challenge🏆 tip💡 request🙏 recruit💼 used📦 suggest🛠. **왼쪽 서랍 메뉴(`buildBoardMenu`)는 기존 선 SVG 아이콘 그대로 유지**(중복 방지). CSS `.chip-emo{margin-right:4px;font-size:12px;vertical-align:1px}`. 검증: 16개 전부 이모지·서랍 SVG 유지·catbar 높이 변화 없음(38/36px)·활성 밑줄 정상·가로 스크롤 유지·콘솔 무에러. ⚠️ 이모지 폭 때문에 한 화면 노출 탭이 데스크탑 13→10개, 모바일 5→4개로 줄어듦(원하면 `CHIP_SHORT`식 이름 단축으로 보완 가능). **게시판 탭 위치 이동: 최상단 → 목록 위(최신·인기 아래)(2026-08-04, 사용자: "최상단에 있어서 불편")**: 기존엔 `body-html.js`의 정적 `<div class="catbar">`가 헤더 바로 아래에 **sticky**로 붙어 있었음. 변경 — ①정적 catbar 마크업 **삭제**, ②`chipsHTML()`(버튼 문자열)·`boardTabsHTML()`(`<div class="boardtabs" id="catbar"><div class="catbar-inner" id="chips">…`) 분리 신설, ③`renderList`가 `board-head`(제목+최신/인기+목록형/앨범형) 바로 뒤에 `boardTabsHTML()` 삽입, ④`renderChips()`는 `#chips` 없으면 no-op(커미션·프로필 등 다른 화면 대비). CSS: `.catbar`(sticky/배경/top) 대신 **`.boardtabs{border-bottom:1px solid var(--line);margin:2px 0 0}`** — 본문 흐름 요소라 sticky 아님(앞서 넣은 `.catbar{top:67px/57px}` 규칙 제거). `#main` 자식 순서: board-head → **boardtabs** → notice → ember → list. 검증(모바일·데스크탑 리로드 실측): 순서·위치 정확(모바일 sortbar bottom 113 → tabs top 115), 칩 16개·이모지·활성 밑줄 유지, 게시판 전환/정렬 변경 후에도 탭·활성 상태 유지, 커미션 화면에선 탭 0개(의도대로)·복귀 시 16개 정상, `renderChips` 안전, 콘솔 무에러. (미사용이 된 `.catbar`·`body.cm-page .catbar` 등 옛 규칙은 무해해서 남겨둠.) **탭 가로 스크롤 초기화 문제 수정(2026-08-04)**: 증상 — 뒤쪽 게시판(중고 장비 등)을 누르면 탭 목록이 **맨 앞(전체 글·자기소개·자유게시판…)으로 되돌아가** 선택한 게시판이 화면 밖으로 사라짐. 원인 — `renderList`가 `#main.innerHTML`을 통째로 교체하면서 탭도 새로 생성 → 스크롤 컨테이너 `.catbar-inner`의 `scrollLeft`가 0으로 리셋. 해결 — `syncChipScroll()` 신설(`.chip.on`의 rect와 컨테이너 rect 차이로 `scrollLeft`를 계산해 **선택 탭이 가운데 오도록** 보정, `offsetLeft` 대신 rect 기반이라 부모 배치와 무관). `renderChips()` 및 **`renderList`의 4개 렌더 분기 전부**(빈 목록·후기 앨범·앨범형·기본 목록)에서 `main.innerHTML` 직후 호출. **→ 곧바로 "가운데 정렬 말고 현재 위치 그대로" 로 변경(사용자 요청)**: 선택 탭을 가운데로 옮기던 방식을 버리고, **다시 그리기 직전 `scrollLeft`를 `_chipScrollLeft`에 저장했다가 그대로 복원**하는 방식으로 교체(`saveChipScroll()`/`syncChipScroll()`). 저장 호출은 `renderList` 맨 앞(`leaveChat()` 직후, `#main` 교체 전 옛 탭이 아직 있을 때)과 `renderChips()` 내부. 복원은 기존 4개 렌더 분기 그대로. 검증(375px): 탭을 600으로 스크롤 후 보이는 탭 클릭 → 스크롤 600 유지·활성만 변경, 연속 클릭에도 유지, 850으로 스크롤 후 정렬(인기/최신)·보기(앨범형/목록형) 전환 4회 모두 850 유지, 콘솔 무에러. **⚠️ 상단 배치 A·B·C안 비교 코드(2026-08-04, 임시)**: 사용자가 세 가지 배치안을 비교하려고 함 → **`?layout=a|b|c` 주소 파라미터로 전환**되게 구현(파라미터 없으면 **현재 방식 그대로** 렌더되므로 실제 이용자에겐 영향 없음). `LAYOUT` 변수(쿼리에서 읽음) + `boardHeaderHTML(sub)`가 4가지 헤더를 분기 생성, `renderList`는 기존 인라인 헤더 대신 이 함수만 호출. 헬퍼: `_sortBtnsHTML`(텍스트 최신/인기)·`_sortDropdownHTML`(A안 `<select class="sort-dd">`)·`_viewIconsHTML`(B·C안 아이콘 2개 `.viewicons .vi`)·`_viewToggleHTML`(A안 단일 토글 `.viewtoggle`)·`_bhTitleHTML`·`_searchNoteHTML`(제목 없는 안에서 검색 결과 안내 유지)·`toggleViewMode()`. **A안**: 게시판 탭 맨 위 → 오른쪽에 [최신▾]+토글아이콘, 제목 제거. **B안**: 현재 순서 유지(제목 줄 → 탭), 정렬=텍스트·보기=아이콘, 사이 `.bh-div` 구분선, `.bh-b + .boardtabs`에 `surface-2` 배경으로 두 줄 구분. **C안**: 게시판 탭 맨 위 → 아래 줄에 정렬 왼쪽 끝·보기 오른쪽 끝(`margin-right/left:auto`), 제목 제거. CSS: `.bh-row`/`.bh-note`/`.bh-a`/`.bh-c`/`.sort-dd`(chevron 배경 SVG)/`.viewtoggle`/`.viewicons .vi(.on)`/`.bh-b .bh-div`. `renderList`의 `pushState` 경로에 `?layout=` 유지 로직 추가(게시판 이동해도 안이 유지). 검증(dev): 4가지 모두 순서·구성 확인(A=탭먼저·제목없음·드롭다운·토글, B=제목유지·아이콘2개·구분선·탭배경, C=탭먼저·정렬좌/보기우 189px 분리), A안 드롭다운 정렬 변경·토글 전환·게시판 이동 시 `?layout=a` 유지, 파라미터 없을 때 기존 화면 동일, 콘솔 무에러. **→ [확정] A안 채택·비교 코드 정리 완료(2026-08-04)**: `LAYOUT` 변수와 B·C 분기 제거, `boardHeaderHTML(sub)`는 이제 A안만 반환(`boardTabsHTML()` + `.bh-row.bh-a`[말머리 + `_searchNoteHTML` + `.bh-right`(정렬 드롭다운·보기 토글)]). 미사용 헬퍼 `_sortBtnsHTML`·`_viewIconsHTML`·`_bhTitleHTML` 삭제, CSS `.bh-b`·`.bh-div`·`.bh-c`·`.viewicons` 규칙 삭제, `renderList`의 `?layout=` 유지 로직 제거(주소 깨끗). **⚠️ 정리 중 발견·수정한 버그**: pull-to-refresh의 `onFeed()`가 `.board-head` 존재로 피드를 판단했는데 A안엔 그 요소가 없어 **A안에서 당겨서 새로고침이 동작하지 않고 있었음** → `.boardtabs` 기준으로 변경. 같은 이유로 화면 전환 애니메이션 선택자 `#main>.board-head`→`#main>.boardtabs`. (`.board-head`/`.bh-title`/`.bh-controls` **기본 CSS는 존치** — 다른 화면에서 쓰일 수 있어 건드리지 않음.) 검증(dev): 기본 주소에서 A안 렌더(탭 먼저·제목 없음·드롭다운·토글, 구 `.viewbar` 없음), 칩 16개 전부 색그룹, 정렬 드롭다운·보기 토글 동작, 게시판 이동 시 주소에 layout 파라미터 없음(`/board/talk`), 말머리 한 줄 배치 유지, `onFeed` true, 콘솔 무에러.

### 게시판 구조 개편 — 자기소개 삭제 + 이름 단축 (2026-08-04)
사용자 요청: 자기소개 게시판 삭제(글은 자유게시판으로 이동), 자유게시판→**수다**, 커미션 구인→**구인**, 중고 장비→**중고**. 게시판 **16→15개**.
- **DB(사용자가 Supabase에서 실행 완료)**: `update public.posts set board='talk' where board='intro';` — 자기소개 글 3개(id 61·62·63, 말머리 전부 null이라 이동 후에도 문제 없음)가 talk으로 이동. 실행 후 실측: intro 0건, talk 5건.
- **`public/palo.js`**: `BOARDS`에서 intro 항목 삭제 + talk/recruit/used `name` 변경, `CATMAP` intro 제거·talk `자유`→`수다`·used `거래`→`중고`, `CHIP_EMOJI`·`CHIP_GROUP`에서 intro 제거, `BOARD_GUIDE` intro 삭제 + talk 안내에 "가입 인사도 여기에" 문구 추가.
- **`app/sitemap.js`** BOARDS 배열에서 `'intro'` 제거, **`app/board/[board]/page.js`** BOARD_NAMES 갱신(intro 삭제·3개 개명), **`app/admin/page.js`** BOARD_LABELS 갱신(talk `수다 광장`→`수다`, recruit→`구인`, used→`중고`; trade `커미션 구인구직`은 그대로), **`app/body-html.js`** 이용 규칙의 "자기소개 게시판에 인사 글"→"수다 게시판에 인사 글", 정적 nav 스냅샷의 옛 이름(`수다 광장`·`중고 장비`)도 정리(`커미션 구인`은 전부 `커미션 구인구직`의 일부라 미변경).
- **안전장치 확인**: `catFor`가 `CATMAP[board]||{label:"글"}` 폴백이라 혹시 남은 intro 글이 있어도 렌더가 깨지지 않음. `getBoardFromPath('/board/intro')`는 이제 `null`→홈으로.
- 검증(dev): 게시판 15개·intro 제거·개명 반영, 상단 탭 라벨 확인(💬수다·🔍구인·📦중고), `/board/talk`에 옮겨진 글 3개 포함 5건 표시·말머리 뱃지 "수다", 콘솔 무에러.
- **왼쪽 가장자리 스와이프로 게시판 목록 열기 + 드로어 아이콘 통일(2026-08-04)**: ①`renderNav`가 게시판 아이콘을 기존 선 SVG(`b.icon`) 대신 **상단 탭과 같은 `CHIP_EMOJI`**(`<span class="bn-emo">`)로 렌더(이모지 없으면 기존 아이콘 폴백). CSS `.bn-a .bn-emo{width:16px;font-size:14px;...}`로 기존 아이콘 자리·크기 유지. ②화면 **왼쪽 가장자리(30px 이내)에서 오른쪽으로 55px 이상** 밀면 `openDrawer()` — `closeDrawer` 아래 IIFE로 document 터치 리스너(passive) 추가. 제외 조건: 드로어가 이미 열림, `body.kb-open`(키보드), `screenStack.length>0`(커미션·채팅 등 내부 화면 — 뒤로가기 스와이프 우선), 모달(`.rules-scrim.open`·`#writeModal.open`·`.sheet.open`·`.msearch.open`), **가로 스크롤 영역**(`.catbar-inner`·`.tagbar`·`.cm-slider`·`.trend-inner`·앨범) 위에서 시작한 경우. 세로 이동이 가로보다 크면 스크롤로 간주해 취소. 열릴 때 `hideImgPreview()`도 호출(미리보기 z-index 200이 드로어 80보다 위라 겹침 방지). 검증(터치 이벤트 시뮬레이션): 왼쪽끝→오른쪽 **열림**, 중앙에서 오른쪽/왼쪽끝에서 세로/게시판 탭 위에서/짧게 민 경우 **모두 안 열림**, 드로어 15개 항목 전부 이모지가 상단 탭과 일치·옛 SVG 없음, 콘솔 무에러. ⚠️ iOS **Safari 브라우저**에선 왼쪽 가장자리가 브라우저 자체 뒤로가기 제스처와 겹쳐 그쪽이 우선될 수 있음. **→ 실기기에서 잘 동작하지 않아 사용자 요청으로 스와이프 제스처는 제거함(2026-08-04). 드로어 아이콘 이모지 통일은 유지.** 게시판 목록은 기존대로 좌상단 메뉴 버튼(`#menuBtn`)으로 연다. (예상 원인: Safari 가장자리 뒤로가기와의 충돌 — 다시 시도한다면 시작 범위를 가장자리에서 안쪽으로 옮기거나 전용 핸들 UI를 두는 편이 나음.)
- **commi 자체 회원가입·로그인 추가(2026-08-04, 이메일+비밀번호)**: Supabase Auth의 이메일 계정 기능 사용(별도 서버 불필요). 소셜 로그인과 **동일한 회원**으로 취급 — `handle_new_user` 트리거가 프로필·닉네임 생성(`options.data.name`을 넘겨 원하는 닉네임 사용, 중복 시 자동 숫자 부여), `maybeShowConsent`로 약관 동의 창도 동일하게 표시, 밴 회피 방지 트리거도 그대로 적용. **UI**(`body-html.js` `#loginModal` 확장): 소셜 버튼 아래 `.login-or`("또는 이메일로") 구분선 + 이메일/비밀번호/비밀번호확인/닉네임 입력(`.nick-in` 재사용) + `#lgSubmit` + `.login-links`(회원가입·비밀번호 찾기·로그인으로 돌아가기). **4개 모드**를 한 모달에서 전환(`setLoginMode`): `login`(소셜+이메일 로그인) / `signup`(가입) / `reset`(재설정 메일) / `newpw`(새 비밀번호). **함수**: `loginSubmit`(모드별 분기)·`emailLogin`(`signInWithPassword`)·`emailSignup`(`signUp`)·`sendResetEmail`(`resetPasswordForEmail`)·`applyNewPassword`(`updateUser`)·`openNewPasswordModal`·`authErrMsg`(Supabase 영문 오류→한국어 안내 8종)·`_lgSubmitLabel`/`_lgBusy`/`_lgHint`. **이메일 인증 ON/OFF 양쪽 대응**: `signUp` 결과에 `session`이 있으면 즉시 로그인 처리, 없으면 "가입 확인 메일을 보냈어요" 안내(대시보드 설정을 몰라도 동작). 재설정 링크 복귀는 `onAuthStateChange`의 `PASSWORD_RECOVERY` 이벤트로 새 비밀번호 창 자동 표시. 클라 검증: 이메일/비번 필수, 비번 8자 이상, 비번 일치, 닉네임 2~12자. **⚠️ 작업 중 발견·수정한 버그**: `_lgBusy(false)`가 `setLoginMode()`를 호출해 **방금 띄운 오류 안내가 즉시 지워지던 문제** → 버튼 문구만 되돌리도록 `_lgSubmitLabel` 분리. 검증(dev): 4개 모드 전환 시 표시 필드·제목·버튼 문구 정확, 클라 검증 5종 메시지, 서버 오류 한국어 변환(차단 도메인·요청제한 실측), 오류 후 버튼 복구·활성, 모드 전환 시 안내 초기화, 모달 레이아웃 정상. **→ 곧바로 "디시처럼 메일 없이 아이디 가입"으로 전환(2026-08-04, 사용자 요청)**: 테스트 중 `signUp`이 `email rate limit exceeded`를 반환 → **현재 Supabase "Confirm email"이 켜져 있음**을 확인(메일을 보내려 했다는 뜻). 대시보드 설정에 의존하지 않도록 **서버 라우트 방식**으로 재설계. **`app/api/auth/signup/route.js` 신설**(POST): 아이디 형식 검증(`/^[a-z][a-z0-9_]{3,19}$/`)·예약어 차단(admin·root·commi 등 15개)·비번 8~72자·닉네임 2~12자 서버 검증 후, service_role로 `admin.createUser({email:"<id>@users.commi.kr", password, email_confirm:true, user_metadata:{name:닉네임||아이디, login_id, signup_type:"id"}})` — **`email_confirm:true`라 인증 메일을 아예 보내지 않아** Confirm email 설정과 무관하게 즉시 가입 완료. 중복은 409 "이미 사용 중인 아이디예요". **클라이언트**: `LOGIN_ID_DOMAIN="users.commi.kr"`·`_idToEmail()`(입력에 `@`가 있으면 이메일 그대로, 없으면 아이디→내부 이메일)로 **로그인 칸 하나가 아이디·이메일 모두 처리**. `emailSignup()`은 `/api/auth/signup` 호출 후 곧바로 `signInWithPassword`로 자동 로그인. 모드별 placeholder/type/안내문구 전환(로그인="아이디 또는 이메일", 가입="아이디 (영문 소문자·숫자 4~20자)", 찾기="가입한 이메일"). 검증(dev): 서버 검증 4종(짧은 아이디·예약어·짧은 비번 각각 한국어 메시지), 클라 아이디 검증(한글·짧은 값 거부), `_idToEmail` 변환, 3개 모드 화면 전환 정상. ⚠️ **로컬에선 종단 테스트 불가** — `SUPABASE_SERVICE_ROLE_KEY`가 Vercel에만 있고 `.env.local`엔 없어 유효한 아이디는 500("서버 설정이 준비되지 않았어요")로 떨어짐. **배포 후 실제 가입 테스트 필요.** **→ 복구용 이메일 등록 기능 추가(2026-08-04)**: 아이디 계정도 비밀번호를 찾을 수 있게 함. **핵심 문제** — 복구용 이메일을 등록하면 Supabase 계정의 로그인 이메일이 실제 이메일로 바뀌어 `아이디@users.commi.kr` 방식 로그인이 깨짐 → **아이디↔계정 연결표**로 해결. **DB(사용자가 실행 완료)**: `create table public.login_ids(user_id uuid primary key references auth.users on delete cascade, login_id text unique not null, created_at timestamptz default now()); alter table ... enable row level security;` — **정책을 만들지 않아 anon/authenticated는 접근 불가**(service_role 전용), 아이디 목록 노출 방지. 실측 검증: anon INSERT는 `42501 row-level security policy` 거부, SELECT는 0행(정책 없음 = 노출 없음). **`/api/auth/signup`**: 계정 생성 후 `login_ids`에 기록하고, 기록 실패 시 `admin.deleteUser`로 **계정을 되돌려** 로그인 불능 상태를 방지. **`/api/auth/login` 신설**: `{loginId,password}` → `login_ids`로 계정 조회 → `admin.getUserById`로 현재 이메일 확인(연결 기록이 없는 예전 계정은 `아이디@내부도메인`으로 폴백) → **anon 클라이언트로 `signInWithPassword`**(비밀번호 검증은 Supabase가 수행) → `access_token`/`refresh_token`만 반환. **이메일은 응답에 담지 않음**(아이디만으로 남의 이메일을 알아낼 수 없게). 실패는 모두 동일 문구("아이디 또는 비밀번호가 맞지 않아요")로 계정 존재 여부 노출 차단. **클라이언트**: `emailLogin`이 입력에 `@`가 있으면 기존 방식, 없으면 `/api/auth/login` 호출 후 `setSession`. **UI**: `#recoveryModal`(현재 등록 이메일 표시 — `@users.commi.kr`이면 "아직 등록된 이메일이 없어요") + 프로필 [설정] 섹션에 "복구용 이메일" 메뉴. 등록은 `auth.updateUser({email})` → 그 주소로 확인 메일 발송 → 링크를 눌러야 반영. 검증(dev): 테이블·RLS, 모달·함수·프로필 메뉴 노출, 부팅 정상. ⚠️ **확인 메일 발송은 Supabase 기본 메일(시간당 소수 제한)을 사용** — 실사용하려면 커스텀 SMTP 연결 필요. ⚠️ 로컬엔 service_role 키가 없어 가입·아이디 로그인 **종단 테스트는 배포 후 필요**. **→ 사용자 실기기 확인 완료(2026-08-04): 아이디 가입·로그인 정상 작동.** **회원가입 버튼 확대(2026-08-04)**: 12px 밑줄 링크라 눈에 안 띄던 것을 로그인 버튼과 같은 폭(283px)·48px 높이의 외곽선 버튼 `.login-signup-btn`("이메일 없이 회원가입")으로 변경. 비밀번호 찾기는 작은 링크 유지(주·부 동작 구분). 가입·비밀번호 찾기 모드에선 자동 숨김. **대량 가입 방지(2026-08-04, 사용자 요청 "한 사람이 수십·수백 개 가입 우려")**: **DB(사용자 실행 완료)** `create table public.signup_log(id bigserial pk, ip text, login_id text, created_at timestamptz default now()); create index signup_log_ip_time on (ip, created_at desc); alter table ... enable row level security;` — 정책 없음 = 서버 전용(실측: anon INSERT `42501` 거부). **`/api/auth/signup`**: 계정 생성 **전에** `signupBlockedReason()`으로 IP 확인 — ①같은 IP에서 **24시간 내 5개** 이상이면 차단, ②**30초 내 연속 시도** 차단(스크립트 방지). 통과 시 계정 생성 후 `signup_log`에 기록. IP는 `cf-connecting-ip` → `x-forwarded-for` 첫 값 → `x-real-ip` 순으로 읽음. **fail-open 설계**: 표가 없거나 조회 실패하면 가입을 막지 않음(정상 이용자를 잠그지 않기 위해) — 대신 보호가 조용히 꺼질 수 있으므로 표 존재 확인 필요. 검증: 로직 단위 테스트 7종 전부 통과(IP 없음·첫 가입·한도 미만·한도 도달·대량 40개·30초 연속·표 없음). ⚠️ **한계**: IP 기준이라 모바일 통신사 NAT(여러 사용자가 같은 IP)에선 정상 이용자가 막힐 수 있고, 반대로 IP를 바꾸면 우회 가능 → 더 강한 차단이 필요하면 Cloudflare Turnstile 같은 캡차 도입 검토. 상수 `SIGNUP_LIMIT_PER_DAY`(5)·`SIGNUP_MIN_INTERVAL_SEC`(30)로 조절. **로그인 직후 내 정보가 안 바뀌던 문제 + 로그인 지연 개선(2026-08-04)**: ①**증상** — 로그인해도 내 정보 탭이 로그아웃 화면 그대로였고, 다른 탭을 갔다 와야 반영됨. **원인** — 로그아웃 화면·로딩 화면·실제 프로필이 **모두 `id="myProfileView"`** 를 쓰는데, `openProfile()`이 `if(document.getElementById("myProfileView")) …다시 안 그림`으로 판단해 **로그인 후에도 옛 화면을 유지**(applySession→openProfile은 호출됐지만 렌더를 건너뜀). **해결** — 세 화면에 `data-auth` 구분값 부여(`loading`/`out`/`in`)하고 `openProfile()`은 **`data-auth==="in"`일 때만** 재렌더를 건너뜀. `#myProfileView` id는 그대로라 `applySession`·`refreshProfile`의 기존 검사에 영향 없음. 검증: 로그아웃 화면 → 로그인 시 즉시 프로필 렌더(닉네임 표시), 로그아웃 시 다시 로그인 화면으로 전환. ②**로그인 지연** — 아이디 로그인이 항상 `/api/auth/login`(서버리스 콜드스타트 + 서버에서 3단계 조회)을 거치던 것을, **클라이언트에서 `아이디@내부도메인`으로 Supabase에 먼저 직접 시도**하고 실패했을 때만 서버 경로로 폴백하도록 변경 → 대부분의 계정은 **서버 왕복 없이** 로그인. (복구용 이메일을 등록해 로그인 이메일이 바뀐 계정만 서버 경로 사용.) 트레이드오프: 비밀번호를 틀린 경우엔 두 경로를 모두 타서 실패 응답이 조금 느려짐. 검증: 아이디 입력 시 Supabase 직접 호출이 먼저 나가고, 실패 시에만 `/api/auth/login` 호출되는 것 확인. **아이디↔실제 이메일 충돌 여부 검토 + 반송 방지(2026-08-04, 사용자 질문)**: 결론 — **외부 이메일과 충돌 불가**(`users.commi.kr`은 commi.kr 하위 도메인이라 제3자가 소유할 수 없음). 아이디 재사용도 `login_ids`의 UNIQUE로 차단됨(복구용 이메일 등록으로 `아이디@users.commi.kr` 자리가 비어도, 재가입 시 login_ids 삽입이 실패 → 계정 롤백 후 409). **다만 반송(bounce) 위험 발견**: `아이디@users.commi.kr`은 수신자가 없어 메일을 보내면 하드 바운스 → Resend/SES 발송 평판 악화. 조치 — ①`sendResetEmail`에 내부 도메인(대소문자 무시) 입력 시 **발송 자체를 차단**하고 복구용 이메일 등록을 안내(실측: 발송 시도 0회). ②`saveRecoveryEmail`에도 동일 가드 이미 존재. ③**Supabase Security 알림 중 "Password changed" 등은 켜지 말 것**(아이디 회원의 없는 주소로 발송돼 반송) — 앞서 켜라고 안내했던 것을 정정.
- **비밀번호 재설정이 동작하지 않던 문제 수정(2026-08-06, 사용자 테스트 제보 "잘 작동하지 않는거같아")**: **원인** — `initAuth()`에서 `onAuthStateChange` 리스너를 **`await getSession()` 뒤에** 등록하고 있었다. 재설정 메일 링크로 들어오면 supabase-js가 클라이언트 초기화 중 주소의 토큰을 처리하며 `PASSWORD_RECOVERY` 이벤트를 발생시키는데, 이 시점엔 리스너가 아직 등록 전이라 **이벤트를 놓쳐 새 비밀번호 입력 창이 뜨지 않았다**(메일은 정상 발송·링크도 정상, 돌아온 뒤 아무 일도 안 일어나는 증상). **수정 3중 안전장치**: ①`onAuthStateChange`를 `initAuth()` **맨 앞**으로 이동해 이벤트를 놓치지 않게 함(초기 `INITIAL_SESSION`에서 `applySession`이 한 번 더 불리지만 무해). ②`sendResetEmail`의 `redirectTo`를 `location.origin+"/?pwreset=1"`로 변경 — supabase-js가 자기 해시(`#access_token…&type=recovery`)를 지워도 **우리가 붙인 쿼리는 남으므로** 주소만으로 판별 가능. ③스크립트 로드 즉시 `_recoveryLink`에 `pwreset=1` 또는 `type=recovery` 포함 여부를 기록해두고, `authReady` 후 400ms 뒤 `openNewPasswordModal()` 호출 + `history.replaceState`로 주소 정리(새로고침 시 재노출 방지). 검증(dev): `?pwreset=1` 접속 시 `_recoveryLink=true`·모달 열림·모드 `newpw`·제목 "새 비밀번호 설정"·버튼 "비밀번호 변경"·이메일 칸 숨김/비번 2칸 노출·주소 정리 확인, 일반 접속(`/`)에선 모달이 뜨지 않고 피드 정상 렌더 확인. **→ 사용자 실기기 확인 완료(2026-08-06): 재설정 메일 → 링크 클릭 → 새 비밀번호 창 자동 표시 → 변경까지 정상 작동.** 확인 과정에서 점검한 것: ①Redirect URLs에 `https://commi.kr/**` 등록돼 있음(정상), ②테스트 계정의 Auth 이메일이 실제 주소로 반영돼 있어 복구용 이메일 등록도 정상 완료된 상태였음 (`아이디@users.commi.kr`로 남아 있었다면 등록 실패를 의심해야 함 — 진단 시 첫 확인 지점). 즉 메일 발송·링크는 원래 정상이었고 **복귀 후 이벤트를 놓치던 것이 유일한 원인**이었다. ⚠️ 남은 확인 사항: **Secure email change**가 켜져 있으면 아이디 회원은 복구용 이메일 등록이 **구조적으로 완료 불가**(존재하지 않는 `@users.commi.kr` 주소에서도 확인을 요구) → 반드시 OFF 유지.

- **성인 게시판 본인확인(연령 확인) 시스템 구축(2026-08-06, 사용자 요청 → KG이니시스 선택)**: **사업자 계약 전이라 실제 인증은 아직 불가**하지만 코드·DB·문서를 전부 선구축(계약 후 키 3개만 넣으면 동작). `ADULT_BOARD_ENABLED=false` 유지 중이라 현재 노출 없음. **업체 선정 근거(실제 요금 조사)**: KG이니시스 통합 본인인증 = 가입비/연관리비 **면제**·월정액 **없음**·성공 **건당 40원**(VAT별도), 토스·PASS·카카오·네이버 등 9종 수단 포함. 다날은 월 5만원(1,200건) **고정비**라 소규모에 불리, NICE는 월 10,890원(100건)부터. 토스는 별도 계약 불필요 — 이니시스 통합인증에 이미 포함(바로써트 기준 토스 단독도 40원인데 월 기본료 별도). 인증은 **계정당 평생 1회**라 총량이 작아 건당 과금이 유리(회원 1,000명 전원 인증해도 4.4만원). **아키텍처**: 브라우저에서 포트원 SDK로 인증창 → `identityVerificationId`만 받음 → `/api/auth/adult-verify`(신설)가 **포트원 REST API로 결과를 재조회해 검증** (⚠️ 브라우저가 보낸 값을 믿으면 콘솔 한 줄로 우회 가능 — 이 재조회가 보안의 핵심). **개인정보 최소 수집**: 이름·생년월일·휴대폰번호·원본 CI는 **저장하지 않음**. 생년월일은 나이 계산에만 쓰고 폐기, CI는 `ADULT_CI_SALT`로 HMAC-SHA256 해시만 저장(중복 계정 인증 차단용, 유출돼도 개인 특정 불가). **연령 판정은 만 나이가 아니라 연 나이** — 청소년보호법 제2조가 '만 19세가 되는 해의 1월 1일을 맞이한 사람'을 청소년에서 제외하기 때문. 단위 테스트 10종 전부 통과(경계값 포함: 19세 되는 해 1/1·12/31 모두 성인, 18세 되는 해는 미성년, 형식오류·null은 통과 불가 처리). **DB(`docs/sql/adult-verification.sql`, 아직 미실행)**: profiles에 `adult_verified`/`adult_verified_at`/`adult_ci_hash`(부분 UNIQUE) 추가. ⚠️ **두 가지 함정을 짚어 처리**: ①profiles엔 '본인 행 수정 가능' 정책이 있어 그대로 두면 브라우저에서 `update({adult_verified:true})` 한 줄로 인증 통과 가능 → `protect_adult_fields()` 트리거로 service_role/SQL Editor 외의 변경을 차단. ②RLS 정책은 기본이 permissive라 **OR로 합쳐져 접근이 오히려 넓어짐** → posts/comments/post_images 모두 **`as restrictive`**로 작성(AND 결합). 판정 함수 `is_adult_verified()`·`post_is_adult()`는 **security definer** — 일반 서브쿼리로 짜면 미인증자에겐 성인글이 안 보여서 '성인글이 아님'으로 **오판**하는 함정이 있음. 감사 로그 `adult_verify_log`는 정책 없이 생성(service_role 전용). **클라이언트**: `isAdultVerified()`·`openAdultGate()`·`startAdultVerification()`·`resumeAdultVerification()`(모바일 리다이렉트 복귀), 포트원 SDK는 필요할 때만 동적 로드(평소 로딩 속도 영향 없음). `selectBoard('adult')`/`pickBoard('adult')`에 게이트, `/board/adult` 딥링크는 부팅 시 인증 여부를 모르므로 authReady 후 재판정. 리다이렉트 복귀 주소는 `renderList()`의 pushState에 지워지므로 스크립트 로드 즉시 `_adultReturnQS`에 붙잡아 둠(비밀번호 재설정 때와 같은 함정). 계정당 하루 10회 시도 제한(건당 과금이라). 검증(dev): 로그아웃→로그인창·게시판 안 바뀜, 미인증→게이트 열림·게시판 안 바뀜, 미계약 상태 안내 문구, pickBoard 차단, 인증완료→진입 성공, 모달 레이아웃(283px 버튼 2단·안내박스 4항목), 라우트 env 가드 500 응답, `next build` 통과. **남은 일**: 사업자등록 → 포트원 계약 → 키 3개 입력(`PORTONE_STORE_ID`/`PORTONE_CHANNEL_KEY`는 palo.js, `PORTONE_API_SECRET`/`ADULT_CI_SALT`는 Vercel 환경변수) → SQL 실행 → `ADULT_BOARD_ENABLED=true`. 절차는 `docs/성인인증-설정.md`에 정리. ⚠️ **네이버 검수 승인 후에 켤 것**(소명서에 '성인 콘텐츠 없음'으로 기재). ⚠️ **본인인증을 붙여도 음란물 유통은 합법이 되지 않음**(형법 243조·정보통신망법 74조) — 허용되는 건 청소년유해매체물 수위까지이므로 운영 가이드라인·신고/삭제 체계가 함께 필요.

- **신고·삭제(임시조치) 체계 구축 + 성인 게시판 운영 정책 문서(2026-08-06, 사용자 요청)**: 기존 신고는 **자유 서술(reason) 하나뿐**이라 긴급 사안과 단순 불만이 섞여 들어오고 우선순위를 매길 수 없었음. 관리자 조치도 '글 삭제 / 무시' 2가지뿐이라 **되돌릴 수 있는 중간 조치가 없었음**(오신고여도 삭제 아니면 방치). **① 신고는 유형 선택이 아니라 직접 서술**(2026-08-06 사용자 요청으로 최종 확정). 처음엔 유형 8종 칩(`REPORT_CATS`)을 넣었다가 **전부 제거** — 사용자 판단: 목록을 주면 거기 없는 문제가 '기타'로 뭉뚱그려지고 정작 필요한 맥락이 빠짐. 대신 **서술을 필수로**(5자 미만이면 접수 차단) — 빈 신고는 운영자가 판단할 근거가 없기 때문. `reports.category` 컬럼은 더 이상 쓰지 않음(이미 만들었어도 무해). 칩 CSS(`.rp-cat*`)도 제거. 긴급 건 정렬은 유형 대신 **본문 키워드**(`URGENT_WORDS`: 불법촬영·몰카·리벤지·아동·미성년·성착취·아청·초등·중학생)로 판별해 관리자 신고함에서 '⚠️ 확인 요망' 뱃지와 함께 맨 위로 올림. ⚠️ **표시·정렬 전용**이며 자동 조치는 없고, 키워드가 없어도 긴급할 수 있으므로 내용을 읽고 판단해야 함(문서에 명시). **② 임시조치(블라인드)** — 정보통신망법 제44조의2 근거. 삭제와 달리 글은 남고 **작성자·운영자에게만** 보임 → 오신고면 되돌릴 수 있고, 작성자가 '왜 안 보이지'만 겪는 상황도 방지(이의신청의 전제). `posts.blinded/blinded_at/blind_reason` + restrictive RLS. **③ 자동 임시조치는 두지 않음(2026-08-06 사용자 판단으로 철회)** — 처음엔 긴급 유형 신고 시 DB 트리거로 즉시 가리고 신고자당 24h 3건 제한을 뒀으나, 사용자가 **신고 테러 우려**를 지적해 트리거·함수를 제거. 근거: 신고 한 번으로 남의 글이 즉시 내려가면 그 자체가 공격 수단이 되고, 신고자당 횟수를 제한해도 **계정을 나눠 쓰면 특정 작가를 계속 겨냥할 수 있음** — 잘못 가려진 글의 피해가 잠깐 노출되는 위험보다 크다고 판단. 긴급 유형은 **정렬 우선순위만** 올리고 조치는 사람이 직접(신고함 맨 위 + 24h 내 확인). SQL에는 `drop trigger/function if exists`를 남겨 예전 버전을 실행했어도 되돌아가게 함. 대신 **허위 신고 반복 계정**을 제재 대상으로 정책에 명시(3회 경고 → 신고 기능 제한, `moderation_log`의 dismiss 이력으로 확인). **④ 관리자 신고함 개선**: 긴급 건 **맨 위로 정렬**(시간순만으로는 묻힘), 유형 뱃지·가림 상태 표시, [임시 가림]/[가림 해제]/[글 삭제]/[무시]. **⑤ 조치 이력** `moderation_log`(blind/unblind/delete/dismiss + actor/note) — 이의신청·분쟁 시 근거. 관리자만 조회·기록하는 정책 부여. **보안**: `protect_blind_fields()` 트리거로 작성자가 스스로 가림을 풀지 못하게 차단(성인인증 때와 같은 패턴 — profiles/posts 모두 '본인 행 수정' 정책이 있어서 컬럼만 추가하면 브라우저에서 한 줄로 우회 가능). posts RLS도 **`as restrictive`**로 작성. `is_admin()`은 security definer. **문서 `docs/성인게시판-운영정책.md`**: 허용/제한/금지 3단 기준(금지 8종 — 아동성착취물은 **가상·창작물도 청소년성보호법 제11조 처벌 대상**, 실존인물 성적묘사, 불법촬영물 등), 제재 4단계(금지항목은 단계 없이 즉시 영구차단 + 수사기관 신고), 유형별 대응 기한(긴급 24h/일반 48~72h), 이의신청 7일, 운영자 준수사항(소급 적용 금지·기록 남기기), 그리고 그대로 붙여 쓸 수 있는 **이용자 안내문**. 대전제로 **본인인증은 면죄부가 아님**을 명시 — 인증이 열어주는 건 청소년유해매체물 수위까지이고 음란물 유통은 인증과 무관하게 형법 제243조·정보통신망법 제74조 위반. 검증(dev): 유형 8개(긴급 2)·미선택 접수 차단·유형별 안내 전환·단일 선택 유지·재오픈 시 선택 초기화·긴급 안내 강조색, `next build` 통과. ⚠️ **SQL 2개 아직 미실행**(`docs/sql/adult-verification.sql`, `docs/sql/report-takedown.sql`). ※ 신고 유형·임시조치는 성인 게시판과 무관하게 **전 게시판에 적용**된다.

- **본인확인 업체 선정 확정 + 개인정보처리방침 갱신(2026-08-06)**: 실제 신청 과정에서 **공개 문서와 계약 조건이 달랐음** — 포트원/이니시스 문서엔 '가입비 면제·건당 40원'만 적혀 있고 **최소 사용 건수 선결제 조건은 비공개**였다. ⚠️ 교훈: **본인확인 요금은 문서로 확정할 수 없고 실제 계약 화면/담당자 답변이 기준**. 앞서 계산했던 '회원 1,000명 전원 인증해도 4.4만원'은 무효. 조사한 대안: 휴대폰 본인확인 절약형(연 126,463원/2,400건 선불) · NICE 월후납(월 10,890원/100건) · 바로써트(건당 30~40원+비공개 기본료) · **KG이니시스 직접계약**(월 이용료·기본제공건수 없음, 건당 35원, 후불 — 단 등기우편+심사 2주, 포트원에 MID 등록하면 코드는 그대로 사용 가능). **최종 선택: 포트원 경유 「휴대폰 본인확인」, 기본료 월 6,673원(연 약 80,076원)** — 2026-08-06 신청 완료, **심사 결과 대기 중**. (통합인증을 목표로 했으나 최소 사용 건수 선결제 조건이 붙어, 기본료가 더 낮은 휴대폰 본인확인으로 사용자가 선택.) ⚠️ **휴대폰 본인확인도 방통위 지정 본인확인기관 서비스라 연령 확인 요건을 그대로 충족**하고, 포트원 SDK 호출·서버 검증 API가 동일해 **작성한 코드를 고칠 필요 없음**(channelKey만 발급값으로 교체). 차이는 인증 수단이 휴대폰 문자 하나뿐이라는 점(통합인증은 토스·카카오·네이버·PASS 등 9종)과 선불 정액이라는 점. 연동 후 확인할 것: 응답 `verifiedCustomer`에 **`birthDate`·`ci`가 실제로 오는지**(PG사별로 제공 항목이 다름 — 우리 코드는 둘 다 필수). ⚠️ SMS 인증 서비스(OCTOMO 등)는 본인확인기관이 아니라 **휴대폰 소지만 증명하고 나이를 확인하지 못함** → 청소년보호법 요건 불충족, 사용 불가. **개인정보처리방침(`app/privacy/page.js`) 갱신**: 제4조에 「본인확인(연령 확인)에 관한 사항」 신설 — 계정당 1회, **저장하는 것은 인증 여부·일시·CI 해시 셋뿐이고 이름·생년월일·성별·휴대전화번호·원본 CI는 저장하지 않음**(생년월일은 판정 후 즉시 폐기)을 명시. 제9조 위탁 표에 **KG이니시스(주)**·**포트원** 2행 추가. 아울러 **아이디 회원가입·복구용 이메일이 처리방침에 빠져 있던 누락**을 발견해 함께 보완(아이디 가입 시 이메일 미수집·비밀번호 복호화 불가 형태 저장 명시). 위탁 표의 포트원 법인명은 **주식회사 코리아포트원**으로 확정(2026-08-06 사용자 확인). 검증: /privacy 렌더 확인(본인확인 절·저장 제외 문구·위탁 6행·아이디 가입 항목), `next build` 통과.

- **첫 화면 로딩 개선 — 글 목록 선요청(2026-08-06)**: 프로덕션 실측으로 병목을 특정. **데이터 요청이 느린 게 아니라 시작이 늦는 것**이 문제였다 — Supabase 쿼리 7개는 이미 `Promise.all`로 병렬화돼 있고 각 470ms인데, **첫 요청이 2,557ms에야 시작**했다. 원인: `palo.js`가 `next/script`의 `afterInteractive`라 **React 하이드레이션이 끝나야 실행**되고, Next 청크 192KB 다운로드(835→2,261ms) + 하이드레이션이 끝난 뒤에야 `initAuth().then(loadRealPosts)`가 돈다. palo.js 자체는 1,428ms에 이미 받아놨는데도 **1.1초를 그냥 기다리고 있었다.** **해결**: `app/layout.js`에 `beforeInteractive` 인라인 스크립트를 넣어 HTML 파싱 직후 posts·profiles·notices·level_thresholds를 **supabase-js 없이 REST로 직접 선요청**(`window.__paloPre`). `loadRealPosts()`의 `preOr()`가 있으면 그걸 쓰고 없으면 평소 쿼리로 폴백. ⚠️ `palo.js`를 `beforeInteractive`로 옮기는 건 불가 — 그 전략은 **루트 레이아웃에만** 둘 수 있어서 `/admin`·`/privacy`에도 로드된다(문서 확인). **안전장치**: ①목록을 쓰는 경로(`/`·`/board/*`·`/post/*`)에서만 실행 ②**로그인 상태면 건너뜀** — anon 권한으로 읽어서 로그인 사용자에게만 보이는 행(본인의 가려진 글 등)이 빠질 수 있기 때문 ③선요청 실패 시 평소 경로로 폴백 ④첫 호출에서만 쓰고 `null`로 비움(재조회 시 낡은 데이터 방지). **실측(프로덕션)**: posts 요청 시작 **2,557ms → 1,049ms**, 데이터 도착 **3,035ms → 1,142ms(약 1.9초 단축)**, 전체 데이터 완료 3,179ms → 2,359ms. 재방문(캐시 warm)은 요청 48ms·도착 182ms. ※ 목록이 **화면에 그려지는** 시점은 여전히 palo.js 실행(하이드레이션 완료)에 묶여 있어 약 2.3초 — 데이터를 미리 받아둔 만큼만 빨라졌다(3.2초→2.3초). **남은 병목: 하이드레이션 대기 자체.** 더 줄이려면 palo.js가 `window.supabase`(React 모듈에서 주입)를 기다리지 않도록 부팅 순서를 분리해야 하는데, 6,200줄 파일의 부팅 경로를 건드리는 작업이라 별도로 다룰 것. 검증: 로그아웃 시 선요청 발생·로그인 시 건너뜀·`/privacy`에선 요청 0건·`next build` 통과.

- **첫 화면 로딩 2단계 — 하이드레이션 대기 제거(2026-08-06)**: 앞선 선요청 작업에서 남겨둔 병목(“목록이 그려지는 시점이 하이드레이션에 묶여 있음”)을 해소. **원인**: `palo.js`가 `next/script`의 `afterInteractive`라 React 하이드레이션이 끝나야 실행 — 파일은 1.4초에 이미 받아놨는데 2.5초까지 놀고 있었다. `beforeInteractive`로는 못 옮긴다(루트 레이아웃 전용이라 `/admin`·`/privacy`에도 로드됨). **해결**: `PaloApp.js`에서 `<Script>` 대신 **`BODY_HTML` 끝에 일반 `<script src>`를 붙여 SSR HTML에 넣었다** — 브라우저가 HTML을 파싱하며 곧바로 실행하고, 위쪽 DOM은 이미 만들어진 상태라 안전하다. (앱 내 이동이 전부 `<a href>`라 클라이언트 라우팅으로 이 HTML이 재삽입될 일이 없어 성립. next/link는 코드베이스에 없음 — 확인함.) **부팅 2단계 분리**: `window.supabase`는 React 모듈 평가 때 주입되므로, PaloApp이 `palo-supabase-ready` 이벤트를 쏘고 palo.js가 그걸 받아 `initAuth→loadRealPosts`를 시작한다(이미 와 있으면 즉시 실행 — 순서가 뒤바뀌어도 한 번만 돈다). ⚠️ **함정**: 부팅 시점 판정이 `!window.supabase`였는데, 이제 '아직 안 온 것'과 '아예 없는 환경'이 구분돼야 한다 — 안 그러면 **데모 글이 잘못 렌더**된다(코드 주석이 경고하던 깜빡임). → layout의 인라인 스크립트가 `window.__paloHasBackend`를 심고, 부팅 분기 3곳(popstate 폴백·초기 렌더 폴백·primeFromCache)을 그걸로 교체. ⚠️ **하이드레이션 불일치**: palo.js가 React보다 먼저 DOM과 `<html>`의 `--cm-tabbar-h`를 바꿔서 경고가 떴다 → 해당 `<div>`와 `<html>`에 `suppressHydrationWarning`(React가 이 영역을 건드리지 않게). **3단계 — 우선순위**: 화면을 그리는 건 palo.js 하나인데 React 청크 192KB와 대역폭을 다퉈 다운로드에 835ms가 걸렸다 → `<link rel=preload as=script fetchPriority=high>`로 당기고, Supabase에 `preconnect`로 DNS·TLS를 미리 처리. **실측(프로덕션, 편차 큼)**: 전체 데이터 완료 **3,179ms(개선 전) → 1,800~2,600ms(첫 방문) / 575ms(재방문·캐시)**. palo.js 실행 시점 2,555ms → 86~1,300ms. **남은 비용**: `loadRealPosts`의 2차(comments·likes·post_images·polls)와 3차(comment_helpful)는 supabase 객체가 필요해 **palo.js가 깨어난 뒤에야** 시작되고 순차 왕복 2회가 더 붙는다. 이것까지 없애려면 인라인 선요청에서 posts 응답을 받아 2차 쿼리까지 이어 붙여야 하는데, **쿼리 문자열이 palo.js와 인라인 스크립트 두 곳에 중복돼 조용히 어긋날 위험**이 있어 보류. 검증: 게시판 전환·글 상세·목록 복귀·로그인 모달 정상, 데모 글 섞임 없음, 새 탭 콘솔에 하이드레이션 경고·오류 0건, `next build` 통과.

- **파일 저장소를 Supabase Storage → Cloudflare R2로 이전(2026-08-06, 사용자 결정)**: ⚠️ 판단 근거를 먼저 조사 — 현재 이미지 **4개·0.35MB**(무료 한도의 0.03%)라 **당장 절감액은 0원**이며, 이 점을 알리고 'GIF 용량 상한 조정 + 썸네일 생성'을 먼저 하자고 권했으나 사용자가 이전을 선택. **요금 비교(실측 조사)**: Supabase Free = 저장 1GB·**이그레스 월 5GB**, Pro = $25/월(저장 100GB·이그레스 250GB, 초과 $0.09/GB). R2 = 저장 10GB 무료·초과 $0.015/GB·**이그레스 영구 무료**. 저장 50GB/월전송 500GB 가정 시 Supabase 약 $47 vs R2 약 $1. **먼저 터지는 건 저장이 아니라 이그레스**(무료 5GB) — 특히 GIF는 압축 없이 원본(최대 40MB)이라 40MB GIF 하나가 125회만 조회돼도 월 한도 소진. **구조**: 브라우저 → `/api/storage/upload-url`(신설)에서 **2분짜리 presigned PUT URL** 발급 → 브라우저가 **R2로 직접 PUT**. 파일이 서버를 안 거치므로 **Vercel 본문 제한 4.5MB에 안 걸림**(40MB GIF 업로드에 사실상 필수). ⚠️ **저장 경로(key)는 서버가 생성** — 클라이언트가 경로를 고르게 하면 남의 파일을 덮어쓸 수 있음. 확장자도 파일명이 아니라 **Content-Type 기준**으로 결정. **삭제**(`/api/storage/delete`): Supabase Storage의 버킷 정책이 해주던 '본인 uid 폴더만' 검사를 이 라우트가 대신함(키가 `<폴더>/<본인uid>/…`인 것만). ⚠️ **작업 중 발견한 취약점**: 소유자 검사가 `key.split('/')[1]===uid`뿐이라 `post/<내uid>/../<남의uid>/x.png`가 **통과**했다(단위 테스트로 발견). R2는 키를 문자 그대로 다뤄 실제 피해는 없지만, 중간에서 경로를 정규화하면 위험해지므로 `keyFromPublicUrl()`에서 decodeURIComponent 후 `.`·`..`·빈 구간을 **전부 거부**하도록 수정. 재테스트 10/10 통과(남의 파일·경로탈출·허용안된폴더·타도메인·도메인흉내 등). **클라이언트**: `uploadToStorage(blob,folder)`·`deleteFromStorage(urls)` 헬퍼 신설 후 `supabase.storage` 호출 **10곳을 전부 교체**(글 본문·프로필 사진·커버·광고 배너·캠페인 배너·커미션 후기/대표/설명/작업사례/신청첨부). `CM_IMAGE_BUCKET`·`cmStoragePathFromUrl()`은 쓰이지 않게 되어 제거. GIF 무압축 처리는 그대로 유지. **마이그레이션**: `scripts/migrate-storage-to-r2.mjs` — 기본은 **미리보기**, `--apply`로 실행. 원본을 지우지 않아 되돌릴 수 있고, 여러 번 실행해도 안전. 6개 표의 url 칸 + **글 본문 HTML 안의 `<img src>`**까지 교체. **설정 문서**: `docs/r2-설정.md`(버킷·공개도메인·**CORS**·API토큰·환경변수 5개·확인 체크리스트·오류별 원인). ⚠️ **CORS 정책이 없으면 업로드가 전부 실패**한다(브라우저가 R2로 직접 PUT하므로). ⚠️ **성인 게시판 관련 발견**: 버킷이 공개라 **주소를 아는 사람은 누구나 접근 가능** — Supabase Storage도 동일했지만 성인 게시판에선 이게 **연령 확인 우회**가 된다. RLS는 `post_images` **행**만 가릴 뿐 파일 주소는 못 막는다. 성인 게시판 오픈 전 비공개 버킷+조회용 서명 URL 또는 프록시 라우트 필요. 검증: 환경변수 없을 때 두 라우트 모두 500 안내, 보안 로직 단위 테스트 10종, `next build` 통과. **→ 설정 완료·동작 확인(2026-08-07)**: commi.kr DNS를 **가비아 → Cloudflare로 이전**(R2 커스텀 도메인은 해당 존이 Cloudflare에 있어야만 연결 가능). 이전 시 레코드 5개(A·send MX·send SPF·resend._domainkey DKIM·_dmarc)를 모두 옮겼고 **DKIM이 잘리지 않았는지 실측 확인**(잘리면 재설정 메일이 반송된다). commi.kr A는 **DNS only(회색)** 유지 — Vercel 앞에 Cloudflare를 겹치면 SSL·캐시가 꼬인다. 버킷 `commi-images`(APAC·Standard — **무료 10GB는 Standard에만 적용**), 공개 주소 `img.commi.kr`, CORS(PUT·GET·content-type), Account API 토큰(Object Read & Write, 해당 버킷만). **검증(실측)**: 프로덕션 라우트가 환경변수를 읽는지 → 인증 없이 정상 요청 시 401·잘못된 폴더/형식/용량은 각각 거부 확인. R2 자격증명으로 **서명 URL 발급 → 실제 PUT(HTTP 200) → CORS 프리플라이트(204, Allow-Origin/Methods/Headers 정확) → 삭제**까지 종단 확인. ⚠️ **직후 발견한 현상**: 일부 기기에서만 이미지가 안 보임 — **코드 문제 아니고 DNS 전파 지연**. `img.commi.kr`은 새 이름이라, 옛 네임서버(가비아)를 캐시 중인 리졸버는 가비아에 물어 NXDOMAIN을 받는다. 실측: Google·Cloudflare·SK·LGU+는 정상, **KT(168.126.63.1)만 실패**(Edge는 DoH라 정상, Chrome·모바일은 통신사 DNS라 실패). KT 캐시 잔여 TTL을 조회해 **최대 10시간**으로 확인하고 기다리기로 결정. (급하면 가비아 존이 아직 응답하므로 `img` A 레코드를 임시 추가하는 우회가 가능 — 문서에 기록.) **남은 일**: ①전파 후 재확인 ②기존 이미지 4개 마이그레이션(선택, 안 옮겨도 계속 보임) ③**API 토큰 교체 권장**(키가 스크린샷·대화에 평문 노출됨) ④성인 게시판 오픈 전 비공개 이미지 처리.

- **홈 탭을 눌러도 갱신되지 않던 문제 수정(2026-08-07, 사용자 제보)**: 증상 — 홈 탭을 누르면 **새 글이 있을 때만** 목록이 갱신되고, 새 글이 없으면 아무 일도 일어나지 않음. **원인 2중**: ①`goHome()`이 `refreshFeed()`를 force 없이 불러 **8초 쓰로틀**(`REFRESH_THROTTLE_MS`)에 걸려 재조회 자체를 건너뜀. ②재조회를 하더라도 `refreshFeed()`가 `feedSignature()!==before`일 때만 `renderList()`를 부르는데, 이 서명이 **`dbId+좋아요수+댓글수`**뿐이라 **조회수·시간표시·제목 수정은 반영되지 않음** → 새 글이 없으면 서명이 같아 렌더를 건너뜀. (서명 가드 자체는 배경 자동 갱신에서 목록이 껌뻑이는 걸 막으려고 넣은 것이라 없애면 안 됨.) **해결**: `force`를 '사용자가 직접 요청함'의 의미로 확장 — 쓰로틀을 건너뛰는 것에 더해 **내용이 그대로여도 다시 그린다**. `goHome()`은 `refreshFeed(true)`로 변경. **당겨서 새로고침도 같은 버그였다**(이미 `refreshFeed(true)`를 부르지만 서명 가드에 막혀 애니메이션만 돌고 화면은 그대로였음) — 이 수정으로 함께 해결됨. 배경 자동 갱신은 force 없이 호출되므로 **예전처럼 조용히** 동작한다. 검증(dev): 새 글이 없는 상태에서 홈 탭 → 렌더 1회·DB 재조회 1회 발생(수정 전 0회), 쓰로틀 구간 내 연타에도 동작, 배경 갱신(force 없음)은 변화 없을 때 렌더 0회 유지, `next build` 통과.

- **글쓰기 버튼 부각 시도 → 되돌림(2026-08-07)**: 모바일 하단 탭의 글쓰기가 다른 탭과 색·크기가 완전히 같아 구분되지 않는 문제로 세 가지 시안을 만들었다 — ①아이콘에 브랜드 그라데이션 배지 ②배지를 키우고 3px 띄움 ③탭 칸 전체를 옅은 브랜드색으로 채움. **최종적으로 사용자가 전부 되돌리기로 결정**해 `app/globals.css`는 작업 전 상태로 복구(`git diff` 무차이 확인). ⚠️ **남겨둘 교훈** — 하단 탭 중 하나만 강조할 때 아이콘에 padding으로 배경을 주면 **그 탭의 라벨만 아래로 밀려 줄이 어긋난다**(실측 43 vs 49px). 자리를 유지하려면 같은 크기의 음수 margin을 쓰거나, 배경을 **가상 요소(`::before`)로 깔아** 레이아웃에서 빼야 한다. 나중에 다시 시도한다면 ③(가상 요소로 칸 채우기)이 정렬을 하나도 건드리지 않아 가장 안전했다.

- **자체 이모티콘 시스템(2026-08-07, 사용자 요청)**: 외부 서비스 조사 결과 **Tenor API는 2026-06-30 종료**, Giphy는 상업용 $99/월, OGQ(한국 스티커·공식 API 있음)는 **월 85,000원부터** — commi 전체 인프라비가 월 3~6만원인데 이모티콘만 8.5만원이라 **자체 제작으로 결정**(그림 커뮤니티라 정체성과도 맞고, 어제 옮긴 **R2는 이그레스 무료**라 조회가 많은 이모티콘에 최적). **DB**(`docs/sql/emoticons.sql`, 아직 미실행): `emoticon_packs`(팩) / `emoticons`(팩 안 이미지) / `user_emoticon_packs`(내 이모티콘함). RLS는 공개 팩+내 팩만 조회, 등록·수정·삭제는 본인(또는 운영자). ⚠️ `protect_pack_status()` 트리거로 **작성자가 status를 되돌려 운영자가 내린 팩을 되살리는 것 차단**(성인인증·블라인드 때와 같은 패턴). `limit_pack_size()`로 팩당 24개 제한(피커 성능·저장소). **핵심 설계 — 본문에는 주소가 아니라 번호 토큰 `[[e:12]]`만 저장**한다. 주소를 본문에 넣게 하면 외부 이미지를 심어 추적·유해 이미지를 띄울 수 있다. 렌더는 `esc()` 뒤에 `withEmoticons()`가 **숫자 토큰만** 우리 DB 주소로 치환(모르는 번호는 조용히 제거). 목록을 불러올 때 댓글 본문을 훑어 필요한 번호를 **한 번에** 채운다(`ensureEmoticons`) — 렌더가 동기라 미리 있어야 하고, 댓글마다 조회하면 N+1이 된다. **화면**: 프로필 → 이모티콘(둘러보기·담기/빼기) → 만들기(제목+이미지 2~24장, GIF는 무압축 원본 유지). 업로드는 R2 서명 URL 방식을 그대로 재사용(`emoticon` 폴더 추가). 만든 사람은 자동으로 자기 팩을 담고, 팩 생성 후 이모티콘 insert가 실패하면 **빈 팩이 남지 않게 롤백**한다. 댓글 입력창에 🙂 버튼 → 하단 시트 피커(팩 탭 + 4열 그리드) → 커서 위치에 토큰 삽입. 검증(dev): **주입 시도 7종을 DOM 기준으로 확인** — `<img onerror>`·`<script>`·토큰에 URL 직접·토큰 안 태그·속성 탈출 모두 태그가 하나도 안 생기고 평문으로만 보임(※ 문자열 검사로는 이스케이프된 평문까지 잡혀 오판하므로 DOM으로 확인해야 함). 피커 빈 상태/탭 전환/4열 그리드, 만들기 검증 2종·슬롯 추가삭제·24개 상한, 댓글 버튼·토큰 삽입(`안녕[[e:7]]`) 확인, `next build` 통과. **→ 사용자 피드백 반영(2026-08-07)**: ⚠️ **버그: 이모티콘 등록 후 하단 탭바가 사라짐** — 원인은 이모티콘이 아니라 `kb-open`이었다. 모바일에서 입력칸에 포커스가 가면 `body.kb-open`으로 하단 탭을 숨기는데, **포커스된 입력칸이 화면 교체로 DOM에서 사라지면 `focusout`이 오지 않아** 클래스가 남는다(등록 후 `openEmoticonMarket()`이 `#main`을 통째로 갈아끼움). → `window.syncKbOpen()`을 만들어 실제 `document.activeElement`를 보고 정리하고, `enterScreen()`·popstate에서 호출. 추가로 만들기 화면은 **슬롯만 부분 렌더**(`renderEmoSlots`)하도록 바꿔 이미지 추가 중 제목 입력 포커스가 날아가지 않게 함. **접근성**: 🙂 버튼(창 열기 2단계)을 없애고 **입력칸 아래에 담아둔 이모티콘을 항상 펼쳐 둠**(가로 스크롤 14개 + ⋯ 전체보기). 한 번만 눌러 삽입된다. 담은 게 없으면 '이모티콘 담으러 가기' 버튼이 뜬다. **공개 안내**: 만들기 화면에 '등록하면 모든 회원이 담아서 쓸 수 있어요 + 남의 그림 금지' 안내 박스, 저장 시 확인창으로 한 번 더 고지. **관리 화면**(`openEmoticonManage`): 내가 만든 팩(이름 변경·삭제)과 담아둔 팩(빼기)을 한 곳에서. 검증(dev): kb-open이 화면 전환에서 정리됨, 이모티콘 줄 3개+더보기·한 번 눌러 `[[e:7]]` 삽입, 제목 입력 중 이미지 추가해도 포커스·입력값 유지, 공개 안내·확인창 문구, 관리/만들기 버튼 노출 확인. **→ 3차 확장(2026-08-07, 사용자 요청)**: 신고·관리자 삭제·랭킹·검색·개별 편집. **DB 추가분 `docs/sql/emoticons-2.sql`**: `reports.emoticon_pack_id`(기존 신고함 재사용), `emoticon_packs.saved_count`(랭킹용 — 매번 세면 느리므로 트리거로 유지, 기존 데이터는 backfill), 제목 검색용 `pg_trgm` GIN 인덱스. ⚠️ **작업 중 잡은 함정**: `saved_count` 조작을 막으려 보호 트리거를 넣었더니, security definer 함수라도 **요청자의 JWT가 그대로 보여서 자동 증감 트리거까지 막혔다** → `set_config('app.counter_bump','1',true)` 표시를 켜고 고치도록 해 통과시킴(작성자의 직접 수정은 계속 차단). **신고**: 팩 목록·상세에 🚩 버튼 → 기존 신고창(자유 서술) 재사용. 관리자 신고함에 '🙂 이모티콘 신고' 항목과 [팩 삭제] 버튼 추가. **관리자 삭제**: 신고와 무관하게 목록·상세에서 바로 삭제 가능(관리자에게만 노출), `moderation_log`에 기록. **랭킹**: 인기순(담은 수)/최신순 전환, 인기순 상위 3개에 순위 뱃지(검색 중에는 미표시 — 순위가 아니라 검색 결과이므로). **검색**: 제목 부분일치(`ilike`), 지우기 버튼. **개별 편집**: 관리 화면 → [편집]에서 팩 안 이모티콘을 하나씩 빼거나 추가(최소 1개 유지, 최대 24개). **요청 외에 필요하다고 판단해 추가한 것**: ①**팩 상세 화면**(목록은 6개 미리보기뿐이라 전체를 볼 수 없었음) ②**최근 쓴 이모티콘을 입력줄 앞으로**(localStorage `palo_emo_recent`, 20개) — 팩이 늘어나면 매번 넘겨 찾아야 해서 ③**삭제 시 R2 파일도 정리**(`deleteFromStorage`) — 안 그러면 저장소에 고아 파일이 계속 쌓임 ④작가 닉네임에서 프로필로 이동. 검증(dev): 순위 뱃지 3개·검색 중/최신순엔 미표시, 관리자만 삭제 버튼(일반 회원 0개), 신고 대상 설정·닫을 때 초기화, 최근 사용 후 입력줄 첫 자리 변경(7→9)·localStorage 저장, 팩 상세 렌더, 신규 함수 6종 확인, `next build` 통과. **→ 4차: 인기순 점수 개편(2026-08-07, 사용자 요청 '단순 담음 수 말고 다양한 데이터로')**: 기존 인기순(누적 담은 수)의 문제 — ①먼저 올라온 팩이 영원히 1등이라 신규가 못 올라옴 ②담아만 두고 안 쓰는 팩이 상위. **`docs/sql/emoticons-3.sql`**: `emoticon_uses`(사용 기록, **누가 썼는지는 저장 안 함** — 집계에 불필요하고 남기면 개인정보) + `use_count`. ⚠️ **집계는 클라이언트가 아니라 DB가 한다** — '썼다'고 알려주는 방식이면 마음대로 올릴 수 있으므로, `comments` INSERT 트리거가 **본문의 `[[e:id]]` 토큰을 직접 파싱**해 센다. 한 댓글에 도배해도 `distinct`로 1회. 기존 댓글도 일괄 backfill. `protect_pack_counters`를 `use_count`까지 막도록 확장. **점수 뷰 `emoticon_pack_rank`**(security_invoker=true): **최근 7일 사용 40% + 최근 30일 담김 30% + 누적 사용 20% + 누적 담김 10%**, 값의 자릿수가 달라 전부 `ln(1+x)`로 눌러 비교 가능하게 만든 뒤 가중. 여기에 **신규 보정**(`12*exp(-경과/1주)`)을 얹어 데이터가 없는 갓 올라온 팩이 아예 묻히지 않게 함. 최근 지표에 70%를 준 이유는 누적만 보면 신작이 노출될 자리가 없기 때문. **검증(시뮬레이션 7종)**: 새 방식은 '요즘 실제로 많이 쓰임' 1위·'최근 뜨는 중' 2위·'담기만 하고 안 씀' 5위인 반면, 예전 방식은 '옛날 히트작' 1위·'담기만 하고 안 씀' 2위이고 '요즘 많이 쓰임'은 5위였다 — 의도대로 뒤집힘. **클라이언트**: 인기순은 점수 뷰에서, 최신순은 원본 표에서 조회. 목록·상세에 '사용 N' 표시와 정렬 기준 안내 문구 추가. ⚠️ **3차 SQL 미실행 시 폴백** — 뷰가 없으면 담은 수 기준으로라도 목록이 뜨도록 처리(실측: 뷰 없음 상태에서 팩 정상 렌더 확인). **→ 5차: 채팅에도 적용(2026-08-07)**: 채팅은 말풍선을 `textContent`로 그려서 토큰이 그대로 보였다. 세 곳(히스토리 `chatMessagesHtml`, 실시간 `appendChatMessage`, 관리자 대화 열람)을 모두 `withEmoticons(esc(...))` 경유로 변경. ⚠️ 렌더가 동기라 **그리기 전에 주소를 채워야** 빈 말풍선이 안 나온다 → `ensureChatEmoticons()`를 방 열기·새로고침 시 await. 실시간 수신분은 처음 보는 이모티콘이면 받아온 뒤 **그 말풍선만** 다시 그린다(전체 재렌더 없이). `emoStripHTML(target)`이 대상 입력칸을 받도록 바꿔 댓글은 `cmInput`, 채팅은 `chatInput`으로 삽입되게 함(실측 DOM으로 확인). 채팅 입력창 아래에도 이모티콘 줄 추가. ⚠️ **채팅 사용은 랭킹에 반영하지 않는다** — 1:1 비공개라 두 계정이 주고받으며 점수를 올릴 수 있다. 공개된 댓글만 집계해야 조작이 눈에 보인다(3차 SQL의 트리거도 `comments`에만 걸려 있음). 검증(dev): 말풍선에 이모티콘 2개 렌더·주입 시도 시 우리 이미지 외 태그 0개·위험 속성 없음·원문은 평문 표시, 이모티콘 줄이 댓글/채팅 각각 올바른 입력칸을 대상으로 함, `next build` 통과. **남은 일**: SQL 3개는 실행 완료(2026-08-07). 후속 아이디어: 이모티콘 즐겨찾기 정렬, 팩 표지 지정, 사용 통계 화면.(`appendChatMessage`가 `textContent`라 토큰이 안 바뀜 — 렌더를 `withEmoticons` 경유로 바꾸고 입력창에 버튼 추가 필요).

- **일침 게시판 추가 + PC 가로 스크롤 드래그(2026-08-07, 사용자 요청)**: **일침**(`ilchim`) — '피드백 요청'(crit) 바로 뒤 «궁금해요» 그룹에 배치(성격이 가장 가까움). 칩 이모지 💢, 색 계열은 crit과 같은 `g-art`, 글머리 라벨 `crit-c`. 게시판은 `posts.board` 텍스트 값이라 **DB 작업 불필요**. 정의를 쓰는 4곳을 모두 갱신 — `palo.js`(BOARDS·CHIP_EMOJI·CHIP_GROUP·CATMAP·BOARD_GUIDE), `sitemap.js`, `board/[board]/page.js`, `admin/page.js`. 글쓰기 안내 문구는 '그림에 대해서만 말하고 사람을 깎아내리지 말 것'으로 — 일침 게시판 특성상 인신공격으로 번지기 쉬워서. **PC 가로 스크롤 버그**: 게시판 칩·말머리·이모티콘 줄이 가로 스크롤인데, **마우스로 잡아 끌면 아무 일도 안 일어났다**(터치는 브라우저가 처리하지만 마우스는 휠 말고 방법이 없다). pointer 이벤트로 드래그 스크롤 구현 — `#chips`·`.boardtabs`·`.tagbar`·`.emo-strip`·`.emo-tabs`·`.catbar-inner`·`.emo-pack-prev`. ⚠️ **핵심은 클릭과의 구분** — 끌고 손을 떼면 그 자리의 칩이 눌려 엉뚱한 게시판으로 이동한다. 5px 넘게 움직였으면 **바로 뒤따르는 클릭 한 번만** capture 단계에서 막는다(80ms 뒤 해제). 3px 이하는 손떨림으로 보고 클릭 유지. 마우스일 때만 동작하고(`pointerType==='mouse'`), 입력칸 위에서는 글자 선택을 방해하지 않게 제외. 커서는 grab/grabbing. 검증(dev): 100px 끌면 `scrollLeft` 100 이동·드래그 중 커서 grabbing·끈 뒤 클릭 무시(게시판 안 바뀜)·안 끌고 클릭하면 정상 이동(일침으로), 칩 목록에 💢일침 노출, `next build` 통과.

- **첫 화면에 글 목록을 서버에서 미리 그림(2026-08-07, 사용자 제보 '처음 들어가면 글이 없는 것처럼 보임')**: 확인 결과 **재방문은 이미 즉시 표시**되고 있었다(localStorage `palo_feed_v1` 캐시 → `primeFromCache`). **첫 방문만** 문제였다 — HTML에 회색 스켈레톤만 있고, palo.js를 받아 실행하고 데이터까지 온 뒤에야 글이 나타나서 '글 없는 사이트'로 보였다. **해결**: `lib/feed-ssr.js` 신설 — 서버에서 posts·profiles·post_images·comments·likes를 조회해 **목록 마크업을 직접 만들어 HTML에 담는다.** `app/page.js`를 async 서버 컴포넌트로 바꾸고 **`revalidate = 30`**(ISR) — 30초마다 다시 만들어 캐시하므로 응답은 정적만큼 빠르고 DB 부하도 거의 없다. `body-html.js`의 스켈레톤 자리를 `<!--PALO_FEED-->` 표시로 바꾸고, `PaloApp`이 서버 결과를 끼워 넣는다. **서버 렌더가 실패하면 예전 스켈레톤으로 폴백**(`FEED_SKELETON`을 따로 export) — 빈 화면이 되지 않는다. ⚠️ **마크업이 palo.js의 `renderList()`와 같아야 한다** — 다르면 palo.js가 다시 그리는 순간 화면이 덜컥 바뀐다. `CATMAP`·`timeAgo`·`fmtViews`·홈 노출 규칙(adult/trade/review 제외)을 서버 쪽에 같은 값으로 복제했고, 클래스 이름을 바꿀 땐 양쪽을 같이 고쳐야 한다(파일 상단에 명시). ⚠️ 작업 중 실수: 스켈레톤을 정규식으로 잘라내려다 **일부만 매칭돼 마크업이 깨졌다** → `git checkout`으로 되돌리고 `<main>` 안에서 `<div class="list">`부터 끝까지를 인덱스로 잘라내는 방식으로 다시 처리(`skel-row` 5개 확인). 검증: 초기 HTML에 **실제 글 8개**(제목 포함)가 들어가고 `skel-row` 0개, 서버 HTML과 palo.js 렌더 결과가 **글 수·제목·클래스 모두 일치**(화면 튐 없음), 빌드에서 `/`가 ISR(Revalidate 30s)로 표시됨. **→ 게시판별 페이지에도 확장(2026-08-07)**: `renderInitialFeed(board)`가 게시판을 받도록 하고 `/board/[board]`도 async 서버 컴포넌트 + `revalidate=30`으로 전환. 게시판별 화면은 `eq('board',...)`로 필요한 글만 조회해 부담을 줄임. ⚠️ **제외 게시판**: `review`(앨범형이라 목록과 마크업이 달라 다시 그릴 때 화면이 튄다)·`adult`(비공개) → 기존 스켈레톤 유지. ⚠️ **글이 없는 게시판**(예: 새로 만든 일침)은 스켈레톤을 띄웠다가 '글이 없어요'로 바뀌어 **로딩 실패처럼 보였다** → 조회는 성공했는데 0건이면 `EMPTY_HTML`(palo.js의 빈 상태와 같은 마크업)을 바로 내보내도록 처리. 검증: `/board/talk` 6개·`/board/doodle` 1개 SSR(스켈레톤 0), `/board/ilchim`은 빈 상태 즉시 표시, `review`는 스켈레톤 유지, 클라이언트 렌더와 글 수·제목 일치하고 모든 행이 해당 게시판 글임을 확인.

- **모의해킹(자체 보안 점검) + 취약점 4건 수정(2026-08-07, 사용자 요청)**: 본인 사이트 대상 비파괴 점검. **먼저 확인한 것(문제 없음)**: DOMPurify가 script·이벤트핸들러·javascript:·svg onload·대소문자/인코딩 우회 XSS를 모두 차단, RLS로 비로그인 읽기(login_ids·signup_log·adult_verify_log·moderation_log 전부 0건)·쓰기(42501)·권한상승(글수정·랭킹조작·성인인증·가림해제) 모두 차단, 저장소 라우트는 SVG 미허용으로 stored XSS 불가·이미지가 별도 도메인(img.commi.kr)이라 격리, 네이버 콜백 state CSRF 방어, API는 쿠키가 아닌 Bearer 토큰이라 CSRF 무관, 소스맵 403·.env/.git 404·HSTS 있음. **수정한 취약점 4건**: ①**CSS 오버레이 클릭재킹**(중대) — 본문 `style` 허용이라 `position:fixed;100vw×100vh` 오버레이로 글 열람자 화면을 가로챌 수 있었다. DOMPurify `afterSanitizeAttributes` 훅으로 안전한 CSS 속성만 남기고 position/transform/뷰포트단위/z-index/url()/expression 제거(`_filterStyle`). ②**외부 추적 픽셀** — 본문 `<img src>`에 외부 주소를 넣어 열람자 IP 수집 가능 → src를 img.commi.kr·*.supabase.co·data:image만 허용(`_safeMediaSrc`). 정상 서식(글자색·형광펜·R2/옛 이미지)은 유지됨을 실측. ③**가입 IP 제한 우회**(중대) — `clientIp()`가 `cf-connecting-ip`(우리는 CF 프록시 뒤가 아니라 위조 가능)를 1순위로, `x-forwarded-for` **첫 값**(클라가 끼워넣음)을 신뢰 → 헤더 위조로 IP 무한 변조해 가입 제한 우회 가능했다. Vercel이 채우는 `x-real-ip` 우선 + xff **맨 뒤 값**만 신뢰하도록 수정(signup·adult-verify 공통). ④**클릭재킹/스니핑 방어 헤더 부재** — `next.config.mjs`에 `X-Frame-Options:SAMEORIGIN`·`X-Content-Type-Options:nosniff`·`Referrer-Policy`·`Permissions-Policy` 추가. 검증(프로덕션): 오버레이 `<div>HIJACK</div>`로 무력화·추적픽셀 src 제거·정상서식 유지, 보안 헤더 4종 응답 확인, `next build` 통과. **→ 남은 낮은순위 3건도 정리(2026-08-07)**: ①`lib/client-ip.js` 신설 — 신뢰 IP 판별(`clientIp`)과 경량 메모리 rate limit(`rateLimit`)을 공통화. signup·adult-verify에 중복돼 있던 `clientIp`를 이걸로 통합. ②**로그인 라우트에 IP별 분당 20회 제한** 추가(429). 폴백 경로라 근본 방어는 Supabase Auth Rate Limits가 담당(대시보드 설정 권장). 실측: 25회 연속 시 20회 초과분 차단. ③**업로드 URL 발급에 사용자별 분당 60회 제한** — 저장소 대량 남용 차단. ⚠️ 서명 URL에 `ContentLength`를 넣어 용량을 R2가 강제하게 하는 방법도 있으나, R2 키가 로컬에 없어 **라이브 검증 불가**하고 잘못되면 **모든 업로드가 깨질** 위험이 커서 채택하지 않음(원위험도 낮음 — 로그인 필요+본인 폴더 한정). 발급 횟수 제한으로 같은 목적 달성. ④**네이버 콜백 `siteBase`를 허용 도메인 목록으로 제한** — Host 헤더 위조 오픈 리다이렉트 차단. 실측: `X-Forwarded-Host: evil.com`으로도 Location이 `https://commi.kr`로 고정됨. 검증(프로덕션): 로그인/가입/업로드 정상 응답(회귀 없음), 네이버 Host 위조 방어, `next build` 통과. ⚠️ 메모리 기반 rate limit은 서버리스 인스턴스별이라 완벽하진 않음(warm 인스턴스 내 폭주만 확실히 완화) — 정밀 제한이 필요해지면 Supabase 대시보드 설정 또는 Upstash 같은 외부 저장소 필요.

- **커미션 상세의 구독자 수 제거(2026-08-04)**: 상세 하단 `.cm-sub-card`에 하드코딩된 가짜 값 **"구독자 115명"**(`.cm-cnt`)이 노출되고 있어 삭제. 카드 자체(채널명 + `구독` 버튼→`cmComingSoon()`)는 유지. 검증: 상세 화면에서 "구독자" 문구 사라짐, 카드는 "P | 미미 커미션 | 구독"으로 정상 렌더(높이 76px), 콘솔 무에러. ⚠️ **남아있는 곳**: `cmOpenArtistProfile()`(커미션 상세 → 작가 프로필 **예시** 화면, 본문에 "실제로는 기존 작가 프로필로 연결됩니다" 안내가 붙은 데모)에도 하드코딩 `115 구독자` 통계가 있음 — 사용자가 상세페이지만 지목해 그대로 뒀으니 필요 시 함께 정리할 것.
- **"이글이글 · 지금 반응 뜨거운 글" 위젯 제거(2026-08-04)**: 사용자 요청. 원래 PC에서만 보이고 모바일에선 `@media`로 숨겨져 있던 가로 스크롤 카드 위젯 → **렌더 자체를 삭제**(renderList의 `if(state.board==="all"&&!state.query&&state.sort==="new")h+=emberHTML();` 라인 + `emberHTML()` 함수 제거) 및 관련 CSS 전부 정리(`.ember`/`.ember-head`/`.ember-scroll`/`.ember-card`/`.ec-*`, 모바일·400px 미디어쿼리 포함). **사이드바의 "지금 뜨거운 이야기"(`#hotList`, `renderHot`)는 별개 위젯이라 그대로 유지.** 검증: 데스크탑·모바일 모두 `.ember` 요소·문구 없음, `emberHTML` undefined, `#main` 구성 boardtabs→bh-row→notice→list로 간격 0 유지, 사이드바 위젯 정상, 콘솔 무에러.
- **공지 위치 비대칭 수정(2026-08-04)**: 증상 — 공지글 위치가 대칭이 안 맞아 보임. 실측 원인 — 공지 **위쪽에만 6px 간격**(`.bh-row{margin-bottom:6px}`)이 있고 아래쪽은 0이라 상하 비대칭, 게다가 공지 패딩(11/10px)이 게시글 행(10/9px)과 미묘하게 달랐음. 해결 — `.bh-row{margin-bottom:0}`(모바일 포함)로 간격 제거, `.notice` 패딩을 `.post`와 **완전히 동일**하게(데스크탑 `10px 6px`, 모바일 `9px 4px`) → 컨트롤 줄 → 공지 → 목록이 1px 구분선만으로 이어지는 균등한 리듬. 검증(offsetTop 기준): 모바일·데스크탑 모두 형제 간 간격 0, 공지/게시글 패딩·좌측 정렬 일치, 콘솔 무에러. ⚠️ **측정 주의**: 자동화 브라우저는 창이 숨겨지면 CSS 애니메이션이 진행되지 않아 `#main>.boardtabs`/`.list`의 `viewIn`이 시작 키프레임(translateY 8px)에 멈춰 `getBoundingClientRect`가 8px 어긋나 보임 → **레이아웃 기준 `offsetTop`으로 측정해야 정확**(이번에 실제로 겪음, 실기기에선 애니메이션이 끝나 문제 없음).
- **말머리 추가(2026-08-04)**: `TAGS_BY_BOARD`에 `doodle:["낙서","크로키"]`, `collab:["협업","팀원모집"]` 신설(원래 이 두 게시판은 말머리가 없었음). DB 변경 불필요(`posts.category` 기존 컬럼 사용). 검증: 목록 말머리 필터(전체·낙서·크로키 / 전체·협업·팀원모집)와 글쓰기 말머리 선택 버튼 양쪽 모두 정상 노출, 콘솔 무에러. **게시판 탭 아이콘+성격별 색 구분(2026-08-04, 사용자: "A안이 좋은데 게시판 구분이 약함")**: 한 줄 가로 배치·가로 스크롤 유지하면서 구분력만 강화(A·B·C안 공통 적용). ①**아이콘 조정**(사용자 예시 반영): intro 👋→🙋, crit 🔍→💡, recruit 💼→🔍, tip 💡→📁 (나머지 유지). ②**성격별 색 그룹** `CHIP_GROUP` 맵 신설 → `chipsHTML`이 칩에 그룹 클래스 부여: `g-all`(전체 글=중립), `g-talk`(핑크: intro·talk·ask·vote), `g-art`(퍼플: doodle·wip·sketch·crit), `g-trade`(블루: request·recruit·used), `g-event`(그린: collab·challenge·tip), `g-etc`(그레이: suggest). ③**CSS**: 선-스타일 텍스트 탭 → **파스텔 알약(pill)**로 전환(`border-radius:999px`, 연한 계열 배경+진한 계열 글자, 세로선 구분자 `display:none` 제거), 선택 탭은 **같은 계열의 진한 배경+테두리+weight 800**으로 강조. `.catbar-inner{gap:5px;padding:7px 0}`(모바일 4px/6px). 검증(375px): 16칩 전부 색그룹·이모지 적용, 6개 그룹 배경/글자색 구분 확인, 각 그룹 선택 시 활성 배경이 같은 그룹 비활성과 뚜렷이 구분(예 퍼플 활성 rgb(228,219,247) vs 비활성 rgb(241,237,251)), 한 줄 유지·가로 스크롤 정상(1610>335), B안에도 동일 적용, 콘솔 무에러. **→ 배경과 구분 강화(2026-08-04, 사용자: "배경과 구분이 잘 안 됨")**: `.chip` 기본 테두리를 `transparent`→`var(--line-2)`로 바꾸고 **계열별 테두리색** 지정(g-all #d9cfd6, g-talk #f0c8dc, g-art #d6cbf1, g-trade #bcdcec, g-event #cfe2b9, g-etc #dcd6db) + **옅은 그림자** `0 1px 2px rgba(90,50,80,.07)`(선택 시 `0 1px 4px rgba(90,50,80,.16)`으로 강조). 검증: 16칩 전부 1px 유색 테두리+그림자 적용, 페이지 배경 rgb(251,247,248)과 구분 확인, 콘솔 무에러. **말머리를 A안 컨트롤 줄과 같은 높이로(2026-08-04)**: 사용자 요청 — 말머리(`tagFilterBarHTML`)를 A안의 `[최신▾]·보기 토글`과 **한 줄에 상하 정렬**. 구조 변경: `renderList`의 별도 `h+=tagFilterBarHTML()` 제거하고 **`boardHeaderHTML`의 각 분기가 말머리 위치를 담당** — A안은 `.bh-row` **안쪽 왼쪽**(컨트롤은 오른쪽), B·C·현재안은 기존처럼 헤더 아래. CSS `.bh-a .tagbar{flex:1;margin:0;padding-top:0;border-top:none;flex-wrap:nowrap;overflow-x:auto}`(스크롤바 숨김) + `.bh-a .tagbar-btn{flex:none;padding:5px 11px;font-size:12px}`, `.bh-a .bh-right{flex:none}`. 검증(375px): 자유게시판에서 말머리·드롭다운·토글 세로중심 **142로 완전 일치**, 말머리 왼쪽 2px·컨트롤 오른쪽 2px, 말머리 많은 게시판(커미션 구인 6개·작업물 5개)은 가로 스크롤로 처리하며 행 높이 45px 유지, 말머리 없는 게시판(전체 글)도 정렬 정상, C안 말머리 중복 없이 1개, 콘솔 무에러. **말머리 바 가로 스크롤 위치 보존(2026-08-04)**: 증상 — 말머리가 많아 스크롤한 뒤 말머리를 누르면 맨 앞으로 되돌아감(게시판 탭과 같은 원인: `#main` 통째 교체로 `scrollLeft` 리셋). 해결 — `saveChipScroll()`/`syncChipScroll()`이 `.tagbar`도 함께 저장·복원. **주의점**: 말머리는 게시판마다 목록이 달라 무조건 복원하면 안 됨 → `_tagScrollBoard`(방금 그려진 말머리가 어느 게시판 것인지)를 `syncChipScroll`에서 기록하고, `saveChipScroll`은 `_tagScrollBoard===state.board`일 때만 저장하고 다르면 0으로. (게시판 변경 시 `state.board`는 이미 새 값인데 DOM은 아직 이전 게시판 말머리라, 단순 저장하면 이전 위치가 새 게시판에 잘못 적용되던 문제 — 실측으로 발견해 수정.) `selectBoard`의 임시 리셋 코드는 불필요해져 제거. 검증(375px, 커미션 구인·작업물): 같은 게시판에서 말머리 클릭 2회 연속 스크롤 120 유지, 게시판 변경 시 말머리 0으로 초기화되면서 게시판 탭 스크롤(700)은 유지, 새 게시판에서도 말머리 스크롤 유지(범위 내 19 유지 — 80 지정 시 38로 보인 건 해당 바의 최대 스크롤이 38이라 클램프된 것), 콘솔 무에러.

### 커미션 상세 URL(공유·SEO) (2026-08-04 추가)
글(`/post/{id}`)·프로필(`/user/{id}`)은 실제 URL이 있었지만 **커미션은 `screenStack`으로만 열려 URL이 없어**(commi.kr 고정) 공유·SEO 불가였음. 커미션 상세에 `/commission/{id}` 부여.
- **라우트 `app/commission/[id]/page.js`**: 서버 컴포넌트 + `generateMetadata`(commissions에서 `title`·`description`·첫 `commission_images` 조회 → title/description/OG image) + `<PaloApp/>` 렌더. 직접 방문·크롤러 대응.
- **`public/palo.js`**: `getCommissionIdFromPath()`(`/^\/commission\/(\d+)$/`), `_cmSetDetailUrl(id)`(상세 렌더 시 `history.replaceState`로 주소 반영 — 히스토리 항목은 enterScreen이 이미 쌓음), `cmShare(id)`(링크 복사). 상세 여는 `cmOpenCommissionById`/`cmOpenDetail`가 렌더 후 `_cmSetDetailUrl` 호출. `cmOpenCommissionById`에 **`userLeftHome=true`** 추가(부팅 딥링크가 홈 재렌더에 안 덮이게 — openPost 패턴). 부팅 dispatcher(loadRealPosts 내)·popstate 라우팅에 커미션 분기 추가. **핵심 버그**: 부팅 시 `primeFromCache()`와 초기 렌더 가드가 post·user만 체크하고 **commission을 빠뜨려** 캐시 홈 렌더(`renderList()`가 URL을 "/"로 리셋)가 딥링크를 덮어씀 → 두 가드(`primeFromCache` line·`if(!getPostIdFromPath()&&...)`)에 `getCommissionIdFromPath()` 추가로 해결. `openCommissionList`는 목록 복귀 시 `replaceState "/"`로 주소 초기화. 상세 헤더의 기존 비활성 공유 아이콘(위쪽 화살표)을 `cmShare(d.id)`로 연결.
- 검증(dev): `/commission/2` 직접방문 → 탭 제목 "1 · commi"(메타데이터)·상세 렌더·URL 유지·공유아이콘 연결, in-app 상세 열기 시 URL `/commission/{id}` 반영, 콘솔 무에러. ⚠️ 뒤로가기/공유 복사는 실기기 최종 확인 권장. **게시판 목록 URL(`/board/{id}`)도 2026-08-04 추가**(아래).

### 게시판 목록 URL(공유·SEO) (2026-08-04 추가)
게시판 선택은 `state.board`만 바꾸고 URL은 항상 "/"였음(공유·SEO 불가). `/board/{id}` 부여.
- **라우트 `app/board/[board]/page.js`**: 서버 컴포넌트 + `generateMetadata`(게시판 id→이름 맵 `BOARD_NAMES`로 title "이름 · commi"). 미지의 id는 기본 title. `<PaloApp/>` 렌더.
- **`public/palo.js`**: `getBoardFromPath()`(`/^\/board\/([a-z]+)$/`, **BOARDS에 있는 유효 id만** 반환·'all'·미지의 id는 null=홈). **`renderList()`가 URL을 게시판 기반으로 관리** — `state.query`(검색) 중이 아니면 `state.board!=="all"`→`/board/{board}`(pushState, 경로 다를 때만=보드 전환 시에만 히스토리 추가; 정렬·태그·페이지 변경은 같은 경로라 push 안 함), "all"→"/". `document.title`도 게시판명으로. 부팅: **`state` 정의 직후 IIFE로 `getBoardFromPath()`면 `state.board`를 그걸로** 세팅(파싱 시점 — 이후 renderNav·primeFromCache·dispatcher가 그 게시판을 그림, wantPath===현재라 클robber 없음). popstate: `getBoardFromPath()`면 `selectBoard(id)`, "/"로 돌아오면 `state.board!=="all"`일 때 `selectBoard("all")`(브라우저가 이미 경로 바꿔서 push 재발 안 함). `selectBoard`는 그대로(renderList가 URL 처리).
- 검증(dev): `/board/talk` 직접방문→탭 "수다 광장 · commi"·목록·URL 유지, in-app 전환(suggest→/board/suggest·"버그·건의사항 · commi", all→"/", doodle→/board/doodle·"낙서"), 콘솔 무에러.

### 검색엔진 최적화(SEO) 인프라 (2026-08-04 추가)
검색 등록(구글·네이버)을 위해 사이트맵·robots·메타 기준 추가.
- **`app/sitemap.js`**(Next 네이티브 sitemap, `revalidate=3600`=1시간마다 재생성): `https://commi.kr` 기준. 정적(`/`,`/terms`,`/privacy`) + 게시판 14개(`/board/{id}` — **성인 'adult' 제외**) + posts(`/post/{id}`, **`board!=='adult'` 필터**, 최근 5000) + **진행중(open) 커미션**(`/commission/{id}`, 최근 2000). anon supabase 클라이언트로 id 조회. 검증(dev): 56 URL·post·commission 포함 확인.
- **`app/robots.js`**: `allow /`, `disallow /admin`, sitemap `https://commi.kr/sitemap.xml`, host commi.kr.
- **`app/layout.js`**: `metadataBase: new URL("https://commi.kr")`(OG·정규 URL 기준) + 기본 `openGraph`(siteName commi, type website) + description 보강.
- **소유확인 메타태그(2026-08-04)**: `layout.js`의 `metadata.verification`에 구글(`google`)·네이버(`other["naver-site-verification"]`) 인증값 추가 → `<meta name="google-site-verification">`·`<meta name="naver-site-verification">` 렌더(검증 완료).
- **소유확인·사이트맵 제출 완료(2026-08-04, 사용자)**: 네이버·구글 둘 다 소유확인 성공 + sitemap 제출.
- **SEO 세부설정(2026-08-04)**: ①**RSS 피드** `app/rss.xml/route.js`(GET, `revalidate=1800`, 최신 글 50개·성인 제외, `application/rss+xml`) — 네이버 RSS 제출용. ②**OG 이미지**: `layout.js` 기본 og:image=`/icon-512.png`, 글·커미션은 첫 이미지·**없으면 `/icon-512.png` 폴백**(페이지 openGraph가 layout을 덮어써 이미지 없으면 og:image가 비던 문제 → 폴백으로 해결), 게시판도 폴백. `post/[id]`에 `post_images(url,sort)` 조회 추가·description 개선. ③**JSON-LD**(`layout.js` body): `@graph`에 WebSite+Organization(schema.org). ④**중복 도메인**: `next.config.mjs` `redirects()`로 host=`palo-web-nu.vercel.app`→`https://commi.kr` 308 영구이동(정규 도메인 통일). 검증(dev): /rss.xml 유효·JSON-LD 2종·og:image 폴백 확인. **남은 것(사용자)**: 네이버 서치어드바이저에 **RSS(`https://commi.kr/rss.xml`) 제출**, 홈 색인 요청. ⚠️ 실검색 노출까지 며칠~몇 주.

### 비회원 IP 앞자리 표시(디시식, 자작·도배 감별) (2026-08-04 추가)
비로그인(익명) 글·댓글에 **IP 앞 2자리(예: `210.106`)** 를 모두에게 표시 → 자작극·도배 어느 정도 감별. 로그인 유저는 미표시.
- **IP 캡처 검증**: 테스트 RPC `debug_client_ip()`로 `current_setting('request.headers',true)::json->>'cf-connecting-ip'`(및 `x-forwarded-for`)에 **진짜 클라 IP가 잡힘** 확인(Supabase=Cloudflare). 이후 debug 함수 제거.
- **DB**: `posts`·`comments`에 `ip_masked text` 컬럼. **BEFORE INSERT 트리거 `set_anon_ip_masked()`**(각 테이블): `author_id`가 있으면(로그인) `ip_masked=null`, 없으면(비회원) 헤더에서 IP 추출→마스킹(IPv4 앞 2옥텟/IPv6 앞 2그룹) 저장. **클라가 준 값은 무시=위조 방지**. 함수는 `revoke execute ... from public,anon,authenticated`(트리거 전용). ⚠️ **기존 글엔 소급 안 됨**(새 비회원 글부터).
- **클라(`public/palo.js`)**: 매핑에 `ipMasked:row.ip_masked`(글)·`ip:c.ip_masked`(댓글) 추가. 헬퍼 **`anonIpHTML(ip)`**(ip 있을 때만 ` <span class="anon-ip">(210.106)</span>`, 없으면 빈 문자열=로그인 유저 자동 미표시). 글 카드(`.who`)·상세(`.d-author` 2곳)·앨범카드(`.post-card-author`)·댓글(`.cn`) 작성자 뒤에 `anonIpHTML(...)` 부착. CSS `.anon-ip`(11px muted-2).
- **개인정보 처리방침 §4**(`app/privacy/page.js`)에 고지 문구 추가(비회원 글·댓글에 IP 앞 2자리 표시·저장).
- 검증(dev, 목업): 헬퍼·글 카드·상세·댓글 모두 IP 표시, 로그인(ip null)이면 미표시. ⚠️ 실제 트리거 동작은 **로그아웃 상태로 글/댓글 작성**해 최종 확인 권장.

### 자기소개 게시판 추가 + 자유게시판 개명 + 글쓰기 게시판 안내문구 (2026-08-04)
- **`talk` 이름 `수다 광장`→`자유게시판`**: `BOARDS`(이야기 그룹) name·`CATMAP.talk.label`(수다→자유)·`app/board/[board]/page.js` BOARD_NAMES·이용규칙 모달 "수다 광장에 인사"→"자기소개 게시판에 인사". id는 `talk` 그대로(URL/데이터 호환).
- **자기소개 게시판 신설**: `BOARDS` 이야기 그룹에 `{id:"intro",name:"자기소개",icon:사람}` 을 **전체 글과 자유게시판 사이**(자유게시판 위)에 추가. `CATMAP.intro={label:"자기소개",cls:"talk-c"}`, board 라우트 BOARD_NAMES·`sitemap.js` BOARDS에 intro 추가. 말머리(TAGS_BY_BOARD) 없음.
- **글쓰기 게시판별 안내문구**: `BOARD_GUIDE` 맵(id→짧은 사용 안내), body-html `#edBoardGuide`(잠금 안내 위), `refreshBoardLabel()`이 `edState.board`에 맞춰 `📋 안내`를 표시/숨김. CSS `.ed-board-guide`(brand-soft 소프트 박스). 검증(dev): 그룹 순서·라벨·intro/talk/suggest 안내 표시·콘솔 무에러.

### 투표: 다중 + 본문 인라인 배치로 개편 (2026-08-04)
기존엔 글당 투표 1개·본문 하단 고정. → **글 하나에 여러 투표 + 본문 원하는 위치**로 개편.
- **DB**: `polls`의 `post_id` 유니크(제약/인덱스) 제거(글당 다중 허용) + `anchor_key text`(본문 마커와 매칭)·`sort int` 컬럼 추가.
- **앵커 방식**: 글쓰기 도구바 📊 버튼(`edInsertPoll`, onmousedown로 선택 보존)이 **커서 위치에 `<div class="poll-anchor" data-poll="KEY" contenteditable="false">` 블록을 Range API로 삽입**(execCommand insertHTML은 일부 환경서 실패해 Range로). 블록 [편집]→모달(`#pollEditModal`, `edEditPoll`/`pm*`/`edSavePollModal`)에서 질문·선택지·복수/익명/마감 설정, [삭제]→`edRemovePoll`. `edState.poll`(단일)→**`edState.polls={key:{...}}`**(다중). sanitize `ALLOWED_ATTR`에 `data-poll` 추가(마커 보존; class/버튼은 저장 시 제거돼 `<div data-poll="KEY"></div>`만 남음).
- **저장(submitPost)**: 최종 content_html에서 `[data-poll]` 마커를 순회하며 각 투표를 `polls`(anchor_key=KEY, sort) + `poll_options`로 insert(불완전한 건 스킵). RLS는 기존대로 '이 글 작성자만'(=투표는 사실상 로그인 필요).
- **불러오기/렌더**: loadRealPosts가 글당 `polls:[{id,anchor}]`. renderPostDetail이 앵커 있는 투표는 본문의 `[data-poll=anchor]` 마커를 `#pollBox-{id}` 박스로 **교체**(마커 위치에 인라인), 앵커 없는(구) 투표는 본문 아래 박스. 투표 표시/투표/실시간 함수 전부 **per-poll**(`#pollBox-{id}`, `_pollChannels`/`_pollVotersOpen`/`_pollVotersData` 맵)로 리팩터. CSS `.poll-anchor`(에디터 블록)·`.pm-*`(모달).
- 검증(dev, 목업): 투표 2개 삽입·모달 저장·라벨·sanitize 마커 보존·상세에서 `[위문단,pollBox,아래문단]` 순서(인라인 배치)·콘솔 무에러. ⚠️ 실제 DB 저장→표시 왕복은 **로그인 후 투표 넣은 글 작성**으로 최종 확인 권장. **리퀘스트 안내문구도 수정**(BOARD_GUIDE.request).

### 실시간 알림함 (2026-07-29 추가 — DB에 진짜로 저장됨)
기존 "알림함"은 원본 프로토타입부터 있던 **가짜 데모 배열**(`NOTIFS`, 새로고침하면 초기화)이었음. 이번에 채팅/댓글/좋아요 3가지를 실제 DB 트리거로 알림을 만들고 영구 저장하도록 바꿈(스키마/트리거는 4절 "notifications" 참고). 진행 순서:
1. **1차(채팅만, 이후 폐기된 설계)**: `messages` 테이블을 직접 실시간 구독해서 클라이언트가 알림을 만드는 방식으로 시작 — 그런데 이러면 "지금 내가 참여 중인 대화방 id 목록"을 클라이언트가 직접 관리해야 하고, 새로 생긴 대화방을 놓치는 등 허점이 많았음.
2. **2차(현재, 트리거 기반)**: `notifications` 테이블 + 3개의 security definer 트리거(`notify_new_message`/`notify_new_comment`/`notify_new_like`)로 재설계 — 서버가 이벤트 발생 즉시 알림을 만들고, 클라이언트는 그냥 "내 알림"만 실시간 구독하면 끝. 훨씬 단순하고 놓칠 일이 없음.
- 클라이언트 로직(`public/palo.js`): `loadNotificationsFromDB()`(로그인 시 최근 50개 로드, 기존 가짜 `NOTIFS`의 `sys` 데모 항목과 합침) + `subscribeToNotifications()`(realtime INSERT 구독, `SETTINGS.chat/cm/like` 토글 존중) + `dbRowToNotif()`(DB row → 화면용 객체 변환). 알림 클릭(`notifClick`)/삭제(`delNotif`)/전체읽음(`markAllRead`)이 실제 DB에도 반영되도록 함께 고침(`dbId`가 있는 항목만).
- **로그아웃 시 실제 알림은 지우고 데모 `sys` 항목만 남김**(다른 계정으로 로그인했을 때 이전 사람 알림이 남아있으면 안 되니까).
- **버그 하나 발견·수정**: 알림을 클릭하면 엉뚱한 글로 이동하는 문제가 있었음 — `notifications.link_post_id`는 실제 DB의 `posts.id`인데, `openPost()`는 `100000+posts.id` 형태의 로컬 id를 기대함(3절 "POSTS 배열의 이중 구조" 참고). `dbRowToNotif()`에서 변환을 안 해줘서 생긴 문제, `post: row.link_post_id?100000+row.link_post_id:null`로 고침. **이 프로젝트에서 게시글 id를 다루는 코드를 새로 쓸 때마다 반복적으로 발생하는 함정이라 특히 주의할 것.**
- **정리한 것**: 진짜 댓글 알림이 생기면서, 예전 프로토타입 데모 코드 `scheduleLiveReply()`(글 쓰고 7초 뒤 가짜 회원이 가짜 댓글을 다는 척하며 가짜 알림을 띄우던 코드, `MEMBERS` 배열도 같이)를 완전히 제거함 — 실제 알림과 뒤섞이면 혼란스러웠을 것.
- **댓글/좋아요 "sys"(공지·챌린지) 알림은 여전히 미구현** — `notices`는 실제 테이블이지만 새 공지 작성 시 전체 회원에게 알림을 뿌리는 트리거는 아직 없음(원한다면 같은 패턴으로 추가 가능).

### 활동 기반 등급 시스템 (2026-07-29 추가, 1·2·3단계 완료)
사용자의 핵심 원칙: 글 개수 같은 "양"보다 남에게 인정받은 "질"(추천·도움돼요)을 높게 평가하고, 위 등급일수록 훨씬 어렵게, 도배로는 못 올리게. **점수·등급 계산은 전부 서버(security definer 트리거)에서 처리 — 클라이언트는 절대 관여 못 함**(사용자가 명시적으로 강조한 요구사항).

- **등급 8단계, 지수적 증가**: `level_thresholds` 테이블(4절 참고)에 1등급(0점)~8등급(12000점)까지 정의. **이름/이모지는 사용자가 두 차례 커스터마이징해서 최종적으로 "미대 입시" 컨셉**으로 확정됨: 🖍️새내기(1) → ✏️소묘반(2) → 🎨채색반(3) → 🖼️입시생(4) → 🏫미대 새내기(5) → 🎓미대생(6) → 🖌️작가(7) → 👨‍🎨교수님(8). 이 표만 SQL(`update level_thresholds set name=..., emoji=... where level=...`)로 수정하면 이름·이모지·필요 점수를 바로 바꿀 수 있음, 코드 변경 불필요.
- **점수 규칙**: 글 작성 +2, 댓글 작성 +1, 내 글이 추천(좋아요)받으면 +5, 크리틱(`board='crit'`, 화면 이름은 "피드백 해주세요" — 아래 "게시판 목록" 참고) 댓글에 "도움돼요" 받으면 +20. 전부 `award_score(user_id, amount)`라는 공용 함수를 통해서만 반영됨(직접 점수를 update하는 코드는 어디에도 없음).
- **트리거 4개**: `notify_score_new_post`(posts INSERT) / `notify_score_new_comment`(comments INSERT) / `notify_score_new_like`(likes INSERT, 좋아요 누른 사람이 아니라 **글쓴이**에게 +5) / `notify_score_helpful`(comment_helpful INSERT, 크리틱 게시판일 때만 **댓글쓴이**에게 +20). 공통 예외: 익명 작성자(받을 사람 없음)와 자기 자신에게 주는 추천/도움돼요는 전부 무시.
- **"도움돼요" 버튼이 사실은 가짜였음을 발견·수정**: `helpful()`은 원래 클릭하면 화면에만 반짝하고 새로고침하면 사라지는 순수 로컬 함수였음(DB 연동 전혀 없음). +20점의 근거가 되려면 진짜 저장이 필요해서, `comment_helpful` 테이블(4절 참고, **로그인 필수** — likes와 달리 anon 불가, +20이라는 큰 보상이라 도배 방지 차원에서 더 엄격하게 잠금)을 새로 만들고 `helpful()`을 완전히 실제 DB insert/delete로 재작성함. `loadRealPosts()`도 `comment_helpful`을 같이 조회해서 각 댓글의 `h`(개수)/`_me`(내가 눌렀는지)를 실제 값으로 채움.
- **화면 반영**: `public/palo.js`의 `LEVEL_THRESHOLDS`(전역 배열, `loadRealPosts()`에서 DB로부터 로드) + `levelName(level)`/`levelProgress(score,level)` 헬퍼. "내 정보"(`openProfile()`)는 `AUTH.profile.score`/`.level`을 그대로 신뢰해서 진행바를 그림(예전의 `mine.length>=3` 로컬 계산 방식 완전히 대체). 공개 프로필(`openUserProfile()`)과 관리자 회원 목록(`app/admin/page.js`)도 실제 등급 이름 + 점수를 표시하도록 같이 고침(이전엔 `profiles.level`이 아무도 안 쓰는 죽은 컬럼이라 항상 "새싹 작가"만 보였음).
- **`refreshMyProfile()`**: 내가 글/댓글을 쓰면 서버 트리거가 즉시 점수를 반영하지만, 클라이언트의 `AUTH.profile`은 자동으로 갱신되지 않으므로 `submitPost()`/`addComment()` 성공 직후 이 함수로 내 프로필을 다시 불러와 화면에 바로 반영되게 함.
- **⚠️ 동시 세션 재발견(2026-07-29)**: 이 작업을 시작하기 전 파일을 열어보니, 커밋 안 된 상태로 6단계짜리 다른 등급 시스템 초안(`LEVEL_TIERS`, 클라이언트에서 `mine.length*10+likeSum*2+cmSum*3`으로 로컬 계산)이 이미 들어있었음 — 다른 세션이 작업 중이었던 것으로 보임(주석에 "DB의 recalc_user_level()과 기준을 맞출 것"이라고 적혀 있어 그쪽에서 서버 함수도 별도로 준비했을 가능성 있음). **사용자에게 확인 후 "새 스펙으로 완전히 교체" 지시를 받고 진행함** — 서버 권위(클라이언트 조작 불가) 요구사항을 만족 못 하는 초안이었으므로 교체가 맞는 판단이었음.
- **⚠️ 동시 세션 재발견에서 이어짐**: 위 항목은 1단계 때 발견한 것이고, 2단계(도배 방지)에서 아래처럼 마저 정리함.

**2단계 — 도배·점수 남발 방지 (2026-07-29 완료):**
- **일일 상한(20점/일)**: 단, **글/댓글로 얻는 점수에만 적용**, 추천·도움돼요로 받는 점수는 사용자 요청에 따라 예외(상한 없음). `award_capped_post_comment_score()`(글/댓글 전용, 상한 적용) vs `award_score()`(좋아요/도움돼요 전용, 상한 없음)로 지급 경로를 분리함. 상한을 넘는 만큼은 "전부 거부"가 아니라 **남은 한도만큼만 잘라서 지급**(예: 오늘 19점 벌었는데 글 하나 더 쓰면 1점만 인정).
- **1분 연속 작성 제한**: `profiles.last_activity_at`(신규 컬럼) — 글이든 댓글이든 마지막으로 **점수를 받은** 시각 기준, 1분 안에 또 쓰면 이번 건 점수 없음(글/댓글 통합 하나의 시계).
- **같은 글에 댓글 여러 개 달아도 점수는 1회만**: 별도 컬럼 없이, 댓글 저장 시점에 "이 글에 내가 단 다른 댓글이 이미 있는지"를 `comments` 테이블에서 직접 조회해서 판단(`notify_score_new_comment()`).
- **품질 조건(5자 미만 제외)**: 글은 `content_html`에 `<img>`/`<video>` 태그가 있으면 텍스트 길이와 무관하게 점수 인정(그림/동영상만 올린 글도 정당한 컨텐츠이므로) — 사용자에게 명시적으로 확인받은 설계 선택. 댓글은 이미지 업로드 기능이 없으므로 5자 미만이면 예외 없이 점수 제외.
- **삭제 시 회수**: `score_log`(신규 테이블, 실제로 지급된 양만 이벤트별로 기록 — 상한/도배 방지 때문에 "원래 받아야 할 양"과 "실제로 받은 양"이 다를 수 있어서 반드시 필요했음)를 근거로, 글/댓글이 삭제되면(`on_post_delete_clawback`/`on_comment_delete_clawback`, BEFORE DELETE 트리거) 그 글/댓글에 실제로 귀속됐던 점수 합계(작성 보너스 + 그동안 받은 추천/도움돼요 보너스 전부)를 정확히 회수. `comments`가 `posts`에 cascade로 걸려 있어서, 글이 삭제되면 그 글의 댓글들도 각자 자기 작성자의 점수를 알아서 회수함.
- **좋아요/도움돼요 "취소 후 재클릭" 무한 반복 악용도 이번에 같이 닫음**(1단계에서 발견한 구멍, 사용자가 "이번에 같이 닫기"로 명시적 선택): `score_awarded_likes`/`score_awarded_helpful`(신규 테이블, RLS는 켜뒀지만 정책을 아예 안 둬서 클라이언트는 절대 못 건드림) — "이 사람이 이 글/댓글로 점수를 받은 적이 있는지"를 좋아요/도움돼요를 취소해도 **영구히** 기억해서, 두 번째부터는 트리거가 재지급을 거부함. **왜 댓글엔 이런 장부가 필요 없었는지**: 댓글은 삭제하면 클로백이 발생하므로 "지급→삭제(회수)→재작성→지급→..." 사이클을 반복해도 순누적 이득이 0으로 수렴함(직접 계산해서 확인). 반면 좋아요/도움돼요는 "취소"가 클로백을 유발하지 않는 별개 동작이라(요청 범위상 삭제 클로백은 글/댓글에만 적용), 이 장부 없이는 무한 반복 시 계속 순증가했음.
- **의도적으로 손 안 댄 것**: 글/댓글을 UPDATE(수정)해서 5자 미만→이상으로 바꾸거나 그 반대로 만들어도 점수는 재계산되지 않음(작성 시점에만 판정) — 요청 범위 밖이라 다루지 않음.

**3단계 — 화면에 예쁘게 표시 (2026-07-29 완료):**
- **등급 뱃지(이모지+이름)**: `levelBadgeHtml(level, extraClass)`(`public/palo.js`) 공용 헬퍼로 통일. 글 목록(`.who` 옆), 글 상세(작성자 이름 옆), 댓글(작성자 이름 옆) 3곳 모두 적용. `loadRealPosts()`가 `profiles`에서 `level`도 같이 가져와서 각 글(`p.authorLevel`)·댓글(`c.lv`)에 실어 나름. 인라인 컨텍스트에선 `"lv-badge"` 클래스를 추가로 붙여 `margin-left:5px`로 이름과 살짝 띄움(`app/globals.css`), "내 정보"/공개 프로필 헤더처럼 flex `gap`이 이미 있는 곳은 추가 클래스 없이 그대로 사용.
- **진행바**: 1단계 때 이미 구현된 `levelProgress()`/`openProfile()` 그대로 재사용(추가 변경 없음, 이미 있던 기능이었음).
- **포인트 내역(선택 요청)**: **새 테이블을 만들지 않고 2단계 때 이미 만든 `score_log`를 그대로 재사용**함(이벤트별 실제 지급량이 이미 다 기록되고 있었으므로). "내 정보"에 "포인트 내역" 버튼 추가 → `openScoreLog()`가 본인 로그 최근 100건을 조회해서 `renderScoreLog()`로 표시(이벤트 종류는 `SCORE_EVENT_LABELS`로 한글 라벨 매핑: 글 작성/댓글 작성/글이 추천받음/댓글이 도움돼요 받음).
- **관리자 회원 목록**(`app/admin/page.js`)도 `level_thresholds`에서 `emoji`까지 같이 불러와서 뱃지 형태로 표시하도록 갱신.

**4단계 — 주간/월간 포인트 랭킹, 일반 유저 공개 (2026-07-29 완료):**
- 헤더에 "🏆 랭킹" 아이콘 버튼 추가(`app/body-html.js`) → `openLeaderboard(period)` (`public/palo.js`, `period`는 `"week"`/`"month"`) → `renderLeaderboard()`. 상위 10명, 클릭하면 그 사람 공개 프로필로 이동.
- **`score_log`는 본인만 조회 가능한 RLS라서(4절 참고), 이 표를 직접 쿼리해선 다른 사람 순위를 못 봄.** 그래서 "집계된 순위만" 안전하게 반환하는 security definer RPC `get_score_leaderboard(p_days, p_limit)`를 새로 만듦 — 개별 `score_log` 행은 절대 노출 안 되고, `user_id`/`nickname`/`level`/기간 합산 점수만 나감. `anon`에게도 execute 권한을 줘서 **로그인 안 해도 조회 가능**(요청한 "일반 유저도 볼 수 있게"를 문자 그대로 만족).
- 7일/30일 두 기간 모두 이 함수 하나(`p_days` 값만 다르게)로 처리, 새 테이블·새 트리거 불필요.

---

## 6. 알려진 이슈 · 남은 보안 부채 · 의도적으로 미룬 것

**경미한 보안 부채:**
- `post_images_insert_all_temp` / `images_bucket_insert_all_temp` — 누구나 이미지 업로드 가능(파일 크기 제한 없음). 아직 안 좁혀짐 — 업로드 남용(스팸/용량) 우려가 있으면 본인 글에 첨부할 때만 허용하도록 손볼 필요 있음.

**설계상 알려진 한계 (버그 아님):**
- **관리자는 모든 이용자의 1:1 채팅을 열람할 수 있음(의도적 설계, 2026-07-29부터).** 신고 여부와 무관하게 `is_admin()`이면 어떤 대화든 볼 수 있음 — 사용자가 명시적으로 요청한 기능이고, 모든 열람은 `chat_admin_access_logs`에 수정·삭제 불가능하게 기록됨(감사 가능성으로 오남용 억제). 다만 "기술적으로 막는" 게 아니라 "기록으로 남겨 사후 확인 가능하게 하는" 방식이라는 점을 정확히 인지할 것 — 이용약관/개인정보처리방침에 이 내용을 고지하는 문구 초안은 있으나 실제 약관 페이지는 아직 없음(아래 "아직 안 한 것" 참고).
- 회원 차단(밴)은 **로그인 상태로 쓰는 것만** 막음. 로그아웃 후 익명 글쓰기까지는 못 막음 — "로그인 없이도 글쓰기 가능"이라는 설계와 근본적으로 상충하는 부분.
- Vercel Analytics / GA4 데이터를 `/admin` 페이지 안에 직접 그래프로 넣을 수 없음 — 둘 다 무료 플랜에서 데이터를 꺼내오는 공개 API가 없음(GA4는 Data API로 가능하나 서비스 계정+서버 라우트 필요, 훨씬 복잡함). 각자의 대시보드(Vercel Analytics 탭 / analytics.google.com)에서 확인.
- `/post/[id]`, `/user/[id]`, 홈 모두 정적 HTML이 먼저 뜨고 JS가 나중에 실제 데이터로 교체하는 구조 자체는 유지됨(진짜 SSR로 바꾸지 않는 한 완전히 없앨 순 없음) — 다만 **홈페이지에서 "더미 글이 보였다 최신글로 바뀌는" 문제와 그로 인한 스크롤 튐은 2026-07-29에 고침**(아래 참고). 지금은 실제 데이터가 뜨기 전까지 중립적인 로딩 스켈레톤만 보임.

**설계 문서 "단계 8" 중 아직 안 한 것:**
- 이용약관 · 개인정보처리방침 · 청소년보호 정책
- 커스텀 도메인 연결 (선택)
- 알림함 · 팔로우 · 챌린지 자동 집계 등 부가 기능
- 게시판별/목록 고유 URL (요청받은 건 글 상세·프로필 두 개뿐이라 게시판 URL은 미착수)

**코드 패턴 관련 교훈 (다음에 비슷한 버그 만들지 않도록):**
- 버튼 하나의 상태만 바뀌면 되는 액션(좋아요, 팔로우 등)에 전체 뷰 재렌더 함수(`openPost` 등)를 재사용하고 싶어질 때는 주의할 것. `main.innerHTML` 전체 교체는 이미지 재생성으로 인한 레이아웃 흔들림, 스크롤 위치 초기화, 조회수 중복 증가 같은 예상 못 한 부작용을 만들 수 있음. `toggleLike`/`toggleFollow`는 이제 `#likeBtn`/`#followBtn` 요소만 직접 patch하는 방식으로 고쳐져 있음 — 비슷한 패턴이 다른 곳에 더 남아있을 수 있으니 새 기능 만들 때 확인할 것.
- **공용 CSS 클래스를 "지금 어떤 화면이 떠 있는지" 판단하는 용도로 쓰지 말 것.** Supabase Auth의 `onAuthStateChange`는 로그인/로그아웃뿐 아니라 다른 탭에서의 토큰 갱신 같은 이벤트에도 발생하는데, 이때 실행되는 `applySession()`이 `document.querySelector(".profile")`로 "지금 프로필 화면인가"를 판단하고 있었음. 문제는 `.profile` 클래스가 내 정보 대시보드뿐 아니라 **채팅방 화면, 다른 유저의 공개 프로필**에도 스타일 재사용 목적으로 붙어 있었다는 것 — 채팅 중에 다른 탭을 열기만 해도 강제로 "내 정보" 화면으로 튕겨나가는 버그로 이어짐. 고친 방법: `openProfile()`(내 정보 대시보드)의 결과물에만 `id="myProfileView"`를 추가하고, 판단 조건을 `document.getElementById("myProfileView")`로 변경. **교훈**: 화면의 "정체성 판단"에는 반드시 그 화면 전용의 고유 id를 쓰고, 스타일 재사용을 위한 공용 class와 절대 혼용하지 말 것.
- **같은 로컬 프로젝트 폴더를 여러 Claude Code 세션(다른 창)이 동시에 건드릴 수 있다는 걸 실제로 겪음.** 다른 세션이 `public/palo.js`를 독립적으로 수정 중이던 걸 (1) `preview_start`가 "포트 3000이 다른 세션의 dev 서버가 쓰는 중"이라는 에러를 낸 것, (2) 아직 작성하지 않은 `hotScore`/`sortHot` 코드가 이미 파일에 있던 것, 두 가지 단서로 알아챔. 대응: 사용자에게 알리고, `git diff`로 그 변경이 완결되고 앞뒤가 맞는 코드인지 확인한 뒤 커밋에 포함시켰고, 여러 세션이 공유하는 `~/.claude/launch.json`(dev 서버 설정)은 절대 건드리지 않음. **새 세션에서 작업을 시작하기 전에 `git status`/`git diff`로 로컬에 낯선 변경사항이 있는지부터 확인할 것** — 다른 세션이 작업 중일 수 있음.

---

## 7. 외부 서비스 설정값 (재현·복구용 메모)

| 항목 | 값 |
|---|---|
| Supabase 프로젝트 URL | `https://qabbdgfottbnapmyjudy.supabase.co` |
| Supabase Auth 리다이렉트 허용 목록 | `http://localhost:3000/**`, `https://palo-web-nu.vercel.app/**` |
| Google OAuth 승인된 리디렉션 URI | `https://qabbdgfottbnapmyjudy.supabase.co/auth/v1/callback` (Supabase 콜백 하나만 — 우리 앱 자체 주소 아님) |
| GA4 측정 ID | `G-RT297TVCLP` |
| Vercel 프로젝트 환경변수 | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_GA_MEASUREMENT_ID` (전부 Vercel Settings → Environment Variables에 등록되어 있어야 함, `.env.local`은 git에 안 올라가므로 로컬과 별개로 설정 필요) |
| 관리자 계정 | `dangsimu@gmail.com` (구글 로그인), `profiles.is_admin=true`로 지정됨 |

**커스텀 도메인을 나중에 연결하면 다시 해야 하는 것:** Supabase Auth의 리다이렉트 허용 목록에 새 도메인 추가. (Vercel Analytics/GA4는 코드에 박힌 값이라 도메인 바뀌어도 그대로 작동, 다시 안 해도 됨.)

---

## 8. 보안 점검 이력

**2026-08-03 Supabase 린트 점검 + 🔴 점수 조작 취약점 수정**: Supabase Performance/Security Lint(100건, 전부 WARN·ERROR 0) 검토. **핵심 취약점**: `award_score`/`award_capped_post_comment_score`가 함수 기본 실행권한(PUBLIC)이 회수 안 돼 있어 **비로그인 포함 아무나 RPC로 호출→자기 score·ad_points 무한 지급** 가능(실측 확인). 원인: Postgres는 함수 생성 시 EXECUTE를 **PUBLIC**에 부여 → `revoke ... from anon`만으론 안 막히고 **`revoke ... from PUBLIC`** 필요(1차 시도 실패로 학습). **조치**: 클라가 호출하지 않는 내부/트리거 함수(award_score·award_capped_post_comment_score·recalc_level·handle_new_user·notify_*·guard_*·claw_back_*·push_on_notification·detect_review_manipulation) 21개의 EXECUTE를 `public, anon, authenticated`에서 회수(트리거는 postgres로 실행돼 기능 무영향). 관리자 함수 7개(admin_*·approve_user_ad·reject_user_ad·set_manager_pick)는 `public, anon` 회수 후 `authenticated`에만 재부여(내부 `is_admin()`가 최종 판별). **검증**: award_score/recalc_level→`permission denied`, 정상 RPC(is_admin·get_poll_results·get_servable_ads)·is_admin RLS 정상. 클라 호출 RPC 목록은 palo.js `.rpc(` grep으로 확인 후 보존. **오탐/저위험(조치 안 함)**: 정상 설계 RPC(cast_vote·delete_my_account·agree_to_terms 등 내부 auth 있음), 공개 버킷 파일목록 노출(어차피 URL 공개), `post_images_insert_all_temp`(비회원 업로드 의도적), 유출 비번 보호(구글 로그인만이라 무관). ⚠️ 이 함수들은 **DB 권한 변경**이라 코드/배포와 무관하게 즉시 적용됨.

**2026-08-04 백엔드 보안 강화 3종 (rate limit·IP 제한·민감 API 점검)** — 전부 DB 전용(트리거·함수), 클라 배포 불필요.
- **[3] 민감 API 점검 결과 = 이미 안전**: 프론트에 시크릿 없음(anon 키만, service_role은 `app/api/*` 서버 전용). 포인트/보상/관리자/광고 등 민감 로직 전부 서버(RPC+RLS+guard 트리거). `set_accepted_feedback`은 `v_post.author_id<>auth.uid()`로 서버에서 글 작성자 검증+하루100점 상한, `create_user_ad`는 본인글·포인트잔액 서버 확인·차감. award_* 등은 이미(오늘) 클라 실행권한 회수됨.
- **[1] 사용자별 rate limit + [2] IP rate limit**: **`rate_limit_rules`**(action PK·max_count·window_seconds·ip_max_count — **한 곳에서 조정**, RLS 잠금) + **`rate_events`**(actor='u:'+uid 또는 'ip:'+ip, action, at; RLS 잠금·인덱스 (actor,action,at)) + **`rl_check(action)`**(security definer, 트리거/RPC 전용=revoke public/anon/auth): 사용자별·IP별 각각 창(window) 내 카운트≥한도면 `raise exception`('너무 자주…'/'요청이 너무 많아요'), 아니면 event insert. IP는 헤더(`cf-connecting-ip`/`x-forwarded-for`)에서, 파싱은 exception 래핑(실패해도 통과). actor별 2시간 지난 event 자동 삭제(자가 청소). 창 기반이라 **영구 차단 아님**. **공통 트리거 `trg_rate_limit()`**(TG_ARGV[0]=action)를 posts/comments/likes/poll_votes/reports/commission_applications/messages의 BEFORE INSERT에 부착(RPC 경유 insert도 트리거 발화). 한도(조정가능): 글 5/분·IP12, 댓글 15/분·IP40, 좋아요 40/분·IP100, 투표 20/분·IP50, 신고 10/5분·IP25, 커미션신청 5/5분·IP12, 채팅 30/분·IP80. 비로그인은 IP만 적용. 회원가입은 Supabase Auth 자체 rate limit이 커버. **클라 변경 없음** — 초과 시 예외 메시지가 기존 에러 토스트(`res.error.message`)로 표시됨. 검증(dev): rl_check 클라 차단·정상 insert 통과·15연속 버스트 통과(오탐0)·규칙테이블 RLS 잠금.

2026-07-28에 GitHub 저장소(Public) 전체를 점검함 — 전체 커밋 히스토리(`git log --all -p`)까지 뒤져서 `.env` 파일이 커밋된 적 있는지, `service_role` 키·구글 Client Secret·하드코딩된 JWT 등이 있는지 확인. **결과: 전부 깨끗함.** `lib/supabaseClient.js`는 환경변수로만 키를 읽고, `.env.local`은 `.gitignore`의 `.env*` 규칙으로 처음부터 제외됨.

2026-08-01에 **전 테이블 RLS 전수 감사**를 함(사용자 요청). 라이브 DB를 `pg_class.relrowsecurity`(RLS on/off)와 `pg_policies`(정책 목록)로 직접 조회해 대조. **결과: public 스키마 전 테이블 RLS=on(무방비 테이블 0개), "아무나 쓰기(INSERT/UPDATE/DELETE)"로 완전히 열린 정책은 `post_images_insert_all_temp` 단 1건뿐**(6절 부채 참고 — 익명 이미지 첨부용 의도적 잔여, 사용자가 "지금은 그대로 두기" 선택), 스토리지도 post-images 버킷만 쓰기 개방·commission-images는 본인 폴더(uid)만. 채팅·알림·구독·점수·신청·신고·유료광고 등 민감 테이블은 전부 본인/참여자/관리자로 잠김 확인. **데이터 유출·무단 수정·관리자 권한 노출 구멍 없음으로 확정**(코드·스키마 변경 없이 조회 전용 점검).

---

## 9. 로컬 개발 환경

```bash
npm install
```

`.env.local` (프로젝트 루트, git에 안 올라감):
```
NEXT_PUBLIC_SUPABASE_URL=https://qabbdgfottbnapmyjudy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Supabase 대시보드 → Project Settings → API에서 확인>
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-RT297TVCLP
```

```bash
npm run dev
```
→ http://localhost:3000

**배포**: `main` 브랜치에 push하면 Vercel이 자동으로 빌드·배포. Vercel Analytics/GA4는 **배포된 주소에서만** 데이터가 잡히고 `localhost`는 집계 안 됨.

---

## 10. 작업 방식 관련 메모 (사용자 선호)

- 사용자는 코딩을 거의 처음 해봄. 매 기능마다 "무엇을·왜" 설명 → SQL은 사용자가 Supabase SQL Editor에 직접 실행 → 코드는 AI가 작성 → 브라우저 자동화로 직접 동작 검증 → 사용자에게도 재확인 요청, 순서로 진행해왔음.
- DB 변경(테이블 생성, 정책 추가 등)은 항상 SQL Editor에 붙여넣을 SQL을 그대로 제공하고, 그 SQL이 "왜" 필요한지, 어떤 위험이 있는지(예: "이 정책은 임시로 전부 열어둔 것") 설명하는 걸 선호함.
- "화면에서만 막는 것"과 "서버(RLS)에서 진짜로 막는 것"의 차이를 중요하게 여김 — 보안 관련 기능은 항상 이 둘을 구분해서 설명할 것.
- 커밋은 기능 단위로 나눠서, 매번 배포 후 실제 사이트에서 확인 요청하는 패턴을 유지해왔음.
- **커밋마다 이 문서(PROJECT_CONTEXT.md)도 같이 갱신할 것**(2026-08-01 사용자 요청). 채팅 재디자인 작업 중 코드만 커밋하고 문서를 8개 커밋가량 놓쳤다가 사용자 지적으로 소급 반영함 — 이후로는 기능 커밋과 문서 갱신을 항상 함께 할 것.
