import type { HybribDataProp } from "nxs-typography";

const Cost: React.FC<HybribDataProp> = ({ data }) => (
  <div>
    <p className="cost">
      <strong>Cost: ${data}</strong>
    </p>
  </div>
);
export default Cost;
