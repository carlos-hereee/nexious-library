import { ErrorMessage } from "@nxs-atoms/index";
import { ErrorProps } from "nxs-errors";

const ErrorMessages: React.FC<ErrorProps> = (props) => {
  const { errors, component } = props;
  if (!errors) return <ErrorMessage prop="errors" code="missingProps" />;
  return errors.map((err) => (
    <ErrorMessage
      key={err.key}
      prop={err.prop}
      code={err.code}
      component={component}
      error={err}
    />
  ));
};
export default ErrorMessages;
