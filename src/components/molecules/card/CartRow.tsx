import { ButtonCancel, ReadMore, Cost, MeetingDetails } from "@nxs-atoms";
import CardHeader from "./CardHeader";

type CartRowProps = {
  data: any;
  active?: string;
  service?: any;
  meeting?: any;
  setCancel: () => void;
  setActive: (value: any) => void;
  editDetails: () => void;
};
const CartRow: React.FC<CartRowProps> = (props) => {
  const { data, setCancel, setActive, active, service, editDetails, meeting } =
    props;
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
          {meeting.uid && <MeetingDetails meeting={meeting} />}
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
