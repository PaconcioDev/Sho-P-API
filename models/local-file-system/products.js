import { randomUUID } from "node:crypto";
import { completeCategory, updateCategory } from "../../utils/category.js";
import { readFromLocalFile, writeToLocalFile} from "../../utils/readAndWriteLocal.js";
import { productsFilePath, categoriesFilePath } from "../../utils/filePath.js";

class ProductModel {
  static async getAll() {
    const products = await readFromLocalFile(productsFilePath);
    return products;
  }

  static async findOne({ id }) {
    const products = await readFromLocalFile(productsFilePath);
    return products.find((product) => product.id === id);
  }

  static async create({ input }) {
    const categories = await readFromLocalFile(categoriesFilePath);
    const products = await readFromLocalFile(productsFilePath);
    const { category_id, ...cleanedInput } = input;

    const newProduct = {
      id: randomUUID(),
      ...cleanedInput,
      category: completeCategory(categories, category_id),
    };

    products.push(newProduct);
    await writeToLocalFile(productsFilePath, products);
    return newProduct;
  }

  static async update({ id, input }) {
    const products = await readFromLocalFile(productsFilePath);
    const { category_id, ...cleanedInput } = input;
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) return false;

    const categories = await readFromLocalFile(categoriesFilePath);
    products[productIndex] = {
      ...products[productIndex],
      ...cleanedInput,
      category: updateCategory(products, productIndex, categories, category_id),
    };

    await writeToLocalFile(productsFilePath, products);
    return products[productIndex];
  }

  static async delete({ id }) {
    const products = await readFromLocalFile(productsFilePath);
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) return false;

    products.splice(productIndex, 1);
    await writeToLocalFile(productsFilePath, products);
    return true;
  }
}

export { ProductModel };
