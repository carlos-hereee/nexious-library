import { Icon, PingCount } from "@nxs-atoms";
import { IconButtonProps } from "nxs-button-icon";

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { icon, ping, onClick, theme } = props;
  return (
    <button
      className={theme}
      onClick={onClick}
      title={icon.name || icon.icon}
      type="button"
    >
      <Icon icon={icon.icon} size={icon.size} spin={icon.spin} color={icon.color} />
      {icon.label && icon.label}
      {ping && ping > 0 && <PingCount count={ping} />}
    </button>
  );
};

export default IconButton;
