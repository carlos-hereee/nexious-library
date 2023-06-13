import { MessageProp } from "@nexious-library/helpers/types.tsx";

const EmptySection: React.FC<MessageProp> = ({ message }) => {
  return (
    <div className="container-empty">
      <p className="empty">{message}</p>
    </div>
  );
};

export default EmptySection;
