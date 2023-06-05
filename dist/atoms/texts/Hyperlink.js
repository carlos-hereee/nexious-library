import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
var Hyperlink = function (_a) {
    var data = _a.data;
    return (_jsxs("p", { children: [_jsxs("span", { children: [data.responseArr[0], " "] }), data.isLink && (_jsx("a", { href: data.link, className: "link", children: data.word })), _jsx("span", { children: data.responseArr[1] })] }));
};
export default Hyperlink;
//# sourceMappingURL=Hyperlink.js.map