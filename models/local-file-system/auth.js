import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { config } from "../../config/config.js";
import {
  readFromLocalFile,
  writeToLocalFile,
} from "../../utils/readAndWriteLocal.js";
import { usersFilePath } from "../../utils/filePath.js";
import { encryptPassword } from "../../utils/encryptPassoword.js";

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
      expiresIn: 60 * 60 * 24 * 7,
    });

    return {
      user,
      token,
    };
  }

  static async changePassword({ newPassword, id }) {
    const users = await readFromLocalFile(usersFilePath);
    const hash = await encryptPassword(newPassword);

    const userIndex = users.findIndex((user) => user.id === id);

    if (!userIndex) return false;

    users[userIndex] = {
      ...users[userIndex],
      password: hash,
    };

    await writeToLocalFile(usersFilePath, users);
    return true;
  }

  static async recoverPassword({ email }) {
    const users = await readFromLocalFile(usersFilePath);
    const user = users.find((user) => user.email === email.email);

    if (!user) return false;

    const payload = {sub: user.id}; 
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: "10min",
    });

    const link = `https://sho-p.com/recovery?token=${token}`;
    const mail = {
      from: `${config.mailAddress}`,
      to: `${user.email}`,
      subject: "Sho-P password recovery",
      html: `<b>Enter this link to recover your password: ${link}</b>`,
    };

    const rta = await this.sendMail(mail);
    return rta;
  }

  static async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: `${config.mailAddress}`,
        pass: `${config.mailPassword}`,
      },
    });

    await transporter.sendMail(infoMail);
    return true;
  }
}

export { AuthModel };
