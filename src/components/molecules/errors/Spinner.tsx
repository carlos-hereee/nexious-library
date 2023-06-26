import { Icon } from "@nxs-atoms";

const Spinner: React.FC = () => {
  return (
    <div className="loading">
      <Icon icon="loading" spin="spin" />
    </div>
  );
};

export default Spinner;
