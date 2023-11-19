import type { EventMeetingProps } from "nxs-calendar";

const MeetingDetails: React.FC<EventMeetingProps> = (props) => {
  const { meeting } = props;
  return (
    <p>
      Appointment set for{" "}
      <strong>{`${meeting.date} @ ${meeting.startTime} - ${meeting.endTime}`}</strong>
    </p>
  );
};
export default MeetingDetails;
