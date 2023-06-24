export type FooterProps = {
  title: string;
};
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
