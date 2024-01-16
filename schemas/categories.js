import z from "zod";

const name = z.string().min(2);

const categorySchema = z.object({
  name: name,
});

export { categorySchema };
