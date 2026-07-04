import { Button, Label } from "@nxs-atoms/index";
import type { DataListProps } from "nxs-form";
import { capFirstCharacter } from "@nxs-utils/data/text";
import { emojis } from "@nxs-utils/data/emojis";

const DataList = (props: DataListProps) => {
  const { name, value, onChange, hideLabel, label, error, formMessage, list, isDisabled, hideList } = props;

  // Selection is persisted as a comma-joined string on the form value. Parse it into an
  // exact-token array so membership and removal compare whole values, never substrings.
  // The previous model used value.includes(v) and value.split(v).join(""), so a value like
  // "category" false-matched the item "cat" (wrong checked state) and removing one token
  // mangled unrelated entries that shared a substring. The wire format (trailing comma) is
  // preserved so the form state contract is unchanged.
  const selected = (value ? value.split(",") : []).filter(Boolean);
  const isSelected = (entry: string) => selected.includes(entry);

  const handleToggle = (entry: string) => {
    const next = isSelected(entry) ? selected.filter((token) => token !== entry) : [...selected, entry];
    onChange(next.length ? `${next.join(",")},` : "");
  };
  return (
    <>
      {!hideLabel && label && <Label name={name} label={label} error={error} message={formMessage} />}
      <div className="list-container">
        {list.map((l) => (
          <Button
            label={isSelected(l.value) ? `${emojis.checkedBox} ${l.label}` : `${emojis.emptyCircle} ${l.label}`}
            key={l.uid}
            isDisable={isDisabled}
            theme={l.themeId ? l.name : ""}
            onClick={() => handleToggle(l.value)}
            title={isSelected(l.value) ? `remove ${l.value}` : `add ${l.value}`}
          />
        ))}
      </div>
      {!hideList && value && (
        <div>
          <p>{capFirstCharacter(name)} selected list:</p>
          <div className="list-selection-value">
            {selected.map((entry) => (
              <Button
                key={entry}
                title={`remove ${entry}`}
                label={`X ${entry}`}
                onClick={() => handleToggle(entry)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default DataList;
