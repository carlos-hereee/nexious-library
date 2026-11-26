// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/announcement-card/README.md
// The platform announcement as a feed card, ported from nexious-client's features/dashboard/
// components/feed/AnnouncementCard.tsx (2026-11 item 337, Phase 5). The client read its badge,
// link and dismiss copy from i18n and its item from the dashboard contract; here every string
// arrives translated and the seen state write stays with the caller's onDismiss.
import { useState } from "react";
import { safeUrl } from "@nxs-utils/data/safeUrl";
import type { AnnouncementCardProps } from "nxs-card";
import { buildNxsButtonClass } from "../../../@types/Variant";

const DISMISS_BUTTON_CLASS = buildNxsButtonClass({ variant: "tertiary", size: "small", className: "nxs-btn-icon" });
const LINK_BUTTON_CLASS = buildNxsButtonClass({ variant: "secondary", size: "small" });

/**
 * Component: AnnouncementCard
 *
 * An nxs-card article: the badge (so it reads as official between creator cards), the body, the
 * optional external link and the dismiss control. One press disables the dismiss, because the
 * caller hides the card on a fire and forget write and a second press would write twice.
 */
const AnnouncementCard = (props: AnnouncementCardProps) => {
  const { badgeLabel, badgeIcon, body, link, onDismiss, dismissLabel, dismissIcon, className } = props;
  const [isDismissing, setDismissing] = useState(false);
  const canDismiss = Boolean(onDismiss && dismissLabel);

  const dismiss = () => {
    if (isDismissing || !onDismiss) return;
    setDismissing(true);
    onDismiss();
  };

  return (
    <article className={className ? `nxs-card nxs-announcement-card ${className}` : "nxs-card nxs-announcement-card"}>
      <div className="nxs-announcement-card-head">
        <span className="nxs-announcement-badge">
          {badgeIcon ? <span aria-hidden="true">{badgeIcon}</span> : null}
          {badgeLabel}
        </span>
        {canDismiss ? (
          <button type="button" className={DISMISS_BUTTON_CLASS} aria-label={dismissLabel} onClick={dismiss} disabled={isDismissing}>
            {dismissIcon ?? <span aria-hidden="true">×</span>}
          </button>
        ) : null}
      </div>
      <div className="nxs-announcement-card-body">{body}</div>
      {link ? (
        <div className="nxs-card-footer">
          <a className={LINK_BUTTON_CLASS} href={safeUrl(link.href)} target="_blank" rel="noopener noreferrer">
            {link.label}
            {link.newTabHint ? <span className="sr-only">{` ${link.newTabHint}`}</span> : null}
          </a>
        </div>
      ) : null}
    </article>
  );
};

export default AnnouncementCard;
