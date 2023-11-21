import type { ButtonProps } from "nxs-button";

/**
 * Component - Button
 * @param label JSX Element(s)
 * @param click onClick Element(s)
 * @returns JSX.Element -> JSX Element
 */
const BackButton: React.FC<ButtonProps> = (props) => {
  const { onClick, label } = props;
  return (
    <button type="button" className="btn-back" onClick={onClick}>
      {label}
    </button>
  );
};

export default BackButton;
