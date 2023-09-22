import { randomUUID } from "node:crypto";
import { require } from "../utils/require.js";

const products = require("../products.json");
const categories = require("../categories.json");

class ProductModel {
  static async getAll() {
    return products;
  }

  static async findOne({ id }) {
    return products.find((product) => product.id === id);
  }

  static async create({ input }) {
    const { category } = input;
    const newProduct = {
      id: randomUUID(),
      ...input,
      category: categories.find((c) => c.name === category),
    };
    products.push(newProduct);
    return newProduct;
  }
}

export { ProductModel };
