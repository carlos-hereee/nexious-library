import { Icon, PingCount } from "@nxs-atoms";
import { BurgerButtonProps } from "nxs-button";

/**
 * Component Burger button
 * @param isBurger boolean; switch between show and close
 * @param click callback; fired when button is clicked
 * @param ping number; set notification count
 * @returns
 */
const BurgerButton: React.FC<BurgerButtonProps> = (props) => {
  const { isBurger, onClick, ping } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn-${isBurger ? "x" : "burger"}`}
      aria-controls="primary-navigation"
      aria-expanded={isBurger}
      aria-label={isBurger ? "open menu" : "close menu"}
    >
      <Icon icon={isBurger ? "cross" : "burger"} size="2x" />
      {ping && ping > 0 && <PingCount data={ping} />}
    </button>
  );
};

export default BurgerButton;
