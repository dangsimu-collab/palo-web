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

---

## 4. 데이터베이스 스키마 (Supabase PostgreSQL)

**주의**: 아래는 세션 중 직접 실행한 SQL을 기반으로 재구성한 것이며, DB를 직접 조회해 검증한 것은 아님(anon 키로는 `pg_policies` 같은 시스템 카탈로그 조회 불가). 실제로 뭔가 다르게 동작한다면 Supabase 대시보드의 **Database → Tables / Policies**에서 직접 확인하는 게 가장 정확함.

Supabase 프로젝트: https://qabbdgfottbnapmyjudy.supabase.co

### 테이블 목록과 컬럼

| 테이블 | 주요 컬럼 | 비고 |
|---|---|---|
| `profiles` | `id`(uuid, PK, = auth.users.id), `nickname`(text), `level`(text), `is_admin`(bool), `is_banned`(bool), `created_at` | `auth.users`에 새 유저 생기면 트리거로 자동 생성 |
| `posts` | `id`(bigint PK), `author_id`(uuid, nullable), `board`(text), `category`(text, 말머리), `title`, `content`, `stage`(text, 러프/선화/채색/완성), `views`(int), `created_at` | |
| `comments` | `id`(bigint PK), `post_id`(FK→posts), `author_id`(uuid, nullable), `content`, `parent_id`(FK→comments, 대댓글용, **UI 미구현**), `created_at` | |
| `likes` | `user_id`(uuid — 로그인 시 실제 계정, 비로그인 시 `palo_anon_id`), `post_id`(FK→posts), `created_at` | PK가 `(user_id, post_id)` 복합키 — 중복 방지의 핵심 |
| `post_images` | `id`(bigint PK), `post_id`(FK→posts), `url`(text, Storage 공개 URL), `sort`(int) | |
| `reports` | `id`(bigint PK), `post_id`(FK→posts), `reporter_id`(uuid, nullable), `reason`(text, nullable), `resolved`(bool), `created_at` | 관리자 전용 조회 |
| `notices` | `id`(bigint PK), `title`(text), `content`(text, **HTML** — 굵게 서식 지원), `created_at` | 공개 읽기, 관리자만 쓰기 |
| `conversations` | `id`(bigint PK), `user1_id`(uuid), `user2_id`(uuid), `last_message_at`(timestamptz), `created_at` | 1:1 채팅방 1개 = row 1개. 두 참여자를 어느 순서로 넣었는지 정해져 있지 않아서 조회할 땐 항상 `.or()`로 양방향 매칭 (아래 참고) |
| `messages` | `id`(bigint PK), `conversation_id`(FK→conversations), `sender_id`(uuid), `content`(text), `is_read`(bool, default false), `created_at` | |

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
- insert: `reports_insert_all_temp` — 누구나 (신고 접수는 익명 허용이 맞음)
- select/update: `reports_select_admin` / `reports_update_admin` — `is_admin()`만

**`notices`:**
- select: 누구나
- insert/delete: `notices_insert_admin` / `notices_delete_admin` — `is_admin()`만

**`conversations`:**
- select/insert: `conversations_participant` — `auth.uid() = user1_id or auth.uid() = user2_id`인 사람만 (자기가 참여한 방만 보이고 만들 수 있음)
- update: 없음 — `last_message_at` 갱신은 클라이언트에서 직접 update문으로 호출하는데, 이건 `conversations_participant`의 insert/select 정책만으로는 안 되므로 실제로는 **update 정책도 참여자 조건으로 동일하게 걸려있음**(select와 동일 조건)

**`messages`:**
- select: `messages_select_participant` — 자신이 속한 대화(`conversation_id`)의 메시지만, `conversations` 테이블을 서브쿼리로 조인해서 참여자인지 확인
- insert: `messages_insert_participant` — `auth.uid() = sender_id`이고 본인이 그 대화의 참여자일 때만
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

**Realtime**: `messages` 테이블은 Supabase Realtime의 `postgres_changes`(INSERT/UPDATE) 이벤트로 상대 메시지 실시간 수신·읽음 표시 갱신에 쓰임. 아래 SQL로 퍼블리케이션에 등록되어 있어야 함(안 하면 구독해도 이벤트가 안 옴):
```sql
alter publication supabase_realtime add table public.messages;
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
5. **신고 처리** — 신고 목록 조회, 글 삭제 처리/무시, 신고된 글 제목 클릭 시 상세로 이동

### 부가 기능
- **글 수정** — 글쓰기 모달을 재사용(`editingPostId`로 새 글/수정 모드 구분), 이미지도 교체 가능
- **고유 URL 라우팅**:
  - `/post/[id]` — SSR 메타데이터(title/description/OG) + 실제 화면은 `PaloApp` 재사용. 목록/상세 이동 시 `history.pushState`로 URL 동기화, `popstate`로 뒤로가기 지원. "공유" 버튼이 실제 URL을 클립보드에 복사
  - `/user/[id]` — 공개 프로필(닉네임·등급·통계·쓴 글 목록). "내 정보"(사적인 대시보드)와는 별개 기능. 글 목록/상세/댓글의 작성자 이름이 전부 클릭 가능(있는 경우만, 익명 제외)
- **방문자 분석**: Vercel Web Analytics + GA4 — 둘 다 각자의 대시보드에서만 확인 가능(무료 플랜은 데이터를 꺼내오는 API가 없어서 `/admin`에 통합 불가, 6절 참고)
- **닉네임 규칙**: 한글/영문/숫자 2~12자, 중복 불가 (DB 제약 + 클라이언트 검증)
- **UI 일관성**: 브라우저 기본 `alert()`/`confirm()`/`prompt()`를 전부 사이트 디자인에 맞는 커스텀 모달로 교체(신고, 삭제 확인, 공지 팝업 등)
- **이미지 없는 글의 썸네일 칸 숨김**: 글 작성 시 이미지를 첨부하지 않았으면 목록/상세에서 빈 이미지 칸이 안 보이게 처리(`post_images`가 비어있으면 관련 마크업 자체를 렌더 안 함).

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

---

## 6. 알려진 이슈 · 남은 보안 부채 · 의도적으로 미룬 것

**경미한 보안 부채:**
- `post_images_insert_all_temp` / `images_bucket_insert_all_temp` — 누구나 이미지 업로드 가능(파일 크기 제한 없음). 아직 안 좁혀짐 — 업로드 남용(스팸/용량) 우려가 있으면 본인 글에 첨부할 때만 허용하도록 손볼 필요 있음.

**설계상 알려진 한계 (버그 아님):**
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
