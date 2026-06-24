import type { ButtonProps } from "nxs-button";
import { useId, useState } from "react";
import { Button } from "@nxs-atoms/index";
import IconButton from "./IconButton";

const HintButton = ({ data, title, body }: ButtonProps) => {
  const [show, setShow] = useState(false);
  // Stable id so the toggle's aria-controls matches the panel across renders.
  const panelId = `hint-${useId()}`;
  return (
    <div className="button-hint-container">
      <IconButton
        icon={{ icon: "hint" }}
        title="show hint"
        aria-label="show hint"
        aria-expanded={show}
        aria-controls={panelId}
        onClick={() => setShow(!show)}
        theme="btn-icon"
      />
      {data && show && (
        <div className="hint-container" id={panelId} role="region" aria-label={title || "Hint"}>
          {title && <h2 className="heading">{title}</h2>}
          <p>{body}</p>
          <Button label="close" onClick={() => setShow(false)} />
        </div>
      )}
    </div>
  );
};
export default HintButton;
