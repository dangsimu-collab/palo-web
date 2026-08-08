-- ============================================================
--  친구 초대(레퍼럴) — 초대 · 보상 지급 · 집계
--
--  정한 것 (2026-08-08, 사용자 결정)
--  ─────────────────────────────────
--   · 보상: **등급 점수 + 광고 포인트 둘 다**
--   · 지급 시점: 가입 즉시가 아니라 **초대받은 사람이 실제로 활동했을 때**
--                (기본값: 글 1개 또는 댓글 3개)
--   · 대상: **양쪽 다** (초대한 사람에게 더 많이)
--
--  ⚠️ 광고 포인트는 실제로 배너 광고를 집행할 수 있는 값이다(최소 500P).
--     즉 **현금성 가치가 있으므로 가짜 계정으로 긁어가려는 시도가 반드시 생긴다.**
--     그래서 아래 방어를 겹쳐 뒀다:
--       ① 자기 자신 초대 불가
--       ② 한 사람은 평생 한 번만 초대받을 수 있다(invitee_id UNIQUE)
--       ③ 가입 후 24시간 안에만 초대 코드가 붙는다(오래된 계정을 나중에 끌어다 쓰지 못하게)
--       ④ 가입만으로는 0원 — 글/댓글을 실제로 써야 지급(가짜 계정 비용을 올린다)
--       ⑤ 초대한 사람과 같은 회선(IP 앞 3자리)에서 온 초대는 **보류**되어 관리자가 직접 승인
--       ⑥ 하루 한도 · 누적 한도(기본 3명/20명)를 넘으면 기록만 남고 보상은 없다
--       ⑦ 차단된 회원은 초대자도 피초대자도 될 수 없다
--       ⑧ 관리자가 언제든 지급을 회수할 수 있다
--
--  ⚠️ 점수·포인트 컬럼은 guard_profile_score_columns() 트리거로 잠겨 있다.
--     아래 지급 함수는 기존 방식과 똑같이 set_config('app.trusted_score_update','true',true)
--     신뢰 신호를 켠 뒤에 update 한다. 이 신호가 없으면 조용히 원래 값으로 되돌아간다.
--
--  실행: Supabase → SQL Editor 에 통째로 붙여넣고 Run. 여러 번 실행해도 안전하다.
-- ============================================================


-- ── 1. 설정표 (여기 값만 바꾸면 정책이 바뀐다. 코드 수정 불필요) ──
create table if not exists public.referral_rules (
  id                    integer primary key default 1,
  reward_inviter_score  integer not null default 20,   -- 초대한 사람 등급 점수
  reward_inviter_points integer not null default 150,  -- 초대한 사람 광고 포인트
  reward_invitee_score  integer not null default 10,   -- 초대받은 사람 등급 점수
  reward_invitee_points integer not null default 100,  -- 초대받은 사람 광고 포인트
  need_posts            integer not null default 1,    -- 자격: 글 몇 개
  need_comments         integer not null default 3,    -- 또는 댓글 몇 개
  daily_cap             integer not null default 3,    -- 한 사람이 하루에 보상받을 수 있는 초대 수
  total_cap             integer not null default 20,   -- 한 사람이 누적으로 보상받을 수 있는 초대 수
  hold_same_ip          boolean not null default true, -- 같은 회선이면 보류할지
  active                boolean not null default true, -- 기능 전체 on/off
  constraint referral_rules_one_row check (id = 1)
);
insert into public.referral_rules (id) values (1) on conflict (id) do nothing;

alter table public.referral_rules enable row level security;
-- 규칙은 누구나 읽을 수 있어야 한다(초대 화면에 "얼마 받는지" 보여줘야 하므로).
-- ⚠️ 쓰기 정책은 두지 않는다 = 관리자가 SQL Editor에서만 바꾼다.
drop policy if exists "초대규칙 조회" on public.referral_rules;
create policy "초대규칙 조회" on public.referral_rules for select using (true);


