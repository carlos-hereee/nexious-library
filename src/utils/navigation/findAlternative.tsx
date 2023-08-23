import { MenuItemProp } from "@nxs-utils/helpers/types";

export const findAlternatives = (menu: MenuItemProp) => {
  return menu.alternatives.filter((alt) => alt.uid !== menu.active);
};
