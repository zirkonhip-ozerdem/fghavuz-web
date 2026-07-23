import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import test from "node:test";

async function render(path = "/en") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const {default: worker} = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: {accept: "text/html"},
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", {status: 404}),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the FGPOOL homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Professional Swimming Pool Equipment Manufacturer/i);
  assert.match(html, /Engineered Components/i);
  assert.match(html, /The FGPOOL Advantage/i);
  assert.match(html, /Global Installations/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("keeps localized content and starter metadata out of source", async () => {
  const [packageJson, english, turkish, arabic] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../messages/en.json", import.meta.url), "utf8"),
    readFile(new URL("../messages/tr.json", import.meta.url), "utf8"),
    readFile(new URL("../messages/ar.json", import.meta.url), "utf8"),
  ]);

  assert.match(packageJson, /"name": "fgpool-web"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(english, /Request Quote/);
  assert.match(turkish, /Teklif Al/);
  assert.match(arabic, /طلب عرض/);
});
