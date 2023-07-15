import { Icon } from "@nxs-atoms/index";

type RatingProps = {
  star: number;
};
const Rating: React.FC<RatingProps> = (props) => {
  const { star } = props;
  const ratings = [1, 2, 3, 4, 5];
  return (
    <div className="rating">
      <strong>{star} / 5 </strong>{" "}
      {ratings.map((r) => (
        <Icon icon="star" name={star < r ? "star" : "star-filled"} key={r} />
      ))}
    </div>
  );
};
export default Rating;
