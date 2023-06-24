export type FooterProps = {
  title: string;
};
/**
 * Component - Footer
 * @param title string;
 * @returns
 */
const Footer: React.FC<FooterProps> = ({ title }) => {
  return (
    <footer>
      <span className="text-center">
        {title} © {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default Footer;
