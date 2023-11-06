import { Button, Label } from "@nxs-atoms/index";
import { DataListProps } from "nxs-form";
import { capFirstCharacter } from "@nxs-utils/app/text";
import { emojis } from "@nxs-utils/data/emojis";

const DataList: React.FC<DataListProps> = (props) => {
  const { name, value, onChange, hideLabel, label, error, formMessage, list } = props;

  const selectList = (value && value.split(",")) || [];

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
            title={value.includes(l.value) ? "remove " + l.value : "add" + l.value}
          />
        ))}
      </div>
      {value && (
        <div>
          <p>{capFirstCharacter(name)} selected list:</p>
          <div className="list-selection-value">
            {selectList.map(
              (v) =>
                v && (
                  <Button
                    key={v}
                    title={"remove " + v}
                    label={"X " + v}
                    onClick={() => handleDataChange(v + ",")}
                  />
                )
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default DataList;