-- ── 2. 초대 코드 (profiles에 한 칸 추가) ───────────────────
alter table public.profiles add column if not exists referral_code text;
create unique index if not exists profiles_referral_code_uniq
  on public.profiles(referral_code) where referral_code is not null;

-- 헷갈리는 글자(I, L, O, 0, 1)를 뺀 7자리. 손으로 받아 적어도 틀리지 않게.
create or replace function public.gen_referral_code()
returns text language plpgsql security definer set search_path = public as $$
declare
  alphabet text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  v text; i integer;
begin
  loop
    v := '';
    for i in 1..7 loop
      v := v || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    end loop;
    exit when not exists (select 1 from public.profiles where referral_code = v);
  end loop;
  return v;
end $$;

-- 기존 회원 전원에게 코드 발급
update public.profiles set referral_code = public.gen_referral_code()
 where referral_code is null;

-- 앞으로 가입하는 사람에게 자동 발급
create or replace function public.trg_profile_referral_code()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.referral_code is null then
    new.referral_code := public.gen_referral_code();
  end if;
  return new;
end $$;
drop trigger if exists profiles_referral_code on public.profiles;
create trigger profiles_referral_code before insert on public.profiles
  for each row execute function public.trg_profile_referral_code();


-- ── 3. 초대 기록 ───────────────────────────────────────────
--  status 의미
--   pending  : 초대는 붙었지만 아직 활동 조건 미달
--   held     : 같은 회선에서 온 초대 — 관리자 승인 대기
--   rewarded : 지급 완료
--   capped   : 한도를 넘겨 보상 없이 기록만
--   revoked  : 관리자가 회수(지급 취소)
create table if not exists public.referrals (
  id             bigserial primary key,
  inviter_id     uuid not null references auth.users(id) on delete cascade,
  -- ⚠️ UNIQUE = 한 사람은 평생 한 번만 초대받을 수 있다. 가장 중요한 방어선.
  invitee_id     uuid not null unique references auth.users(id) on delete cascade,
  code           text not null,
  ip_prefix      text,            -- 가입 회선 앞 3자리(예: 121.130.5) — 원본 IP는 저장하지 않는다
  status         text not null default 'pending',
  qualified_at   timestamptz,     -- 활동 조건을 채운 시각
  rewarded_at    timestamptz,
  reward_score   integer,
  reward_points  integer,
  note           text,
  created_at     timestamptz not null default now(),
  constraint referrals_not_self check (inviter_id <> invitee_id)
);
create index if not exists referrals_inviter on public.referrals(inviter_id, created_at desc);
create index if not exists referrals_status  on public.referrals(status, created_at desc);

alter table public.referrals enable row level security;
-- 내가 초대한 목록, 내가 초대받은 기록만 볼 수 있다. 관리자는 전부.
drop policy if exists "초대기록 본인·관리자 조회" on public.referrals;
create policy "초대기록 본인·관리자 조회" on public.referrals
  for select using (
    inviter_id = auth.uid() or invitee_id = auth.uid() or public.is_admin()
  );
-- ⚠️ insert/update/delete 정책 없음 = 브라우저에서 직접 못 만든다.
--    아래 security definer 함수를 통해서만 생긴다(스스로 보상을 꽂아 넣지 못하게).


-- ── 4. 가입 회선 확인 ──────────────────────────────────────
-- PostgREST는 요청 헤더를 request.headers 설정으로 넘겨준다. 없을 수도 있으니 감싼다.
-- 원본 IP는 저장하지 않고 **앞 3자리만** 남긴다(같은 회선인지 판단하는 데는 충분하다).
create or replace function public.client_ip_prefix()
returns text language plpgsql stable security definer set search_path = public as $$
declare h json; ip text;
begin
  begin
    h := current_setting('request.headers', true)::json;
  exception when others then
    return null;
  end;
  if h is null then return null; end if;
  ip := coalesce(h ->> 'cf-connecting-ip', split_part(h ->> 'x-forwarded-for', ',', 1));
  ip := nullif(btrim(coalesce(ip, '')), '');
  if ip is null then return null; end if;
  -- IPv4면 앞 3옥텟, IPv6면 앞 4블록
  if position('.' in ip) > 0 then
    return split_part(ip,'.',1)||'.'||split_part(ip,'.',2)||'.'||split_part(ip,'.',3);
  end if;
  return split_part(ip,':',1)||':'||split_part(ip,':',2)||':'||split_part(ip,':',3)||':'||split_part(ip,':',4);
