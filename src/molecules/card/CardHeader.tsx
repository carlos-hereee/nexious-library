// import ArtistName from "../../atoms/ArtistName";
// import Hero from "../../atoms/Hero";
// import Icons from "../../icons/Icons";

import { Heading } from "src/atoms";
import { Hero } from "src/atoms/asset";
import Subtitle from "src/atoms/texts/Subtitle";
import { CardHeaderProps } from "src/types/interface";

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
