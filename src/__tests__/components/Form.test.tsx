import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "@nxs-template/Form";

describe("Form (smoke)", () => {
  it("renders an error message when initialValues is missing", () => {
    // ErrorMessage logs a dev warning — silence it here so the test output stays clean.
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => undefined);
    // @ts-expect-error — exercise the runtime guard
    const { container } = render(<Form formId="x" />);
    expect(container.querySelector("form")).toBeNull();
    warnSpy.mockRestore();
  });

  it("renders fields derived from initialValues and a submit button", () => {
    render(
      <Form
        formId="login"
        initialValues={{ username: "", password: "" }}
        types={{ password: "password" }}
        submitLabel="Sign in"
        onSubmit={() => undefined}
      />
    );
    // submit button label
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    // each field's label appears (from initLabels)
    expect(screen.getByText(/username/i)).toBeInTheDocument();
    expect(screen.getByText(/password/i)).toBeInTheDocument();
  });

  it("invokes onSubmit with the current values when the form is submitted", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        formId="login"
        initialValues={{ username: "alice", password: "secret123" }}
        onSubmit={onSubmit}
      />
    );
    const form = container.querySelector("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form as HTMLFormElement);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({ username: "alice", password: "secret123" });
  });

  it("does not crash and logs an error when onSubmit is missing on a green submission", () => {
    // BUG WAS HERE in Form.tsx:52 — used to throw inside a useEffect, which would
    // crash the whole tree. Verify the graceful path.
    const errSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    const { container } = render(
      <Form formId="login" initialValues={{ username: "alice" }} />
    );
    fireEvent.submit(container.querySelector("form") as HTMLFormElement);
    expect(errSpy).toHaveBeenCalled();
    errSpy.mockRestore();
  });
});
