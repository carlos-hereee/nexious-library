import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import EmptyState from "@nxs-molecules/errors/EmptyState";
import EmptySection from "@nxs-molecules/errors/EmptySection";
import ComingSoon from "@nxs-molecules/errors/ComingSoon";
import PageNotFound from "@nxs-molecules/errors/PageNotFound";

const noop = () => {};
const hero = { url: "/banner.jpg", alt: "storefront at dusk" };

// ── The three published callers, pinned byte for byte ──────────────────────────────
// EmptySection, ComingSoon and PageNotFound render through EmptyState and ship to consumers this
// library cannot see, so a change to EmptyState must leave their markup exactly as it was. These
// strings were captured from the release before EmptyState gained as, headingLevel, classNames,
// media and actions, and the suite passed against that code before the extension was written.
// Every case covers the component's defaults or every prop it reads; PageNotFound appears in both
// of its modes because the timer decides whether the message is prose or the button.
const pinCases: Record<string, { ui: ReactElement; html: string }> = {
  emptySectionDefault: {
    ui: <EmptySection />,
    html: "<div class=\"empty-state container\"><h3 class=\"empty-state-heading\">Nothing to see here</h3></div>",
  },
  emptySectionEveryProp: {
    ui: (
      <EmptySection
        heading="No posts yet"
        message="Nothing has been posted yet."
        icon="star"
        actionLabel="Add a post"
        actionVariant="primary"
        handleClick={noop}
      >
        <span>extra</span>
      </EmptySection>
    ),
    html: "<div class=\"empty-state container\"><div class=\"empty-state-icon\"><svg class=\"icon\" width=\"1em\" height=\"1em\" viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z\"></path></svg></div><h3 class=\"empty-state-heading\">No posts yet</h3><p class=\"empty-state-message\">Nothing has been posted yet.</p><button type=\"button\" class=\"btn-base btn-primary empty-state-action\" aria-label=\"Add a post\">Add a post</button><span>extra</span></div>",
  },
  comingSoonDefault: {
    ui: <ComingSoon />,
    html: "<div class=\"empty-state text-center\"><p class=\"empty-state-message text-max\">More coming soon</p></div>",
  },
  comingSoonEveryProp: {
    ui: (
      <ComingSoon
        hero={hero}
        heading="Analytics"
        message="Charts are on their way."
        icon="star"
        actionLabel="Join the waitlist"
        actionVariant="secondary"
        handleClick={noop}
      >
        <span>extra</span>
      </ComingSoon>
    ),
    html: "<div class=\"empty-state text-center\"><div><img loading=\"lazy\" class=\"hero\" alt=\"storefront at dusk\" src=\"/banner.jpg\"></div><div class=\"empty-state-icon\"><svg class=\"icon\" width=\"1em\" height=\"1em\" viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z\"></path></svg></div><h3 class=\"empty-state-heading\">Analytics</h3><p class=\"empty-state-message text-max\">Charts are on their way.</p><button type=\"button\" class=\"btn-base btn-secondary empty-state-action\" aria-label=\"Join the waitlist\">Join the waitlist</button><span>extra</span></div>",
  },
  pageNotFoundDefault: {
    ui: <PageNotFound />,
    html: "<div class=\"empty-state page-center\"><div class=\"empty-state-icon text-center\"><svg class=\"icon icon-spin\" width=\"1em\" height=\"1em\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M21 12a9 9 0 1 1-6.22-8.56\"></path></svg></div><button type=\"button\" class=\"empty-state-action\" aria-label=\"Page not found go to undefined\">Page not found go to undefined</button></div>",
  },
  pageNotFoundEveryPropTimer: {
    ui: (
      <PageNotFound
        hero={hero}
        heading="Lost"
        message="That page moved."
        to="/store"
        timer={100000}
        handleClick={noop}
        icon="star"
        actionVariant="ghost"
      />
    ),
    html: "<div class=\"empty-state page-center\"><div><img loading=\"lazy\" class=\"hero\" alt=\"storefront at dusk\" src=\"/banner.jpg\"></div><div class=\"empty-state-icon text-center\"><svg class=\"icon icon-spin\" width=\"1em\" height=\"1em\" viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z\"></path></svg></div><h3 class=\"empty-state-heading\">Lost</h3><p class=\"empty-state-message page-not-found-message\">That page moved.</p></div>",
  },
  pageNotFoundEveryPropButton: {
    ui: (
      <PageNotFound
        hero={hero}
        heading="Lost"
        message="That page moved."
        to="/store"
        handleClick={noop}
        icon="star"
        actionVariant="ghost"
      />
    ),
    html: "<div class=\"empty-state page-center\"><div><img loading=\"lazy\" class=\"hero\" alt=\"storefront at dusk\" src=\"/banner.jpg\"></div><div class=\"empty-state-icon text-center\"><svg class=\"icon icon-spin\" width=\"1em\" height=\"1em\" viewBox=\"0 0 24 24\" fill=\"currentColor\" stroke=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z\"></path></svg></div><h3 class=\"empty-state-heading\">Lost</h3><button type=\"button\" class=\"btn-base btn-ghost empty-state-action\" aria-label=\"That page moved.\">That page moved.</button></div>",
  },
};

