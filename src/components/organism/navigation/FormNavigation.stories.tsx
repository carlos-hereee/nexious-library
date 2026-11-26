import type { Meta, StoryObj } from "@storybook/react";
import { useState, type ComponentProps } from "react";
import FormNavigation from "./FormNavigation";

/**
 * FormNavigation renders a multi page form step indicator and stepper.
 *
 * The current step is a <span aria-current="step"> rather than a disabled
 * button, so it stays in the accessibility tree without being interactive.
 * Completed steps get a .is-complete treatment; upcoming steps are
 * interactive buttons.
 */
const meta: Meta<typeof FormNavigation> = {
  title: "Organisms/Navigation/FormNavigation",
  component: FormNavigation,
  tags: ["autodocs"],
  argTypes: {
    heading: { control: "text" },
    pageNumber: { control: { type: "number", min: 0, step: 1 } },
    onClick: { action: "step-clicked" },
  },
};
export default meta;
type Story = StoryObj<typeof FormNavigation>;

const steps = ["account_basics", "contact_info", "preferences", "review_and_submit"];

/**
 * Holds the current step so a click in the story moves it. A component rather than inline render
 * code because a hook may only run inside a component.
 */
const StatefulFormNavigation = (props: ComponentProps<typeof FormNavigation>) => {
  const { pageNumber, onClick, ...args } = props;
  const [page, setPage] = useState(pageNumber ?? 0);
  return (
    <FormNavigation
      {...args}
      pageNumber={page}
      onClick={(i) => {
        setPage(i);
        onClick?.(i);
      }}
    />
  );
};

/** Interactive. Click a step to jump to it. */
export const Interactive: Story = {
  render: (args) => <StatefulFormNavigation {...args} formOrder={steps} />,
  args: {
    heading: "New account",
    pageNumber: 0,
  },
};

/** First step. Nothing complete yet. */
export const FirstStep: Story = {
  args: {
    heading: "New account",
    pageNumber: 0,
    formOrder: steps,
    onClick: () => undefined,
  },
};

/** Mid flow. Two completed, on step three. */
export const MidFlow: Story = {
  args: {
    heading: "New account",
    pageNumber: 2,
    formOrder: steps,
    onClick: () => undefined,
  },
};

/** Last step. Everything before is complete. */
export const LastStep: Story = {
  args: {
    heading: "New account",
    pageNumber: 3,
    formOrder: steps,
    onClick: () => undefined,
  },
};

/** No heading. Stepper stands on its own. */
export const NoHeading: Story = {
  args: {
    pageNumber: 1,
    formOrder: steps,
    onClick: () => undefined,
  },
};
