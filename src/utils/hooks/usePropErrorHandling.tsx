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

export const usePropErrorHandling = (props: PropHandling, isAProp: boolean) => {
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
    Object.keys(props).forEach((key) => {
      const propType = typeof props[key];
      // check values is valid
      if (!props[key]) missingProps(key);
      if (propType === "object" && !objLength(props[key])) {
        missingProps(key);
      }
      if (props[key].length === 0) {
        missingProps(key);
      }
    });
  }, []);
  return { lightColor, errors, warnings };
};
