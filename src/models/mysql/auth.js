import { connection } from './index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { mailContent } from '../../utils/mailContent.js';
import { config } from '../../config/config.js';

class AuthModel {
  static async login ({ input }) {
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
      role: user.role
    };

    const token = jwt.sign(userForToken, config.jwtSecret, {
      expiresIn: 60 * 60 * 24 * 7
    });

    return {
      user,
      token
    };
  }

  static async checkExpiredToken ({ token }) {
    try {
      const isExpired = jwt.verify(token, config.jwtSecret, (err, res) => {
        if (err) return true;
        return false;
      });

      return isExpired;
    } catch (error) {
      console.error(error);
    }
  }

  static async changePassword ({ currentPassword, newPassword, id }) {
    const [user] = await connection.query(
      `
      SELECT
        BIN_TO_UUID(u.id) as id,
        u.role,
        u.name,
        u.last_name AS lastName,
        u.email,
        u.password,
        u.phone
      FROM user AS u
      WHERE id = UUID_TO_BIN(?)
      `,
      [id]
    );
    if (!user) return false;

    const isCurrentPasswordCorrect = await bcrypt.compare(currentPassword, user[0].password);
    if (!isCurrentPasswordCorrect) {
      return {
        message: 'Wrong password'
      };
    }

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
      throw new Error('Error changing password');
    }

    return user;
  }

  static async recoverPassword ({ newPassword, id }) {
    const [user] = await connection.query(
      `
      SELECT
        BIN_TO_UUID(u.id) as id,
        u.role,
        u.name,
        u.last_name AS lastName,
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
      throw new Error('Error changing password');
    }

    return user;
  }

  static async sendPasswordEmail ({ email }) {
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

    if (!user || user.length <= 0) return false;

    const userId = user[0].id;
    const userEmail = user[0].email;

    const payload = { sub: userId };

    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '5min'
    });

    const link = `https://sho-p-web.vercel.app/account/recovery/${token}`;
    const html = mailContent(link);

    const mail = {
      from: `${config.mailAddress}`,
      to: `${userEmail}`,
      subject: 'Sho-P password recovery',
      html
    };

    const rta = await this.sendMail(mail);
    return rta;
  }

  static async sendMail (infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: `${config.mailAddress}`,
        pass: `${config.mailPassword}`
      }
    });

    await transporter.sendMail(infoMail);
    return true;
  }
}

export { AuthModel };
