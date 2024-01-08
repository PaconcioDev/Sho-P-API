import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
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
    return users.find((user) => user.id === id);
  }

  static async create({ input }) {
    const isDuplicate = await this.isDuplicatePhoneOrEmail({
      phone: input.phone,
      email: input.email,
    });

    if (isDuplicate === "phone") return "phone";
    if (isDuplicate === "email") return "email";

    const newUser = {
      id: randomUUID(),
      ...input,
    };

    const users = await readFromLocalFile(usersFilePath);
    users.push(newUser);
    await writeToLocalFile(usersFilePath, users);

    // eslint-disable-next-line no-unused-vars
    const { password, ...cleanedUser } = newUser;
    return cleanedUser;
  }

  static async update({ id, input }) {
    const users = await readFromLocalFile(usersFilePath);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return false;
    
    if (input.phone || input.email) {
      const isDuplicate = await this.isDuplicatePhoneOrEmail({
        phone: input.phone,
        email: input.email,
      });

      if (isDuplicate === "phone") return "phone";
      if (isDuplicate === "email") return "email";
    }

    // eslint-disable-next-line no-unused-vars
    const { password, ...cleanedUser } = users[userIndex];

    if (input.password) {
      // eslint-disable-next-line no-unused-vars
      const { password, ...cleanedInput } = input;
      users[userIndex] = {
        ...cleanedUser,
        ...cleanedInput,
      };

      await writeToLocalFile(usersFilePath, users);
      return users[userIndex];
    }

    users[userIndex] = {
      ...cleanedUser,
      ...input,
    };

    await writeToLocalFile(usersFilePath, users);
    return users[userIndex];
  }

  static async delete({ id }) {
    const users = await readFromLocalFile(usersFilePath);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return false;

    users.splice(userIndex, 1);
    await writeToLocalFile(usersFilePath, users);
    return true;
  }

  static async isDuplicatePhoneOrEmail({ phone, email }) {
    const usersArr = await this.getAll();

    if (phone && usersArr.some((user) => user.phone === phone)) return "phone";
    if (email && usersArr.some((user) => user.email === email)) return "email";
    return null;
  }
}

export { UserModel };
