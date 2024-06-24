/* eslint-disable prefer-regex-literals */
import z from 'zod';

const passwordRegex = new RegExp('^(?=.*[0-9])(?=.*[A-Z]).{8,}$');
const phoneRegex = new RegExp('^\\d{10}$');
const nameRegex = new RegExp('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$');

// const role = z.enum(["customer", "admin", "superadmin"]);
const name = z
  .string()
  .regex(nameRegex, 'First name should only contain letters')
  .min(3, 'First name must contain at least 3 characters');
const lastName = z
  .string()
  .regex(nameRegex, 'Last name should only contain letters')
  .min(3, 'Last name must contain at least 3 characters');
const email = z.string().email('Must be a valid email');
const password = z
  .string()
  .regex(
    passwordRegex,
    'Password must contain at least 8 characters, 1 uppercase letter and 1 number'
  );
const phone = z.string().regex(phoneRegex, 'Must be a valid phone number');

const userSchema = z.object({
  name,
  lastName,
  email,
  password,
  phone: phone.optional()
});

const updateUserSchema = z.object({
  name,
  lastName,
  email,
  phone
});

const loginSchema = z.object({
  email: z.string(),
  password: z.string()
});

const updatePasswordSchema = z.object({
  currentPassword: password,
  password
});

const recoverPasswordSchema = z.object({
  password
});

const sendEmailSchema = z.object({
  email
});

export {
  userSchema,
  updateUserSchema,
  loginSchema,
  updatePasswordSchema,
  recoverPasswordSchema,
  sendEmailSchema
};
