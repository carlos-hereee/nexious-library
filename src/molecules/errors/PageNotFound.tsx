import { PageNotFoundProps } from "src/types/types";
import { Hero } from "src/atoms";

const PageNotFound: React.FC<PageNotFoundProps> = ({ message, hero }) => {
  return (
    <div className="container-not-found">
      <Hero data={hero} />
      <p className="not-found">{message}</p>
    </div>
  );
};

export default PageNotFound;