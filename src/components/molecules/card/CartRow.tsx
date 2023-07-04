type CartRowProps = {
  data: any;
  setCancel: (a: any) => void;
};
const CartRow: React.FC<CartRowProps> = (props) => {
  const { data, setCancel } = props;
  return (
    <div className="card-row">
      <button>cancel</button>
      <button>
        <p>card header</p>
        <p>card readmore</p>
        <p>cost</p>
      </button>
    </div>
  );
};
export default CartRow;
