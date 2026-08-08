-- ============================================================
--  삭제 보관본 2차 — **본인이 지운 것도 보관한다**
--
--  왜 필요한가 (2026-08-08, 사용자 지적)
--  ────────────────────────────────────
--  지금까지는 관리자가 지운 것만 보관했다. 그래서 **가해자가 스스로 지우고 나가면
--  아무 근거도 남지 않았다.** 커미션 분쟁(돈이 오간다)이나 괴롭힘 신고에서
--  "지우고 도망가면 끝"이 되는 구멍이었다.
--
--  어떻게 막는가
--  ─────────────
--  클라이언트 코드를 고치는 대신 **테이블에 BEFORE DELETE 트리거**를 건다.
--  브라우저에서 직접 지우든, 관리자 함수로 지우든, 글이 지워지며 댓글이 딸려 지워지든,
--  **경로에 상관없이 지워지기 직전에 사본이 남는다.** 앞으로 새 삭제 경로가 생겨도 자동으로 적용된다.
--
--  ⚠️ 이미 관리자 함수가 보관한 건은 두 번 남기지 않는다(사본 존재 여부로 판별).
--  ⚠️ **보관에 실패해도 삭제 자체는 막지 않는다.** 기존 원칙과 같다 —
--     보관 로직 문제로 회원이 자기 글을 못 지우게 되는 편이 더 나쁘다.
--
--  ⚠️⚠️ **개인정보처리방침에 보관 사실을 반드시 적어야 한다.**
--     회원이 지운 글을 회사가 계속 갖고 있는 것이므로, 목적(분쟁 대응·신고 처리)과
--     보관 기간을 고지하지 않으면 문제가 된다. 이 파일과 함께 방침도 고쳤다.
--
--  실행: Supabase → SQL Editor 에 통째로 붙여넣고 Run. 여러 번 실행해도 안전하다.
--  ⚠️ docs/sql/deletion-archive.sql 을 먼저 실행했어야 한다(보관본 표가 있어야 함).
-- ============================================================


-- ── 1. '누가 지웠는지' 칸 추가 ─────────────────────────────
alter table public.admin_post_deletions       add column if not exists deleted_by text;
alter table public.admin_comment_deletions    add column if not exists deleted_by text;
alter table public.admin_commission_deletions add column if not exists deleted_by text;

-- 지금까지 쌓인 기록은 전부 관리자 삭제였다
update public.admin_post_deletions       set deleted_by = 'admin' where deleted_by is null;
update public.admin_comment_deletions    set deleted_by = 'admin' where deleted_by is null;
update public.admin_commission_deletions set deleted_by = 'admin' where deleted_by is null;

-- 아래 트리거가 '이미 보관했나?'를 매번 확인하므로 인덱스를 둔다
create index if not exists admin_post_deletions_pid on public.admin_post_deletions(post_id);
create index if not exists admin_comment_deletions_cid on public.admin_comment_deletions(comment_id);
create index if not exists admin_commission_deletions_cid on public.admin_commission_deletions(commission_id);


-- ── 2. 누가 지우는 중인지 판별 ─────────────────────────────
--   author : 본인이 지움
--   admin  : 관리자가 지움
--   other  : 그 밖(글이 지워지며 댓글이 딸려 지워짐, 서버 작업 등)
create or replace function public.deleter_role(p_author uuid)
returns text language plpgsql stable security definer set search_path = public as $$
declare v_uid uuid;
begin
  begin
    v_uid := auth.uid();
  exception when others then
    return 'other';
  end;
  if v_uid is not null and p_author is not null and v_uid = p_author then
    return 'author';
  end if;
  begin
    if public.is_admin() then return 'admin'; end if;
  exception when others then
    null;
  end;
  return 'other';
end $$;


-- ── 3. 글 ──────────────────────────────────────────────────
create or replace function public.trg_archive_post()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_nick text; v_avatar text; v_level integer; v_imgs jsonb;
begin
  -- 관리자 함수가 같은 트랜잭션에서 이미 보관했으면 건너뛴다(사유·관리자 정보가 담긴 그 기록이 더 낫다)
  if exists (select 1 from public.admin_post_deletions where post_id = old.id) then
    return old;
  end if;
  select nickname, avatar_url, level into v_nick, v_avatar, v_level
    from public.profiles where id = old.author_id;
  -- 이미지는 주소만 담는다(파일 자체는 저장소에 그대로 남는다)
  select jsonb_agg(url order by sort) into v_imgs
    from public.post_images where post_id = old.id;
  insert into public.admin_post_deletions
    (post_id, board, category, title, content, content_html, stage, images, post_created_at,
     author_id, author_nick, author_avatar, author_level, deleted_by, reason, notified)
  values (old.id, old.board, old.category, old.title, old.content, old.content_html, old.stage,
          v_imgs, old.created_at, old.author_id, v_nick, v_avatar, v_level,
          public.deleter_role(old.author_id),
          case public.deleter_role(old.author_id)
            when 'author' then '작성자 본인 삭제'
            when 'admin'  then '관리자 삭제(사유 미입력 경로)'
            else '글 삭제에 따라 함께 삭제' end,
          true);   -- 알림은 보내지 않는다(본인이 지운 것에 알림이 가면 이상하다)
  return old;
exception when others then
  return old;   -- ⚠️ 보관이 실패해도 삭제는 진행된다
end $$;

drop trigger if exists posts_archive_on_delete on public.posts;
create trigger posts_archive_on_delete before delete on public.posts
  for each row execute function public.trg_archive_post();


