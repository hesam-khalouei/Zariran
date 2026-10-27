type ClassValue = string | number | null | undefined | false | ClassValue[];

function flatten(input: ClassValue): string[] {
  if (Array.isArray(input)) return input.flatMap(flatten);
  if (typeof input === "string" || typeof input === "number") {
    const s = String(input).trim();
    return s ? s.split(/\s+/) : [];
  }
  return [];
}

export function cn(...inputs: ClassValue[]): string {
  const tokens = flatten(inputs);
  const out: string[] = [];
  const used = new Set<string>();
  for (let i = tokens.length - 1; i >= 0; i--) {
    const t = tokens[i];
    const m = t.match(/^([a-z]+(?:-[a-z]+)?)-/);
    const key = (m ? m[1] : t) + "::" + t.replace(/^[a-z-]+-/, "");
    if (used.has(key)) continue;
    used.add(key);
    out.unshift(t);
  }
  return out.join(" ");
}