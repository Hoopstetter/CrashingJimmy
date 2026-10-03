import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises';

const out = new URL('../dist/', import.meta.url);
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await copyFile(new URL('../index.html', import.meta.url), new URL('index.html', out));

await writeFile(
  new URL('_headers', out),
  `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
`,
  'utf8'
);

console.log('Prepared dist/ for Cloudflare Workers Static Assets.');
