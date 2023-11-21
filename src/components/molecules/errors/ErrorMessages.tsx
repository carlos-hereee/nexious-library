import { ErrorMessage } from "@nxs-atoms/index";
import type { ErrorProps } from "nxs-errors";

const ErrorMessages: React.FC<ErrorProps> = (props) => {
  const { errors, component } = props;
  if (!errors) {
    const errorData = { prop: "errors", code: "missingProps", component: "error messages" };
    return <ErrorMessage error={{ ...errorData, value: errors }} />;
  }
  return errors.map((err) => (
    <ErrorMessage key={err.name} error={{ ...err, component, value: err }} />
  ));
};
export default ErrorMessages;
