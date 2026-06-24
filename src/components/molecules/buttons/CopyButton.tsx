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
    <>
      <IconButton
        icon={{ icon: isCopy ? "check" : "copy", label: label || "Copy link" }}
        onClick={copyData}
        theme="btn-main"
        aria-label={label || "Copy link"}
      />
      {/* The icon swap (copy → check) is silent to screen readers; this polite live region
          announces the success so non-sighted users know the copy happened. */}
      <span aria-live="polite" className="sr-only">
        {isCopy ? "Copied to clipboard" : ""}
      </span>
    </>
  );
};
export default CopyButton;
