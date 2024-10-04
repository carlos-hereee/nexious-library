import { Icon, Spinner } from "@nxs-atoms";
import type { ErrorProps } from "nxs-errors";

const Loading: React.FC<ErrorProps> = ({ message, icon }) => {
  return (
    <div className="container loading">
      {message && <p>{message}</p>}
      {icon === "thinking" ? <Icon icon="thinking" /> : <Spinner />}
    </div>
  );
};

export default Loading;
