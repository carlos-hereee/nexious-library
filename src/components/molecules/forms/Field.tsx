import { Input, Label } from "@nxs-atoms/index";

type FieldProp = {
  name: string;
  value: string;
  onChange: (key: any) => void;
  placeholder?: string;
  type?: string;
  hideLabels?: boolean;
  labels?: string;
  errors?: string;
};
const Field: React.FC<FieldProp> = (props) => {
  const { name, value, onChange, placeholder, type } = props;
  const { hideLabels, labels, errors } = props;
  return (
    <>
      {!hideLabels && <Label name={name} label={labels} errors={errors} />}
      <Input
        value={value}
        change={onChange}
        name={name}
        theme={type === "checkbox" ? "input-checkbox" : "highlight"}
        placeholder={placeholder}
        type={type ? type : "text"}
      />
    </>
  );
};
export default Field;
