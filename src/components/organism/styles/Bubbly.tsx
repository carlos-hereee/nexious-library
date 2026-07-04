import { Bubble } from "@nxs-atoms/index";
import type { BubblyProps } from "nxs-assets";

const Bubbly: React.FC<BubblyProps> = ({ bubbles }) => {
  // handle 0 bubbles
  if (!bubbles || bubbles === 0) return <Bubble />;
  // Static decorative divs with no identity or reordering, so the index is a valid, stable
  // key. The old uniqueRandomList minted 24-char crypto.getRandomValues ids per bubble on
  // every render (~2,400 RNG calls at the 100-bubble ceiling) purely to key empty divs.
  return Array.from({ length: bubbles }, (_, index) => <Bubble key={index} />);
};
export default Bubbly;
