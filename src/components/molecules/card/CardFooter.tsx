import { IconButton } from "@nxs-molecules";
import { CardFooterProps } from "nxs-card-footer";

const CardFooter: React.FC<CardFooterProps> = (props) => {
  const { cta, onClick } = props;
  return (
    <div className="flex-center">
      {cta &&
        cta.map((b) => (
          <IconButton icon={b} theme="btn-cta" onClick={onClick} key={b.uid} />
        ))}
    </div>
  );
};
export default CardFooter;
