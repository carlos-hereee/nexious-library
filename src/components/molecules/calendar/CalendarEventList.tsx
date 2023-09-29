import { Icon } from "@nxs-atoms";
import { CalendarEventListProps } from "nxs-calendar";

const CalendarEventList: React.FC<CalendarEventListProps> = (props) => {
  const { list, onClick, meeting } = props;
  return (
    <div className="event-list">
      {list.map((d) => (
        <button
          key={d.uid}
          onClick={() => onClick(d)}
          className="btn-list-item"
          title={d.details}
        >
          {meeting ? (
            <Icon icon={d.uid === meeting.uid ? "check" : "uncheck"} />
          ) : (
            <Icon icon="uncheck" />
          )}{" "}
          {d.startTime} - {d.endTime}
        </button>
      ))}
    </div>
  );
};
export default CalendarEventList;
