import { ErrorMessage } from "@nxs-atoms/index";
import { ErrorHandlingMessages } from "@nxs-utils/hooks/usePropErrorHandling";

export type ErrorMessagesProps = {
  errors: ErrorHandlingMessages[];
  component?: string;
};
const ErrorMessages: React.FC<ErrorMessagesProps> = (props) => {
  const { errors, component } = props;
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
