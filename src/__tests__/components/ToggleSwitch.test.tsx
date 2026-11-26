import "@testing-library/jest-dom";
import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import ToggleSwitch from "@nxs-atoms/forms/ToggleSwitch";
import ToggleRow from "@nxs-molecules/forms/ToggleRow";
import LegalConsentCheckbox from "@nxs-molecules/forms/LegalConsentCheckbox";

expect.extend(toHaveNoViolations);

// ToggleSwitch, ToggleRow and LegalConsentCheckbox (2026-11 item 337, Phase 5 repair), ported from
// the client's ToggleSwitch.tsx, MembersOnlyToggle.tsx and LegalConsentCheckbox.tsx. Pinned: the
// switch role and state, native keyboard activation (a native button turns Enter and Space into a
// click, which jsdom does not synthesize, so the tests assert the native element and its tab stop
// and fire the click a key sends), the row's name and description, the consent sentence with real
// links, the alert error tied to the input, and jest-axe.

const AXE_OPTIONS = { rules: { region: { enabled: false } } };

const RouterLink = ({ to, children }: { to: string; children?: React.ReactNode }) => (
  <a data-router-to={to} href={to}>
    {children}
  </a>
);

const ControlledSwitch = () => {
  const [isOn, setOn] = useState(false);
  return <ToggleSwitch checked={isOn} onChange={() => setOn((value) => !value)} label="Message emails" />;
};

describe("ToggleSwitch", () => {
  it("is a native button with role switch, named by its label, announcing its state", () => {
    render(<ControlledSwitch />);
    const control = screen.getByRole("switch", { name: "Message emails" });
    expect(control.tagName).toBe("BUTTON");
    expect(control).toHaveAttribute("type", "button");
    expect(control).toHaveAttribute("aria-checked", "false");
    expect(control).toHaveClass("nxs-switch", "nxs-switch-off");
    fireEvent.click(control);
    expect(control).toHaveAttribute("aria-checked", "true");
    expect(control).toHaveClass("nxs-switch-on");
  });

  it("is one tab stop and leaves the tab order when disabled", () => {
    const onChange = jest.fn();
    const { rerender } = render(<ToggleSwitch checked onChange={onChange} label="Pause" describedBy="why" />);
    const control = screen.getByRole("switch");
    expect(control.tabIndex).toBe(0);
    control.focus();
    expect(control).toHaveFocus();
    expect(control).toHaveAttribute("aria-describedby", "why");
    rerender(<ToggleSwitch checked onChange={onChange} label="Pause" disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("has no axe violations", async () => {
    const { container } = render(<ToggleSwitch checked={false} onChange={() => {}} label="Message emails" />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

describe("ToggleRow", () => {
  it("names the switch by the label, describes it by the help line and calls onChange with the next value", () => {
    const onChange = jest.fn();
    render(<ToggleRow checked={false} onChange={onChange} label="Members only" help="Only members can open this page" id="members-only" />);
    const control = screen.getByRole("switch", { name: "Members only" });
    expect(control).toHaveAccessibleDescription("Only members can open this page");
    expect(control).toHaveAttribute("id", "members-only");
    fireEvent.click(control);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("has no axe violations", async () => {
    const { container } = render(<ToggleRow checked onChange={() => {}} label="Members only" help="Help" />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

const consentProps = {
  prefix: "I agree to the",
  terms: { label: "Terms of Service", href: "/terms" },
  join: "and the",
  privacy: { label: "Privacy Policy", href: "/privacy" },
};

describe("LegalConsentCheckbox", () => {
  it("labels the checkbox with the whole sentence and its two links", () => {
    const onChange = jest.fn();
    render(<LegalConsentCheckbox {...consentProps} checked={false} onChange={onChange} linkComponent={RouterLink} />);
    const box = screen.getByRole("checkbox", { name: "I agree to the Terms of Service and the Privacy Policy" });
    expect(screen.getByRole("link", { name: "Terms of Service" })).toHaveAttribute("data-router-to", "/terms");
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("data-router-to", "/privacy");
    box.focus();
    expect(box).toHaveFocus();
    fireEvent.click(box);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("announces the error as an alert tied to the input", () => {
    render(<LegalConsentCheckbox {...consentProps} checked={false} onChange={() => {}} error="Agree to continue" inputId="c-in" errorId="c-err" />);
    const box = screen.getByRole("checkbox");
    expect(box).toHaveAttribute("id", "c-in");
    expect(box).toHaveAttribute("aria-invalid", "true");
    expect(box).toHaveAccessibleDescription("Agree to continue");
    expect(screen.getByRole("alert")).toHaveAttribute("id", "c-err");
  });

  it("neutralizes a dangerous href on the plain anchor path", () => {
    // eslint-disable-next-line no-script-url
    render(<LegalConsentCheckbox {...consentProps} terms={{ label: "Terms", href: "javascript:alert(1)" }} checked onChange={() => {}} />);
    expect(screen.getByRole("link", { name: "Terms" })).toHaveAttribute("href", "#");
  });

  it("has no axe violations with and without the error", async () => {
    const plain = render(<LegalConsentCheckbox {...consentProps} checked={false} onChange={() => {}} />);
    expect(await axe(plain.container, AXE_OPTIONS)).toHaveNoViolations();
    const withError = render(<LegalConsentCheckbox {...consentProps} checked={false} onChange={() => {}} error="Agree to continue" />);
    expect(await axe(withError.container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
