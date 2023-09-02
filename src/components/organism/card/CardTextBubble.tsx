import { HeroProp } from "@nxs-utils/helpers/types";
import UserCard from "./UserCard";
import { Rating } from "@nxs-molecules/index";
import { TextBubble } from "@nxs-atoms/index";

type CardTextBubbleProps = {
  hero: HeroProp;
  data: { rating: number; title: string; body: string };
  theme?: string;
};
const CardTextBubble: React.FC<CardTextBubbleProps> = (props) => {
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
