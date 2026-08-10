import { Icon, Spinner } from "@nxs-atoms";
import Skeleton from "@nxs-molecules/errors/Skeleton";
import type { ErrorProps } from "nxs-errors";

/**
 * Component - Loading
 *
 * The spinner is still the DEFAULT, and that is a decision rather than an oversight. Design
 * language 5.10 wants skeletons for full regions, but Loading is a published export rendered
 * on dozens of nexious-client surfaces this repo cannot see, so switching the default would
 * repaint every one of them as a side effect of a CSS refactor. Pass `skeleton` to opt a
 * surface in; making it the default is a Phase 5 owner decision.
 */
const Loading: React.FC<ErrorProps> = ({ message, icon, skeleton, skeletonCount }) => {
  if (skeleton) {
    return (
      <div className="container loading loading-skeleton">
        {/* Hidden from assistive tech because these are the same words the skeleton region
            already carries as its accessible name, and exposing both reads the message twice. */}
        {message && <p aria-hidden="true">{message}</p>}
        <Skeleton shape={skeleton} count={skeletonCount} label={message} />
      </div>
    );
  }

  return (
    <div className="container loading">
      {message && <p>{message}</p>}
      {icon === "thinking" ? <Icon icon="thinking" /> : <Spinner />}
    </div>
  );
};

export default Loading;
