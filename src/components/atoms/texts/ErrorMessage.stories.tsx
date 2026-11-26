import type { Meta, StoryObj } from "@storybook/react";
import ErrorMessage from "./ErrorMessage";

// ErrorMessage's user facing mode (2026-11 item 337, Phase 5): `message` renders a role alert line
// in every build. The `error` mode is the dev only teaching panel and is not shown here.
const meta: Meta<typeof ErrorMessage> = {
  title: "Atoms/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const InlineLine: Story = {
  args: { message: "That email is already in use." },
};
