import { IconButton } from "@nxs-molecules/index";
import type { CopyToClipboardProps } from "nxs-button";
import { useEffect, useState } from "react";

const CopyButton = ({ data, label }: CopyToClipboardProps) => {
  const [isCopy, setCopy] = useState(false);

  useEffect(() => {
    if (isCopy) setTimeout(() => setCopy(false), 2300);
  }, [isCopy]);

  const copyData = () => {
    navigator.clipboard.writeText(data);
    setCopy(true);
  };
  return (
    <IconButton
      icon={{ icon: isCopy ? "check" : "copy", label: label || "Copy link" }}
      onClick={copyData}
      theme="btn-main"
    />
  );
};
export default CopyButton;
