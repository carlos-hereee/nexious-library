/**
 * Footer: pins today's markup for a consumer that passes no `credit`, and checks the credit row a
 * tenant app draws under its own links (2026-11 item 431 Phase 2). The client's footer renders
 * through this component on every app, so the no credit shape must stay byte for byte as it was.
 */
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Footer from "@nxs-template/Footer";

expect.extend(toHaveNoViolations);

const YEAR = String(new Date().getFullYear());
// Built from parts so the no-script-url lint does not read the test fixture as a real script link.
const SCRIPT_URL = ["javascript", "alert(1)"].join(":");
const links = [
  { label: "Terms", href: "/terms" },
  { label: "Bad", href: SCRIPT_URL },
];
const credit = {
  label: "Built on Company Uno",
  links: [
    { label: "Terms", href: "https://www.companyuno.com/terms" },
    { label: "Privacy", href: "https://www.companyuno.com/privacy" },
  ],
};

// The footer prints the current year, so the pins carry YEAR in its place.
const markupOf = (container: HTMLElement) => container.innerHTML.split(YEAR).join("YEAR");

describe("Footer without credit", () => {
  // Captured from the 5.1.0 component before the credit prop existed. A change here is a change
  // every published consumer sees, so it needs a deliberate re capture, never a quiet edit.
  it("renders the 5.1.0 markup with only an app name", () => {
    const { container } = render(<Footer appName="Acme" />);
    expect(markupOf(container)).toBe(
      "<footer class=\"footer\"><div class=\"footer-content-wrapper\"></div><div class=\"w-max\"><span class=\"flex-center\">Acme © YEAR</span></div></footer>",
    );
  });

  it("renders the 5.1.0 markup with links and a class name", () => {
    const { container } = render(<Footer appName="Acme" className="app-footer" links={links} />);
    expect(markupOf(container)).toBe(
      "<footer class=\"app-footer\"><div class=\"footer-content-wrapper\"></div><nav class=\"footer-links\" aria-label=\"Footer\"><a href=\"/terms\" class=\"nav-link footer-link\"><span class=\"nav-label\">Terms</span></a><a href=\"#\" class=\"nav-link footer-link\"><span class=\"nav-label\">Bad</span></a></nav><div class=\"w-max\"><span class=\"flex-center\">Acme © YEAR</span></div></footer>",
    );
  });
});

describe("Footer with credit", () => {
  it("draws a second nav named by the caller's visible label, under the links", () => {
    render(<Footer appName="Acme" links={links} credit={credit} />);

    const creditNav = screen.getByRole("navigation", { name: "Built on Company Uno" });
    expect(screen.getByText("Built on Company Uno")).toBeVisible();
    expect(within(creditNav).getByRole("link", { name: "Terms" })).toHaveAttribute("href", "https://www.companyuno.com/terms");
    expect(within(creditNav).getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "https://www.companyuno.com/privacy");

    const mainNav = screen.getByRole("navigation", { name: "Footer" });
    expect(mainNav.nextElementSibling).toBe(creditNav);
  });

  it("sends every credit link through safeUrl and opens it in the same tab", () => {
    render(<Footer appName="Acme" credit={{ label: "Built on Company Uno", links: [{ label: "Bad", href: SCRIPT_URL }] }} />);
    const link = screen.getByRole("link", { name: "Bad" });
    expect(link).toHaveAttribute("href", "#");
    expect(link).not.toHaveAttribute("target");
  });

  it("gives two footers on one page distinct label ids", () => {
    render(
      <>
        <Footer appName="One" credit={credit} />
        <Footer appName="Two" credit={credit} />
      </>,
    );
    const ids = screen.getAllByText("Built on Company Uno").map((node) => node.id);
    expect(new Set(ids).size).toBe(2);
  });

  it("has no axe violations", async () => {
    const { container } = render(<Footer appName="Acme" links={links} credit={credit} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
