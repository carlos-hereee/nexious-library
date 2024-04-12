import { Label } from "@nxs-atoms";
import type { FieldDateWeekProps } from "nxs-form";
import cal from "@nxs-utils/data/calendar.json";
import DataList from "./DataList";

const FieldDateWeek = (props: FieldDateWeekProps) => {
  const { value, onChange, name, formMessage, label, errors, hideLabels, isDisabled } = props;

  return (
    <>
      {!hideLabels && label && <Label name={name} label={label} errors={errors} message={formMessage} />}
      <DataList list={cal.week} value={value} onChange={onChange} name={name} isDisabled={isDisabled} hideList />
    </>
  );
};
export default FieldDateWeek;
