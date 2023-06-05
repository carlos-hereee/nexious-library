"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const Navlink = ({ data }) => {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/${data}`, className: "link", children: data }));
};
exports.default = Navlink;
//# sourceMappingURL=Navlink.js.map