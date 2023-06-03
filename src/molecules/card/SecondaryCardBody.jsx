import Icons from "../../icons/Icons";

const SecondaryCardBody = ({ data, click }) => {
  return (
    <button
      type="button"
      className="third-btn"
      data-state={!data.isOpen && "booked"}
      onClick={() => click(data)}>
      {data.isOpen ? <Icons name="uncheck" /> : <Icons name="check" />}
      <span>{data.response}</span>
      {!data.isOpen && <strong>BOOKED</strong>}
    </button>
  );
};

export default SecondaryCardBody;
