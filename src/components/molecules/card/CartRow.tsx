import { ButtonCancel, ReadMore, Cost } from "@nxs-atoms";
import CardHeader from "./CardHeader";

type CartRowProps = {
  data: any;
  active?: string;
  service: any;
  setCancel: () => void;
  setActive: (value: any) => void;
};
const CartRow: React.FC<CartRowProps> = (props) => {
  const { data, setCancel, setActive, active, service } = props;
  return (
    <div className="card-row-wrapper">
      <ButtonCancel click={setCancel} />
      <button
        className={
          active === service.uid ? "card-row card-row--active" : "card-row"
        }
        type="button"
        onClick={setActive}
      >
        <CardHeader data={service} isRow />
        <div className="card-row-body">
          {service.body && <ReadMore data={service.body} />}
          {service.cost && <Cost data={service.cost} />}
        </div>
      </button>
    </div>
  );
};
export default CartRow;
