import assert from "node:assert/strict";
import {access, readFile} from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function exists(path) {
  try {
    await access(new URL(path, root));
    return true;
  } catch {
    return false;
  }
}

test("uses standard Next.js scripts without Vinext tooling", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("package.json", root), "utf8"),
  );

  assert.equal(packageJson.scripts.dev, "next dev");
  assert.equal(packageJson.scripts.build, "next build");
  assert.equal(packageJson.scripts.start, "next start");

  const allPackages = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  for (const name of [
    "vinext",
    "vite",
    "wrangler",
    "@cloudflare/vite-plugin",
    "@vitejs/plugin-react",
    "@vitejs/plugin-rsc",
    "react-server-dom-webpack",
  ]) {
    assert.equal(allPackages[name], undefined);
  }
});

test("keeps locale content and brand logo contract intact", async () => {
  const [english, turkish, arabic, logo] = await Promise.all([
    readFile(new URL("messages/en.json", root), "utf8"),
    readFile(new URL("messages/tr.json", root), "utf8"),
    readFile(new URL("messages/ar.json", root), "utf8"),
    readFile(new URL("components/layout/Logo.tsx", root), "utf8"),
  ]);

  assert.match(english, /Request Quote/);
  assert.match(turkish, /Teklif Al/);
  assert.match(arabic, /طلب عرض/);
  assert.match(logo, /src="\/assets\/logo\.png"/);
  assert.doesNotMatch(logo, /next\/image|_vinext\/image/);
});

test("removes adapter and hosting starter files", async () => {
  for (const path of [
    "vite.config.ts",
    "worker/index.ts",
    "build/sites-vite-plugin.ts",
    ".openai/hosting.json",
    "app/chatgpt-auth.ts",
  ]) {
    assert.equal(await exists(path), false, `${path} should not exist`);
  }
});
