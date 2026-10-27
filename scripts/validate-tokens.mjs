#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const TOKENS = join(ROOT, "tokens");
const errors = [];

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith(".json")) out.push(p);
  }
  return out;
}

function flatten(obj, prefix = "", acc = {}) {
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    if ("$value" in obj) { acc[prefix] = obj; return acc; }
    for (const [k, v] of Object.entries(obj)) {
      if (k.startsWith("$")) continue;
      flatten(v, prefix ? `${prefix}.${k}` : k, acc);
    }
  }
  return acc;
}

function resolveAlias(value, flat, seen = new Set()) {
  if (typeof value !== "string") return value;
  const m = value.match(/^\{(.+)\}$/);
  if (!m) return value;
  const target = m[1];
  if (seen.has(target)) throw new Error(`cyclic: ${target}`);
  if (!(target in flat)) throw new Error(`unresolved: {${target}}`);
  seen.add(target);
  return resolveAlias(flat[target].$value, flat, seen);
}

const files = walk(TOKENS);
for (const f of files) {
  try { JSON.parse(readFileSync(f, "utf8")); }
  catch (e) { errors.push(`[parse] ${relative(ROOT, f)}: ${e.message}`); }
}

const flat = {};
for (const f of files) {
  if (f.includes("themes") || f.endsWith("figma-tokens.json")) continue;
  const parsed = JSON.parse(readFileSync(f, "utf8"));
  Object.assign(flat, flatten(parsed));
}

for (const [path, tok] of Object.entries(flat)) {
  try { resolveAlias(tok.$value, flat); }
  catch (e) { errors.push(`[alias] ${path}: ${e.message}`); }
}

console.log(`files=${files.length} tokens=${Object.keys(flat).length} errors=${errors.length}`);
for (const e of errors) console.error("ERROR " + e);
if (errors.length) process.exit(1);
console.log("OK: all aliases resolved.");