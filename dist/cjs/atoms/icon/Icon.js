"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icons = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const Assets_1 = require("./Assets");
const Icons = ({ name, size, spin, color }) => {
    return ((0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: (0, Assets_1.getDefinition)(name), size: size, className: "icon", spin: spin === "spin", pulse: spin === "pulse", color: color }));
};
exports.Icons = Icons;
//# sourceMappingURL=Icon.js.map