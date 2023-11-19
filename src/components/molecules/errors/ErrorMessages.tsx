import { ErrorMessage } from "@nxs-atoms/index";
import type { ErrorProps } from "nxs-errors";

const ErrorMessages: React.FC<ErrorProps> = (props) => {
  const { errors, component } = props;
  if (!errors) return <ErrorMessage prop="errors" code="missingProps" />;
  return errors.map((err) => (
    <ErrorMessage
      key={err.name}
      prop={err.prop}
      code={err.code}
      component={component}
      error={err}
    />
  ));
};
export default ErrorMessages;
