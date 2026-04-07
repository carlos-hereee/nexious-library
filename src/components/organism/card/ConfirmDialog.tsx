import Button from "@nxs-atoms/buttons/Button";
import Form from "@nxs-template/Form";

interface ConfirmDialogProps {
  onConfirm: () => void;
  onCancel?: () => void;
  securityLevel?: "low" | "high";
  heading?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  matchLabel?: string;
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    onConfirm,
    onCancel,
    securityLevel = "low",
    heading = "Are you sure?",
    message = "This action cannot be undone.",
    confirmLabel = "Confirm",
    cancelLabel = "Go back",
    matchLabel = 'Type "CONFIRM" to proceed',
  } = props;

  const handleConfirm = (data: { confirm: string }) => {
    if (data.confirm === "CONFIRM") onConfirm();
  };

  return (
    <div className="primary-container">
      <h2 className="heading w-max text-center">{heading}</h2>
      <p className="text-center">{message}</p>
      {securityLevel === "high" && (
        <Form
          formId="confirm-dialog"
          initialValues={{ confirm: "" }}
          labels={{ confirm: matchLabel }}
          schema={{ required: ["confirm"], match: [{ name: "confirm", value: "CONFIRM" }] }}
          submitLabel={confirmLabel}
          onSubmit={(data: { confirm: string }) => handleConfirm(data)}
        />
      )}
      {securityLevel === "low" && (
        <>
          {onCancel && <Button theme="btn-main highlight" label={cancelLabel} onClick={onCancel} />}
          <Button theme="btn-main btn-danger highlight" label={confirmLabel} onClick={onConfirm} />
        </>
      )}
    </div>
  );
};
export default ConfirmDialog;
