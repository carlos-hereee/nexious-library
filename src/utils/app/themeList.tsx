export type ThemeListProp = {
  name: string;
  uid: string;
  value: string;
};
export const themeList: ThemeListProp[] = [
  { name: "light-mode", uid: "theme-light", value: "light" },
  { name: "dark-mode", uid: "theme-dark", value: "dark" },
];
