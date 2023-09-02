type MessageProp = {
  heading?: string;
  message?: string;
};
const EmptySection: React.FC<MessageProp> = (props) => {
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
