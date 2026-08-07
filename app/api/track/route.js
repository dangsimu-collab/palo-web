// 광고 성과 측정용 행동 기록 수집.
//
// ⚠️ 왜 브라우저에서 DB로 바로 안 넣는가
//    mkt_events에 insert 정책을 주면 누구나 아무 행동이나 넣을 수 있어 통계가 오염된다.
//    (경쟁자가 남의 캠페인에 가짜 가입을 수천 건 꽂아 넣는 식)
//    그래서 이 라우트(service_role)만 기록할 수 있게 하고, 여기서 IP별 도배를 막는다.
//
// 개인정보: IP는 도배를 막는 데만 잠깐 쓰고 **저장하지 않는다**.
//           방문자 번호는 브라우저가 만든 무작위값이라 사람을 특정하지 못한다.
import { createClient } from "@supabase/supabase-js";
import { clientIp, rateLimit } from "../../../lib/client-ip";

export const runtime = "nodejs";

// 받아들일 행동 이름. 목록에 없으면 버린다 — 아무 이름이나 들어오면 통계가 지저분해지고,
// 카디널리티가 폭발해 조회가 느려진다.
const NAMES = new Set([
  "view",             // 페이지 열람
  "post_view",        // 글 상세 열람
  "commission_view",  // 커미션 상세 열람
  "click",            // 버튼 클릭(label에 이름)
  "like",
  "comment",
  "write",            // 글 작성 완료
  "bookmark",
  "commission_apply", // 커미션 문의·신청
  "signup",
  "login",
]);

const MAX_BATCH = 30;       // 한 번에 보낼 수 있는 행동 수
const LIMIT_PER_MIN = 120;  // 같은 IP에서 1분에 받아줄 행동 수

function cut(v, n) {
  const s = String(v == null ? "" : v).trim();
  return s ? s.slice(0, n) : null;
}
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request) {
  // ⚠️ 검증을 설정 확인보다 먼저 한다. 반대로 두면 설정이 없는 환경(로컬 등)에서
  //    잘못된 요청도 전부 200으로 넘어가 버려서, 검증이 되는지 확인할 방법이 없다.
  let body;
  try { body = await request.json(); } catch (e) { return Response.json({ ok: false }, { status: 400 }); }

  const visitorId = String(body?.v || "");
  if (!UUID.test(visitorId)) return Response.json({ ok: false }, { status: 400 });

  const ip = clientIp(request);
  const { blocked } = rateLimit("track:" + (ip || visitorId), { limit: LIMIT_PER_MIN, windowMs: 60000 });
  // 막혀도 200으로 답한다. 실패를 알려줘봐야 브라우저가 할 수 있는 게 없고,
  // 재시도를 유발하면 오히려 더 많이 두드린다.
  // (설정 확인보다 먼저 둔다 — 뒤에 두면 설정 없는 환경에서 제한이 도는지 확인할 수가 없다)
  if (blocked) return Response.json({ ok: true, dropped: true });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // 설정이 없으면 조용히 넘어간다 — 통계 때문에 사용자 화면에 오류를 띄울 이유가 없다.
  if (!url || !key) return Response.json({ ok: true, skipped: true });

  const list = Array.isArray(body?.e) ? body.e.slice(0, MAX_BATCH) : [];
  if (!list.length) return Response.json({ ok: true });

  const campaign = cut(body?.c, 40);
  const userId = UUID.test(String(body?.u || "")) ? String(body.u) : null;

  const rows = [];
  for (const it of list) {
    const name = cut(it?.n, 40);
    if (!name || !NAMES.has(name)) continue; // 모르는 이름은 버린다
    rows.push({
      visitor_id: visitorId,
      campaign_code: campaign,
      user_id: userId,
      name,
      label: cut(it?.l, 80),
      path: cut(it?.p, 200),
    });
  }
  if (!rows.length) return Response.json({ ok: true });

  const supa = createClient(url, key, { auth: { persistSession: false } });
  try {
    await supa.from("mkt_events").insert(rows);
  } catch (e) {
    // 표가 아직 없거나(SQL 실행 전) 일시 오류여도 사용자 화면에는 영향이 없어야 한다
    return Response.json({ ok: true, stored: false });
  }
  return Response.json({ ok: true, stored: rows.length });
}
