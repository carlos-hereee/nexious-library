/// <reference types="react" />
export type ButtonProps = {
    data: string;
    name?: string;
    click?: React.MouseEventHandler<HTMLButtonElement>;
};
declare const Button: ({ data, name, click }: ButtonProps) => JSX.Element;
export { Button };
