import { labels } from "@nxs-atoms/forms/labels";
import { placeholders } from "@nxs-atoms/forms/placeholders";

type FieldProp = {
  label: string;
  value: { [key: string]: string };
  errors: { [key: string]: string };
  onChange: (key: any) => void;
};
const Field: React.FC<FieldProp> = (props) => {
  const { label, value, onChange, errors } = props;
  return (
    <div className="flex-row">
      <label htmlFor={label} className="label flex-1">
        {labels[label]}:
        {errors && errors[label] && <span>{errors[label]}</span>}
      </label>
      <input
        type="text"
        className="flex-2 input"
        autoComplete="on"
        name={label}
        value={value[label]}
        placeholder={placeholders[label]}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
};
export default Field;
