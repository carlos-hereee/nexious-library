import { Icon, PingCount } from "@nxs-atoms";

export type BurgerProps = {
  click: React.MouseEventHandler<HTMLButtonElement>;
  isBurger: boolean;
  ping: number;
};

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
      <Icon name={isBurger ? "x" : "burger"} size="2x" />
      <PingCount count={ping} />
    </button>
  );
};

export default BurgerButton;
