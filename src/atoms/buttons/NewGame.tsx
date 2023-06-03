import Icons from "../icons/Icons";

const NewGame = ({ click }) => {
  return (
    <button type="button" className="btn btn-main" onClick={click}>
      <Icons name="games" />
      <span> New Game</span>
    </button>
  );
};

export default NewGame;
