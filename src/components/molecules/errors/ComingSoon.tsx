import { HeroProp } from "@nxs-utils/helpers/types";
import { Hero } from "@nxs-molecules";
import { ErrorProps } from "nxs-errors";

export type CommingSoonProps = {
  hero?: HeroProp;
  message?: string;
};

const ComingSoon: React.FC<ErrorProps> = (props) => {
  const { hero, message } = props;

  return (
    <div className="text-center">
      {hero && <Hero hero={hero} />}
      <p className="text-max">
        {message ? message : "This is the lastest of the greats, more coming soon"}
      </p>
    </div>
  );
};

export default ComingSoon;
