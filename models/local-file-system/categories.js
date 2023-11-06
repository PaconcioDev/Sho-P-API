import { require } from "../../utils/require.js";

const categories = require("../categories.json");
const products = require("../products.json");

class CategoryModel {
  static async getAll() {
    return categories;
  }

  static async findOne({ id }) {
    return categories.find((category) => category.id.toString() === id);
  }
  
  static async findProducts({ id }) {
    return products.filter((product) => product.category.id.toString() === id);
  }
}

export { CategoryModel };
