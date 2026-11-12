// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/grid-section/README.md
// A titled section over a CardGrid, ported from nexious-client's features/admin/components/plugins/
// PluginSection.tsx (2026-11 item 337, Phase 5). The client named it for the plugins page; the shell
// is generic, so the library calls it GridSection.
import { forwardRef } from "react";
import { HEADING_TAGS } from "@nxs-utils/helpers/headingTag";
import type { GridSectionProps } from "nxs-card";
import CardGrid from "./CardGrid";

const DEFAULT_HEADING_LEVEL = 3;

/**
 * Component: GridSection
 *
 * A section labelled by its heading. The heading takes `tabIndex -1` and carries the forwarded ref,
 * so an overview tile can scroll it into view AND move focus to it, which is what makes the jump
 * perceivable to a screen reader. With `emptyHint` the grid gives way to one line and the header
 * stays, so the section remains a landmark the jump can reach.
 */
const GridSection = forwardRef<HTMLHeadingElement, GridSectionProps>((props, ref) => {
  const { id, title, supporting, action, notice, emptyHint, headingLevel = DEFAULT_HEADING_LEVEL, className, children } = props;
  const TitleTag = HEADING_TAGS[headingLevel];
  const titleId = `${id}-title`;

  return (
    <section className={className ? `nxs-grid-section ${className}` : "nxs-grid-section"} id={id} aria-labelledby={titleId}>
      <div className="nxs-grid-section-header">
        <div className="nxs-grid-section-titles">
          <TitleTag className="nxs-grid-section-title" id={titleId} tabIndex={-1} ref={ref}>
            {title}
          </TitleTag>
          {supporting ? <p className="nxs-grid-section-supporting">{supporting}</p> : null}
        </div>
        {action}
      </div>
      {notice}
      {emptyHint ? <p className="nxs-grid-section-empty">{emptyHint}</p> : <CardGrid>{children}</CardGrid>}
    </section>
  );
});

GridSection.displayName = "GridSection";

export default GridSection;
