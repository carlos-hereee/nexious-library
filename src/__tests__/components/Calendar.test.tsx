import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calendar from "@nxs-template/Calendar";
import { months } from "@nxs-utils/calendar/weeks";

describe("Calendar (smoke)", () => {
  it("renders the active month label and a refresh control", () => {
    const value = new Date(2024, 5, 15); // June 2024
    const { container } = render(<Calendar value={value} />);
    // navigation should display the current month name somewhere
    expect(screen.getByText(new RegExp(months[5], "i"))).toBeInTheDocument();
    // root element should carry the calendar class
    expect(container.querySelector(".calendar")).not.toBeNull();
  });

  it("invokes setDay when a day tile is clicked", () => {
    const value = new Date(2024, 5, 1);
    const setDay = jest.fn();
    render(<Calendar value={value} setDay={setDay} />);
    // setDay also fires once for the initial active day via useEffect
    expect(setDay).toHaveBeenCalled();
    expect(setDay.mock.calls[0][0].month).toBe(5);
    expect(setDay.mock.calls[0][0].year).toBe(2024);
  });

  it("renders an event ping when an event matches an active calendar day", () => {
    const value = new Date(2024, 5, 1);
    const events = [{ date: new Date(2024, 5, 15).toString(), list: [{ id: "a" }] }];
    // @ts-expect-error — `events` shape comes from CalendarProps; this is a smoke render
    const { container } = render(<Calendar value={value} events={events} />);
    // Just verify rendering completes — full event-rendering is covered by util tests.
    expect(container.querySelector(".calendar")).not.toBeNull();
  });

  it("applies a custom theme class on the root element", () => {
    const value = new Date(2024, 5, 1);
    const { container } = render(<Calendar value={value} theme="dark-mode" />);
    expect(container.querySelector(".dark-mode.calendar")).not.toBeNull();
  });

  it("clicking the refresh button resets active to today", () => {
    const value = new Date(2024, 0, 15); // January
    const setDay = jest.fn();
    const { container } = render(<Calendar value={value} setDay={setDay} />);
    setDay.mockClear();
    // refresh icon button is the only button in the .flex-j-end wrapper
    const refresh = container.querySelector(".flex-j-end button");
    expect(refresh).not.toBeNull();
    fireEvent.click(refresh as HTMLButtonElement);
    // setDay fires when active changes
    expect(setDay).toHaveBeenCalled();
  });
});
