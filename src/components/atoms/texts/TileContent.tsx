import { Icon } from "@nxs-atoms";
import { reverseCount } from "@nxs-atoms/texts/PingCount";
import type { TileProps } from "nxs-typography";

const TileContent: React.FC<TileProps> = ({ tile }) => {
  const ping = tile
    .toString()
    .split("")
    .map((t) => reverseCount[parseInt(t, 10)]);

  return ping.map((p) => <Icon key={p} icon={p} name="tile-ping" />);
};
export default TileContent;
