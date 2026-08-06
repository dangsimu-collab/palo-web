-- ============================================================
-- 성인 게시판 본인확인(연령 확인) — DB 설정
-- Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 실행하세요.
-- 여러 번 실행해도 안전합니다(if not exists / or replace).
-- ============================================================

-- ── 1. profiles에 인증 상태 컬럼 추가 ──────────────────────
-- 개인정보를 최소로만 남긴다: 이름·생년월일·휴대폰번호·원본 CI는 저장하지 않는다.
-- adult_ci_hash 는 원본 CI가 아니라 서버 전용 키로 해시한 값(한 사람이 여러 계정으로
-- 인증받는 것을 막는 용도로만 쓰이고, 유출돼도 개인을 특정할 수 없다).
alter table public.profiles
  add column if not exists adult_verified    boolean not null default false,
  add column if not exists adult_verified_at timestamptz,
  add column if not exists adult_ci_hash     text;

-- 같은 사람(CI)이 계정을 여러 개 만들어 성인 인증을 돌려쓰는 것 차단
create unique index if not exists profiles_adult_ci_hash_uniq
  on public.profiles(adult_ci_hash) where adult_ci_hash is not null;


-- ── 2. ⚠️ 사용자가 스스로 인증 완료로 바꾸는 것 차단 ────────
-- profiles는 "본인 행 수정 가능" 정책이 있어서, 그대로 두면 브라우저에서
--   supabase.from('profiles').update({adult_verified:true})
-- 한 줄로 인증을 통과할 수 있다. 이 트리거가 그 경로를 막는다.
-- service_role(서버 라우트)과 SQL Editor에서만 값 변경이 허용된다.
create or replace function public.protect_adult_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  claims text := current_setting('request.jwt.claims', true);
begin
  -- claims가 null이면 직접 DB 접속(SQL Editor 등) → 관리자이므로 허용
  if claims is not null
     and coalesce((claims::json ->> 'role'), '') <> 'service_role' then
    if new.adult_verified    is distinct from old.adult_verified
    or new.adult_verified_at is distinct from old.adult_verified_at
    or new.adult_ci_hash     is distinct from old.adult_ci_hash then
      raise exception '성인 인증 정보는 직접 변경할 수 없습니다';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_adult_fields_trg on public.profiles;
create trigger protect_adult_fields_trg
  before update on public.profiles
  for each row execute function public.protect_adult_fields();


-- ── 3. 판별용 헬퍼 함수 ────────────────────────────────────
-- security definer로 만들어 profiles의 RLS에 걸리지 않게 한다.
create or replace function public.is_adult_verified()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select adult_verified from public.profiles where id = auth.uid()), false);
$$;

-- 특정 글이 성인 게시판 글인지. posts의 RLS를 우회해야 정확히 판단할 수 있으므로
-- (미인증자에겐 성인글이 안 보여서 일반 서브쿼리로는 "성인글이 아님"으로 잘못 판정된다)
-- 이 함수도 security definer로 만든다.
create or replace function public.post_is_adult(p_id bigint)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select board = 'adult' from public.posts where id = p_id), false);
$$;


-- ── 4. RLS: 성인 게시판 접근 제한 ──────────────────────────
-- ⚠️ 반드시 restrictive 여야 한다. 기본값인 permissive로 만들면 기존 정책과 OR로
--    합쳐져서 접근이 오히려 넓어진다. restrictive는 AND로 합쳐진다.

-- 읽기: 인증한 사람만 성인글을 볼 수 있다
drop policy if exists "성인 게시판 읽기 제한" on public.posts;
create policy "성인 게시판 읽기 제한" on public.posts
  as restrictive for select
  using (board <> 'adult' or public.is_adult_verified());

-- 쓰기: 인증하지 않았으면 성인 게시판에 글을 쓸 수 없다
drop policy if exists "성인 게시판 쓰기 제한" on public.posts;
create policy "성인 게시판 쓰기 제한" on public.posts
  as restrictive for insert
  with check (board <> 'adult' or public.is_adult_verified());

-- 성인글의 댓글도 같이 가린다
drop policy if exists "성인글 댓글 읽기 제한" on public.comments;
create policy "성인글 댓글 읽기 제한" on public.comments
  as restrictive for select
  using (not public.post_is_adult(post_id) or public.is_adult_verified());

drop policy if exists "성인글 댓글 쓰기 제한" on public.comments;
create policy "성인글 댓글 쓰기 제한" on public.comments
  as restrictive for insert
  with check (not public.post_is_adult(post_id) or public.is_adult_verified());

-- 성인글 이미지도 가린다
drop policy if exists "성인글 이미지 제한" on public.post_images;
create policy "성인글 이미지 제한" on public.post_images
  as restrictive for select
  using (not public.post_is_adult(post_id) or public.is_adult_verified());


-- ── 5. 인증 시도 기록(감사용) ──────────────────────────────
-- 정책을 만들지 않아 service_role 전용이 된다(브라우저에서 접근 불가).
create table if not exists public.adult_verify_log (
  id          bigserial primary key,
  user_id     uuid references auth.users on delete set null,
  result      text not null,   -- ok / underage / duplicate / failed
  ip          text,
  created_at  timestamptz not null default now()
);
alter table public.adult_verify_log enable row level security;

create index if not exists adult_verify_log_user_time
  on public.adult_verify_log(user_id, created_at desc);
create index if not exists adult_verify_log_ip_time
  on public.adult_verify_log(ip, created_at desc);
