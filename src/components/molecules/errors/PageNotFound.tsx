import { Icon } from "@nxs-atoms";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@nxs-molecules";
import type { ErrorProps } from "nxs-errors";

const PageNotFound: React.FC<ErrorProps> = (props) => {
  const { hero, message, to } = props;
  const navigate = useNavigate();

  useEffect(() => {
    // let client read error message and reroute to page
    if (to) setTimeout(() => navigate(`/${to}`), 2300);
  }, []);

  return (
    <div className="page-center">
      {hero && <Hero hero={hero} />}
      <div className="text-center">
        <Icon icon="spinner" spin="spin" />
      </div>
      <p className="page-not-found-message">
        {message || "Page not found re-routing to home"}
      </p>
    </div>
  );
};

export default PageNotFound;
