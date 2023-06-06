export type ButtonProps = {
  data: string;
  // data: any;
  name?: string;
  click?: React.MouseEventHandler<HTMLButtonElement>;
};

/**
 * Component - Button
 * @param data content of button component
 * @param name add an optional classname of the button component
 * @param click Callback fired when button is click
 * @returns JSX.Element -> button
 */
const Button: React.FC<ButtonProps> = ({ data, name, click }) => {
  return (
    <button
      type="button"
      className={`btn${name ? ` btn-${name}` : ""}`}
      onClick={click}
    >
      {data}
    </button>
  );
};

export default Button;
