import { LabelValueProps } from "@nexious-library/helpers/types";

const KeyValue: React.FC<LabelValueProps> = ({ key, value }) => {
  return (
    <p>
      <strong>{key}</strong> : {value}
    </p>
  );
};
export default KeyValue;
