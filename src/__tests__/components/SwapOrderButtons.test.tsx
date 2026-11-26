import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SwapOrderButtons from "@nxs-molecules/buttons/SwapOrderButtons";
import type { MoveOffset, SwapOrderButtonsProps } from "nxs-button";

// Ported case for case from nexious-client's swapOrderButtons test when the pair moved here. What
// is pinned, and why each one is silent when it breaks:
//   • The ends disable themselves. A client list once shipped a pair with live ends that silently
//     did nothing; the component owns the rule so no caller can forget it.
//   • data-move renders only when a caller asks for it: an index keyed list finds the moved row
//     by it, and no other caller should carry the noise.
//   • A button that disables because its row reached an end hands focus to its sibling, both when
//     its row stays put and when React moves the row's node. Without that, a keyboard user
//     restarts at the top of the page. And only a button that HELD focus does this, so no row
//     ever takes focus the user left somewhere else.
//   • The class contract: classNames.button replaces the default skin outright, and the glyph
//     props replace the built in arrows, so a consumer's own button system never inherits ours.
describe("SwapOrderButtons", () => {
  const renderPair = (props: Partial<SwapOrderButtonsProps> = {}) => {
    const onMove = jest.fn();
    const base = { position: 1, count: 3, upLabel: "Move b up", downLabel: "Move b down", onMove };
    const view = render(
      <>
        <button type="button">outside</button>
        <SwapOrderButtons {...base} {...props} />
      </>
    );
    const up = () => screen.getByRole("button", { name: "Move b up" }) as HTMLButtonElement;
    const down = () => screen.getByRole("button", { name: "Move b down" }) as HTMLButtonElement;
    const rerender = (next: Partial<SwapOrderButtonsProps>) =>
      view.rerender(
        <>
          <button type="button">outside</button>
          <SwapOrderButtons {...base} {...props} {...next} />
        </>
      );
    return { onMove, up, down, rerender, outside: () => screen.getByRole("button", { name: "outside" }) };
  };

  // ── Rendering ──

  it("renders two named square buttons with the library arrows and no wrapper", () => {
    const { up, down } = renderPair();
    expect(up()).toHaveClass("btn-base", "btn-secondary", "btn-md", "nxs-swap-order-button");
    expect(up()).not.toHaveClass("btn-sm");
    expect(up()).toHaveAttribute("type", "button");
    // A fragment: the pair are siblings of whatever the caller renders beside them.
    expect(up().parentElement).toBe(screen.getByRole("button", { name: "outside" }).parentElement);
    expect(up().nextElementSibling).toBe(down());
  });

  it("draws the built in arrowUp and arrowDown glyphs, hidden from assistive tech", () => {
    const { up, down } = renderPair();
    const upGlyph = up().querySelector("svg");
    const downGlyph = down().querySelector("svg");
    expect(upGlyph).toHaveAttribute("aria-hidden", "true");
    expect(downGlyph).toHaveAttribute("aria-hidden", "true");
    // Two different glyphs, so neither button can render the other's arrow by mistake.
    expect(upGlyph?.innerHTML).not.toBe(downGlyph?.innerHTML);
    // The name comes from the label alone; the glyph adds nothing to it.
    expect(up()).toHaveAccessibleName("Move b up");
  });

  it("replaces the whole default class string when classNames.button is passed", () => {
    const { up, down } = renderPair({ classNames: { button: "cu-btn cu-btn-secondary cu-btn-icon" } });
    expect(up()).toHaveAttribute("class", "cu-btn cu-btn-secondary cu-btn-icon");
    expect(down()).toHaveAttribute("class", "cu-btn cu-btn-secondary cu-btn-icon");
  });

  it("renders upIcon and downIcon in place of the built in arrows", () => {
    const { up, down } = renderPair({
      upIcon: <span className="custom-up" aria-hidden="true" />,
      downIcon: <span className="custom-down" aria-hidden="true" />,
    });
    expect(up().querySelector(".custom-up")).toBeInTheDocument();
    expect(down().querySelector(".custom-down")).toBeInTheDocument();
    expect(up().querySelector("svg")).toBeNull();
    expect(down().querySelector("svg")).toBeNull();
  });

  it("renders data-move only when a moveKey is given", () => {
    const { up, down, rerender } = renderPair();
    expect(up()).not.toHaveAttribute("data-move");
    expect(down()).not.toHaveAttribute("data-move");
    rerender({ moveKey: 4 });
    expect(up()).toHaveAttribute("data-move", "4:-1");
    expect(down()).toHaveAttribute("data-move", "4:1");
  });

  // ── The ends and the hold ──

  it("disables Move up on the first row and Move down on the last", () => {
    const { up, down, rerender } = renderPair({ position: 0 });
    expect(up()).toBeDisabled();
    expect(down()).toBeEnabled();
    rerender({ position: 1 });
    expect(up()).toBeEnabled();
    expect(down()).toBeEnabled();
    rerender({ position: 2 });
    expect(up()).toBeEnabled();
    expect(down()).toBeDisabled();
  });

  it("disables both on a list of one", () => {
    const { up, down } = renderPair({ position: 0, count: 1 });
    expect(up()).toBeDisabled();
    expect(down()).toBeDisabled();
  });

  it("holds both while disabled, wherever the row sits", () => {
    const { up, down } = renderPair({ disabled: true });
    expect(up()).toBeDisabled();
    expect(down()).toBeDisabled();
  });

  it("reports each press as an offset", () => {
    const { onMove, up, down } = renderPair();
    fireEvent.click(up());
    fireEvent.click(down());
    expect(onMove.mock.calls).toEqual([[-1], [1]]);
  });

  // ── Focus at an end ──

  it("hands focus to Move down when a focused Move up reaches the top", () => {
    const { up, down, rerender } = renderPair();
    up().focus();
    fireEvent.click(up());
    rerender({ position: 0 });
    expect(document.activeElement).toBe(down());
  });

  it("hands focus to Move up when a focused Move down reaches the bottom", () => {
    const { up, down, rerender } = renderPair();
    down().focus();
    rerender({ position: 2 });
    expect(document.activeElement).toBe(up());
  });

  it("leaves no claim on focus after a click on the page background", () => {
    const { up, rerender } = renderPair();
    up().focus();
    fireEvent.click(up());
    // A real blur, as a click on empty page fires: the flag goes with it, so a later end reached
    // for another reason does not pull focus back.
    up().blur();
    rerender({ position: 0 });
    expect(document.activeElement).toBe(document.body);
  });

  it("never takes focus for a press that did not focus the button", () => {
    // Safari and Firefox on macOS do not focus a button on a mouse click.
    const { up, rerender } = renderPair({ count: 4 });
    fireEvent.click(up());
    rerender({ position: 0 });
    expect(document.activeElement).toBe(document.body);
  });

  it("leaves focus alone when the user has moved on to another control", () => {
    const { up, rerender, outside } = renderPair();
    up().focus();
    fireEvent.click(up());
    outside().focus();
    rerender({ position: 0 });
    expect(document.activeElement).toBe(outside());
  });

  it("does not pull focus in from the page for a row nobody pressed", () => {
    const { rerender } = renderPair();
    rerender({ position: 0 });
    expect(document.activeElement).toBe(document.body);
  });

  it("leaves focus to the caller when a hold disables both at once", () => {
    const { up, rerender } = renderPair();
    up().focus();
    fireEvent.click(up());
    rerender({ disabled: true });
    // Nowhere live to go: the caller's own repair takes over.
    expect(document.activeElement).toBe(up());
    // Once focus has left, a later end does not pull it back. (jsdom will not blur a disabled
    // button, so the hold is released first.)
    rerender({ disabled: false });
    up().blur();
    rerender({ position: 0 });
    expect(document.activeElement).toBe(document.body);
  });

  // ── In a keyed list ──
  // A list keyed by id MOVES the node of the row that swapped down. Both paths meet here: a row
  // that stays put keeps its disabled button focused, a row that moved has lost focus.

  const KeyedList = () => {
    const [rows, setRows] = useState(["a", "b", "c"]);
    const swap = (index: number, offset: MoveOffset) =>
      setRows((previous) => {
        const next = [...previous];
        const [moving] = next.splice(index, 1);
        next.splice(index + offset, 0, moving ?? "");
        return next;
      });
    return (
      <ul>
        {rows.map((row, index) => (
          <li key={row}>
            <SwapOrderButtons
              position={index}
              count={rows.length}
              upLabel={`up ${row}`}
              downLabel={`down ${row}`}
              onMove={(offset) => swap(index, offset)}
            />
          </li>
        ))}
      </ul>
    );
  };

  const press = (name: string) => {
    const control = screen.getByRole("button", { name });
    control.focus();
    fireEvent.click(control);
  };

  it("keeps focus on the moved row in a keyed list, and on its sibling at an end", () => {
    render(<KeyedList />);
    // Each row read by its first button's name, in DOM order.
    const order = () =>
      screen.getAllByRole("listitem").map((item) => item.querySelector("button")?.getAttribute("aria-label"));
    const focused = () => document.activeElement?.getAttribute("aria-label");
    // Mid list: React moves a's node, loses its focus and restores it.
    press("down a");
    expect(order()).toEqual(["up b", "up a", "up c"]);
    expect(focused()).toBe("down a");
    // To the bottom: a's node moves again, with no blur event, and React cannot restore focus to
    // a disabled button, so the focus flag hands it to Move up.
    press("down a");
    expect(order()).toEqual(["up b", "up c", "up a"]);
    expect(focused()).toBe("up a");
    // To the top: c's node stays put (b is the one React moves), so c's Move up disables while it
    // still holds focus.
    press("up c");
    expect(order()).toEqual(["up c", "up b", "up a"]);
    expect(focused()).toBe("down c");
  });
});
