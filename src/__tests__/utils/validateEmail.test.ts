import { validateEmail } from "@nxs-utils/form/validateEmail";
import { isMatch } from "@nxs-utils/form/matchingPassword";

describe("validateEmail", () => {
  it.each([
    ["user@example.com"],
    ["first.last@example.co"],
    ["a.b-c@sub.example.com"],
    ["first_last@example.io"],
  ])("returns true for valid email %s", (mail) => {
    expect(validateEmail(mail)).toBe(true);
  });

  it.each([
    [""],
    ["plainaddress"],
    ["@no-local.com"],
    ["no-at-sign.com"],
    ["spaces in@name.com"],
    ["double@@example.com"],
    ["trailing@example."],
  ])("returns false for invalid email %s", (mail) => {
    expect(validateEmail(mail)).toBe(false);
  });
});

describe("isMatch", () => {
  it("returns true when both passwords are identical", () => {
    expect(isMatch("secret123", "secret123")).toBe(true);
  });

  it("returns false when passwords differ", () => {
    expect(isMatch("secret123", "secret124")).toBe(false);
  });

  it("is case-sensitive", () => {
    expect(isMatch("Secret", "secret")).toBe(false);
  });

  it("treats two empty strings as matching (consistent with === semantics)", () => {
    expect(isMatch("", "")).toBe(true);
  });
});
