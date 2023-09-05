import { messages } from "data/messages";

type ErrorMessageProp = {
  code: string;
  from: string;
  // isComponent: boolean;
  isProp?: boolean;
  component?: string;
};
const ErrorMessage: React.FC<ErrorMessageProp> = (props) => {
  const { from, code, isProp, component } = props;

  return (
    <p className="error-message">
      {isProp
        ? `Prop ${from} from ${component} component `
        : `Component ${from} `}
      {messages[code]}
    </p>
  );
};
export default ErrorMessage;
