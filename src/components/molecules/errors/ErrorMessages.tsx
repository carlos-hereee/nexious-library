import { ErrorMessage } from "@nxs-atoms/index";
import { ErrorHandlingMessages } from "@nxs-utils/hooks/usePropErrorHandling";

export type ErrorMessagesProps = {
  errors: ErrorHandlingMessages[];
  component?: string;
  isProp?: boolean;
};
const ErrorMessages: React.FC<ErrorMessagesProps> = (props) => {
  const { errors, component, isProp } = props;
  return errors.map(({ from, code }) => (
    <ErrorMessage
      key={from}
      from={from}
      code={code}
      component={component}
      isProp={isProp}
    />
  ));
};
export default ErrorMessages;
