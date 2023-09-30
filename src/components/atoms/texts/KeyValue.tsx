import { KeyValueProps } from "nxs-typography";

const KeyValue: React.FC<KeyValueProps> = ({ key, value }) => {
  return (
    <p>
      <strong>{key}</strong> : {value}
    </p>
  );
};
export default KeyValue;
