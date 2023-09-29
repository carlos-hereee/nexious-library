import { CardBody, CardHeader, CTA } from "@nxs-molecules";
import { CardProps } from "nxs-card";

const Card: React.FC<CardProps> = (props) => {
  const { onClick, theme, data } = props;

  return (
    <div className={`card ${theme ? theme : ""}`}>
      <CardHeader data={data} />
      <CardBody data={data} />
      {data.cta && onClick && <CTA cta={data.cta} onClick={() => onClick(data)} />}
    </div>
  );
};

export default Card;
