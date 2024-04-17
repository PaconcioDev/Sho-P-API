import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { config } from "../../config/config.js";
import { usersFilePath } from "../../utils/filePath.js";
import {
  readFromLocalFile,
  writeToLocalFile,
} from "../../utils/readAndWriteLocal.js";
import { mailContent } from "../../utils/mailContent.js";

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
    const hash = await bcrypt.hash(newPassword, 10);

    const userIndex = users.findIndex((user) => user.id === id);

    if (!userIndex) return false;

    users[userIndex] = {
      ...users[userIndex],
      password: hash,
    };

    await writeToLocalFile(usersFilePath, users);
    return true;
  }

  static async sendPasswordEmail({ email }) {
    const users = await readFromLocalFile(usersFilePath);
    const user = users.find((user) => user.email === email.email);

    if (!user) return false;

    const payload = { sub: user.id };

    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: "5min",
    });

    const link = `http://localhost:5173/account/recovery/${token}`;
    const html = mailContent(link);

    const mail = {
      from: `${config.mailAddress}`,
      to: `${user.email}`,
      subject: "Sho-P password recovery",
      html: html,
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
