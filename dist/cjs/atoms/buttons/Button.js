"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
/**
 * Component - Button
 * @param data content of button component
 * @param name add an optional classname of the button component
 * @param click Callback fired when button is click
 * @returns JSX.Element -> button
 */
var Button = function (_a) {
    var data = _a.data, name = _a.name, click = _a.click;
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "btn ".concat(name ? "btn-".concat(name) : ""), onClick: click, children: data }));
};
Button.displayName = "Button";
exports.default = Button;
//# sourceMappingURL=Button.js.map