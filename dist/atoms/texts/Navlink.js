import { jsx as _jsx } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const Navlink = ({ data }) => {
    return (_jsx(Link, { to: `/${data}`, className: "link", children: data }));
};
export default Navlink;
//# sourceMappingURL=Navlink.js.map