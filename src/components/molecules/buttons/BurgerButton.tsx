import { Icon, PingCount } from "@nxs-atoms";

export type BurgerProps = {
  click: React.MouseEventHandler<HTMLButtonElement>;
  isBurger: boolean;
  ping?: number;
};

/**
 * Component Burger button
 * @param isBurger boolean; switch between show and close
 * @param click callback; fired when button is clicked
 * @param ping number; set notification count
 * @returns
 */

const BurgerButton: React.FC<BurgerProps> = ({ isBurger, click, ping }) => {
  return (
    <button
      type="button"
      onClick={click}
      className={`btn-${isBurger ? "x" : "burger"} btn btn-icon`}
      aria-controls="primary-navigation"
      aria-expanded={isBurger}
      aria-label={isBurger ? "open menu" : "close menu"}
    >
      <Icon icon={isBurger ? "x" : "burger"} size="2x" />
      {ping && ping > 0 && <PingCount count={ping} />}
    </button>
  );
};

export default BurgerButton;
