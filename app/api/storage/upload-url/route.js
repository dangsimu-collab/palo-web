// 업로드용 서명 URL 발급.
//
// 브라우저가 R2에 직접 PUT 하도록 짧은 수명의 서명 URL을 내준다.
// 파일이 서버를 거치지 않으므로 Vercel의 요청 본문 크기 제한(4.5MB)에 걸리지 않는다
// — GIF는 최대 40MB까지 올라가므로 이 방식이 사실상 필수다.
//
// ⚠️ 저장 경로(key)는 **서버가 만든다.** 클라이언트가 준 경로를 그대로 쓰면
//    남의 파일 경로를 지정해 덮어쓸 수 있다.
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createClient } from "@supabase/supabase-js";
import {
  r2Client, r2Configured, R2_BUCKET, FOLDERS, ALLOWED_TYPES, MAX_BYTES,
  buildKey, publicUrlFor,
} from "../../../../lib/r2";
import { rateLimit } from "../../../../lib/client-ip";

export const runtime = "nodejs";

const URL_TTL_SEC = 120; // 서명 URL 수명 — 업로드를 시작하기에 충분하고, 새어나가도 금방 만료된다

function bad(message, status = 400) {
  return Response.json({ ok: false, message }, { status });
}

export async function POST(request) {
  if (!r2Configured()) return bad("저장소 설정이 준비되지 않았어요.", 500);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return bad("서버 설정이 준비되지 않았어요.", 500);

  let body;
  try { body = await request.json(); } catch (e) { return bad("요청을 읽지 못했어요."); }

  const folder = String(body?.folder || "");
  const contentType = String(body?.contentType || "");
  const size = Number(body?.size || 0);

  if (!FOLDERS.has(folder)) return bad("허용되지 않은 업로드 위치예요.");
  if (!ALLOWED_TYPES.has(contentType)) return bad("이미지 파일만 올릴 수 있어요.");
  if (!(size > 0) || size > MAX_BYTES) return bad("40MB 이하 이미지만 올릴 수 있어요.");

  // 로그인 확인 — 익명 업로드를 막는다
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return bad("로그인이 필요해요.", 401);

  const supa = createClient(url, key, { auth: { persistSession: false } });
  const { data: userData, error: userErr } = await supa.auth.getUser(token);
  const user = userData?.user;
  if (userErr || !user) return bad("로그인이 필요해요.", 401);

  // 대량 업로드로 저장소를 낭비하는 것을 막는다(사람이 손으로 올리는 속도를 훨씬 웃돌 때만 걸림).
  // 서명 URL의 용량 상한을 R2가 강제하지는 않으므로, 발급 횟수를 제한해 남용을 막는다.
  if (rateLimit("upload:" + user.id, { limit: 60, windowMs: 60000 }).blocked) {
    return bad("잠시 후 다시 시도해주세요.", 429);
  }

  const objectKey = buildKey(folder, user.id, contentType);

  try {
    const signed = await getSignedUrl(
      r2Client(),
      // 서명에 포함된 헤더는 브라우저도 **똑같이 보내야** 서명이 맞는다.
      // 그래서 Content-Type만 넣는다(Cache-Control까지 넣으면 클라이언트가 빠뜨릴 때 403이 난다).
      // 캐시는 Cloudflare가 커스텀 도메인에서 처리한다.
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: objectKey,
        ContentType: contentType,
      }),
      { expiresIn: URL_TTL_SEC }
    );
    return Response.json({ ok: true, uploadUrl: signed, publicUrl: publicUrlFor(objectKey), key: objectKey });
  } catch (e) {
    return bad("업로드 준비에 실패했어요. 잠시 후 다시 시도해주세요.", 502);
  }
}
