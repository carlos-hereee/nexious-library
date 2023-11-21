import { useEffect, useState } from "react";
import type { RequiredTypesProps, ErrorMessageProp, LightSystem } from "nxs-errors";
import { objLength } from "@nxs-utils/app/objLength";
import { arrayLen } from "@nxs-utils/app/isArray";

export const useRequiredProps = (props: RequiredTypesProps, isAProp?: boolean) => {
  const [lightColor, setLightColor] = useState<LightSystem>("green");
  const [errors, setErrors] = useState<ErrorMessageProp[]>([]);
  // const [warnings, setWarningsHandling] = useState<ErrorMessageProp[]>([]);

  useEffect(() => {
    // use light system to determine danger levels
    setLightColor("green");
    setErrors([]);
    // reset errors to avoid redundant data
    const missingProps = (name: string) => {
      setLightColor("red");
      const oldValues = [...errors];
      const errorIdx = oldValues.findIndex((oldVal) => oldVal.name === name);
      oldValues[errorIdx] = {
        prop: name,
        code: "missingProps",
        isAProp: !!isAProp,
        value: props[name],
        name,
      };
      setErrors(oldValues);
    };
    Object.keys(props).forEach((key) => {
      const propType = typeof props[key];
      // check required
      if (!propType || !props[key]) missingProps(key);
      if (propType === "object" && objLength(props[key]) > 0) missingProps(key);
      if (arrayLen(props[key]) === 0) missingProps(key);
    });
  }, []);

  // return { lightColor, errors, setErrors, warnings, setLightColor };
  return { lightColor, errors, setErrors, setLightColor };
};
