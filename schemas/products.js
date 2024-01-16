import z from "zod";

const name = z.string().min(3);
const description = z.string().min(10);
const category = z.number().min(1);
const price = z.number().int().min(1);
const image = z.string().url();

const productSchema = z.object({
  name: name,
  description: description,
  category_id: category,
  price: price,
  image: image,
});

export { productSchema };
