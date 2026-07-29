# Palo — 프로젝트 전체 컨텍스트

> 이 파일 하나만 Claude Code(또는 다른 AI 코딩 도구)에 붙여넣으면, 이 프로젝트를 처음 보는 세션도 바로 이어서 개발할 수 있도록 작성한 문서입니다. `README.md`보다 훨씬 상세하며, 지금까지의 개발 이력·설계 이유·알려진 이슈까지 전부 담았습니다.
>
> **작성 시점: 2026-07-29 (컨텍스트 윈도우 한도로 새 세션으로 넘어가기 직전 최종 갱신).** 이 문서는 그 시점의 스냅샷입니다 — 실제 코드가 더 최신 진실이니, 이 문서와 코드가 다르면 코드를 믿으세요.
>
> **비밀번호/시크릿 없음:** 이 문서에는 실제 비밀번호·API 시크릿 키가 전혀 없습니다(의도적). 계정 로그인은 항상 사용자 본인이 직접 했고, AI는 계정 비밀번호를 받은 적이 없습니다. 구글 OAuth Client Secret 같은 민감한 값은 Supabase 대시보드에만 입력했고 어떤 파일에도 저장하지 않았습니다 — 필요하면 사용자에게 다시 요청하거나 Google Cloud Console에서 재발급받으세요. Supabase anon 키처럼 "공개돼도 되는" 값은 로컬 `.env.local`(git 제외됨)과 Vercel 환경변수에 있으니 필요하면 그걸 직접 읽으세요.

---

## 1. 프로젝트가 뭔가

**Palo**는 그림 그리는 사람들을 위한 커뮤니티 웹사이트. 네이버 카페 "커미션 월드 우타나라"(회원 약 1만 명)를 이전하기 위한 프로젝트로, 창작 이야기·크리틱(피드백) 중심이고 커미션 거래는 부차적 기능.

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
DB 테이블이 아니라 **클라이언트 하드코딩 배열**(`var BOARDS=[...]`) — 게시판 추가/이름 변경/순서 변경은 전부 이 배열과, 카테고리 태그 표시용 `CATMAP`(짧은 라벨) 두 곳을 코드로 수정해야 함(관리자 화면에서 조정 불가). `posts.board`는 이 배열의 `id` 값을 그대로 저장하는 자유 텍스트 컬럼(FK 제약 없음).

| 그룹 | id | 화면 이름 | 비고 |
|---|---|---|---|
| 이야기 | `all` | 전체 글 | 실제 게시판 아님(집계 뷰) |
| 이야기 | `talk` | 수다 광장 | |
| 이야기 | `ask` | 물어보기 | |
| 그리는 중 | `wip` | 작업 과정 | |
| 그리는 중 | `crit` | 피드백 해주세요 | 2026-07-29 개명(원래 "봐주세요"). 등급 시스템의 "도움돼요 +20점" 규칙이 이 게시판(`board='crit'`)에만 적용됨(5절 참고) |
| 그리는 중 | `sketch` | 그림공부 | 2026-07-29 개명(원래 "스케치북"). **글쓰기 화면에서 선택 불가**(`buildBoardMenu()`가 `id!=="sketch"`로 명시적으로 제외) — 이식 당시부터 있던 설계, 이번에 이름만 바꿨고 이 제약은 그대로 둠 |
| 함께 | `challenge` | 챌린지 | |
| 함께 | `tip` | 팁 · 강좌 | |
| 거래 | `trade` | 커미션 구인구직 | |
| 거래 | `review` | 커미션 후기 | 2026-07-29 신설 |
| 거래 | `used` | 중고 장비 | |
| 기타 | `adult` | 에치치 | 2026-07-29 신설. 아이콘은 SVG 대신 🔞 이모지 문자를 그대로 씀. **"전체 글" 목록과 홈 "이글이글" 위젯에서만 제외**(`filteredPosts()`/`emberHTML()`에서 `p.board!=="adult"` 필터) — 게시판을 직접 클릭해서 들어가면 누구나 그대로 볼 수 있음, 로그인/연령 확인 등 추가 접근 제한은 없음(요청받지 않아서 안 넣음, 필요하면 추가 가능) |

---

## 4. 데이터베이스 스키마 (Supabase PostgreSQL)

