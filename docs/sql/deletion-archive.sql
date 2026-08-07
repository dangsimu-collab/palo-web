-- ============================================================
-- 삭제 보관본 확장 + 복구
-- Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 실행하세요.
-- 여러 번 실행해도 안전합니다.
--
-- 지금까지는 "글 상세의 🗑 관리자 삭제" 한 경로만 원본을 보관했습니다.
-- 신고함에서 지우면 아무것도 안 남았고, 댓글·커미션은 보관본 자체가 없었습니다.
-- 이 파일은 그 빈 곳을 채우고, 보관본에서 되살리는 기능을 넣습니다.
--
-- 설계 원칙
--   · 보관본은 **증거**다 → select만 관리자에게 열고 insert/update/delete 정책은 두지 않는다.
--     (아래 security definer 함수로만 기록되고, 관리자도 고치거나 지울 수 없다)
--   · 알림 발송이 실패해도 삭제 자체는 진행돼야 한다 → 알림은 예외를 삼킨다.
--   · 되살리기는 원래 번호가 아니라 **새 번호**로 다시 넣는다(그 번호를 이미 다른 글이 쓸 수 있으므로).
-- ============================================================

-- ── 0. 기존 글 보관본에 '되살림' 표시 칸 추가 ───────────────
alter table public.admin_post_deletions
  add column if not exists restored_at timestamptz,
  add column if not exists restored_id bigint;


-- ── 1. 댓글 보관본 ─────────────────────────────────────────
create table if not exists public.admin_comment_deletions (
  id                 bigserial primary key,
  comment_id         bigint,
  post_id            bigint,
  post_title         text,          -- 원본 글이 나중에 지워져도 어느 글이었는지 남게
  content            text,
  comment_created_at timestamptz,
  author_id          uuid,
  author_nick        text,
  author_avatar      text,
  author_level       integer,
  admin_id           uuid,
  admin_nick         text,
  reason             text,
  notified           boolean not null default false,
  restored_at        timestamptz,
  restored_id        bigint,
  created_at         timestamptz not null default now()
);
alter table public.admin_comment_deletions enable row level security;

drop policy if exists "댓글 보관본 관리자 조회" on public.admin_comment_deletions;
create policy "댓글 보관본 관리자 조회" on public.admin_comment_deletions
  for select using (public.is_admin());
-- insert/update/delete 정책 없음 = 아래 함수(security definer)로만 기록·수정된다

create index if not exists admin_comment_deletions_time
  on public.admin_comment_deletions(created_at desc);


-- ── 2. 커미션 보관본 ───────────────────────────────────────
-- ⚠️ 커미션은 돈이 오가는 거래라 근거가 특히 중요하다.
--    이미지는 주소만 저장하되, 관리자 삭제 경로에서는 **저장소 파일을 지우지 않아**
--    보관본에서 그림이 그대로 보인다(작가 본인 삭제는 지금처럼 파일도 정리된다).
create table if not exists public.admin_commission_deletions (
  id                    bigserial primary key,
  commission_id         bigint,
  title                 text,
  price                 text,
  tags                  text[],
  status                text,
  period                text,
  slots                 text,
  description           text,
  description_html      text,
  usage_rights          text,
  trade_policy          text,
  application_form      jsonb,
  images                jsonb,       -- 대표 이미지 URL 배열
  commission_created_at timestamptz,
  author_id             uuid,
  author_nick           text,
  admin_id              uuid,
  admin_nick            text,
  reason                text,
  notified              boolean not null default false,
  restored_at           timestamptz,
  restored_id           bigint,
  created_at            timestamptz not null default now()
);
alter table public.admin_commission_deletions enable row level security;

drop policy if exists "커미션 보관본 관리자 조회" on public.admin_commission_deletions;
create policy "커미션 보관본 관리자 조회" on public.admin_commission_deletions
  for select using (public.is_admin());

create index if not exists admin_commission_deletions_time
  on public.admin_commission_deletions(created_at desc);


