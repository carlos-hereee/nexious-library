import type { HeroCardProps } from "nxs-card";
import HeaderContent from "@nxs-molecules/header/HeaderContent";
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
      <HeaderContent data={data} theme={theme || "card-header"}>
        {data.cta &&
          data.cta.map((c) => (
            <CTA key={c.uid} cta={c} onClick={() => onClick && onClick(c)} viewAsPreview={viewAsPreview} />
          ))}
      </HeaderContent>
    </div>
  );
};

export default CardHeader;
