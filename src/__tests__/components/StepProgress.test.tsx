import { render, screen } from "@testing-library/react";
import StepProgress from "@nxs-molecules/navigation/StepProgress";

// Ported from nexious-client's stepProgress test when the stepper moved here. What matters is the
// accessibility contract every paginated form relies on: exactly one step carries aria-current,
// the bar's value tracks the step, and the live region announces the current step by name.
describe("StepProgress", () => {
  const steps = ["one", "two", "three"] as const;
  const renderAt = (current: number, extra: { className?: string; classNames?: { root?: string } } = {}) =>
    render(
      <StepProgress
        steps={steps}
        current={current}
        labelFor={(id) => `label-${id}`}
        progressLabel="Progress"
        stepOfText={`Step ${current + 1} of ${steps.length}`}
        {...extra}
      />
    );

  it("marks only the current step and fills the bar to it", () => {
    renderAt(1);
    const current = screen.getAllByRole("listitem").filter((li) => li.getAttribute("aria-current") === "step");
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveTextContent("label-two");
    const bar = screen.getByRole("progressbar", { name: "Progress" });
    expect(bar).toHaveAttribute("value", "2");
    expect(bar).toHaveAttribute("max", "3");
    expect(bar).toHaveAttribute("aria-valuetext", "Step 2 of 3");
  });

  it("announces the step by name in the polite live region", () => {
    renderAt(2);
    const live = document.querySelector("[aria-live='polite']");
    expect(live).toHaveTextContent("Step 3 of 3: label-three");
    // The library's own visually hidden class, so the announcement never shows on screen.
    expect(live).toHaveClass("sr-only");
  });

  it("styles completed steps as done and later steps as neither", () => {
    renderAt(1);
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveClass("nxs-step-progress-step-done");
    expect(items[1]).toHaveClass("nxs-step-progress-step-current");
    expect(items[2]).not.toHaveClass("nxs-step-progress-step-done");
    expect(items[2]).not.toHaveClass("nxs-step-progress-step-current");
  });

  it("names the step list and hides the step numbers from assistive tech", () => {
    const { container } = renderAt(0);
    expect(screen.getByRole("list", { name: "Progress" })).toHaveClass("nxs-step-progress-steps");
    const numbers = container.querySelectorAll(".nxs-step-progress-step-num");
    expect(numbers).toHaveLength(3);
    numbers.forEach((number) => expect(number).toHaveAttribute("aria-hidden", "true"));
    expect(container.querySelector(".nxs-step-progress-stepof")).toHaveTextContent("Step 1 of 3");
  });

  it("appends className to the root and lets classNames.root replace the default", () => {
    const appended = renderAt(0, { className: "partner-stepper" });
    expect(appended.container.firstElementChild).toHaveAttribute("class", "nxs-step-progress partner-stepper");
    appended.unmount();
    const replaced = renderAt(0, { classNames: { root: "app-stepper" }, className: "wide" });
    expect(replaced.container.firstElementChild).toHaveAttribute("class", "app-stepper wide");
  });
});
