import { Hero, Icon } from "@nxs-atoms/index";
import { HeroProp } from "@nxs-utils/helpers/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type PageNotFoundProps = {
  hero?: HeroProp;
  message?: string;
};

const PageNotFound: React.FC<PageNotFoundProps> = (props) => {
  const { hero, message } = props;
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate("/"), 1000);
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
