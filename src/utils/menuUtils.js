import { menuData } from "../data/menuData";

export const getMenuItemById = (id) => {
  return menuData.find((item) => item.id === Number(id));
};

export const filterMenuItems = ({
  category = "All",
  diet = "All",
  name = "",
}) => {
  return menuData.filter((item) => {
    const categoryMatch =
      category === "All" ||
      item.category.toLowerCase() === category.toLowerCase();

    const dietMatch =
      diet === "All" ||
      (diet === "Veg" && item.isVeg) ||
      (diet === "NonVeg" && !item.isVeg);

    const nameMatch =
      item.name.toLowerCase().includes(name.toLowerCase());

    return categoryMatch && dietMatch && nameMatch;
  });
};