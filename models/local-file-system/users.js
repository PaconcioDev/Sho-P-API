import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.js";
import { usersFilePath } from "../../utils/filePath.js";
import {
  readFromLocalFile,
  writeToLocalFile,
} from "../../utils/readAndWriteLocal.js";

class UserModel {
  static async getAll() {
    const users = await readFromLocalFile(usersFilePath);
    // eslint-disable-next-line no-unused-vars
    const usersWithoutPassword = users.map(({ password, ...user }) => user);
    return usersWithoutPassword;
  }

  static async findOne({ id }) {
    const users = await this.getAll();
    return users.find((user) => user.id === id);
  }

  static async create({ input }) {
    const isDuplicate = await this.isDuplicatePhoneOrEmail({
      phone: input.phone,
      email: input.email,
    });

    if (isDuplicate === "phone") return "phone";
    if (isDuplicate === "email") return "email";

    const hash = await bcrypt.hash(input.password, 10);

    const formatName = capitalizeFirstLetter(input.name);
    const formatLastName = capitalizeFirstLetter(input.lastName);

    const newUser = {
      id: randomUUID(),
      role: "customer",
      name: formatName,
      lastName: formatLastName,
      email: input.email,
      password: hash,
      phone: !input.phone ? "" : input.phone,
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
}

export { UserModel };
