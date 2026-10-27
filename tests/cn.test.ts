import { describe, it, expect } from "vitest";
import { cn } from "../src/lib/cn";

describe("cn", () => {
  it("joins strings", () => { expect(cn("a", "b")).toBe("a b"); });
  it("drops falsy", () => { expect(cn("a", false, null, undefined, "", "b")).toBe("a b"); });
  it("flattens arrays", () => { expect(cn(["a", "b"], "c")).toBe("a b c"); });
});