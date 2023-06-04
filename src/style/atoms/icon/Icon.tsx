import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDefinition } from "./Assets";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

export type IconProps = {
  name: string;
  size: SizeProp;
  spin: string;
  color: string;
};
export const Icons = ({ name, size, spin, color }: IconProps): JSX.Element => {
  return (
    <FontAwesomeIcon
      icon={getDefinition(name)}
      size={size}
      className="icon"
      spin={spin === "spin"}
      pulse={spin === "pulse"}
      color={color}
    />
  );
};
