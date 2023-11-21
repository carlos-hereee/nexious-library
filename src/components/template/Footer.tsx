import { CardHeader, Hero, Socials } from "@nxs-molecules";
import type { FooterProps } from "nxs-navigation";

/**
 * Component - Footer
 * @param appName string;
 * @returns
 */
const Footer: React.FC<FooterProps> = (props) => {
  const { appName, media, hero } = props;
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
