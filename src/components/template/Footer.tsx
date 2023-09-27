import { FooterProps } from "@nxs-types/TemplateTypes";

/**
 * Component - Footer
 * @param appName string;
 * @returns
 */
const Footer: React.FC<FooterProps> = ({ appName }) => {
  return (
    <footer>
      <span className="text-center">
        {appName} © {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default Footer;
