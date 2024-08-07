import { Button, Label } from "@nxs-atoms/index";
import { useEffect, useRef, useState } from "react";
import { Hero } from "@nxs-molecules";
import type { UploadFileProps } from "nxs-form";
import { urlFile } from "@nxs-utils/data/urlFile";

const UploadFile: React.FC<UploadFileProps> = (props) => {
  const { selectLabel, label, hideLabels, onSelect, theme, value, formMessage, input, error } = props;
  const { name, isDisabled } = input;
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
    <div className={`field-upload ${theme || ""}`}>
      <div className="field-upload-field">
        {!hideLabels && <Label name={name} label={label} error={error} message={formMessage} />}
        <input
          type="file"
          onChange={selectImage}
          accept="image/*"
          name={name}
          ref={imageUploaderRef}
          id={name}
          hidden
        />
        <button className="btn-main" type="button" onClick={imageClick} disabled={isDisabled}>
          {selectLabel || "Choose a file"}
        </button>
        {previewImage && (
          <button className="btn-main btn-cancel hide-on-mobile" type="button" onClick={handleRemoveImage}>
            Remove File
          </button>
        )}
      </div>
      <div className="preview-hero-container">
        <span>Image Preview</span>
        {previewImage && <Button label="x" onClick={handleRemoveImage} theme="btn-cancel preview-cancel" />}
        <Hero
          hero={{ url: previewImage, alt: `${name} image value` }}
          imageRef={imageRef}
          isDisable={isDisabled}
          onImageClick={imageClick}
          theme="preview-hero"
        />
      </div>
    </div>
  );
};

export default UploadFile;
