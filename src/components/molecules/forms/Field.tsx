import { Input } from "@nxs-atoms/index";

type FieldProp = {
  name: string;
  value: string;
  onChange: (key: any) => void;
};
const Field: React.FC<FieldProp> = (props) => {
  const { name, value, onChange } = props;
  return <Input value={value} change={onChange} name={name} type="text" />;
};
export default Field;
