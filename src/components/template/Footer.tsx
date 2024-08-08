import { Socials } from "@nxs-organism";
import type { FooterProps } from "nxs-navigation";

/**
 * Component - Footer
 * @param appName string;
 * @returns
 */
const Footer: React.FC<FooterProps> = ({ appName, media, hero }) => {
  return (
    <footer className="container">
      {media && <Socials medias={media.medias || []} label={media.title} hero={hero} />}
      <div className="w-max">
        <span className="flex-center">
          {appName} © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
