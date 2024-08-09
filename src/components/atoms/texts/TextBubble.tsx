import type { BubbleProps } from "nxs-assets";

const TextBubble: React.FC<BubbleProps> = ({ title, body }) => {
  return (
    <div className="text-bubble">
      {title && <h3 className="heading">{title}</h3>}
      {body && <p className="text-body text-max">{body}</p>}
    </div>
  );
};
export default TextBubble;
