import { messages } from "data/messages";

type ErrorMessageProp = {
  code: string;
};
const ErrorMessage: React.FC<ErrorMessageProp> = (props) => {
  return <p className="error-message">{messages[props.code]}</p>;
};
export default ErrorMessage;
