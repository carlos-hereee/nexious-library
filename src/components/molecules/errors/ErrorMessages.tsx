import { ErrorMessage } from "@nxs-atoms/index";
import type { ErrorProps } from "nxs-errors";

const ErrorMessages: React.FC<ErrorProps> = ({ errors, component }) => {
  if (!errors) {
    const errorData = { prop: "errors", component: "error messages" };
    return <ErrorMessage error={{ ...errorData, code: "missingProps", value: errors }} />;
  }
  return errors.map((err) => (
    <ErrorMessage key={err.name} error={{ ...err, code: "missingProps", component, value: err }} />
  ));
};
export default ErrorMessages;
