/// <reference types="react" />
export type ButtonProps = {
    data: string;
    name?: string;
    click: React.MouseEventHandler<HTMLButtonElement>;
};
export declare const Button: ({ data, name, click }: ButtonProps) => JSX.Element;
