import { formatPenniesToDollars, formatDollarsToPennies } from "@nxs-math/currency";
import { roundToHundreth } from "@nxs-math/toHundreth";

describe("formatPenniesToDollars", () => {
  it("converts whole-cent amounts to a 2-decimal dollar string", () => {
    expect(formatPenniesToDollars(100)).toBe("1.00");
    expect(formatPenniesToDollars(2599)).toBe("25.99");
    expect(formatPenniesToDollars(0)).toBe("0.00");
  });

  it("handles single-digit cent amounts (pads to 2 decimals)", () => {
    expect(formatPenniesToDollars(5)).toBe("0.05");
  });

  it("rounds toward zero per Number.toFixed semantics for non-integer pennies", () => {
    // toFixed rounds — locking in the JS default behavior
    expect(formatPenniesToDollars(199.5)).toBe("2.00");
  });
});

describe("formatDollarsToPennies", () => {
  it("multiplies dollars by 100 to produce pennies", () => {
    expect(formatDollarsToPennies(1)).toBe(100);
    expect(formatDollarsToPennies(25.99)).toBeCloseTo(2599, 5);
    expect(formatDollarsToPennies(0)).toBe(0);
  });
});

describe("roundToHundreth", () => {
  it("rounds up to the nearest hundredth (Math.ceil semantics)", () => {
    expect(roundToHundreth(1.234)).toBe(1.24);
    expect(roundToHundreth(1.231)).toBe(1.24);
    // exact values are preserved
    expect(roundToHundreth(1.23)).toBe(1.23);
  });

  it("rounds zero and integers without changes", () => {
    expect(roundToHundreth(0)).toBe(0);
    expect(roundToHundreth(5)).toBe(5);
  });

  it("rounds negatives toward zero (Math.ceil)", () => {
    // Math.ceil(-1.234 * 100) / 100 = Math.ceil(-123.4) / 100 = -123 / 100 = -1.23
    expect(roundToHundreth(-1.234)).toBe(-1.23);
  });
});
