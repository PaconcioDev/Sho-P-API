import z from 'zod';

const productId = z.string().uuid();
const quantity = z.number().int().min(1);
const price = z.number().nonnegative();

const name = z.string().min(3);
const description = z.string().min(10);
const categoryId = z.number().min(1);
const image = z.string().url();

const category = z.object({
  id: categoryId,
  name
});

const orderItemSchema = z.object({
  id: productId,
  name,
  image,
  description,
  price,
  category,
  quantity
});

const orderSchema = z.object({
  orderItems: z.array(orderItemSchema),
  total: price
});

export { orderSchema };
