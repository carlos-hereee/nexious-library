/// <reference types="react" />
export type ButtonProps = {
    data: string;
    name?: string;
    click?: React.MouseEventHandler<HTMLButtonElement>;
};
/**
 * Component - Button
 * @param data manually add content
 * @param name manually add an optional classname of the button component
 * @param click Callback fired when button is click
 * @returns JSX.Element
 */
declare const Button: {
    ({ data, name, click }: ButtonProps): JSX.Element;
    displayName: string;
};
export default Button;
