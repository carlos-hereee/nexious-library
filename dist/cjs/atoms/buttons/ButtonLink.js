"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const ButtonLink = ({ data }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "btn btn-link", onClick: () => navigate(`/${data}`), children: (0, jsx_runtime_1.jsxs)("span", { children: [" Head to ", data] }) }));
};
exports.default = ButtonLink;
//# sourceMappingURL=ButtonLink.js.map