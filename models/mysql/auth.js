import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { config } from "../../config/config.js";

const connection = await mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  port: config.dbPort,
  password: config.dbPassword,
  database: config.dbName,
});

class AuthModel {
  static async login({ input }) {
    const [users] = await connection.query(
      `
      SELECT 
        BIN_TO_UUID(u.id) AS id,
        u.role,
        u.name,
        u.email,
        u.password 
      FROM user AS u
      ;
      `
    );
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
    const [user] = await connection.query(
      `
      SELECT
        BIN_TO_UUID(u.id) as id,
        u.role,
        u.name,
        u.last_name,
        u.email,
        u.phone
      FROM user AS u
      WHERE id = UUID_TO_BIN(?)
      `,
      [id]
    );

    if (!user) return false;

    const hash = await bcrypt.hash(newPassword, 10);

    try {
      await connection.query(
        `
        UPDATE user
        SET password = ?
        WHERE id = UUID_TO_BIN(?)
        `,
        [hash, id]
      );
    } catch (error) {
      throw new Error("Error changing password");
    }

    return user;
  }

  static async recoverPassword({ email }) {
    const [user] = await connection.query(
      `
      SELECT 
        BIN_TO_UUID(u.id) as id,
        u.email
      FROM user AS u
      WHERE email = ?
      ;
      `,
      [email.email]
    );

    if (!user) return false;

    const userId = user[0].id;
    const userEmail = user[0].email;

    const payload = { sub: userId };

    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: "10min",
    });

    const link = `https://sho-p.com/recovery?token=${token}`;

    const mail = {
      from: `${config.mailAddress}`,
      to: `${userEmail}`,
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
