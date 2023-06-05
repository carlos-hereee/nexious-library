import ButtonLink from "./ButtonLink";
import { Button, ButtonProps } from "./Button";

export type AtomButtonProps = {
  ButtonLink: ({ data }: { data: string }) => JSX.Element;
  Button: ({ data, name, click }: ButtonProps) => JSX.Element;
};

export const Buttons: AtomButtonProps = { ButtonLink, Button };
