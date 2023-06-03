import Buttons from "../buttons/Buttons";

/**
 *
 * data = {name=string, uid: string, ping: number}
 */
const MenuLink = ({ data, click }) => {
  let n = data.name && data.name.split("-").join(" ");
  return (
    <li className="nav-link" data-state={data.isActive ? "active" : "not-active"}>
      <Buttons name={n} handleClick={() => click(data)} />
    </li>
  );
};

export default MenuLink;
