import z from 'zod';

const name = z
  .string()
  .min(3, 'Category name cannot have less than 3 characters')
  .max(15, 'Category name cannot have more than 15 characters');

const categorySchema = z.object({
  name
});

export { categorySchema };
