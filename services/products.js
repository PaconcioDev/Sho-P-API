import { products } from "../utils/products.js";

class ProductService {
  static find = async () => {
    return products;
  };
  static findOne = async ({id}) => {
    return products.find((product) => product.id === id);
  };
}

export { ProductService };
