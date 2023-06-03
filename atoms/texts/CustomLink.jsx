import { Link } from "react-router-dom";

const CustomLink = ({ link }) => {
  return (
    <Link to={`/${link}`} className="custom-btn-link">
      Head to {link}
    </Link>
  );
};

export default CustomLink;
