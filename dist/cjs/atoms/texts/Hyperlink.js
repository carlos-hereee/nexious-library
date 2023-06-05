"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Hyperlink = function (_a) {
    var data = _a.data;
    return ((0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsxs)("span", { children: [data.responseArr[0], " "] }), data.isLink && ((0, jsx_runtime_1.jsx)("a", { href: data.link, className: "link", children: data.word })), (0, jsx_runtime_1.jsx)("span", { children: data.responseArr[1] })] }));
};
exports.default = Hyperlink;
//# sourceMappingURL=Hyperlink.js.map