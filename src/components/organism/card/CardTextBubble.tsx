import { Hero, Rating } from "@nxs-molecules/index";
import { TextBubble } from "@nxs-atoms/index";
import type { TextBubbleProps } from "nxs-assets";

const CardTextBubble: React.FC<TextBubbleProps> = ({ hero, data, theme, children, sender }) => {
  return (
    <div className={theme ? `${theme} card-text-bubble` : "card-text-bubble"}>
      {hero ? (
        <Hero
          hero={hero}
          theme={
            sender
              ? `card-text-sender ${hero.theme ? hero.theme : "user-hero"}`
              : `${hero.theme ? hero.theme : "user-hero"}`
          }
        />
      ) : (
        // <UserCard user={hero} hideLabels theme={sender ? "card-text-sender" : undefined} />
        <div className={sender ? "card-text-sender" : undefined} />
      )}
      {typeof data.rating === "number" ? (
        <div className="container">
          <Rating star={data.rating} />
          <TextBubble title={data.title} body={data.body} data={data.data} />
        </div>
      ) : (
        <TextBubble title={data.title} body={data.body} data={data.data} />
      )}
      {children}
    </div>
  );
};
export default CardTextBubble;
