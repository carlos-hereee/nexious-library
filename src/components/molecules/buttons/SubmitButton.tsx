import { Icon } from "@nxs-atoms";

type SubmitButtonProps = {
  label?: string;
  isDisable?: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const { label, isDisable } = props;
  return (
    <button type="submit" className="btn-main btn-submit" disabled={isDisable}>
      <Icon icon="submit" /> {label ? label : "Confirm"}
    </button>
  );
};

export default SubmitButton;
