import { InputQuantity, Label } from "@nxs-atoms";

export type FieldQuantityProps = {
  min: number;
  max: number;
  value: string;
  name: string;
  change: () => void;
  blur?: () => void;
};

const FieldQuantity: React.FC<FieldQuantityProps> = (props) => {
  const { min, max, value, change, blur, name } = props;
  return (
    <div className="field">
      <Label label={name} />
      <InputQuantity
        name={name}
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
