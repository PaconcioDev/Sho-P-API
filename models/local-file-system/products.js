import { randomUUID } from 'node:crypto';
import { completeCategory, updateCategory } from '../../utils/category.js';
import { productsFilePath, categoriesFilePath } from '../../utils/filePath.js';
import {
  readFromLocalFile,
  writeToLocalFile
} from '../../utils/readAndWriteLocal.js';

const restoreDeletedProducts = async () => {
  const products = await readFromLocalFile(productsFilePath);
  const now = new Date();

  const updatedProducts = products.map(product => {
    if (product.deletedAt && (now - new Date(product.deletedAt)) > 3 * 60 * 1000) {
      delete product.deletedAt;
    }
    return product;
  });

  await writeToLocalFile(productsFilePath, updatedProducts);
};

class ProductModel {
  static async getAll () {
    const products = await readFromLocalFile(productsFilePath);
    return products.filter(product => !product.deletedAt);
  }

  static async findOne ({ id }) {
    const products = await readFromLocalFile(productsFilePath);
    return products.find((product) => product.id === id && !product.deletedAt);
  }

  static async create ({ input }) {
    const categories = await readFromLocalFile(categoriesFilePath);
    const products = await readFromLocalFile(productsFilePath);
    // eslint-disable-next-line camelcase
    const { category_id, ...cleanedInput } = input;

    const newProduct = {
      id: randomUUID(),
      ...cleanedInput,
      category: completeCategory(categories, category_id)
    };

    products.push(newProduct);
    await writeToLocalFile(productsFilePath, products);
    return newProduct;
  }

  static async update ({ id, input }) {
    // eslint-disable-next-line camelcase
    const { category_id, ...cleanedInput } = input;
    const products = await readFromLocalFile(productsFilePath);
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) return false;

    const categories = await readFromLocalFile(categoriesFilePath);

    products[productIndex] = {
      ...products[productIndex],
      ...cleanedInput,
      category: updateCategory(products, productIndex, categories, category_id)
    };

    await writeToLocalFile(productsFilePath, products);
    return products[productIndex];
  }

  static async delete ({ id }) {
    const products = await readFromLocalFile(productsFilePath);
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) return false;

    products[productIndex].deletedAt = new Date().toISOString();
    await writeToLocalFile(productsFilePath, products);
    return true;
  }
}

export { ProductModel, restoreDeletedProducts };
