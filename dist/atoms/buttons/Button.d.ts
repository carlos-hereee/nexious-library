/// <reference types="react" />
export type ButtonProps = {
    data: any;
    name?: string;
    click?: React.MouseEventHandler<HTMLButtonElement>;
};
declare const Button: ({ data, name, click }: ButtonProps) => JSX.Element;
export { Button };
