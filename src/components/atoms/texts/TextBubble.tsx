type TextBubbleProps = {
  data: { title: string; body: string };
};
const TextBubble: React.FC<TextBubbleProps> = (props) => {
  const { data } = props;
  const { title, body } = data;
  return (
    <div className="text-bubble">
      <h3>{title}</h3>
      <p className="text-body text-max">{body}</p>
    </div>
  );
};
export default TextBubble;
