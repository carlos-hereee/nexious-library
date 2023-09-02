import { Icon } from "@nxs-atoms";
import { HeroProp } from "@nxs-utils/helpers/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@nxs-molecules";

export type PageNotFoundProps = {
  hero?: HeroProp;
  message?: string;
  to?: string;
};

const PageNotFound: React.FC<PageNotFoundProps> = (props) => {
  const { hero, message, to } = props;
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate(to ? to : "/"), 1800);
  }, []);
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
