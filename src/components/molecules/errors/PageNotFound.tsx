import { useEffect } from "react";
import EmptyState from "@nxs-molecules/errors/EmptyState";
import type { ErrorProps } from "nxs-errors";

/**
 * Component - PageNotFound
 *
 * Renders through the shared EmptyState pattern (design language 5.10) while keeping every
 * class it shipped with: `.page-center` on the wrapper, `.text-center` on the glyph, and
 * `.page-not-found-message` on the countdown message. The spinner glyph stays the default so
 * a call site that passed no `icon` still shows one.
 *
 * Two modes, unchanged: with a `timer` the message is prose and the redirect is automatic,
 * without one the message becomes the button the reader clicks.
 */
const PageNotFound: React.FC<ErrorProps> = (props) => {
  const { hero, message, to, timer, handleClick, heading, icon, actionVariant } = props;

  const msg = message || `Page not found go to ${to === "/" ? "homepage" : to}`;

  useEffect(() => {
    // let client read error message and reroute to page
    if (!timer || !to || !handleClick) return undefined;
    // Clear the timer on unmount so a user who navigates away manually before it fires is
    // not yanked to another route by a stale redirect.
    const id = setTimeout(() => handleClick(), timer);
    return () => clearTimeout(id);
  }, []);

  return (
    <EmptyState
      className="page-center"
      hero={hero}
      icon={icon || "spinner"}
      iconSpin="spin"
      iconClassName="text-center"
      heading={heading}
      message={timer ? msg : undefined}
      messageClassName="page-not-found-message"
      actionLabel={timer ? undefined : msg}
      actionVariant={actionVariant}
      onAction={handleClick}
    />
  );
};

export default PageNotFound;
