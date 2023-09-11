import { Label } from "@nxs-atoms/index";
import { useRef, useState } from "react";

type UploadFileProps = {
  name: string;
  setMedia: (e: any) => void;
  hideLabels?: boolean;
  labels?: string;
  errors?: string;
};
// TODO: UPload files
const UploadFile: React.FC<UploadFileProps> = (props) => {
  const { name, setMedia, labels, errors, hideLabels } = props;
  const [currentImage, setCurrentImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const imageUpLoaderRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef(null);

  const imageClick = () => {
    imageUpLoaderRef.current && imageUpLoaderRef.current.click();
  };

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    const file = selectedFiles?.[0];
    if (file) {
      setMedia({ name: event.target.name, file });
      setCurrentImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  return (
    <div className="field-upload">
      {!hideLabels && <Label name={name} label={labels} errors={errors} />}
      <input
        type="file"
        onChange={selectImage}
        accept="image/*"
        name={name}
        ref={imageUpLoaderRef}
        hidden
      />
      <button className="btn-main" type="button" onClick={imageClick}>
        Upload a file
      </button>
      {currentImage && (
        <div className="flex-d-column">
          <span>Image Preview</span>
          <img
            className="hero preview-hero"
            src={previewImage}
            ref={imageRef}
            alt="image-upload-preview"
            onClick={imageClick}
          />
        </div>
      )}
    </div>
  );
};

export default UploadFile;
