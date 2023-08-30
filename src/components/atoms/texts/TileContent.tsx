import { Icon } from "@nxs-atoms";
import { reverseCount } from "@nxs-atoms/texts/PingCount";

type TileProps = {
  tile: string | number;
};
const TileContent: React.FC<TileProps> = ({ tile }) => {
  let ping = tile
    .toString()
    .split("")
    .map((t) => reverseCount[parseInt(t)]);
  return ping.map((p) => <Icon key={p} icon={p} name="tile-ping" />);
};
export default TileContent;
