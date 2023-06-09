import { MessageProp } from "types/types";

const EmptySection: React.FC<MessageProp> = ({ message }) => {
  return (
    <div className="container-empty">
      <p className="empty">{message}</p>
    </div>
  );
};

export default EmptySection;
