import { Button } from "@nxs-atoms";
import { makeStrReadable } from "@nxs-utils/app/text";
import { FormNavigationProps } from "nxs-navigation";

const FormNavigation: React.FC<FormNavigationProps> = (props) => {
  const { formOrder, pageNumber, onClick, heading } = props;
  const total = formOrder.length - 1;
  return (
    <div className="container">
      {heading && <h3 className="heading">{heading}</h3>}
      <div className="flex-row">
        {formOrder.map((name, idx) => {
          const formName = makeStrReadable(name);
          let isDisable = false;
          if (idx === 0 && pageNumber === 0) isDisable = true;
          if (idx === total - 1 && pageNumber === total - 1) isDisable = true;
          return (
            <Button
              key={name}
              label={formName}
              onClick={() => onClick(idx)}
              title={formName}
              isDisable={isDisable}
            />
          );
        })}
      </div>
    </div>
  );
};
export default FormNavigation;
