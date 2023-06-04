// requirements
import { add } from "./add";
import { subtract } from "./subtract";
import { multiply } from "./multiply";

console.log("mutiply", multiply(2, 5));
console.log("add", add(2, 5));
console.log("add", subtract(2, 5));
// exports
export { multiply, add, subtract };
