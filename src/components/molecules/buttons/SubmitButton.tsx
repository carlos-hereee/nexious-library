import { Icon } from "@nxs-atoms";

const SubmitButton: React.FC = () => {
  return (
    <button type="submit" className="btn btn-submit">
      <Icon icon="submit" /> Submit
    </button>
  );
};

export default SubmitButton;
