-- ============================================================
-- 신고·삭제(임시조치) 체계 — DB 설정
-- Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 실행하세요.
-- 여러 번 실행해도 안전합니다.
--
-- 근거: 정보통신망법 제44조의2(정보의 삭제요청 등) — 권리침해 신고를 받으면
--       지체 없이 삭제하거나 **임시조치(30일 이내 블라인드)** 를 해야 한다.
-- ============================================================

-- ── 1. 신고 유형 컬럼은 쓰지 않는다 ────────────────────────
-- 한때 신고 유형을 미리 정해 고르게 했으나, 목록에 없는 문제가 '기타'로 뭉뚱그려지고
-- 정작 필요한 맥락이 빠져서 **신고자가 직접 서술하는 방식으로 되돌렸다.**
-- (예전 버전을 실행해 category 컬럼이 생겼더라도 그냥 두면 된다. 아무 영향 없다.)


-- ── 2. 글 임시조치(블라인드) ───────────────────────────────
-- 삭제와 다르다: 글은 남아 있고 작성자와 관리자만 볼 수 있다.
-- 판단이 끝나기 전에 노출만 멈추는 조치라, 오신고였을 때 되돌릴 수 있다.
alter table public.posts
  add column if not exists blinded      boolean not null default false,
  add column if not exists blinded_at   timestamptz,
  add column if not exists blind_reason text;

create index if not exists posts_blinded on public.posts(blinded) where blinded = true;


-- ── 3. 헬퍼 함수 ───────────────────────────────────────────
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;


-- ── 4. RLS: 블라인드된 글 가리기 ───────────────────────────
-- ⚠️ restrictive 여야 한다(permissive면 기존 정책과 OR로 합쳐져 오히려 열린다).
-- 작성자 본인과 관리자에게는 계속 보인다 — 작성자가 "왜 안 보이지"만 겪고
-- 이유를 모르는 상황을 막기 위해서다(이의신청의 전제).
drop policy if exists "블라인드 글 숨김" on public.posts;
create policy "블라인드 글 숨김" on public.posts
  as restrictive for select
  using (
    blinded is not true
    or author_id = auth.uid()
    or public.is_admin()
  );

-- 블라인드 상태는 관리자만 바꿀 수 있다(작성자가 스스로 풀 수 없게)
create or replace function public.protect_blind_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  claims text := current_setting('request.jwt.claims', true);
begin
  if claims is not null
     and coalesce((claims::json ->> 'role'), '') <> 'service_role'
     and not public.is_admin() then
    if new.blinded      is distinct from old.blinded
    or new.blinded_at   is distinct from old.blinded_at
    or new.blind_reason is distinct from old.blind_reason then
      raise exception '블라인드 상태는 운영자만 변경할 수 있습니다';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_blind_fields_trg on public.posts;
create trigger protect_blind_fields_trg
  before update on public.posts
  for each row execute function public.protect_blind_fields();


-- ── 5. 자동 임시조치는 두지 않는다 ─────────────────────────
-- 한때 긴급 유형(불법촬영물·아동성착취물) 신고가 들어오면 자동으로 글을 가리는 트리거를
-- 뒀지만 **제거했다.**
--
-- 이유: 신고 한 번으로 남의 글을 즉시 내릴 수 있으면 그 자체가 공격 수단이 된다.
--       신고자당 횟수를 제한해도, 계정을 나눠 쓰면 특정 작가의 글을 계속 가려버릴 수 있다.
--       잘못 가려진 글의 피해가 잠깐 노출되는 위험보다 크다고 판단.
--
-- 대신 긴급 유형은 **관리자 화면에서 맨 위로 정렬**되어 가장 먼저 눈에 띄고,
-- 관리자가 [임시 가림] 버튼으로 직접 조치한다. 사람이 한 번은 보고 판단하는 구조.
--
-- 아래 두 줄은 예전 버전을 실행했던 경우를 되돌리기 위한 것이다(없으면 그냥 넘어간다).
drop trigger if exists auto_blind_on_urgent_report_trg on public.reports;
drop function if exists public.auto_blind_on_urgent_report();


-- ── 6. 처리 이력 ───────────────────────────────────────────
-- 누가·언제·왜 조치했는지 남긴다. 이의신청이 들어오거나 분쟁이 생겼을 때 근거가 된다.
-- 정책을 만들지 않아 service_role 전용이지만, 관리자 조회용 정책만 따로 추가한다.
create table if not exists public.moderation_log (
  id          bigserial primary key,
  post_id     bigint,
  report_id   bigint,
  actor_id    uuid references auth.users on delete set null,
  action      text not null,   -- blind / unblind / delete / dismiss
  note        text,
  created_at  timestamptz not null default now()
);
alter table public.moderation_log enable row level security;

drop policy if exists "운영자만 조회" on public.moderation_log;
create policy "운영자만 조회" on public.moderation_log
  for select using (public.is_admin());

drop policy if exists "운영자만 기록" on public.moderation_log;
create policy "운영자만 기록" on public.moderation_log
  for insert with check (public.is_admin());

create index if not exists moderation_log_time on public.moderation_log(created_at desc);
