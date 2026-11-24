import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import UploadFile from "./UploadFile";

/**
 * UploadFile is an image picker on a hidden native file input.
 *
 * Default: it draws its own choose button, remove buttons and preview, and echoes `value` through
 * `onSelect` on mount. With `renderTrigger` the consumer's element opens the picker instead (an
 * image that is its own picker), `onSelect` fires only with a picked File, and the consumer draws
 * the preview and revokes any object URL it creates.
 */
const meta: Meta<typeof UploadFile> = {
  title: "Molecules/UploadFile",
  component: UploadFile,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480, padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UploadFile>;

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200";

const WithDefaultControl = () => {
  const [logo, setLogo] = useState<File | string>("");
  return <UploadFile input={{ name: "story-logo" }} label="Logo" value={logo} onSelect={setLogo} />;
};

/** Default: the library's own choose button and preview. */
export const Default: Story = { render: () => <WithDefaultControl /> };

const WithSpanishWords = () => {
  const [logo, setLogo] = useState<File | string>(PLACEHOLDER_IMAGE);
  return (
    <UploadFile
      input={{ name: "story-logo-es" }}
      label="Logotipo"
      selectLabel="Elegir archivo"
      removeLabel="Quitar archivo"
      previewLabel="Vista previa"
      value={logo}
      onSelect={setLogo}
    />
  );
};

/** Every word passed in, for a consumer that renders in another language. */
export const TranslatedWords: Story = { render: () => <WithSpanishWords /> };

const WithImageAsTrigger = () => {
  const [previewUrl, setPreviewUrl] = useState(PLACEHOLDER_IMAGE);
  const [pickedName, setPickedName] = useState("");

  // The consumer owns the preview, so it owns the object URL too: revoked on replace and unmount.
  useEffect(() => {
    if (!previewUrl.startsWith("blob:")) return undefined;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const handlePick = (file: File | string) => {
    if (!(file instanceof File)) return;
    setPreviewUrl(URL.createObjectURL(file));
    setPickedName(file.name);
  };

  return (
    <>
      <UploadFile
        input={{ name: "story-hero" }}
        label="Change hero image"
        value={previewUrl}
        onSelect={handlePick}
        renderTrigger={({ openPicker, isDisabled }) => (
          <button
            type="button"
            className="story-image-trigger"
            onClick={openPicker}
            aria-disabled={isDisabled || undefined}
            style={{ padding: 0, border: 0, background: "none", cursor: "pointer", width: "100%" }}>
            <img src={previewUrl} alt="" style={{ display: "block", width: "100%" }} />
            <span className="sr-only">Change hero image</span>
          </button>
        )}
      />
      <p>Picked file: {pickedName || "none yet"}</p>
    </>
  );
};

/** renderTrigger: the image is the trigger; Enter, Space, a click or a tap opens the picker. */
export const ImageAsTrigger: Story = { render: () => <WithImageAsTrigger /> };
