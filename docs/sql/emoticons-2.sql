-- ============================================================
-- 이모티콘 2차 — 신고 · 랭킹 · 검색
-- emoticons.sql 을 먼저 실행한 뒤에 이 파일을 실행하세요.
-- 여러 번 실행해도 안전합니다.
-- ============================================================

-- ── 1. 이모티콘 신고 ───────────────────────────────────────
-- 기존 신고함(reports)을 그대로 쓰고 대상만 늘린다.
alter table public.reports
  add column if not exists emoticon_pack_id bigint references public.emoticon_packs on delete cascade;

create index if not exists reports_emoticon on public.reports(emoticon_pack_id) where resolved = false;


-- ── 2. 담은 수(랭킹용) ─────────────────────────────────────
-- 랭킹을 매길 때마다 세면 느리므로 팩에 숫자를 들고 있는다.
alter table public.emoticon_packs
  add column if not exists saved_count int not null default 0;

create index if not exists emoticon_packs_rank
  on public.emoticon_packs(saved_count desc, created_at desc) where status = 'public';

-- 담기/빼기에 맞춰 자동으로 오르내린다.
-- ⚠️ 클라이언트가 직접 세서 넣으면 조작할 수 있으므로 DB가 계산한다.
-- `app.counter_bump` 표시를 켜고 고친다 — 아래 보호 트리거가 이걸 보고 통과시킨다.
-- (security definer라도 요청자의 JWT 정보는 그대로라, 표시가 없으면 보호 트리거에 막힌다)
create or replace function public.bump_pack_saved_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform set_config('app.counter_bump', '1', true); -- true = 이 트랜잭션 안에서만
  if TG_OP = 'INSERT' then
    update public.emoticon_packs set saved_count = saved_count + 1 where id = new.pack_id;
  elsif TG_OP = 'DELETE' then
    update public.emoticon_packs set saved_count = greatest(saved_count - 1, 0) where id = old.pack_id;
  end if;
  perform set_config('app.counter_bump', '', true);
  return null;
end;
$$;

drop trigger if exists bump_pack_saved_count_trg on public.user_emoticon_packs;
create trigger bump_pack_saved_count_trg
  after insert or delete on public.user_emoticon_packs
  for each row execute function public.bump_pack_saved_count();

-- 이미 담겨 있던 것들 숫자 맞추기(여러 번 실행해도 결과는 같다)
update public.emoticon_packs p
   set saved_count = coalesce((select count(*) from public.user_emoticon_packs u where u.pack_id = p.id), 0);


-- ⚠️ saved_count는 트리거만 건드려야 한다. 작성자가 올려서 순위를 조작하지 못하게 막는다.
create or replace function public.protect_pack_counters()
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
     and coalesce(current_setting('app.counter_bump', true), '') <> '1'  -- 트리거가 고치는 중이면 통과
     and new.saved_count is distinct from old.saved_count then
    raise exception '담은 수는 직접 변경할 수 없습니다';
  end if;
  return new;
end;
$$;

drop trigger if exists protect_pack_counters_trg on public.emoticon_packs;
create trigger protect_pack_counters_trg
  before update on public.emoticon_packs
  for each row execute function public.protect_pack_counters();


-- ── 3. 제목 검색 ───────────────────────────────────────────
-- 한글은 형태소 분석이 없어 like 검색이 현실적이다. 대소문자 무시 부분일치용 인덱스.
create extension if not exists pg_trgm;
create index if not exists emoticon_packs_title_trgm
  on public.emoticon_packs using gin (title gin_trgm_ops);
