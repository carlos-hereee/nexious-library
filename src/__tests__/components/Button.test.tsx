import "@testing-library/jest-dom";
import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Button from "@nxs-atoms/buttons/Button";
import { buildControlClass, NXS_SIZE_CLASS, NXS_VARIANT_CLASS } from "../../@types/Variant";
import type { Size, Variant } from "../../@types/Variant";

expect.extend(toHaveNoViolations);

const VARIANTS: Variant[] = ["primary", "secondary", "tertiary", "danger", "ghost"];
const SIZES: Size[] = ["small", "medium", "large"];

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
    // 2026-11 item 337: the nxs-btn classes are added BESIDE the 4.0.0 btn-base set, never in
    // place of it, because the client still styles those hooks and picks 5.0.0 up on publish day.
    expect(screen.getByRole("button").className).toBe(
      "btn-base btn-primary btn-lg nxs-btn nxs-btn-primary nxs-btn-large dialog-footer-action"
    );
  });

  it.each(VARIANTS)("variant %s renders nxs-btn and its nxs variant class beside the 4.0.0 pair", (variant) => {
    render(<Button label="x" variant={variant} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn-base", `btn-${variant}`, "nxs-btn", NXS_VARIANT_CLASS[variant]);
  });

  it.each(SIZES)("size %s renders its nxs size class beside the 4.0.0 size class", (size) => {
    render(<Button label="x" variant="secondary" size={size} />);
    expect(screen.getByRole("button")).toHaveClass("nxs-btn", NXS_SIZE_CLASS[size]);
  });

  it("a size with no variant adds only its size classes, never the nxs-btn base", () => {
    // The base rides with the variant, as btn-base does, so a caller styling its own control and
    // asking only for a size never gains a base look underneath its classes.
    render(<Button label="x" size="small" className="toolbar-button" />);
    expect(screen.getByRole("button").className).toBe("btn-sm nxs-btn-small toolbar-button");
  });

  it("buildControlClass returns exactly the className with neither a variant nor a size", () => {
    expect(buildControlClass({ className: "cu-btn cu-btn-secondary cu-btn-icon" })).toBe(
      "cu-btn cu-btn-secondary cu-btn-icon"
    );
    expect(buildControlClass({})).toBeUndefined();
  });

  it("is a native button a keyboard reaches, and leaves the tab order when disabled", () => {
    // Enter and Space activation come from the native element, so the contract to hold is that
    // Button is a real <button> with no negative tabindex, and that disabling it removes it.
    const { rerender } = render(<Button label="Save" variant="primary" />);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button.tagName).toBe("BUTTON");
    expect(button).not.toHaveAttribute("tabindex");
    button.focus();
    expect(button).toHaveFocus();
    rerender(<Button label="Save" variant="primary" isDisabled />);
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });

  it("has no axe violations in any variant and size", async () => {
    const { container } = render(
      <div>
        {VARIANTS.flatMap((variant) =>
          SIZES.map((size) => <Button key={`${variant}-${size}`} label={`${variant} ${size}`} variant={variant} size={size} />)
        )}
        <Button variant="tertiary" className="nxs-btn-icon" aria-label="Close" />
        <Button variant="primary" label="Disabled" isDisabled />
      </div>
    );
    expect(await axe(container, { rules: { region: { enabled: false } } })).toHaveNoViolations();
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
