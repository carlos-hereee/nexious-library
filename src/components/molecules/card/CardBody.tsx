import { Hyperlink } from "@nxs-atoms";
import { CardBodyProps } from "@nxs-helpers/types";

type Props = {
  data: CardBodyProps;
};
const CardBody: React.FC<Props> = ({ data }) => {
  const { hyperlink, response, hasLink, uid } = data;
  return (
    <div className="card-body">
      {hasLink ? (
        hyperlink.map(({ word, link }) => (
          <Hyperlink
            data={{ word, responseArr: response.split(word), link }}
            key={uid}
          />
        ))
      ) : (
        <p>{response}</p>
      )}
    </div>
  );
};
export default CardBody;