-- ── 4. 댓글 ────────────────────────────────────────────────
create or replace function public.trg_archive_comment()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_nick text; v_avatar text; v_level integer; v_title text;
begin
  if exists (select 1 from public.admin_comment_deletions where comment_id = old.id) then
    return old;
  end if;
  select nickname, avatar_url, level into v_nick, v_avatar, v_level
    from public.profiles where id = old.author_id;
  -- 원본 글이 이미 지워지는 중일 수 있으므로 제목을 지금 챙겨 둔다
  select title into v_title from public.posts where id = old.post_id;
  insert into public.admin_comment_deletions
    (comment_id, post_id, post_title, content, comment_created_at,
     author_id, author_nick, author_avatar, author_level, deleted_by, reason, notified)
  values (old.id, old.post_id, v_title, old.content, old.created_at,
          old.author_id, v_nick, v_avatar, v_level,
          public.deleter_role(old.author_id),
          case public.deleter_role(old.author_id)
            when 'author' then '작성자 본인 삭제'
            when 'admin'  then '관리자 삭제(사유 미입력 경로)'
            else '글 삭제에 따라 함께 삭제' end,
          true);
  return old;
exception when others then
  return old;
end $$;

drop trigger if exists comments_archive_on_delete on public.comments;
create trigger comments_archive_on_delete before delete on public.comments
  for each row execute function public.trg_archive_comment();


-- ── 5. 커미션 ──────────────────────────────────────────────
-- ⚠️ 돈이 오가는 거래라 근거가 특히 중요하다.
create or replace function public.trg_archive_commission()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_nick text; v_imgs jsonb;
begin
  if exists (select 1 from public.admin_commission_deletions where commission_id = old.id) then
    return old;
  end if;
  select nickname into v_nick from public.profiles where id = old.author_id;
  select jsonb_agg(url order by sort) into v_imgs
    from public.commission_images where commission_id = old.id;
  insert into public.admin_commission_deletions
    (commission_id, title, price, tags, status, period, slots, description, description_html,
     usage_rights, trade_policy, application_form, images, commission_created_at,
     author_id, author_nick, deleted_by, reason, notified)
  values (old.id, old.title, old.price, old.tags, old.status, old.period, old.slots,
          old.description, old.description_html, old.usage_rights, old.trade_policy,
          old.application_form, v_imgs, old.created_at,
          old.author_id, v_nick,
          public.deleter_role(old.author_id),
          case public.deleter_role(old.author_id)
            when 'author' then '작가 본인 삭제'
            when 'admin'  then '관리자 삭제(사유 미입력 경로)'
            else '연쇄 삭제' end,
          true);
  return old;
exception when others then
  return old;
end $$;

drop trigger if exists commissions_archive_on_delete on public.commissions;
create trigger commissions_archive_on_delete before delete on public.commissions
  for each row execute function public.trg_archive_commission();


-- ── 6. 실행 권한 회수 ──────────────────────────────────────
-- 트리거 함수는 트리거가 부를 때만 필요하다. 밖에서 부를 수 있게 열어 둘 이유가 없다.
revoke all on function public.trg_archive_post()       from public, anon, authenticated;
revoke all on function public.trg_archive_comment()    from public, anon, authenticated;
revoke all on function public.trg_archive_commission() from public, anon, authenticated;
revoke all on function public.deleter_role(uuid)       from public, anon, authenticated;


-- ── 7. (선택) 오래된 보관본 정리 ───────────────────────────
-- 지금은 **영구 보관**이다(사용자 요청). 나중에 기간을 두고 싶으면 이 함수를 쓰면 된다.
--   select public.purge_deletion_archive(365);   -- 1년 넘은 것 삭제
-- ⚠️ 되살리지 않은 것만 지운다. 개인정보처리방침의 보관 기간과 반드시 같은 값을 쓸 것.
create or replace function public.purge_deletion_archive(p_days integer default 365)
returns jsonb language plpgsql security definer set search_path = public as $$
declare a integer; b integer; c integer;
begin
  if not public.is_admin() then return jsonb_build_object('ok', false, 'error', 'not_admin'); end if;
  delete from public.admin_post_deletions
   where created_at < now() - make_interval(days => p_days) and restored_at is null;
  get diagnostics a = row_count;
  delete from public.admin_comment_deletions
   where created_at < now() - make_interval(days => p_days) and restored_at is null;
  get diagnostics b = row_count;
  delete from public.admin_commission_deletions
   where created_at < now() - make_interval(days => p_days) and restored_at is null;
  get diagnostics c = row_count;
  return jsonb_build_object('ok', true, 'posts', a, 'comments', b, 'commissions', c);
end $$;
revoke all on function public.purge_deletion_archive(integer) from public, anon;
grant execute on function public.purge_deletion_archive(integer) to authenticated;


-- ── 8. 확인 ────────────────────────────────────────────────
select 'posts' as 표, tgname as 트리거, tgenabled as 활성
  from pg_trigger where tgrelid = 'public.posts'::regclass and tgname = 'posts_archive_on_delete'
union all
select 'comments', tgname, tgenabled
  from pg_trigger where tgrelid = 'public.comments'::regclass and tgname = 'comments_archive_on_delete'
union all
select 'commissions', tgname, tgenabled
  from pg_trigger where tgrelid = 'public.commissions'::regclass and tgname = 'commissions_archive_on_delete';
