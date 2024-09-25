import { UserCard } from "@nxs-organism/index";
import type { ICalendarEventDetails } from "nxs-calendar";

const CalendarEventDetails: React.FC<ICalendarEventDetails> = ({ event }) => {
  if (!event) return <div />;
  return (
    <div>
      <h4 className="heading">{event.name}</h4>
      <p className="text-max">{event.details}</p>
      <p className="text-max">Starts: {event.startTime}</p>
      <p className="text-max">Ends: {event.endTime}</p>
      {event.attendees.length > 0 && (
        <>
          <h4 className="heading">Attendees:</h4>
          {event.attendees.map((user) => (
            <UserCard user={user} key={user.uid} />
          ))}
        </>
      )}
    </div>
  );
};
export default CalendarEventDetails;
