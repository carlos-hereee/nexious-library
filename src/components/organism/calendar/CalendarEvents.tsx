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
  console.log("active", active);
  return (
    <div className="calendar-events" id="calendar-events">
      <Heading
        data={`${selectedDay.date} ${
          meeting.uid ? `@ ${meeting.response}` : ""
        }`}
      />
      <div className="flex-w">
        <div className="flex-2">
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
              <div>
                <button
                  type="button"
                  className="btn btn-main"
                  onClick={setMeeting}
                >
                  <Icon icon="x" />
                  <strong>Selected time: </strong>
                  {meeting.time.startTime} {meeting.time.endTime}
                </button>
              </div>
              <div>
                {active.uid ? (
                  <MeetingDetails active={active} meeting={meeting} />
                ) : (
                  "Select a package <-"
                )}
              </div>
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
