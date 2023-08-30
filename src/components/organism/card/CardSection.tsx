import { ReadMore } from "@nxs-atoms";
import { HeroProp } from "@nxs-utils/helpers/types";
import { Hero } from "@nxs-molecules";

export type CardProps = {
  data: {
    hero: HeroProp;
    body: string;
    name?: string;
    uid?: string;
  };
  hideReadMore?: boolean;
};
/**
 * Component - Card
 *
 * --header
 * @param title string; heading of the card
 * @param hero.name string; heading of the card
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
const CardSection: React.FC<CardProps> = (props) => {
  const { hideReadMore } = props;
  const { hero, body, name } = props.data;

  return (
    <div className={`card-section ${name ? name : ""}`}>
      {hero && <Hero hero={hero} theme={hero.theme} />}
      {hideReadMore
        ? body && <p className="text-center">{body}</p>
        : body && <ReadMore data={body} uid="header.uid" />}
    </div>
  );
};

export default CardSection;