-- ── 3. 관리자 댓글 삭제 ────────────────────────────────────
create or replace function public.admin_delete_comment(
  p_comment_id bigint,
  p_reason     text default null,
  p_notify     boolean default true
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  c        record;
  prof     record;
  adm      record;
  did_notify boolean := false;
begin
  if not public.is_admin() then
    return jsonb_build_object('ok', false, 'error', 'not_admin');
  end if;

  select cm.id, cm.post_id, cm.content, cm.created_at, cm.author_id, p.title as post_title
    into c
    from public.comments cm
    left join public.posts p on p.id = cm.post_id
   where cm.id = p_comment_id;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'not_found');
  end if;

  select nickname, avatar_url, level into prof from public.profiles where id = c.author_id;
  select nickname into adm from public.profiles where id = auth.uid();

  -- 작성자에게 알림. 실패해도 삭제는 계속 진행한다(알림 종류 제약 등으로 막히는 경우 대비).
  if p_notify and c.author_id is not null then
    begin
      insert into public.notifications (user_id, type, icon, content, link_post_id)
      values (c.author_id, 'admin_delete', '🗑',
              case when coalesce(p_reason,'') <> ''
                   then '작성하신 댓글이 운영 규정에 따라 삭제되었어요. 사유: ' || p_reason
                   else '작성하신 댓글이 운영 규정에 따라 삭제되었어요.' end,
              c.post_id);
      did_notify := true;
    exception when others then
      did_notify := false;
    end;
  end if;

  insert into public.admin_comment_deletions
    (comment_id, post_id, post_title, content, comment_created_at,
     author_id, author_nick, author_avatar, author_level,
     admin_id, admin_nick, reason, notified)
  values
    (c.id, c.post_id, c.post_title, c.content, c.created_at,
     c.author_id, prof.nickname, prof.avatar_url, prof.level,
     auth.uid(), adm.nickname, nullif(p_reason,''), did_notify);

  delete from public.comments where id = p_comment_id;
  return jsonb_build_object('ok', true);
end;
$$;


-- ── 4. 관리자 커미션 삭제 ──────────────────────────────────
create or replace function public.admin_delete_commission(
  p_commission_id bigint,
  p_reason        text default null,
  p_notify        boolean default true
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  m          record;
  prof       record;
  adm        record;
  imgs       jsonb;
  did_notify boolean := false;
begin
  if not public.is_admin() then
    return jsonb_build_object('ok', false, 'error', 'not_admin');
  end if;

  select * into m from public.commissions where id = p_commission_id;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'not_found');
  end if;

  -- 이미지 주소는 cascade로 사라지기 전에 모아둔다(파일 자체는 지우지 않는다)
  select coalesce(jsonb_agg(url order by sort), '[]'::jsonb) into imgs
    from public.commission_images where commission_id = p_commission_id;

  select nickname into prof from public.profiles where id = m.author_id;
  select nickname into adm  from public.profiles where id = auth.uid();

  if p_notify and m.author_id is not null then
    begin
      insert into public.notifications (user_id, type, icon, content)
      values (m.author_id, 'admin_delete', '🗑',
              case when coalesce(p_reason,'') <> ''
                   then '등록하신 커미션이 운영 규정에 따라 삭제되었어요. 사유: ' || p_reason
                   else '등록하신 커미션이 운영 규정에 따라 삭제되었어요.' end);
      did_notify := true;
    exception when others then
      did_notify := false;
    end;
  end if;

  insert into public.admin_commission_deletions
    (commission_id, title, price, tags, status, period, slots,
     description, description_html, usage_rights, trade_policy, application_form,
     images, commission_created_at, author_id, author_nick,
     admin_id, admin_nick, reason, notified)
  values
    (m.id, m.title, m.price, m.tags, m.status, m.period, m.slots,
     m.description, m.description_html, m.usage_rights, m.trade_policy, m.application_form,
     imgs, m.created_at, m.author_id, prof.nickname,
     auth.uid(), adm.nickname, nullif(p_reason,''), did_notify);

  delete from public.commissions where id = p_commission_id;
  return jsonb_build_object('ok', true);
end;
$$;


-- ── 5. 되살리기 ────────────────────────────────────────────
-- 보관본은 지우지 않고 '되살림' 표시만 남긴다(증거는 그대로 보존).
-- 원래 번호는 다른 글이 쓰고 있을 수 있으므로 새 번호로 들어간다.

create or replace function public.admin_restore_post(p_log_id bigint)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  r      record;
  new_id bigint;
  u      text;
  i      int := 0;
