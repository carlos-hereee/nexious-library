import { jsx as _jsx } from "react/jsx-runtime";
var Button = function (_a) {
    var data = _a.data, name = _a.name, click = _a.click;
    return (_jsx("button", { type: "button", className: "btn ".concat(name ? "btn-".concat(name) : ""), onClick: click, children: data }));
};
export { Button };
//# sourceMappingURL=Button.js.map