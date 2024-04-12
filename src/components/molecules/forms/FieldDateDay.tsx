import { Label } from "@nxs-atoms";
import type { FieldDateTimeProps } from "nxs-form";
import cal from "@nxs-utils/data/calendar.json";
import Select from "./Select";

const FieldDateDay = (props: FieldDateTimeProps) => {
  const { value, onChange, name, formMessage, label, errors, hideLabels, isDisabled } = props;

  return (
    <>
      {!hideLabels && label && <Label name={name} label={label} errors={errors} message={formMessage} />}
      <Select
        list={cal.week}
        active={value}
        onChange={onChange}
        name={name}
        isDisabled={isDisabled}
        theme="highlight"
      />
    </>
  );
};
export default FieldDateDay;
