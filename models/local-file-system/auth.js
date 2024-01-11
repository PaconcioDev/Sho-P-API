import bcrypt from "bcrypt";
import { readFromLocalFile } from "../../utils/readAndWriteLocal.js";
import { usersFilePath } from "../../utils/filePath.js";

class AuthModel {
  static async login({ input }) {
    const users = await readFromLocalFile(usersFilePath);
    const { email, password } = input;

    const user = users.find((user) => user.email === email);
    const isPasswordCorrect = !user
      ? false
      : await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) return false;

    return user;
  }
}

export { AuthModel };
