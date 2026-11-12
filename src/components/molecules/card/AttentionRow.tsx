// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/attention-row/README.md
// One attention item as a row, ported from nexious-client's features/user/components/dashboard/
// AttentionRow.tsx (2026-11 item 337, Phase 5). It composes ListRow: the title is a stretched
// nxs-list-row-link and the dismiss control sits in the actions slot, outside the link. The client
// read its copy, icon and route from ATTENTION_META and i18n; here every part arrives resolved, so
// which kinds exist and what they say stay with the caller.
import { safeUrl } from "@nxs-utils/data/safeUrl";
import type { AttentionRowProps } from "nxs-card";
import ListRow from "./ListRow";
import { buildNxsButtonClass } from "../../../@types/Variant";

const DISMISS_BUTTON_CLASS = buildNxsButtonClass({
  variant: "tertiary",
  size: "small",
  className: "nxs-btn-icon nxs-attention-row-dismiss",
});

/**
 * Builds the link's accessible name with the severity word FIRST. A link's aria-label overrides
 * its content, so a visually hidden severity span inside the link would never be read.
 */
const composeAttentionName = (props: AttentionRowProps): string => {
  const { severityLabel, actionLabel, title, detail } = props;
  const action = actionLabel ? `${actionLabel}: ` : "";
  const tail = detail ? `. ${detail}` : "";
  return `${severityLabel}. ${action}${title}${tail}`;
};

/**
 * Component: AttentionRow
 *
 * Renders the lead glyph, the title and detail as one link, and the optional dismiss control. The
 * link routes through `linkComponent` (which receives `to`) or a plain anchor, and every href goes
 * through safeUrl.
 */
const AttentionRow = (props: AttentionRowProps) => {
  const { title, detail, ariaLabel, href, linkComponent: LinkComponent, lead, leadClassName } = props;
  const { onDismiss, dismissLabel, dismissIcon, as = "li", className } = props;
  const safeHref = safeUrl(href);
  const accessibleName = ariaLabel ?? composeAttentionName(props);
  const titleLink = LinkComponent ? (
    <LinkComponent to={safeHref} className="nxs-list-row-link" aria-label={accessibleName}>
      {title}
    </LinkComponent>
  ) : (
    <a href={safeHref} className="nxs-list-row-link" aria-label={accessibleName}>
      {title}
    </a>
  );
  const canDismiss = Boolean(onDismiss && dismissLabel);

  return (
    <ListRow
      as={as}
      className={className ? `nxs-attention-row ${className}` : "nxs-attention-row"}
      lead={lead ? <span className={leadClassName ? `nxs-attention-row-lead ${leadClassName}` : "nxs-attention-row-lead"}>{lead}</span> : undefined}
      title={titleLink}
      subtitle={detail}
      actions={
        canDismiss ? (
          <button type="button" className={DISMISS_BUTTON_CLASS} aria-label={dismissLabel} onClick={() => onDismiss?.()}>
            {dismissIcon ?? <span aria-hidden="true">×</span>}
          </button>
        ) : undefined
      }
    />
  );
};

export default AttentionRow;
