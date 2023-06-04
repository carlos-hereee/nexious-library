// requirements
import { add } from "./add";
import { subtract } from "./subtract";
import { multiply } from "./multiply";

type mathProps = {
  multiply: (num1: number, num2: number) => number;
  subtract: (num1: number, num2: number) => number;
  add: (num1: number, num2: number) => number;
};
/**
 * Combine all as Math
 */
const math: mathProps = { multiply, add, subtract };
export default math;
