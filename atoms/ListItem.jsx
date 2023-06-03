import Icons from "./Icons";

const ListItem = ({ data, click, icon }) => {
  return (
    <button
      type="button"
      className="btn list-item"
      data-state={icon}
      onClick={() => click(data)}>
      {icon && <Icons name={icon} />}
      {/* {data.time.startTime} - {data.time.endTime} */}
      {data}
    </button>
  );
};

export default ListItem;
