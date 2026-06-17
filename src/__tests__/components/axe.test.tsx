import "@testing-library/jest-dom";
import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Button from "@nxs-atoms/buttons/Button";
import Input from "@nxs-atoms/forms/Input";
import Label from "@nxs-atoms/forms/Label";
import BurgerButton from "@nxs-molecules/buttons/BurgerButton";

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
});
