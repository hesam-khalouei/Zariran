import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const TOKENS = join(process.cwd(), "tokens");

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith(".json")) out.push(p);
  }
  return out;
}

interface Token { $value: unknown; $type?: string }

function flatten(obj: Record<string, unknown>, prefix = "", acc: Record<string, Token> = {}) {
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith("$")) continue;
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object") {
      if ("$value" in (v as object)) acc[path] = v as Token;
      else flatten(v as Record<string, unknown>, path, acc);
    }
  }
  return acc;
}

function loadAll(): Record<string, Token> {
  const files = walk(TOKENS).filter((f) => !f.includes("themes") && !f.endsWith("figma-tokens.json"));
  const merged: Record<string, Token> = {};
  for (const f of files) {
    const parsed = JSON.parse(readFileSync(f, "utf8")) as Record<string, unknown>;
    Object.assign(merged, flatten(parsed));
  }
  return merged;
}

function resolveAlias(value: unknown, flat: Record<string, Token>, seen = new Set<string>()): unknown {
  if (typeof value !== "string") return value;
  const m = value.match(/^\{(.+)\}$/);
  if (!m) return value;
  const target = m[1];
  if (seen.has(target)) throw new Error(`cyclic: ${target}`);
  if (!(target in flat)) throw new Error(`unresolved: {${target}}`);
  seen.add(target);
  return resolveAlias(flat[target].$value, flat, seen);
}

describe("design tokens", () => {
  it("all JSON files parse", () => {
    for (const f of walk(TOKENS)) {
      expect(() => JSON.parse(readFileSync(f, "utf8")), f).not.toThrow();
    }
  });

  it("every alias resolves", () => {
    const flat = loadAll();
    const failures: string[] = [];
    for (const [path, tok] of Object.entries(flat)) {
      try { resolveAlias(tok.$value, flat); }
      catch (e) { failures.push(`${path}: ${(e as Error).message}`); }
    }
    expect(failures).toEqual([]);
  });

  it("has brand primitives", () => {
    const flat = loadAll();
    for (const fam of ["lapis", "turquoise", "saffron", "pomegranate", "pistachio", "stoneWarm", "ink"]) {
      expect(flat[`color.primitive.${fam}.500`], fam).toBeDefined();
    }
  });
});