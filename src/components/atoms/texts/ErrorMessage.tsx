import messages from "@nxs-utils/data/messages.json";
import { isDev } from "@nxs-utils/app/isDev";
import type { ErrorMessageProps } from "nxs-errors";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  const source = error.isAProp
    ? `[nexious-library] <${error.component || "Unknown"}> prop "${error.prop}"`
    : `[nexious-library] <${error.prop}>`;
  const message = `${source} ${(messages as Record<string, string>)[error.code] || error.code}`;

  if (isDev) {
    // eslint-disable-next-line no-console
    console.warn(message, { value: error.value, code: error.code });
  }

  if (!isDev) return null;

  return (
    <div className="error-message-container" role="alert">
      <p className="error-message">{message}</p>
    </div>
  );
};
export default ErrorMessage;
