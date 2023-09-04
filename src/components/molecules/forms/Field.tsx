import { Input } from "@nxs-atoms/index";

type FieldProp = {
  name: string;
  value: string;
  onChange: (key: any) => void;
  placeholder?: string;
  type?: string;
};
const Field: React.FC<FieldProp> = (props) => {
  const { name, value, onChange, placeholder, type } = props;
  return (
    <Input
      value={value}
      change={onChange}
      name={name}
      placeholder={placeholder}
      type={type}
    />
  );
};
export default Field;
