const Cost: React.FC<{ data: number }> = ({ data }) => (
  <div>
    <p className="cost">
      <strong>Cost: ${data}</strong>
    </p>
  </div>
);
export default Cost;
