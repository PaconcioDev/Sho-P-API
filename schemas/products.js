import z from "zod";

const name = z.string().min(3);
const description = z.string().min(10);
const category = z.enum(["Clothes", "Electronics", "Furnitures", "Toys", "Others"]);
const price = z.number().int().min(1);
const image = z.string().url();

const productSchema = z.object({
  name: name,
  description: description,
  category: category,
  price: price,
  image: image,
});

function validateProduct(object) {
  return productSchema.safeParse(object);
}

function validatePartialProduct(object) {
  return productSchema.partial().safeParse(object);
}

export { validateProduct, validatePartialProduct };
