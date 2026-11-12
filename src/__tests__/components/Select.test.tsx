import "@testing-library/jest-dom";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Select from "@nxs-molecules/forms/Select";

expect.extend(toHaveNoViolations);

const AXE_OPTIONS = { rules: { region: { enabled: false } } };

const groups = [
  { uid: "fruit", label: "Fruit", options: [{ name: "cherry", value: "cherry", label: "Cherry", uid: "3" }] },
  {
    uid: "veg",
    label: "Vegetables",
    options: [
      { name: "kale", value: "kale", label: "Kale", uid: "4" },
      { name: "leek", value: "leek", label: "Leek", uid: "5" },
    ],
  },
];

const list = [
  { name: "apple", value: "apple", label: "Apple", uid: "1" },
  { name: "banana", value: "banana", label: "Banana", uid: "2" },
];

describe("Select", () => {
  it("renders the provided options", () => {
    render(<Select name="fruit" list={list} onChange={jest.fn()} />);
    expect(screen.getByRole("option", { name: "Apple" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument();
  });

  it("calls onChange with the selected value", () => {
    const onChange = jest.fn();
    render(<Select name="fruit" list={list} onChange={onChange} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "banana" } });
    expect(onChange).toHaveBeenCalledWith("banana");
  });

  it("does not throw when onChange is omitted (renders instead of crashing the tree)", () => {
    expect(() => render(<Select name="fruit" list={[]} />)).not.toThrow();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("names the control with its name when the visible label is hidden", () => {
    render(<Select name="fruit" list={list} hideLabels onChange={jest.fn()} />);
    expect(screen.getByRole("combobox", { name: "fruit" })).toBeInTheDocument();
  });

  // ── 2026-11 item 337: the compatibility rule ──
  it("keeps the 4.x classes and adds nxs-select beside them", () => {
    const { container } = render(<Select name="fruit" list={list} className="cu-input" onChange={jest.fn()} />);

    expect(container.querySelector(".select-wrapper")).toHaveAttribute("class", "select-wrapper nxs-select cu-input");
    expect(screen.getByRole("combobox")).toHaveAttribute("class", "select nxs-select-control");
  });

  it("keeps the active path as today when value is absent: active is the displayed first option", () => {
    render(<Select name="fruit" list={list} active="Banana" onChange={jest.fn()} />);

    const control = screen.getByRole("combobox") as HTMLSelectElement;
    expect(control.value).toBe("Banana");
    expect(control.options[0]).toBeDisabled();
    expect(control.options[0].textContent).toBe("Banana");
    expect(control.options[1]).toHaveAttribute("hidden");
  });

  it("keeps the 4.x placeholder default and accepts a localized one", () => {
    const { rerender } = render(<Select name="fruit" list={list} onChange={jest.fn()} />);
    expect(screen.getByRole("option", { name: "Choose Selection" })).toBeDisabled();

    rerender(<Select name="fruit" list={list} placeholder="Elige una fruta" onChange={jest.fn()} />);
    expect(screen.getByRole("option", { name: "Elige una fruta" })).toBeDisabled();
  });

  // ── 2026-11 item 337: value, groups, labelId, clearLabel ──
  it("selects by value, ignoring active", () => {
    render(<Select name="fruit" list={list} value="banana" active="Apple" onChange={jest.fn()} />);

    const control = screen.getByRole("combobox") as HTMLSelectElement;
    expect(control.value).toBe("banana");
    expect(screen.getByRole("option", { name: "Banana", selected: true })).toBeInTheDocument();
  });

  it("shows the placeholder row for an empty value and fires the chosen value", () => {
    const onChange = jest.fn();
    render(<Select name="fruit" list={list} value="" placeholder="Pick one" onChange={onChange} />);

    const control = screen.getByRole("combobox") as HTMLSelectElement;
    expect(control.value).toBe("");
    expect(screen.getByRole("option", { name: "Pick one" })).toBeDisabled();
    fireEvent.change(control, { target: { value: "apple" } });
    expect(onChange).toHaveBeenCalledWith("apple");
  });

  it("renders a single option list", () => {
    render(<Select name="fruit" list={[list[0]]} value="apple" onChange={jest.fn()} />);

    expect(screen.getAllByRole("option")).toHaveLength(2);
    expect((screen.getByRole("combobox") as HTMLSelectElement).value).toBe("apple");
  });

  it("renders option groups after the flat list and selects a grouped option by value", () => {
    const { container } = render(<Select name="food" list={list} groups={groups} value="leek" onChange={jest.fn()} />);

    const optgroups = container.querySelectorAll("optgroup");
    expect(optgroups).toHaveLength(2);
    expect(optgroups[0]).toHaveAttribute("label", "Fruit");
    expect(within(optgroups[1] as HTMLElement).getAllByRole("option")).toHaveLength(2);
    expect((screen.getByRole("combobox") as HTMLSelectElement).value).toBe("leek");
  });

  it("renders groups on the active path too", () => {
    const { container } = render(<Select name="food" list={[]} groups={groups} onChange={jest.fn()} />);

    expect(container.querySelectorAll("optgroup option")).toHaveLength(3);
  });

  it("is named by the caller's own label through labelId, with no aria-label fallback", () => {
    render(
      <>
        <span id="food-heading">What to eat</span>
        <Select name="food" list={list} labelId="food-heading" onChange={jest.fn()} />
      </>
    );

    const control = screen.getByRole("combobox", { name: "What to eat" });
    expect(control).toHaveAttribute("aria-labelledby", "food-heading");
    expect(control).not.toHaveAttribute("aria-label");
  });

  it("is named by its label text, not the raw name, when the label is visually hidden", () => {
    render(<Select name="fruit" label="Favorite fruit" list={list} hideLabels onChange={jest.fn()} />);

    expect(screen.getByRole("combobox", { name: "Favorite fruit" })).toBeInTheDocument();
  });

  it("clears a value through a button named by clearLabel", () => {
    const onChange = jest.fn();
    render(<Select name="fruit" list={list} value="apple" clearSelection clearLabel="Quitar" onChange={onChange} />);

    const clear = screen.getByRole("button", { name: "Quitar" });
    expect(clear).toHaveClass("btn-icon", "nxs-select-clear");
    fireEvent.click(clear);
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("keeps the 4.x clear name by default and shows no clear button without a selection", () => {
    const { rerender } = render(<Select name="fruit" list={list} active="Apple" clearSelection onChange={jest.fn()} />);
    expect(screen.getByRole("button", { name: "Clear selection" })).toBeInTheDocument();

    rerender(<Select name="fruit" list={list} value="" clearSelection onChange={jest.fn()} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("puts the control before the clear button in the tab order, with no tabindex on either", () => {
    render(<Select name="fruit" label="Fruit" list={list} value="apple" clearSelection onChange={jest.fn()} />);

    const control = screen.getByRole("combobox", { name: "Fruit" });
    const clear = screen.getByRole("button", { name: "Clear selection" });
    // Native controls, so both take Tab in DOM order: the control first, then its clear button.
    expect(control).not.toHaveAttribute("tabindex");
    expect(clear).not.toHaveAttribute("tabindex");
    const stops = Array.from(document.querySelectorAll("select, button"));
    expect(stops.indexOf(control)).toBeLessThan(stops.indexOf(clear));
    control.focus();
    expect(control).toHaveFocus();
    clear.focus();
    expect(clear).toHaveFocus();
  });

  it("has no violations with groups, a value and a clear button", async () => {
    const { container } = render(
      <Select name="food" label="Food" list={list} groups={groups} value="kale" clearSelection onChange={jest.fn()} />
    );
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });

  it("has no violations named through labelId", async () => {
    const { container } = render(
      <>
        <span id="food-label">Food</span>
        <Select name="food" list={list} labelId="food-label" value="" placeholder="Pick a food" onChange={jest.fn()} />
      </>
    );
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
