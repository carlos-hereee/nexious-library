import { Label } from "@nxs-atoms/index";
import { FormMediaProps } from "@nxs-utils/form/types";
import { useRef, useState } from "react";

type UploadFileProps = {
  name: string;
  theme?: string;
  hideLabels?: boolean;
  labels?: string;
  errors?: string;
  onSubmit: (e: any) => void;
};
// TODO: UPload files
const UploadFile: React.FC<UploadFileProps> = (props) => {
  const { name, labels, errors, hideLabels, onSubmit, theme } = props;
  const [currentImage, setCurrentImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const imageUpLoaderRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef(null);
  const [media, setMedia] = useState<FormMediaProps[]>([]);

  const imageClick = () => {
    imageUpLoaderRef.current && imageUpLoaderRef.current.click();
  };

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    const file = selectedFiles?.[0];
    if (file) {
      setMedia((prev) => [...prev, { name: event.target.name, file }]);
      setCurrentImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  const handleSubmit = () => {
    /*  
    - save file uploads on a form data
    formData is tricky because values will not show up on your console
    BUT everything is working check data when sending request.
    Everything is there!! 
  */ const formData = new FormData();
    media.forEach((m) => {
      formData.set(m.name, m.file, m.file.name);
    });
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit} className={theme ? theme : "field-upload"}>
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
          <div className="preview-hero-empty">?</div>
        )}
      </div>
    </form>
  );
};

export default UploadFile;
