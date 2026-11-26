// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/toggle-switch/README.md
// The settings row around a ToggleSwitch, ported from nexious-client's components/form/
// MembersOnlyToggle.tsx (2026-11 item 337, Phase 5). The client named it for its one setting; the
// shape (a label and a help line beside the switch) is generic, so the library calls it ToggleRow
// and the caller passes the members only words.
import { useId } from "react";
import ToggleSwitch from "@nxs-atoms/forms/ToggleSwitch";
import type { ToggleRowProps } from "nxs-form";

/**
 * Component: ToggleRow
 *
 * The label and help text on the left, the switch on the right. The switch is named by the label
 * and described by the help line, so a screen reader hears both. No confirmation step: the choice
 * is reversible.
 */
const ToggleRow = ({ checked, onChange, label, help, disabled, id, className }: ToggleRowProps) => {
  const helpId = useId();
  return (
    <div className={className ? `nxs-toggle-row ${className}` : "nxs-toggle-row"}>
      <div className="nxs-toggle-row-text">
        <span className="nxs-toggle-row-label">{label}</span>
        {help ? (
          <span className="nxs-toggle-row-help" id={helpId}>
            {help}
          </span>
        ) : null}
      </div>
      <ToggleSwitch
        id={id}
        checked={checked}
        onChange={() => onChange(!checked)}
        label={label}
        describedBy={help ? helpId : undefined}
        disabled={disabled}
      />
    </div>
  );
};

export default ToggleRow;
