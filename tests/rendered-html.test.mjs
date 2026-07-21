import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("static export contains the complete diagram atlas", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /Engineering Visual Atlas/i);
  assert.match(html, /Service Architecture/);
  assert.match(html, /Cache Hierarchy/);
  assert.equal((html.match(/diagram-card/g) ?? []).length >= 10, true);
});
