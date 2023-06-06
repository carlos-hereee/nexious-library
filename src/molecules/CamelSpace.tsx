import CapFirstChar from "./CapFirstChar";

const CamelSpace = ({ data }) => (
  <CapFirstChar data={data.replace(/([a-z0-9])([A-Z])/g, "$1 $2")} />
);

export default CamelSpace;