**주의**: 아래는 세션 중 직접 실행한 SQL을 기반으로 재구성한 것이며, DB를 직접 조회해 검증한 것은 아님(anon 키로는 `pg_policies` 같은 시스템 카탈로그 조회 불가). 실제로 뭔가 다르게 동작한다면 Supabase 대시보드의 **Database → Tables / Policies**에서 직접 확인하는 게 가장 정확함.

Supabase 프로젝트: https://qabbdgfottbnapmyjudy.supabase.co

### 테이블 목록과 컬럼

| 테이블 | 주요 컬럼 | 비고 |
|---|---|---|
| `profiles` | `id`(uuid, PK, = auth.users.id), `nickname`(text), `level`(**integer**, 2026-07-29부터 — 예전엔 text였음), `score`(int, 누적 점수), `last_score_date`/`daily_score_earned`(글/댓글 일일 20점 상한 계산용, 좋아요·도움돼요는 예외), `last_activity_at`(timestamptz, 1분 연속 작성 제한용), `is_admin`(bool), `is_banned`(bool), `created_at` | `auth.users`에 새 유저 생기면 트리거로 자동 생성 |
| `posts` | `id`(bigint PK), `author_id`(uuid, nullable), `board`(text), `category`(text, 말머리), `title`, `content`(text, 순수 텍스트 — 검색용), `content_html`(text, nullable, 2026-07-29 추가 — 서식·인라인 이미지/동영상 포함한 실제 렌더링용 HTML, DOMPurify로 살균 후 저장), `stage`(text, 러프/선화/채색/완성), `views`(int), `created_at` | |
| `comments` | `id`(bigint PK), `post_id`(FK→posts), `author_id`(uuid, nullable), `content`, `parent_id`(FK→comments, 대댓글용, **UI 미구현**), `created_at` | |
| `likes` | `user_id`(uuid — 로그인 시 실제 계정, 비로그인 시 `palo_anon_id`), `post_id`(FK→posts), `created_at` | PK가 `(user_id, post_id)` 복합키 — 중복 방지의 핵심 |
| `post_images` | `id`(bigint PK), `post_id`(FK→posts), `url`(text, Storage 공개 URL), `sort`(int) | |
| `reports` | `id`(bigint PK), `post_id`(FK→posts), `reporter_id`(uuid, nullable), `reason`(text, nullable), `resolved`(bool), `created_at` | 관리자 전용 조회 |
| `notices` | `id`(bigint PK), `title`(text), `content`(text, **HTML** — 굵게 서식 지원), `created_at` | 공개 읽기, 관리자만 쓰기 |
| `conversations` | `id`(bigint PK), `user1_id`(uuid), `user2_id`(uuid), `last_message_at`(timestamptz), `created_at` | 1:1 채팅방 1개 = row 1개. 두 참여자를 어느 순서로 넣었는지 정해져 있지 않아서 조회할 땐 항상 `.or()`로 양방향 매칭 (아래 참고) |
| `messages` | `id`(bigint PK), `conversation_id`(FK→conversations), `sender_id`(uuid), `content`(text), `is_read`(bool, default false), `created_at` | |
| `chat_admin_access_logs` | `id`(bigint PK), `admin_id`(uuid, FK→profiles), `conversation_id`(FK→conversations), `report_id`(FK→reports, nullable), `accessed_at` | 관리자가 채팅을 열람할 때마다 자동 기록. **update/delete 정책 없음(append-only)** — 아무도 못 고치고 못 지움, 감사 로그의 신뢰성 확보용 |
| `notifications` | `id`(bigint PK), `user_id`(uuid, FK→profiles, 알림 받는 사람), `type`(text: `chat`/`cm`/`like`), `icon`(text), `content`(text), `link_chat_user`(uuid, nullable), `link_conversation_id`(FK→conversations, nullable), `link_post_id`(FK→posts, nullable), `is_read`(bool), `created_at` | 실제 저장되는 알림함(2026-07-29 추가). **일반 유저는 insert 자체가 불가능** — 오직 DB 트리거(security definer)만 생성 가능 |
| `level_thresholds` | `level`(int PK, 1~8), `min_score`(int), `name`(text), `emoji`(text, 2026-07-29 추가) | 등급 기준표. **등급 이름/이모지/필요 점수를 바꾸려면 이 표만 수정하면 됨** — 코드 변경 불필요. insert/update/delete 정책 없음(관리자가 SQL Editor로만 직접 수정) |
| `comment_helpful` | `comment_id`(FK→comments), `user_id`(uuid, FK→profiles), `created_at` | PK가 `(comment_id,user_id)`. "도움돼요"를 실제로 저장하는 테이블(2026-07-29 추가 — 이전엔 완전히 가짜였음, 아래 "등급 시스템" 절 참고). **로그인 필수**(likes와 달리 익명 불가) |
| `score_log` | `id`(bigint PK), `user_id`(FK→profiles), `amount`(int, 실제 지급된 양), `event`(text), `source_table`/`source_id`(어느 글/댓글에 귀속되는지), `created_at` | 등급 시스템의 지급 내역(2026-07-29 추가) — 글/댓글 삭제 시 정확한 회수의 근거. select는 본인만, insert/update/delete는 트리거만 |
| `score_awarded_likes` | `user_id`, `post_id`(FK→posts) | PK가 `(user_id,post_id)`. "이 사람이 이 글로 추천 점수를 받은 적 있는지" 영구 기록(2026-07-29 추가, 좋아요 취소 후 재클릭 악용 방지) — RLS만 켜고 정책은 없음, 클라이언트 접근 완전 차단 |
| `score_awarded_helpful` | `user_id`, `comment_id`(FK→comments) | 위와 동일한 목적, 도움돼요용 |

