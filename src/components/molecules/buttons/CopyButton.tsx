import { IconButton } from "@nxs-molecules/index";
import type { CopyToClipboardProps } from "nxs-button";
import { useEffect, useState } from "react";

const CopyButton = ({ data, label }: CopyToClipboardProps) => {
  const [isCopy, setCopy] = useState(false);

  useEffect(() => {
    if (!isCopy) return undefined;
    // Clear the timer on unmount so the component never calls setCopy on an unmounted node.
    const id = setTimeout(() => setCopy(false), 2300);
    return () => clearTimeout(id);
  }, [isCopy]);

  const copyData = async () => {
    // navigator.clipboard is undefined on insecure (non-HTTPS) origins and the write can
    // reject when blocked. Only flip to the success state (which drives the aria-live
    // "Copied to clipboard" announcement) when the write actually resolves, so screen
    // readers are never told a copy succeeded that did not.
    if (!navigator.clipboard) {
      console.error("CopyButton: clipboard API unavailable (insecure origin?)");
      return;
    }
    try {
      await navigator.clipboard.writeText(data);
      setCopy(true);
    } catch {
      console.error("CopyButton: clipboard write was blocked or failed");
    }
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
