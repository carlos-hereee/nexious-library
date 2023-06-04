import VehicleHeading from "../vehicle/VehicleHeading";

const CardButton = ({ data, click }) => {
  return (
    <button type="button" onClick={() => click(data)} className="card">
      <img
        className="vehicle-card-hero"
        src={data.photos[0].src}
        alt={`${data.make} ${data.model}`}
      />
      <VehicleHeading data={data} />
    </button>
  );
};

export default CardButton;