### Storage 버킷
- `post-images` (Public) — 글 첨부 이미지. 업로드 경로는 `${Date.now()}-${파일명}` 형태(폴더 구분 없음).

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
- 컬럼: 원래 글 신고 전용(`post_id`)이었는데, **채팅 신고 기능 추가로 `conversation_id`(FK→conversations)와 `reported_user_id`(FK→profiles) 컬럼 추가**. `post_id`/`conversation_id` 중 정확히 하나만 채워지도록 체크 제약(`reports_target_check`)이 걸려있음.
- insert: `reports_insert_all_temp` — 글 신고는 누구나(익명 포함, 기존 그대로). 채팅 신고는 `reporter_id = auth.uid()`이고 `is_conversation_participant(conversation_id)`가 true일 때만(그 대화 참여자 본인만 신고 가능)
- select/update: `reports_select_admin` / `reports_update_admin` — `is_admin()`만
- **(2026-07-29, 이후 "신고된 대화만" → "전체 대화 열람"으로 확장됨. 아래 `conversations`/`messages` 절 참고)**

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

### 본문 서식 실제 저장 + 이미지/동영상 원하는 위치 배치 (2026-07-29 추가)
사용자가 "이미지가 항상 최상단에 올라가는데, 원하는 위치에 배치하고 싶다"고 요청 → 작업 중 **더 근본적인 기존 문제를 발견**: 글쓰기 에디터(`#wContent`, contentEditable)에서 굵게/기울임 등 서식을 넣어도 실제로 DB `posts.content`엔 순수 텍스트만 저장되고 있었음 — `submitPost()`가 `cEl.innerHTML`(서식 있는 버전)은 그 세션의 로컬 메모리(`np.html`/`ep.html`)에만 잠깐 담아뒀다가, DB엔 `cEl.textContent`(서식 없는 텍스트)만 보냈던 것. 그래서 서식은 **새로고침하면 항상 사라졌음**(아무도 몰랐던 이유: 그동안 작성자 본인이 새로고침 전까지만 보고 넘어갔을 가능성). 이번에 같이 고침:
- **`posts.content_html`(text, nullable) 컬럼 추가** — 서식 있는 실제 HTML을 여기 저장. `content`(순수 텍스트)는 검색·구버전 폴백용으로 계속 유지.
- **보안: dompurify 도입.** 이제 이 HTML이 모든 방문자에게 그대로 렌더링되므로(예전엔 저장 자체가 안 됐으니 위험이 없었음), **저장 시점과 렌더링 시점 둘 다** `sanitizePostHtml()`(`public/palo.js`)로 살균 — `<script>`, `onerror` 같은 위험 요소 제거 확인됨. 허용 태그: `b/strong/i/em/u/font/span/ul/ol/li/blockquote/br/div/p/img/video/source`, 허용 속성: `style/color/src/controls/alt`.
- **이미지/동영상 인라인 배치**: 툴바에 "동영상" 버튼 추가(`pickVideo()`/`onVideoFile()`, 이미지와 같은 `post-images` 스토리지 버킷 재사용). 파일 선택 전 커서 위치를 `saveEditorSelection()`으로 저장해뒀다가, 업로드 완료 후 `restoreEditorSelection()`으로 그 위치를 복원한 다음 `document.execCommand("insertHTML",...)`로 정확히 그 자리에 삽입(`insertInlineMedia()`). 기존 "이미지 업로드 → 항상 맨 위 갤러리" 방식(`post_images` 테이블, 목록 썸네일용으로는 계속 유지)과 별개로 동작.
- **기존 글과의 호환성**: `renderPostDetail()`에서 본문 HTML에 이미 `<img>`/`<video>`가 있으면(새 글 방식) 예전의 "상단 캔버스 블록"을 생략해서 중복 표시를 막고, 본문에 인라인 미디어가 없는 예전 글은 기존처럼 상단 캔버스 블록을 그대로 보여줌(하위 호환, 회귀 없음).
- **에디터 이미지 칩(`#edImages`) 제거 동기화**: 칩의 "×"를 누르면 `edState.images`뿐 아니라 본문에 삽입돼 있던 동일 URL의 `<img>`도 같이 제거되도록 `removeEdImage()` 수정(안 그러면 칩은 지웠는데 본문엔 이미지가 남아있는 불일치가 생김).

