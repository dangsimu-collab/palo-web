-- ============================================================
-- 커미션 끌올(다시 위로 올리기)
-- Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 실행하세요.
-- 여러 번 실행해도 안전합니다.
--
-- 이걸 실행하기 전에는 끌올 버튼이 **숨겨져** 있습니다.
-- (없는 칸에 저장하려다 실패하는 버튼을 두지 않으려고 그렇게 만들었습니다)
-- 실행하면 자동으로 나타납니다.
--
-- 설계 메모
--   · 끌올은 **홈·신규 정렬에만** 반영됩니다. 추천 점수는 건드리지 않습니다 —
--     버튼 한 번으로 추천 순위를 올릴 수 있으면 그건 순위 조작이 되니까요.
--   · 24시간에 한 번만 가능합니다. 이 제한은 **서버(이 함수)에서** 겁니다.
--     화면에서 버튼을 가리는 것만으로는 브라우저 콘솔로 우회할 수 있습니다.
-- ============================================================

-- ── 1. 끌올 시각 칸 ────────────────────────────────────────
alter table public.commissions
  add column if not exists bumped_at timestamptz;

-- 기존 커미션은 등록 시각을 끌올 시각으로 삼는다(정렬 결과가 지금과 같아지도록)
update public.commissions set bumped_at = created_at where bumped_at is null;

alter table public.commissions
  alter column bumped_at set default now();

-- 정렬에 쓰는 칸이라 인덱스를 둔다
create index if not exists commissions_bumped_at
  on public.commissions(bumped_at desc);


-- ── 2. ⚠️ 직접 값을 바꿔 끌올하는 것 차단 ──────────────────
-- commissions에는 "본인 커미션 수정 가능" 정책이 있어서, 그대로 두면 브라우저에서
--   supabase.from('commissions').update({bumped_at:new Date()})
-- 한 줄로 24시간 제한을 무시하고 무한히 끌올할 수 있습니다.
-- 아래 함수(bump_commission)를 거칠 때만 값이 바뀌도록 막습니다.
create or replace function public.protect_commission_bump()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  claims text := current_setting('request.jwt.claims', true);
begin
  if new.bumped_at is distinct from old.bumped_at
     -- bump_commission()이 잠시 켜 두는 표식. 이게 있으면 정상 경로다.
     and coalesce(current_setting('app.bump_ok', true), '') <> '1'
     -- claims가 null이면 직접 DB 접속(SQL Editor 등) → 관리자이므로 허용
     and claims is not null
     and coalesce((claims::json ->> 'role'), '') <> 'service_role' then
    raise exception '끌올은 끌올 버튼으로만 할 수 있습니다';
  end if;
  return new;
end;
$$;

drop trigger if exists protect_commission_bump_trg on public.commissions;
create trigger protect_commission_bump_trg
  before update on public.commissions
  for each row execute function public.protect_commission_bump();


-- ── 3. 끌올 함수 ───────────────────────────────────────────
-- 본인 것인지, 접수중인지, 24시간이 지났는지를 서버에서 확인한 뒤에만 올려준다.
-- 실패해도 예외를 던지지 않고 이유를 돌려준다(화면에서 남은 시간을 안내해야 하므로).
create or replace function public.bump_commission(p_id bigint)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  c        record;
  cooldown constant interval := interval '24 hours';
  nxt      timestamptz;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'reason', 'login');
  end if;

  select author_id, status, coalesce(bumped_at, created_at) as bumped_at
    into c
    from public.commissions
   where id = p_id;

  if not found then
    return jsonb_build_object('ok', false, 'reason', 'not_found');
  end if;
  if c.author_id is distinct from auth.uid() then
    return jsonb_build_object('ok', false, 'reason', 'not_owner');
  end if;
  -- 마감된 커미션은 목록에 아예 안 나오므로 올려도 의미가 없다
  if c.status <> 'open' then
    return jsonb_build_object('ok', false, 'reason', 'closed');
  end if;

  nxt := c.bumped_at + cooldown;
  if nxt > now() then
    return jsonb_build_object('ok', false, 'reason', 'cooldown', 'next_at', nxt);
  end if;

  perform set_config('app.bump_ok', '1', true);   -- 위 트리거를 통과하기 위한 표식
  update public.commissions set bumped_at = now() where id = p_id;
  perform set_config('app.bump_ok', '', true);    -- 같은 트랜잭션의 다른 update에 새지 않게 바로 끈다

  return jsonb_build_object('ok', true, 'bumped_at', now(), 'next_at', now() + cooldown);
end;
$$;

revoke all on function public.bump_commission(bigint) from public;
grant execute on function public.bump_commission(bigint) to authenticated;
