// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/status-pill/README.md
// A status as a badge, ported from nexious-client's features/user/components/orders/
// OrderStatusPill.tsx (2026-11 item 337, Phase 5). The client mapped an order status to its class,
// icon and locale key through orderStatusMeta; that map stays with the client, which passes the
// resolved word, tone and glyph, so the pill fits any status vocabulary.
import type { StatusPillProps } from "nxs-card";

/**
 * Component: StatusPill
 *
 * The tint, the word and an optional glyph. Color is never the only carrier (WCAG 1.4.1): the word
 * is required, and the glyph is the shape that survives greyscale printing.
 */
const StatusPill = ({ label, tone = "neutral", icon, size = "small", title, className }: StatusPillProps) => {
  const pillClass = `nxs-status-pill nxs-status-pill-${tone} nxs-status-pill-${size}`;
  return (
    <span className={className ? `${pillClass} ${className}` : pillClass} title={title}>
      {icon ? (
        <span className="nxs-status-pill-icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="nxs-status-pill-label">{label}</span>
    </span>
  );
};

export default StatusPill;
