import type { Meta, StoryObj } from "@storybook/react";
import Heading from "./Heading";

/**
 * Heading renders a semantic h1 through h6.
 *
 * Gotcha (historically the #1 footgun): older call sites pass the legacy
 * `data` + `scale` pair (`<Heading data="Title" scale={3} />`). The modern,
 * preferred API is `size` + children (`<Heading size="h3">Title</Heading>`).
 * BOTH are supported today: when both are present `children` wins over `data`
 * and `size` wins over `scale`. With no level set it falls back to h1. Prefer
 * the modern API in new code; the legacy props exist only for back-compat.
 */
const meta: Meta<typeof Heading> = {
  title: "Atoms/Heading",
  component: Heading,
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
    data: { control: "text" },
    size: { control: "select", options: ["h1", "h2", "h3", "h4", "h5", "h6"] },
    scale: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    theme: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

/** Modern API: `size` + children. Use this in new code. */
export const Modern: Story = {
  args: {
    size: "h2",
    children: "Modern API (size + children)",
  },
};

/** Legacy API: `data` + `scale`. Kept for back-compat with old call sites. */
export const Legacy: Story = {
  name: "Legacy (data + scale)",
  args: {
    data: "Legacy API (data + scale)",
    scale: 3,
  },
};

/** With a theme class appended to the base `heading` class. */
export const Themed: Story = {
  args: {
    size: "h3",
    children: "Themed heading",
    theme: "text-center",
  },
};

/** No level set: falls back to h1. */
export const DefaultsToH1: Story = {
  name: "Defaults to h1",
  args: {
    children: "No size or scale provided",
  },
};
