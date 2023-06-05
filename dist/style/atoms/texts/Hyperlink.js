"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hyperlink = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const Hyperlink = ({ data }) => {
    return ((0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsxs)("span", { children: [data.responseArr[0], " "] }), data.isLink ? ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: data.link, className: "link", children: data.word })) : ((0, jsx_runtime_1.jsx)("a", { href: data.link, className: "link", children: data.word })), (0, jsx_runtime_1.jsx)("span", { children: data.responseArr[1] })] }));
};
exports.Hyperlink = Hyperlink;
//# sourceMappingURL=Hyperlink.js.map