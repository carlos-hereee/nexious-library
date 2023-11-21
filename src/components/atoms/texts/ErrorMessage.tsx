/* eslint-disable no-console */
import { findValueType } from "@nxs-utils/helpers/methods";
import { messages } from "@nxs-utils/data/messages";
import type { ErrorMessageProps } from "nxs-errors";

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const { error } = props;

  const handleClick = () => {
    const { isUndefined } = findValueType(error.value);
    console.log("error occurred in prop ", error.prop);
    console.log("failed with code  ", error.code);
    console.log(
      "Value type",
      isUndefined ? " is undefined. \n***Hint:*** double check props" : error.value
    );
    console.log("error : ", error);
  };

  return (
    <div className="error-message-container">
      <p className="error-message">
        {error?.isAProp
          ? `Prop ${error.prop} from ${error.component} component `
          : `Component ${error.prop} `}
        {messages[error.code]}
      </p>
      <button type="button" className="btn-main" onClick={handleClick}>
        Double check log
      </button>
    </div>
  );
};
export default ErrorMessage;
