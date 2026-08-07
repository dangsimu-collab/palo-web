-- ============================================================
-- 광고 성과 — 표시 오류 수정 (2026-08-08)
-- Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 실행하세요.
-- 여러 번 실행해도 안전합니다.
--
-- 무엇이 잘못됐나
--   `coalesce(c.name, '직접·검색 유입')` 때문에, **캠페인으로 등록되지 않은 코드**가
--   전부 "직접·검색 유입"이라는 이름을 물려받았습니다.
--   그래서 같은 이름의 줄이 두 개, 세 개씩 나타나 숫자가 오락가락하는 것처럼 보였습니다.
--
--   '직접·검색 유입'은 **코드가 아예 없는 경우**(자연 유입)만이어야 합니다.
--   등록 안 된 코드는 "미등록 캠페인"으로 따로 보여야 오타 난 광고 링크도 잡아낼 수 있습니다.
-- ============================================================

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
  rep as (
    select code, count(*) as repeat_visitors from (
      select code, visitor_id
        from ev group by code, visitor_id
       having count(distinct date_trunc('day', created_at)) > 1
    ) t group by code
  )
  select
    coalesce(c.code, a.code) as code,
    -- ★ 수정된 부분: 코드가 없을 때만 '직접·검색 유입'.
    --   등록 안 된 코드는 '미등록 캠페인'으로 구분해, 오타 난 광고 링크를 바로 알아볼 수 있게 한다.
    coalesce(
      c.name,
      case when coalesce(c.code, a.code) = '(자연유입)' then '직접·검색 유입'
           else '미등록 캠페인' end
    ) as name,
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
  -- ⚠️ 마지막에 code를 넣어 순서를 고정한다. 없으면 방문자 수가 같은 줄끼리
  --    새로고침할 때마다 자리가 바뀌어 "숫자가 불안정하다"고 느끼게 된다.
  order by coalesce(a.visitors,0) desc, coalesce(c.created_at, now()) desc, coalesce(c.code, a.code);
$$;

revoke all  on function public.get_campaign_stats(timestamptz, timestamptz) from public;
grant execute on function public.get_campaign_stats(timestamptz, timestamptz) to authenticated;


-- ── 테스트로 넣었던 가짜 기록 정리 ─────────────────────────
-- 개발 중 동작을 확인하려고 넣은 것들입니다. 실제 통계에 섞이면 안 됩니다.
-- (여러 번 실행해도 안전합니다)
delete from public.mkt_events
 where campaign_code in ('selftest','deploycheck','encodingtest');
