import { FooterProps } from "nxs-footer";

/**
 * Component - Footer
 * @param appName string;
 * @returns
 */
const Footer: React.FC<FooterProps> = (props) => {
  const { appName } = props;
  return (
    <footer>
      <span className="text-center">
        {appName} © {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default Footer;
