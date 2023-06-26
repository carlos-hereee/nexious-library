import {
  CardBodyProps,
  CardFooterProps,
  CardHeaderProps,
} from "@nxs-helpers/types";
import { CardBody, CardHeader, CardFooter } from "@nxs-molecules";

export type CardProps = {
  header: CardHeaderProps;
  body: CardBodyProps;
  footer?: CardFooterProps;
};
/**
 * Component - Card
 *
 * --header
 * @param header.title string; heading of the card
 * @param header.hero.name string; heading of the card
 * @param header.hero.url string; heading of the card
 * @param click   callback to be fired when button is click
 * --body 
 * @param response string; the text to manipulate
 * @param hyperlink.word; string; the word that's to become a hyperlink
 * @param hyperlink.link; string; link url
 * @param hasLink: boolean; the separator to notify component its working with
 *                          hyperlink
 --footer 
  @param content string; display footer data
 * @returns Card
 */
const Card: React.FC<CardProps> = ({ header, body, footer }) => {
  return (
    <div className="card">
      <CardHeader data={header} />
      <CardBody data={body} />
      {footer && <CardFooter data={footer} />}
    </div>
  );
};

export default Card;
