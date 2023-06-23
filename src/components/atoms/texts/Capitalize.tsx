type DataString = {
  data: string;
};
/**
 * Component - Capitalize
 * @param data string; capitalize the first letter on the string
 * @returns span; capitalized
 */
const Capitalize: React.FC<DataString> = ({ data }) => {
  return (
    <span>
      {data.charAt(0).toUpperCase()}
      {data.slice(1)}{" "}
    </span>
  );
};

export default Capitalize;
