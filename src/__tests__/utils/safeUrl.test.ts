import { safeUrl } from "../../utils/data/safeUrl";

// safeUrl is the XSS guard for every anchor href in the library (Post, PostDetail,
// Navlink, ListItem, Footer, Hyperlink, UnsplashCredit). React escapes link TEXT
// but not the URL scheme, so these assertions lock the dangerous-scheme rejection.
describe("safeUrl", () => {
  it("neutralizes javascript: URLs to #", () => {
    expect(safeUrl("javascript:alert(document.cookie)")).toBe("#");
    expect(safeUrl("JavaScript:alert(1)")).toBe("#");
  });

  it("neutralizes javascript: smuggled with control chars/whitespace", () => {
    // Browsers ignore tabs/newlines when resolving the scheme, so these execute
    // unless stripped before the check.
    expect(safeUrl("java\tscript:alert(1)")).toBe("#");
    expect(safeUrl("java\nscript:alert(1)")).toBe("#");
    expect(safeUrl("  javascript:alert(1)")).toBe("#");
  });

  it("neutralizes other dangerous schemes", () => {
    expect(safeUrl("data:text/html,<script>alert(1)</script>")).toBe("#");
    expect(safeUrl("vbscript:msgbox(1)")).toBe("#");
  });

  it("allows safe absolute schemes unchanged", () => {
    expect(safeUrl("https://companyuno.com")).toBe("https://companyuno.com");
    expect(safeUrl("http://example.com/path?q=1")).toBe("http://example.com/path?q=1");
    expect(safeUrl("mailto:hi@companyuno.com")).toBe("mailto:hi@companyuno.com");
    expect(safeUrl("tel:+15555551234")).toBe("tel:+15555551234");
  });

  it("allows scheme-less URLs (relative, root, anchor, query, protocol-relative)", () => {
    expect(safeUrl("/dashboard")).toBe("/dashboard");
    expect(safeUrl("./about")).toBe("./about");
    expect(safeUrl("#section")).toBe("#section");
    expect(safeUrl("?tab=home")).toBe("?tab=home");
    expect(safeUrl("//cdn.example.com/x")).toBe("//cdn.example.com/x");
    expect(safeUrl("example.com/path")).toBe("example.com/path");
  });

  it("returns # for empty/missing input", () => {
    expect(safeUrl(undefined)).toBe("#");
    expect(safeUrl(null)).toBe("#");
    expect(safeUrl("")).toBe("#");
    expect(safeUrl("   ")).toBe("#");
  });
});
