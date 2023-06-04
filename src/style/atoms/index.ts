import { Buttons, AtomButtonProps } from "./buttons";
import { IconDataProps, Icon } from "./icon";
import Texts from "./texts";

type AtomProps = {
  Buttons: AtomButtonProps;
  Icon: IconDataProps;
};

export const Atom: AtomProps = { Buttons, Icon, Texts };
// export { Buttons, Icons, Texts };
