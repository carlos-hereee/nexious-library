import { useEffect, useState } from "react";
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

  useEffect(() => {
    setLightColor("green");
    setErrors([]);

    const missingProps = (name: string) => {
      setLightColor("red");
      setErrors((prev) => {
        const newError: ErrorMessageProp = {
          prop: name,
          code: "missingProps",
          isAProp: !!isAProp,
          value: props[name],
          name,
        };
        const errorIdx = prev.findIndex((e) => e.name === name);
        if (errorIdx >= 0) {
          const updated = [...prev];
          updated[errorIdx] = newError;
          return updated;
        }
        return [...prev, newError];
      });
    };

    Object.keys(props).forEach((key) => {
      if (isMissingValue(props[key])) missingProps(key);
    });
  }, []);

  return { lightColor, errors, setErrors, setLightColor };
};
