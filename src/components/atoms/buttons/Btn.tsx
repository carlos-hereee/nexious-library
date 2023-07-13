type BtnProp = {
  name: string;
  title?: string;
  children?: React.ReactNode;
};
/**
 * Component - Button
 * @param name add an optional classname of the button component
 * @returns JSX.Element -> button
 */
const Btn: React.FC<BtnProp> = (props) => {
  const { name, children, title } = props;
  return (
    <button
      type="button"
      className={`btn${name ? ` btn-${name}` : ""}`}
      title={title ? title : ""}
    >
      {children}
    </button>
  );
};

export default Btn;
