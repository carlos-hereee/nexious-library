import { PageNotFoundProps } from "helpers/types";
import { Hero } from "atoms";

const PageNotFound: React.FC<PageNotFoundProps> = ({ message, hero }) => {
  return (
    <div className="container-not-found">
      <Hero data={hero} />
      <p className="not-found">{message}</p>
    </div>
  );
};

export default PageNotFound;
