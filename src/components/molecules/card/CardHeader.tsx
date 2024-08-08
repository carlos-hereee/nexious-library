import { Subtitle } from "@nxs-atoms";
import type { HeroCardProps } from "nxs-card";
import CTA from "./CTA";

/**
 * Component - Card Header
 * @param title string;
 * @param subTitle string;
 * @param hero.link string; url to assets
 * @param hero.name string; name of assets
 * @param hasHero boolean; check if component needs assets
 * @returns
 */
const CardHeader: React.FC<HeroCardProps> = ({ data, theme, onClick, viewAsPreview }) => {
  return (
    <div className={theme || "card-header"}>
      {data.title && <h2 className="heading">{data.title}</h2>}{" "}
      {data.tagline && <h3 className="heading">{data.tagline}</h3>}
      {data.subtitle && <Subtitle data={data.subtitle} />}{" "}
      {data.cta &&
        data.cta.map((c) => (
          <CTA key={c.uid} cta={c} onClick={() => onClick && onClick(c)} viewAsPreview={viewAsPreview} />
        ))}
    </div>
  );
};

export default CardHeader;
