import z from 'zod';

const name = z.string().min(3, 'Name must contain al least 3 characters');
const description = z.string().min(10, 'Description must contain at least 10 characters');
const category = z.number().min(1);
const price = z.number().int().min(1, 'Price must be greater than 0');
const image = z.string().url();

const productSchema = z.object({
  name,
  description,
  category_id: category,
  price,
  image
});

export { productSchema };
