import UserCard from "./UserCard";
import { Rating } from "@nxs-molecules/index";
import { TextBubble } from "@nxs-atoms/index";
import { TextBubbleProps } from "nxs-text-bubble";

const CardTextBubble: React.FC<TextBubbleProps> = (props) => {
  const { hero, data, theme } = props;
  return (
    <div className={theme ? `${theme} card-text-bubble` : "card-text-bubble"}>
      <UserCard user={{ hero }} hideLabels />
      <div>
        <Rating star={data.rating} />
        <TextBubble data={data} />
      </div>
    </div>
  );
};
export default CardTextBubble;
