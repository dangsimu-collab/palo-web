-- ============================================================
-- 자체 이모티콘 시스템 — DB 설정
-- Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 실행하세요.
-- 여러 번 실행해도 안전합니다.
--
-- 회원이 직접 만든 이모티콘을 팩 단위로 올리고, 다른 회원이 담아서
-- 댓글·채팅에 쓰는 구조입니다. 이미지는 R2에 저장되고 여기엔 주소만 남습니다.
-- ============================================================

-- ── 1. 이모티콘 팩 ─────────────────────────────────────────
create table if not exists public.emoticon_packs (
  id          bigserial primary key,
  author_id   uuid not null references auth.users on delete cascade,
  title       text not null,
  cover_url   text,                                   -- 목록에 보여줄 대표 이미지
  status      text not null default 'public',         -- public(공개) / hidden(운영자가 내림)
  created_at  timestamptz not null default now()
);
alter table public.emoticon_packs enable row level security;

create index if not exists emoticon_packs_author on public.emoticon_packs(author_id);
create index if not exists emoticon_packs_public on public.emoticon_packs(created_at desc) where status = 'public';

-- ── 2. 팩 안의 이모티콘 ────────────────────────────────────
create table if not exists public.emoticons (
  id          bigserial primary key,
  pack_id     bigint not null references public.emoticon_packs on delete cascade,
  url         text not null,
  sort        int not null default 0,
  created_at  timestamptz not null default now()
);
alter table public.emoticons enable row level security;

create index if not exists emoticons_pack on public.emoticons(pack_id, sort);

-- ── 3. 내 이모티콘함(담아둔 팩) ────────────────────────────
create table if not exists public.user_emoticon_packs (
  user_id   uuid not null references auth.users on delete cascade,
  pack_id   bigint not null references public.emoticon_packs on delete cascade,
  added_at  timestamptz not null default now(),
  primary key (user_id, pack_id)
);
alter table public.user_emoticon_packs enable row level security;

create index if not exists user_emoticon_packs_user on public.user_emoticon_packs(user_id, added_at desc);


-- ── 4. RLS ────────────────────────────────────────────────
-- 팩: 공개된 것과 내 것은 볼 수 있고, 만들고 고치고 지우는 건 본인만.
drop policy if exists "공개 팩과 내 팩 조회" on public.emoticon_packs;
create policy "공개 팩과 내 팩 조회" on public.emoticon_packs
  for select using (status = 'public' or author_id = auth.uid() or public.is_admin());

drop policy if exists "내 팩 등록" on public.emoticon_packs;
create policy "내 팩 등록" on public.emoticon_packs
  for insert with check (author_id = auth.uid());

drop policy if exists "내 팩 수정" on public.emoticon_packs;
create policy "내 팩 수정" on public.emoticon_packs
  for update using (author_id = auth.uid() or public.is_admin());

drop policy if exists "내 팩 삭제" on public.emoticon_packs;
create policy "내 팩 삭제" on public.emoticon_packs
  for delete using (author_id = auth.uid() or public.is_admin());

-- ⚠️ 작성자가 status를 마음대로 바꿔 운영자가 내린 팩을 되살리지 못하게 막는다.
create or replace function public.protect_pack_status()
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
     and not public.is_admin()
     and new.status is distinct from old.status then
    raise exception '공개 상태는 운영자만 변경할 수 있습니다';
  end if;
  return new;
end;
$$;

drop trigger if exists protect_pack_status_trg on public.emoticon_packs;
create trigger protect_pack_status_trg
  before update on public.emoticon_packs
  for each row execute function public.protect_pack_status();

-- 이모티콘: 볼 수 있는 팩의 것만 보이고, 넣고 빼는 건 팩 주인만.
-- 팩 조회 정책을 그대로 타면 되므로 서브쿼리로 연결한다.
drop policy if exists "보이는 팩의 이모티콘 조회" on public.emoticons;
create policy "보이는 팩의 이모티콘 조회" on public.emoticons
  for select using (exists (select 1 from public.emoticon_packs p where p.id = pack_id));

drop policy if exists "내 팩에만 이모티콘 등록" on public.emoticons;
create policy "내 팩에만 이모티콘 등록" on public.emoticons
  for insert with check (
    exists (select 1 from public.emoticon_packs p where p.id = pack_id and p.author_id = auth.uid())
  );

drop policy if exists "내 팩의 이모티콘 삭제" on public.emoticons;
create policy "내 팩의 이모티콘 삭제" on public.emoticons
  for delete using (
    exists (select 1 from public.emoticon_packs p where p.id = pack_id and (p.author_id = auth.uid() or public.is_admin()))
  );

-- 이모티콘함: 내 것만 보고 담고 뺀다.
drop policy if exists "내 이모티콘함 조회" on public.user_emoticon_packs;
create policy "내 이모티콘함 조회" on public.user_emoticon_packs
  for select using (user_id = auth.uid());

drop policy if exists "내 이모티콘함에 담기" on public.user_emoticon_packs;
create policy "내 이모티콘함에 담기" on public.user_emoticon_packs
  for insert with check (user_id = auth.uid());

drop policy if exists "내 이모티콘함에서 빼기" on public.user_emoticon_packs;
create policy "내 이모티콘함에서 빼기" on public.user_emoticon_packs
  for delete using (user_id = auth.uid());


-- ── 5. 팩당 이모티콘 개수 제한 ─────────────────────────────
-- 한 팩에 수백 개를 넣으면 피커가 느려지고 저장소도 낭비된다.
create or replace function public.limit_pack_size()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  cnt int;
begin
  select count(*) into cnt from public.emoticons where pack_id = new.pack_id;
  if cnt >= 24 then
    raise exception '한 팩에는 이모티콘을 24개까지 넣을 수 있습니다';
  end if;
  return new;
end;
$$;

drop trigger if exists limit_pack_size_trg on public.emoticons;
create trigger limit_pack_size_trg
  before insert on public.emoticons
  for each row execute function public.limit_pack_size();
