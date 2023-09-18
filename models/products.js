import { products } from "../utils/products.js";

class ProductModel {
  static async getAll() {
    return products;
  }
  
  static async findOne({ id }) {
    return products.find((product) => product.id === id);
  }
}

export { ProductModel };
