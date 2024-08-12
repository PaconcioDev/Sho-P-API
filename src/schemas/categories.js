import z from 'zod';

const name = z
  .string()
  .min(2, 'Category name cannot have less than 2 characters')
  .max(30, 'Category name cannot have more than 30 characters');

const categorySchema = z.object({
  name
});

export { categorySchema };
