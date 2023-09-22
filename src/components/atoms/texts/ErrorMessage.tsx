import { messages } from "data/messages";

type ErrorMessageProp = {
  code: string;
  prop: string;
  component?: string;
  error?: any;
};
const ErrorMessage: React.FC<ErrorMessageProp> = (props) => {
  const { prop, code, component, error } = props;

  const handleClick = () => {
    console.log("error occurred in prop ", prop);
    console.log("failed with code  ", code);
    console.log("error : ", error);
  };

  return (
    <div className="error-message-container">
      <p className="error-message">
        {error?.isAProp
          ? `Prop ${prop} from ${component} component `
          : `Component ${prop} `}
        {messages[code]}
      </p>
      <button className="btn-main" onClick={handleClick}>
        Double check log
      </button>
    </div>
  );
};
export default ErrorMessage;
