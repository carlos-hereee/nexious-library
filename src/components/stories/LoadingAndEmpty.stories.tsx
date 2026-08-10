import { Fragment } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Skeleton from "@nxs-molecules/errors/Skeleton";
import EmptyState from "@nxs-molecules/errors/EmptyState";
import EmptySection from "@nxs-molecules/errors/EmptySection";
import ComingSoon from "@nxs-molecules/errors/ComingSoon";
import Loading from "@nxs-molecules/errors/Loading";
import "./states-matrix.css";

/**
 * The two states where a region has no content: on its way, or not coming.
 *
 * Both are new in Phase 4 and both are the kind of thing that only reveals itself rendered.
 *
 * What to look for:
 * 1. Every skeleton RESERVES the height its real content will take. That is the entire reason
 *    to prefer it over a spinner, which occupies nothing and lets the page jump on arrival.
 *    A row skeleton should measure the same 44px a real dense row does.
 * 2. The shimmer sweeps LEFT TO RIGHT. It is easy to get backwards, because a percentage
 *    background-position inverts direction on an oversized image (see vars/keyframes/_shimmer).
 *    A right-to-left sweep means the keyframe needs its from and to swapped.
 * 3. Toggle the OS "reduce motion" setting. The shimmer must STOP, not speed up. The global
 *    kill switch shortens animations to 1ms rather than removing them, which would strobe, so
 *    .skeleton-bar carries its own guard.
 * 4. The three legacy empty states below render through ONE EmptyState pattern now. They should
 *    look like three instances of one idea, not three products.
 * 5. Loading still renders a SPINNER by default. That is deliberate: flipping the default is a
 *    Phase 5 owner decision, not a side effect of this refactor.
 */
const meta: Meta = {
  title: "Foundation/States/Loading and empty",
  parameters: { layout: "fullscreen" },
};
export default meta;

const SHAPES = ["row", "block", "text", "page"] as const;

const Sheet: React.FC = () => (
  <Fragment>
    <h3 className="sb-matrix-title">Skeleton shapes</h3>
    <p className="sb-matrix-note">
      Each shape matches the silhouette of what it is standing in for: rows for a list, a 16 by 9
      block for a card, short lines for prose, a header bar plus body for a page.
    </p>
    <div className="sb-matrix-grid">
      {SHAPES.map((shape) => (
        <Fragment key={shape}>
          <span className="sb-matrix-rowlabel">{shape}</span>
          <div className="sb-matrix-cell">
            <Skeleton shape={shape} />
          </div>
          <div className="sb-matrix-cell">
            <Skeleton shape={shape} count={3} />
          </div>
        </Fragment>
      ))}
    </div>

    <h3 className="sb-matrix-title">Loading: spinner by default, skeleton on request</h3>
    <p className="sb-matrix-note">
      The left cell is what every existing consumer keeps rendering. The right cell is the opt-in.
    </p>
    <div className="sb-matrix-grid">
      <div className="sb-matrix-cell">
        <Loading message="Default, unchanged" />
      </div>
      <div className="sb-matrix-cell">
        <Loading message="Opted in" skeleton="row" />
      </div>
    </div>

    <h3 className="sb-matrix-title">Empty states, all through one pattern</h3>
    <p className="sb-matrix-note">
      Glyph, headline, one sentence, next action. Every slot is optional, and nothing renders by
      default, so the three published components below did not sprout content nobody asked for.
    </p>
    <div className="sb-matrix-grid">
      <div className="sb-matrix-cell">
        <EmptyState
          icon="book"
          heading="No products yet"
          message="Add your first product and it will show up here for customers to browse."
          actionLabel="Add a product"
          actionVariant="primary"
        />
      </div>
      <div className="sb-matrix-cell">
        <EmptySection message="EmptySection, legacy call" />
      </div>
      <div className="sb-matrix-cell">
        <ComingSoon message="ComingSoon, legacy call" />
      </div>
    </div>
  </Fragment>
);

export const LightAndDark: StoryObj = {
  render: () => (
    <div className="sb-matrix">
      <Sheet />
      <div className="sb-matrix-dark dark-mode">
        <div className="sb-matrix">
          <Sheet />
        </div>
      </div>
    </div>
  ),
};
