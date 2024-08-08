import type { BubblyProps } from "nxs-assets";

const Bubble: React.FC<BubblyProps> = ({ location }) => <div className={`bubble${location ? ` ${location}` : ""}`} />;
export default Bubble;
