import { CalendarEventList, CardHeader, CalendarEvent } from "@nxs-molecules";

type CalendarEventProps = {
  selectedDay: { date: string; list: any[] };
  click: (value: any) => void;
  active?: any;
  meeting?: any;
  events: any[];
};
const CalendarEvents: React.FC<CalendarEventProps> = (props) => {
  const { selectedDay, click, active, meeting, events } = props;
  return (
    <div className="calendar-events" id="calendar-events">
      <CardHeader
        data={{
          title: `${selectedDay.date} ${
            meeting.uid ? `@ ${meeting.response}` : ""
          }`,
        }}
      />
      {meeting.uid ? (
        <CalendarEvent
          active={active}
          meeting={meeting}
          events={events}
          click={() => click({})}
        />
      ) : selectedDay.list?.length > 0 ? (
        <CalendarEventList
          list={selectedDay.list}
          click={(e) => click(e)}
          meeting={meeting}
        />
      ) : (
        <h3 className="heading">All booked up, please try a different day</h3>
      )}
    </div>
  );
};
export default CalendarEvents;
