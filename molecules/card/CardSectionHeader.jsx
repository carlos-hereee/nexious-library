import Hero from "../../atoms/Hero";
import Icons from "../../icons/Icons";

const CardSectionHeader = ({ data }) => {
  return (
    <div className="card-section-header">
      {data.hasHero && <Hero data={data.hero} />}
      {data.hasIcon && <Icons name={data.hero.icon} size="3x" />}
      <div className="card-section-heading">
        {data.title && <h2 className="card-section-title">{data.title}</h2>}
        {data.subtitle && <h3 className="card-section-subtitle">{data.subtitle}</h3>}
      </div>
      {data.description && <p>{data.description}</p>}
    </div>
  );
};

export default CardSectionHeader;
