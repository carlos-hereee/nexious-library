import { CardHeader } from "@nxs-molecules/index";
import ReadMore from "./ReadMore";

type MeetingDetailsProp = {
  active: any;
  meeting: any;
};
const MeetingDetails: React.FC<MeetingDetailsProp> = (props) => {
  const { active, meeting } = props;
  return (
    <div className="calendar-meeting-details">
      <h2 className="heading">Package</h2>
      <div className="calendar-event-cart">
        <CardHeader data={active} />
        {active.body && <ReadMore data={active.body} />}
      </div>
      {meeting.uid && (
        <>
          <p>
            Appointment set for{" "}
            <strong>
              {`${meeting.date} @ ${meeting.time.startTime} - ${meeting.time.endTime}`}
            </strong>
          </p>{" "}
        </>
      )}
    </div>
  );
};
export default MeetingDetails;
