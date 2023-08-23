import { CardFooterProps } from "@nxs-utils/helpers/types";
import { IconButton } from "@nxs-molecules";

type Props = {
  data: CardFooterProps;
  click?: React.MouseEventHandler<HTMLButtonElement>;
};
/**
 * Component - Card Footer
 * @param data.data string; display content on page
 * @param data.buttons string[]; display any number of buttons
 * @returns
 */
const CardFooter: React.FC<Props> = (props) => {
  const { data, click } = props;
  return (
    <div className="card-footer">
      {data.body && <p className="card-footer-p">{data.body}</p>}
      <div className="flex-center">
        {data.cta &&
          data.cta.map((b) => (
            <IconButton
              icon={{ ...b, name: "cta" }}
              click={click}
              key={b.uid}
            />
          ))}
      </div>
    </div>
  );
};
export default CardFooter;
