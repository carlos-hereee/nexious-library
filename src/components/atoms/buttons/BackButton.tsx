import type { ButtonProps } from "nxs-button";

/**
 * Component - Button
 * @param children JSX Element(s)
 * @returns JSX.Element -> JSX Element
 */
const BackButton: React.FC<ButtonProps> = (props) => {
  const { children } = props;
  return (
    <button type="button" className="btn-back" onClick={() => history.back()}>
      {children}
    </button>
  );
};

export default BackButton;
