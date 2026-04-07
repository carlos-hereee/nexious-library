import { useEffect, useState } from "react";
import type { RequiredTypesProps, ErrorMessageProp, LightSystem } from "nxs-errors";

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
      const value = props[key];
      if (value === undefined || value === null) {
        missingProps(key);
      }
    });
  }, []);

  return { lightColor, errors, setErrors, setLightColor };
};
