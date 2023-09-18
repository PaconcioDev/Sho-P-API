import { createRequire } from "node:module";
import { products } from "../products.js";

const require = createRequire(import.meta.url);
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
  async random() {
    const index = Math.floor(Math.random() * categories.length);
    const category = categories[index];
    return category;
  }
}

export { CategoriesService };
