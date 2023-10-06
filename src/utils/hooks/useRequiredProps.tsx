import { objLength } from "@nxs-utils/app/objLength";
import { ErrorDataProp, ErrorMessageProp, LightSystem } from "nxs-errors";
import { useEffect, useState } from "react";

export const useRequiredProps = (props: ErrorDataProp, isAProp?: boolean) => {
  const [lightColor, setLightColor] = useState<LightSystem>("green");
  const [errors, setErrors] = useState<ErrorMessageProp[]>([]);
  const [warnings, setWarningsHandling] = useState<ErrorMessageProp[]>([]);

  const missingProps = (name: string) => {
    const isProp = isAProp ? true : false;
    setLightColor("red");
    setErrors((prev) => [
      ...prev,
      { prop: name, code: "missingProps", isAProp: isProp, value: props[name], name },
    ]);
  };
  useEffect(() => {
    // use light system to determine danger levels
    setLightColor("green");
    // reset errors to avoid redundant data
    setErrors([]);
    Object.keys(props).forEach((key) => {
      const propType = typeof props[key];
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
