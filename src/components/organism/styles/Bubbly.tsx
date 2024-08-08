import { Bubble } from "@nxs-atoms/index";
import type { BubblyProps } from "nxs-assets";

const Bubbly: React.FC<BubblyProps> = ({ bubbles, location }) => {
  // handle 0 bubbles
  if (!bubbles || bubbles === 0) {
    return (
      <div className="bg-asset">
        <Bubble location={location} />
      </div>
    );
  }
  return <div>DOUBLE BLUBBLY</div>;
};
export default Bubbly;
