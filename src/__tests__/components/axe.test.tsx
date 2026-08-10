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

const selectList = [{ uid: "1", name: "Admin", label: "Admin", value: "admin" }];

expect.extend(toHaveNoViolations);

// Isolated component renders are not whole pages, so disable the landmark/region rule
// (it only makes sense at the document level and would false-positive here).
const check = async (ui: ReactElement) => {
  const { container } = render(ui);
  return axe(container, { rules: { region: { enabled: false } } });
};

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

  // ── The Form family, in error and in dark mode ────────────────────────────────
  // Every field type, invalid, with the label both shown and hidden, and the whole set again
  // inside a .dark-mode subtree. Error states are where aria wiring is actually exercised, and
  // dark mode is where a component that hardcoded a color instead of reading a token shows up.
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

  it.each(fieldTypes)("Field type %s has no violations inside a dark-mode subtree", async (type) => {
    expect(
      await check(
        <div className="dark-mode">
          <Field {...fieldProps(type, false)} />
        </div>
      )
    ).toHaveNoViolations();
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
});
