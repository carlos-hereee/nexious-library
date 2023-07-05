import { Heading, Icon } from "@nxs-atoms/index";

type CalendarEventProps = {
  active: any;
  meeting: any;
  events: any[];
  click?: () => void;
};
const CalendarEvent: React.FC<CalendarEventProps> = (props) => {
  const { active, meeting, events, click } = props;
  console.log("active", active);
  console.log("meeting", meeting);
  console.log("events", events);
  return (
    <div>
      {/* <Heading data={`Booking meeting ${active.title} ${active.subtitle}`} />
       */}
      {active.uid ? "active" : "no active"}
      <button type="button" className="btn btn-main" onClick={click}>
        <Icon icon="x" />
        <strong>Selected time: </strong>
        {meeting.time.startTime} {meeting.time.endTime}
      </button>
    </div>
  );
};
export default CalendarEvent;
