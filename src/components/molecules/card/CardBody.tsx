import { Hyperlink } from "@nxs-atoms";
import { CardBodyProps } from "@nxs-helpers/types";
import { getLinks } from "utils/getLinks";

type Props = {
  data: CardBodyProps;
};
const CardBody: React.FC<Props> = ({ data }) => {
  const { hyperlink, response, hasLink, uid } = data;
  const links = getLinks({ links: hyperlink, response });

  return (
    <div className="card-body">
      {hasLink ? (
        links.map((l) => <Hyperlink data={l} key={l.str} />)
      ) : (
        <p>{response}</p>
      )}
    </div>
  );
};
export default CardBody;
