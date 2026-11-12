import { fireEvent, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import ListRow from "@nxs-molecules/card/ListRow";

expect.extend(toHaveNoViolations);

// ListRow (2026-11 item 337) lays out slots and owns no behavior. Pinned here: the slot order and
// classes, the dense and selected modifiers, the root element, the decorative lead, the title's
// element, and that a row is clickable only through its child link with the actions still pressable.

const AXE_OPTIONS = { rules: { region: { enabled: false } } };

describe("ListRow parts and classes", () => {
  it("renders lead, body, meta and actions in that order, each in its slot class", () => {
    const { container } = render(
      <ListRow
        lead={<img src="/a.png" alt="" />}
        title="Order 1042"
        subtitle="Two items"
        meta={<time dateTime="2026-11-12">Nov 12</time>}
        actions={<button type="button">Refund</button>}
      >
        <span className="note">Paid</span>
      </ListRow>
    );
    const row = container.firstElementChild as HTMLElement;
    expect(row.tagName).toBe("DIV");
    expect(row).toHaveAttribute("class", "nxs-list-row");
    expect(Array.from(row.children).map((slot) => slot.className)).toEqual([
      "nxs-list-row-lead",
      "nxs-list-row-body",
      "nxs-list-row-meta",
      "nxs-list-row-actions",
    ]);
    const body = container.querySelector(".nxs-list-row-body") as HTMLElement;
    expect(Array.from(body.children).map((part) => part.className)).toEqual([
      "nxs-list-row-title",
      "nxs-list-row-subtitle",
      "note",
    ]);
  });

  it("leaves out every slot it was not given", () => {
    const { container } = render(<ListRow title="Only a title" />);
    expect(Array.from(container.firstElementChild?.children ?? []).map((slot) => slot.className)).toEqual([
      "nxs-list-row-body",
    ]);
  });

  it("hides the lead by default and exposes it when it is not decorative", () => {
    const { container, rerender } = render(<ListRow lead={<span>*</span>} title="Row" />);
    expect(container.querySelector(".nxs-list-row-lead")).toHaveAttribute("aria-hidden", "true");
    rerender(<ListRow lead={<img src="/a.png" alt="Ada Lovelace" />} isLeadDecorative={false} title="Row" />);
    expect(container.querySelector(".nxs-list-row-lead")).not.toHaveAttribute("aria-hidden");
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toBeInTheDocument();
  });

  it("renders the title as text by default and as a heading at the level asked", () => {
    const { container, rerender } = render(<ListRow title="Row" />);
    expect(container.querySelector(".nxs-list-row-title")?.tagName).toBe("SPAN");
    expect(screen.queryByRole("heading")).toBeNull();
    rerender(<ListRow title="Row" headingLevel={4} />);
    expect(screen.getByRole("heading", { level: 4, name: "Row" })).toHaveClass("nxs-list-row-title");
  });

  it("adds dense and selected modifiers and appends className last", () => {
    const { container } = render(<ListRow title="Row" isDense isSelected className="order-row" />);
    expect(container.firstElementChild).toHaveAttribute(
      "class",
      "nxs-list-row nxs-list-row-dense nxs-list-row-selected order-row"
    );
  });

  it("renders as an li inside a row group", () => {
    const { container } = render(
      <ul className="nxs-list-row-group">
        <ListRow as="li" title="One" />
        <ListRow as="li" title="Two" />
      </ul>
    );
    expect(container.querySelectorAll("ul.nxs-list-row-group > li.nxs-list-row")).toHaveLength(2);
  });
});

describe("ListRow interaction", () => {
  it("is never a button itself; the title link and the actions are the only stops, in order", () => {
    const onRefund = jest.fn();
    const { container } = render(
      <ListRow
        title={
          <a href="#order-1042" className="nxs-list-row-link">
            Order 1042
          </a>
        }
        meta="Nov 12"
        actions={
          <button type="button" onClick={onRefund}>
            Refund
          </button>
        }
      />
    );
    const row = container.firstElementChild as HTMLElement;
    expect(row).not.toHaveAttribute("role");
    expect(row).not.toHaveAttribute("tabindex");
    const focusable = Array.from(container.querySelectorAll<HTMLElement>("a[href], button, [tabindex]"));
    expect(focusable.map((element) => element.textContent)).toEqual(["Order 1042", "Refund"]);
    focusable.forEach((element) => {
      element.focus();
      expect(element).toHaveFocus();
    });
    fireEvent.click(row);
    expect(onRefund).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Refund" }));
    expect(onRefund).toHaveBeenCalledTimes(1);
  });

  it("has no axe violations as plain rows, dense rows, a linked row and a selected row in a group", async () => {
    const { container } = render(
      <ul className="nxs-list-row-group" aria-label="Orders">
        <ListRow as="li" lead={<span>*</span>} title="Order 1041" subtitle="One item" meta="Nov 11" />
        <ListRow as="li" isDense title="Order 1040" meta="Nov 10" />
        <ListRow
          as="li"
          title={
            <a href="#order-1042" className="nxs-list-row-link">
              Order 1042
            </a>
          }
          actions={<button type="button">Refund</button>}
        />
        <ListRow
          as="li"
          isSelected
          title={
            <button type="button" className="nxs-list-row-link" aria-pressed="true">
              Order 1043
            </button>
          }
        />
      </ul>
    );
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
