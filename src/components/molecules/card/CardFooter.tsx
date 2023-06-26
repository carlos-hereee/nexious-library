import { CardFooterProps } from "@nxs-helpers/types";
import { IconButton } from "@nxs-molecules";

type Props = {
  data: CardFooterProps;
};
/**
 * Component - Card Footer
 * @param data.data string; display content on page
 * @param data.buttons string[]; display any number of buttons
 * @returns
 */
const CardFooter: React.FC<Props> = ({ data }) => {
  return (
    <div className="card-footer">
      {data.data && <p className="card-footer-p">{data.data}</p>}
      {data.buttons &&
        data.buttons.map((b) => (
          <IconButton icon={b} click={data.click} key={b.uid} />
        ))}
    </div>
  );
};
export default CardFooter;
