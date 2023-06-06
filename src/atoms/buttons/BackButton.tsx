import { JSXChildProp } from "src/types/types";

/**
 * Component - Button
 * @param children content of button
 * @returns JSX.Element -> button that goes back
 */
const BackButton: React.FC<JSXChildProp> = ({ children }) => {
  return (
    <button
      type="button"
      className="btn btn-back"
      onClick={() => history.back()}
    >
      {children}
    </button>
  );
};

export default BackButton;
