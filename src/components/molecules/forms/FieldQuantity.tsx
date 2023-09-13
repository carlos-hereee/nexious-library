import { InputQuantity, Label } from "@nxs-atoms";

export type FieldQuantityProps = {
  min: number;
  max: number;
  value: string;
  name: string;
  onChange: () => void;
  blur?: () => void;
};

const FieldQuantity: React.FC<FieldQuantityProps> = (props) => {
  const { min, max, value, onChange, blur, name } = props;
  return (
    <div className="field">
      <Label label={name} name={name} />
      <InputQuantity
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        blur={blur}
      />
    </div>
  );
};
export default FieldQuantity;
