import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";
import { readFromLocalFile, writeToLocalFile} from "../../utils/readAndWriteLocal.js";
import { usersFilePath } from "../../utils/filePath.js";

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

    const hash = await this.encryptPassword({ password: input.password });

    const newUser = {
      id: randomUUID(),
      ...input,
      password: hash,
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

    if (input.password) {
      const hash = await this.encryptPassword({ password: input.password});

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

  static async isDuplicatePhoneOrEmail({ phone, email }) {
    const usersArr = await this.getAll();

    if (phone && usersArr.some((user) => user.phone === phone)) return "phone";
    if (email && usersArr.some((user) => user.email === email)) return "email";
    return null;
  }

  static async encryptPassword({ password }) {
    return await bcrypt.hash(password, 10);
  }
}

export { UserModel };
