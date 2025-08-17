import { apiFetch } from "./apiFetch";

export const createItem = async (menuItemData) => {
  return apiFetch('menuItems', 'POST', menuItemData);
};
