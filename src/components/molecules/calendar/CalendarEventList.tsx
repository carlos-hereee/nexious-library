import { Icon } from "@nxs-atoms";

type CalendarEventListProps = {
  list: any[];
  click: (value: any) => void;
  active?: any;
};
const CalendarEventList: React.FC<CalendarEventListProps> = (props) => {
  const { list, click, active } = props;
  return (
    <div className="event-list">
      {list.map((d) => (
        <button
          key={d.uid}
          onClick={() => click(d)}
          className="btn btn-item"
          title={d.response}
        >
          {active ? (
            <Icon icon={d.uid === active.uid ? "check" : "uncheck"} />
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
