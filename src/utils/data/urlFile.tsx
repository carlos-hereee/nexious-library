export const urlFile = (file?: File | string) => {
  if (!file) return "";
  if (typeof file === "string") return file;
  return URL.createObjectURL(file);
};
