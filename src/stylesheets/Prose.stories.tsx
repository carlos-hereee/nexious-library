import type { Meta, StoryObj } from "@storybook/react";

/**
 * The prose utilities cap reading measure on a CONTAINER, not on individual
 * paragraphs. Apply .prose (70ch), .prose-narrow (55ch), or .prose-wide
 * (80ch) on the wrapper that surrounds body copy.
 *
 * Do NOT put max-width on the <p> element itself. Line length is a
 * container decision.
 */
interface ProseArgs {
  size: "prose-narrow" | "prose" | "prose-wide";
}

const ProseDemo = ({ size }: ProseArgs) => (
  <div className={size} style={{ padding: "1rem" }}>
    <h2>Designing for the reader, not the template</h2>
    <p>
      Line length is a container concern, not an element concern. When a stylesheet puts a
      global max width on every paragraph, it breaks every paragraph that lives in a narrower
      or wider context. A paragraph inside a 300px card, a 720px post detail, a narrow
      sidebar, a wide hero: they all get the same cap.
    </p>
    <p>
      The fix is to cap the measure on the container you own, and let the element breathe.
      Using ch units is the cleanest way to do this, because a ch unit tracks the current
      font size. Fifty five to seventy five characters per line is the generally accepted
      readable range.
    </p>
  </div>
);

const meta: Meta<typeof ProseDemo> = {
  title: "Utilities/Prose",
  component: ProseDemo,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["prose-narrow", "prose", "prose-wide"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof ProseDemo>;

/** Default 70ch reading measure. */
export const Prose: Story = {
  args: { size: "prose" },
};

/** 55ch for tighter reading columns. */
export const ProseNarrow: Story = {
  args: { size: "prose-narrow" },
};

/** 80ch for wider contexts. */
export const ProseWide: Story = {
  args: { size: "prose-wide" },
};

/** Side by side comparison. */
export const Comparison: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ opacity: 0.6, fontSize: "0.85rem" }}>.prose-narrow (55ch)</h3>
        <ProseDemo size="prose-narrow" />
      </div>
      <div>
        <h3 style={{ opacity: 0.6, fontSize: "0.85rem" }}>.prose (70ch)</h3>
        <ProseDemo size="prose" />
      </div>
      <div>
        <h3 style={{ opacity: 0.6, fontSize: "0.85rem" }}>.prose-wide (80ch)</h3>
        <ProseDemo size="prose-wide" />
      </div>
    </div>
  ),
};
