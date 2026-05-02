import { isDefined, isFile } from "@nxs-utils/tsChecker/isDefined";
import { isAsset } from "@nxs-utils/tsChecker/isAsset";
import { isNumber } from "@nxs-utils/tsChecker/isNumber";
import { isArray, arrayLen } from "@nxs-utils/tsChecker/isArray";

describe("isDefined", () => {
  it("returns false for null/undefined", () => {
    expect(isDefined(undefined)).toBe(false);
    expect(isDefined(null)).toBe(false);
  });

  it('returns false for the strings "undefined" and "null"', () => {
    expect(isDefined("undefined")).toBe(false);
    expect(isDefined("null")).toBe(false);
  });

  it("returns false for empty string and zero (the !data branch)", () => {
    expect(isDefined("")).toBe(false);
    expect(isDefined(0)).toBe(false);
  });

  it("returns true for non-empty strings, non-zero numbers, objects, and arrays", () => {
    expect(isDefined("alice")).toBe(true);
    expect(isDefined(42)).toBe(true);
    expect(isDefined({})).toBe(true);
    expect(isDefined([])).toBe(true);
  });
});

describe("isFile", () => {
  it("returns true for File and Blob instances", () => {
    expect(isFile(new File(["x"], "x.txt"))).toBe(true);
    expect(isFile(new Blob(["x"]))).toBe(true);
  });

  it("returns false for other values", () => {
    expect(isFile("not a file")).toBe(false);
    expect(isFile(undefined)).toBe(false);
    expect(isFile({})).toBe(false);
  });
});

describe("isAsset", () => {
  it("returns true for File and Blob instances", () => {
    expect(isAsset(new File(["x"], "x.txt"))).toBe(true);
    expect(isAsset(new Blob(["x"]))).toBe(true);
  });

  it("returns false for any other value", () => {
    expect(isAsset(undefined)).toBe(false);
    expect(isAsset("file.png")).toBe(false);
    expect(isAsset({})).toBe(false);
  });
});

describe("isNumber", () => {
  it("returns true for zero (explicit special case)", () => {
    expect(isNumber(0)).toBe(true);
  });

  it("returns true for any non-zero number", () => {
    expect(isNumber(42)).toBe(true);
    expect(isNumber(-1)).toBe(true);
    expect(isNumber(1.5)).toBe(true);
  });

  it("returns false for non-numbers and falsy non-numeric values", () => {
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber("42")).toBe(false);
    expect(isNumber("")).toBe(false);
  });
});

describe("isArray", () => {
  it("delegates to Array.isArray", () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray("nope")).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray(undefined)).toBe(false);
  });
});

describe("arrayLen", () => {
  it("returns 0 for non-arrays and undefined", () => {
    expect(arrayLen(undefined)).toBe(0);
    expect(arrayLen(null)).toBe(0);
    expect(arrayLen("not an array")).toBe(0);
    expect(arrayLen({})).toBe(0);
  });

  it("returns the length of an array", () => {
    expect(arrayLen([])).toBe(0);
    expect(arrayLen([1, 2, 3])).toBe(3);
  });
});
