// An image picker built on a hidden native file input. By default it draws its own choose button,
// remove buttons and preview, and echoes `value` through `onSelect`; with `renderTrigger` the
// consumer's element (the image itself) opens the picker and the consumer draws the preview.
// It does not upload anything: the File goes back through `onSelect`. Called by the Form's file
// field (fieldRegistry renderFile) and directly by consumers through `@nxs-molecules`.
import { Button, Label } from "@nxs-atoms/index";
import { useEffect, useRef, useState } from "react";
import { Hero } from "@nxs-molecules";
import type { UploadFileProps } from "nxs-form";
import { urlFile } from "@nxs-utils/data/urlFile";
import { useFieldDomId } from "@nxs-utils/hooks/useFieldDomId";
import { buildNxsButtonClass } from "../../../@types/Variant";

// The English words, used where a consumer passes none of its own (2026-11 item 410).
const SELECT_LABEL = "Choose a file";
const REMOVE_LABEL = "Remove File";
const PREVIEW_LABEL = "Image Preview";

const UploadFile: React.FC<UploadFileProps> = (props) => {
  const { label, hideLabels, onSelect, className, value, formMessage, input, error, renderTrigger } = props;
  const { selectLabel = SELECT_LABEL, removeLabel = REMOVE_LABEL, previewLabel = PREVIEW_LABEL } = props;
  const { name, isDisabled } = input;
  const domId = useFieldDomId(name);
  const hasCustomTrigger = Boolean(renderTrigger);
  // required props
  const [previewImage, setPreviewImage] = useState<string>("");
  const imageUploaderRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const formatImageData = (file: File | string) => {
    if (file) {
      const url = typeof file === "string" ? file : urlFile(file);
      setPreviewImage(url);
      onSelect(file);
    } else {
      setPreviewImage("");
      onSelect("");
    }
  };
  useEffect(() => {
    // A custom trigger draws its own preview, so echoing `value` back here would hand the consumer
    // a change nobody made (an in place editor would record an undo step for merely opening) and
    // would mint an object URL nothing revokes.
    if (hasCustomTrigger) return;
    formatImageData(value);
  }, [value]);

  const imageClick = () => {
    // Trigger the click event of the file input
    if (imageUploaderRef.current) imageUploaderRef.current.click();
  };

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) formatImageData(selectedFile);
  };

  const handleRemoveImage = () => {
    formatImageData("");
    if (imageUploaderRef.current) imageUploaderRef.current.value = "";
  };

  const openPicker = () => {
    if (isDisabled) return;
    imageUploaderRef.current?.click();
  };

  const pickForCustomTrigger = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pickedFile = event.target.files?.[0];
    // The consumer removes an image from its own draft, which this input never hears about, so
    // without the reset picking that same file again would fire no change event at all.
    event.target.value = "";
    if (pickedFile) onSelect(pickedFile);
  };

  if (renderTrigger) {
    // No `name` on purpose: the File reaches the consumer only through onSelect, and a named but
    // cleared input inside an enclosing <form> would add an empty file entry to its FormData.
    return (
      <>
        <input
          type="file"
          onChange={pickForCustomTrigger}
          accept="image/*"
          ref={imageUploaderRef}
          id={domId}
          aria-label={label || SELECT_LABEL}
          hidden
        />
        {renderTrigger({ openPicker, isDisabled: Boolean(isDisabled) })}
      </>
    );
  }

  // console.log("lightColor :>> ", lightColor);

  // if (lightColor === "red") {
  //   return <ErrorMessages errors={errors} component="Upload file" />;
  // }
  return (
    <div className={`field-upload ${className || ""}`}>
      <div className="field-upload-field">
        {!hideLabels && <Label name={name} label={label} error={error} message={formMessage} />}
        <input
          type="file"
          onChange={selectImage}
          accept="image/*"
          name={name}
          ref={imageUploaderRef}
          id={domId}
          // The input is visually hidden behind a custom trigger button, so it still needs
          // an accessible name of its own for screen readers and file-picker tooling.
          aria-label={label || selectLabel}
          hidden
        />
        {/* Choosing a file is the neutral action and removing it the destructive one, on the nxs-btn
            family (2026-11 item 337); the legacy btn-main and btn-cancel classes stay beside them until
            2026-11 item 339 because the client still styles them. */}
        <Button
          className={buildNxsButtonClass({ variant: "secondary", className: "btn-main" })}
          onClick={imageClick} isDisabled={isDisabled}>
          {selectLabel}
        </Button>
        {previewImage && (
          <Button
            className={buildNxsButtonClass({ variant: "danger", className: "btn-main btn-cancel hide-on-mobile" })}
            onClick={handleRemoveImage}>
            {removeLabel}
          </Button>
        )}
      </div>
      <div className="preview-hero-container">
        <span>{previewLabel}</span>
        {previewImage && <Button
            label="x"
            onClick={handleRemoveImage}
            className={buildNxsButtonClass({ variant: "danger", size: "small", className: "btn-cancel preview-cancel" })}
          />}
        <Hero
          hero={{ url: previewImage, alt: `${name} image value` }}
          imageRef={imageRef}
          isDisable={isDisabled}
          onImageClick={imageClick}
          className="preview-hero"
        />
      </div>
    </div>
  );
};

export default UploadFile;
