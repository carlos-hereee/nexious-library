import { CardBody, CardHeader, CTA } from "@nxs-molecules";
import type { CardProps } from "nxs-card";

const Card: React.FC<CardProps> = (props) => {
  const { onClick, theme, data, hero } = props;

  return (
    <div className={`card ${theme || ""}`}>
      <CardHeader data={data} hero={hero} />
      <CardBody data={data} />
      {data.cta && onClick && data.cta.map((c) => <CTA key={c.uid} cta={c} onClick={() => onClick(c)} />)}
    </div>
  );
};

export default Card;
