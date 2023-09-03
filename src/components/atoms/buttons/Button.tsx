export type ButtonProps = {
  click: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  name?: string;
  title?: string;
  theme?: string;
};
/**
 * Component - Button
 * @param children children props
 * @param name add an optional classname of the button component
 * @param click Callback fired when button is click
 * @returns
 */
const Button: React.FC<ButtonProps> = (props) => {
  const { children, name, click, title, theme } = props;
  return (
    <button
      type="button"
      className={theme ? `btn-${theme}` : ""}
      title={title ? title : ""}
      onClick={click}
    >
      {children}
    </button>
  );
};

export default Button;
