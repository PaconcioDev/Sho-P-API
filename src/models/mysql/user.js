import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import snakeCaseKeys from 'snakecase-keys';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter.js';
import { config } from '../../config/config.js';

const connection = await mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  port: config.dbPort,
  password: config.dbPassword,
  database: config.dbName
});

class UserModel {
  static async getAll () {
    const [users] = await connection.query(
      `
      SELECT
        BIN_TO_UUID(u.id) AS id, 
        u.role,
        u.name,
        u.last_name,
        u.email,
        u.phone
      FROM user as u
      ;
      `
    );
    return users;
  }

  static async findOne ({ id }) {
    const [user] = await connection.query(
      `
      SELECT
        BIN_TO_UUID(u.id) AS id, 
        u.role,
        u.name,
        u.last_name AS lastName,
        u.email,
        u.phone
      FROM user as u
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1;
      `,
      [id]
    );

    return user[0];
  }

  static async create ({ input }) {
    const isDuplicate = await this.isDuplicatePhoneOrEmail({
      phone: input.phone,
      email: input.email
    });

    if (isDuplicate === 'phone') return 'phone';
    if (isDuplicate === 'email') return 'email';

    const formatName = capitalizeFirstLetter(input.name);
    const formatLastName = capitalizeFirstLetter(input.lastName);

    const [uuidResult] = await connection.query('SELECT UUID() uuid;');
    const [{ uuid }] = uuidResult;

    const hash = await bcrypt.hash(input.password, 10);

    try {
      let query;
      let queryParams;

      if (input.phone) {
        query = `
          INSERT INTO user (id, role, name, last_name, email, password, phone)
          VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);
        `;
        queryParams = [
          input.role,
          formatName,
          formatLastName,
          input.email,
          hash,
          input.phone
        ];
      } else {
        query = `
          INSERT INTO user (id, role, name, last_name, email, password)
          VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?);
        `;
        queryParams = [input.role, formatName, formatLastName, input.email, hash];
      }

      await connection.query(query, queryParams);
    } catch (e) {
      throw new Error('Error creating user');
    }

    const user = await this.findOne({ id: uuid });
    return user;
  }

  static async update ({ id, input }) {
    if (input.phone || input.email) {
      const isDuplicate = await this.isDuplicatePhoneOrEmail({
        phone: input.phone,
        email: input.email
      });

      if (isDuplicate === 'phone') return 'phone';
      if (isDuplicate === 'email') return 'email';
    }

    try {
      const snakeCaseInput = snakeCaseKeys(input);
      await connection.query(
        `
        UPDATE user
        SET ?
        WHERE id = UUID_TO_BIN(?)
        ;
        `,
        [snakeCaseInput, id]
      );
    } catch (e) {
      throw new Error('Error updating user');
    }

    return await this.findOne({ id });
  }

  static async delete ({ id, password }) {
    try {
      const [user] = await connection.query(
        `
        SELECT
          u.password
        FROM user AS u
        WHERE id = UUID_TO_BIN(?)
        `,
        [id]
      );

      if (!user) return false;

      const isCurrentPasswordCorrect = await bcrypt.compare(password, user[0].password);
      if (!isCurrentPasswordCorrect) {
        return {
          message: 'Wrong password'
        };
      }

      await connection.query(
        `
          DELETE FROM \`order\`
          WHERE user_id = UUID_TO_BIN(?);
        `,
        [id]
      );

      const [users] = await connection.query(
        `DELETE FROM user
        WHERE id = UUID_TO_BIN(?);`,
        [id]
      );

      return users.affectedRows > 0;
    } catch (error) {
      throw new Error('Error deleting user');
    }
  }

  static async isDuplicatePhoneOrEmail ({ phone, email }) {
    const usersArr = await this.getAll();

    if (phone && usersArr.some((user) => user.phone === phone)) return 'phone';
    if (email && usersArr.some((user) => user.email === email)) return 'email';

    return null;
  }
}

export { UserModel };
