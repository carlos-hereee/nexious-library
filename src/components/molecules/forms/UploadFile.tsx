import { Button, Label } from "@nxs-atoms/index";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { useEffect, useRef, useState } from "react";
import { ErrorMessages, Hero } from "@nxs-molecules";
import { UploadFileProps } from "nxs-form";

const UploadFile: React.FC<UploadFileProps> = (props) => {
  const { name, error } = props.input;
  const { selectLabel, label, hideLabels, onSelect, theme, value, formMessage } = props;
  // required props
  const { lightColor, errors } = useRequiredProps({ onSelect, name }, true);
  const [previewImage, setPreviewImage] = useState<string>("");
  const imageUploaderRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // use init values
  useEffect(() => {
    formatImageData(value);
  }, []);

  const imageClick = () => {
    if (imageUploaderRef.current) {
      // Trigger the click event of the file input
      imageUploaderRef.current.click();
    }
  };
  const formatImageData = (file?: File) => {
    if (file) {
      const url = typeof file === "string" ? file : URL.createObjectURL(file);
      setPreviewImage(url);
      onSelect(file);
    } else {
      setPreviewImage("");
      onSelect();
    }
  };

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    formatImageData(selectedFile);
  };

  const handleRemoveImage = () => {
    formatImageData();
    if (imageUploaderRef.current) {
      imageUploaderRef.current.value = "";
    }
  };

  if (lightColor === "red") {
    return <ErrorMessages errors={errors} component="Upload file" />;
  }
  return (
    <div className={`field-upload ${theme ? theme : ""}`}>
      <div className="flex-d-column flex-start">
        {!hideLabels && (
          <Label name={name} label={label} errors={error} message={formMessage} />
        )}
        <input
          type="file"
          onChange={selectImage}
          accept="image/*"
          name={name}
          ref={imageUploaderRef}
          id={name}
          hidden
        />
        <button className="btn-main" type="button" onClick={imageClick}>
          {selectLabel || "Choose a file"}
        </button>
        {previewImage && (
          <button className="btn-main btn-cancel" type="button" onClick={handleRemoveImage}>
            Cancel
          </button>
        )}
      </div>
      <div className="preview-hero-container">
        <span>Image Preview</span>
        {previewImage && (
          <Button label="x" onClick={handleRemoveImage} theme="preview-cancel btn-cancel" />
        )}
        <Hero
          hero={{ url: previewImage }}
          imageRef={imageRef}
          onImageClick={imageClick}
          theme="preview-hero"
        />
      </div>
    </div>
  );
};

export default UploadFile;
