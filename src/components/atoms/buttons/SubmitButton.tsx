import { Icon } from "@nxs-atoms";

type SubmitButtonProps = {
  label?: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const { label } = props;
  return (
    <button type="submit" className="btn-submit">
      <Icon icon="submit" /> {label ? label : "Confirm"}
    </button>
  );
};

export default SubmitButton;
