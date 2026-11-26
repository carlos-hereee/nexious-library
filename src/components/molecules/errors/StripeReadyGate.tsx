// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/stripe-ready-gate/README.md
// The two store states in front of a money surface, ported from nexious-client's components/app/
// StripeReadyGate.tsx (2026-11 item 337, Phase 5): ① no store, so only a link to set one up
// renders; ② a store whose Stripe account is unfinished, so a button into onboarding renders and
// the content below still shows, view only. It decides nothing: the caller reads the store facts
// and passes them in with the copy. The server stays the gate; a hidden control is a hint.
import { safeUrl } from "@nxs-utils/data/safeUrl";
import type { StripeReadyGateProps } from "nxs-errors";
import EmptyState from "./EmptyState";
import { buildNxsButtonClass } from "../../../@types/Variant";

const SET_UP_LINK_CLASS = buildNxsButtonClass({ variant: "primary" });

/**
 * Component: StripeReadyGate
 *
 * Renders the no store empty state, or the unfinished Stripe empty state followed by
 * `children(true)`, or `children(false)`. The set up link routes through `linkComponent`
 * (receiving `to`) or a plain anchor through safeUrl.
 */
const StripeReadyGate = (props: StripeReadyGateProps) => {
  const { storeMissing, storeNotReady, setUpStorePath, finishStripe, copy, linkComponent: LinkComponent } = props;
  const { storeMissingMedia, stripeMedia, className, actionClassName, children } = props;

  if (storeMissing) {
    const href = safeUrl(setUpStorePath);
    const link = LinkComponent ? (
      <LinkComponent className={SET_UP_LINK_CLASS} to={href}>
        {copy.storeMissingAction}
      </LinkComponent>
    ) : (
      <a className={SET_UP_LINK_CLASS} href={href}>
        {copy.storeMissingAction}
      </a>
    );
    return (
      <EmptyState className={className} media={storeMissingMedia} heading={copy.storeMissingTitle} message={copy.storeMissingBody} actions={link} />
    );
  }
  if (storeNotReady) {
    return (
      <>
        <EmptyState
          className={className}
          media={stripeMedia}
          heading={copy.stripeTitle}
          message={copy.stripeBody}
          actionLabel={copy.stripeAction}
          onAction={finishStripe}
          {...(actionClassName ? { classNames: { action: actionClassName } } : {})}
        />
        {children(true)}
      </>
    );
  }
  return <>{children(false)}</>;
};

export default StripeReadyGate;
