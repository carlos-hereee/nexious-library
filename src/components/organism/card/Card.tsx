import { CardBodyProps, CardHeaderProps } from "@nxs-helpers/types";
import { CardBody, CardHeader } from "@nxs-molecules";

export type CardProps = {
  header: CardHeaderProps;
  body: CardBodyProps;
};
/**
 * Component - Card
 *
 * @param header.title string; heading of the card
 * @param header.hero.name string; heading of the card
 * @param header.hero.url string; heading of the card
 * @param click   callback to be fired when button is click
 * @returns Card
 */
const Card: React.FC<CardProps> = ({ header, body }) => {
  return (
    <div className="card">
      <CardHeader data={header} />
      <CardBody data={body} />
      {/* {menu.map((m) =>
        m.isToggle ? (
          <NavButton data={m} key={m.uid} click={toggle} />
        ) : (
          <NavButton data={m} key={m.uid} click={click} />
        )
      )} */}
    </div>
  );
};

export default Card;
