type ReadMoreProps = {
  data: string;
};
const ReadMore: React.FC<ReadMoreProps> = ({ data }) => {
  const show = data.split(".");
  const target = show.map((s, idx) => (idx >= 1 ? s : "")).join(".");
  return (
    <div>
      <input type="checkbox" className="read-more-state" id="post" />
      <p className="read-more-wrap">
        {show[0]}
        <span className="read-more-target">{target}</span>
      </p>
      <label htmlFor="post" className="read-more-trigger"></label>
    </div>
  );
};

export default ReadMore;
