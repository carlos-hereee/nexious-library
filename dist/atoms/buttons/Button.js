import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Component - Button
 * @param data content of button component
 * @param name add an optional classname of the button component
 * @param click Callback fired when button is click
 * @returns JSX.Element -> button
 */
var Button = function (_a) {
    var data = _a.data, name = _a.name, click = _a.click;
    return (_jsx("button", { type: "button", className: "btn ".concat(name ? "btn-".concat(name) : ""), onClick: click, children: data }));
};
Button.displayName = "Button";
export default Button;
//# sourceMappingURL=Button.js.map