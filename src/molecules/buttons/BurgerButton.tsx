import { Icon } from "@nexious-atoms/index";
import { ButtonProps } from "@nexious-helpers/interface";

const BurgerButton: React.FC<ButtonProps> = ({ name, isBurger, click }) => {
  return (
    <button
      type="button"
      onClick={click}
      className={`btn-${isBurger ? "x" : "burger"} btn btn-icons`}
      aria-controls="primary-navigation"
      aria-expanded={isBurger}
      aria-label={name}
    >
      <Icon name={isBurger ? "x" : "burger"} size="2x" />
      {/* <SetNotificationCount count={burger.ping} /> */}
    </button>
  );
};

export default BurgerButton;
