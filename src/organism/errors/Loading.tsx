import { Spinner } from "@nexious-library/molecules/errors";

// type LoadingProps = React.HTMLAttributes<HTMLDivElement> & {
//   children: React.ReactElement[];
//   className?: string;
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
