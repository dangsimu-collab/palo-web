-- ============================================================
-- 이모티콘 3차 — 실제 사용 집계 + 인기 점수
-- emoticons.sql → emoticons-2.sql 을 실행한 뒤에 이 파일을 실행하세요.
-- 여러 번 실행해도 안전합니다.
--
-- 기존 인기순은 '누적 담은 수'뿐이라 문제가 있었다.
--   · 먼저 올라온 팩이 계속 1등 (신규가 못 올라옴)
--   · 담아만 두고 안 쓰는 팩이 상위 (실제 인기와 다름)
-- 그래서 **실제로 쓰인 횟수**를 모으고, 최근 활동에 무게를 실어 점수를 낸다.
-- ============================================================

-- ── 1. 사용 기록 ───────────────────────────────────────────
-- 누가 썼는지는 남기지 않는다(집계에 필요 없고, 남기면 개인정보가 된다).
create table if not exists public.emoticon_uses (
  id           bigserial primary key,
  pack_id      bigint not null references public.emoticon_packs on delete cascade,
  emoticon_id  bigint,
  used_at      timestamptz not null default now()
);
alter table public.emoticon_uses enable row level security;

create index if not exists emoticon_uses_pack_time on public.emoticon_uses(pack_id, used_at desc);
create index if not exists emoticon_uses_time on public.emoticon_uses(used_at desc);

-- 집계를 보여주려면 읽기는 열어야 한다. 쓰기 정책은 두지 않아 **트리거만** 기록할 수 있다.
drop policy if exists "사용 기록 조회" on public.emoticon_uses;
create policy "사용 기록 조회" on public.emoticon_uses for select using (true);

alter table public.emoticon_packs
  add column if not exists use_count int not null default 0;


-- ── 2. 댓글이 올라오면 사용 횟수를 센다 ────────────────────
-- ⚠️ 클라이언트가 "썼다"고 알려주는 방식이면 마음대로 올릴 수 있다.
--    그래서 **댓글이 저장될 때 DB가 본문을 읽어** 직접 센다.
-- 한 댓글에 같은 이모티콘을 도배해도 1회로만 센다(distinct).
create or replace function public.log_emoticon_uses()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  eid bigint;
  pid bigint;
begin
  perform set_config('app.counter_bump', '1', true); -- 아래 보호 트리거 통과용
  for eid in
    select distinct (m[1])::bigint
      from regexp_matches(coalesce(new.content, ''), '\[\[e:(\d+)\]\]', 'g') as m
  loop
    select pack_id into pid from public.emoticons where id = eid;
    if pid is not null then
      insert into public.emoticon_uses(pack_id, emoticon_id) values (pid, eid);
      update public.emoticon_packs set use_count = use_count + 1 where id = pid;
    end if;
  end loop;
  perform set_config('app.counter_bump', '', true);
  return null;
end;
$$;

drop trigger if exists log_emoticon_uses_trg on public.comments;
create trigger log_emoticon_uses_trg
  after insert on public.comments
  for each row execute function public.log_emoticon_uses();


-- use_count도 직접 못 바꾸게 막는다(2차의 보호 트리거를 확장).
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
     and coalesce(current_setting('app.counter_bump', true), '') <> '1'
     and (new.saved_count is distinct from old.saved_count
       or new.use_count   is distinct from old.use_count) then
    raise exception '담은 수·사용 수는 직접 변경할 수 없습니다';
  end if;
  return new;
end;
$$;


-- ── 3. 인기 점수 ───────────────────────────────────────────
-- 네 가지를 섞는다. 값의 자릿수가 서로 달라 그대로 더하면 큰 값이 다 먹으므로
-- 전부 ln(1+x)로 눌러서 비교 가능하게 만든 뒤 가중치를 준다.
--
--   최근 7일 사용   40%  ← 지금 실제로 쓰이는가 (가장 중요)
--   최근 30일 담김  30%  ← 최근에 반응이 오는가
--   누적 사용       20%  ← 꾸준히 쓰였는가
--   누적 담김       10%  ← 기본 인지도
--
-- 최근 지표에 70%를 준 이유: 누적만 보면 먼저 올라온 팩이 영원히 1등이라
-- 새 이모티콘이 노출될 자리가 없다.
-- 여기에 갓 올라온 팩이 데이터가 없어 묻히지 않도록 2주에 걸쳐 사라지는 신규 보정을 얹는다.
create or replace view public.emoticon_pack_rank as
select
  p.id, p.author_id, p.title, p.cover_url, p.status, p.created_at,
  p.saved_count, p.use_count,
  coalesce(rs.recent_saves, 0) as recent_saves,
  coalesce(ru.recent_uses, 0)  as recent_uses,
  round((
      40 * ln(1 + coalesce(ru.recent_uses, 0))
    + 30 * ln(1 + coalesce(rs.recent_saves, 0))
    + 20 * ln(1 + p.use_count)
    + 10 * ln(1 + p.saved_count)
    + 12 * exp(-extract(epoch from (now() - p.created_at)) / 604800.0) -- 신규 보정(반감 약 1주)
  )::numeric, 3) as score
from public.emoticon_packs p
left join (
  select pack_id, count(*) as recent_saves
    from public.user_emoticon_packs
   where added_at > now() - interval '30 days'
   group by pack_id
) rs on rs.pack_id = p.id
left join (
  select pack_id, count(*) as recent_uses
    from public.emoticon_uses
   where used_at > now() - interval '7 days'
   group by pack_id
) ru on ru.pack_id = p.id
where p.status = 'public';

-- 뷰도 호출자 권한으로 동작하게 해서 아래 테이블들의 RLS가 그대로 적용되게 한다.
alter view public.emoticon_pack_rank set (security_invoker = true);

grant select on public.emoticon_pack_rank to anon, authenticated;


-- ── 4. 이미 쌓인 댓글의 사용 기록 채우기 ───────────────────
-- 트리거는 앞으로 올라오는 댓글부터 센다. 지금까지 쓰인 것도 한 번 반영한다.
-- (이미 기록이 있으면 중복으로 넣지 않도록 비우고 다시 만든다)
delete from public.emoticon_uses;

insert into public.emoticon_uses(pack_id, emoticon_id, used_at)
select e.pack_id, e.id, c.created_at
  from public.comments c
  cross join lateral (
    select distinct (m[1])::bigint as eid
      from regexp_matches(coalesce(c.content, ''), '\[\[e:(\d+)\]\]', 'g') as m
  ) t
  join public.emoticons e on e.id = t.eid;

update public.emoticon_packs p
   set use_count = coalesce((select count(*) from public.emoticon_uses u where u.pack_id = p.id), 0);
