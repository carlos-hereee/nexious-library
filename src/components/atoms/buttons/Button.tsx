export type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  name?: string;
  title?: string;
  theme?: string;
  label?: string;
};
/**
 * Component - Button
 * @param children children props
 * @param name add an optional classname of the button component
 * @param click Callback fired when button is click
 * @returns
 */
const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, title, theme, label } = props;
  return (
    <button
      type="button"
      className={theme ? `btn-main ${theme}` : "btn-main"}
      title={title ? title : undefined}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
