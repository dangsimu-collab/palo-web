-- ============================================================
--  외부 대시보드(BI 도구) 연결용 — 읽기 전용 계정 + 보기 좋은 뷰
--
--  왜 이렇게 하는가
--  ─────────────────
--  ① 대시보드 도구에 **postgres 계정을 절대 주지 않는다.**
--     그 계정은 데이터를 지우고 스키마를 바꿀 수 있다. 도구가 털리면 사이트가 통째로 털린다.
--     대신 아래에서 만드는 bi_reader 는 **읽기만** 되고, 그것도 아래 뷰들만 볼 수 있다.
--
--  ② 원본 테이블을 그대로 열어주지 않고 **bi 스키마의 뷰**만 연다.
--     - 필요 없는 컬럼(비밀번호 해시, 본인확인 DI 해시, 신청서 답변 원문 등)이 아예 안 보인다
--     - 컬럼 이름이 한글이라 도구에서 바로 알아볼 수 있다
--     - 나중에 테이블 구조가 바뀌어도 뷰만 고치면 대시보드는 그대로 쓸 수 있다
--
--  ③ 뷰는 postgres 가 소유한다 → **뷰를 읽을 때 RLS가 적용되지 않는다.**
--     (Postgres는 테이블 주인에게 RLS를 걸지 않는다. FORCE ROW LEVEL SECURITY를 쓴 테이블은 예외)
--     그래서 bi_reader 는 테이블에 아무 권한이 없어도 뷰를 통해 전체 통계를 볼 수 있다.
--     ⚠️ 뒤집어 말하면 **이 뷰에 넣은 것은 전부 보인다.** 뷰에 뭘 넣을지가 곧 보안 경계다.
--
--  ④ 이메일은 auth.users 에만 있다. 브라우저(anon 키)로는 절대 못 읽는 곳이라
--     지금까지 관리자 페이지에서 이메일이 안 보였다. 여기서는 볼 수 있다.
--
--  ⚠️ 개인정보: 아래 bi.회원 뷰에는 **가입자 이메일이 들어 있다.**
--     대시보드 계정과 공유 링크를 최소한으로 유지하세요. 링크가 새면 이메일도 같이 샙니다.
--
--  실행 방법: Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 Run.
--            여러 번 실행해도 안전합니다(뷰를 지웠다 다시 만들고, 계정은 이미 있으면 건너뜁니다).
--            단, 맨 아래 "8. 읽기 전용 계정"의 비밀번호는 먼저 직접 바꾸세요.
-- ============================================================


-- ── 1. 전용 스키마 ─────────────────────────────────────────
-- public 을 어지럽히지 않도록 대시보드용 뷰는 bi 스키마에 모은다.
create schema if not exists bi;


-- ── 2. 회원 ────────────────────────────────────────────────
-- auth.users(이메일·로그인 수단·마지막 접속) + profiles(닉네임·등급·점수)를 합친다.
-- ⚠️ auth.users 에는 비밀번호 해시·본인확인 토큰 같은 것도 있다. 여기서 고른 컬럼만 내보낸다.
drop view if exists bi.회원 cascade;
create or replace view bi.회원 as
select
  u.id                                                   as "회원번호",
  p.nickname                                             as "닉네임",
  u.email                                                as "이메일",
  -- 구글/네이버/X 로 가입했는지, 이메일로 가입했는지
  coalesce(u.raw_app_meta_data ->> 'provider', 'email')  as "로그인수단",
  u.created_at                                           as "가입일시",
  u.last_sign_in_at                                      as "마지막접속",
  (u.email_confirmed_at is not null)                     as "이메일확인",
  p.level                                                as "등급",
  lt.name                                                as "등급이름",
  p.score                                                as "점수",
  p.ad_points                                            as "광고포인트",
  p.is_admin                                             as "관리자",
  p.is_banned                                            as "차단됨",
  p.adult_verified                                       as "성인인증",
  (p.avatar_url is not null)                             as "프로필사진",
  (p.bio is not null and p.bio <> '')                    as "소개글",
  (select count(*) from public.posts       x where x.author_id = u.id) as "글수",
  (select count(*) from public.comments    x where x.author_id = u.id) as "댓글수",
  (select count(*) from public.commissions x where x.author_id = u.id) as "커미션수",
  p.last_activity_at                                     as "마지막활동"
from auth.users u
left join public.profiles p          on p.id = u.id
left join public.level_thresholds lt on lt.level = p.level;


