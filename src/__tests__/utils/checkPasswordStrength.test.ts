import { checkPasswordStrength } from "@nxs-utils/form/checkPasswordStrength";

describe("checkPasswordStrength", () => {
  it("scores 0 (Easy to guess) for an empty password", () => {
    const result = checkPasswordStrength("");
    expect(result.strength).toBe(0);
    expect(result.ease).toBe("Easy to guess");
    // expects tips for length, casing, numbers, special chars
    expect(result.tips.length).toBeGreaterThan(0);
    expect(result.tips.some((t) => /8 characters/.test(t))).toBe(true);
  });

  it("includes a length-remaining tip when password is shorter than 8 chars", () => {
    const result = checkPasswordStrength("ab");
    expect(result.tips.some((t) => /6 character\(s\) left/.test(t))).toBe(true);
  });

  it("scores 1 for a long lowercase-only password (length only)", () => {
    const result = checkPasswordStrength("abcdefgh");
    expect(result.strength).toBe(1);
    expect(result.ease).toBe("Moderate difficulty");
  });

  it("scores 2 when length and casing are satisfied", () => {
    const result = checkPasswordStrength("AbcdefgH");
    expect(result.strength).toBe(2);
    expect(result.ease).toBe("Hard");
  });

  it("scores 3 when length + casing + numbers are satisfied", () => {
    const result = checkPasswordStrength("Abcdefg1");
    expect(result.strength).toBe(3);
    expect(result.ease).toBe("Difficult");
  });

  it("scores 4 (max) when all four checks pass — note: ease only maps 0-3 so reads undefined", () => {
    // This documents an edge in the source: errorMessage map only has keys 0..3.
    const result = checkPasswordStrength("Abcdefg1!");
    expect(result.strength).toBe(4);
    expect(result.ease).toBeUndefined();
    expect(result.tips).toEqual([]);
  });

  it("emits a 'lowercase and uppercase' tip when only one case is present", () => {
    const result = checkPasswordStrength("ABCDEFG1!");
    expect(result.tips.some((t) => /lowercase and uppercase/i.test(t))).toBe(true);
  });

  it("emits a 'number' tip when no digit is present", () => {
    const result = checkPasswordStrength("Abcdefgh!");
    expect(result.tips.some((t) => /number/i.test(t))).toBe(true);
  });
});
