export const updateLanguage = (language: string) => {
  return document.documentElement.setAttribute("lang", language);
};
