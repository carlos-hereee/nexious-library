import { jsx as _jsx } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDefinition } from "./Assets";
export var Icons = function (_a) {
    var name = _a.name, size = _a.size, spin = _a.spin, color = _a.color;
    return (_jsx(FontAwesomeIcon, { icon: getDefinition(name), size: size, className: "icon", spin: spin === "spin", pulse: spin === "pulse", color: color }));
};
//# sourceMappingURL=Icon.js.map