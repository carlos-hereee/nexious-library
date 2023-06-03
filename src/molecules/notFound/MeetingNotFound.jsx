import { useContext } from "react";
import { ServicesContext } from "../../../utils/context/ServicesContext";
import Icons from "../../icons/Icons";

const NotFound = () => {
  const { active } = useContext(ServicesContext);
  return (
    <div className="container-empty">
      {active.uid ? (
        <p>
          Please select a day and time to book{" "}
          <strong>
            {active.title} {active.subtitle}
          </strong>
        </p>
      ) : (
        <p>Please select the service you would like to book</p>
      )}
      {active.uid ? (
        <Icons name="top" size="3x" />
      ) : (
        <Icons name="left" size="3x" />
      )}
    </div>
  );
};
export default NotFound;
