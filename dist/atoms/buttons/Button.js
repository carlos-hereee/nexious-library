import { jsx as _jsx } from "react/jsx-runtime";
const Button = ({ data, name, click }) => {
    return (_jsx("button", { type: "button", className: `btn ${name ? `btn-${name}` : ""}`, onClick: click, children: data }));
};
export { Button };
//# sourceMappingURL=Button.js.map