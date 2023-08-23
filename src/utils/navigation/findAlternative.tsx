import { MenuItemProp } from "@nxs-utils/helpers/types";

export const findAlternatives = (menu: MenuItemProp, active: string) => {
  return menu.alternatives.filter((alt) => alt.uid !== active);
};
