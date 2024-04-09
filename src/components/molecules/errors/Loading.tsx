import { Spinner } from "@nxs-atoms";
import type { ErrorProps } from "nxs-errors";

const Loading: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="container loading">
      {message ? <p>{message}</p> : <p>Loading...</p>}
      {/* {message ? <p>{message}</p> : <p>Loading...</p>}
      {message ? <p>{message}</p> : <p>Loading...</p>}
      {message ? <p>{message}</p> : <p>Loading...</p>}
      {message ? <p>{message}</p> : <p>Loading...</p>} */}
      <Spinner />
    </div>
  );
};

export default Loading;
