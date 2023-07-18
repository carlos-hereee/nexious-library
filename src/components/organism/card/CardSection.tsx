import { ReadMore } from "@nxs-atoms/index";
import { CardHeaderProps } from "@nxs-helpers/types";
import { CardHeader } from "@nxs-molecules";

export type CardProps = {
  header: CardHeaderProps;
  body: string;
  hideReadMore?: boolean;
  name?: string;
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
  const { header, body, name, hideReadMore } = props;
  return (
    <div className={`card-section ${name ? name : ""}`}>
      <CardHeader data={header} />
      {body && hideReadMore ? (
        <p className="text-center">{body}</p>
      ) : (
        <ReadMore data={body} />
      )}
    </div>
  );
};

export default CardSection;
