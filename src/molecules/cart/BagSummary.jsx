import { useContext, useState } from "react";
import { ServicesContext } from "../../../utils/context/ServicesContext";
import Heading from "../../atoms/texts/Heading";
import CancelRow from "../card/CancelRow";
import BagItem from "./BagItem";
import MeetingDetails from "../../atoms/MeetingDetails";

const BagSummary = ({ data }) => {
  const { cart, onQuantityChange, removeFromCart } =
    useContext(ServicesContext);
  const [cancel, setCancel] = useState({});
  const cancelReq = (e, isConfirm) => {
    isConfirm ? removeFromCart(cart, e) : setCancel({});
  };
  return (
    <div>
      <Heading data={{ title: "Bag Summary" }} />
      <div className="flex-d-column">
        {data.map((d) =>
          cancel.uid === d.uid ? (
            <CancelRow data={d} key={d.uid} click={cancelReq} />
          ) : (
            <BagItem key={d.uid} data={d} setCancel={setCancel}>
              <div className="card-row-wrapper">
                {d.meeting.uid && <MeetingDetails data={d.meeting} />}
              </div>
            </BagItem>
          )
        )}
      </div>
    </div>
  );
};

export default BagSummary;
