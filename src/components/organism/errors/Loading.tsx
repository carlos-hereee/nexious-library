// type LoadingProps = React.HTMLAttributes<HTMLDivElement> & {
//   children: React.ReactElement[];
//   className?: string;

import { Spinner } from "molecules";

// import { Spinner } from "";

// };
const Loading = () => {
  return (
    <div className="container">
      <div className="card-header">Loading...</div>
      <Spinner />
    </div>
  );
};

export default Loading;
