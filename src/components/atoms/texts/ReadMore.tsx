import type { ReadMoreProps } from "nxs-typography";

const ReadMore: React.FC<ReadMoreProps> = ({ data, uid }) => {
  const show = data.split(".");
  const target = show.map((s, idx) => (idx >= 1 ? s : "")).join(".");
  return (
    <div className="read-more-wrapper">
      <p className="read-more-wrap">
        {show[0]}
        <span className="read-more-target">{target}</span>
      </p>
      {uid && (
        <label htmlFor={uid} className="read-more-trigger">
          <input type="checkbox" hidden id={uid} />
        </label>
      )}
    </div>
  );
};

export default ReadMore;
