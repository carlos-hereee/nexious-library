import { Icon } from "main.js";

const SubmitButton: React.FC = () => {
  return (
    <button type="submit" className="btn btn-submit">
      <Icon name="submit" /> Submit
    </button>
  );
};

export default SubmitButton;
