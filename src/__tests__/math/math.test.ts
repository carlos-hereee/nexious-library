// JSDoc examples on each function already document the expected behaviour.
// These tests assert those examples directly so they serve as a regression guard.
import { add } from "@nxs-math/add";
import { multiply } from "@nxs-math/multiply";
import { subtract } from "@nxs-math/subtract";

describe("add", () => {
  it("returns the sum of two numbers", () => {
    expect(add(3, 6)).toBe(9);
    expect(add(4, 5)).toBe(9);
    expect(add(1, 6)).toBe(7);
  });

  it("handles negative numbers", () => {
    expect(add(-1, 1)).toBe(0);
    expect(add(-5, -3)).toBe(-8);
  });

  it("handles zero", () => {
    expect(add(0, 0)).toBe(0);
    expect(add(5, 0)).toBe(5);
  });
});

describe("subtract", () => {
  it("returns the difference of two numbers", () => {
    expect(subtract(3, 6)).toBe(-3);
    expect(subtract(4, 5)).toBe(-1);
    expect(subtract(1, 6)).toBe(-5);
  });

  it("handles negative numbers", () => {
    expect(subtract(-1, -1)).toBe(0);
    expect(subtract(-5, 3)).toBe(-8);
  });
});

describe("multiply", () => {
  it("returns the product of two numbers", () => {
    expect(multiply(3, 6)).toBe(18);
    expect(multiply(4, 5)).toBe(20);
    expect(multiply(1, 6)).toBe(6);
  });

  it("handles zero", () => {
    expect(multiply(0, 100)).toBe(0);
  });

  it("handles negative numbers", () => {
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(-2, -3)).toBe(6);
  });
});
