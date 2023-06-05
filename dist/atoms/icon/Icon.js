import { jsx as _jsx } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDefinition } from "./Assets";
/**
 * Component - Icon
 * @param name specify icon name
 * @param size optional specify size for icon
 * @param spin optional specify if icon should spin
 * @param color optional specify the color for icon
 * @returns JSX.Element
 */
var Icon = function (_a) {
    var name = _a.name, size = _a.size, spin = _a.spin, color = _a.color;
    return (_jsx(FontAwesomeIcon, { icon: getDefinition(name), size: size, className: "icon", spin: spin === "spin", pulse: spin === "pulse", color: color }));
};
Icon.displayName = "Icon";
export default Icon;
//# sourceMappingURL=Icon.js.map