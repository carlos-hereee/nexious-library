import { Button, Label } from "@nxs-atoms/index";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { ErrorMessages } from "@nxs-molecules";
import { DataListProps } from "nxs-form";
import { capFirstCharacter } from "@nxs-utils/app/text";
import { emojis } from "@nxs-utils/data/emojis";

const DataList: React.FC<DataListProps> = (props) => {
  const { name, value, onChange, hideLabel, label, error, formMessage, list } = props;

  const handleDataChange = (v: string) => {
    // toggle item selection if appropriate
    if (value.includes(v)) {
      // remove value
      const payload = value.split(v).join("");
      onChange(payload);
    } else {
      onChange(value + v);
    }
  };
  return (
    <>
      {!hideLabel && label && (
        <Label name={name} label={label} errors={error} message={formMessage} />
      )}
      <div className="list-container">
        {list.map((l) => (
          <Button
            label={
              value.includes(l.value)
                ? emojis.checkedBox + " " + l.label
                : emojis.emptyCircle + " " + l.label
            }
            key={l.uid}
            theme={l.themeId ? l.name : ""}
            onClick={() => handleDataChange(l.value + ",")}
          />
        ))}
      </div>
      <div>
        <h3 className="heading">{capFirstCharacter(name)} selected list:</h3>
        <p className="list-selection-value">{value}</p>
      </div>
    </>
  );
};
export default DataList;
