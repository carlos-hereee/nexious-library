import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
    },
    isDisabled: { control: "boolean" },
    placeholder: { control: "text" },
    theme: { control: "text" },
    onChange: { action: "changed" },
    onBlur: { action: "blurred" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    name: "username",
    placeholder: "Enter username",
    value: "",
  },
};

export const Email: Story = {
  args: {
    name: "email",
    type: "email",
    placeholder: "you@example.com",
    value: "",
  },
};

export const Password: Story = {
  args: {
    name: "password",
    type: "password",
    placeholder: "••••••••",
    value: "",
  },
};

export const Disabled: Story = {
  args: {
    name: "readonly-field",
    placeholder: "Not editable",
    value: "locked value",
    isDisabled: true,
  },
};

// Controlled example that actually tracks state so the input is usable in the canvas
export const Controlled: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [val, setVal] = useState("");
    return <Input {...args} value={val} onChange={setVal} />;
  },
  args: {
    name: "controlled",
    placeholder: "Type here…",
  },
};
