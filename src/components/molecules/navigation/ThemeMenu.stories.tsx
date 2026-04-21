import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ThemeMenu from "./ThemeMenu";
import type { ThemeList } from "nxs-navigation";

/**
 * ThemeMenu is a listbox button theme picker that replaces the native
 * <select>. It follows the WAI ARIA authoring pattern for a listbox button
 * and scales to many themes without a redesign.
 *
 * The component expects an <li> parent when used in the Navbar. For stories
 * we wrap it in a <ul> so it renders standalone.
 */
const meta: Meta<typeof ThemeMenu> = {
  title: "Molecules/Navigation/ThemeMenu",
  component: ThemeMenu,
  tags: ["autodocs"],
  argTypes: {
    active: { control: "text" },
    name: { control: "text" },
    theme: { control: "text" },
    btnTheme: { control: "text" },
    handleChange: { action: "theme-selected" },
  },
  decorators: [
    (Story) => (
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex" }}>
        <Story />
      </ul>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ThemeMenu>;

const twoThemes: ThemeList[] = [
  {
    name: "light",
    value: "light",
    label: "Light",
    uid: "theme-light",
    colors: { primary: "#fafafa", secondary: "#222", altPrimary: "#eee", altSecondary: "#444" },
    backgroundColors: { primary: "#fff", secondary: "#f6f6f6", altPrimary: "#f0f0f0", altSecondary: "#e9e9e9" },
  },
  {
    name: "dark",
    value: "dark",
    label: "Dark",
    uid: "theme-dark",
    colors: { primary: "#0f172a", secondary: "#e2e8f0", altPrimary: "#1e293b", altSecondary: "#cbd5e1" },
    backgroundColors: { primary: "#020617", secondary: "#0f172a", altPrimary: "#1e293b", altSecondary: "#334155" },
  },
];

const manyThemes: ThemeList[] = [
  ...twoThemes,
  {
    name: "solarized",
    value: "solarized",
    label: "Solarized",
    uid: "theme-solarized",
    colors: { primary: "#b58900", secondary: "#586e75", altPrimary: "#cb4b16", altSecondary: "#93a1a1" },
    backgroundColors: { primary: "#fdf6e3", secondary: "#eee8d5", altPrimary: "#eee8d5", altSecondary: "#93a1a1" },
  },
  {
    name: "sunset",
    value: "sunset",
    label: "Sunset",
    uid: "theme-sunset",
    colors: { primary: "#ff6b6b", secondary: "#ffa94d", altPrimary: "#f06595", altSecondary: "#ffd43b" },
    backgroundColors: { primary: "#fff5f5", secondary: "#fff4e6", altPrimary: "#fff0f6", altSecondary: "#fff9db" },
  },
  {
    name: "forest",
    value: "forest",
    label: "Forest",
    uid: "theme-forest",
    colors: { primary: "#2f9e44", secondary: "#1b4332", altPrimary: "#40c057", altSecondary: "#2b8a3e" },
    backgroundColors: { primary: "#ebfbee", secondary: "#d3f9d8", altPrimary: "#b2f2bb", altSecondary: "#8ce99a" },
  },
];

/** Two theme choice (the current nexious use case). */
export const TwoThemes: Story = {
  render: (args) => {
    const [active, setActive] = useState(args.active || "light");
    return (
      <ThemeMenu
        {...args}
        list={twoThemes}
        active={active}
        handleChange={(v) => {
          setActive(v);
          args.handleChange?.(v);
        }}
      />
    );
  },
  args: {
    name: "theme",
    active: "light",
  },
};

/** Scales to many themes without a redesign. */
export const ManyThemes: Story = {
  render: (args) => {
    const [active, setActive] = useState(args.active || "solarized");
    return (
      <ThemeMenu
        {...args}
        list={manyThemes}
        active={active}
        handleChange={(v) => {
          setActive(v);
          args.handleChange?.(v);
        }}
      />
    );
  },
  args: {
    name: "theme",
    active: "solarized",
  },
};

/** No active theme selected. Label falls back to "Theme". */
export const NoActive: Story = {
  args: {
    list: twoThemes,
    name: "theme",
  },
};
