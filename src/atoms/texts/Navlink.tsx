import { NavProps } from "src/types/helpers";

export const Navlink: React.FC<NavProps> = ({ data, link }) => {
  return (
    <a href={link} className="nav-link">
      {data}
    </a>
  );
};

export default Navlink;
