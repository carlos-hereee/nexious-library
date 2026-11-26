// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/toggle-switch/README.md
// The accessible on and off switch, ported from nexious-client's features/user/components/
// ToggleSwitch.tsx and its cu-switch block (dashboard.css) (2026-11 item 337, Phase 5).
import type { ToggleSwitchProps } from "nxs-form";

/**
 * Component: ToggleSwitch
 *
 * A native button with role="switch" rather than a styled checkbox: role switch with aria-checked
 * is what makes a screen reader say "on" and "off" for a setting that applies at once, and a native
 * button brings Space and Enter activation and focus for free, so there is no key handler to get
 * wrong. The track and knob are spans, so the knob can move on its own and stop under reduced
 * motion.
 */
const ToggleSwitch = ({ checked, onChange, label, disabled, describedBy, id, className }: ToggleSwitchProps) => {
  const stateClass = checked ? "nxs-switch nxs-switch-on" : "nxs-switch nxs-switch-off";
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      aria-describedby={describedBy}
      disabled={disabled}
      onClick={() => onChange()}
      className={className ? `${stateClass} ${className}` : stateClass}
    >
      <span className="nxs-switch-track" aria-hidden="true">
        <span className="nxs-switch-knob" />
      </span>
    </button>
  );
};

export default ToggleSwitch;
