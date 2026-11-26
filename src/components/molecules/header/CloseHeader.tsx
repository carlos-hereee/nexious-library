import Button from "@nxs-atoms/buttons/Button";
import { buildNxsButtonClass } from "../../../@types/Variant";

interface CloseHeaderProps {
  onClose: () => void;
}

// An icon only tertiary nxs-btn square (2026-11 item 337); btn-cancel, highlight and ml stay beside
// it until 2026-11 item 339 because the client still styles them.
const CLOSE_CLASS = buildNxsButtonClass({ variant: "tertiary", className: "nxs-btn-icon btn-cancel highlight ml" });

const CloseHeader = ({ onClose }: CloseHeaderProps) => (
  <div className="container-header">
    <Button className={CLOSE_CLASS} aria-label="Close" onClick={onClose}>
      &#10005;
    </Button>
  </div>
);
export default CloseHeader;
