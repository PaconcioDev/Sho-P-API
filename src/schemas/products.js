import z from 'zod';

const name = z.string().min(3, 'Name must contain al least 3 characters');
const description = z.string().min(200, 'Description must contain at least 200 characters').max(500, 'Description must contain less than 500 characters');
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
