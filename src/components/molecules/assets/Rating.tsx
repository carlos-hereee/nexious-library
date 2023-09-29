import { Icon } from "@nxs-atoms";
import { RatingProps } from "nxs-assets-medias";

const Rating: React.FC<RatingProps> = (props) => {
  const { star, onClick } = props;
  const ratings = [1, 2, 3, 4, 5];
  return (
    <div className="rating">
      <strong>{star} / 5 </strong>{" "}
      {ratings.map((r) => (
        <button
          key={r}
          className="btn-rating"
          type="button"
          onClick={() => onClick && onClick(r)}
        >
          <Icon icon="star" name={star < r ? "star" : "star-filled"} />
        </button>
      ))}
    </div>
  );
};
export default Rating;