### 인기글 점수 공식 (사이트 "인기순" 정렬)
목록 화면의 "인기순" 탭과 관리자 통계의 인기 글/작성자 TOP 10이 공유하는 점수 계산식. `public/palo.js`의 `hotMultiplier()`/`hotScore()`/`sortHot()`과 `app/admin/page.js`의 동일 이름 함수(중복 구현, 관리자 쪽엔 7일 제외 로직만 없음)로 존재.

**공식**: `기본점수 = 조회수 × 0.02 + 좋아요 × 1 + 댓글 × 0.2`, 여기에 시간 배수를 곱함:
- 작성 후 24시간 이내: **×2**
- 24시간이 지날 때마다 배수에서 **0.2씩 차감**(예: 2일차 ×1.8, 3일차 ×1.6 ...)
- 작성 후 7일이 지나면 원칙적으로 인기글 노출에서 제외
- **단, 예외**: 7일 제외를 적용했을 때 인기글 노출 수가 10개 미만으로 떨어질 상황이면, 그 글의 배수를 "7일째 배수"로 고정한 채 유지 — 다음 인기글이 채워질 때까지 밀려나지 않음

### 1:1 채팅 (커미션 거래 상담용)
설계·구현을 2단계로 나눠서 진행: 1단계(저장만 되는 채팅) → 2단계(실시간 + 채팅 목록 + 읽음 표시).

- **DB**: `conversations`(방 1개=참여자 2명) + `messages`. RLS/RPC는 4절 참고(특히 `mark_messages_read` RPC로 좁힌 이유).
- **방 찾기/생성**: `findOrCreateConversation(otherUserId)` — `user1_id`/`user2_id` 어느 순서로 저장됐는지 모르니 `.or()`로 양방향 매칭 조회, 없으면 insert. 동시에 두 번 열렸을 때의 경쟁(race)도 재시도 처리.
- **실시간 수신**: `subscribeToChat(conversationId)` — Supabase Realtime `postgres_changes` 채널 구독. INSERT 이벤트로 상대가 보낸 새 메시지를 즉시 화면에 추가하고 자동으로 `mark_messages_read` 호출, UPDATE 이벤트로 "읽음" 표시 갱신.
- **채팅 목록(받은함)**: `openChatList()` — 내가 참여한 모든 대화를 `last_message_at` 최신순으로, 상대 닉네임·마지막 메시지 미리보기·안 읽은 개수(뱃지)와 함께 표시.
- **읽음 표시**: 내가 보낸 메시지 옆에 상대가 읽으면 "읽음" 텍스트가 뜸(`is_read` 컬럼 + realtime UPDATE 구독으로 실시간 반영).
- 채팅 UI 전용 CSS 클래스가 `app/globals.css`에 추가됨: `.chat-list`, `.chat-msg`, `.chat-bubble`, `.chat-inputrow`, `.chat-send`, `.chat-read-status`, `.chat-room-list`, `.chat-room-row`, `.chat-unread-badge`.
- **채팅 신고(2026-07-29 추가)**: 채팅방 헤더에 "🚩 신고" 버튼(`reportChat()`) — 기존 글 신고용 `#reportModal`을 그대로 재사용하고, `reportingConversationId`/`reportingReportedUserId` 전역 변수로 "지금 신고 중인 게 글인지 채팅인지" 구분(`submitReport()`가 분기 처리). DB/RLS는 4절 "reports" 항목과 "RLS 순환 참조 주의" 참고.
- **관리자 채팅 열람(2026-07-29 추가)**: "내 정보" 탭에 관리자 전용 버튼 두 개 — "🛡 신고 목록"(기존)과 "🛡 전체 채팅 목록"(신규, `openAdminChatList()`). 신고 목록에서든 전체 목록에서든 대화를 열면 공통 함수 `adminViewConversation(conversationId, reportId, backTo)`가 처리: 메시지 전체를 읽기 전용으로 보여주고(`renderAdminChatView()`, `닉네임: 내용` 형태), **열람할 때마다 `chat_admin_access_logs`에 자동으로 기록**(누가·언제·어느 대화를, 신고를 통해 열람했다면 어느 신고 건인지). `openAdminChatList(searchTerm)`은 닉네임으로 대화 상대를 검색할 수 있음(profiles를 `ilike` 검색 → 그 유저가 낀 대화만 필터링). RLS: `conversations_select_admin_all`/`messages_select_admin_all`(관리자는 전체 대화 조회 가능), 로그 테이블은 4절 "chat_admin_access_logs" 참고 — **관리자 본인도 로그를 고치거나 지울 수 없음**(update/delete 정책 없음).
- **이용약관/개인정보처리방침 문구**: 채팅 열람 기능에 대한 고지 조항 초안을 세션 대화 중에 작성해서 사용자에게 전달함(파일로 저장하지 않음) — 실제 약관/방침 페이지 자체는 아직 미구현(6절 "아직 안 한 것" 참고), 페이지를 만들 때 그 문구를 넣을 것.

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

