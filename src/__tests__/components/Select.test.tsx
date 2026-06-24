import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Select from "@nxs-molecules/forms/Select";

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
});
