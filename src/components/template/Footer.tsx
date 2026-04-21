import type { FooterProps } from "nxs-navigation";
import { Socials } from "@nxs-organism";
import HoursOfOperation from "./HoursOfOperation";

/**
 * Component - Footer
 * @param appName string;
 * @returns
 */
const Footer: React.FC<FooterProps> = ({ appName, media, hero, title, hoursOfOperation, theme, links }) => {
  return (
    <footer className={theme || "footer"}>
      <div className="footer-content-wrapper">
        {media && <Socials medias={media.medias || []} label={media.title} hero={hero} theme="socials" />}

        {hoursOfOperation && <HoursOfOperation data={hoursOfOperation} />}
      </div>

      {links && links.length > 0 && (
        <nav className="footer-links" aria-label="Footer">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link footer-link">
              <span className="nav-label">{link.label}</span>
            </a>
          ))}
        </nav>
      )}

      <div className="w-max">
        <span className="flex-center">
          {appName || title} © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
