import { Link } from "react-router-dom";

const Navlink = ({ data }: { data: string }) => {
  return (
    <Link to={`/${data}`} className="link">
      {data}
    </Link>
  );
};

export default Navlink;
