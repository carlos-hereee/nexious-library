import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Pager from "@nxs-molecules/navigation/Pager";
import LoadOlderButton from "@nxs-molecules/navigation/LoadOlderButton";

expect.extend(toHaveNoViolations);

// Pager and LoadOlderButton (2026-11 item 337, Phase 5), ported from the client's
// components/list/Pager.tsx and LoadOlderButton.tsx. Pinned: nothing renders without a second
// page or more history, every string comes from props, the ends disable, the status is polite,
// the loading state, the nxs classes, native button tab stops and jest-axe.

const AXE_OPTIONS = { rules: { region: { enabled: false } } };
const formatStatus = (page: number, total: number) => `Page ${page} of ${total}`;

const PagerUnderTest = ({ page, totalPages, onPage = jest.fn() }: { page: number; totalPages: number; onPage?: (page: number) => void }) => (
  <Pager
    page={page}
    totalPages={totalPages}
    onPage={onPage}
    ariaLabel="Orders pages"
    previousLabel="Previous"
    nextLabel="Next"
    formatStatus={formatStatus}
  />
);

describe("Pager", () => {
  it("renders nothing with one page", () => {
    const { container } = render(<PagerUnderTest page={1} totalPages={1} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a named nav with the caller's labels and a polite status", () => {
    render(<PagerUnderTest page={2} totalPages={5} />);
    expect(screen.getByRole("navigation", { name: "Orders pages" })).toHaveClass("nxs-pager");
    const status = screen.getByText("Page 2 of 5");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveClass("nxs-pager-status");
    expect(screen.getByRole("button", { name: "Previous" })).toHaveClass("nxs-btn", "nxs-btn-secondary", "nxs-pager-button");
  });

  it("disables Previous on the first page and Next on the last", () => {
    const { rerender } = render(<PagerUnderTest page={1} totalPages={3} />);
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
    rerender(<PagerUnderTest page={3} totalPages={3} />);
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Previous" })).toBeEnabled();
  });

  it("asks for the neighbouring page through two native tab stops", () => {
    const onPage = jest.fn();
    render(<PagerUnderTest page={2} totalPages={5} onPage={onPage} />);
    const previous = screen.getByRole("button", { name: "Previous" });
    const next = screen.getByRole("button", { name: "Next" });
    expect(previous).toHaveAttribute("type", "button");
    expect(previous.tabIndex).toBe(0);
    expect(next.tabIndex).toBe(0);
    fireEvent.click(previous);
    fireEvent.click(next);
    expect(onPage.mock.calls).toEqual([[1], [3]]);
  });

  it("has no axe violations", async () => {
    const { container } = render(<PagerUnderTest page={2} totalPages={5} />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

describe("LoadOlderButton", () => {
  it("renders nothing without more history", () => {
    const { container } = render(
      <LoadOlderButton hasMore={false} isLoading={false} onLoad={jest.fn()} label="Load older" loadingLabel="Loading" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the caller's label on an nxs secondary button and asks for the next page", () => {
    const onLoad = jest.fn();
    const { container } = render(<LoadOlderButton hasMore isLoading={false} onLoad={onLoad} label="Load older" loadingLabel="Loading" />);
    expect(container.firstElementChild).toHaveClass("nxs-load-older");
    const button = screen.getByRole("button", { name: "Load older" });
    expect(button).toHaveClass("nxs-btn", "nxs-btn-secondary", "nxs-load-older-button");
    expect(button).not.toHaveAttribute("aria-busy");
    fireEvent.click(button);
    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  it("disables itself and shows the loading label while a page loads", () => {
    render(<LoadOlderButton hasMore isLoading onLoad={jest.fn()} label="Load older" loadingLabel="Loading" />);
    const button = screen.getByRole("button", { name: "Loading" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("has no axe violations in both states", async () => {
    const idle = render(<LoadOlderButton hasMore isLoading={false} onLoad={jest.fn()} label="Load older" loadingLabel="Loading" />);
    expect(await axe(idle.container, AXE_OPTIONS)).toHaveNoViolations();
    const busy = render(<LoadOlderButton hasMore isLoading onLoad={jest.fn()} label="Load older" loadingLabel="Loading" />);
    expect(await axe(busy.container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
