import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config/config.js";
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

    const userForToken = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(userForToken, config.jwtSecret, {
      expiresIn: 60 * 60 * 24 * 7
    });

    return {
      user,
      token,
    };
  }
}

export { AuthModel };
