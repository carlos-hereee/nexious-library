import { IconButton } from "@nxs-molecules";
import { CTOProps } from "@nxs-utils/helpers/types";

type Props = {
  data: CTOProps[];
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
  console.log("data", data);
  return (
    <div className="flex-center">
      {data &&
        data.map((b) => <IconButton icon={b} click={click} key={b.uid} />)}
    </div>
  );
};
export default CardFooter;
