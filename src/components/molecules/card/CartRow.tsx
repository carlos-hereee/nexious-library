import { CancelButton, ReadMore, Cost } from "@nxs-atoms";
import CardHeader from "./CardHeader";

type CartRowProps = {
  data: any;
  setCancel: () => void;
};
const CartRow: React.FC<CartRowProps> = (props) => {
  const { data, setCancel } = props;
  console.log("data", data);
  return (
    <div className="card-row-wrapper">
      <CancelButton click={setCancel} />
      <button className="card-row">
        <CardHeader data={data} />
        {data.response && <ReadMore data={data.response} />}
        {data.cost && <Cost data={data.cost} />}
      </button>
    </div>
  );
};
export default CartRow;
