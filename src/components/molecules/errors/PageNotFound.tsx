import { Hero, Icon } from "@nxs-atoms/index";
import { HeroProp } from "@nxs-utils/helpers/types";

export type PageNotFoundProps = {
  hero?: HeroProp;
  message?: string;
};

const PageNotFound: React.FC<PageNotFoundProps> = (props) => {
  const { hero, message } = props;
  return (
    <div className="page-center">
      {hero && <Hero hero={hero} />}
      <div className="text-center">
        <Icon icon="spinner" spin="spin" />
      </div>
      <p className="page-not-found-message">
        {message ? message : "Page not found re-routing to home"}
      </p>
    </div>
  );
};

export default PageNotFound;
