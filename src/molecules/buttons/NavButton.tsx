import { Button } from "@nxs/atoms";

export type NavButtonProps = {
  data: {
    uid: string;
    name: string;
    isAlt: boolean;
    alt?: string;
  };
  click: React.MouseEventHandler<HTMLButtonElement>;
};
/**
 *  Component - NavButton
 * @param data navigation menu item
 * @param click   callback tobe fired when button is click
 *
 * @returns navigation button
 */
const NavButton: React.FC<NavButtonProps> = ({ data, click }) => (
  <li key={data.uid} className="nav-btn">
    <Button name={data.name} click={click}>
      <span>{data.isAlt ? data.alt : data.name}</span>
    </Button>
  </li>
);
export default NavButton;
{
  /* notification={data.notification} */
}
