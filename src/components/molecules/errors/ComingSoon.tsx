import EmptyState from "@nxs-molecules/errors/EmptyState";
import type { AssetProps } from "nxs-assets";
import type { ErrorProps } from "nxs-errors";

// Kept under its original misspelled name because it is a published export; renaming it would
// break any consumer importing it, for a typo.
export type CommingSoonProps = {
  hero?: AssetProps;
  message?: string;
};

/**
 * Component - ComingSoon
 *
 * The "this exists but is not built yet" surface. Renders through the shared EmptyState
 * pattern; `.text-center` on the wrapper and `.text-max` on the message are preserved because
 * consumer CSS may target them.
 */
const ComingSoon: React.FC<ErrorProps> = (props) => {
  const { hero, message, heading, icon, actionLabel, actionVariant, handleClick, children } = props;

  return (
    <EmptyState
      className="text-center"
      hero={hero}
      icon={icon}
      heading={heading}
      message={message || "More coming soon"}
      messageClassName="text-max"
      actionLabel={actionLabel}
      actionVariant={actionVariant}
      onAction={handleClick}
    >
      {children}
    </EmptyState>
  );
};

export default ComingSoon;
