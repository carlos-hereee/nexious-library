import { HeroProp } from "@nxs-utils/helpers/types";
import { Hero } from "@nxs-molecules";

type FeatureCardProps = {
  data: {
    title: string;
    body: string;
    hero: HeroProp;
  };
  theme?: string;
};
const FeatureCard: React.FC<FeatureCardProps> = (props) => {
  const { data, theme } = props;
  return (
    <div className={`card ${theme}`}>
      <div className="card-hero-header">
        {data.hero && <Hero hero={data.hero} theme={data.hero.theme} />}
        {data.title && <h2 className="heading">{data.title}</h2>}
      </div>
      {data.body && <p>{data.body}</p>}
    </div>
  );
};
export default FeatureCard;
