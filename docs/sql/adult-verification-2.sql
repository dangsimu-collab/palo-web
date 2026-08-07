-- ============================================================
-- 성인 게시판 본인확인 — 2차 보완 (2026-08-07)
-- Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 실행하세요.
-- 여러 번 실행해도 안전합니다.
--
-- 왜 필요한가
--   ① CI(연계정보) 대신 DI(중복가입확인정보)를 쓰도록 바꿨습니다.
--      CI는 모든 기관에서 같은 값이라 사실상 주민번호를 대체하는 식별자이고,
--      제공받으면 연계정보 안전조치 실태점검 대상이 될 수 있습니다(KCP 안내).
--      우리에게 필요한 건 "이 사이트 안에서 같은 사람인가"뿐이라 DI로 충분합니다.
--   ② 한 번 쓴 본인확인 번호를 다시 쓰지 못하게 막습니다.
--      (KISA 자체점검 체크리스트 4번 '데이터 재사용' 항목)
--
-- ⚠️ adult-verification.sql 을 먼저 실행한 상태여야 합니다.
-- ============================================================

-- ── 1. adult_ci_hash → adult_di_hash 로 이름 변경 ──────────
-- 담기는 값이 CI 해시에서 DI 해시로 바뀌었으므로 이름도 맞춥니다.
-- (아직 성인 게시판을 켜지 않아 실제로 담긴 값은 없습니다)
do $$
begin
  if exists (select 1 from information_schema.columns
             where table_schema='public' and table_name='profiles'
               and column_name='adult_ci_hash')
     and not exists (select 1 from information_schema.columns
             where table_schema='public' and table_name='profiles'
               and column_name='adult_di_hash') then
    alter table public.profiles rename column adult_ci_hash to adult_di_hash;
  end if;
end $$;

-- 처음 실행하는 경우(위 이름 변경 대상이 없을 때)를 위해 보강
alter table public.profiles
  add column if not exists adult_di_hash text;

-- 같은 사람(DI)이 계정을 여러 개 만들어 성인 인증을 돌려쓰는 것 차단
drop index if exists public.profiles_adult_ci_hash_uniq;
create unique index if not exists profiles_adult_di_hash_uniq
  on public.profiles(adult_di_hash) where adult_di_hash is not null;


-- ── 2. 사용자가 스스로 인증 상태를 바꾸는 것 차단(컬럼명 갱신) ──
-- profiles에는 "본인 행 수정 가능" 정책이 있어서, 이 트리거가 없으면 브라우저에서
--   supabase.from('profiles').update({adult_verified:true})
-- 한 줄로 인증을 통과할 수 있습니다. 바뀐 컬럼명으로 다시 만듭니다.
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
    or new.adult_di_hash     is distinct from old.adult_di_hash then
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


-- ── 3. 본인확인 번호 재사용 차단 ───────────────────────────
-- 한 번 쓴 identityVerificationId를 다시 보내도 포트원은 "인증됨"을 돌려줍니다.
-- 그래서 남의 인증 번호를 가로채 그대로 보내면 그 사람 명의로 통과할 수 있습니다.
-- 서버가 인증을 시작할 때 이 칸에 번호를 먼저 적어 '자리를 잡고', 유니크 인덱스가
-- 두 번째 시도를 거절합니다 — 검사와 저장 사이의 틈이 없어 동시에 들어와도 안전합니다.
alter table public.adult_verify_log
  add column if not exists verification_id text;

create unique index if not exists adult_verify_log_vid_uniq
  on public.adult_verify_log(verification_id) where verification_id is not null;

-- result 값 참고: pending(자리만 잡은 상태) / ok / underage / duplicate / failed
