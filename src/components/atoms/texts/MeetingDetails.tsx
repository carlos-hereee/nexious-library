type MeetingDetailsProp = {
  meeting: any;
};
const MeetingDetails: React.FC<MeetingDetailsProp> = (props) => {
  const { meeting } = props;
  return (
    <div>
      <p>
        Appointment set for{" "}
        <strong>
          {`${meeting.date} @ ${meeting.time.startTime} - ${meeting.time.endTime}`}
        </strong>
      </p>
    </div>
  );
};
export default MeetingDetails;
