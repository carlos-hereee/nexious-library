// Reusable component record: companyuno-growth/product-planning/DESIGNS/reusable-components/footer/README.md
/**
 * Footer: the app shell's closing band, with socials, opening hours, the consumer's footer links,
 * an optional credit row and the copyright line. It renders only what it is given and holds no
 * copy of its own beyond the links nav's name. Called by the platform client's App shell.
 */
import { useId } from "react";
import type { FooterProps } from "nxs-navigation";
import { Socials } from "@nxs-organism";
import { safeUrl } from "@nxs-utils/data/safeUrl";
import HoursOfOperation from "./HoursOfOperation";

/**
 * Component - Footer
 * @param credit optional small row under the links. Its visible label also names its nav through
 * aria-labelledby, so the accessible name is the caller's translated words, never a library string.
 * Without it the markup is exactly what 5.1.0 rendered (pinned in Footer.test.tsx).
 */
const Footer: React.FC<FooterProps> = ({ appName, media, hero, title, hoursOfOperation, className, links, credit }) => {
  // useId adds nothing to the DOM, so calling it on every render keeps the no credit markup unchanged
  // while giving two footers on one page distinct label ids.
  const creditLabelId = `footer-credit-${useId()}`;

  return (
    <footer className={className || "footer"}>
      <div className="footer-content-wrapper">
        {media && <Socials medias={media.medias || []} label={media.title} hero={hero} className="socials" />}

        {hoursOfOperation && <HoursOfOperation data={hoursOfOperation} />}
      </div>

      {links && links.length > 0 && (
        <nav className="footer-links" aria-label="Footer">
          {links.map((link) => (
            <a key={link.href} href={safeUrl(link.href)} className="nav-link footer-link">
              <span className="nav-label">{link.label}</span>
            </a>
          ))}
        </nav>
      )}

      {credit && (
        // footer-links keeps the consumer's existing footer link color on these anchors (the client
        // paints .footer-links a with --text-secondary); footer-credit makes the row smaller.
        <nav className="footer-links footer-credit" aria-labelledby={creditLabelId}>
          <span id={creditLabelId} className="footer-credit-label">
            {credit.label}
          </span>
          {credit.links.map((link) => (
            <a key={link.href} href={safeUrl(link.href)} className="nav-link footer-link">
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