---

## 6. 알려진 이슈 · 남은 보안 부채 · 의도적으로 미룬 것

**경미한 보안 부채:**
- `post_images_insert_all_temp` / `images_bucket_insert_all_temp` — 누구나 이미지 업로드 가능(파일 크기 제한 없음). 아직 안 좁혀짐 — 업로드 남용(스팸/용량) 우려가 있으면 본인 글에 첨부할 때만 허용하도록 손볼 필요 있음.

**설계상 알려진 한계 (버그 아님):**
- **관리자는 모든 이용자의 1:1 채팅을 열람할 수 있음(의도적 설계, 2026-07-29부터).** 신고 여부와 무관하게 `is_admin()`이면 어떤 대화든 볼 수 있음 — 사용자가 명시적으로 요청한 기능이고, 모든 열람은 `chat_admin_access_logs`에 수정·삭제 불가능하게 기록됨(감사 가능성으로 오남용 억제). 다만 "기술적으로 막는" 게 아니라 "기록으로 남겨 사후 확인 가능하게 하는" 방식이라는 점을 정확히 인지할 것 — 이용약관/개인정보처리방침에 이 내용을 고지하는 문구 초안은 있으나 실제 약관 페이지는 아직 없음(아래 "아직 안 한 것" 참고).
- 회원 차단(밴)은 **로그인 상태로 쓰는 것만** 막음. 로그아웃 후 익명 글쓰기까지는 못 막음 — "로그인 없이도 글쓰기 가능"이라는 설계와 근본적으로 상충하는 부분.
- Vercel Analytics / GA4 데이터를 `/admin` 페이지 안에 직접 그래프로 넣을 수 없음 — 둘 다 무료 플랜에서 데이터를 꺼내오는 공개 API가 없음(GA4는 Data API로 가능하나 서비스 계정+서버 라우트 필요, 훨씬 복잡함). 각자의 대시보드(Vercel Analytics 탭 / analytics.google.com)에서 확인.
- `/post/[id]`, `/user/[id]` 직접 접속 시, 실제 콘텐츠가 뜨기 전 아주 잠깐 정적 목록이 보이는 깜빡임이 있음(홈페이지도 원래 이런 구조 — 정적 HTML이 먼저 뜨고 JS가 나중에 실제 데이터로 교체). 사소해서 미해결.

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

2026-07-28에 GitHub 저장소(Public) 전체를 점검함 — 전체 커밋 히스토리(`git log --all -p`)까지 뒤져서 `.env` 파일이 커밋된 적 있는지, `service_role` 키·구글 Client Secret·하드코딩된 JWT 등이 있는지 확인. **결과: 전부 깨끗함.** `lib/supabaseClient.js`는 환경변수로만 키를 읽고, `.env.local`은 `.gitignore`의 `.env*` 규칙으로 처음부터 제외됨.

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
