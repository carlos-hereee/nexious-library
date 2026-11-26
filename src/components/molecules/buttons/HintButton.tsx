// ── HintButton: an icon toggle that opens a short explanation (disclosure pattern) ──
// For a term a reader may not know, placed right beside it (ItemDetail's hint, a table row label).
// It does not position itself against the viewport or trap focus: it is a plain disclosure, so the
// panel sits in the flow of its container and closes from its own toggle or its close button.
//
// The panel used to render only while a `data` prop was set, and ItemDetail never passed one, so
// every hint toggled aria-expanded and showed nothing. The panel now follows the toggle alone.
import type { HintButtonProps } from "nxs-button";
import { useId, useState } from "react";
import { Button } from "@nxs-atoms/index";
import IconButton from "./IconButton";

const DEFAULT_TOGGLE_LABEL = "show hint";
const DEFAULT_CLOSE_LABEL = "close";
const DEFAULT_PANEL_LABEL = "Hint";

const HintButton = ({
  title,
  body,
  toggleLabel = DEFAULT_TOGGLE_LABEL,
  closeLabel = DEFAULT_CLOSE_LABEL,
  label = DEFAULT_PANEL_LABEL,
}: HintButtonProps) => {
  const [show, setShow] = useState(false);
  // Stable id so the toggle's aria-controls matches the panel across renders.
  const panelId = `hint-${useId()}`;
  return (
    <div className="button-hint-container">
      <IconButton
        icon={{ icon: "hint" }}
        title={toggleLabel}
        aria-label={toggleLabel}
        aria-expanded={show}
        aria-controls={panelId}
        onClick={() => setShow(!show)}
        className="btn-icon"
      />
      {show && (
        <div className="hint-container" id={panelId} role="region" aria-label={title || label}>
          {/* Text, not a heading: a hint beside a table row or a form label must not add an h2 to
              the page outline for every term it explains. */}
          {title && <p className="heading hint-title">{title}</p>}
          <p className="hint-body">{body}</p>
          <Button label={closeLabel} onClick={() => setShow(false)} />
        </div>
      )}
    </div>
  );
};
export default HintButton;
