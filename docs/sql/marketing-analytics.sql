-- ============================================================
-- SNS 광고 성과 측정 (캠페인별 유입 → 행동 → 전환)
-- Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 실행하세요.
-- 여러 번 실행해도 안전합니다.
--
-- ⚠️ 기존 `ad_campaigns`(사이트 안에서 파는 배너 광고)와는 **완전히 다른 것**입니다.
--    헷갈리지 않게 이 기능은 전부 `mkt_` 접두사를 씁니다.
--
-- 어떻게 붙는가
--   1. 광고 링크에 캠페인 코드를 달아 씁니다 →  https://commi.kr/?c=tw0808
--   2. 처음 들어온 사람에게 방문자 번호를 하나 발급해 브라우저에 저장하고,
--      **첫 유입 캠페인**을 그 사람에게 고정합니다(first-touch).
--      나중에 검색으로 다시 들어와도 그 사람의 성과는 처음 데려온 광고의 몫입니다.
--   3. 이후 그 사람이 하는 행동(글 열람·좋아요·댓글·작성·가입…)이 전부 그 캠페인에 쌓입니다.
--
-- 개인정보
--   · 방문자 번호는 무작위값이고 이름·IP를 담지 않습니다.
--   · IP는 서버가 도배를 막는 데만 잠깐 쓰고 저장하지 않습니다.
--   · 로그인한 뒤의 행동에는 회원 번호가 붙습니다(가입 전환을 세려면 필요).
--   ⚠️ 이용자 행동을 기록하므로 **개인정보처리방침에 한 줄 추가**하시는 걸 권합니다.
-- ============================================================

-- ── 1. 캠페인 ──────────────────────────────────────────────
create table if not exists public.mkt_campaigns (
  code         text primary key,          -- 링크에 붙일 짧은 코드 (?c=tw0808)
  name         text not null,             -- 사람이 읽는 이름 ("8월 트위터 런칭")
  channel      text,                      -- 트위터 / 인스타 / 유튜브 …
  landing_path text default '/',          -- 이 광고가 보내는 페이지
  spend        integer not null default 0,-- 집행 광고비(원) — 가입 1명당 비용 계산에 씀
  note         text,
  active       boolean not null default true,
  created_at   timestamptz not null default now()
);
alter table public.mkt_campaigns enable row level security;

drop policy if exists "캠페인 관리자 조회" on public.mkt_campaigns;
create policy "캠페인 관리자 조회" on public.mkt_campaigns
  for select using (public.is_admin());
drop policy if exists "캠페인 관리자 편집" on public.mkt_campaigns;
create policy "캠페인 관리자 편집" on public.mkt_campaigns
  for all using (public.is_admin()) with check (public.is_admin());


-- ── 2. 행동 기록 ───────────────────────────────────────────
-- ⚠️ insert 정책을 두지 않습니다 = 브라우저에서 직접 못 넣습니다.
--    /api/track 서버 라우트(service_role)만 기록할 수 있어, 남이 통계를 조작할 수 없습니다.
create table if not exists public.mkt_events (
  id            bigserial primary key,
  visitor_id    uuid not null,            -- 브라우저에 저장되는 무작위 번호(사람 식별 아님)
  campaign_code text,                     -- null이면 자연 유입(직접·검색)
  user_id       uuid,                     -- 로그인 상태면 회원 번호
  name          text not null,            -- view / post_view / click / like / comment / write / signup …
  label         text,                     -- 버튼 이름 등 부가 정보
  path          text,
  created_at    timestamptz not null default now()
);
alter table public.mkt_events enable row level security;

drop policy if exists "행동기록 관리자 조회" on public.mkt_events;
create policy "행동기록 관리자 조회" on public.mkt_events
  for select using (public.is_admin());

create index if not exists mkt_events_campaign_time on public.mkt_events(campaign_code, created_at desc);
create index if not exists mkt_events_visitor       on public.mkt_events(visitor_id);
create index if not exists mkt_events_name_time     on public.mkt_events(name, created_at desc);


