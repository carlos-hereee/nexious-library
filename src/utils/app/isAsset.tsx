export const isAsset = (asset?: unknown) => {
  if (asset instanceof File) return true;
  if (asset instanceof Blob) return true;
  return false;
};
