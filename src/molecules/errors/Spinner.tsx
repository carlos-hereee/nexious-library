import { Icon } from "~/atoms";

const Spinner: React.FC = () => {
  return (
    <div className="loading">
      <Icon name="loading" spin="spin" />
    </div>
  );
};

export default Spinner;
