import { useContext } from "react";
import { AppContext } from "../../../utils/context/AppContext";
import Icons from "../../atoms/icons/Icons";
import SetNotificationCount from "../SetNotificationCount";

const BurgerButton = ({ isBurger, click }) => {
  const { burger } = useContext(AppContext);
  return (
    <button
      type="button"
      onClick={click}
      className={`${isBurger ? "x" : "burger"} btn-icons`}
      aria-controls="primary-navigation"
      aria-expanded={isBurger === "x"}
      aria-label="menu">
      <Icons name={isBurger ? "x" : "burger"} size="2x" />
      <SetNotificationCount count={burger.ping} />
    </button>
  );
};

export default BurgerButton;