-- ── 3. 캠페인별 성과 ───────────────────────────────────────
-- 캠페인 한 줄 = 그 광고로 들어온 사람들의 유입·행동·전환 전부.
-- 비율의 분모는 **그 캠페인 방문자 수**입니다(예: 좋아요율 = 좋아요 누른 사람 ÷ 방문자).
-- 자연 유입(직접·검색)도 한 줄로 같이 나와 비교 기준이 됩니다.
create or replace function public.get_campaign_stats(
  p_from timestamptz default null,
  p_to   timestamptz default null
) returns table (
  code text, name text, channel text, spend integer, active boolean,
  visitors bigint, pageviews bigint,
  post_viewers bigint, cm_viewers bigint,
  likers bigint, commenters bigint, writers bigint,
  bookmarkers bigint, appliers bigint,
  signups bigint, logins bigint,
  repeat_visitors bigint,
  first_at timestamptz, last_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  with ev as (
    select coalesce(e.campaign_code, '(자연유입)') as code, e.*
      from public.mkt_events e
     where (p_from is null or e.created_at >= p_from)
       and (p_to   is null or e.created_at <  p_to)
  ),
  agg as (
    select code,
      count(distinct visitor_id)                                        as visitors,
      count(*) filter (where name = 'view')                             as pageviews,
      count(distinct visitor_id) filter (where name = 'post_view')      as post_viewers,
      count(distinct visitor_id) filter (where name = 'commission_view')as cm_viewers,
      count(distinct visitor_id) filter (where name = 'like')           as likers,
      count(distinct visitor_id) filter (where name = 'comment')        as commenters,
      count(distinct visitor_id) filter (where name = 'write')          as writers,
      count(distinct visitor_id) filter (where name = 'bookmark')       as bookmarkers,
      count(distinct visitor_id) filter (where name = 'commission_apply') as appliers,
      count(distinct visitor_id) filter (where name = 'signup')         as signups,
      count(distinct visitor_id) filter (where name = 'login')          as logins,
      min(created_at) as first_at, max(created_at) as last_at
    from ev group by code
  ),
  -- 이틀 이상 방문한 사람 = 한 번 보고 마는 게 아니라 붙잡힌 사람
  rep as (
    select code, count(*) as repeat_visitors from (
      select code, visitor_id
        from ev group by code, visitor_id
       having count(distinct date_trunc('day', created_at)) > 1
    ) t group by code
  )
  select
    coalesce(c.code, a.code)                                as code,
    coalesce(c.name, '직접·검색 유입')                       as name,
    c.channel, coalesce(c.spend, 0), coalesce(c.active, true),
    coalesce(a.visitors,0), coalesce(a.pageviews,0),
    coalesce(a.post_viewers,0), coalesce(a.cm_viewers,0),
    coalesce(a.likers,0), coalesce(a.commenters,0), coalesce(a.writers,0),
    coalesce(a.bookmarkers,0), coalesce(a.appliers,0),
    coalesce(a.signups,0), coalesce(a.logins,0),
    coalesce(r.repeat_visitors,0),
    a.first_at, a.last_at
  from agg a
  full outer join public.mkt_campaigns c on c.code = a.code
  left join rep r on r.code = a.code
  where public.is_admin()
  order by coalesce(a.visitors,0) desc, coalesce(c.created_at, now()) desc;
$$;


-- ── 4. 캠페인별 버튼 클릭 내역 ─────────────────────────────
-- "어떤 버튼을 몇 번 눌렀나". p_code에 '(자연유입)'을 넣으면 자연 유입분을 봅니다.
create or replace function public.get_campaign_clicks(
  p_code text,
  p_from timestamptz default null,
  p_to   timestamptz default null
) returns table (label text, clicks bigint, people bigint)
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(e.label,'(이름 없음)') as label,
         count(*) as clicks,
         count(distinct e.visitor_id) as people
    from public.mkt_events e
   where e.name = 'click'
     and coalesce(e.campaign_code,'(자연유입)') = p_code
     and (p_from is null or e.created_at >= p_from)
     and (p_to   is null or e.created_at <  p_to)
     and public.is_admin()
   group by 1
   order by clicks desc
   limit 50;
$$;


-- ── 5. 캠페인별 날짜 추이 ──────────────────────────────────
create or replace function public.get_campaign_daily(
  p_code text,
  p_days integer default 30
) returns table (day date, visitors bigint, signups bigint)
language sql
stable
security definer
set search_path = public
as $$
  select date_trunc('day', e.created_at)::date as day,
         count(distinct e.visitor_id) as visitors,
         count(distinct e.visitor_id) filter (where e.name='signup') as signups
    from public.mkt_events e
   where coalesce(e.campaign_code,'(자연유입)') = p_code
     and e.created_at >= now() - (p_days || ' days')::interval
     and public.is_admin()
   group by 1 order by 1;
$$;


-- ── 6. 오래된 기록 정리 ────────────────────────────────────
-- 행동 기록은 계속 쌓이므로 가끔 오래된 것을 지웁니다(기본 180일).
-- 필요할 때 SQL Editor에서 직접 실행하세요:  select public.purge_mkt_events(180);
create or replace function public.purge_mkt_events(p_days integer default 180)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare n integer;
begin
  if not public.is_admin() then return -1; end if;
  delete from public.mkt_events
   where created_at < now() - (p_days || ' days')::interval;
  get diagnostics n = row_count;
  return n;
end;
$$;


-- ── 7. 실행 권한 ───────────────────────────────────────────
revoke all on function public.get_campaign_stats(timestamptz, timestamptz)      from public;
revoke all on function public.get_campaign_clicks(text, timestamptz, timestamptz) from public;
revoke all on function public.get_campaign_daily(text, integer)                 from public;
revoke all on function public.purge_mkt_events(integer)                         from public;

grant execute on function public.get_campaign_stats(timestamptz, timestamptz)      to authenticated;
grant execute on function public.get_campaign_clicks(text, timestamptz, timestamptz) to authenticated;
grant execute on function public.get_campaign_daily(text, integer)                 to authenticated;
grant execute on function public.purge_mkt_events(integer)                         to authenticated;
