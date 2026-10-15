import type { Meta, StoryObj } from "@storybook/react";
import StepProgress from "./StepProgress";

const LABELS: Record<string, string> = { about: "About you", audience: "Your audience", payout: "Payout" };

const meta: Meta<typeof StepProgress> = {
  title: "Molecules/StepProgress",
  component: StepProgress,
  tags: ["autodocs"],
  argTypes: {
    current: { control: { type: "number", min: 0, max: 2 } },
  },
};

export default meta;
type Story = StoryObj<typeof StepProgress>;

export const Default: Story = {
  args: {
    steps: ["about", "audience", "payout"],
    current: 1,
    labelFor: (id: string) => LABELS[id] ?? id,
    progressLabel: "Application progress",
    stepOfText: "Step 2 of 3",
  },
};

export const FirstStep: Story = {
  args: { ...Default.args, current: 0, stepOfText: "Step 1 of 3" },
};

export const LastStep: Story = {
  args: { ...Default.args, current: 2, stepOfText: "Step 3 of 3" },
};
