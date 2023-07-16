import { CardHeader } from "@nxs-molecules/index";
import ReadMore from "./ReadMore";

type MeetingDetailsProp = {
  active: any;
  meeting: any;
};
const MeetingDetails: React.FC<MeetingDetailsProp> = (props) => {
  const { active, meeting } = props;
  return (
    <>
      <h2 className="heading">Package</h2>
      <div className="calendar-event-cart">
        <CardHeader data={active} />
        {active.body && <ReadMore data={active.body} />}
      </div>
      {meeting.uid && (
        <p className="p-stretch">
          Appointment set for{" "}
          <strong>
            {`${meeting.date} @ ${meeting.time.startTime} - ${meeting.time.endTime}`}
          </strong>
        </p>
      )}
    </>
  );
};
export default MeetingDetails;
