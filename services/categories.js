import { products } from "../utils/products.js";
import { require } from "../utils/require.js";

const categories = require("../categories.json");

class CategoriesService {
  async find() {
    return categories;
  }
  async findOne(id) {
    return categories.find((category) => category.id.toString() === id);
  }
  async findProducts(id) {
    return products.filter((product) => product.category.id.toString() === id);
  }
}

export { CategoriesService };
