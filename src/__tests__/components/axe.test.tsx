import "@testing-library/jest-dom";
import type { ReactElement } from "react";
import { render, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Button from "@nxs-atoms/buttons/Button";
import Input from "@nxs-atoms/forms/Input";
import Label from "@nxs-atoms/forms/Label";
import BurgerButton from "@nxs-molecules/buttons/BurgerButton";
import Select from "@nxs-molecules/forms/Select";
import Field from "@nxs-molecules/forms/Field";
import EntryNavigator from "@nxs-molecules/forms/EntryNavigator";
import type { FormFieldProps } from "nxs-form";
import ThemeMenu from "@nxs-molecules/navigation/ThemeMenu";
import DialogOverlay from "@nxs-template/DialogOverlay";
import Dialog from "@nxs-template/Dialog";
import Calendar from "@nxs-template/Calendar";
import type { CalendarTimedEvent } from "nxs-calendar";

const selectList = [{ uid: "1", name: "Admin", label: "Admin", value: "admin" }];

expect.extend(toHaveNoViolations);

// Isolated component renders are not whole pages, so disable the landmark/region rule
// (it only makes sense at the document level and would false-positive here).
const check = async (ui: ReactElement) => {
  const { container } = render(ui);
  return axe(container, { rules: { region: { enabled: false } } });
};

// React's useId mints a document-unique id on every render, so rendering one tree twice produces
// markup that differs by that string alone (FieldTime's datalist is the live case). Any test that
// compares two renders has to blank those out first or it reports a difference that has nothing
// to do with what it is testing. Both React id spellings are covered because the library is built
// against React 18 and consumed on 19.
const normalizeGeneratedIds = (html?: string): string =>
  (html ?? "").replace(/:r[0-9a-z]+:|_r_[0-9a-z]+_/g, "generated-id");

describe("axe accessibility (no violations on isolated renders)", () => {
  it("Button has an accessible name and no violations", async () => {
    expect(await check(<Button label="Save" />)).toHaveNoViolations();
  });

  it("BurgerButton (icon-only) has no violations", async () => {
    expect(await check(<BurgerButton isBurger={false} onClick={() => {}} />)).toHaveNoViolations();
  });

  it("a Label-associated Input has no violations", async () => {
    expect(
      await check(
        <>
          <Label name="email" label="Email" />
          <Input name="email" />
        </>
      )
    ).toHaveNoViolations();
  });

  it("DialogOverlay (modal) has an accessible name and no violations", async () => {
    // DialogOverlay portals to document.body, so axe must scan baseElement (the body),
    // not the render container. A header heading gives the dialog its accessible name.
    const { baseElement } = render(
      <DialogOverlay header={{ heading: "Confirm action" }} onDialogClose={() => {}}>
        <p>Are you sure you want to continue?</p>
      </DialogOverlay>
    );
    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it("Dialog (asModal) with a heading has no violations", async () => {
    expect(
      await check(
        <Dialog asModal header={{ heading: "Confirm" }} onDialogClose={() => {}}>
          <p>Dialog body</p>
        </Dialog>
      )
    ).toHaveNoViolations();
  });

  it("Select with a visible label and error wires aria with no violations", async () => {
    expect(
      await check(<Select name="role" label="Role" error="Required" list={selectList} onChange={() => {}} />)
    ).toHaveNoViolations();
  });

  it("Select with a HIDDEN label and error has no dangling aria-describedby", async () => {
    // Regression guard: the <select> sets aria-describedby=`role-error`; with the label
    // hidden the error node must still render or the description resolves to nothing.
    const { container } = render(
      <Select name="role" label="Role" hideLabels error="Required" list={selectList} onChange={() => {}} />
    );
    // Asserted directly, not left to axe. axe does NOT currently flag a dangling
    // aria-describedby, so this suite went on passing when the fallback node was briefly removed
    // during the Phase 2 shell work. The explicit assertion is the thing that catches it.
    const described = container.querySelector("select")?.getAttribute("aria-describedby");
    expect(described).toBe("role-error");
    expect(container.querySelector(`#${described}`)).toBeInTheDocument();
    expect(await axe(container, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  // ── The Form family, in error, disabled, and in dark mode ─────────────────────
  // Every field type, invalid, with the label both shown and hidden, again disabled, and the
  // whole set again inside a .dark-mode subtree. Error and disabled states are where aria wiring
  // is actually exercised.
  //
  // Be precise about what the dark-mode pass proves, because the obvious reading is wrong: jsdom
  // loads no stylesheet, so `.dark-mode` resolves to no styles here and axe's color-contrast rule
  // cannot run at all (it needs computed colors). These cases assert that no field branches on
  // theme to emit different markup or a different accessible name. Dark CONTRAST is asserted
  // against the real token values elsewhere, never here.
  const fieldTypes = ["text", "textarea", "select", "number", "date", "date-time", "date-day", "date-week", "datalist"];

  const fieldProps = (type: string, hideLabels: boolean): FormFieldProps => ({
    name: "title",
    value: "",
    placeholder: "",
    label: "Title",
    type,
    fieldId: "title-id",
    formError: "This field is required",
    hideLabels,
    dataList: { title: selectList },
    handleChange: () => {},
  });

  it.each(fieldTypes)("Field type %s in an error state has no violations", async (type) => {
    expect(await check(<Field {...fieldProps(type, false)} />)).toHaveNoViolations();
  });

  it.each(fieldTypes)("Field type %s in an error state with a HIDDEN label has no violations", async (type) => {
    expect(await check(<Field {...fieldProps(type, true)} />)).toHaveNoViolations();
  });

  it.each(fieldTypes)("Field type %s resolves its aria-describedby to a real node", async (type) => {
    // The assertion axe will not make for us. Seven of the nine types used to render the error
    // inside the Label, so hiding the label deleted the node the description pointed at.
    const { container } = render(<Field {...fieldProps(type, true)} />);
    const described = container.querySelector("[aria-describedby]");
    if (described) {
      const id = described.getAttribute("aria-describedby");
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    }
    // Whether or not the control wires a description, exactly one error node must exist.
    expect(container.querySelectorAll("#title-error")).toHaveLength(1);
  });

  it.each(fieldTypes)("Field type %s has no violations while the form is disabled", async (type) => {
    // No formError here: a disabled control is the state a submitting form is in, and pairing it
    // with a validation message would test two states at once and hide which one broke.
    expect(await check(<Field {...fieldProps(type, false)} formError={undefined} disableForm />)).toHaveNoViolations();
  });

  // Every type, "number" included. It was excluded for one pass: this sweep found that
  // FieldQuantity destructured its props without isDisabled, so the value fieldRegistry passed it
  // was dropped and a `type: "number"` control stayed editable inside a submitting form while
  // every sibling was disabled. The chain was declared, passed and consumed correctly and broke at
  // exactly one missing forward, which is why nothing caught it: it type-checks and it looks fine
  // on screen. Fixed in FieldQuantity.tsx in the same pass, and this loop is now the regression
  // test, so a new field type that ignores disableForm fails here.
  it.each(fieldTypes)("Field type %s disables every control it renders", async (type) => {
    // A single editable input inside a submitting form is enough to double-submit.
    const { container } = render(<Field {...fieldProps(type, false)} formError={undefined} disableForm />);
    const controls = container.querySelectorAll("input, select, textarea, button");

    expect(controls.length).toBeGreaterThan(0);
    controls.forEach((control) => expect(control).toBeDisabled());
  });

  it.each(fieldTypes)("Field type %s renders identically inside a dark-mode subtree", async (type) => {
    // The markup comparison is what gives this case its teeth. "No violations under .dark-mode"
    // alone would pass on a field that swapped its labelled control for an icon-only one, since
    // axe judges each render on its own; comparing the two subtrees byte for byte does not.
    const light = render(<Field {...fieldProps(type, false)} />).container;
    const dark = render(
      <div className="dark-mode">
        <Field {...fieldProps(type, false)} />
      </div>
    ).container;

    expect(await axe(dark, { rules: { region: { enabled: false } } })).toHaveNoViolations();
    expect(normalizeGeneratedIds(dark.firstElementChild?.innerHTML)).toBe(normalizeGeneratedIds(light.innerHTML));
  });

  it("EntryNavigator has no violations", async () => {
    const entries = {
      "slot-0": [{ name: "day", value: "Monday", type: "text", label: "Day", placeholder: "", fieldId: "a" }],
      "slot-1": [{ name: "day", value: "Tuesday", type: "text", label: "Day", placeholder: "", fieldId: "b" }],
    };
    expect(
      await check(
        <EntryNavigator entries={entries} activeEntry="slot-0" max={5} railLabel="Store hours" onSelect={() => {}} />
      )
    ).toHaveNoViolations();
  });

  it("EntryNavigator with zero entries still names its group and has no violations", async () => {
    // The empty state the switcher spends its first render in. The group must keep its
    // accessible name with nothing inside it, because that name is the only thing telling a
    // screen reader user what the add button they are about to press will add to.
    const { container } = render(
      <EntryNavigator entries={{}} activeEntry="" max={5} railLabel="Store hours" onSelect={() => {}} />
    );

    expect(container.querySelectorAll(".entry-rail-tile")).toHaveLength(0);
    expect(container.querySelector('[role="group"]')).toHaveAccessibleName("Store hours");
    expect(await axe(container, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it("EntryNavigator with every tile disabled keeps its names and has no violations", async () => {
    const entries = {
      "slot-0": [{ name: "day", value: "Monday", type: "text", label: "Day", placeholder: "", fieldId: "a" }],
    };
    const { container } = render(
      <EntryNavigator entries={entries} activeEntry="slot-0" isDisabled railLabel="Store hours" onSelect={() => {}} />
    );
    const tile = container.querySelector(".entry-rail-tile");

    // A disabled tile is still read out, so losing the name here is worse than losing it on an
    // enabled one: the user cannot click it to find out what it was.
    expect(tile).toBeDisabled();
    expect(tile).toHaveAccessibleName("Item 1 of 1, Monday");
    expect(await axe(container, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it("ThemeMenu open listbox has no violations", async () => {
    const swatch = { primary: "#ffffff", secondary: "#eeeeee", altPrimary: "#dddddd", altSecondary: "#cccccc" };
    const themeList = [
      { uid: "l", name: "light-mode", value: "light", label: "Light", colors: swatch, backgroundColors: swatch },
      { uid: "d", name: "dark-mode", value: "dark", label: "Dark", colors: swatch, backgroundColors: swatch },
    ];
    // ThemeMenu's root is an <li>, so wrap it in a <ul> to keep the listitem valid; then
    // open the popover so the role="listbox"/role="option" markup is in the DOM for axe.
    const { container } = render(
      <ul>
        <ThemeMenu list={themeList} active="light" handleChange={() => {}} />
      </ul>
    );
    fireEvent.click(container.querySelector(".theme-menu-trigger") as HTMLElement);
    expect(await axe(container, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  // ── Calendar week and day views ──
  // Free positioned blocks, sticky rows, an aria-hidden gutter and a hand-rolled today marker:
  // exactly the kind of markup axe catches drifting. A fixed local clock keeps "today" inside
  // the rendered week on every machine, and the overlap and all day overflow cases are the ones
  // with the most generated ARIA.
  describe("Calendar week and day views", () => {
    const calendarNow = new Date(2026, 8, 11, 14, 30);
    const at = (day: number, hour: number, minute = 0) => new Date(2026, 8, day, hour, minute);
    const timedEvents: CalendarTimedEvent[] = [
      { id: "a", title: "Design review", start: at(11, 9), end: at(11, 10, 30), tone: "info", icon: "edit" },
      { id: "b", title: "Standup", start: at(11, 9, 30), end: at(11, 10), tone: "success" },
      { id: "c", title: "Lunch", start: at(11, 12), end: at(11, 13), tone: "neutral", isMuted: true },
      { id: "d", title: "Late shift", start: at(11, 22), end: at(12, 2), tone: "warn" },
      { id: "e", title: "Launch day", start: at(11, 0), allDay: true },
      { id: "f", title: "Conference", start: at(11, 0), allDay: true, tone: "danger" },
      { id: "g", title: "Birthday", start: at(11, 0), allDay: true },
    ];

    it("week view with overlapping and folded all day events has no violations", async () => {
      expect(
        await check(<Calendar value={calendarNow} view="week" now={calendarNow} locale="en-US" timedEvents={timedEvents} />)
      ).toHaveNoViolations();
    });

    it("week view with the all day row unfolded has no violations", async () => {
      const { container } = render(
        <Calendar value={calendarNow} view="week" now={calendarNow} locale="en-US" timedEvents={timedEvents} />
      );
      fireEvent.click(container.querySelector(".calendar-allday-more") as HTMLElement);
      expect(await axe(container, { rules: { region: { enabled: false } } })).toHaveNoViolations();
    });

    it("day view under a consumer header (hideNavigation, controlled date) has no violations", async () => {
      expect(
        await check(
          <Calendar
            value={calendarNow}
            view="day"
            now={calendarNow}
            date={calendarNow}
            hideNavigation
            locale="en-US"
            timedEvents={timedEvents}
          />
        )
      ).toHaveNoViolations();
    });

    it("week view in an RTL wrapper has no violations", async () => {
      expect(
        await check(
          <div dir="rtl">
            <Calendar value={calendarNow} view="week" now={calendarNow} locale="ar" timedEvents={timedEvents} />
          </div>
        )
      ).toHaveNoViolations();
    });
  });
});
