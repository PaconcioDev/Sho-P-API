import { randomUUID } from "node:crypto";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { isDuplicatePhoneOrEmail } from "../../utils/isDuplicatePhoneOrEmail.js";
import { encryptPassword } from "../../utils/encryptPassword.js";
import {
  readFromLocalFile,
  writeToLocalFile,
} from "../../utils/readAndWriteLocal.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const usersFilePath = resolve(__dirname, "../../local-file-data/users.json");

class AuthModel {
  static async signUp({ input }) {
    const users = await readFromLocalFile(usersFilePath);

    const isDuplicate = isDuplicatePhoneOrEmail({
      usersArr: users,
      phone: input.phone,
      email: input.email,
    });

    if (isDuplicate === "phone") return "phone";
    if (isDuplicate === "email") return "email";

    const hash = await encryptPassword({ password: input.password });

    
    const newUser = {
      id: randomUUID(),
      ...input,
      password: hash,
    };
    
    users.push(newUser);
    await writeToLocalFile(usersFilePath, users);

    // eslint-disable-next-line no-unused-vars
    const { password, ...cleanedUser } = newUser;

    return cleanedUser;
  }

  //TODO: static async signIn() {}
}

export { AuthModel };
