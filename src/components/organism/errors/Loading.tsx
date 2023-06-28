// type LoadingProps = React.HTMLAttributes<HTMLDivElement> & {
//   children: React.ReactElement[];
//   className?: string;

import { Spinner } from "@nxs-molecules";

// import { Spinner } from "";

// };
const Loading: React.FC = () => {
  return (
    <div className="container">
      <div className="card-header">Loading...</div>
      <Spinner />
    </div>
  );
};

export default Loading;
