import { productsFilePath, categoriesFilePath } from '../../utils/filePath.js';
import {
  readFromLocalFile,
  writeToLocalFile
} from '../../utils/readAndWriteLocal.js';

const restoreDeletedCategories = async () => {
  const categories = await readFromLocalFile(categoriesFilePath);
  const now = new Date();

  const updateCategories = categories.map(category => {
    if (category.deletedAt && (now - new Date(category.deletedAt)) > 3 * 60 * 1000) {
      delete category.deletedAt;
    }
    return category;
  });

  await writeToLocalFile(categoriesFilePath, updateCategories);
};

class CategoryModel {
  static async getAll () {
    const categories = await readFromLocalFile(categoriesFilePath);
    return categories.filter(category => !category.deletedAt);
  }

  static async findOne ({ id }) {
    const categories = await readFromLocalFile(categoriesFilePath);
    return categories.find((category) => category.id.toString() === id && !category.deletedAt);
  }

  static async findProducts ({ id }) {
    const products = await readFromLocalFile(productsFilePath);

    return products
      .filter((product) => product.category.id.toString() === id)
      .map((product) => {
        const { category, ...cleanedProduct } = product;
        return {
          ...cleanedProduct,
          category_id: category.id
        };
      });
  }

  static async create ({ input }) {
    const categories = await readFromLocalFile(categoriesFilePath);
    const lastCategory = categories.length - 1;
    const lastId = categories[lastCategory].id;

    const newCategory = {
      id: lastId + 1,
      ...input
    };

    categories.push(newCategory);
    await writeToLocalFile(categoriesFilePath, categories);
    return newCategory;
  }

  static async update ({ id, input }) {
    const categories = await readFromLocalFile(categoriesFilePath);

    const categoryIndex = categories.findIndex(
      (category) => category.id === parseInt(id)
    );

    if (categoryIndex === -1) return false;

    categories[categoryIndex] = {
      ...categories[categoryIndex],
      ...input
    };

    await writeToLocalFile(categoriesFilePath, categories);
    return categories[categoryIndex];
  }

  static async delete ({ id }) {
    const categories = await readFromLocalFile(categoriesFilePath);

    const categoryIndex = categories.findIndex(
      (category) => category.id === parseInt(id)
    );

    if (categoryIndex === -1) return false;

    categories[categoryIndex].deletedAt = new Date().toISOString();
    await writeToLocalFile(categoriesFilePath, categories);
    return true;
  }
}

export { CategoryModel, restoreDeletedCategories };
