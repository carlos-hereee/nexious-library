import { LabelValueProps } from "helpers/types.js";

const KeyValue: React.FC<LabelValueProps> = ({ key, value }) => {
  return (
    <p>
      <strong>{key}</strong> : {value}
    </p>
  );
};
export default KeyValue;
