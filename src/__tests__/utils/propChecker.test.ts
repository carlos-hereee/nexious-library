import { propChecker } from "@nxs-utils/tsChecker/propChecker";

describe("propChecker", () => {
  // ── non-array input ────────────────────────────────────────────────────────
  it("returns null when arr is not an array", () => {
    expect(propChecker("not an array", "target")).toBeNull();
    expect(propChecker(42, "target")).toBeNull();
    expect(propChecker(null, "target")).toBeNull();
    expect(propChecker(undefined, "target")).toBeNull();
    expect(propChecker({}, "target")).toBeNull();
  });

  // ── matching types ─────────────────────────────────────────────────────────
  it("returns target when every element matches the target type", () => {
    expect(propChecker(["a", "b", "c"], "string")).toBe("string");
    expect(propChecker([1, 2, 3], 0)).toBe(0);
    expect(propChecker([true, false], true)).toBe(true);
  });

  it("returns target for an empty array (vacuously true)", () => {
    expect(propChecker([], "anything")).toBe("anything");
  });

  // ── mismatched types ───────────────────────────────────────────────────────
  it("returns null when an element does not match the target type", () => {
    expect(propChecker(["a", 1, "c"], "string")).toBeNull();
    expect(propChecker([1, "two", 3], 0)).toBeNull();
  });

  // ── typeof cannot distinguish: these are the cases we fixed ───────────────
  it("returns null when array contains a plain object but target is an array (fixed: typeof [] === typeof {})", () => {
    // Before the fix, typeof [] === typeof {} === "object" so this would have
    // incorrectly returned the target. isSameType now uses Array.isArray to distinguish.
    expect(propChecker([{}], [])).toBeNull();
    expect(propChecker([[]], {})).toBeNull();
  });

  it("distinguishes null from plain objects", () => {
    // typeof null === "object" — same as a real object — so this also needs the fix
    expect(propChecker([null], {})).toBeNull();
    expect(propChecker([{}], null)).toBeNull();
    expect(propChecker([null, null], null)).toBe(null);
  });

  it("passes when every element is a plain object and target is also a plain object", () => {
    expect(propChecker([{ a: 1 }, { b: 2 }], {})).toEqual({});
  });

  it("passes when every element is an array and target is also an array", () => {
    expect(
      propChecker(
        [
          [1, 2],
          [3, 4],
        ],
        []
      )
    ).toEqual([]);
  });
});
