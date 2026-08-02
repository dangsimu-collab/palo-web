// 웹 푸시 발송 엔드포인트 (Vercel 서버리스)
// Supabase 데이터베이스 웹훅이 notifications INSERT 때 여기로 POST를 보내면,
// 그 알림을 받을 유저의 구독(push_subscriptions)으로 실제 기기 푸시를 전송한다.
import webpush from "web-push";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs"; // web-push는 Node 런타임 필요

// 알림 type → 알림설정 토글 키 매핑 (해당 토글이 꺼져 있으면 발송 안 함)
const TYPE_PREF = { cm: "cm", like: "like", chat: "chat", notice: "notice", cm_inquiry: "cminquiry" };
// 토글과 무관하게 항상 보내는 알림 (본인 광고 반려 통보 · 관리자 후기조작 경보)
const ALWAYS = new Set(["ad_rejected", "review_alert"]);

function targetUrl(row) {
  if (row.link_post_id) return "/post/" + row.link_post_id;
  return "/";
}

export async function POST(request) {
  // 1) 웹훅 비밀 검증 (Supabase 웹훅 헤더로 넘어온 비밀과 대조)
  const secret = request.headers.get("x-push-secret");
  if (!process.env.PUSH_WEBHOOK_SECRET || secret !== process.env.PUSH_WEBHOOK_SECRET) {
    return new Response("unauthorized", { status: 401 });
  }

  let body;
  try { body = await request.json(); } catch (e) { return new Response("bad request", { status: 400 }); }
  const row = body && (body.record || body); // Supabase 웹훅은 {type,table,record,...} 형태
  if (!row || !row.user_id) return Response.json({ skipped: "no record" });

  const type = row.type;
  const prefKey = TYPE_PREF[type];

  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:dangsimu@gmail.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );

  // 서버 전용 service_role 키로 구독 조회 (RLS 우회)
  const supa = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const { data: subs } = await supa
    .from("push_subscriptions")
    .select("endpoint,p256dh,auth,prefs")
    .eq("user_id", row.user_id);
  if (!subs || !subs.length) return Response.json({ sent: 0 });

  const payload = JSON.stringify({
    title: "commi",
    body: row.content || "새 알림이 도착했어요",
    tag: (type || "notif") + "-" + row.user_id,
    url: targetUrl(row),
  });

  let sent = 0;
  for (const s of subs) {
    // 이 유저가 해당 알림 종류를 꺼뒀으면 건너뜀
    if (!ALWAYS.has(type) && prefKey && s.prefs && s.prefs[prefKey] === false) continue;
    try {
      await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload);
      sent++;
    } catch (err) {
      // 만료·해지된 구독(404/410)은 정리
      if (err && (err.statusCode === 404 || err.statusCode === 410)) {
        await supa.from("push_subscriptions").delete().eq("endpoint", s.endpoint);
      }
    }
  }
  return Response.json({ sent });
}
