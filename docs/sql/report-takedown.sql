-- ============================================================
-- 신고·삭제(임시조치) 체계 — DB 설정
-- Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 실행하세요.
-- 여러 번 실행해도 안전합니다.
--
-- 근거: 정보통신망법 제44조의2(정보의 삭제요청 등) — 권리침해 신고를 받으면
--       지체 없이 삭제하거나 **임시조치(30일 이내 블라인드)** 를 해야 한다.
-- ============================================================

-- ── 1. 신고에 유형 추가 ────────────────────────────────────
-- 지금까지는 자유 서술(reason)만 받아서, 긴급 사안과 단순 불만이 섞여 들어왔다.
-- 유형을 받으면 긴급 건을 자동으로 먼저 가리고 관리자 화면에서 우선 정렬할 수 있다.
alter table public.reports
  add column if not exists category text;

create index if not exists reports_category_time
  on public.reports(category, created_at desc) where resolved = false;


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


-- ── 5. 긴급 신고 자동 임시조치 ─────────────────────────────
-- 불법촬영물·아동성착취물은 "검토 후 처리"로는 늦다. 신고가 들어오는 즉시 노출을 멈추고,
-- 관리자가 확인한 뒤 삭제하거나 되돌린다.
--
-- 악용(경쟁자 글을 긴급 신고로 가려버리기) 방지: 한 사람이 24시간에 3건까지만
-- 자동 블라인드를 유발할 수 있다. 그 이상은 신고로만 접수되고 자동 조치는 안 걸린다.
create or replace function public.auto_blind_on_urgent_report()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  recent_count int;
begin
  if new.category not in ('illegal_filming', 'csam') or new.post_id is null then
    return new;
  end if;

  select count(*) into recent_count
  from public.reports
  where reporter_id = new.reporter_id
    and category in ('illegal_filming', 'csam')
    and created_at > now() - interval '24 hours'
    and id <> new.id;

  if recent_count >= 3 then
    return new; -- 신고는 접수하되 자동 조치는 걸지 않음(관리자가 직접 판단)
  end if;

  update public.posts
     set blinded = true,
         blinded_at = now(),
         blind_reason = '긴급 신고 자동 임시조치 (' || new.category || ')'
   where id = new.post_id
     and blinded = false;

  return new;
end;
$$;

drop trigger if exists auto_blind_on_urgent_report_trg on public.reports;
create trigger auto_blind_on_urgent_report_trg
  after insert on public.reports
  for each row execute function public.auto_blind_on_urgent_report();


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
