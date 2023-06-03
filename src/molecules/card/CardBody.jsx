import HyperlinkText from "../../atoms/HyperlinkText";

const CardBody = ({ data }) => {
  const { hyperlink, response, hasLink, uid } = data;

  return (
    <div className="card-body">
      {hasLink ? (
        hyperlink.map(({ word, link }) => (
          <HyperlinkText
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
