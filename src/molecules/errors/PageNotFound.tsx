import { PageNotFoundProps } from "@nexious-library/helpers/types.tsx";
import { Hero } from "main.tsx";

const PageNotFound: React.FC<PageNotFoundProps> = ({ message, hero }) => {
  return (
    <div className="container-not-found">
      <Hero data={hero} />
      <p className="not-found">{message}</p>
    </div>
  );
};

export default PageNotFound;
