import { Heading, Icon, MeetingDetails } from "@nxs-atoms/index";
import { CalendarEventList } from "@nxs-molecules";
import { Cart } from "@nxs-organism";

type CalendarEventProps = {
  selectedDay: { date: string; list: any[] };
  setMeeting: (value: any) => void;
  setActive: (value: any) => void;
  removeFromCart: (value: any) => void;
  active?: any;
  meeting?: any;
  events: any[];
};
const CalendarEvents: React.FC<CalendarEventProps> = (props) => {
  const {
    selectedDay,
    active,
    meeting,
    events,
    setMeeting,
    setActive,
    removeFromCart,
  } = props;
  return (
    <div className="calendar-events" id="calendar-events">
      <Heading
        data={`${selectedDay.date} ${
          meeting.uid ? `@ ${meeting.response}` : ""
        }`}
      />
      <div className="calendar-events-wrapper">
        <div className="calendar-event-cart">
          <Cart
            data={events}
            heading="Select a package"
            removeFromCart={removeFromCart}
            setActive={setActive}
          />
        </div>

        <div className="event-wrapper">
          {meeting.uid ? (
            <div className="flex-d-column">
              <button
                type="button"
                className="btn btn-main"
                onClick={setMeeting}
              >
                <Icon icon="x" />
                {meeting.time.startTime} {meeting.time.endTime}
              </button>
              {active.uid && (
                <MeetingDetails active={active} meeting={meeting} />
              )}
            </div>
          ) : selectedDay.list?.length > 0 ? (
            <CalendarEventList
              list={selectedDay.list}
              click={(e) => setMeeting(e)}
              meeting={meeting}
            />
          ) : (
            <h3 className="heading">
              All booked up, please try a different day
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};
export default CalendarEvents;
