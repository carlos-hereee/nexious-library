import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import FieldTime from "@nxs-molecules/forms/FieldTime";
import { to24Hour, toWireTime } from "@nxs-utils/form/time";

describe("time conversion at the wire boundary", () => {
  it("round-trips every hour of the clock", () => {
    for (let hour = 0; hour < 24; hour += 1) {
      const wire = toWireTime(`${`${hour}`.padStart(2, "0")}:30`);
      expect(to24Hour(wire)).toBe(`${`${hour}`.padStart(2, "0")}:30`);
    }
  });

  it("handles the two places 12 is the exception", () => {
    expect(to24Hour("12:00 AM")).toBe("00:00");
    expect(to24Hour("12:00 PM")).toBe("12:00");
    expect(toWireTime("00:00")).toBe("12:00 AM");
    expect(toWireTime("12:00")).toBe("12:00 PM");
  });

  it("treats empty as empty in both directions", () => {
    // Clearing a time field is a real action, not a parse failure.
    expect(to24Hour("")).toBe("");
    expect(toWireTime("")).toBe("");
    expect(to24Hour(undefined)).toBe("");
  });

  it("passes an already-24-hour value straight through", () => {
    expect(to24Hour("15:45")).toBe("15:45");
  });

  it("rejects out-of-range values instead of producing a nonsense time", () => {
    expect(to24Hour("13:00 PM")).toBe("");
    expect(to24Hour("25:00")).toBe("");
    expect(toWireTime("10:75")).toBe("");
  });
});

describe("FieldTime cannot be corrupted by the letters A and M", () => {
  it("round-trips a value whose own text contains AM and PM elsewhere", () => {
    // The control this replaces flipped the meridiem with value.split("AM").join(""), so any
    // value carrying those letters elsewhere was silently mangled. The parser is anchored to the
    // end of the string, so nothing in the middle can reach it.
    expect(to24Hour("PROGRAM 3:00 PM")).toBe("");
    expect(to24Hour("3:00 PM")).toBe("15:00");
  });

  it("does not mangle the value when a sibling label contains those letters", () => {
    const onChange = jest.fn();
    render(
      <>
        <span>AM/PM STREAM SCHEDULE</span>
        <FieldTime name="opens" value="3:00 PM" onChange={onChange} />
      </>
    );
    // Incoming: 3:00 PM reached the native control as 15:00, so the parse was not thrown off by
    // the sibling text. Outgoing: a new pick converts back to the wire format cleanly. React
    // does not dispatch a change event for an identical value, hence a different time here.
    const input = screen.getByDisplayValue("15:00");
    fireEvent.change(input, { target: { value: "16:30" } });
    expect(onChange).toHaveBeenCalledWith("4:30 PM");
  });
});

describe("FieldTime is one control", () => {
  it("renders a single time input and no separate meridiem button", () => {
    render(<FieldTime name="opens" value="9:00 AM" onChange={jest.fn()} />);
    expect(screen.getByDisplayValue("09:00")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("attaches a datalist of suggestions to that same input rather than adding a second control", () => {
    const list = [
      { name: "9:00", value: "9:00 AM", label: "9:00 AM", uid: "a" },
      { name: "17:00", value: "5:00 PM", label: "5:00 PM", uid: "b" },
    ];
    const { container } = render(<FieldTime name="opens" value="" list={list} onChange={jest.fn()} />);
    const input = container.querySelector("input[type='time']");
    const datalist = container.querySelector("datalist");
    expect(datalist).toBeInTheDocument();
    expect(input?.getAttribute("list")).toBe(datalist?.id);
    expect(container.querySelectorAll("datalist option")).toHaveLength(2);
  });

  it("does not throw when onChange is missing", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<FieldTime name="opens" value="9:00 AM" />)).not.toThrow();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