end $$;


-- ── 5. 초대 등록 (초대받은 사람이 가입 직후 호출) ──────────
-- 브라우저가 localStorage에 담아 둔 초대 코드를 로그인 직후 한 번 보낸다.
-- 로그인 수단(아이디/구글/네이버/X)에 상관없이 이 한 곳으로 모인다.
create or replace function public.register_referral(p_code text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_rules public.referral_rules;
  v_created timestamptz;
  v_inviter uuid;
  v_ipp text;
  v_status text := 'pending';
  v_note text;
begin
  select * into v_rules from public.referral_rules where id = 1;
  if not found or not v_rules.active then
    return jsonb_build_object('ok', false, 'reason', 'off');
  end if;
  if v_uid is null then
    return jsonb_build_object('ok', false, 'reason', 'login');
  end if;

  -- ③ 신규 가입자만. 오래 쓰던 계정에 나중에 코드를 붙여 보상을 만들지 못하게.
  select created_at into v_created from auth.users where id = v_uid;
  if v_created is null or v_created < now() - interval '24 hours' then
    return jsonb_build_object('ok', false, 'reason', 'too_late');
  end if;

  -- ② 한 번만
  if exists (select 1 from public.referrals where invitee_id = v_uid) then
    return jsonb_build_object('ok', false, 'reason', 'already');
  end if;

  select id into v_inviter from public.profiles
   where referral_code = upper(btrim(p_code));
  if v_inviter is null then
    return jsonb_build_object('ok', false, 'reason', 'bad_code');
  end if;
  -- ① 자기 자신
  if v_inviter = v_uid then
    return jsonb_build_object('ok', false, 'reason', 'self');
  end if;
  -- ⑦ 차단된 회원
  if exists (select 1 from public.profiles where id in (v_inviter, v_uid) and is_banned) then
    return jsonb_build_object('ok', false, 'reason', 'banned');
  end if;

  -- ⑤ 같은 회선이면 보류(가족·같은 학교일 수도 있으니 차단이 아니라 관리자 확인 대기)
  v_ipp := public.client_ip_prefix();
  if v_rules.hold_same_ip and v_ipp is not null and exists (
        select 1 from public.referrals r
         where r.inviter_id = v_inviter and r.ip_prefix = v_ipp
      ) then
    v_status := 'held';
    v_note := '같은 회선에서 온 초대 — 확인 필요';
  end if;

  insert into public.referrals (inviter_id, invitee_id, code, ip_prefix, status, note)
  values (v_inviter, v_uid, upper(btrim(p_code)), v_ipp, v_status, v_note);

  return jsonb_build_object('ok', true, 'status', v_status);
end $$;

revoke all on function public.register_referral(text) from public;
grant execute on function public.register_referral(text) to authenticated;


-- ── 6. 보상 지급 ───────────────────────────────────────────
-- ⚠️ 점수·포인트는 잠겨 있으므로 신뢰 신호를 켠 뒤에 update 한다.
--    등급은 기존 recalc_level()이 있으면 그걸 쓰고, 없으면 등급표로 직접 계산한다.
create or replace function public.referral_award(p_user uuid, p_score integer, p_points integer)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_user is null then return; end if;
  perform set_config('app.trusted_score_update', 'true', true);
  update public.profiles
     set score     = coalesce(score, 0) + coalesce(p_score, 0),
         ad_points = coalesce(ad_points, 0) + coalesce(p_points, 0)
   where id = p_user;
  begin
    perform public.recalc_level(p_user);
  exception when undefined_function then
    update public.profiles p
       set level = coalesce((select max(l.level) from public.level_thresholds l
                              where l.min_score <= coalesce(p.score,0)), 1)
     where p.id = p_user;
  end;
end $$;

-- 실제 지급 + 알림. 한도 검사도 여기서 한다.
create or replace function public.referral_grant(p_id bigint)
returns void language plpgsql security definer set search_path = public as $$
declare
  v_ref public.referrals;
  v_rules public.referral_rules;
  v_today integer;
  v_total integer;
  v_nick text;
begin
  select * into v_ref from public.referrals where id = p_id for update;
  if not found or v_ref.status = 'rewarded' then return; end if;
  select * into v_rules from public.referral_rules where id = 1;
  if not v_rules.active then return; end if;

  -- ⑥ 한도 — 넘으면 보상 없이 기록만 남긴다(집계에는 그대로 보인다)
  select count(*) into v_today from public.referrals
   where inviter_id = v_ref.inviter_id and status = 'rewarded'
     and rewarded_at >= date_trunc('day', now() at time zone 'Asia/Seoul') at time zone 'Asia/Seoul';
  select count(*) into v_total from public.referrals
   where inviter_id = v_ref.inviter_id and status = 'rewarded';
  if v_today >= v_rules.daily_cap or v_total >= v_rules.total_cap then
    update public.referrals
       set status = 'capped',
           note = case when v_today >= v_rules.daily_cap then '하루 한도 초과' else '누적 한도 초과' end
     where id = p_id;
    return;
  end if;

  perform public.referral_award(v_ref.inviter_id, v_rules.reward_inviter_score, v_rules.reward_inviter_points);
  perform public.referral_award(v_ref.invitee_id, v_rules.reward_invitee_score, v_rules.reward_invitee_points);

  update public.referrals
     set status = 'rewarded',
         rewarded_at = now(),
         reward_score = v_rules.reward_inviter_score,
         reward_points = v_rules.reward_inviter_points
   where id = p_id;

  -- 알림 (notifications는 직접 insert 정책이 없지만 이 함수는 security definer라 넣을 수 있다)
  select nickname into v_nick from public.profiles where id = v_ref.invitee_id;
  insert into public.notifications (user_id, type, icon, content)
  values (v_ref.inviter_id, 'referral', '🎁',
          coalesce(v_nick,'초대한 친구') || '님이 활동을 시작했어요! 점수 '
          || v_rules.reward_inviter_score || '점과 광고 포인트 '
          || v_rules.reward_inviter_points || 'P를 받았어요');
  insert into public.notifications (user_id, type, icon, content)
  values (v_ref.invitee_id, 'referral', '🎁',
          '친구 초대 보상으로 점수 ' || v_rules.reward_invitee_score
          || '점과 광고 포인트 ' || v_rules.reward_invitee_points || 'P를 받았어요');
end $$;


-- ── 7. 자격 판정 (글·댓글을 쓸 때마다 확인) ────────────────
create or replace function public.referral_try_qualify(p_user uuid)
returns void language plpgsql security definer set search_path = public as $$
declare
  v_ref public.referrals;
  v_rules public.referral_rules;
  v_posts integer;
  v_comments integer;
begin
  -- 가장 흔한 경우(초대 기록 없음)를 인덱스 한 번으로 즉시 빠져나간다
  select * into v_ref from public.referrals
   where invitee_id = p_user and status in ('pending','held');
  if not found then return; end if;

  select * into v_rules from public.referral_rules where id = 1;
  if not v_rules.active then return; end if;

  select count(*) into v_posts    from public.posts    where author_id = p_user and coalesce(blinded,false) = false;
  select count(*) into v_comments from public.comments where author_id = p_user;

  if v_posts < v_rules.need_posts and v_comments < v_rules.need_comments then
    return;   -- 아직 조건 미달
  end if;

  if v_ref.qualified_at is null then
    update public.referrals set qualified_at = now() where id = v_ref.id;
  end if;

  -- 보류 중인 건은 조건을 채워도 자동 지급하지 않는다. 관리자가 승인해야 한다.
  if v_ref.status = 'held' then return; end if;

  perform public.referral_grant(v_ref.id);
end $$;

-- ⚠️ 보상 로직에 무슨 문제가 생겨도 **글쓰기·댓글이 막히면 안 된다.**
--    그래서 예외를 통째로 삼키고 항상 통과시킨다.
create or replace function public.trg_referral_check()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  begin
    if new.author_id is not null then
      perform public.referral_try_qualify(new.author_id);
    end if;
  exception when others then
    null;
  end;
  return null;
end $$;

drop trigger if exists posts_referral_check on public.posts;
create trigger posts_referral_check after insert on public.posts
  for each row execute function public.trg_referral_check();

drop trigger if exists comments_referral_check on public.comments;
create trigger comments_referral_check after insert on public.comments
  for each row execute function public.trg_referral_check();


-- ── 8. 내 초대 현황 ────────────────────────────────────────
create or replace function public.my_referral_summary()
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_code text;
  v_rules public.referral_rules;
  v_list jsonb;
begin
  if v_uid is null then return jsonb_build_object('ok', false); end if;
  select referral_code into v_code from public.profiles where id = v_uid;
  if v_code is null then
    v_code := public.gen_referral_code();
    update public.profiles set referral_code = v_code where id = v_uid;
  end if;
  select * into v_rules from public.referral_rules where id = 1;

  -- 초대받은 사람의 닉네임은 보여주되, 이메일 같은 건 절대 내보내지 않는다
  select coalesce(jsonb_agg(x order by x->>'created_at' desc), '[]'::jsonb) into v_list
    from (
      select jsonb_build_object(
               'nick', coalesce(p.nickname, '(탈퇴한 회원)'),
               'status', r.status,
               'created_at', r.created_at,
               'rewarded_at', r.rewarded_at
             ) as x
        from public.referrals r
        left join public.profiles p on p.id = r.invitee_id
       where r.inviter_id = v_uid
    ) t;

  return jsonb_build_object(
    'ok', true,
    'code', v_code,
    'active', v_rules.active,
    'reward', jsonb_build_object(
      'inviter_score', v_rules.reward_inviter_score,
      'inviter_points', v_rules.reward_inviter_points,
      'invitee_score', v_rules.reward_invitee_score,
      'invitee_points', v_rules.reward_invitee_points,
      'need_posts', v_rules.need_posts,
      'need_comments', v_rules.need_comments,
      'daily_cap', v_rules.daily_cap,
      'total_cap', v_rules.total_cap
    ),
    'counts', jsonb_build_object(
      'total',    (select count(*) from public.referrals where inviter_id = v_uid),
      'rewarded', (select count(*) from public.referrals where inviter_id = v_uid and status = 'rewarded'),
      'pending',  (select count(*) from public.referrals where inviter_id = v_uid and status in ('pending','held'))
    ),
    'earned', jsonb_build_object(
      'score',  coalesce((select sum(reward_score)  from public.referrals where inviter_id = v_uid and status = 'rewarded'), 0),
      'points', coalesce((select sum(reward_points) from public.referrals where inviter_id = v_uid and status = 'rewarded'), 0)
    ),
    'list', v_list
  );
end $$;

revoke all on function public.my_referral_summary() from public;
grant execute on function public.my_referral_summary() to authenticated;


-- ── 9. 관리자: 집계 · 승인 · 회수 ──────────────────────────
create or replace function public.admin_referral_stats()
returns jsonb language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then return jsonb_build_object('ok', false); end if;
  return jsonb_build_object(
    'ok', true,
    'total',    (select count(*) from public.referrals),
    'rewarded', (select count(*) from public.referrals where status = 'rewarded'),
    'pending',  (select count(*) from public.referrals where status = 'pending'),
    'held',     (select count(*) from public.referrals where status = 'held'),
    'capped',   (select count(*) from public.referrals where status = 'capped'),
    'revoked',  (select count(*) from public.referrals where status = 'revoked'),
    'paid_score',  coalesce((select sum(reward_score)  from public.referrals where status='rewarded'),0),
    'paid_points', coalesce((select sum(reward_points) from public.referrals where status='rewarded'),0),
    -- 많이 초대한 사람 10명 (어뷰징은 대개 상위에 몰린다)
    'top', coalesce((
      select jsonb_agg(t) from (
        select coalesce(p.nickname,'(탈퇴)') as nick,
               count(*) as cnt,
               count(*) filter (where r.status='rewarded') as rewarded,
               count(*) filter (where r.status='held') as held
          from public.referrals r
          left join public.profiles p on p.id = r.inviter_id
         group by p.nickname
         order by count(*) desc
         limit 10
      ) t), '[]'::jsonb)
  );
end $$;

create or replace function public.admin_referral_list(p_status text default null, p_limit integer default 100)
returns jsonb language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then return '[]'::jsonb; end if;
  return coalesce((
    select jsonb_agg(t order by t->>'created_at' desc) from (
      select jsonb_build_object(
               'id', r.id,
               'inviter', coalesce(ip.nickname,'(탈퇴)'),
               'invitee', coalesce(vp.nickname,'(탈퇴)'),
               'status', r.status,
               'ip_prefix', r.ip_prefix,
               'note', r.note,
               'created_at', r.created_at,
               'qualified_at', r.qualified_at,
               'rewarded_at', r.rewarded_at,
               -- 같은 회선에서 온 초대가 몇 건인지 = 어뷰징 판단의 핵심 근거
               'same_ip_count', (select count(*) from public.referrals x
                                  where x.inviter_id = r.inviter_id and x.ip_prefix = r.ip_prefix)
             ) as t
        from public.referrals r
        left join public.profiles ip on ip.id = r.inviter_id
        left join public.profiles vp on vp.id = r.invitee_id
       where p_status is null or r.status = p_status
       order by r.created_at desc
       limit greatest(1, least(coalesce(p_limit,100), 500))
    ) s), '[]'::jsonb);
end $$;

-- 보류된 건을 승인해서 지급
create or replace function public.admin_referral_approve(p_id bigint)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_ref public.referrals;
begin
  if not public.is_admin() then return jsonb_build_object('ok', false, 'reason', 'forbidden'); end if;
  select * into v_ref from public.referrals where id = p_id;
  if not found then return jsonb_build_object('ok', false, 'reason', 'not_found'); end if;
  if v_ref.status not in ('held','pending','capped') then
    return jsonb_build_object('ok', false, 'reason', 'bad_status');
  end if;
  update public.referrals set status = 'pending', note = '관리자 승인' where id = p_id;
  perform public.referral_grant(p_id);
  return jsonb_build_object('ok', true);
end $$;

-- 지급을 회수(가짜 계정으로 판명된 경우). 준 만큼 그대로 빼낸다.
create or replace function public.admin_referral_revoke(p_id bigint, p_reason text default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_ref public.referrals; v_rules public.referral_rules;
begin
  if not public.is_admin() then return jsonb_build_object('ok', false, 'reason', 'forbidden'); end if;
  select * into v_ref from public.referrals where id = p_id;
  if not found then return jsonb_build_object('ok', false, 'reason', 'not_found'); end if;
  select * into v_rules from public.referral_rules where id = 1;

  if v_ref.status = 'rewarded' then
    -- 준 만큼 되돌린다. 점수는 음수가 되지 않게 막는다(등급이 깨지지 않도록).
    perform set_config('app.trusted_score_update', 'true', true);
    update public.profiles
       set score     = greatest(0, coalesce(score,0) - coalesce(v_ref.reward_score, v_rules.reward_inviter_score)),
           ad_points = greatest(0, coalesce(ad_points,0) - coalesce(v_ref.reward_points, v_rules.reward_inviter_points))
     where id = v_ref.inviter_id;
    update public.profiles
       set score     = greatest(0, coalesce(score,0) - v_rules.reward_invitee_score),
           ad_points = greatest(0, coalesce(ad_points,0) - v_rules.reward_invitee_points)
     where id = v_ref.invitee_id;
    -- 등급 다시 계산
    begin
      perform public.recalc_level(v_ref.inviter_id);
      perform public.recalc_level(v_ref.invitee_id);
    exception when undefined_function then
      update public.profiles p
         set level = coalesce((select max(l.level) from public.level_thresholds l
                                where l.min_score <= coalesce(p.score,0)), 1)
       where p.id in (v_ref.inviter_id, v_ref.invitee_id);
    end;
  end if;

  update public.referrals
     set status = 'revoked', note = coalesce(p_reason, '관리자 회수')
   where id = p_id;
  return jsonb_build_object('ok', true);
end $$;


-- ── 10. 내부 함수 실행 권한 회수 (⚠️ 가장 중요) ────────────
--  Postgres는 함수를 만들면 **기본적으로 모두에게 실행 권한을 준다.**
--  그런데 위 함수들은 security definer(= 주인 권한으로 실행)라, 그대로 두면
--  로그인한 아무나 브라우저에서 이렇게 호출해 무한정 포인트를 만들 수 있다:
--      supabase.rpc('referral_award', {p_user: 내ID, p_score: 999999, p_points: 999999})
--  그래서 **트리거와 다른 함수 안에서만** 불리도록 실행 권한을 걷어낸다.
--  (RLS로는 막을 수 없다. 함수 실행 권한은 별개다.)
revoke all on function public.referral_award(uuid, integer, integer) from public, anon, authenticated;
revoke all on function public.referral_grant(bigint)              from public, anon, authenticated;
revoke all on function public.referral_try_qualify(uuid)          from public, anon, authenticated;
revoke all on function public.gen_referral_code()                 from public, anon, authenticated;
revoke all on function public.client_ip_prefix()                  from public, anon, authenticated;
revoke all on function public.trg_referral_check()                from public, anon, authenticated;
revoke all on function public.trg_profile_referral_code()         from public, anon, authenticated;

-- 관리자 함수는 안에서 is_admin()을 확인하므로 로그인 사용자에게 열어 둬도 되지만,
-- 비로그인(anon)까지 열어 둘 이유는 없다.
revoke all on function public.admin_referral_stats()                 from public, anon;
revoke all on function public.admin_referral_list(text, integer)     from public, anon;
revoke all on function public.admin_referral_approve(bigint)         from public, anon;
revoke all on function public.admin_referral_revoke(bigint, text)    from public, anon;
grant execute on function public.admin_referral_stats()              to authenticated;
grant execute on function public.admin_referral_list(text, integer)  to authenticated;
grant execute on function public.admin_referral_approve(bigint)      to authenticated;
grant execute on function public.admin_referral_revoke(bigint, text) to authenticated;


-- ── 11. 확인 ───────────────────────────────────────────────
select
  (select count(*) from public.profiles where referral_code is not null) as "코드 발급된 회원",
  (select count(*) from public.referrals) as "초대 기록",
  (select reward_inviter_score  from public.referral_rules where id=1) as "초대자 점수",
  (select reward_inviter_points from public.referral_rules where id=1) as "초대자 포인트",
  (select reward_invitee_score  from public.referral_rules where id=1) as "피초대자 점수",
  (select reward_invitee_points from public.referral_rules where id=1) as "피초대자 포인트";
