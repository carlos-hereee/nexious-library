import EmptyState from "@nxs-molecules/errors/EmptyState";
import type { ErrorProps } from "nxs-errors";

/**
 * Component - EmptySection
 *
 * The "this list has nothing in it yet" surface. It keeps its `.container` class and its
 * default headline so existing call sites render unchanged, and gains the icon, guidance and
 * next-action slots from the shared EmptyState pattern (design language 5.10).
 */
const EmptySection: React.FC<ErrorProps> = (props) => {
  const { message, heading, icon, actionLabel, actionVariant, handleClick, children } = props;

  return (
    <EmptyState
      className="container"
      icon={icon}
      heading={heading || "Nothing to see here"}
      message={message}
      actionLabel={actionLabel}
      actionVariant={actionVariant}
      onAction={handleClick}
    >
      {children}
    </EmptyState>
  );
};

export default EmptySection;
