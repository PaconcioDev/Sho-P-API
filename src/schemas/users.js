/* eslint-disable prefer-regex-literals */
import z from 'zod';

const passwordRegex = new RegExp('^(?=.*[0-9])(?=.*[A-Z]).{8,}$');
const phoneRegex = new RegExp('^\\d{10}$');
const nameRegex = new RegExp('^[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,}(?: [a-zA-ZÀ-ÿ\u00f1\u00d1]{2,})*$');

const role = z.enum(['customer', 'admin']);
const name = z
  .string()
  .regex(nameRegex, 'First name should only contain letters')
  .min(3, 'First name must contain at least 3 characters')
  .max(35, 'First name must contain less than 35 characters');
const lastName = z
  .string()
  .regex(nameRegex, 'Last name should only contain letters')
  .min(3, 'Last name must contain at least 3 characters')
  .max(35, 'Last name must contain less than 35 characters');
const email = z
  .string()
  .email('Must be a valid email')
  .min(7, 'Email addresses cannot have less than 7 characters')
  .max(320, 'Email addresses cannot have more than 320 characters');
const password = z
  .string()
  .regex(
    passwordRegex,
    'Password must contain at least 8 characters, 1 uppercase letter and 1 number'
  )
  .max(25, 'Password cannot have more than 25 characters');
const phone = z.string().regex(phoneRegex, 'Phone number must have 10 numbers only');

const userSchema = z.object({
  role,
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
