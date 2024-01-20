import mysql from "mysql2/promise";
import { config } from "../../config/config.js";

const connection = await mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  port: config.dbPort,
  password: config.dbPassword,
  database: config.dbName,
});

class ProductModel {
  static async getAll() {
    const [products] = await connection.query(
      `
      SELECT 
        BIN_TO_UUID(p.id) AS id, 
        p.name, 
        p.description, 
        p.price, 
        p.image,
        JSON_OBJECT("id", c.id, "name", c.name) AS category
      FROM product AS p
      INNER JOIN category AS c
      ON p.category_id = c.id
      ;
      `
    );

    return products;
  }

  static async findOne({ id }) {
    const [product] = await connection.query(
      `
      SELECT 
        BIN_TO_UUID(p.id) AS id, 
        p.name, 
        p.description, 
        p.price, 
        p.image,
        JSON_OBJECT("id", c.id, "name", c.name) AS category
      FROM product AS p
      INNER JOIN category AS c
      ON p.category_id = c.id
      WHERE p.id = UUID_TO_BIN(?)
      LIMIT 1;
      `,
      [id]
    );

    return product[0];
  }

  static async create({ input }) {
    const { name, description, price, image, category_id } = input;

    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        `INSERT INTO product (id, name, description, price, image, category_id)
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?);`,
        [name, description, price, image, category_id]
      );
    } catch (e) {
      throw new Error("Error creating product");
    }

    const product = await this.findOne({ id: uuid });
    return product;
  }

  static async update({ id, input }) {
    try {
      await connection.query(
        `
        UPDATE product
        SET ?
        WHERE id = UUID_TO_BIN(?)
        ;
        `,
        [input, id]
      );
    } catch (e) {
      throw new Error("Error updating the product");
    }

    return this.findOne({ id });
  }

  static async delete({ id }) {
    try {
      const [products] = await connection.query(
        `DELETE FROM product
        WHERE id = UUID_TO_BIN(?);`,
        [id]
      );
      return products.affectedRows > 0;
    } catch (error) {
      throw new Error("Error deleting the product");
    }
  }
}

export { ProductModel };
