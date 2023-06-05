import { Link } from "react-router-dom";

const Navlink = ({ data }: { data: string }): JSX.Element => {
  return (
    <Link to={`/${data}`} className="link">
      {data}
    </Link>
  );
};

export default Navlink;
