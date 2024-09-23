import { ErrorMessage } from "@nxs-atoms/index";
import type { ICalendarEventDetails } from "nxs-calendar";

const CalendarEventDetails: React.FC<ICalendarEventDetails> = (props) => {
  const { event } = props;
  if (!event) return <ErrorMessage error={{ code: "missingProps", prop: "event", value: event }} />;
  return (
    <div className="event-wrapper">
      {/* {meeting?.uid ? (
        <div className="container">
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
        <div className="primary-container">
          <strong>All booked up, please try a different day</strong>
          <button type="button" className="btn-main flex-center">
            Find next availible
          </button>
        </div>
      )} */}
    </div>
  );
};
export default CalendarEventDetails;
