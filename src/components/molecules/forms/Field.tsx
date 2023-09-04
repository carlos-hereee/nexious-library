import { Input } from "@nxs-atoms/index";

type FieldProp = {
  name: string;
  value: string;
  onChange: (key: any) => void;
  placeholder?: string;
};
const Field: React.FC<FieldProp> = (props) => {
  const { name, value, onChange, placeholder } = props;
  return (
    <Input
      value={value}
      change={onChange}
      name={name}
      placeholder={placeholder}
    />
  );
};
export default Field;
