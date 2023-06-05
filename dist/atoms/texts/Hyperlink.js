import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Link } from "react-router-dom";
export const Hyperlink = ({ data }) => {
    return (_jsxs("p", { children: [_jsxs("span", { children: [data.responseArr[0], " "] }), data.isLink ? (_jsx(Link, { to: data.link, className: "link", children: data.word })) : (_jsx("a", { href: data.link, className: "link", children: data.word })), _jsx("span", { children: data.responseArr[1] })] }));
};
//# sourceMappingURL=Hyperlink.js.map