-- ── 3. 글 · 댓글 ───────────────────────────────────────────
-- content_html(서식 원문)은 길고 볼 일이 없어 뺐다. 본문은 200자만 잘라서 보여준다.
drop view if exists bi.글 cascade;
create or replace view bi.글 as
select
  t.id                        as "글번호",
  t.board                     as "게시판",
  t.category                  as "말머리",
  t.title                     as "제목",
  left(coalesce(t.content,''), 200) as "내용요약",
  p.nickname                  as "작성자",
  t.author_id                 as "작성자번호",
  t.created_at                as "작성일시",
  t.views                     as "조회수",
  (select count(*) from public.likes    l where l.post_id = t.id) as "좋아요",
  (select count(*) from public.comments c where c.post_id = t.id) as "댓글수",
  t.stage                     as "단계",
  t.is_manager_pick           as "매니저픽",
  t.blinded                   as "블라인드"
from public.posts t
left join public.profiles p on p.id = t.author_id;

drop view if exists bi.댓글 cascade;
create or replace view bi.댓글 as
select
  c.id          as "댓글번호",
  c.post_id     as "글번호",
  t.title       as "글제목",
  t.board       as "게시판",
  p.nickname    as "작성자",
  c.author_id   as "작성자번호",
  c.content     as "내용",
  c.created_at  as "작성일시"
from public.comments c
left join public.posts t    on t.id = c.post_id
left join public.profiles p on p.id = c.author_id;


-- ── 4. 커미션 · 신청 ───────────────────────────────────────
drop view if exists bi.커미션 cascade;
create or replace view bi.커미션 as
select
  c.id                          as "커미션번호",
  c.title                       as "제목",
  p.nickname                    as "작가",
  c.author_id                   as "작가번호",
  c.status                      as "상태",
  c.price                       as "가격",
  array_to_string(c.tags, ', ') as "태그",
  c.period                      as "작업기간",
  c.slots                       as "슬롯",
  c.views                       as "조회수",
  c.bumped_at                   as "끌올일시",
  c.created_at                  as "등록일시",
  (select count(*) from public.commission_applications a
     where a.commission_id = c.id)                        as "신청수",
  (select count(*) from public.commission_applications a
     where a.commission_id = c.id and a.status = 'accepted') as "수락수"
from public.commissions c
left join public.profiles p on p.id = c.author_id;

-- ⚠️ answers(신청서 답변 원문)·reference_images 는 일부러 뺐다.
--    신청자가 작가에게만 보낸 사적인 내용이라 통계 화면에 흘릴 이유가 없다.
drop view if exists bi.커미션신청 cascade;
create or replace view bi.커미션신청 as
select
  a.id             as "신청번호",
  a.commission_id  as "커미션번호",
  c.title          as "커미션제목",
  wp.nickname      as "작가",
  ap.nickname      as "신청자",
  a.applicant_id   as "신청자번호",
  a.status         as "상태",
  a.created_at     as "신청일시",
  a.decided_at     as "처리일시"
from public.commission_applications a
left join public.commissions c on c.id = a.commission_id
left join public.profiles wp   on wp.id = c.author_id
left join public.profiles ap   on ap.id = a.applicant_id;


-- ── 5. 광고 성과 ───────────────────────────────────────────
-- 캠페인 × 날짜 한 줄. 날짜는 한국 시간 기준으로 자른다(UTC로 자르면 하루가 밀린다).
drop view if exists bi.광고성과일별 cascade;
create or replace view bi.광고성과일별 as
select
  (e.created_at at time zone 'Asia/Seoul')::date       as "날짜",
  coalesce(e.campaign_code, '(자연유입)')              as "캠페인코드",
  coalesce(m.name, case when e.campaign_code is null
                        then '직접·검색 유입' else '(등록 안 된 코드)' end) as "캠페인이름",
  m.channel                                            as "채널",
  count(distinct e.visitor_id)                         as "방문자",
  count(*) filter (where e.name = 'view')              as "페이지열람",
  count(*) filter (where e.name = 'post_view')         as "글열람",
  count(*) filter (where e.name = 'commission_view')   as "커미션열람",
  count(*) filter (where e.name = 'signup')            as "가입",
  count(*) filter (where e.name = 'login')             as "로그인",
  count(*) filter (where e.name = 'like')              as "좋아요",
  count(*) filter (where e.name = 'comment')           as "댓글",
  count(*) filter (where e.name = 'write')             as "글작성",
  count(*) filter (where e.name = 'commission_apply')  as "커미션신청"
from public.mkt_events e
left join public.mkt_campaigns m on m.code = e.campaign_code
group by 1, 2, 3, 4;

drop view if exists bi.캠페인 cascade;
create or replace view bi.캠페인 as
select
  m.code                                as "코드",
  m.name                                as "이름",
  m.channel                             as "채널",
  m.spend                               as "집행비용",
  m.active                              as "진행중",
  m.created_at                          as "등록일시",
  count(distinct e.visitor_id)          as "누적방문자",
  count(*) filter (where e.name='signup') as "누적가입",
  case when count(*) filter (where e.name='signup') > 0
       then round(m.spend::numeric / count(*) filter (where e.name='signup'))
  end                                   as "가입1명당비용"
