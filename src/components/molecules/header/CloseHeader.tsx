import Button from "@nxs-atoms/buttons/Button";

interface CloseHeaderProps {
  onClose: () => void;
}

// An icon only tertiary nxs-btn square (2026-11 item 337); btn-cancel, highlight and ml stay beside
// it until 2026-11 item 339 because the client still styles them.
const CloseHeader = ({ onClose }: CloseHeaderProps) => (
  <div className="container-header">
    <Button variant="tertiary" className="nxs-btn-icon btn-cancel highlight ml" aria-label="Close" onClick={onClose}>
      &#10005;
    </Button>
  </div>
);
export default CloseHeader;
