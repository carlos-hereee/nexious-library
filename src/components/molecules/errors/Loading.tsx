import { Spinner } from "@nxs-atoms";

type LoadingProps = { message: string };

const Loading: React.FC<LoadingProps> = (props) => {
  const { message } = props;
  return (
    <div className="container loading">
      {message ? <p>{message}</p> : <p>Loading...</p>}
      <Spinner />
    </div>
  );
};

export default Loading;
