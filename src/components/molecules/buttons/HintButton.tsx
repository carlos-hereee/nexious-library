import type { ButtonProps } from "nxs-button";
import { useState } from "react";
import { Button } from "@nxs-atoms/index";
import IconButton from "./IconButton";

const HintButton = ({ data }: ButtonProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="button-hint-container">
      <IconButton icon={{ icon: "hint" }} title="show hint" onClick={() => setShow(!show)} theme="btn-icon" />
      {data && show && (
        <div className="hint-container">
          <h2 className="heading">{data.heading}</h2>
          <p>{data.body}</p>
          <Button label="close" onClick={() => setShow(false)} />
        </div>
      )}
    </div>
  );
};
export default HintButton;
