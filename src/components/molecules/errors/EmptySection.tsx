import { ErrorProps } from "nxs-errors";

const EmptySection: React.FC<ErrorProps> = (props) => {
  const { message, heading } = props;
  return (
    <p>
      {heading ? (
        <strong className="heading">{heading}</strong>
      ) : (
        <strong className="heading">Nothing to see here</strong>
      )}
      <br />
      {message}
    </p>
  );
};

export default EmptySection;
