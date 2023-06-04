const ToggleOpen = ({ data, click }) => {
  return (
    <button type="button" className="btn btn-step" onClick={click}>
      {data}
    </button>
  );
};
export default ToggleOpen;
