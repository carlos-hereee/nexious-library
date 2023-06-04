const Heading = ({ data }) => {
  return (
    <div className="heading-container">
      {data.title && <h3 className="heading">{data.title.toUpperCase()}</h3>}
    </div>
  );
};

export default Heading;
