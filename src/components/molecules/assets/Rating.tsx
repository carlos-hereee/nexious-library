import { Icon } from "@nxs-atoms/index";

type RatingProps = {
  star: number;
  click?: (e: any) => void;
};
const Rating: React.FC<RatingProps> = (props) => {
  const { star, click } = props;
  const ratings = [1, 2, 3, 4, 5];
  return (
    <div className="rating">
      <strong>{star} / 5 </strong>{" "}
      {ratings.map((r) => (
        <button
          key={r}
          className="btn-rating"
          type="button"
          onClick={() => click && click(r)}
        >
          <Icon icon="star" name={star < r ? "star" : "star-filled"} />
        </button>
      ))}
    </div>
  );
};
export default Rating;
