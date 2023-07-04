type ReadMoreProps = {
  data: string;
};
const ReadMore: React.FC<ReadMoreProps> = ({ data }) => {
  // if (lines > 2) {
  //   const element = document.querySelector(".read-more");
  //   element && element?.style.setProperty("--max-lines", lines);
  // }
  return (
    <div className="read-more-wrapper">
      <p className="read-more">{data}</p>
      <input type="checkbox" className="read-more-toggle" />
    </div>
  );
};

export default ReadMore;
