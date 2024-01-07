import { require } from "../../utils/require.js";
import { randomUUID } from "node:crypto";

const users = require("../local-file-data/users.json");

class UserModel {
  static async create({ input }) {
    // eslint-disable-next-line no-unused-vars
    const { password, ...cleanedInput } = input;

    const newUser = {
      id: randomUUID(),
      ...cleanedInput,
    };

    const usersArr = await this.getAll();

    const existingUserIndex = usersArr.findIndex(
      (user) => user.phone === newUser.phone || user.email === newUser.email
    );

    if (existingUserIndex !== -1) {
      if (usersArr[existingUserIndex].phone === newUser.phone) {
        return "phone";
      } else {
        return "email";
      }
    }

    users.push(newUser);
    return newUser;
  }

  static async getAll() {
    // eslint-disable-next-line no-unused-vars
    const usersWithoutPassword = users.map(({ password, ...user }) => user);

    return usersWithoutPassword;
  }

  static async findOne({ id }) {
    return users.find((user) => user.id === id);
  }
}

export { UserModel };
