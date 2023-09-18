import { products } from "../products.js";

class ProductService {
  async find() {
    return products;
  }
  async findOne(id) {
    return products.find((product) => product.id === id);
  }
}

export { ProductService };
