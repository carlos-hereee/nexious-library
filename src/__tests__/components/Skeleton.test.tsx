import { render, screen } from "@testing-library/react";
import Skeleton from "@nxs-molecules/errors/Skeleton";
import Loading from "@nxs-molecules/errors/Loading";
import EmptySection from "@nxs-molecules/errors/EmptySection";
import PageNotFound from "@nxs-molecules/errors/PageNotFound";

describe("Skeleton", () => {
  // ── shape and count ────────────────────────────────────────────────────────
  it("draws exactly the number of bars it was asked for", () => {
    const { container } = render(<Skeleton shape="row" count={3} />);

    expect(container.querySelectorAll(".skeleton-bar")).toHaveLength(3);
  });

  it("names the shape on the region so the bars can reserve the right height", () => {
    const { container } = render(<Skeleton shape="block" />);

    expect(container.querySelector(".skeleton")).toHaveClass("skeleton-block");
  });

  it("gives a page skeleton a header bar on top of its body lines", () => {
    const { container } = render(<Skeleton shape="page" count={2} />);

    expect(container.querySelectorAll(".skeleton-bar-header")).toHaveLength(1);
    expect(container.querySelectorAll(".skeleton-bar")).toHaveLength(3);
  });

  it("never collapses to nothing, because an empty region announces loading and reserves no space", () => {
    const { container } = render(<Skeleton count={0} />);

    expect(container.querySelectorAll(".skeleton-bar")).toHaveLength(1);
  });

  // ── announced once, not N times ────────────────────────────────────────────
  it("announces the region once no matter how many bars are drawn", () => {
    render(<Skeleton shape="text" count={5} />);

    expect(screen.getAllByRole("status")).toHaveLength(1);
    expect(screen.getByRole("status")).toHaveAccessibleName("Loading");
  });

  it("hides every placeholder bar from assistive tech", () => {
    const { container } = render(<Skeleton shape="row" count={4} />);
    const bars = Array.from(container.querySelectorAll(".skeleton-bar"));

    expect(bars).toHaveLength(4);
    bars.forEach((bar) => expect(bar).toHaveAttribute("aria-hidden", "true"));
  });

  it("marks the region busy while it stands in for content", () => {
    render(<Skeleton />);

    expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "true");
  });
});

describe("Loading", () => {
  it("still renders a spinner when the skeleton prop is absent", () => {
    const { container } = render(<Loading />);

    expect(container.querySelector(".skeleton")).toBeNull();
    expect(container.querySelector(".icon")).toBeInTheDocument();
  });

  it("renders a skeleton only when a caller opts in", () => {
    const { container } = render(<Loading skeleton="row" skeletonCount={2} />);

    expect(container.querySelectorAll(".skeleton-bar")).toHaveLength(2);
  });

  it("does not announce the message twice when it is also the skeleton's name", () => {
    render(<Loading skeleton="text" message="Loading posts" />);

    expect(screen.getByRole("status")).toHaveAccessibleName("Loading posts");
    expect(screen.getByText("Loading posts")).toHaveAttribute("aria-hidden", "true");
  });
});

describe("the shared empty-state pattern", () => {
  it("keeps EmptySection's default headline and its container class", () => {
    const { container } = render(<EmptySection />);

    expect(screen.getByRole("heading", { name: "Nothing to see here" })).toBeInTheDocument();
    expect(container.querySelector(".empty-state")).toHaveClass("container");
  });

  it("renders the next action when a caller supplies one", () => {
    const handleClick = jest.fn();
    render(<EmptySection actionLabel="Create a page" handleClick={handleClick} />);

    screen.getByRole("button", { name: "Create a page" }).click();

    expect(handleClick).toHaveBeenCalled();
  });

  it("keeps PageNotFound's two modes: a button without a timer, the message class with one", () => {
    const withoutTimer = render(<PageNotFound to="/" />);

    expect(screen.getByRole("button", { name: /homepage/ })).toBeInTheDocument();
    expect(withoutTimer.container.querySelector(".page-not-found-message")).toBeNull();
    withoutTimer.unmount();

    const withTimer = render(<PageNotFound to="/" timer={500} handleClick={jest.fn()} />);

    expect(withTimer.container.querySelector(".page-not-found-message")).toBeInTheDocument();
    expect(withTimer.container.querySelector("button")).toBeNull();
  });
});
