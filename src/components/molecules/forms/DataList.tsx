import { Button, Label } from "@nxs-atoms/index";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { ErrorMessages } from "@nxs-molecules";
import { DataListProps } from "nxs-form";

const DataList: React.FC<DataListProps> = (props) => {
  const { name, value, onChange, hideLabel, label, error, formMessage, list } = props;

  console.log("list :>> ", list);
  return (
    <>
      {!hideLabel && label && (
        <Label name={name} label={label} errors={error} message={formMessage} />
      )}
      <p className="list-selection-value">{value}</p>
      <div className="list-container">
        {list.map((l) => (
          <Button
            label={l.label}
            key={l.uid}
            theme={l.themeId ? l.name : ""}
            onClick={() => onChange(l.value + ",")}
          />
        ))}
      </div>
    </>
  );
};
export default DataList;
