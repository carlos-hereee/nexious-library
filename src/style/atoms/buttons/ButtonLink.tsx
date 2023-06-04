import { useNavigate } from "react-router-dom";

const ButtonLink = ({ data }: { data: string }): JSX.Element => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="btn btn-link"
      onClick={() => navigate(`/${data}`)}
    >
      <span> Head to {data}</span>
    </button>
  );
};

export default ButtonLink;
