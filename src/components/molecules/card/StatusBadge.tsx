// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/status-badge/README.md
// A standing badge, ported from nexious-client's components/app/StatusBadge.tsx (2026-11 item 337,
// Phase 5). The client resolved a platform status key to its localized word, its glyph and its
// tier class through i18n and isKnownStatusKey; all three stay with the client, which passes the
// word, the tier and the glyph, so the badge fits any ladder. It composes StatusPill (rule 17: one
// pill concept) and adds only what a ladder needs: a per tier color hook, a tooltip and the
// render nothing guard for a rung the caller cannot name.
import type { StatusBadgeProps } from "nxs-card";
import StatusPill from "@nxs-molecules/card/StatusPill";

// A tier arrives from data (a server key), so it is reduced to the characters a class name can
// carry before it becomes one; anything else would split into stray classes or break the selector.
const TIER_UNSAFE_CHARACTERS = /[^a-z0-9-]/g;

const tierClassName = (tier: string | undefined): string | null => {
  const token = tier?.toLowerCase().replace(TIER_UNSAFE_CHARACTERS, "");
  return token ? `nxs-status-badge-${token}` : null;
};

/**
 * Component: StatusBadge
 *
 * One rung of a ladder as a pill: the word, an optional glyph, and colors the caller assigns per
 * tier. Renders nothing without a word, so a raw key can never reach the screen.
 */
const StatusBadge = ({ label, tier, glyph, size = "medium", title, className }: StatusBadgeProps) => {
  if (!label) return null;
  const badgeClass = ["nxs-status-badge", tierClassName(tier), className].filter(Boolean).join(" ");
  return <StatusPill label={label} icon={glyph} size={size} title={title} className={badgeClass} />;
};

export default StatusBadge;
