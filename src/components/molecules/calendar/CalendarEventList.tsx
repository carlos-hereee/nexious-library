import { Icon } from "@nxs-atoms";

type CalendarEventListProps = {
  list: any[];
  click: (value: any) => void;
  meeting?: any;
};
const CalendarEventList: React.FC<CalendarEventListProps> = (props) => {
  const { list, click, meeting } = props;
  return (
    <div className="event-list">
      {list.map((d) => (
        <button
          key={d.uid}
          onClick={() => click(d)}
          className="btn btn-list-item"
          title={d.response}
        >
          {meeting ? (
            <Icon icon={d.uid === meeting.uid ? "check" : "uncheck"} />
          ) : (
            <Icon icon="uncheck" />
          )}{" "}
          {d.time.startTime} - {d.time.endTime}
        </button>
      ))}
    </div>
  );
};
export default CalendarEventList;
