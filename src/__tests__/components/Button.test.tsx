import "@testing-library/jest-dom";
import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@nxs-atoms/buttons/Button";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button label="Save" />);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("defaults to type=button and honors an explicit type (so it can submit a form)", () => {
    const { rerender } = render(<Button label="x" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    rerender(<Button label="x" type="submit" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("merges className onto the base class instead of replacing it", () => {
    render(<Button label="x" theme="btn-main" className="btn-card highlight" />);
    expect(screen.getByRole("button")).toHaveClass("btn-main", "btn-card", "highlight");
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<Button label="x" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables via the isDisabled alias", () => {
    render(<Button label="x" isDisabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("prefers an explicit aria-label over the label text", () => {
    render(<Button label="X" aria-label="Close" />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("forwards a ref to the underlying button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button label="x" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
