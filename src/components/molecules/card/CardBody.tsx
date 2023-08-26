import { Hyperlink } from "@nxs-atoms";
import { CardProp } from "@nxs-utils/helpers/types";
import { getLinks } from "@nxs-utils/custom/getLinks";

type Props = {
  data: CardProp;
};
/**
 * Component - Card Body
 * @param response string; the text to manipulate
 * @param hyperlink.word; string; the word that's to become a hyperlink
 * @param hyperlink.link; string; link url
 * @param hasLink: boolean; the separator to notify component its working with
 *                          hyperlink
 * @returns
 */
const CardBody: React.FC<Props> = (props) => {
  const { hyperlink, body, features } = props.data;
  const links = hyperlink && getLinks(hyperlink, body);

  return (
    <div className="card-body">
      <p className="card-body-p">
        {links ? links.map((l) => <Hyperlink data={l} key={l.data} />) : body}
      </p>
      {features && (
        <div className="flex-w card">
          {features?.map((f) => (
            <div key={f.title}>
              <h3 className="heading">{f.title}</h3>
              <ul>
                {f.list.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default CardBody;
