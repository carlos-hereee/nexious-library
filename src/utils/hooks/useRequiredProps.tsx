import { useEffect, useMemo, useState } from "react";
import type { RequiredTypesProps, ErrorMessageProp, LightSystem } from "nxs-errors";

// A required prop counts as "missing" when it is undefined, null, or empty
// (empty string, empty array, empty object). Booleans and the number 0 are
// intentionally valid values, never missing — flagging them would wrongly
// reject legitimate `false`/`0` props.
const isMissingValue = (value: unknown): boolean => {
  if (value === undefined || value === null) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};

export const useRequiredProps = (props: RequiredTypesProps, isAProp?: boolean) => {
  const [lightColor, setLightColor] = useState<LightSystem>("green");
  const [errors, setErrors] = useState<ErrorMessageProp[]>([]);

  // The set of currently-missing prop names, as a stable primitive. This is the effect's
  // dependency because `props` is a fresh object literal on every render: depending on it
  // directly would re-run the effect forever (each run setStates, which re-renders, which
  // builds a new object). Depending on the DERIVED signature instead means the effect runs
  // exactly when the missing set actually changes.
  const missingProps = useMemo(() => Object.keys(props).filter((key) => isMissingValue(props[key])), [props]);
  const signature = missingProps.join("|");

  useEffect(() => {
    // Re-derive from scratch rather than patching the previous list. This is what makes the
    // panel CLEAR when the reader fixes the prop and hot-reloads; the effect previously ran
    // once on mount ([] deps), so a corrected prop kept showing the stale error and the fix
    // looked like it had not worked.
    if (!missingProps.length) {
      setLightColor("green");
      setErrors([]);
      return;
    }
    setLightColor("red");
    setErrors(
      missingProps.map((name) => ({
        prop: name,
        code: "missingProps",
        isAProp: !!isAProp,
        value: props[name],
        name,
      }))
    );
    // `props` is intentionally absent: `signature` is its meaningful projection (see above),
    // and adding the object literal back would restore the infinite render loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, isAProp]);

  return { lightColor, errors, setErrors, setLightColor };
};
