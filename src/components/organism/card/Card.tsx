import { CardProp } from "@nxs-utils/helpers/types";
import { CardBody, CardHeader, CardFooter } from "@nxs-molecules";

export type CardProps = {
  data: CardProp;
  theme?: string;
  click?: (e: any) => void;
};
/**
 * Component - Card
 *
 * --header
 * @param title string; heading of the card
 * @param hero.theme string; heading of the card
 * @param hero.url string; heading of the card
 * @param click   callback to be fired when button is click
 * --body 
 * @param response string; the text to manipulate
 * @param hyperlink.word; string; the word that's to become a hyperlink
 * @param hyperlink.link; string; link url
 * @param hasLink: boolean; the separator to notify component its working with
 *                          hyperlink
 --footer 
 * @param data.data string; display content on page
 * @param data.buttons string[]; display any number of buttons
 * @returns Card
 */
const Card: React.FC<CardProps> = (props) => {
  const { click, theme, data } = props;

  return (
    <div className={`card ${theme ? theme : ""}`}>
      <CardHeader data={data} />
      <CardBody data={data} />
      {data.cta && (
        <CardFooter data={data.cta} click={() => click && click(data)} />
      )}
    </div>
  );
};

export default Card;
