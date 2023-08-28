import { Icon, MeetingDetails } from "@nxs-atoms/index";
import {
  CalendarEventList,
  CardHeader,
  CartRow,
  IconButton,
} from "@nxs-molecules";
import { CardSection, UserCard } from "@nxs-organism";

type CalendarEventProps = {
  selectedDay: { date: string; list: any[] };
  setMeeting: (value: any) => void;
  setActive: (value: any) => void;
  removeFromCart: (value: any) => void;
  handleCheckout: (value: any) => void;
  user?: any;
  active?: any;
  meeting?: any;
  events: any[];
};
const CalendarEvents: React.FC<CalendarEventProps> = (props) => {
  const { selectedDay, active, meeting, setMeeting, handleCheckout, user } =
    props;
  return (
    <div className="calendar-events" id="calendar-events">
      <div className="calendar-package-details">
        <h2 className="heading">Selected package</h2>
        <CardSection data={active} />
      </div>
      <div className="event-wrapper">
        <h2 className="heading">
          {`${selectedDay.date} ${meeting.uid ? `@ ${meeting.response}` : ""}`}
        </h2>
        {meeting.uid ? (
          <div className="flex-d-column">
            <IconButton
              click={setMeeting}
              icon={{
                icon: "x",
                label: `${meeting.time.startTime} ${meeting.time.endTime}`,
              }}
            />
            {user && user.uid ? (
              <div>
                <h2 className="heading">User Information</h2>
                <UserCard user={user} hideHero />
                <MeetingDetails meeting={meeting} />
                <button
                  type="button"
                  className="btn-cta"
                  onClick={handleCheckout}
                >
                  Proceed to checkout
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : selectedDay.list?.length > 0 ? (
          <CalendarEventList
            list={selectedDay.list}
            click={(e) => setMeeting(e)}
            meeting={meeting}
          />
        ) : (
          <strong>All booked up, please try a different day</strong>
        )}
      </div>
    </div>
  );
};
export default CalendarEvents;
