import { faker } from "@faker-js/faker";
import { createRequire } from "node:module" ;

const require = createRequire(import.meta.url);
const categories = require("../categories.json");

const randomProductCategory = () => {
  const index = Math.floor(Math.random() * categories.length);
  const category = categories[index];
  return category;
};

let products = [];
(() => {
  const limit = 50;
  for (let i = 0; i < limit; i++) {
    products.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      category: randomProductCategory(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
    });
  }
})();



export { products };
