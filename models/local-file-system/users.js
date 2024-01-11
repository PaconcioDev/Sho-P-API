import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import { isDuplicatePhoneOrEmail } from "../../utils/isDuplicatePhoneOrEmail.js";
import { encryptPassword } from "../../utils/encryptPassword.js";
import {
  readFromLocalFile,
  writeToLocalFile,
} from "../../utils/readAndWriteLocal.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const usersFilePath = resolve(__dirname, "../../local-file-data/users.json");

class UserModel {
  static async getAll() {
    const users = await readFromLocalFile(usersFilePath);
    // eslint-disable-next-line no-unused-vars
    const usersWithoutPassword = users.map(({ password, ...user }) => user);

    return usersWithoutPassword;
  }

  static async findOne({ id }) {
    const users = await readFromLocalFile(usersFilePath);
    const user = users.find((user) => user.id === id);
    // eslint-disable-next-line no-unused-vars
    const { password, ...cleanedUser } = user;

    return cleanedUser;
  }

  static async update({ id, input }) {
    const users = await readFromLocalFile(usersFilePath);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return false;

    if (input.phone || input.email) {
      const isDuplicate = isDuplicatePhoneOrEmail({
        usersArr: users,
        phone: input.phone,
        email: input.email,
      });

      if (isDuplicate === "phone") return "phone";
      if (isDuplicate === "email") return "email";
    }

    if (input.password) {
      const hash = await encryptPassword({ password: input.password });

      users[userIndex] = {
        ...users[userIndex],
        ...input,
        password: hash,
      };

      await writeToLocalFile(usersFilePath, users);
      // eslint-disable-next-line no-unused-vars
      const { password, ...cleanedUser } = users[userIndex];
      return cleanedUser;
    }

    users[userIndex] = {
      ...users[userIndex],
      ...input,
    };

    await writeToLocalFile(usersFilePath, users);
    // eslint-disable-next-line no-unused-vars
    const { password, ...cleanedUser } = users[userIndex];
    return cleanedUser;
  }

  static async delete({ id }) {
    const users = await readFromLocalFile(usersFilePath);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return false;

    users.splice(userIndex, 1);
    await writeToLocalFile(usersFilePath, users);
    return true;
  }
}

export { UserModel };
