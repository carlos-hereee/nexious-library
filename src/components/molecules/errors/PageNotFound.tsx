import { Button, Icon } from "@nxs-atoms";
import { useEffect } from "react";
import { Hero } from "@nxs-molecules";
import type { ErrorProps } from "nxs-errors";

const PageNotFound: React.FC<ErrorProps> = (props) => {
  const { hero, message, to, timer, handleClick } = props;

  const msg = message || `Page not found go to ${to === "/" ? "homepage" : to}`;

  useEffect(() => {
    // let client read error message and reroute to page
    if (timer) {
      if (to && handleClick) setTimeout(() => handleClick(), timer);
    }
  }, []);

  return (
    <div className="page-center">
      {hero && <Hero hero={hero} />}
      <div className="text-center">
        <Icon icon="spinner" spin="spin" />
      </div>
      {timer ? <p className="page-not-found-message">{msg}</p> : <Button label={msg} onClick={handleClick} />}
    </div>
  );
};

export default PageNotFound;