from public.mkt_campaigns m
left join public.mkt_events e on e.campaign_code = m.code
group by m.code, m.name, m.channel, m.spend, m.active, m.created_at;


-- ── 6. 사이트 전체 일별 요약 ───────────────────────────────
-- 활동이 하나도 없던 날도 0으로 나오게 날짜를 먼저 만들어 두고 붙인다
-- (없는 날이 통째로 빠지면 그래프에서 선이 이어져 실제보다 활발해 보인다).
drop view if exists bi.일별요약 cascade;
create or replace view bi.일별요약 as
with 날짜 as (
  select generate_series(
           coalesce((select min(created_at) from auth.users), now())::date,
           (now() at time zone 'Asia/Seoul')::date,
           interval '1 day'
         )::date as day
)
select
  d.day as "날짜",
  (select count(*) from auth.users u
     where (u.created_at at time zone 'Asia/Seoul')::date = d.day) as "가입",
  (select count(*) from public.posts t
     where (t.created_at at time zone 'Asia/Seoul')::date = d.day) as "글",
  (select count(*) from public.comments c
     where (c.created_at at time zone 'Asia/Seoul')::date = d.day) as "댓글",
  (select count(*) from public.likes l
     where (l.created_at at time zone 'Asia/Seoul')::date = d.day) as "좋아요",
  (select count(*) from public.commissions c
     where (c.created_at at time zone 'Asia/Seoul')::date = d.day) as "커미션등록",
  (select count(*) from public.commission_applications a
     where (a.created_at at time zone 'Asia/Seoul')::date = d.day) as "커미션신청"
from 날짜 d;


-- ── 7. 관리자가 삭제한 것들(보관본) ────────────────────────
drop view if exists bi.삭제된댓글 cascade;
create or replace view bi.삭제된댓글 as
select
  id           as "보관번호",
  comment_id   as "원래댓글번호",
  post_title   as "글제목",
  content      as "내용",
  author_nick  as "작성자",
  admin_nick   as "삭제한관리자",
  reason       as "사유",
  comment_created_at as "원래작성일시",
  created_at   as "삭제일시",
  restored_at  as "복구일시"
from public.admin_comment_deletions;

drop view if exists bi.삭제된커미션 cascade;
create or replace view bi.삭제된커미션 as
select
  id            as "보관번호",
  commission_id as "원래커미션번호",
  title         as "제목",
  author_nick   as "작가",
  admin_nick    as "삭제한관리자",
  reason        as "사유",
  commission_created_at as "원래등록일시",
  created_at    as "삭제일시",
  restored_at   as "복구일시"
from public.admin_commission_deletions;


-- ── 8. 읽기 전용 계정 ──────────────────────────────────────
-- ⚠️ 아래 '비밀번호를_여기에_직접_적으세요' 를 **실행 전에** 직접 정한 값으로 바꾸세요.
--    - 20자 이상, 사이트/개인 계정 어디에도 쓰지 않는 새 비밀번호로
--    - 이 파일은 GitHub 공개 저장소에 올라갑니다. **바꾼 비밀번호를 파일에 저장하지 마세요.**
--      (SQL Editor에 붙여넣을 때만 바꾸고, 실제 값은 대시보드 도구에만 입력)
do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'bi_reader') then
    create role bi_reader with login password '비밀번호를_여기에_직접_적으세요';
  end if;
end
$$;

-- 이 계정이 할 수 있는 일: bi 스키마의 뷰를 읽는 것. 그게 전부다.
grant usage on schema bi to bi_reader;
grant select on all tables in schema bi to bi_reader;
-- 앞으로 bi 스키마에 뷰를 더 만들어도 권한을 다시 주지 않아도 되게
alter default privileges in schema bi grant select on tables to bi_reader;

-- 혹시라도 붙어 있을 수 있는 다른 권한을 확실히 걷어낸다.
-- (public 스키마의 테이블은 anon/authenticated 에게만 열려 있어 원래도 못 보지만, 명시해 둔다)
revoke all on schema public from bi_reader;
revoke all on all tables in schema public from bi_reader;

-- 접속 수를 제한해 둔다 — 대시보드 도구가 폭주해도 사이트가 느려지지 않게.
alter role bi_reader connection limit 5;
-- 오래 걸리는 쿼리로 DB를 붙잡지 못하게(30초)
alter role bi_reader set statement_timeout = '30s';


-- ── 9. 확인 ────────────────────────────────────────────────
-- 잘 만들어졌는지 보기 (관리자 본인이 실행하는 것이므로 전부 보입니다)
select '회원' as 뷰, count(*) from bi.회원
union all select '글',        count(*) from bi.글
union all select '댓글',      count(*) from bi.댓글
union all select '커미션',    count(*) from bi.커미션
union all select '커미션신청', count(*) from bi.커미션신청
union all select '캠페인',    count(*) from bi.캠페인
union all select '일별요약',  count(*) from bi.일별요약;
