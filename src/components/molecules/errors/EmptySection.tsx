import { MessageProp } from "@nxs-helpers/types";

const EmptySection: React.FC<MessageProp> = ({ message }) => {
  return (
    <div className="container-empty">
      <h2>Nothing to see here</h2>
      <p className="empty">{message}</p>
    </div>
  );
};

export default EmptySection;
