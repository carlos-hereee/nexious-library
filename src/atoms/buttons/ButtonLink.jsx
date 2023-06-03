import { useNavigate } from "react-router-dom";

const ButtonLink = ({ link }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="btn btn-link"
      onClick={() => navigate(`/${link}`)}>
      Head to {link}
    </button>
  );
};

export default ButtonLink;
