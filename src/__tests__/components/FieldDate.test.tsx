import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import FieldDate from "@nxs-molecules/forms/FieldDate";

describe("FieldDate does not fill itself in", () => {
  it("emits nothing on mount", () => {
    // The bug this pins: the old component fired onChange(today) from a useEffect on mount, so an
    // OPTIONAL date field could never be left blank. That is why the Press page kind stores
    // publishedOn as a plain string and why type "date" never entered the page kind vocabulary.
    const onChange = jest.fn();
    render(<FieldDate name="publishedOn" value="" onChange={onChange} />);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("emits on mount only when defaultToToday is explicitly on", () => {
    const onChange = jest.fn();
    render(<FieldDate name="publishedOn" value="" defaultToToday onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("does not seed over a value the consumer already has", () => {
    const onChange = jest.fn();
    render(<FieldDate name="publishedOn" value="Mon Aug 03 2026" defaultToToday onChange={onChange} />);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("FieldDate degrades instead of crashing", () => {
  it("does not throw when onChange is missing", () => {
    // It used to `throw Error("onChange is required")` on the render path. The library ships no
    // error boundary, so that white-screened the consumer's entire subtree.
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<FieldDate name="publishedOn" value="" />)).not.toThrow();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe("FieldDate mounts one calendar, not N", () => {
  it("keeps the calendar closed until the trigger is used", () => {
    // A permanently mounted month grid meant a repeating entry group rendered one full calendar
    // PER ITEM, which is what made a multi-date form unusable.
    render(<FieldDate name="publishedOn" value="" onChange={jest.fn()} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /choose a date/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("shows a placeholder rather than rendering blank when empty", () => {
    render(<FieldDate name="publishedOn" value="" onChange={jest.fn()} />);
    expect(screen.getByRole("button", { name: /choose a date/i })).toBeInTheDocument();
  });

  it("shows the chosen value on the trigger", () => {
    render(<FieldDate name="publishedOn" value="Mon Aug 03 2026" onChange={jest.fn()} />);
    expect(screen.getByRole("button", { name: /Mon Aug 03 2026/ })).toBeInTheDocument();
  });

  it("closes the popover on Escape", () => {
    render(<FieldDate name="publishedOn" value="" onChange={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /choose a date/i }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
