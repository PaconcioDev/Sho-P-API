import z from "zod";

const name = z.string().min(2);

const categorySchema = z.object({
  name: name,
});

function validateCategory(object) {
  return categorySchema.safeParse(object);
}

export { categorySchema, validateCategory };
