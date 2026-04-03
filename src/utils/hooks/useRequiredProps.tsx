import { useEffect, useState } from "react";
import type { RequiredTypesProps, ErrorMessageProp, LightSystem } from "nxs-errors";
import { objLength } from "@nxs-utils/app/objLength";
import { arrayLen } from "@nxs-utils/tsChecker/isArray";

export const useRequiredProps = (props: RequiredTypesProps, isAProp?: boolean) => {
  const [lightColor, setLightColor] = useState<LightSystem>("green");
  const [errors, setErrors] = useState<ErrorMessageProp[]>([]);

  useEffect(() => {
    // reset on every run before checking
    setLightColor("green");
    setErrors([]);

    const missingProps = (name: string) => {
      setLightColor("red");
      // Use the functional update form of setErrors so each call reads the latest
      // array instead of the stale closure value captured when the effect first ran.
      // Without this, every call overwrites with the initial [] and only the last
      // error survives.
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
          // update existing entry if already recorded
          const updated = [...prev];
          updated[errorIdx] = newError;
          return updated;
        }
        return [...prev, newError];
      });
    };

    Object.keys(props).forEach((key) => {
      const value = props[key];
      const propType = typeof value;

      // BUG WAS HERE: `if (typeof props[key]) return` always fired because typeof
      // always returns a non-empty string ("undefined", "string", "object", etc.)
      // which is always truthy — so validation never ran.
      // Fix: check the actual value, not its type string.

      if (value === undefined || value === null || value === "") {
        // value is missing entirely
        missingProps(key);
      } else if (propType === "object" && !Array.isArray(value) && objLength(value) === 0) {
        // object exists but is empty — objLength returns Object.keys().length which
        // is always >= 0, so `< 0` could never fire; `=== 0` catches empty objects
        missingProps(key);
      } else if (Array.isArray(value) && arrayLen(value) === 0) {
        // array exists but is empty
        missingProps(key);
      }
    });
  }, []);

  return { lightColor, errors, setErrors, setLightColor };
};
