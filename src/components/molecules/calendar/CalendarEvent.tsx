import { Heading, Icon } from "@nxs-atoms/index";
import { Cart } from "@nxs-organism/index";

type CalendarEventProps = {
  active: any;
  meeting: any;
  events: any[];
  removeFromCart: (value: any) => void;
  setActive: (value: any) => void;
};
const CalendarEvent: React.FC<CalendarEventProps> = (props) => {
  const { active, meeting, events, removeFromCart, setActive } = props;

  return (
    <div className="flex-2">
      <Cart
        data={events}
        heading="Select a package"
        removeFromCart={removeFromCart}
        setActive={setActive}
      />

      {/* {active.uid ? "active" : "no active"} */}
    </div>
  );
};
export default CalendarEvent;
