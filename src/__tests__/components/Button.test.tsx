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

  it("renders exactly the className it was given when no variant is set", () => {
    // 4.0.0 contract, and the reason the migration is pixel-neutral: with no variant there is
    // NO implicit base class, so a caller passing its own design-system classes gets those and
    // nothing else. That is what the removed `theme` prop did.
    render(<Button label="x" className="cu-btn cu-btn-primary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("cu-btn", "cu-btn-primary");
    expect(button.className).toBe("cu-btn cu-btn-primary");
  });

  it("composes variant, size and className in that order", () => {
    // className last so an equal-specificity consumer rule wins on source order.
    render(<Button label="x" variant="primary" size="large" className="dialog-footer-action" />);
    expect(screen.getByRole("button").className).toBe("btn-base btn-primary btn-lg dialog-footer-action");
  });

  it("renders no class attribute at all when given neither a variant nor a className", () => {
    render(<Button label="x" />);
    expect(screen.getByRole("button").getAttribute("class")).toBeNull();
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
