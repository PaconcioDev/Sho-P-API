import { require } from "../../utils/require.js";

const categories = require("../local-file-data/categories.json");
const products = require("../local-file-data/products.json");

class CategoryModel {
  static async getAll() {
    return categories;
  }

  static async findOne({ id }) {
    return categories.find((category) => category.id.toString() === id);
  }

  static async findProducts({ id }) {
    return products
      .filter((product) => product.category.id.toString() === id)
      .map((product) => {
        const { category, ...cleanedProduct } = product;
        return {
          ...cleanedProduct,
          category_id: category.id,
        };
      });
  }
  static async create({ input }) {
    const lastCategory = categories.length - 1;
    const lastId = categories[lastCategory].id;

    const newCategory = {
      id: lastId + 1,
      ...input,
    };

    categories.push(newCategory);
    return newCategory;
  }

  static async update({ id, input }) {
    const categoryIndex = categories.findIndex((category) => category.id === parseInt(id));

    if (categoryIndex === -1) return false;

    categories[categoryIndex] = {
      ...categories[categoryIndex],
      ...input,
    };

    return categories[categoryIndex];
  }
  static async delete({ id }) {
    const categoryIndex = categories.findIndex((category) => category.id === parseInt(id));

    if (categoryIndex === -1) return false;
    
    categories.splice(categoryIndex, 1);

    return true;
  }
}

export { CategoryModel };
