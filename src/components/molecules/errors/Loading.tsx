import { Spinner } from "@nxs-atoms";
import { ErrorProps } from "nxs-errors";

// type ErrorProps = { message: string };

const Loading: React.FC<ErrorProps> = (props) => {
  const { message } = props;
  return (
    <div className="container loading">
      {message ? <p>{message}</p> : <p>Loading...</p>}
      <Spinner />
    </div>
  );
};

export default Loading;
