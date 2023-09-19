import { require } from "../utils/require.js";
const products = require("../products.json");

class ProductModel {
  static async getAll() {
    return products;
  }
  
  static async findOne({ id }) {
    return products.find((product) => product.id === id);
  }
}

export { ProductModel };
