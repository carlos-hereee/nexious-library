import { ButtonCancel, ReadMore, Cost } from "@nxs-atoms";
import CardHeader from "./CardHeader";

type CartRowProps = {
  data: any;
  active: any;
  setCancel: () => void;
  setActive: (value: any) => void;
};
const CartRow: React.FC<CartRowProps> = (props) => {
  const { data, setCancel, setActive, active } = props;
  return (
    <div className="card-row-wrapper">
      <ButtonCancel click={setCancel} />
      <button
        className={
          active.uid === data.uid ? "card-row card-row--active" : "card-row"
        }
        type="button"
        onClick={() => setActive(data)}
      >
        <CardHeader data={data} isRow={true} />
        <div className="card-row-body">
          {data.response && <ReadMore data={data.response} />}
          {data.cost && <Cost data={data.cost} />}
        </div>
      </button>
    </div>
  );
};
export default CartRow;
