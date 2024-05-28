import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const productsFilePath = resolve(__dirname, "../local-file-data/products.json");
const categoriesFilePath = resolve(__dirname, "../local-file-data/categories.json");
const usersFilePath = resolve(__dirname, "../local-file-data/users.json");
const ordersFilePath = resolve(__dirname, "../local-file-data/orders.json");

export { productsFilePath, categoriesFilePath, usersFilePath, ordersFilePath };
