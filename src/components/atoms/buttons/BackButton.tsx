import type { ButtonProps } from "nxs-button";

/**
 * Component - Button
 * @param label JSX Element(s)
 * @param click onClick Element(s)
 * @returns JSX.Element -> JSX Element
 */
const BackButton: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <button type="button" className="btn-back" onClick={() => onClick && onClick()}>
      {label}
    </button>
  );
};

export default BackButton;
