const CapFirstChar = ({ str }) => (
  <span>
    {str.charAt(0).toUpperCase()}
    {str.slice(1)}
  </span>
);

export default CapFirstChar;
