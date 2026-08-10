// Time conversion at the FieldTime boundary.
//
// Two clocks meet here and only one of them is negotiable. The native <input type="time"> always
// speaks 24 hour "HH:mm" regardless of what it DISPLAYS to the user (the browser picks 12 or 24
// hour presentation from their locale, which is the whole reason for using it). The stored value
// has always been 12 hour "h:mm AM", and changing that would rewrite every saved store-hour and
// booking slot. So the wire format stays, and the conversion lives here.
//
// The meridiem is read with an ANCHORED regex rather than by searching the string for the letters
// "AM" and "PM". That is not a style preference: the control this replaces flipped the meridiem
// with `value.split("AM").join("")`, so any value carrying those letters elsewhere was silently
// mangled. A pattern anchored to the end of the string cannot make that mistake.

// "3:00 PM" / "3:00PM" / "15:00", with optional surrounding whitespace.
const WIRE_TIME = /^\s*(\d{1,2}):(\d{2})\s*([AaPp])\.?[Mm]\.?\s*$/;
const TWENTY_FOUR_HOUR = /^\s*(\d{1,2}):(\d{2})\s*$/;

const pad = (n: number) => `${n}`.padStart(2, "0");

/**
 * Wire value to the "HH:mm" the native time input requires.
 * Returns "" for anything unparseable, which renders as an empty (and still valid) input rather
 * than putting the control into an error state the user cannot clear.
 */
export const to24Hour = (value?: string): string => {
  if (!value) return "";
  const meridiem = WIRE_TIME.exec(value);
  if (meridiem) {
    const [, rawHour, minutes, half] = meridiem;
    const hour = parseInt(rawHour, 10);
    if (hour < 1 || hour > 12) return "";
    const isPm = half.toLowerCase() === "p";
    // 12 is the exception at both ends: 12 AM is hour 0 and 12 PM is hour 12, so it cannot be
    // handled by adding 12 to the PM case the way every other hour can.
    const hour24 = hour === 12 ? (isPm ? 12 : 0) : hour + (isPm ? 12 : 0);
    return `${pad(hour24)}:${minutes}`;
  }
  // Already 24 hour, which is what a value that has round-tripped through this input once looks
  // like if a consumer chose to store it that way. Pass it through rather than blanking the field.
  const plain = TWENTY_FOUR_HOUR.exec(value);
  if (plain) {
    const hour = parseInt(plain[1], 10);
    if (hour > 23 || parseInt(plain[2], 10) > 59) return "";
    return `${pad(hour)}:${plain[2]}`;
  }
  return "";
};

/**
 * The native input's "HH:mm" back to the stored 12 hour format.
 * Empty in, empty out: clearing a time field is a real action, not a failure.
 */
export const toWireTime = (value?: string): string => {
  if (!value) return "";
  const plain = TWENTY_FOUR_HOUR.exec(value);
  if (!plain) return "";
  const hour = parseInt(plain[1], 10);
  const minutes = plain[2];
  if (hour > 23 || parseInt(minutes, 10) > 59) return "";
  const isPm = hour >= 12;
  // Mirror of the 12 exception above: hour 0 displays as 12 AM, hour 12 as 12 PM.
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minutes} ${isPm ? "PM" : "AM"}`;
};
