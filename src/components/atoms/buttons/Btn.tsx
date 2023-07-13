type BtnProp = {
  name: string;
  children?: React.ReactNode;
};
/**
 * Component - Button
 * @param name add an optional classname of the button component
 * @returns JSX.Element -> button
 */
const Btn: React.FC<BtnProp> = (props) => {
  const { name, children } = props;
  return (
    <button
      type="button"
      className={`btn${name ? ` btn-${name}` : ""}`}
      title={name ? name : ""}
    >
      {children}
    </button>
  );
};

export default Btn;
