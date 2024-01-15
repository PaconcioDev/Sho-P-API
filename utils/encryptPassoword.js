import bcrypt from "bcrypt";

async function encryptPassword({ password }) {
  return await bcrypt.hash(password, 10);
}

export { encryptPassword };
