-- ============================================================
-- 커미션 신고 — 기존 신고함(reports)에 대상만 하나 더 추가
-- 여러 번 실행해도 안전합니다.
--
-- 이걸 실행하기 전에도 커미션 '더보기(점 3개)' 메뉴는 정상 동작합니다.
-- 다만 신고 항목만 숨겨져 있고, 실행하면 자동으로 나타납니다.
-- ============================================================

alter table public.reports
  add column if not exists commission_id bigint references public.commissions on delete cascade;

create index if not exists reports_commission on public.reports(commission_id) where resolved = false;
