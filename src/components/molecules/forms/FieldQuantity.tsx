import { InputQuantity, Label } from "@nxs-atoms";

export type FieldQuantityProps = {
  min: number;
  max: number;
  value: string;
  name: string;
  onChange: () => void;
  onBlur?: () => void;
};

const FieldQuantity: React.FC<FieldQuantityProps> = (props) => {
  const { min, max, value, onChange, onBlur, name } = props;
  return (
    <div className="field">
      <Label label={name} name={name} />
      <InputQuantity
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};
export default FieldQuantity;
