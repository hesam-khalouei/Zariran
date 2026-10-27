import { describe, it, expect } from "vitest";
import { toFaDigits, toEnDigits, formatNumberFa, formatRelativeFa } from "../src/lib/persian";

describe("toFaDigits", () => {
  it("converts ASCII digits", () => {
    expect(toFaDigits("2024")).toBe("۲۰۲۴");
    expect(toFaDigits(123)).toBe("۱۲۳");
  });
  it("leaves non-digits untouched", () => {
    expect(toFaDigits("a1b2")).toBe("a۱b۲");
  });
});

describe("toEnDigits", () => {
  it("roundtrips", () => {
    expect(toEnDigits(toFaDigits("1234567890"))).toBe("1234567890");
  });
});

describe("formatNumberFa", () => {
  it("groups thousands and converts digits", () => {
    expect(formatNumberFa(12345)).toBe("۱۲,۳۴۵");
  });
});

describe("formatRelativeFa", () => {
  it("today / yesterday", () => {
    const now = new Date("2025-01-10T12:00:00Z");
    expect(formatRelativeFa(new Date("2025-01-10T08:00:00Z"), now)).toBe("امروز");
    expect(formatRelativeFa(new Date("2025-01-09T08:00:00Z"), now)).toBe("دیروز");
  });
});