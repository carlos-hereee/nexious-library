import { Icon } from "@nxs-atoms";

type PingCountProp = {
  count: number;
};
type reverseCountProp = {
  [key: string | number]:
    | "one"
    | "two"
    | "three"
    | "four"
    | "five"
    | "six"
    | "seven"
    | "eight"
    | "nine"
    | "zero";
};
const PingCount: React.FC<PingCountProp> = ({ count }) => {
  const stringCount = count.toString().split("");
  const reverseCount: reverseCountProp = {
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
  const nums = stringCount.map((s) => reverseCount[s]);
  return (
    <span className="ping-count">
      {nums.map((n) => (
        <Icon key={n} name={n} />
      ))}
    </span>
  );
};
export default PingCount;
