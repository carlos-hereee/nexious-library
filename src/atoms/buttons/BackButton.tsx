import { ChildProp } from "@nexious-library/helpers/types.tsx";

/**
 * Component - Button
 * @param children JSX Element(s)
 * @returns JSX.Element -> JSX Element
 */
const BackButton: React.FC<ChildProp> = ({ children }) => {
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
