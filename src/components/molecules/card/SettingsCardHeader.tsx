import Button from "@nxs-atoms/buttons/Button";
import Icon from "@nxs-atoms/assets/Icon";

interface SettingsCardHeaderProps {
  title: string;
  active: string;
  onClick?: (data: string) => void;
}

const SettingsCardHeader = ({ title, onClick, active }: SettingsCardHeaderProps) => {
  return (
    <Button theme="settings-card-header highlight" onClick={() => onClick && onClick(title === active ? "" : title)}>
      <h3 className="heading">{title}</h3> <Icon icon={title === active ? "arrowUp" : "arrowDown"} />
    </Button>
  );
};
export default SettingsCardHeader;
