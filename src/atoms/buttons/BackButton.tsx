import { JSXChildProp } from "src/types/types";

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
