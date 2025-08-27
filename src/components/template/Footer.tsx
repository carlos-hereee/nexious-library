import type { FooterProps } from "nxs-navigation";
import { Socials } from "@nxs-organism";
import HoursOfOperation from "./HoursOfOperation";

/**
 * Component - Footer
 * @param appName string;
 * @returns
 */
const Footer: React.FC<FooterProps> = ({ appName, media, hero, title, hoursOfOperation, theme }) => {
  return (
    <footer className={theme || "footer"}>
      <div className="footer-content-wrapper">
        {media && <Socials medias={media.medias || []} label={media.title} hero={hero} theme="socials" />}

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
