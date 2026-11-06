import { fireEvent, render, screen } from "@testing-library/react";
import CardGrid from "@nxs-molecules/card/CardGrid";
import SelectCard from "@nxs-molecules/card/SelectCard";

// SelectCard picks its element from its props, which is the whole reason it exists: a client
// surface that hand built the same card three ways got one branch wrong at a time. Each branch
// is pinned here by the element it renders and the props it hands that element, plus the class
// contract (classNames replaces, className appends) and the aria props on every branch.

// A stand in for a router's Link: it records the `to` it was given, as react-router's does.
const FakeLink = ({ to, children, ...rest }: { to: string; children?: React.ReactNode }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <a data-router-to={to} href={to} {...rest}>
    {children}
  </a>
);

describe("SelectCard element branches", () => {
  it("renders the linkAs component with `to` when href and linkAs are set", () => {
    render(<SelectCard title="Pages" href="/app/demo/dashboard?tab=pages" linkAs={FakeLink} />);
    const link = screen.getByRole("link", { name: "Pages" });
    expect(link).toHaveAttribute("data-router-to", "/app/demo/dashboard?tab=pages");
    expect(link).toHaveClass("nxs-select-card");
  });

  it("renders a plain anchor when href is set without linkAs", () => {
    render(<SelectCard title="Calendar" href="#calendar" />);
    const link = screen.getByRole("link", { name: "Calendar" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "#calendar");
    expect(link).not.toHaveAttribute("data-router-to");
  });

  it("routes href through safeUrl on both link branches", () => {
    // eslint-disable-next-line no-script-url
    const unsafe = "javascript:alert(1)";
    const { unmount } = render(<SelectCard title="Plain" href={unsafe} />);
    expect(screen.getByRole("link", { name: "Plain" })).toHaveAttribute("href", "#");
    unmount();
    render(<SelectCard title="Routed" href={unsafe} linkAs={FakeLink} />);
    expect(screen.getByRole("link", { name: "Routed" })).toHaveAttribute("data-router-to", "#");
  });

  it("renders a button that reports the press when onClick is set", () => {
    const onClick = jest.fn();
    render(<SelectCard title="New page" onClick={onClick} />);
    const button = screen.getByRole("button", { name: "New page" });
    expect(button).toHaveAttribute("type", "button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("prefers the link over the button when both href and onClick are set", () => {
    render(<SelectCard title="Both" href="#both" onClick={() => {}} />);
    expect(screen.getByRole("link", { name: "Both" })).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders an inert div with aria-disabled when disabled, whatever else is set", () => {
    const onClick = jest.fn();
    const { container } = render(
      <SelectCard title="Coming soon" href="#soon" linkAs={FakeLink} onClick={onClick} disabled />
    );
    const card = container.firstElementChild as HTMLElement;
    expect(card.tagName).toBe("DIV");
    expect(card).toHaveAttribute("aria-disabled", "true");
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
    fireEvent.click(card);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders the inert div when nothing makes it interactive", () => {
    const { container } = render(<SelectCard title="Just a tile" />);
    expect(container.firstElementChild?.tagName).toBe("DIV");
    expect(container.firstElementChild).toHaveAttribute("aria-disabled", "true");
  });
});

describe("SelectCard parts and classes", () => {
  it("renders the icon hidden, then the title, the subtitle and the children, in that order", () => {
    const { container } = render(
      <SelectCard
        title="Pages"
        subtitle="3 pages"
        icon={<span className="glyph" />}
        onClick={() => {}}
      >
        <span className="badge">New</span>
      </SelectCard>
    );
    const parts = Array.from(container.firstElementChild?.children ?? []).map((part) => part.getAttribute("class"));
    expect(parts).toEqual(["nxs-select-card-icon", "nxs-select-card-title", "nxs-select-card-subtitle", "badge"]);
    expect(container.querySelector(".nxs-select-card-icon")).toHaveAttribute("aria-hidden", "true");
    // The glyph never joins the name; the visible text parts do, in reading order.
    expect(screen.getByRole("button")).toHaveAccessibleName("Pages 3 pages New");
  });

  it("renders no icon wrapper and no subtitle when they are not given", () => {
    const { container } = render(<SelectCard title="Pages" onClick={() => {}} />);
    expect(container.querySelector(".nxs-select-card-icon")).toBeNull();
    expect(container.querySelector(".nxs-select-card-subtitle")).toBeNull();
  });

  it("adds the selected class only while selected", () => {
    const { container, rerender } = render(<SelectCard title="Pages" onClick={() => {}} />);
    expect(container.firstElementChild).toHaveAttribute("class", "nxs-select-card");
    rerender(<SelectCard title="Pages" onClick={() => {}} selected />);
    expect(container.firstElementChild).toHaveAttribute("class", "nxs-select-card nxs-select-card-selected");
  });

  it("lets every classNames key replace its part's default, and className append to the root", () => {
    const { container } = render(
      <SelectCard
        title="Pages"
        subtitle="3 pages"
        icon={<span />}
        onClick={() => {}}
        selected
        className="pages-panel-card-landing"
        classNames={{
          root: "cu-card cu-card-nav",
          icon: "card-glyph",
          title: "cu-card-title",
          subtitle: "cu-card-subtitle",
          selected: "cu-card-selected",
        }}
      />
    );
    const card = container.firstElementChild;
    expect(card).toHaveAttribute("class", "cu-card cu-card-nav cu-card-selected pages-panel-card-landing");
    expect(card?.children[0]).toHaveAttribute("class", "card-glyph");
    expect(card?.children[1]).toHaveAttribute("class", "cu-card-title");
    expect(card?.children[2]).toHaveAttribute("class", "cu-card-subtitle");
    expect(container.querySelector("[class*='nxs-select-card']")).toBeNull();
  });

  it.each([
    ["the router link", { href: "/x", linkAs: FakeLink }],
    ["the anchor", { href: "/x" }],
    ["the button", { onClick: () => {} }],
    ["the inert div", { disabled: true }],
  ])("maps ariaLabel and ariaCurrent onto %s", (_branch, branchProps) => {
    const { container } = render(
      // eslint-disable-next-line react/jsx-props-no-spreading
      <SelectCard title="Pages" ariaLabel="Open the Pages tab" ariaCurrent="page" {...branchProps} />
    );
    const card = container.firstElementChild;
    expect(card).toHaveAttribute("aria-label", "Open the Pages tab");
    expect(card).toHaveAttribute("aria-current", "page");
  });

  it("renders no aria-label or aria-current when they are not given", () => {
    const { container } = render(<SelectCard title="Pages" onClick={() => {}} />);
    expect(container.firstElementChild).not.toHaveAttribute("aria-label");
    expect(container.firstElementChild).not.toHaveAttribute("aria-current");
  });
});

describe("CardGrid", () => {
  it("renders a div with the default class by default", () => {
    const { container } = render(
      <CardGrid>
        <SelectCard title="Pages" onClick={() => {}} />
      </CardGrid>
    );
    const grid = container.firstElementChild;
    expect(grid?.tagName).toBe("DIV");
    expect(grid).toHaveAttribute("class", "nxs-card-grid");
    expect(grid).not.toHaveAttribute("aria-label");
  });

  it("renders a named nav landmark when asked", () => {
    render(
      <CardGrid as="nav" ariaLabel="Quick links">
        <SelectCard title="Pages" href="#pages" />
      </CardGrid>
    );
    const nav = screen.getByRole("navigation", { name: "Quick links" });
    expect(nav).toHaveClass("nxs-card-grid");
    expect(nav.querySelector("a")).toHaveAccessibleName("Pages");
  });

  it("appends className and lets classNames.root replace the default", () => {
    const appended = render(<CardGrid className="plugins-grid">{null}</CardGrid>);
    expect(appended.container.firstElementChild).toHaveAttribute("class", "nxs-card-grid plugins-grid");
    appended.unmount();
    const replaced = render(
      <CardGrid className="plugins-grid" classNames={{ root: "app-grid" }}>
        {null}
      </CardGrid>
    );
    expect(replaced.container.firstElementChild).toHaveAttribute("class", "app-grid plugins-grid");
  });
});
