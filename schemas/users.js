import z from "zod";

const passwordRegex = new RegExp("^(?=.*[0-9])(?=.*[A-Z]).*$");
const phoneRegex = new RegExp("^\\d{10}$");

const role = z.enum(["customer", "admin"]);
const name = z.string().min(3);
const lastName = z.string().min(3);
const email = z.string().email();
const password = z.string().regex(passwordRegex, "Must be a valid password");
const phone = z.string().regex(phoneRegex, "Must be a valid phone number");

const userSchema = z.object({
  role: role,
  name: name,
  lastName: lastName,
  email: email,
  password: password,
  phone: phone.optional(),
});

const updateUserShcema = z.object({
  name: name,
  lastName: lastName,
  email: email,
  password: password,
  phone: phone,
});


function validateUser(object) {
  return userSchema.safeParse(object);
}

function validatePartialUser(object) {
  return updateUserShcema.partial().safeParse(object);
}

export { validateUser, validatePartialUser };
