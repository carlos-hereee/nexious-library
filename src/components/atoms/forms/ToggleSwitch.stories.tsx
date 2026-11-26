import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ToggleRow from "@nxs-molecules/forms/ToggleRow";
import ToggleSwitch from "./ToggleSwitch";

// ToggleSwitch and ToggleRow (2026-11 item 337, Phase 5): a native button with role switch, and the
// settings row that names and describes it. The label is required.
const meta: Meta<typeof ToggleSwitch> = {
  title: "Atoms/ToggleSwitch",
  component: ToggleSwitch,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToggleSwitch>;

const ControlledSwitch = () => {
  const [isOn, setOn] = useState(false);
  return <ToggleSwitch checked={isOn} onChange={() => setOn((value) => !value)} label="Message emails" />;
};

const ControlledRow = () => {
  const [isOn, setOn] = useState(true);
  return <ToggleRow checked={isOn} onChange={setOn} label="Members only" help="Only members can open this page" />;
};

export const Interactive: Story = { render: () => <ControlledSwitch /> };

export const Disabled: Story = { args: { checked: true, onChange: () => undefined, label: "Pause bookings", disabled: true } };

export const InASettingsRow: Story = { render: () => <ControlledRow /> };
