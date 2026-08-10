import { Fragment } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import "./states-matrix.css";

/**
 * Card and panel surfaces after the Phase 4 fan-out.
 *
 * This is the owner's review surface for the single most visible decision in Phase 4: which
 * surfaces are NAVIGATIONAL and which are STATIC. Design language 5.7 reserves the hover lift
 * for cards that actually go somewhere, and gives everything else a background tint or nothing.
 * Before this pass roughly everything lifted, which is most of why the dashboard read as busy.
 *
 * What to look for, in order of how much it matters:
 * 1. Hover each tile. Only the four in the NAVIGATIONAL row should rise. If a panel or a list
 *    row lifts, rule 3 has leaked.
 * 2. Border XOR shadow at rest. Every tile should show a hairline OR a shadow, never both.
 *    Stacked border and shadow is the "heavy" look this pass exists to remove.
 * 3. Radii step concentrically: the card is 12px, a row inside it is 8px, a chip is 4px. Look
 *    at the corners of nested boxes, not at any one box alone.
 * 4. The dark half has no light-mode leftovers. Every fill here used to come from a compiled
 *    SCSS literal with no dark counterpart, so anything still rendering pale on the dark side
 *    is a surface that was missed.
 *
 * Rendered as plain markup rather than through the card components on purpose: the components
 * add their own content shape, and what is under review here is the surface recipe.
 */
const meta: Meta = {
  title: "Foundation/States/Card surfaces",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Surface = { cls: string; label: string; note: string };

const NAVIGATIONAL: Surface[] = [
  { cls: "app-card", label: ".app-card", note: "opens an app" },
  { cls: "preview-card", label: ".preview-card", note: "opens a page" },
  { cls: "merch-card", label: ".merch-card", note: "opens a product" },
  { cls: "post-card", label: ".post-card", note: "opens a post" },
];

const STATIC: Surface[] = [
  { cls: "card", label: ".card", note: "layout container, no hover" },
  { cls: "secondary-card", label: ".secondary-card", note: "layout container, no hover" },
  { cls: "settings-card", label: ".settings-card", note: "panel, only its buttons react" },
  { cls: "onboarding-card", label: ".onboarding-card", note: "row, tints on hover" },
];

const ROWS: Surface[] = [
  { cls: "card-row", label: ".card-row", note: "list row, tints, 52px floor" },
  { cls: "card-row card-row--active", label: ".card-row--active", note: "selected, brand wash" },
  { cls: "panel", label: ".panel", note: "labeled control container" },
  { cls: "panel panel-danger", label: ".panel-danger", note: "destructive grouping" },
];

const Tile: React.FC<{ surface: Surface }> = ({ surface }) => (
  <div className={surface.cls}>
    <div className="card-header">
      <p className="card-section-title">{surface.label}</p>
    </div>
    <div className="card-body">
      <p className="post-card-body">{surface.note}</p>
    </div>
  </div>
);

const Band: React.FC<{ title: string; note: string; surfaces: Surface[] }> = ({ title, note, surfaces }) => (
  <Fragment>
    <h3 className="sb-matrix-title">{title}</h3>
    <p className="sb-matrix-note">{note}</p>
    <div className="sb-matrix-grid">
      {surfaces.map((surface) => (
        <div className="sb-matrix-cell" key={surface.cls}>
          <Tile surface={surface} />
        </div>
      ))}
    </div>
  </Fragment>
);

const Sheet: React.FC = () => (
  <Fragment>
    <Band
      title="Navigational: these lift on hover"
      note="Each one opens something when clicked, so it gets the translateY(-2px) lift at --transition-fast. This is the only group allowed to move."
      surfaces={NAVIGATIONAL}
    />
    <Band
      title="Static: these do not lift"
      note="Containers and panels. A container gets no hover at all; a row gets a --hover-bg tint. Nothing here changes position."
      surfaces={STATIC}
    />
    <Band
      title="Rows and panels"
      note="Rows hold the --row-height 52px floor so a short row cannot collapse below a tap target. The panel pair is the container lane's replacement for .container used as a box."
      surfaces={ROWS}
    />
  </Fragment>
);

export const LightAndDark: StoryObj = {
  render: () => (
    <div className="sb-matrix">
      <Sheet />
      {/* Both themes on one page, not behind a toggle: the dark theme is produced entirely by
          token reassignment, so a surface that hardcoded a color only reveals itself beside its
          light twin. */}
      <div className="sb-matrix-dark dark-mode">
        <div className="sb-matrix">
          <Sheet />
        </div>
      </div>
    </div>
  ),
};
