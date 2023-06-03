import CapFirstChar from "./CapFirstChar";

const CamelSpace = ({ str }) => (
  <CapFirstChar str={str.replace(/([a-z0-9])([A-Z])/g, "$1 $2")} />
);

export default CamelSpace;
