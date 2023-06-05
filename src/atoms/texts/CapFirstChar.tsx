const CapFirstChar = ({ data }: { data: string }): JSX.Element => (
  <span>
    {data.charAt(0).toUpperCase()}
    {data.slice(1)}
  </span>
);

export default CapFirstChar;
