import { CardFooterProps } from "@nxs-helpers/types";
import { IconButton } from "@nxs-molecules";

type Props = {
  data: CardFooterProps;
};
/**
 * Component - Card Footer
 * @returns
 */
const CardFooter: React.FC<Props> = ({ data }) => {
  return (
    <div className="card-footer">
      {data.data && <p className="card-footer-p">{data.data}</p>}
      {data.buttons &&
        data.buttons.map((b) => (
          <IconButton name={b.icon} data={b} click={click} />
        ))}
    </div>
  );
};
export default CardFooter;
