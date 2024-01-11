import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import bcrypt from "bcrypt";
import {
  readFromLocalFile,
} from "../../utils/readAndWriteLocal.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const usersFilePath = resolve(__dirname, "../../local-file-data/users.json");

class AuthModel {
  static async login({ input }) {
    const users = await readFromLocalFile(usersFilePath);
    const {email, password} = input;

    const user = users.find((user) => user.email === email);
    const isPasswordCorrect = !user
      ? false
      : await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) return false;

    return user;
  }
}

export { AuthModel };
