import { Label } from "@nxs-atoms/index";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { useRef, useState } from "react";
import { ErrorMessages } from "@nxs-molecules";
import { initLabels } from "@nxs-utils/form/labels";
import { UploadFileProps } from "nxs-form";

const UploadFile: React.FC<UploadFileProps> = (props) => {
  const { name, error } = props.input;
  const { selectLabel, label, hideLabels, onSelect, theme } = props;
  // required props
  const { lightColor, errors } = useRequiredProps({ onSelect, name }, true);
  const [currentImage, setCurrentImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const imageUpLoaderRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef(null);
  const labels = label ? label : initLabels[name];

  const imageClick = () => {
    imageUpLoaderRef.current && imageUpLoaderRef.current.click();
  };

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    const file = selectedFiles?.[0];
    if (file) {
      onSelect(file);
      setCurrentImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  if (lightColor === "red") {
    return <ErrorMessages errors={errors} component="Upload file" />;
  }
  return (
    <div className={`field-upload ${theme ? theme : ""}`}>
      <div className="flex-d-column flex-start">
        {!hideLabels && <Label name={name} label={labels} errors={error} />}
        <input
          type="file"
          onChange={selectImage}
          accept="image/*"
          name={name}
          ref={imageUpLoaderRef}
          id={name}
          hidden
        />
        <button className="btn-main" type="button" onClick={imageClick}>
          {selectLabel || "Choose a file"}
        </button>
      </div>
      <div className="flex-d-column">
        <span>Image Preview</span>
        {currentImage ? (
          <img
            className="hero preview-hero"
            src={previewImage}
            ref={imageRef}
            alt="image-upload-preview"
            onClick={imageClick}
          />
        ) : (
          <button type="button" className="preview-hero-empty" onClick={imageClick}>
            ?
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
