export type ButtonProps = {
  data: string;
  // data: any;
  name?: string;
  click?: React.MouseEventHandler<HTMLButtonElement>;
};
const Button = ({ data, name, click }: ButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className={`btn ${name ? `btn-${name}` : ""}`}
      onClick={click}
    >
      {data}
    </button>
  );
};

export { Button };
