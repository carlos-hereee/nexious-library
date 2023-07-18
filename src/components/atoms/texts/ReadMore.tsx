type ReadMoreProps = {
  data: string;
  uid: string;
};
const ReadMore: React.FC<ReadMoreProps> = (props) => {
  const { data, uid } = props;
  const show = data.split(".");
  const target = show.map((s, idx) => (idx >= 1 ? s : "")).join(".");
  return (
    <div className="read-more-wrapper">
      <input type="checkbox" className="read-more-state" id={uid} />
      <p className="read-more-wrap p-stretch">
        {show[0]}
        <span className="read-more-target">{target}</span>
      </p>
      <label htmlFor={uid} className="read-more-trigger"></label>
    </div>
  );
};

export default ReadMore;
