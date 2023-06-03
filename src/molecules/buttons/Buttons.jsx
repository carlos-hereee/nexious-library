// import NotificationCount from "../SetNotificationCount";
import Icons from "../../atoms/icons/Icons";

const Buttons = ({ name, handleClick, ping, size }) => {
  return (
    <button type="button" onClick={handleClick} className={`btn-${name} btn-icons`}>
      {name && <Icons name={name} size={size} />}
      <span className="icon-label">{name[0].toUpperCase() + name.substring(1)}</span>
      {/* <NotificationCount count={ping} /> */}
    </button>
  );
};

export default Buttons;
