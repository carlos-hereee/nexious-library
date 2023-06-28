const months = [
  "january",
  "febuary",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
type CalendarProps = {
  value: string;
  onChange?: string;
};
const Calendar: React.FC<CalendarProps> = ({ value }) => {
  console.log("value", value);
  return (
    <div className="calendar">
      <p>Navigation</p>
      <p>Calendar view </p>
    </div>
  );
};
export default Calendar;
