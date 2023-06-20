import { Heading, Hero, Subtitle } from "@nexious/atoms";
import { CardHeaderProps } from "@nexious/helpers/interface";

const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  hasHero,
  hero,
}) => {
  return (
    <div className="flex-g">
      <div>
        <Heading data={title} />
        {hasHero && <Hero data={hero} />}
      </div>
      {subtitle && <Subtitle data={subtitle} />}
      {/* data.hasIcon && <Icons name={data.hero.icon} size="3x" />}
      <div className="card-header-heading">
        {data.title && <h2 className="title">{data.title}</h2>}
        {data.subtitle && <h3 className="sub-title">{data.subtitle}</h3>}
      </div>
      {data.description && <p>{data.description}</p>} */}
    </div>
  );
};

export default CardHeader;
