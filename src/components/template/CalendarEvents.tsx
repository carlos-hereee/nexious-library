import { MeetingDetails } from "@nxs-atoms";
import { HeaderContent, IconButton } from "@nxs-molecules";
import { CalendarEventList, UserCard } from "@nxs-organism";
import type { CalendarEventProps } from "nxs-calendar";

const CalendarEvents: React.FC<CalendarEventProps> = (props) => {
  const { selectedDay, meeting, setMeeting, handleCheckout, user, children, data, events } = props;
  return (
    <div className="container" id="calendar-events">
      {data && data.header && <HeaderContent data={data.header} />}
      {events && events.length === 0 ? <p>No events comeback later</p> : <div>Events</div>}
      {selectedDay && (
        <div className="event-wrapper">
          <h2 className="heading">{`${selectedDay.date} ${meeting?.uid ? `@ ${meeting?.response}` : ""}`}</h2>
          {meeting?.uid ? (
            <div className="flex-d-column">
              <IconButton onClick={setMeeting} icon={{ icon: "x", label: `${meeting.startTime} ${meeting.endTime}` }} />
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
      )}
      {children}
    </div>
  );
};
export default CalendarEvents;
