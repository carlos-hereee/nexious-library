// import Icons from "../../molecules/icons/Icons";

const ToggleData = ({ isOpen, open }) => {
  return isOpen ? (
    <span>
      Close <Icons name="x" />
    </span>
  ) : (
    <span>{open}</span>
  );
};
export default ToggleData;
