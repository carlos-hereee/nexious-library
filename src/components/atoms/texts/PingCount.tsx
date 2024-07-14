import { Icon } from "@nxs-atoms";
import { uniqueId } from "@nxs-utils/data/uniqueId";
import type { HybribDataProp } from "nxs-typography";

export type ReverseCountProp = {
  [key: string | number]: "one" | "two" | "three" | "four" | "five" | "six" | "seven" | "eight" | "nine" | "zero";
};
export const reverseCount: ReverseCountProp = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  0: "zero",
};
/**
 * Component Ping Count
 * @param param0 number; set nofication count, must be greater than 0
 * @returns
 */
const PingCount: React.FC<HybribDataProp> = ({ data }) => {
  const stringCount = data.toString().split("");

  const nums = stringCount.map((s) => reverseCount[s]);
  return (
    <span className="ping-count">
      {nums.map((n) => (
        <Icon key={uniqueId()} icon={n} />
      ))}
    </span>
  );
};
export default PingCount;
