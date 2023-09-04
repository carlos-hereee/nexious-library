import { useRef, useState } from "react";

type IFile = {
  url: string;
  name: string;
};
type UploadFileProps = {
  name: string;
  baseUrl: string;
  upload: (e: any) => void;
  path: string;
};
// TODO: UPload files
// type FileEventTarget = EventTarget & { files: FileList };
const UploadFile: React.FC<UploadFileProps> = (props) => {
  const { name, baseUrl, path, upload } = props;
  const [currentImage, setCurrentImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [imageInfos, setImageInfos] = useState<Array<IFile>>([]);

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    setCurrentImage(selectedFiles?.[0]);
    setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
    setProgress(0);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // setProgress(0);
    // if (!currentImage) return;
    // let formData = new FormData();
    // onSubmit(formData);
  };
  return (
    <div>
      <input
        type="file"
        onChange={selectImage}
        accept="image/*"
        name={name}
        // hidden
      />
      <button type="submit" disabled={!currentImage} onClick={handleSubmit}>
        Upload
      </button>
      {currentImage && progress > 0 && (
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: progress + "%" }}
        >
          {progress}%
        </div>
      )}
      {previewImage && (
        <img className="hero preview-hero" src={previewImage} alt="preview" />
      )}
      {message && <p className="error-message">{message}</p>}
      {imageInfos.length > 0 && (
        <div>
          <h3 className="heading">List of images</h3>
          <ul>
            {imageInfos.map((img, idx) => (
              <li className="list-group-item" key={idx}>
                <p>
                  <a href={img.url}>{img.name}</a>
                </p>
                <img src={img.url} alt={img.name} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
