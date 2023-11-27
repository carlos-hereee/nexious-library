import { Button } from "@nxs-atoms";
import { makeStrReadable } from "@nxs-utils/data/text";
import { IconButton } from "@nxs-molecules";
import type { FormNavigationProps } from "nxs-navigation";

const FormNavigation: React.FC<FormNavigationProps> = (props) => {
  const { formOrder, pageNumber, onClick, heading } = props;

  if (!formOrder) return <div />;

  return (
    <div className="container">
      {heading && <h3 className="heading">{heading}</h3>}
      <div className="navigation-container hide-on-mobile">
        {formOrder.map((name, idx) => {
          const formName = makeStrReadable(name);
          return (
            <Button
              key={formName}
              label={formName}
              onClick={() => onClick(idx)}
              title={formName}
              isDisable={idx === pageNumber}
              theme={idx === pageNumber ? "btn-selected" : ""}
            />
          );
        })}
      </div>
      <div className="mini-navigation-container">
        {formOrder.map((name, idx) => {
          const formName = makeStrReadable(name);
          return (
            <IconButton
              key={formName}
              title={formName}
              isDisable={idx === pageNumber}
              onClick={() => onClick(idx)}
              icon={{ icon: idx === pageNumber ? "dot" : "uncheck" }}
              theme="btn-icon"
            />
          );
        })}
      </div>
    </div>
  );
};
export default FormNavigation;
