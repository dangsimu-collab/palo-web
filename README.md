# Palo

그림 그리는 사람들을 위한 커뮤니티. 네이버 카페 "커미션 월드 우타나라"(약 1만 명)를 이전하는 프로젝트로, 창작 이야기·크리틱(피드백) 중심이고 커미션 거래는 부차적인 기능이다.

디자인·화면 프로토타입은 정적 HTML(`Palo_최종본.html`)로 먼저 완성했고, 이 저장소는 그 화면에 Supabase 기반 실제 데이터 저장·로그인을 붙여 서비스로 만든 것이다. 전체 개발 계획은 `2_프로젝트_설계.md`에 있다. (두 파일 모두 이 저장소에는 포함되어 있지 않고, 로컬의 `palo/` 상위 폴더에 참고용으로 보관 중 — 이 저장소 자체는 `palo/web/` 폴더 내용만 담고 있음)

- **배포 주소:** https://palo-web-nu.vercel.app
- **GitHub:** https://github.com/dangsimu-collab/palo-web
- **Supabase 프로젝트:** https://qabbdgfottbnapmyjudy.supabase.co

## 기술 스택

- **프론트엔드:** Next.js 16 (App Router, JavaScript, React 19). 단, 화면 자체는 React 컴포넌트로 새로 짠 게 아니라 기존 프로토타입의 HTML/CSS/vanilla JS를 그대로 이식한 것 — 아래 [구조](#폴더-구조와-작동-방식) 참고.
- **백엔드:** Supabase (`@supabase/supabase-js` v2)
  - Database (PostgreSQL) — 글/댓글/회원/좋아요/이미지 저장
  - Auth — 구글 로그인 (소셜 로그인, 선택 사항)
  - Storage — 이미지 업로드 (`post-images` 버킷)
- **배포:** Vercel + GitHub (main 브랜치에 push하면 자동 배포)

> ⚠️ `AGENTS.md`에 적힌 것처럼 이 Next.js 버전(16)은 최신 major 버전이라 AI 어시스턴트의 학습 데이터와 API가 다를 수 있다. 코드를 크게 바꾸기 전에 `node_modules/next/dist/docs/`의 실제 문서를 확인할 것.

## 폴더 구조와 작동 방식

이 프로젝트는 "일반적인 Next.js/React 앱"이 아니라, 기존 vanilla JS 프로토타입을 최소한의 변경으로 Next.js 위에 얹은 구조다. 화면 렌더링은 대부분 `public/palo.js`가 `innerHTML`을 직접 조작하는 방식으로 이뤄진다 (React state가 아님).

```
app/
  layout.js       루트 레이아웃, <html lang="ko">, 메타데이터
  page.js         홈페이지 — PaloApp을 렌더링만 함
  PaloApp.js      클라이언트 컴포넌트. body-html.js의 정적 HTML을 
                  dangerouslySetInnerHTML로 꽂아넣고, public/palo.js를
                  <Script strategy="afterInteractive">로 로드.
                  Supabase 클라이언트를 window.supabase에 노출시킴.
  body-html.js    원본 프로토타입의 <body> 내용을 그대로 옮긴 HTML 문자열
                  (헤더, 게시판 목록, 글쓰기 에디터, 각종 모달 등 정적 마크업)
  globals.css     원본 프로토타입의 <style> 전체를 그대로 옮김

public/
  palo.js         핵심 로직. 게시판 렌더링(renderList, openPost 등),
                  Supabase 연동(loadRealPosts, submitPost, addComment,
                  toggleLike, 로그인/로그아웃), 이미지 업로드까지 전부 여기 있음.
                  최초 로드 시 초기 데이터로 하드코딩된 fake 게시글(POSTS 배열)이
                  있고, loadRealPosts()가 Supabase의 진짜 글을 그 앞에 이어붙인다.

lib/
  supabaseClient.js   Supabase 클라이언트 생성 (환경변수 사용)

.env.local        Supabase URL/키 (git에는 올라가지 않음, 로컬 전용)
```

새 기능을 추가할 때 대부분의 로직은 `public/palo.js` 한 파일 안에서 함수를 찾아 수정하면 된다. React 컴포넌트를 새로 만드는 방식이 아니라는 점이 일반적인 Next.js 프로젝트와 다르다.

## 데이터베이스 (Supabase)

아래 표가 만들어져 있고, 전부 RLS(Row Level Security)가 켜져 있다.

| 표 | 용도 |
|---|---|
| `profiles` | 로그인한 사람의 닉네임/등급. `auth.users`에 새 사용자가 생기면 트리거로 자동 생성됨 |
| `posts` | 글 (게시판, 제목, 본문, 조회수 등) |
| `comments` | 댓글 (대댓글은 `parent_id`로 연결, 현재 UI에서는 미사용) |
| `likes` | 좋아요. `(user_id, post_id)` 복합 기본키로 중복 방지. 비로그인 사용자는 `localStorage`의 `palo_anon_id`를 `user_id` 대신 사용 |
| `post_images` | 글에 첨부된 이미지 URL 목록 (`post-images` Storage 버킷에 업로드된 파일) |

**⚠️ 알려진 보안 부채 (단계 8에서 처리 예정):** 개발을 단계별로 빠르게 진행하기 위해 아래 정책들이 "로그인 여부와 무관하게 전부 허용"으로 임시 설정되어 있다.

| 정책 | 현재 상태 | 위험도 |
|---|---|---|
| `posts_update_all_temp` | 누구나 아무 글이나 수정 가능 | **높음** — 가장 먼저 고쳐야 함 (본인 글만 가능하도록) |
| `posts_insert_all_temp` | 누구나 글 작성 가능 | 중간 (스팸 우려, 의도된 기능이기도 함 — 비로그인 글쓰기 허용은 사용자가 요청한 사양) |
| `comments_insert_all_temp` | 누구나 댓글 작성 가능 | 중간 (스팸 우려) |
| `post_images_insert_all_temp` / `images_bucket_insert_all_temp` | 누구나 `post-images` 버킷에 파일 업로드 가능 | 중간 — 파일 크기 제한도 아직 없어서 저장 공간 남용 우려 |
| `likes_insert_own_or_anon` / `likes_delete_own_or_anon` | 로그인 사용자는 본인 것만, 비로그인은 전부 허용 | 낮음 (의도된 설계 — 익명 좋아요 지원용) |

그리고 **글/댓글을 지우는 기능 자체가 아직 없다** (삭제 정책도 없음) — 스팸이 들어와도 관리자가 못 지우는 상태.

## 완성된 기능 (개발 단계 1~7)

- [x] **1. 화면 이식** — 기존 프로토타입 디자인을 Next.js 위로 이전
- [x] **2. 글 저장** — 글쓰기 → `posts` 테이블에 실제 저장
- [x] **3. 목록/상세 불러오기** — Supabase에서 글 목록·상세·조회수를 실제로 불러옴
- [x] **4. 로그인** — 구글 로그인(Supabase Auth) 연동. 로그인은 선택 사항이며, 로그인하지 않아도 글쓰기는 가능 (원래 설계 문서는 "로그인 필수"였으나 사용자 요청으로 변경)
- [x] **5. 댓글·좋아요** — 실제 저장 및 새로고침 후에도 유지. 좋아요는 비로그인 사용자도 브라우저 단위로 저장됨
- [x] **6. 이미지 업로드** — Supabase Storage에 업로드, 목록/상세에 실제 이미지 표시
- [x] **7. 배포** — GitHub + Vercel로 자동 배포

**아직 안 한 것 (단계 8, 진행 중):**
- RLS 보안 강화 (본인 글만 수정/삭제 가능하도록)
- 관리자 기능 (신고 처리, 글 삭제)
- 이용약관 · 개인정보처리방침 · 청소년보호 정책
- 커스텀 도메인 (선택)
- 알림함 · 팔로우 · 챌린지 자동 집계 등 부가 기능

## 로컬 개발 환경 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 만들고 아래 값을 채운다 (Supabase 대시보드 → Project Settings → API에서 확인 가능):

```
NEXT_PUBLIC_SUPABASE_URL=https://qabbdgfottbnapmyjudy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public 키>
```

이 파일은 git에 올라가지 않으므로(`.gitignore`), Vercel에 배포할 때는 Vercel 프로젝트 설정의 Environment Variables에 동일하게 등록해야 한다.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속.

### 4. 배포

`main` 브랜치에 push하면 Vercel이 자동으로 빌드·배포한다.

```bash
git add -A
git commit -m "설명"
git push
```

## 외부 서비스 설정 메모

- **Google OAuth:** Google Cloud Console에 OAuth 클라이언트가 등록되어 있고, 승인된 리디렉션 URI는 Supabase의 콜백 주소(`https://qabbdgfottbnapmyjudy.supabase.co/auth/v1/callback`) 하나뿐이다. 로그인 후 우리 앱으로 돌아오는 주소는 Supabase의 **Authentication → URL Configuration → Redirect URLs**에서 관리한다 (현재 `localhost:3000`과 배포 주소 둘 다 등록됨).
- **Storage 버킷:** `post-images` (Public). 업로드는 `storage.objects`에 대한 RLS 정책으로 허용되어 있음 (버킷 이름 기준).
