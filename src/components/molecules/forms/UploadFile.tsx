import { useRef, useState } from "react";

type UploadFileProps = {
  name: string;
  upload: (e: any) => void;
};
// TODO: UPload files
const UploadFile: React.FC<UploadFileProps> = (props) => {
  const { name, upload } = props;
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
      setCurrentImage(file);
      setPreviewImage(URL.createObjectURL(file));
      upload(file);
    }
  };

  return (
    <div className="field-upload">
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
