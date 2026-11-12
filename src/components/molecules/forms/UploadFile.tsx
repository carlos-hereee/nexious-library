import { Button, Label } from "@nxs-atoms/index";
import { useEffect, useRef, useState } from "react";
import { Hero } from "@nxs-molecules";
import type { UploadFileProps } from "nxs-form";
import { urlFile } from "@nxs-utils/data/urlFile";
import { useFieldDomId } from "@nxs-utils/hooks/useFieldDomId";

const UploadFile: React.FC<UploadFileProps> = (props) => {
  const { selectLabel, label, hideLabels, onSelect, className, value, formMessage, input, error } = props;
  const { name, isDisabled } = input;
  const domId = useFieldDomId(name);
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
          aria-label={label || "Choose a file"}
          hidden
        />
        {/* Choosing a file is the neutral action and removing it the destructive one, on the nxs-btn
            family (2026-11 item 337); the legacy btn-main and btn-cancel classes stay beside them until
            2026-11 item 339 because the client still styles them. */}
        <Button variant="secondary" className="btn-main" onClick={imageClick} isDisabled={isDisabled}>
          {selectLabel || "Choose a file"}
        </Button>
        {previewImage && (
          <Button variant="danger" className="btn-main btn-cancel hide-on-mobile" onClick={handleRemoveImage}>
            Remove File
          </Button>
        )}
      </div>
      <div className="preview-hero-container">
        <span>Image Preview</span>
        {previewImage && <Button
            label="x"
            variant="danger"
            size="small"
            onClick={handleRemoveImage}
            className="btn-cancel preview-cancel"
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
