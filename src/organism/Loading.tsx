import Spinner from "./errors/Spinner";

const Loading = () => {
  return (
    <div className="container">
      <div className="card-header">Loading...</div>
      <Spinner />
    </div>
  );
};

export default Loading;
