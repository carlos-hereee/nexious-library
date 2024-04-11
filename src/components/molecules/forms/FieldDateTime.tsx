import { Button, Label } from "@nxs-atoms";
import type { FieldDateTimeProps } from "nxs-form";
import { useToggle } from "@nxs-utils/hooks/useToggle";
import cal from "@nxs-utils/data/calendar.json";
import { useEffect, useState } from "react";
import Select from "./Select";

const FieldDateTime = (props: FieldDateTimeProps) => {
  const { value, onChange, name, formMessage, label, errors, hideLabels, isDisabled } = props;
  const { toggle, handleToggle } = useToggle();
  const [error, setError] = useState("");

  useEffect(() => {
    if (value) {
      setError("");
      onChange(`${value.split(toggle[name] ? "AM" : "PM").join("")} ${toggle[name] ? "PM" : "AM"}`);
    } else setError("Selection is required");
  }, [toggle]);

  const handleChange = (e: string) => {
    onChange(`${e} ${toggle[name] ? "PM" : "AM"}`);
    setError("");
  };
  return (
    <>
      <p>FIELD DATE TIME</p>
      {!hideLabels && label && <Label name={name} label={label} errors={errors} message={formMessage} />}
      {error && <p className="required">{error}</p>}
      <div className="flex-g">
        <Select
          list={cal.hours}
          active={value}
          onChange={handleChange}
          name={name}
          isDisabled={isDisabled}
          theme="highlight"
        />
        <Button label={toggle[name] ? "PM" : "AM"} theme="btn-main highlight" onClick={() => handleToggle(name)} />
      </div>
    </>
  );
};
export default FieldDateTime;
