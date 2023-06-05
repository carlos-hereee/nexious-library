"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var Assets_1 = require("./Assets");
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
    return ((0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: (0, Assets_1.getDefinition)(name), size: size, className: "icon", spin: spin === "spin", pulse: spin === "pulse", color: color }));
};
Icon.displayName = "Icon";
exports.default = Icon;
//# sourceMappingURL=Icon.js.map