import { Button, ButtonProps } from "./Button";

export type AtomButtonProps = {
  Button: ({ data, name, click }: ButtonProps) => JSX.Element;
};

export const Buttons: AtomButtonProps = { Button };
