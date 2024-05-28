import z from "zod";

const productId = z.string().uuid();
const quantity = z.number().int().min(1);
const price = z.number().nonnegative();

const orderItemSchema = z.object({
  productId: productId,
  quantity: quantity,
  price: price
});

const orderSchema = z.object({
  orderItems: z.array(orderItemSchema),
  total: price
});

export { orderSchema };