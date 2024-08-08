import { Bubble } from "@nxs-atoms/index";
import { uniqueRandomList } from "@nxs-utils/data/uniqueId";
import type { BubblyProps } from "nxs-assets";

const Bubbly: React.FC<BubblyProps> = ({ bubbles, location }) => {
  // handle 0 bubbles
  if (!bubbles || bubbles === 0) return <Bubble location={location} />;
  // create random list and generate bubbles
  return uniqueRandomList(bubbles).map((bub) => <Bubble key={bub.id} />);
};
export default Bubbly;
