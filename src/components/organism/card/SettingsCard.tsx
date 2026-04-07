import { useState } from "react";
import Button from "@nxs-atoms/buttons/Button";
import SettingsCardHeader from "@nxs-molecules/card/SettingsCardHeader";

interface SettingsCardProps {
  title: string;
  active?: string;
  list?: { name: string; data: string | number }[];
  children?: React.ReactNode;
  labels?: { [key: string]: string };
  onViewClick?: () => void;
  onAddClick?: () => void;
  onEditClick?: () => void;
  onEditClick2?: () => void;
  onRemoveClick?: () => void;
}

const SettingsCard = (props: SettingsCardProps) => {
  const { active, title, onAddClick, onViewClick, onRemoveClick, onEditClick, onEditClick2, list, children, labels } =
    props;
  const [activeCard, setActive] = useState<string>(active || "");

  if (!activeCard) return <SettingsCardHeader title={title} onClick={setActive} active={activeCard} />;

  const hasButtons: boolean = !!onViewClick || !!onRemoveClick || !!onAddClick || !!onEditClick || !!onEditClick2;

  return (
    <div className="settings-card">
      <SettingsCardHeader title={title} onClick={setActive} active={activeCard} />
      {list && (
        <div className="settings-card-list">
          {list.map((l) => (
            <div key={l.name}>
              <p>
                <strong>{l.name}: </strong>
                {l.data}
              </p>
            </div>
          ))}
        </div>
      )}
      {children}
      {hasButtons && (
        <div className="btn-container">
          {onViewClick && <Button label={labels?.onViewClick || `View ${title}`} onClick={onViewClick} />}
          {onAddClick && <Button label={labels?.onAddClick || `Add ${title}`} onClick={onAddClick} />}
          {onEditClick && <Button label={labels?.onEditClick || `Edit ${title}`} onClick={onEditClick} />}
          {onEditClick2 && <Button label={labels?.onEditClick2 || `Edit ${title}`} onClick={onEditClick2} />}
          {onRemoveClick && (
            <Button
              label={labels?.onRemoveClick || `Delete ${title}`}
              onClick={onRemoveClick}
              theme="btn-full required highlight"
            />
          )}
        </div>
      )}
    </div>
  );
};
export default SettingsCard;
