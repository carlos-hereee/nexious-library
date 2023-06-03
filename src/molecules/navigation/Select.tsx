import React from "react";

const Select = ({ value, change, children }) => {
  return (
    <select
      className={`dropdown-input ${value}`}
      value={value}
      onChange={(e) => change(e.target.value, value)}
    >
      <option value={value} className="dropdown-item" disabled>
        {value
          .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
          .split(" ")
          .map((str) => str.charAt(0).toLocaleUpperCase() + str.substring(1))
          .join(" ")}
      </option>
      {children}
    </select>
  );
};

export default Select;
