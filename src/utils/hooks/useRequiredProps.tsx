import { useEffect, useState } from "react";
import type { RequiredTypesProps, ErrorMessageProp, LightSystem } from "nxs-errors";

const isMissing = (value: unknown): boolean => {
  if (value === undefined || value === null) return true;
  if (typeof value === "string") return value.length === 0;
  if (Array.isArray(value)) return value.length === 0;
  // typeof null === "object" is already handled above; only plain objects reach here
  if (typeof value === "object") return Object.keys(value as object).length === 0;
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
      if (isMissing(props[key])) missingProps(key);
    });
  }, []);

  return { lightColor, errors, setErrors, setLightColor };
};
