import { useId } from "react";
import type { FieldTimeProps } from "nxs-form";
import { to24Hour, toWireTime } from "@nxs-utils/form/time";

/**
 * FieldTime
 *
 * One control for picking a time, replacing a Select of 12 fixed hours sitting beside a separate
 * AM/PM toggle button.
 *
 * The old pair was fragile in a way that is worth naming, because the replacement is chosen to
 * make it impossible rather than to fix it: flipping the meridiem was done by string surgery,
 * `value.split("AM").join("") + " PM"`, so any value containing those two letters anywhere else
 * corrupted. It was also 12 hour and English only, since the hour list was static JSON.
 *
 * The native <input type="time"> removes all of that. It gives free keyboard entry, a free mobile
 * picker, and free locale-aware 12 or 24 hour presentation decided by the user's own locale
 * rather than by our JSON. The wire format is unchanged (see utils/form/time): the browser speaks
 * 24 hour "HH:mm" and the component converts at its boundary, so a consumer's stored "3:00 PM"
 * still round-trips as "3:00 PM".
 *
 * TIMEZONE is deliberately out of scope and the shape does not block it. A time with no timezone
 * is only half solved; user timezone preference is tracked as 2026-08 item 16.
 */
const FieldTime: React.FC<FieldTimeProps> = (props) => {
  const { name, value, onChange, isDisabled, error, list } = props;
  // A datalist needs an id, and the field name is not guaranteed unique on a page with two forms.
  const listId = useId();

  if (!onChange) {
    // Log and degrade rather than throw. The library ships no error boundary, so a throw on the
    // render path white-screens the consumer's whole subtree; Form.tsx and FormField.tsx made
    // exactly this trade already and this matches them.
    console.error("FieldTime: onChange is required");
    return null;
  }

  return (
    <>
      <input
        type="time"
        className="highlight field-time"
        id={name}
        name={name}
        value={to24Hour(value)}
        disabled={isDisabled}
        // A constrained slot list (booking availability) stays SUGGESTIONS on the one control
        // rather than becoming a second control. The input still accepts a free time, which is
        // what keeps this one field instead of two.
        list={list && list.length > 0 ? listId : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        onChange={(event) => onChange(toWireTime(event.currentTarget.value))}
      />
      {list && list.length > 0 && (
        <datalist id={listId}>
          {list.map((option) => (
            // The child text is the human-readable hint ("9:00 AM") while the value is the 24
            // hour form the input requires. A bare self-closing <option> is valid HTML in a
            // datalist but gives assistive tech nothing to read, so both are supplied.
            <option key={option.uid || option.value} value={to24Hour(option.value)}>
              {option.label || option.value}
            </option>
          ))}
        </datalist>
      )}
    </>
  );
};
export default FieldTime;
