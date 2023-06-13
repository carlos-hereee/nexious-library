// import { Icon } from "@atoms/index.tsx";

import { Icon } from "main.tsx";

// import { Icon } from "main";

// import { Icon } from "main.tsx";

const SubmitButton: React.FC = () => {
  return (
    <button type="submit" className="btn btn-submit">
      <Icon name="submit" /> Submit
    </button>
  );
};

export default SubmitButton;
