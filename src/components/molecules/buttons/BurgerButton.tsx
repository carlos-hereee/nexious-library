import { Icon, PingCount } from "@nxs-atoms";
import type { BurgerButtonProps } from "nxs-button";

/**
 * Component Burger button
 * @param isBurger boolean; switch between show and close
 * @param click callback; fired when button is clicked
 * @param ping number; set notification count
 * @returns
 */
const BurgerButton: React.FC<BurgerButtonProps> = (props) => {
  const { isBurger, onClick, ping, controls } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn-${isBurger ? "x" : "burger"}`}
      // Only emit aria-controls when the caller supplies the controlled region's id; an
      // undefined value omits the attribute, which is correct (a dangling idref is worse
      // than none). Header passes the id of the mobile nav this toggles.
      aria-controls={controls}
      aria-expanded={isBurger}
      aria-label={isBurger ? "close menu" : "open menu"}
    >
      <Icon icon={isBurger ? "cross" : "burger"} size="2x" />
      {ping && ping > 0 && <PingCount data={ping} />}
    </button>
  );
};

export default BurgerButton;
