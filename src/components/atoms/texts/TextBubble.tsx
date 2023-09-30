import { BubbleProps } from "nxs-assets";

const TextBubble: React.FC<BubbleProps> = (props) => {
  const { title, body } = props;
  return (
    <div className="text-bubble">
      <h3>{title}</h3>
      <p className="text-body text-max">{body}</p>
    </div>
  );
};
export default TextBubble;