begin
  if not public.is_admin() then
    return jsonb_build_object('ok', false, 'error', 'not_admin');
  end if;
  select * into r from public.admin_post_deletions where id = p_log_id;
  if not found then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  if r.restored_at is not null then
    return jsonb_build_object('ok', false, 'error', 'already_restored', 'restored_id', r.restored_id);
  end if;

  insert into public.posts (author_id, board, category, title, content, content_html, stage, created_at)
  values (r.author_id, r.board, r.category, r.title, r.content, r.content_html, r.stage,
          coalesce(r.post_created_at, now()))
  returning id into new_id;

  if r.images is not null then
    for u in select jsonb_array_elements_text(r.images) loop
      insert into public.post_images (post_id, url, sort) values (new_id, u, i);
      i := i + 1;
    end loop;
  end if;

  update public.admin_post_deletions
     set restored_at = now(), restored_id = new_id
   where id = p_log_id;

  return jsonb_build_object('ok', true, 'id', new_id);
end;
$$;

create or replace function public.admin_restore_comment(p_log_id bigint)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  r      record;
  new_id bigint;
begin
  if not public.is_admin() then
    return jsonb_build_object('ok', false, 'error', 'not_admin');
  end if;
  select * into r from public.admin_comment_deletions where id = p_log_id;
  if not found then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  if r.restored_at is not null then
    return jsonb_build_object('ok', false, 'error', 'already_restored', 'restored_id', r.restored_id);
  end if;
  -- 달려 있던 글이 이미 사라졌으면 붙일 곳이 없다
  if not exists (select 1 from public.posts where id = r.post_id) then
    return jsonb_build_object('ok', false, 'error', 'post_gone');
  end if;

  insert into public.comments (post_id, author_id, content, created_at)
  values (r.post_id, r.author_id, r.content, coalesce(r.comment_created_at, now()))
  returning id into new_id;

  update public.admin_comment_deletions
     set restored_at = now(), restored_id = new_id
   where id = p_log_id;

  return jsonb_build_object('ok', true, 'id', new_id);
end;
$$;

create or replace function public.admin_restore_commission(p_log_id bigint)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  r      record;
  new_id bigint;
  u      text;
  i      int := 0;
begin
  if not public.is_admin() then
    return jsonb_build_object('ok', false, 'error', 'not_admin');
  end if;
  select * into r from public.admin_commission_deletions where id = p_log_id;
  if not found then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  if r.restored_at is not null then
    return jsonb_build_object('ok', false, 'error', 'already_restored', 'restored_id', r.restored_id);
  end if;
  -- 작가 계정이 사라졌으면 되살릴 수 없다(커미션은 작성자가 필수)
  if r.author_id is null or not exists (select 1 from public.profiles where id = r.author_id) then
    return jsonb_build_object('ok', false, 'error', 'author_gone');
  end if;

  -- bumped_at을 지금으로 두면 되살리자마자 목록 맨 위로 가버린다 → 원래 등록 시각에 맞춘다
  insert into public.commissions
    (author_id, title, price, tags, status, period, slots,
     description, description_html, usage_rights, trade_policy, application_form,
     created_at, bumped_at)
  values
    (r.author_id, r.title, r.price, r.tags, coalesce(r.status,'open'), r.period, r.slots,
     r.description, r.description_html, r.usage_rights, r.trade_policy, r.application_form,
     coalesce(r.commission_created_at, now()), coalesce(r.commission_created_at, now()))
  returning id into new_id;

  if r.images is not null then
    for u in select jsonb_array_elements_text(r.images) loop
      insert into public.commission_images (commission_id, url, sort) values (new_id, u, i);
      i := i + 1;
    end loop;
  end if;

  update public.admin_commission_deletions
     set restored_at = now(), restored_id = new_id
   where id = p_log_id;

  return jsonb_build_object('ok', true, 'id', new_id);
end;
$$;


-- ── 6. 실행 권한 ───────────────────────────────────────────
-- 함수 안에서 is_admin()을 확인하지만, 애초에 로그인한 사람만 부를 수 있게 해 둔다.
revoke all on function public.admin_delete_comment(bigint, text, boolean)     from public;
revoke all on function public.admin_delete_commission(bigint, text, boolean)  from public;
revoke all on function public.admin_restore_post(bigint)                      from public;
revoke all on function public.admin_restore_comment(bigint)                   from public;
revoke all on function public.admin_restore_commission(bigint)                from public;

grant execute on function public.admin_delete_comment(bigint, text, boolean)    to authenticated;
grant execute on function public.admin_delete_commission(bigint, text, boolean) to authenticated;
grant execute on function public.admin_restore_post(bigint)                     to authenticated;
grant execute on function public.admin_restore_comment(bigint)                  to authenticated;
grant execute on function public.admin_restore_commission(bigint)               to authenticated;
