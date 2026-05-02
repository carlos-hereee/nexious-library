import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PaginateForm from "@nxs-template/PaginateForm";
import type { FormProps } from "nxs-form";

const buildForm = (formId: string, initialValues: Record<string, string>): FormProps => ({
  formId,
  initialValues,
  submitLabel: `Submit ${formId}`,
});

describe("PaginateForm (smoke)", () => {
  it("renders the first paginated form by default", () => {
    const paginate = [
      buildForm("step-1", { name: "" }),
      buildForm("step-2", { email: "" }),
    ];
    render(<PaginateForm paginate={paginate} />);
    expect(screen.getByText("Submit step-1")).toBeInTheDocument();
  });

  it("renders the form at the specified initial page", () => {
    const paginate = [
      buildForm("step-1", { name: "" }),
      buildForm("step-2", { email: "" }),
    ];
    render(<PaginateForm paginate={paginate} page={1} />);
    expect(screen.getByText("Submit step-2")).toBeInTheDocument();
  });

  it("calls onFormSubmit with values keyed by formId on submit", () => {
    const onFormSubmit = jest.fn();
    const paginate = [
      buildForm("step-1", { name: "alice" }),
      buildForm("step-2", { email: "a@b.co" }),
    ];
    const { container } = render(<PaginateForm paginate={paginate} onFormSubmit={onFormSubmit} />);
    fireEvent.submit(container.querySelector("form") as HTMLFormElement);
    expect(onFormSubmit).toHaveBeenCalledWith({ "step-1": { name: "alice" } });
  });

  it("respects a custom order array when navigating between pages", () => {
    const onFormSubmit = jest.fn();
    const paginate = [
      buildForm("step-a", { x: "1" }),
      buildForm("step-b", { y: "2" }),
    ];
    // order reverses the natural pagination
    const { container } = render(
      <PaginateForm paginate={paginate} order={["step-b", "step-a"]} onFormSubmit={onFormSubmit} />
    );
    fireEvent.submit(container.querySelector("form") as HTMLFormElement);
    // page 0 of paginate is still step-a, but order's first slot is step-b — a submit at page 0 wraps
    // the values under formId step-a. (PaginateForm does not reorder paginate by `order`, only the navigation labels.)
    expect(onFormSubmit).toHaveBeenCalledWith({ "step-a": { x: "1" } });
  });
});
