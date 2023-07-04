import { CalendarEventList, CardHeader, CalendarEvent } from "@nxs-molecules";

type CalendarEventProps = {
  selectedDay: any;
  click: (value: any) => void;
  active?: any;
  meeting?: any;
};
const CalendarEvents: React.FC<CalendarEventProps> = (props) => {
  const { selectedDay, click, active, meeting } = props;
  console.log("meeting, active", meeting, active);
  return (
    <div className="p-sm" id="calendar-events">
      <CardHeader data={{ title: selectedDay.date }} />
      {selectedDay.list?.length > 0 ? (
        <CalendarEventList
          list={selectedDay.list}
          click={(e) => click(e)}
          meeting={meeting}
        />
      ) : (
        <h3 className="heading">All booked up, please try a different day</h3>
      )}
      {active.uid && meeting.uid ? (
        <CalendarEvent active={active} meeting={meeting} />
      ) : (
        "<NotFound />"
      )}
    </div>
  );
};
export default CalendarEvents;
