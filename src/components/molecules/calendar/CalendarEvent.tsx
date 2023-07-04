import { Heading } from "@nxs-atoms/index";

type CalendarEventProps = {
  active: any;
  meeting: any;
};
const CalendarEvent: React.FC<CalendarEventProps> = (props) => {
  const { active, meeting } = props;
  console.log("active", active);
  return (
    <div>
      <Heading data={`Booking meeting ${active.title} ${active.subtitle}`} />
    </div>
  );
};
export default CalendarEvent;
