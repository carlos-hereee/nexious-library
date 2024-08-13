import type { BubbleProps } from "nxs-assets";

const TextBubble: React.FC<BubbleProps> = ({ title, body, data }) => {
  return (
    <div className="text-bubble">
      {title && <h3 className="heading">{title}</h3>}
      {data && <p className="text-body text-max">{data}</p>}
      {body && <p className="text-body text-max">{body}</p>}
    </div>
  );
};
export default TextBubble;
