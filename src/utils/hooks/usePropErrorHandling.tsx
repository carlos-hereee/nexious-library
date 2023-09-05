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

  useEffect(() => {
    // use light system to determine danger levels
    setLightColor("green");
    Object.keys(props).forEach((key) => {
      // check values is valid
      if (!props[key]) {
        setLightColor("red");
        setErrors((prev) => [
          ...prev,
          { prop: key, code: "missingProps", isProp, value: props[key], key },
        ]);
      } else if (typeof props[key] === "object") {
        if (!props[key].length) {
          setLightColor("red");
          setErrors((prev) => [
            ...prev,
            { prop: key, code: "missingProps", isProp, value: props[key], key },
          ]);
        }
      }
    });
  }, []);
  return { lightColor, errors, warnings };
};
