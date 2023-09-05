import { useEffect, useState } from "react";

export type PropHandling = { [key: string]: any };
export type ErrorHandlingMessages = {
  from: string;
  code: string;
  isProp: boolean;
};
export type LightSystem = "green" | "yellow" | "red";

export const usePropErrorHandling = (props: PropHandling, isProp: boolean) => {
  const [lightColor, setLightColor] = useState<LightSystem>("green");
  const [errors, setErrorHandling] = useState<ErrorHandlingMessages[]>([]);

  useEffect(() => {
    // use light system to determine danger levels
    setLightColor("green");
    Object.keys(props).forEach((key) => {
      // check values is valid
      if (!props[key]) {
        setLightColor("red");
        setErrorHandling((prev) => [
          ...prev,
          { from: key, code: "missingProps", isProp },
        ]);
      }
    });
  }, []);
  return { lightColor, errors };
};
