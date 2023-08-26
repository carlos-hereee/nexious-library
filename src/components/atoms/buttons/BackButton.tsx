type BackButtonProp = {
  children: React.ReactNode;
};
/**
 * Component - Button
 * @param children JSX Element(s)
 * @returns JSX.Element -> JSX Element
 */
const BackButton: React.FC<BackButtonProp> = ({ children }) => {
  return (
    <button type="button" className="btn-back" onClick={() => history.back()}>
      {children}
    </button>
  );
};

export default BackButton;
