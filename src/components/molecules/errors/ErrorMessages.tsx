import { ErrorMessage } from "@nxs-atoms/index";
import type { ErrorProps } from "nxs-errors";

/**
 * Renders one dev panel per missing prop, normally fed by useRequiredProps.
 * `component` is what lets each panel name the component and link its docs page, so a
 * caller that omits it gets a measurably vaguer message. Always pass it.
 */
const ErrorMessages: React.FC<ErrorProps> = ({ errors, component, isDev }) => {
  if (!errors) {
    return (
      <ErrorMessage
        isDev={isDev}
        error={{ prop: "errors", component: "ErrorMessages", code: "missingProps", value: errors }}
      />
    );
  }
  return (
    <>
      {errors.map((err) => (
        <ErrorMessage
          key={err.name}
          isDev={isDev}
          // Forward the error's OWN code and value. The previous version hard-coded
          // code: "missingProps" (discarding any real code) and passed `value: err`, which
          // reported the error record itself as the received prop value.
          error={{ ...err, component, value: err.value }}
        />
      ))}
    </>
  );
};
export default ErrorMessages;
