import type { Meta, StoryObj } from "@storybook/react";
import "./states-matrix.css";

/**
 * The rules this library now follows.
 *
 * Written as rules rather than description, because the job of this page is to make a "no"
 * obvious in review. Every rule traces to a section of
 * roadmaps/specs/companyuno-design-language-and-redesign.md; the citation is on each line so a
 * disagreement is settled by reading the spec, not by arguing taste.
 *
 * A .stories.tsx rather than MDX on purpose: .storybook/main.ts globs `*.stories.@(ts|tsx)` only,
 * so an .mdx file would silently never appear.
 */
const meta: Meta = {
  title: "Foundation/Design Language",
  parameters: { layout: "fullscreen" },
};
export default meta;

const RULES: [string, string, string][] = [
  [
    "Hierarchy before containers",
    "A screen should still read as a hierarchy with every border removed. Reach for space, size and weight first; a box is what you add when those genuinely are not enough.",
    "5.2",
  ],
  [
    "One primary action per view",
    "Exactly one. If two things look primary, neither is, and the user has to read both to find out which one you meant.",
    "5.2",
  ],
  [
    "A surface gets a border OR a shadow at rest, never both",
    "Stacking them is most of why the old cards felt heavy. Light mode leans on shadow, dark mode leans on a lighter surface plus a hairline, because shadows barely read on dark.",
    "5.7",
  ],
  [
    "Hover lift is for navigational cards only",
    "A card that navigates may lift. A static panel does not, and a list row tints instead. Lifting everything is motion without meaning.",
    "5.7",
  ],
  [
    "Brand indigo means primary or active. Teal means AI or live, and nothing else",
    "Teal's whole value is that it appears nowhere else, so its presence always reads as intelligent or live. Spending it on a generic accent destroys the signal permanently.",
    "5.3",
  ],
  [
    "Radius nests concentrically",
    "A 12px card holds 8px rows holds 4px chips. This is why the scale had to be exactly 4 / 8 / 12 / 16; when this library shipped 5 / 7 / 15 no nesting could ever come out right.",
    "5.6",
  ],
  [
    "Every spacing value comes from the named scale",
    "4, 8, 12, 16, 24, 32, 48, 64. The most common drift is an inline 0.75rem or 1.25rem; 12px exists, and 20px snaps to 16 or 24 rather than inventing a step.",
    "5.5",
  ],
  [
    "Motion is 150ms for hover, 200ms for most transitions, 300ms for overlays",
    "Nothing in the core product runs longer than 300ms, and every transition honors prefers-reduced-motion by dropping translate and scale while keeping opacity.",
    "5.9",
  ],
  [
    "One control height, one focus ring",
    "Controls read their height, padding and radius from the control tokens, and every interactive element includes the one focus-ring mixin. Four different focus treatments is how this library got here, and two of them were accessibility defects rather than drift.",
    "5.10",
  ],
  [
    "Dark mode is produced by token reassignment only",
    "A component never sets a dark color directly. If a component looks wrong in the dark half of a states matrix, it hardcoded something.",
    "5.3",
  ],
];

export const Rules: StoryObj = {
  render: () => (
    <div className="sb-matrix">
      <h2 className="sb-matrix-title">The rules</h2>
      <p className="sb-matrix-note">
        Read this before touching a component. Each rule cites its section in
        companyuno-design-language-and-redesign.md, which is the source; this page is a pointer, not a second copy of
        the truth.
      </p>
      <dl>
        {RULES.map(([rule, why, section]) => (
          <div key={rule}>
            <dt className="sb-matrix-title">
              {rule} <span className="sb-matrix-heading">section {section}</span>
            </dt>
            <dd className="sb-matrix-note">{why}</dd>
          </div>
        ))}
      </dl>
    </div>
  ),
};
