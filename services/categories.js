import { products } from "../utils/products.js";
import { require } from "../utils/require.js";

const categories = require("../categories.json");

class CategoriesService {
  static find = async () => {
    return categories;
  };
  static findOne = async ({ id }) => {
    return categories.find((category) => category.id.toString() === id);
  };
  static findProducts = async ({ id }) => {
    return products.filter((product) => product.category.id.toString() === id);
  };
}

export { CategoriesService };
