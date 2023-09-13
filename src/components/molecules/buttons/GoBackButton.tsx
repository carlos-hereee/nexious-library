import IconButton from "./IconButton";

type ButtonProps = {
  onClick?: (key: any) => void;
};
const GoBackButton: React.FC<ButtonProps> = ({ onClick }) => (
  <IconButton
    icon={{ icon: "leftArrow", label: "Go back", name: "Go back" }}
    theme="btn-main"
    onClick={onClick}
  />
);
export default GoBackButton;
