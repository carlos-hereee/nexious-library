import ArtistName from "../../atoms/ArtistName";
import Hero from "../../atoms/Hero";
import Icons from "../../icons/Icons";

const CardHeader = ({ data }) => {
  return (
    <div className="card-header">
      {data.hasHero && <Hero data={data.hero} />}
      {data.hasHero && data.hero.name.split("unsplash") && (
        <ArtistName name={data.hero.name} />
      )}
      {data.hasIcon && <Icons name={data.hero.icon} size="3x" />}
      <div className="card-header-heading">
        {data.title && <h2 className="title">{data.title}</h2>}
        {data.subtitle && <h3 className="sub-title">{data.subtitle}</h3>}
      </div>
      {data.description && <p>{data.description}</p>}
    </div>
  );
};

export default CardHeader;
