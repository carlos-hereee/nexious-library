import { Button } from "@nxs-atoms";
import { buildNxsButtonClass } from "../../../@types/Variant";

// Back is the neutral way out (secondary) and Confirm removes the item (danger), on the nxs-btn
// family (2026-11 item 337); the legacy btn-main and btn-danger classes stay beside them until
// 2026-11 item 339 because the client still styles them.
type CancelRowProps = {
  click: (e: boolean) => void;
};
const CartCancel: React.FC<CancelRowProps> = ({ click }) => {
  return (
    <div className="container">
      <p>Are you sure you want to remove</p>
      <p>This will delete all progress</p>
      <div className="buttons-container-row">
        <Button className={buildNxsButtonClass({ variant: "secondary", className: "btn-main" })} onClick={() => click(false)}>
          Back
        </Button>
        <Button className={buildNxsButtonClass({ variant: "danger", className: "btn-main btn-danger" })} onClick={() => click(true)}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default CartCancel;