describe("EmptyState callers keep their markup", () => {
  it.each(Object.keys(pinCases))("%s renders exactly as before", (name) => {
    const { ui, html } = pinCases[name];
    expect(render(ui).container.innerHTML).toBe(html);
  });
});

// ── The props a page gate needs ───────────────────────────────────────────────────
// One case per prop. Each asserts the part it touches and, where it matters, that the default
// it replaces is gone, because a REPLACE that quietly keeps the default class is the bug the
// classNames contract exists to prevent.
describe("EmptyState gate props", () => {
  it("as renders the root as the element asked for, keeping its classes", () => {
    const { container } = render(<EmptyState as="section" className="deck-gate" heading="Pick a deck" />);
    const root = container.firstElementChild;
    expect(root?.tagName).toBe("SECTION");
    expect(root).toHaveAttribute("class", "empty-state deck-gate");
  });

  it("as defaults to a div", () => {
    const { container } = render(<EmptyState heading="Pick a deck" />);
    expect(container.firstElementChild?.tagName).toBe("DIV");
  });

  it("headingLevel picks the heading element and keeps its class", () => {
    render(<EmptyState heading="Pick a deck" headingLevel={2} />);
    const heading = screen.getByRole("heading", { level: 2, name: "Pick a deck" });
    expect(heading.tagName).toBe("H2");
    expect(heading).toHaveAttribute("class", "empty-state-heading");
  });

  it("headingLevel defaults to h3", () => {
    render(<EmptyState heading="Pick a deck" />);
    expect(screen.getByRole("heading", { level: 3, name: "Pick a deck" })).toBeInTheDocument();
  });

  it("classNames replaces each part's default while the *ClassName props still append", () => {
    const { container } = render(
      <EmptyState
        icon="star"
        heading="Pick a deck"
        message="Choose one on the Path."
        actionLabel="Go to the Path"
        actionVariant="primary"
        className="deck-gate"
        iconClassName="gate-icon"
        messageClassName="gate-copy"
        classNames={{ root: "gate", icon: "glyph", heading: "gate-title", message: "hint", action: "cu-btn" }}
      />
    );
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("class", "gate deck-gate");
    expect(root?.querySelector("div")).toHaveAttribute("class", "glyph gate-icon");
    expect(screen.getByRole("heading", { name: "Pick a deck" })).toHaveAttribute("class", "gate-title");
    expect(screen.getByText("Choose one on the Path.")).toHaveAttribute("class", "hint gate-copy");
    // The action keeps its variant classes, exactly as today; only the hook class is replaced.
    expect(screen.getByRole("button", { name: "Go to the Path" })).toHaveAttribute(
      "class",
      "btn-base btn-primary cu-btn"
    );
    expect(container.querySelector(".empty-state, .empty-state-icon, .empty-state-heading")).toBeNull();
    expect(container.querySelector(".empty-state-message, .empty-state-action")).toBeNull();
  });

  it("media renders unwrapped after the icon and before the heading", () => {
    const { container } = render(
      <EmptyState icon="star" media={<span className="gate-emoji">*</span>} heading="Pick a deck" />
    );
    const children = Array.from(container.firstElementChild?.children ?? []);
    expect(children.map((child) => child.getAttribute("class"))).toEqual([
      "empty-state-icon",
      "gate-emoji",
      "empty-state-heading",
    ]);
  });

  it("actions renders the caller's row and suppresses the single action button", () => {
    const onAction = jest.fn();
    const { container } = render(
      <EmptyState
        heading="Pick a deck"
        actionLabel="Never shown"
        onAction={onAction}
        actions={
          <>
            <button type="button">Set up a deck</button>
            <button type="button">Contact the owner</button>
          </>
        }
      />
    );
    const row = container.querySelector(".empty-state-actions");
    expect(row?.tagName).toBe("DIV");
    expect(row?.querySelectorAll("button")).toHaveLength(2);
    expect(screen.queryByRole("button", { name: "Never shown" })).toBeNull();
    expect(container.querySelector(".empty-state-action")).toBeNull();
  });

  it("classNames.actions replaces the row's default class", () => {
    const { container } = render(
      <EmptyState heading="Pick a deck" classNames={{ actions: "gate-row" }} actions={<button type="button">Go</button>} />
    );
    expect(container.querySelector(".empty-state-actions")).toBeNull();
    expect(container.querySelector(".gate-row button")).toHaveTextContent("Go");
  });
});
