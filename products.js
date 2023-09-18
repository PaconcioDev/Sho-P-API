import { faker } from "@faker-js/faker";
import { CategoriesService } from "./services/categories.js";

const categoriesService = new CategoriesService;

let products = [];
(() => {
  const limit = 50;
  for (let i = 0; i < limit; i++) {
    products.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      category: categoriesService.random(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
    });
  }
})();

export { products };
