import { messages } from "data/messages";

type ErrorMessageProp = {
  code: string;
  from: string;
  component?: string;
  error?: any;
};
const ErrorMessage: React.FC<ErrorMessageProp> = (props) => {
  const { from, code, component, error } = props;

  const handleClick = () => {
    console.log("error occurred in component/prop ", from);
    console.log("failed with code  ", code);
    console.log("error : ", error);
  };

  return (
    <div className="error-message-container">
      <p className="error-message">
        {error.isProp
          ? `Prop ${from} from ${component} component `
          : `Component ${from} `}
        {messages[code]}
      </p>
      <button className="btn-main" onClick={handleClick}>
        Double check log
      </button>
    </div>
  );
};
export default ErrorMessage;
