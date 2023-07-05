import { Heading, Icon } from "@nxs-atoms/index";
import { Cart } from "@nxs-organism/index";

type CalendarEventProps = {
  active: any;
  meeting: any;
  events: any[];
  click: () => void;
};
const CalendarEvent: React.FC<CalendarEventProps> = (props) => {
  const { active, meeting, events, click } = props;
  console.log("active", active);
  console.log("meeting", meeting);
  console.log("events", events);
  return (
    <div className="flex-2">
      <Cart data={events} heading="Select a package" removeFromCart={click} />
      {/* <Heading data={`Booking meeting ${active.title} ${active.subtitle}`} />
       */}
      {/* {active.uid ? "active" : "no active"} */}
    </div>
  );
};
export default CalendarEvent;
