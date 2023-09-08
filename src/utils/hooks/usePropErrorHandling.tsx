import { objLength } from "@nxs-utils/app/objLength";
import { useEffect, useState } from "react";

export type PropHandling = { [key: string]: any };
export type ErrorHandlingMessages = {
  prop: string;
  code: string;
  key: string;
  value: string | undefined;
  isProp: boolean;
};
export type LightSystem = "green" | "yellow" | "red";

export const usePropErrorHandling = (props: PropHandling, isProp: boolean) => {
  const [lightColor, setLightColor] = useState<LightSystem>("green");
  const [errors, setErrors] = useState<ErrorHandlingMessages[]>([]);
  const [warnings, setWarningsHandling] = useState<ErrorHandlingMessages[]>([]);

  const missingProps = (key: string) => {
    setLightColor("red");
    setErrors((prev) => [
      ...prev,
      { prop: key, code: "missingProps", isProp, value: props[key], key },
    ]);
  };
  useEffect(() => {
    // use light system to determine danger levels
    setLightColor("green");
    Object.keys(props).forEach((key) => {
      // check values is valid
      if (!props[key]) missingProps(key);
      if (typeof props[key] === "object" && !objLength(props[key])) {
        missingProps(key);
      }
    });
  }, []);
  return { lightColor, errors, warnings };
};
