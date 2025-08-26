import { Socials } from "@nxs-organism";
import type { FooterProps } from "nxs-navigation";
import Table from "./Table";

/**
 * Component - Footer
 * @param appName string;
 * @returns
 */
const Footer: React.FC<FooterProps> = ({ appName, media, hero, title, hoursOfOperation, theme }) => {
  return (
    <footer className={theme || "footer"}>
      {media && <Socials medias={media.medias || []} label={media.title} hero={hero} />}

      {hoursOfOperation && <Table list={hoursOfOperation.days} headerData={hoursOfOperation.header} />}
      <div className="w-max">
        <span className="flex-center">
          {appName || title} © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
