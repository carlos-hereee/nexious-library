import type { FieldDayProps } from "nxs-form";
import cal from "@nxs-utils/data/calendar.json";
import Select from "./Select";

/**
 * FieldDay
 *
 * Serves both "date-day" and "date-week". They are the same question, "pick one of seven day
 * names", and they used to be answered by two different controls: a Select for one and a
 * DataList with hideList for the other. Two visual languages for one job is the drift this
 * rework exists to remove, and a closed set of seven is a select.
 *
 * DataList is not deprecated by this; it stays the right control for a genuinely open set. It
 * just stops being used for a closed one.
 */
const FieldDay: React.FC<FieldDayProps> = (props) => {
  const { value, onChange, name, error, isDisabled, dayLabels, placeholder } = props;

  // cal.week is static English JSON, so a localized consumer needs a way in. Defaulting to
  // cal.week keeps every existing caller unchanged. The VALUE stays the English day name even
  // when a label is localized, because it is what the stored form value has always been and
  // translating it would silently change saved store hours.
  const list = dayLabels
    ? cal.week.map((day, idx) => ({ ...day, label: dayLabels[idx] || day.label, name: dayLabels[idx] || day.name }))
    : cal.week;

  return (
    <Select
      list={list}
      active={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      error={error}
      isDisabled={isDisabled}
      // The FieldShell above owns the label and the error node; see SelectProp.inShell.
      inShell
      theme="highlight"
    />
  );
};
export default FieldDay;
