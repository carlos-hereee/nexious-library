import Hero from "../../atoms/assets/Hero";

const ButtonCardItem = ({ data, click }) => {
  return (
    <button className="btn card-item" onClick={click}>
      <h2>{data.name.toUpperCase()}</h2>
      {data.link && <Hero data={data} />}
    </button>
  );
};

export default ButtonCardItem;
