import { Hero } from "src/atoms";
import { CardButtonProps } from "src/types/interface";

const CardButton: React.FC<CardButtonProps> = ({
  // data,
  click,
  hasHero,
  hero,
}) => {
  return (
    <button type="button" onClick={click} className="btn btn-card">
      {hasHero && <Hero data={hero} />}
    </button>
  );
};

export default CardButton;
