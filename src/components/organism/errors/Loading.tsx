import { Spinner } from "@nxs-molecules";

const Loading: React.FC = () => {
  return (
    <div className="container">
      <div className="card-header">Loading...</div>
      <Spinner />
    </div>
  );
};

export default Loading;
