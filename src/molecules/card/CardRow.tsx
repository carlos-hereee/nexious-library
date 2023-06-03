import { useContext } from "react";
import { ServicesContext } from "../../../utils/context/ServicesContext";
import ButtonCancel from "../../atoms/buttons/ButtonCancel";
import ButtonRow from "../buttons/ButtonRow";

const CardRow = ({ data, click }) => {
  const { active } = useContext(ServicesContext);

  return (
    <div
      className={`card-row-wrapper ${data.uid === active?.uid ? "active" : ""}`}
    >
      <ButtonCancel data={data} click={click} />
      <ButtonRow data={data} click={click} />
    </div>
  );
};

export default CardRow;
