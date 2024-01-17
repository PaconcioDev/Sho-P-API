import { productsFilePath, categoriesFilePath } from "../../utils/filePath.js";
import {
  readFromLocalFile,
  writeToLocalFile,
} from "../../utils/readAndWriteLocal.js";

class CategoryModel {
  static async getAll() {
    const categories = await readFromLocalFile(categoriesFilePath);
    return categories;
  }

  static async findOne({ id }) {
    const categories = await readFromLocalFile(categoriesFilePath);
    return categories.find((category) => category.id.toString() === id);
  }

  static async findProducts({ id }) {
    const products = await readFromLocalFile(productsFilePath);

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
    const categories = await readFromLocalFile(categoriesFilePath);
    const lastCategory = categories.length - 1;
    const lastId = categories[lastCategory].id;

    const newCategory = {
      id: lastId + 1,
      ...input,
    };

    categories.push(newCategory);
    await writeToLocalFile(categoriesFilePath, categories);
    return newCategory;
  }

  static async update({ id, input }) {
    const categories = await readFromLocalFile(categoriesFilePath);

    const categoryIndex = categories.findIndex(
      (category) => category.id === parseInt(id)
    );

    if (categoryIndex === -1) return false;

    categories[categoryIndex] = {
      ...categories[categoryIndex],
      ...input,
    };

    await writeToLocalFile(categoriesFilePath, categories);
    return categories[categoryIndex];
  }
  static async delete({ id }) {
    const categories = await readFromLocalFile(categoriesFilePath);

    const categoryIndex = categories.findIndex(
      (category) => category.id === parseInt(id)
    );

    if (categoryIndex === -1) return false;

    categories.splice(categoryIndex, 1);
    await writeToLocalFile(categoriesFilePath, categories);
    return true;
  }
}

export { CategoryModel };
