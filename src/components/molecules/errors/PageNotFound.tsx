import { Button, Icon } from "@nxs-atoms";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@nxs-molecules";
import type { ErrorProps } from "nxs-errors";

const PageNotFound: React.FC<ErrorProps> = (props) => {
  const { hero, message, to, timer } = props;
  const navigate = useNavigate();

  const msg = message || `Page not found re-route to ${to}`;

  useEffect(() => {
    // let client read error message and reroute to page
    if (timer) {
      if (to) setTimeout(() => navigate(`/${to}`), timer);
    }
  }, []);

  return (
    <div className="page-center">
      {hero && <Hero hero={hero} />}
      <div className="text-center">
        <Icon icon="spinner" spin="spin" />
      </div>
      {timer ? <p className="page-not-found-message">{msg}</p> : <Button label={msg} />}
    </div>
  );
};

export default PageNotFound;
