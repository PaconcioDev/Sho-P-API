import { randomUUID } from "node:crypto";
import { require } from "../../utils/require.js";
import { completeCategory, updateCategory } from "../../utils/category.js";

const products = require("../local-file-data/products.json");
const categories = require("../local-file-data/categories.json");

class ProductModel {
  static async getAll() {
    return products;
  }

  static async findOne({ id }) {
    return products.find((product) => product.id === id);
  }

  static async create({ input }) {
    const { category_id, ...cleanedInput } = input;

    const newProduct = {
      id: randomUUID(),
      ...cleanedInput,
      category: completeCategory(categories, category_id),
    };

    products.push(newProduct);

    return newProduct;
  }

  static async update({ id, input }) {
    const { category_id, ...cleanedInput } = input;

    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) return false;

    products[productIndex] = {
      ...products[productIndex],
      ...cleanedInput,
      category: updateCategory(products, productIndex, categories, category_id),
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
