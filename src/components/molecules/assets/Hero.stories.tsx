import type { Meta, StoryObj } from "@storybook/react";
import Hero from "./Hero";

/**
 * Hero renders an image with a blur-up load transition.
 *
 * Gotcha: pass `hero` as `{ url, alt }`. When `hero.url` is missing Hero does
 * NOT error — it falls back to the Image atom's placeholder, so a blank or
 * absent url renders a placeholder rather than crashing the tree. `theme` is the
 * className hook used to size/shape it (e.g. "thumbnail"); `onImageClick` makes
 * it interactive and is suppressed when `isDisable` is set.
 */
const meta: Meta<typeof Hero> = {
  title: "Molecules/Hero",
  component: Hero,
  tags: ["autodocs"],
  argTypes: {
    theme: { control: "text" },
    isDisable: { control: "boolean" },
    onImageClick: { action: "image-click" },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480, padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Hero>;

/** Default: a loaded image. */
export const Default: Story = {
  args: {
    hero: {
      url: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200",
      alt: "A reader with an open book",
    },
  },
};

/** Missing url: falls back to the placeholder Image instead of erroring. */
export const MissingUrlFallback: Story = {
  name: "Missing url (placeholder fallback)",
  args: {
    hero: { url: "", alt: "no image provided" },
  },
};
