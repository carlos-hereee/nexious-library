const Cost: React.FC<{ data: number }> = ({ data }) => (
  <p className="cost">
    <strong>Cost: ${data}</strong>
  </p>
);
export default Cost;
