import { NavProps } from "src/helpers";

export const Navlink = ({ data, link }: NavProps): JSX.Element => {
  return (
    <a href={link} className="nav-link">
      {data}
    </a>
  );
};

export default Navlink;
