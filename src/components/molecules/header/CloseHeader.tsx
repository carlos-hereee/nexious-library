import Button from "@nxs-atoms/buttons/Button";

interface CloseHeaderProps {
  onClose: () => void;
}

const CloseHeader = ({ onClose }: CloseHeaderProps) => (
  <div className="container-header">
    <Button theme="btn-cancel highlight ml" aria-label="Close" onClick={onClose}>
      &#10005;
    </Button>
  </div>
);
export default CloseHeader;
