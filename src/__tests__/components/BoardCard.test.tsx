import { fireEvent, render, screen, within } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import BoardCard from "@nxs-organism/card/BoardCard";

expect.extend(toHaveNoViolations);

// BoardCard (2026-11 item 337, Session 4b) is ported from nexious-client's four board cards. Pinned
// here: it sits on the nxs-card recipe, the title is a heading at the level asked, the Move to
// select lists every column but the current one and fires onMove with the chosen value, it is
// left out with one column, and the card itself is never a button or a tab stop.

const AXE_OPTIONS = { rules: { region: { enabled: false } } };
const COLUMNS = [
  { value: "todo", label: "To do" },
  { value: "doing", label: "Doing" },
  { value: "done", label: "Done" },
];

const renderCard = (onMove = jest.fn()) =>
  render(
    <BoardCard
      id="task-1"
      title={
        <button type="button" className="nxs-card-link">
          Write the brief
        </button>
      }
      meta={<span>Due Nov 14</span>}
      badges={<span>High</span>}
      moveOptions={COLUMNS}
      currentColumn="todo"
      onMove={onMove}
      moveLabel="Move to"
    >
      <p>Two paragraphs</p>
    </BoardCard>
  );

describe("BoardCard parts", () => {
  it("renders on nxs-card with the title heading, meta, badges, children and the move footer", () => {
    const { container } = renderCard();
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("nxs-card", "nxs-board-card");
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Write the brief");
    const body = container.querySelector(".nxs-card-body") as HTMLElement;
    expect(Array.from(body.children).map((part) => part.className || part.tagName)).toEqual([
      "nxs-board-card-meta",
      "nxs-board-card-badges",
      "P",
    ]);
    expect(container.querySelector(".nxs-card-footer .nxs-board-card-move select")).not.toBeNull();
  });

  it("renders the title at the heading level asked", () => {
    render(<BoardCard title="Ticket" headingLevel={4} />);
    expect(screen.getByRole("heading", { level: 4, name: "Ticket" })).toHaveClass("nxs-card-title");
  });

  it("adds the dragging modifier and appends className last", () => {
    const { container } = render(<BoardCard title="Ticket" isDragging className="orders-card" />);
    expect(container.firstElementChild).toHaveAttribute(
      "class",
      "nxs-card nxs-board-card nxs-board-card-dragging orders-card"
    );
  });

  it("lists every column but the current one, after the Move to placeholder", () => {
    renderCard();
    const select = screen.getByRole("combobox", { name: "Move to" });
    expect(select).toHaveValue("");
    const options = within(select).getAllByRole("option");
    expect(options.map((option) => option.textContent)).toEqual(["Move to", "Doing", "Done"]);
    expect(options[0]).toBeDisabled();
  });

  it("leaves the move control out with one column, with no onMove and with no label", () => {
    const { container, rerender } = render(
      <BoardCard title="Only" moveOptions={[COLUMNS[0]]} currentColumn="todo" onMove={jest.fn()} moveLabel="Move to" />
    );
    expect(container.querySelector("select")).toBeNull();
    expect(container.querySelector(".nxs-card-footer")).toBeNull();
    rerender(<BoardCard title="Only" moveOptions={COLUMNS} moveLabel="Move to" />);
    expect(container.querySelector("select")).toBeNull();
    rerender(<BoardCard title="Only" moveOptions={COLUMNS} onMove={jest.fn()} />);
    expect(container.querySelector("select")).toBeNull();
  });

  it("gives two cards on one board two distinct select ids", () => {
    const { container } = render(
      <>
        <BoardCard title="A" moveOptions={COLUMNS} onMove={jest.fn()} moveLabel="Move to" />
        <BoardCard title="B" moveOptions={COLUMNS} onMove={jest.fn()} moveLabel="Move to" />
      </>
    );
    const ids = Array.from(container.querySelectorAll("select")).map((select) => select.id);
    expect(new Set(ids).size).toBe(2);
  });
});

describe("BoardCard interaction", () => {
  it("fires onMove with the chosen column's value and stays on the placeholder", () => {
    const onMove = jest.fn();
    renderCard(onMove);
    const select = screen.getByRole("combobox", { name: "Move to" });
    fireEvent.change(select, { target: { value: "done" } });
    expect(onMove).toHaveBeenCalledTimes(1);
    expect(onMove).toHaveBeenCalledWith("done");
    expect(select).toHaveValue("");
  });

  it("is moved by keyboard alone: the opener then the select are the only stops, and a choice moves it", () => {
    // jsdom does not drive a native select's own arrow keys, so this pins the tab order and then
    // the change event a browser fires when a keyboard user commits an option.
    const onMove = jest.fn();
    const { container } = renderCard(onMove);
    const root = container.firstElementChild as HTMLElement;
    expect(root).not.toHaveAttribute("role");
    expect(root).not.toHaveAttribute("tabindex");
    const stops = Array.from(container.querySelectorAll<HTMLElement>("a[href], button, select, [tabindex]"));
    expect(stops.map((element) => element.tagName)).toEqual(["BUTTON", "SELECT"]);
    stops.forEach((element) => {
      element.focus();
      expect(element).toHaveFocus();
    });
    const select = screen.getByRole("combobox", { name: "Move to" });
    fireEvent.change(select, { target: { value: "doing" } });
    expect(onMove).toHaveBeenCalledWith("doing");
  });

  it("has no axe violations as a column of cards", async () => {
    const { container } = render(
      <ul aria-label="To do">
        <BoardCard
          as="li"
          id="a"
          title="Write the brief"
          badges={<span>High</span>}
          moveOptions={COLUMNS}
          currentColumn="todo"
          onMove={jest.fn()}
          moveLabel="Move to"
        />
        <BoardCard as="li" id="b" title="Plain card" />
      </ul>
    );
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
