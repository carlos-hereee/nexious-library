type MeetingDetailsProp = {
  active: any;
  meeting: any;
};
const MeetingDetails: React.FC<MeetingDetailsProp> = (props) => {
  const { active, meeting } = props;
  return (
    <>
      <h3 className="heading">
        Booking: {active.title + " " + active.subtitle}
      </h3>
      <p>
        Appointment set for{" "}
        <strong>
          {`${meeting.date} @ ${meeting.time.startTime} - ${meeting.time.endTime}`}
        </strong>
      </p>
    </>
  );
};
export default MeetingDetails;
