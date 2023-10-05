import { objLength } from "@nxs-utils/app/objLength";
import { useEffect, useState } from "react";

export type PropHandling = { [key: string]: any };
export type ErrorHandlingMessages = {
  prop: string;
  code: string;
  key: string;
  value: string | undefined;
  isAProp: boolean;
};
export type LightSystem = "green" | "yellow" | "red";

export const useRequiredProps = (props: PropHandling, isAProp: boolean) => {
  const [lightColor, setLightColor] = useState<LightSystem>("green");
  const [errors, setErrors] = useState<ErrorHandlingMessages[]>([]);
  const [warnings, setWarningsHandling] = useState<ErrorHandlingMessages[]>([]);

  const missingProps = (key: string) => {
    setLightColor("red");
    setErrors((prev) => [
      ...prev,
      { prop: key, code: "missingProps", isAProp, value: props[key], key },
    ]);
  };
  useEffect(() => {
    // use light system to determine danger levels
    setLightColor("green");
    // reset errors to avoid redundant data
    setErrors([]);
    Object.keys(props).forEach((key) => {
      const propType = typeof props[key];
      // console.log("propType", propType);
      // proptype === undefined means no prop
      if (!propType || (!props[key] && props[key] !== 0)) missingProps(key);
      else if (propType === "object" && !objLength(props[key])) {
        missingProps(key);
      } else if (props[key].length === 0) {
        missingProps(key);
      }
    });
  }, []);
  return { lightColor, errors, setErrors, warnings, setLightColor };
};
