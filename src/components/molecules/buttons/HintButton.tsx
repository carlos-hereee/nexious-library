import type { ButtonProps } from "nxs-button";
import { useState } from "react";
import { Button } from "@nxs-atoms/index";
import IconButton from "./IconButton";

const HintButton = ({ data, title, body }: ButtonProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="button-hint-container">
      <IconButton icon={{ icon: "hint" }} title="show hint" onClick={() => setShow(!show)} theme="btn-icon" />
      {data && show && (
        <div className="hint-container">
          {title && <h2 className="heading">{title}</h2>}
          <p>{body}</p>
          <Button label="close" onClick={() => setShow(false)} />
        </div>
      )}
    </div>
  );
};
export default HintButton;
