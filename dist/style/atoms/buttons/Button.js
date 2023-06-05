"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button = ({ data, name, click }) => {
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: `btn btn-${name}`, onClick: click, children: (0, jsx_runtime_1.jsx)("span", { children: data }) }));
};
exports.Button = Button;
//# sourceMappingURL=Button.js.map