import IconButton from "../buttons/IconButton";

/**
 *
 * data = {name=string, uid: string, ping: number}
 */
const MenuLink = ({ data, click }) => {
  let n = data.name && data.name.split("-").join(" ");
  return (
    <li
      className="nav-link"
      data-state={data.isActive ? "active" : "not-active"}
    >
      <IconButton name={n} handleClick={() => click(data)} />
    </li>
  );
};

export default MenuLink;
