import { useEffect, useRef, useState } from "react";
import type { FieldDateProps } from "nxs-form";
import type { CalendarDayProp, CalendarPEventDay } from "nxs-calendar";
import Calendar from "@nxs-template/Calendar";

/**
 * FieldDate
 *
 * A trigger showing the chosen date, opening a calendar popover.
 *
 * Two real bugs are fixed here and both had product consequences, so they are worth naming.
 *
 * ① It used to emit onChange(today) from a useEffect on mount. An OPTIONAL date field could
 * therefore never be left blank: simply rendering the form filled it in. That is why the Press
 * page kind stores publishedOn as a plain string and why `type: "date"` never entered the page
 * kind vocabulary at all. Emission now happens only on a user's day click. `defaultToToday`
 * exists for a consumer that genuinely wanted the old behavior, and defaults to false so nobody
 * gets it by accident.
 *
 * ② It used to `throw` on the render path when onChange was missing. The library ships no error
 * boundary, so that white-screened the consumer's whole subtree. Form.tsx and FormField.tsx
 * already replaced exactly this pattern with a log and a graceful bail; this now matches them.
 *
 * The calendar is also mounted in a popover rather than permanently. A repeating entry group
 * rendered one full month grid PER ITEM, which is what made a multi-date form unusable. The
 * Calendar component itself is unchanged; only when it mounts is.
 */
const FieldDate: React.FC<FieldDateProps> = (props) => {
  const { value, onChange, name, error, isDisabled, defaultToToday, placeholder } = props;
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hasSeeded = useRef(false);

  useEffect(() => {
    // The opt-in half of fix ①. Guarded by a ref rather than by the value so it fires at most
    // once per mount: seeding sets `value`, which would otherwise re-run this and fight a user
    // who then clears the field.
    if (!defaultToToday || hasSeeded.current || value || !onChange) return;
    hasSeeded.current = true;
    onChange(new Date().toDateString());
  }, [defaultToToday, value, onChange]);

  useEffect(() => {
    if (!isOpen) return undefined;
    // Close on an outside click or Escape. Without this the popover stays open behind the next
    // field the user tabs to, which in a repeating group means several calendars open at once,
    // the exact problem the popover was introduced to solve.
    const onPointerDown = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  if (!onChange) {
    console.error("FieldDate: onChange is required");
    return null;
  }

  const handleClick = (day: CalendarDayProp | CalendarPEventDay) => {
    onChange((day as CalendarDayProp).date);
    setIsOpen(false);
  };

  return (
    <div className="field-date" ref={wrapperRef}>
      <button
        type="button"
        id={name}
        className="field-date-trigger"
        disabled={isDisabled}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        // aria-describedby only. Unlike the other controls this trigger is a button, and
        // aria-invalid is not supported on the button role, so it would be ignored at best and
        // is flagged by jsx-a11y at worst. The description still points at the error node.
        aria-describedby={error ? `${name}-error` : undefined}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* An empty field says so in words. A blank trigger reads as a broken control, and the
            whole reason this field can now BE empty is bug ① above. */}
        <span className={value ? "field-date-value" : "field-date-placeholder"}>
          {value || placeholder || "Choose a date"}
        </span>
      </button>
      {isOpen && (
        <div className="field-date-popover" role="dialog" aria-label={`Choose ${name}`}>
          <Calendar value={new Date(value || Date.now())} onDayClick={handleClick} hideToday />
        </div>
      )}
    </div>
  );
};
export default FieldDate;
