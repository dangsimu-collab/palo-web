// 파일 삭제(커미션을 지울 때 딸린 이미지 정리용).
//
// 예전에는 Supabase Storage의 버킷 정책이 "본인 uid 폴더만 지울 수 있게" 막아줬다.
// R2에는 그런 정책이 없으므로 **여기서 직접 확인한다** — 키가 `<폴더>/<본인 uid>/…`
// 형태가 아니면 건너뛴다. 그렇지 않으면 남의 이미지를 지울 수 있다.
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { createClient } from "@supabase/supabase-js";
import { r2Client, r2Configured, R2_BUCKET, FOLDERS, keyFromPublicUrl } from "../../../../lib/r2";

export const runtime = "nodejs";

const MAX_KEYS = 100; // 한 번에 지울 수 있는 개수(비정상적으로 큰 요청 차단)

function bad(message, status = 400) {
  return Response.json({ ok: false, message }, { status });
}

export async function POST(request) {
  if (!r2Configured()) return bad("저장소 설정이 준비되지 않았어요.", 500);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const svc = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !svc) return bad("서버 설정이 준비되지 않았어요.", 500);

  let body;
  try { body = await request.json(); } catch (e) { return bad("요청을 읽지 못했어요."); }

  const urls = Array.isArray(body?.urls) ? body.urls.slice(0, MAX_KEYS) : [];
  if (!urls.length) return Response.json({ ok: true, deleted: 0 });

  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return bad("로그인이 필요해요.", 401);

  const supa = createClient(url, svc, { auth: { persistSession: false } });
  const { data: userData, error: userErr } = await supa.auth.getUser(token);
  const user = userData?.user;
  if (userErr || !user) return bad("로그인이 필요해요.", 401);

  // 본인 파일만 남긴다
  const keys = [];
  for (const u of urls) {
    const key = keyFromPublicUrl(u);
    if (!key) continue;                     // 우리 저장소 주소가 아님(예전 Supabase URL)
    const parts = key.split("/");
    if (parts.length < 3) continue;
    if (!FOLDERS.has(parts[0])) continue;
    if (parts[1] !== user.id) continue;     // ← 남의 폴더면 제외
    keys.push({ Key: key });
  }
  if (!keys.length) return Response.json({ ok: true, deleted: 0 });

  try {
    await r2Client().send(new DeleteObjectsCommand({
      Bucket: R2_BUCKET,
      Delete: { Objects: keys, Quiet: true },
    }));
    return Response.json({ ok: true, deleted: keys.length });
  } catch (e) {
    // 파일이 남아도 서비스 동작에는 지장이 없으므로 실패를 조용히 알린다
    return bad("일부 파일을 지우지 못했어요.", 502);
  }
}
