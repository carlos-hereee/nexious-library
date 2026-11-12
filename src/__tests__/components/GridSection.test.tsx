import "@testing-library/jest-dom";
import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import GridSection from "@nxs-molecules/card/GridSection";
import StripeReadyGate from "@nxs-molecules/errors/StripeReadyGate";
import ErrorMessage from "@nxs-atoms/texts/ErrorMessage";

expect.extend(toHaveNoViolations);

// GridSection, StripeReadyGate and ErrorMessage's message mode (2026-11 item 337, Phase 5 repair),
// ported from the client's PluginSection.tsx and StripeReadyGate.tsx and reconciled from its
// features/app/components/ErrorMessage.tsx. Pinned: the labelled section and its focusable heading
// ref, the empty hint, the three gate states with linkComponent receiving `to`, the alert line in
// every mode, and jest-axe.

const AXE_OPTIONS = { rules: { region: { enabled: false } } };

type RouterLinkProps = { to: string; className?: string; "aria-label"?: string; children?: React.ReactNode };
const RouterLink = ({ to, className, "aria-label": ariaLabel, children }: RouterLinkProps) => (
  <a data-router-to={to} href={to} className={className} aria-label={ariaLabel}>
    {children}
  </a>
);

describe("GridSection", () => {
  it("is a section labelled by its focusable heading, holding a CardGrid", () => {
    const ref = createRef<HTMLHeadingElement>();
    render(
      <GridSection id="browse" title="Browse" supporting="Every plugin" action={<button type="button">Filter</button>} ref={ref}>
        <div>card</div>
      </GridSection>
    );
    const section = screen.getByRole("region", { name: "Browse" });
    expect(section).toHaveAttribute("id", "browse");
    const heading = screen.getByRole("heading", { level: 3, name: "Browse" });
    expect(ref.current).toBe(heading);
    expect(heading).toHaveAttribute("tabindex", "-1");
    ref.current?.focus();
    expect(heading).toHaveFocus();
    expect(section.querySelector(".nxs-card-grid")).toHaveTextContent("card");
  });

  it("swaps the grid for the empty hint and keeps the heading", () => {
    render(
      <GridSection id="enabled" title="Enabled" emptyHint="Nothing enabled yet" headingLevel={2}>
        <div>card</div>
      </GridSection>
    );
    expect(screen.getByRole("heading", { level: 2, name: "Enabled" })).toBeInTheDocument();
    expect(screen.getByText("Nothing enabled yet")).toHaveClass("nxs-grid-section-empty");
    expect(screen.queryByText("card")).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <GridSection id="browse" title="Browse" supporting="Every plugin">
        <div>card</div>
      </GridSection>
    );
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

const copy = {
  storeMissingTitle: "Set up your store",
  storeMissingBody: "Memberships need a store.",
  storeMissingAction: "Set up store",
  stripeTitle: "Finish Stripe",
  stripeBody: "Payments wait on Stripe.",
  stripeAction: "Finish Stripe setup",
};

describe("StripeReadyGate", () => {
  it("with no store renders only the set up link, through linkComponent with `to`", () => {
    const children = jest.fn(() => <p>content</p>);
    render(
      <StripeReadyGate storeMissing storeNotReady={false} setUpStorePath="/dashboard/store" finishStripe={() => {}} copy={copy} linkComponent={RouterLink}>
        {children}
      </StripeReadyGate>
    );
    expect(screen.getByRole("heading", { name: "Set up your store" })).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Set up store" });
    expect(link).toHaveAttribute("data-router-to", "/dashboard/store");
    expect(link).toHaveClass("nxs-btn", "nxs-btn-primary");
    expect(children).not.toHaveBeenCalled();
  });

  it("with Stripe unfinished renders the onboarding button, then the content view only", () => {
    const finishStripe = jest.fn();
    const children = jest.fn((viewOnly: boolean) => <p>{viewOnly ? "view only" : "full"}</p>);
    render(
      <StripeReadyGate storeMissing={false} storeNotReady setUpStorePath="/store" finishStripe={finishStripe} copy={copy}>
        {children}
      </StripeReadyGate>
    );
    const button = screen.getByRole("button", { name: "Finish Stripe setup" });
    button.focus();
    expect(button).toHaveFocus();
    fireEvent.click(button);
    expect(finishStripe).toHaveBeenCalledTimes(1);
    expect(screen.getByText("view only")).toBeInTheDocument();
  });

  it("when ready renders only the content, with viewOnly false", () => {
    render(
      <StripeReadyGate storeMissing={false} storeNotReady={false} setUpStorePath="/store" finishStripe={() => {}} copy={copy}>
        {(viewOnly) => <p>{viewOnly ? "view only" : "full"}</p>}
      </StripeReadyGate>
    );
    expect(screen.getByText("full")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("neutralizes a dangerous set up path on the plain anchor", () => {
    render(
      // eslint-disable-next-line no-script-url
      <StripeReadyGate storeMissing storeNotReady={false} setUpStorePath="javascript:alert(1)" finishStripe={() => {}} copy={copy}>
        {() => null}
      </StripeReadyGate>
    );
    expect(screen.getByRole("link", { name: "Set up store" })).toHaveAttribute("href", "#");
  });

  it("has no axe violations in both gate states", async () => {
    const missing = render(
      <StripeReadyGate storeMissing storeNotReady={false} setUpStorePath="/store" finishStripe={() => {}} copy={copy}>
        {() => null}
      </StripeReadyGate>
    );
    expect(await axe(missing.container, AXE_OPTIONS)).toHaveNoViolations();
    const unfinished = render(
      <StripeReadyGate storeMissing={false} storeNotReady setUpStorePath="/store" finishStripe={() => {}} copy={copy}>
        {() => <p>content</p>}
      </StripeReadyGate>
    );
    expect(await axe(unfinished.container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

describe("ErrorMessage message mode", () => {
  it("renders the user facing alert line, in production too", () => {
    render(<ErrorMessage message="Could not save the page" className="form-error" />);
    const alert = screen.getByRole("alert");
    expect(alert.tagName).toBe("P");
    expect(alert).toHaveClass("error-message", "nxs-error-message", "form-error");
    expect(alert).toHaveTextContent("Could not save the page");
  });

  it("has no axe violations", async () => {
    const { container } = render(<ErrorMessage message="Could not save the page" />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
