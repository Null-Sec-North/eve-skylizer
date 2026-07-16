import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("defines the supported 1024px-to-4K desktop layout contract", () => {
  assert.match(css, /min-width:\s*1024px/);
  assert.match(css, /--shell-max:\s*2200px/);
  assert.match(css, /--shell-gutter:\s*clamp\(/);
  assert.match(css, /@media\s*\(max-width:\s*1100px\)/);
  assert.match(css, /@media\s*\(min-width:\s*1920px\)/);
});

test("uses fluid grids without the former fixed 1440px shell", () => {
  assert.doesNotMatch(css, /width:\s*min\(1440px/);
  assert.match(css, /grid-template-columns:\s*minmax\(0,/);
  assert.match(css, /overflow-x:\s*clip/);
  assert.match(css, /font-size:\s*clamp\(/);
});
