export type ButtonProps = {
  data: string;
  name?: string;
  click: React.MouseEventHandler<HTMLButtonElement>;
};
export const Button = ({ data, name, click }: ButtonProps): JSX.Element => {
  return (
    <button type="button" className={`btn btn-${name}`} onClick={click}>
      <span>{data}</span>
    </button>
  );
};
