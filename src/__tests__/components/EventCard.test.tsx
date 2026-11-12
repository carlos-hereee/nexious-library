import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import EventCard from "@nxs-organism/card/EventCard";

expect.extend(toHaveNoViolations);

// EventCard (2026-11 item 337, Session 4b) is ported from nexious-client's EventCardContent and the
// feed's EventCard. Pinned here: both densities, the heading level, dates as time elements with a
// machine readable dateTime, the caller's formatter called with the part and the all day flag, no
// end time, an all day event read as its local day, and the link through safeUrl or linkComponent.

const AXE_OPTIONS = { rules: { region: { enabled: false } } };
const START = "2026-11-20T19:00:00.000Z";
const END = "2026-11-20T21:00:00.000Z";
const formatDate = (date: Date, part: string, isAllDay: boolean) =>
  `${part}:${isAllDay ? "day" : "time"}:${date.getDate()}`;

const RouterLink = ({ to, className, children }: { to: string; className?: string; children?: React.ReactNode }) => (
  <a href={`#router${to}`} className={className} data-router="yes">
    {children}
  </a>
);

describe("EventCard as a card", () => {
  it("renders on nxs-card as an article with the title heading at level 3 by default", () => {
    const { container } = render(<EventCard event={{ title: "Raid night", start: START }} formatDate={formatDate} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe("ARTICLE");
    expect(root).toHaveClass("nxs-card", "nxs-event-card");
    expect(screen.getByRole("heading", { level: 3, name: "Raid night" })).toBeInTheDocument();
  });

  it("renders the title at the heading level asked", () => {
    render(<EventCard event={{ title: "Raid night", start: START }} formatDate={formatDate} headingLevel={2} />);
    expect(screen.getByRole("heading", { level: 2, name: "Raid night" })).toBeInTheDocument();
  });

  it("renders start and end as time elements with ISO dateTime and the caller's text", () => {
    const formatter = jest.fn(formatDate);
    const { container } = render(
      <EventCard event={{ title: "Raid night", start: START, end: END }} formatDate={formatter} rangeSeparator="to" />
    );
    const times = Array.from(container.querySelectorAll("time"));
    expect(times.map((time) => time.getAttribute("dateTime"))).toEqual([START, END]);
    expect(times.map((time) => time.className)).toEqual(["nxs-event-card-start", "nxs-event-card-end"]);
    expect(formatter).toHaveBeenCalledWith(new Date(START), "start", false);
    expect(formatter).toHaveBeenCalledWith(new Date(END), "end", false);
    expect(container.querySelector(".nxs-event-card-separator")).toHaveTextContent("to");
  });

  it("shows the start alone when there is no end time", () => {
    const { container } = render(<EventCard event={{ title: "Open mic", start: START }} formatDate={formatDate} />);
    expect(container.querySelectorAll("time")).toHaveLength(1);
    expect(container.querySelector(".nxs-event-card-separator")).toBeNull();
  });

  it("hides the default separator from speech", () => {
    const { container } = render(
      <EventCard event={{ title: "Raid night", start: START, end: END }} formatDate={formatDate} />
    );
    expect(container.querySelector(".nxs-event-card-separator > span")).toHaveAttribute("aria-hidden", "true");
  });

  it("reads an all day event as its local day, tells the formatter, and shows the caller's badge", () => {
    const formatter = jest.fn(formatDate);
    const { container } = render(
      <EventCard
        event={{ title: "Season start", start: "2026-11-12", isAllDay: true }}
        formatDate={formatter}
        allDayLabel="All day"
      />
    );
    expect(container.querySelector("time")).toHaveAttribute("dateTime", "2026-11-12");
    expect(container.querySelector("time")).toHaveTextContent("start:day:12");
    expect(formatter).toHaveBeenCalledWith(new Date(2026, 10, 12), "start", true);
    expect(container.querySelector(".nxs-event-card-all-day")).toHaveTextContent("All day");
  });

  it("adds no all day badge without a label, and prints an unreadable date as its raw text", () => {
    const { container } = render(
      <EventCard event={{ title: "Odd", start: "someday", isAllDay: true }} formatDate={formatDate} />
    );
    expect(container.querySelector(".nxs-event-card-all-day")).toBeNull();
    expect(container.querySelector("time")).toBeNull();
    expect(container.querySelector(".nxs-event-card-start")).toHaveTextContent("someday");
  });

  it("renders badges, the location with its spoken label, the children and the actions footer", () => {
    const { container } = render(
      <EventCard
        event={{ title: "Raid night", start: START, location: "Main hall", badges: <span>Recurring</span> }}
        formatDate={formatDate}
        locationLabel="Location"
        actions={<button type="button">Open calendar</button>}
      >
        <p>Bring snacks</p>
      </EventCard>
    );
    const body = container.querySelector(".nxs-card-body") as HTMLElement;
    expect(Array.from(body.children).map((part) => part.className || part.tagName)).toEqual([
      "nxs-event-card-badges",
      "nxs-event-card-location",
      "P",
    ]);
    expect(container.querySelector(".nxs-event-card-location .sr-only")).toHaveTextContent("Location:");
    expect(container.querySelector(".nxs-card-footer")).toContainElement(
      screen.getByRole("button", { name: "Open calendar" })
    );
  });

  it("makes the title a stretched link through safeUrl, or through the caller's linkComponent", () => {
    const { rerender } = render(
      <EventCard event={{ title: "Raid night", start: START, href: "/calendar/iron-forge" }} formatDate={formatDate} />
    );
    expect(screen.getByRole("link", { name: "Raid night" })).toHaveAttribute("href", "/calendar/iron-forge");
    expect(screen.getByRole("link", { name: "Raid night" })).toHaveClass("nxs-card-link");
    rerender(
      // eslint-disable-next-line no-script-url
      <EventCard event={{ title: "Raid night", start: START, href: "javascript:alert(1)" }} formatDate={formatDate} />
    );
    expect(screen.getByRole("link", { name: "Raid night" })).toHaveAttribute("href", "#");
    rerender(
      <EventCard
        event={{ title: "Raid night", start: START, href: "/calendar/iron-forge" }}
        formatDate={formatDate}
        linkComponent={RouterLink}
      />
    );
    expect(screen.getByRole("link", { name: "Raid night" })).toHaveAttribute("data-router", "yes");
  });
});

describe("EventCard as a row", () => {
  it("renders on ListRow with the when line as the subtitle and badges as the meta", () => {
    const { container } = render(
      <EventCard
        density="row"
        event={{ title: "Raid night", start: START, end: END, badges: <span>Paused</span> }}
        formatDate={formatDate}
        actions={<button type="button">Mute</button>}
      />
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe("DIV");
    expect(root).toHaveClass("nxs-list-row", "nxs-event-card", "nxs-event-card-row");
    expect(container.querySelector(".nxs-list-row-subtitle time")).not.toBeNull();
    expect(container.querySelector(".nxs-list-row-meta")).toHaveTextContent("Paused");
    expect(screen.queryByRole("heading")).toBeNull();
  });

  it("renders the row title as a heading only when asked, and its link with the row link class", () => {
    render(
      <EventCard
        density="row"
        headingLevel={4}
        event={{ title: "Raid night", start: START, href: "/events/1" }}
        formatDate={formatDate}
      />
    );
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("Raid night");
    expect(screen.getByRole("link", { name: "Raid night" })).toHaveClass("nxs-list-row-link");
  });

  it("keeps the link and the actions as the only tab stops", () => {
    const { container } = render(
      <EventCard
        density="row"
        event={{ title: "Raid night", start: START, href: "/events/1" }}
        formatDate={formatDate}
        actions={<button type="button">Mute</button>}
      />
    );
    const stops = Array.from(container.querySelectorAll<HTMLElement>("a[href], button, [tabindex]"));
    expect(stops.map((element) => element.textContent)).toEqual(["Raid night", "Mute"]);
    stops.forEach((element) => {
      element.focus();
      expect(element).toHaveFocus();
    });
  });
});

describe("EventCard accessibility", () => {
  it("has no axe violations as cards and rows in lists", async () => {
    const { container } = render(
      <>
        <ul aria-label="Upcoming">
          <EventCard
            as="li"
            event={{ title: "Raid night", start: START, end: END, location: "Main hall", href: "/events/1" }}
            formatDate={formatDate}
            locationLabel="Location"
            rangeSeparator="to"
            actions={<button type="button">Open calendar</button>}
          />
          <EventCard
            as="li"
            event={{ title: "Season start", start: "2026-11-12", isAllDay: true }}
            formatDate={formatDate}
            allDayLabel="All day"
          />
        </ul>
        <ul className="nxs-list-row-group" aria-label="This week">
          <EventCard as="li" density="row" event={{ title: "Open mic", start: START }} formatDate={formatDate} />
        </ul>
      </>
    );
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
