const Heading = ({ data }: { data: string }) => {
  return (
    <div className="heading-container">
      <h3 className="heading">{data.toUpperCase()}</h3>
    </div>
  );
};

export default Heading;
