import { MeetingDetails } from "@nxs-atoms";
import { CalendarEventList, IconButton } from "@nxs-molecules";
import { UserCard } from "@nxs-organism";
import type { CalendarEventProps } from "nxs-calendar";

const CalendarEvents: React.FC<CalendarEventProps> = (props) => {
  const { selectedDay, active, meeting, setMeeting, handleCheckout, user } = props;
  return (
    <div className="calendar-events" id="calendar-events">
      <div className="calendar-package-details">
        <h2 className="heading">Selected package</h2>
        <p className="text-center">{active}</p>
      </div>
      <div className="event-wrapper">
        <h2 className="heading">{`${selectedDay.date} ${meeting?.uid ? `@ ${meeting?.response}` : ""}`}</h2>
        {meeting?.uid ? (
          <div className="flex-d-column">
            <IconButton
              onClick={setMeeting}
              icon={{
                icon: "x",
                label: `${meeting.startTime} ${meeting.endTime}`,
              }}
            />
            {user && user.uid ? (
              <div>
                <h2 className="heading">User Information</h2>
                <UserCard user={user} hideHero />
                <MeetingDetails meeting={meeting} />
                <button type="button" className="btn-cta" onClick={handleCheckout}>
                  Proceed to checkout
                </button>
              </div>
            ) : (
              <div>Enter details</div>
            )}
          </div>
        ) : selectedDay.list?.length > 0 ? (
          meeting && <CalendarEventList list={selectedDay.list} onClick={(e) => setMeeting(e)} meeting={meeting} />
        ) : (
          <div className="flex-d-column flex-center">
            <strong>All booked up, please try a different day</strong>
            <button type="button" className="btn-main flex-center">
              Find next availible
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CalendarEvents;
