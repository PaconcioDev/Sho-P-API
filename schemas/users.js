import z from "zod";

const passwordRegex = new RegExp("^(?=.*[0-9])(?=.*[A-Z]).{8,}$");
const phoneRegex = new RegExp("^\\d{10}$");

// const role = z.enum(["customer", "admin", "superadmin"]);
const name = z.string().min(3, "Name must contain at least 3 characters");
const lastName = z.string().min(3, "Last name must contain at least 3 characters");
const email = z.string().email("Must be a valid email");
const password = z
  .string()
  .regex(
    passwordRegex,
    "Password must contain at least 8 characters, 1 uppercase letter and 1 number"
  );
const phone = z.string().regex(phoneRegex, "Must be a valid phone number");

const userSchema = z.object({
  name: name,
  lastName: lastName,
  email: email,
  password: password,
  phone: phone.optional(),
});

const updateUserSchema = z.object({
  name: name,
  lastName: lastName,
  email: email,
  phone: phone,
});

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const updatePasswordSchema = z.object({
  password: password,
});

const sendEmailSchema = z.object({
  email: email,
});

export {
  userSchema,
  updateUserSchema,
  loginSchema,
  updatePasswordSchema,
  sendEmailSchema,
};
