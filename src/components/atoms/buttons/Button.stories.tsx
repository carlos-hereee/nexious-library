import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import type { Size, Variant } from "../../../@types/Variant";

const VARIANTS: Variant[] = ["primary", "secondary", "tertiary", "danger", "ghost"];
const SIZES: Size[] = ["small", "medium", "large"];

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    onDragStart: { action: "dragStart" },
    onDragEnd: { action: "dragEnd" },
    variant: { control: "select", options: VARIANTS },
    size: { control: "select", options: SIZES },
    className: { control: "text" },
    label: { control: "text" },
    title: { control: "text" },
    isDisable: { control: "boolean" },
    ping: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: "Click me",
  },
};

export const Themed: Story = {
  args: {
    label: "Primary",
    className: "btn-primary",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    isDisable: true,
  },
};

export const WithPing: Story = {
  args: {
    label: "Notifications",
    ping: 5,
  },
};

export const WithChildren: Story = {
  args: {
    children: "Custom content",
  },
};

export const AriaLabelOverride: Story = {
  name: "Accessible (aria-label)",
  args: {
    // icon-only close button, no visible label, aria-label provides the accessible name
    "aria-label": "Close dialog",
    className: "btn-icon",
  },
};

// ── The nxs-btn family (2026-11 item 337) ───────────────────────────────────────
// Every variant at every size, plus the icon square and the disabled state, so the debug pass can
// walk the whole family by keyboard and in both themes from one canvas.
export const Primary: Story = { args: { label: "Save changes", variant: "primary" } };
export const Secondary: Story = { args: { label: "Cancel", variant: "secondary" } };
export const Tertiary: Story = { args: { label: "Learn more", variant: "tertiary" } };
export const Danger: Story = { args: { label: "Delete", variant: "danger" } };
export const Ghost: Story = { args: { label: "More options", variant: "ghost" } };

export const EveryVariantAndSize: Story = {
  name: "Every variant and size",
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-medium)" }}>
      {VARIANTS.map((variant) => (
        <div key={variant} className="nxs-button-group">
          {SIZES.map((size) => (
            <Button key={size} variant={variant} size={size} label={`${variant} ${size}`} />
          ))}
          <Button variant={variant} label={`${variant} disabled`} isDisabled />
        </div>
      ))}
      <div className="nxs-button-group">
        <Button variant="secondary" size="small" className="nxs-btn-icon" aria-label="Close">
          x
        </Button>
        <Button variant="secondary" className="nxs-btn-icon" aria-label="Close">
          x
        </Button>
        <Button variant="secondary" size="large" className="nxs-btn-icon" aria-label="Close">
          x
        </Button>
      </div>
      <Button variant="primary" className="nxs-btn-block" label="Block width" />
    </div>
  ),
};
