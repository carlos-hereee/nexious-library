import ButtonLink from "../../atoms/buttons/ButtonLink";

const LinkNavigation = ({ links }) => {
  return (
    <nav className="navbar">
      {links.map((l) => (
        <ButtonLink link={l} key={l} />
      ))}
    </nav>
  );
};

export default LinkNavigation;
