import { ButtonCancel, ReadMore, Cost } from "@nxs-atoms";
import CardHeader from "./CardHeader";

type CartRowProps = {
  data: any;
  active?: string;
  service: any;
  setCancel: () => void;
  setActive: (value: any) => void;
  editDetails: () => void;
};
const CartRow: React.FC<CartRowProps> = (props) => {
  const { data, setCancel, setActive, active, service, editDetails } = props;
  return (
    <div
      className={
        active === service.uid
          ? "flex-d-column card-row--active"
          : "flex-d-column"
      }
    >
      <button className="card-row" type="button" onClick={setActive}>
        <CardHeader data={service} isRow />
        <div className="card-row-body">
          {service.body && <ReadMore data={service.body} />}
          {service.cost && <Cost data={service.cost} />}
        </div>
      </button>
      <div className="card-row-footer">
        <ButtonCancel click={setCancel} data="Cancel" />
        <button className="btn btn-main" type="button" onClick={editDetails}>
          Edit Details
        </button>
      </div>
    </div>
  );
};
export default CartRow;
