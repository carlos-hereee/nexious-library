export const urlFile = (file?: File) => {
  if (!file) return "";
  return URL.createObjectURL(file);
};
