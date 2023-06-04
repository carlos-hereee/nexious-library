const CapFirstChar = ({ data }: { data: string }) => (
  <span>
    {data.charAt(0).toUpperCase()}
    {data.slice(1)}
  </span>
);

export default CapFirstChar;
