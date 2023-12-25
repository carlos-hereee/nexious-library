import { Rating } from "@nxs-molecules/index";
import { TextBubble } from "@nxs-atoms/index";
import type { TextBubbleProps } from "nxs-assets";
import { UserCard } from "@nxs-organism";

const CardTextBubble: React.FC<TextBubbleProps> = (props) => {
  const { hero, data, theme } = props;
  return (
    <div className={theme ? `${theme} card-text-bubble` : "card-text-bubble"}>
      <UserCard user={hero} hideLabels />
      <div>
        <Rating star={data.rating} />
        <TextBubble title={data.title} body={data.body} />
      </div>
    </div>
  );
};
export default CardTextBubble;
