import { LabelKeys } from "~/atoms/forms/labels";
import { InputQuantity, Label } from "~/atoms";

type FieldQuantityProps = {
  min: number;
  max: number;
  value: string;
  name: LabelKeys;
  change: () => void;
  blur: () => void;
};

const FieldQuantity: React.FC<FieldQuantityProps> = ({
  min,
  max,
  value,
  change,
  blur,
  name,
}) => {
  return (
    <div className="field">
      <Label name={name}>
        {/* TO DO: schema validation for errors
            {errors[name] && <span className="required">{errors[name]}</span>} */}
      </Label>
      <InputQuantity
        min={min}
        max={max}
        value={value}
        change={change}
        blur={blur}
      />
    </div>
  );
};
export default FieldQuantity;
