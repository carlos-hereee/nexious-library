type MessageProp = {
  heading?: string;
  message?: string;
  click: (a: any) => void;
};
const EmptySection: React.FC<MessageProp> = (props) => {
  const { message, click, heading } = props;
  return (
    <div className="container-empty">
      {heading ? (
        <h2 className="heading">{heading}</h2>
      ) : (
        <h2 className="heading">Nothing to see here</h2>
      )}
      <button className="btn btn-cta" type="button" onClick={click}>
        <p className="empty">{message}</p>
      </button>
    </div>
  );
};

export default EmptySection;
