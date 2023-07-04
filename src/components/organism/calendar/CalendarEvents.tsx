import { CalendarEventList, CardHeader } from "@nxs-molecules";

type CalendarEventProps = {
  selectedDay: any;
  click: (value: any) => void;
  active?: any;
};
const CalendarEvents: React.FC<CalendarEventProps> = (props) => {
  const { selectedDay, click, active } = props;
  return (
    <div className="p-sm" id="calendar-events">
      <CardHeader data={{ title: selectedDay.date }} />
      {selectedDay.list?.length > 0 ? (
        <CalendarEventList
          list={selectedDay.list}
          click={(e) => click(e)}
          active={active}
        />
      ) : (
        " <DayNotFound />"
      )}
      {/* {active.uid && meeting.uid ? <BookEvent /> : <NotFound />} */}
    </div>
  );
};
export default CalendarEvents;
