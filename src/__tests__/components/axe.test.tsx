import "@testing-library/jest-dom";
import type { ReactElement } from "react";
import { render, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Button from "@nxs-atoms/buttons/Button";
import Input from "@nxs-atoms/forms/Input";
import Label from "@nxs-atoms/forms/Label";
import BurgerButton from "@nxs-molecules/buttons/BurgerButton";
import Select from "@nxs-molecules/forms/Select";
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
    // hidden the error node must still render or axe flags an invalid attribute reference.
    expect(
      await check(
        <Select name="role" label="Role" hideLabels error="Required" list={selectList} onChange={() => {}} />
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
