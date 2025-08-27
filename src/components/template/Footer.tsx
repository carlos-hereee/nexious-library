import { Socials } from "@nxs-organism";
import type { FooterProps } from "nxs-navigation";
import HoursOfOperation from "./HoursOfOperation";

/**
 * Component - Footer
 * @param appName string;
 * @returns
 */
const Footer: React.FC<FooterProps> = ({ appName, media, hero, title, hoursOfOperation, theme }) => {
  return (
    <footer className={theme || "footer"}>
      <div className="split-container flex-center">
        {media && <Socials medias={media.medias || []} label={media.title} hero={hero} theme="container text-center" />}
        {hoursOfOperation && <HoursOfOperation data={hoursOfOperation} />}
      </div>

      <div className="w-max">
        <span className="flex-center">
          {appName || title} © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
