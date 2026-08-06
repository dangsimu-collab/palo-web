// Supabase Storage에 있는 기존 이미지를 Cloudflare R2로 옮기고, DB의 주소를 새 것으로 바꾼다.
//
//   node scripts/migrate-storage-to-r2.mjs          ← 무엇이 바뀌는지 보기만 함(기본)
//   node scripts/migrate-storage-to-r2.mjs --apply  ← 실제로 복사하고 DB를 수정
//
// 안전장치:
//  · 기본은 미리보기다. --apply 를 붙여야 실제로 쓴다.
//  · 원본은 지우지 않는다. 문제가 생기면 DB 주소만 되돌리면 원상복구된다.
//  · 이미 R2 주소인 행은 건너뛴다(여러 번 실행해도 안전).
import { createClient } from "@supabase/supabase-js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync } from "node:fs";

// .env.local 을 직접 읽는다(별도 패키지 없이)
function loadEnv() {
  try {
    for (const line of readFileSync(".env.local", "utf8").split("\n")) {
      const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
    }
  } catch (e) { /* 없으면 실제 환경변수를 쓴다 */ }
}
loadEnv();

const APPLY = process.argv.includes("--apply");

const need = ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY",
  "R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET", "R2_PUBLIC_BASE"];
const missing = need.filter((k) => !process.env[k]);
if (missing.length) {
  console.error("환경변수가 없습니다:", missing.join(", "));
  process.exit(1);
}

const PUBLIC_BASE = process.env.R2_PUBLIC_BASE.replace(/\/+$/, "");

const supa = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } });

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// 어떤 표의 어떤 칸에 이미지 주소가 들어 있는지
const TARGETS = [
  { table: "post_images", col: "url", folder: "post" },
  { table: "profiles", col: "avatar_url", folder: "avatar" },
  { table: "profiles", col: "cover_url", folder: "cover" },
  { table: "commission_images", col: "url", folder: "commission" },
  { table: "commission_worksample_images", col: "url", folder: "worksample" },
  { table: "user_ads", col: "image_url", folder: "ad" },
];

const EXT_BY_TYPE = {
  "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp",
  "image/gif": "gif", "image/bmp": "bmp",
};

const seen = new Map(); // 같은 주소가 여러 행에 있으면 한 번만 복사
let copied = 0, rewritten = 0, skipped = 0, failed = 0;

async function moveOne(url, folder) {
  if (seen.has(url)) return seen.get(url);

  const res = await fetch(url);
  if (!res.ok) { failed++; console.log(`  ✗ 내려받기 실패(${res.status}) ${url}`); return null; }
  const type = res.headers.get("content-type") || "application/octet-stream";
  const buf = Buffer.from(await res.arrayBuffer());
  const ext = EXT_BY_TYPE[type] || (url.split(".").pop() || "bin").split("?")[0];
  // 원본 파일명을 살려 어떤 파일인지 알아볼 수 있게 한다("legacy/" 로 옛 파일임을 표시)
  const base = decodeURIComponent(url.split("/").pop().split("?")[0]).replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 60);
  const key = `${folder}/legacy/${base}.${ext}`;
  const newUrl = `${PUBLIC_BASE}/${key}`;

  if (APPLY) {
    await r2.send(new PutObjectCommand({
      Bucket: process.env.R2_BUCKET, Key: key, Body: buf, ContentType: type,
      CacheControl: "public, max-age=31536000, immutable",
    }));
  }
  copied++;
  console.log(`  ${APPLY ? "복사" : "복사 예정"} ${(buf.length / 1024).toFixed(0)}KB  → ${key}`);
  seen.set(url, newUrl);
  return newUrl;
}

for (const t of TARGETS) {
  const { data, error } = await supa.from(t.table).select(`id,${t.col}`);
  if (error) { console.log(`\n[${t.table}.${t.col}] 건너뜀 — ${error.message}`); continue; }
  const rows = (data || []).filter((r) => r[t.col]);
  console.log(`\n[${t.table}.${t.col}] ${rows.length}행`);
  for (const row of rows) {
    const url = row[t.col];
    if (url.startsWith(PUBLIC_BASE)) { skipped++; continue; } // 이미 옮긴 것
    if (!/\/storage\/v1\/object\/public\//.test(url)) { skipped++; continue; } // Supabase 주소가 아님
    const newUrl = await moveOne(url, t.folder);
    if (!newUrl) continue;
    if (APPLY) {
      const up = await supa.from(t.table).update({ [t.col]: newUrl }).eq("id", row.id);
      if (up.error) { failed++; console.log(`  ✗ DB 수정 실패 ${t.table}#${row.id}: ${up.error.message}`); continue; }
    }
    rewritten++;
  }
}

// 글 본문(HTML) 안에 박혀 있는 <img src> 도 함께 바꾼다
{
  const { data, error } = await supa.from("posts").select("id,content_html").not("content_html", "is", null);
  if (error) console.log(`\n[posts.content_html] 건너뜀 — ${error.message}`);
  else {
    const rows = (data || []).filter((r) => /\/storage\/v1\/object\/public\//.test(r.content_html || ""));
    console.log(`\n[posts.content_html] 본문에 옛 주소가 있는 글 ${rows.length}개`);
    for (const row of rows) {
      let html = row.content_html;
      const urls = html.match(/https?:\/\/[^"'\s)]+\/storage\/v1\/object\/public\/[^"'\s)]+/g) || [];
      for (const u of urls) {
        const newUrl = await moveOne(u, "post");
        if (newUrl) html = html.split(u).join(newUrl);
      }
      if (html !== row.content_html) {
        if (APPLY) {
          const up = await supa.from("posts").update({ content_html: html }).eq("id", row.id);
          if (up.error) { failed++; console.log(`  ✗ 본문 수정 실패 #${row.id}: ${up.error.message}`); continue; }
        }
        rewritten++;
        console.log(`  ${APPLY ? "본문 수정" : "본문 수정 예정"} 글 #${row.id} (${urls.length}개 주소)`);
      }
    }
  }
}

console.log(`\n${"=".repeat(50)}`);
console.log(`복사 ${copied}개 · 주소 교체 ${rewritten}건 · 건너뜀 ${skipped}건 · 실패 ${failed}건`);
if (!APPLY) console.log("\n지금은 미리보기입니다. 실제로 적용하려면 --apply 를 붙여 다시 실행하세요.");
else console.log("\n완료. 원본은 Supabase에 그대로 남아 있으니, 문제가 없으면 나중에 지우세요.");
