import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Form from "@nxs-template/Form";

expect.extend(toHaveNoViolations);

// ── A failed submit is announced and reachable ──
// Form renders `responseError` for every consumer form (in the Company Uno client that is login,
// sign up, recovery, app create and edit, events, posts, store, merch and taskboards). Until this
// change the paragraph was silent and unfocusable, so a wrong password produced no signal on any
// channel. These cases pin the three halves of the fix: the role, the focus move on arrival, and
// that a re-render with the SAME error does not steal focus back from a field the user is fixing.

const renderForm = (responseError?: string) =>
  render(
    <Form
      initialValues={{ title: "" }}
      labels={{ title: "Title" }}
      responseError={responseError}
      onSubmit={() => {}}
    />,
  );

describe("Form responseError region", () => {
  it("renders the error as an alert region", () => {
    renderForm("Wrong password");
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Wrong password");
    expect(alert).toHaveClass("error-message");
  });

  it("moves focus to the error when it arrives", () => {
    const { rerender } = render(<Form initialValues={{ title: "" }} labels={{ title: "Title" }} onSubmit={() => {}} />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    rerender(<Form initialValues={{ title: "" }} labels={{ title: "Title" }} responseError="Wrong password" onSubmit={() => {}} />);
    expect(screen.getByRole("alert")).toHaveFocus();
  });

  it("does not re-take focus while the same error stays on screen", () => {
    const { rerender } = renderForm("Wrong password");
    expect(screen.getByRole("alert")).toHaveFocus();
    const field = screen.getByLabelText("Title");
    field.focus();
    rerender(
      <Form initialValues={{ title: "" }} labels={{ title: "Title" }} responseError="Wrong password" onSubmit={() => {}} />,
    );
    expect(field).toHaveFocus();
  });

  it("renders nothing announceable when there is no error", () => {
    renderForm(undefined);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("has no axe violations in the error state", async () => {
    const { container } = renderForm("Wrong password");
    expect(await axe(container, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });
});
