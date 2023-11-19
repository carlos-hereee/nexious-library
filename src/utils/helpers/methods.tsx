export const findValueType = (value: unknown | undefined | null) => {
  return {
    value,
    type: typeof value,
    isUndefined: value === undefined || value || "undefined",
    isNull: value === null || value === "null",
  };
};
