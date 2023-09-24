import { randomUUID } from "node:crypto";
import { require } from "../utils/require.js";
import { completeCategory } from "../utils/completeCategory.js";

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
    const newProduct = {
      id: randomUUID(),
      ...input,
      category: completeCategory(categories, input),
    };

    products.push(newProduct);

    return newProduct;
  }

  static async update({ id, input }) {
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) return false;

    products[productIndex] = {
      ...products[productIndex],
      ...input,
      category: completeCategory(categories, input),
    };

    return products[productIndex];
  }

  static async delete({ id }) {
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) return false;

    products.splice(productIndex, 1);

    return true;
  }
}

export { ProductModel };
