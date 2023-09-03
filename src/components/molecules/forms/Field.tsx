import { labels } from "@nxs-atoms/forms/labels";
import { placeholders } from "@nxs-atoms/forms/placeholders";
import { Label } from "@nxs-atoms/index";

type FieldProp = {
  label: string;
  value: { [key: string]: string };
  errors?: { [key: string]: string };
  onChange: (key: any) => void;
};
const Field: React.FC<FieldProp> = (props) => {
  const { label, value, onChange, errors } = props;
  return (
    <div className="flex-row">
      <Label label={label} errors={errors ? errors[label] : ""} />
      <div className="flex-2">
        <input
          type="text"
          className="input"
          autoComplete="on"
          name={label}
          value={value[label]}
          placeholder={placeholders[label]}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};
export default Field;
