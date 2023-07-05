import { ButtonCancel, ReadMore, Cost } from "@nxs-atoms";
import CardHeader from "./CardHeader";

type CartRowProps = {
  data: any;
  setCancel: () => void;
  setActive: (value: any) => void;
};
const CartRow: React.FC<CartRowProps> = (props) => {
  const { data, setCancel, setActive } = props;
  return (
    <div className="card-row-wrapper">
      <ButtonCancel click={setCancel} />
      <button
        className="card-row"
        type="button"
        onClick={() => setActive(data)}
      >
        <CardHeader data={data} />
        <div className="card-row-body">
          {data.response && <ReadMore data={data.response} />}
          {data.cost && <Cost data={data.cost} />}
        </div>
      </button>
    </div>
  );
};
export default CartRow;
