import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Dialog from "@nxs-template/Dialog";

describe("Dialog", () => {
  it("is a plain container by default (no modal semantics, so it won't clash with a wrapper)", () => {
    render(
      <Dialog header={{ heading: "Settings" }}>
        <p>body</p>
      </Dialog>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("becomes an accessible modal labelled by its heading when asModal is set", () => {
    render(
      <Dialog asModal header={{ heading: "Settings" }} onDialogClose={jest.fn()}>
        <p>body</p>
      </Dialog>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleName("Settings");
  });

  it("gives the close control an accessible name", () => {
    render(
      <Dialog header={{ heading: "Settings" }} onDialogClose={jest.fn()}>
        <p>body</p>
      </Dialog>
    );
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });
});
