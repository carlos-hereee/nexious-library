import { Icon } from "src/atoms";

const Spinner = () => {
  return (
    <div className="loading">
      <Icon name="loading" spin="spin" />
    </div>
  );
};

export default Spinner;
