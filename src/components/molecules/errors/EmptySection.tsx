import type { ErrorProps } from "nxs-errors";

const EmptySection: React.FC<ErrorProps> = (props) => {
  const { message, heading, children } = props;
  return (
    <div className="container">
      <h3>{heading || "Nothing to see here"}</h3>
      {message && <p>{message}</p>}
      {children}
    </div>
  );
};

export default EmptySection;
