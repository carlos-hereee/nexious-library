import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ActiveSelectionBar from "@nxs-molecules/navigation/ActiveSelectionBar";

// The bar's markup is pinned exactly because a consumer's stylesheet targets its parts and its
// root (the client's phone nav rule reads the root through :has()), so a moved node or a renamed
// class breaks a page this library cannot see.
describe("ActiveSelectionBar", () => {
  const renderBar = (extra: Partial<React.ComponentProps<typeof ActiveSelectionBar>> = {}) => {
    const onChange = jest.fn();
    const view = render(
      <ActiveSelectionBar label="Studying" value="Fractions" changeLabel="Change" onChange={onChange} {...extra} />
    );
    return { onChange, ...view };
  };

  it("renders the label, the value and the change button in the documented markup", () => {
    const { container } = renderBar({ actions: <button type="button">Theme</button> });
    expect(container.innerHTML).toBe(
      '<div class="nxs-active-selection-bar">' +
        '<span class="nxs-active-selection-bar-label">Studying: <strong>Fractions</strong></span>' +
        '<div class="nxs-active-selection-bar-actions">' +
        '<button type="button">Theme</button>' +
        '<button type="button" class="nxs-active-selection-bar-change">Change</button>' +
        "</div></div>"
    );
  });

  it("forwards its ref to the root", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <ActiveSelectionBar ref={ref} label="Studying" value="Fractions" changeLabel="Change" onChange={() => {}} />
    );
    expect(ref.current).toBe(container.firstElementChild);
  });

  it("calls onChange when the change button is pressed", () => {
    const { onChange } = renderBar();
    fireEvent.click(screen.getByRole("button", { name: "Change" }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("adds the change aria-label only when asked", () => {
    const { unmount } = renderBar();
    expect(screen.getByRole("button", { name: "Change" })).not.toHaveAttribute("aria-label");
    unmount();
    renderBar({ changeAriaLabel: "Change the deck you are studying" });
    expect(screen.getByRole("button", { name: "Change the deck you are studying" })).toHaveTextContent("Change");
  });

  it("appends className to the root and lets each classNames key replace its part", () => {
    const { container } = renderBar({
      className: "study-deck-bar",
      classNames: { root: "bar", label: "bar-label", actions: "bar-actions", change: "bar-change" },
    });
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("class", "bar study-deck-bar");
    expect(root?.children[0]).toHaveAttribute("class", "bar-label");
    expect(root?.children[1]).toHaveAttribute("class", "bar-actions");
    expect(screen.getByRole("button", { name: "Change" })).toHaveAttribute("class", "bar-change");
    expect(container.querySelector("[class*='nxs-active-selection-bar']")).toBeNull();
  });
});
