import { require } from "../../utils/require.js";
import { randomUUID } from "node:crypto";

const users = require("../local-file-data/users.json");

class UserModel {
  static async getAll() {
    // eslint-disable-next-line no-unused-vars
    const usersWithoutPassword = users.map(({ password, ...user }) => user);

    return usersWithoutPassword;
  }

  static async findOne({ id }) {
    return users.find((user) => user.id === id);
  }

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

  static async update({ id, input }) {
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return false;

    if (input.phone || input.email) {
      const usersArr = await this.getAll();
  
      const existingUserIndex = usersArr.findIndex(
        (user) => user.phone === input.phone || user.email === input.email
      );
  
      if (existingUserIndex !== -1) {
        if (usersArr[existingUserIndex].phone === input.phone) {
          return "phone";
        } else if (usersArr[existingUserIndex].email === input.email) {
          return "email";
        }
      }
    }
    
    // eslint-disable-next-line no-unused-vars
    const {password, ...cleanedUser} = users[userIndex];

    if (input.password) {
      // eslint-disable-next-line no-unused-vars
      const { password, ...cleanedInput } = input;
      users[userIndex] = {
        ...cleanedUser,
        ...cleanedInput,
      };

      return users[userIndex];
    }

    users[userIndex] = {
      ...cleanedUser,
      ...input,
    };

    return users[userIndex];
  }

  static async delete({ id }) {
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return false;

    users.splice(userIndex, 1);
    return true;
  }

  
}

export { UserModel };
