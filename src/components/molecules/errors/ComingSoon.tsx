// import { HeroProp } from "@nxs-utils/helpers/types";
import { Hero } from "@nxs-molecules";
import type { AssetProps } from "nxs-assets";
import type { ErrorProps } from "nxs-errors";

export type CommingSoonProps = {
  hero?: AssetProps;
  message?: string;
};

const ComingSoon: React.FC<ErrorProps> = (props) => {
  const { hero, message } = props;

  return (
    <div className="text-center">
      {hero && <Hero hero={hero} />}
      <p className="text-max">{message || "More coming soon"}</p>
    </div>
  );
};

export default ComingSoon;
