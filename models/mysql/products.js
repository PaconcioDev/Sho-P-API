import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "rootpassword",
  database: "shopdb",
};

const connection = await mysql.createConnection(config);

class ProductModel {
  static async getAll() {
    const [products] = await connection.query(
      "SELECT *, BIN_TO_UUID(id) id FROM product;"
    );
    return products;
  }

  static async findOne({ id }) {
    const [products] = await connection.query(
      `SELECT *, BIN_TO_UUID(id) id 
      FROM product
      WHERE id = UUID_TO_BIN(?);`,
      [id]
    );

    if (products.length === 0) return false;

    return products;
  }

  static async create({ input }) {
    const { name, description, price, image } = input;

    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        `INSERT INTO product (id, name, description, price, image)
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?);`,
        [name, description, price, image]
      );
    } catch (e) {
      throw new Error("Error creating movie");
    }

    const [products] = await connection.query(
      `SELECT *, BIN_TO_UUID(id) id 
      FROM product 
      WHERE id = UUID_TO_BIN("${uuid}");`
    );

    return products[0];
  }

  static async update({ id, input }) {
    this.findOne(id);

    try {
      await connection.query(
        `UPDATE product
        SET ?
        WHERE id = UUID_TO_BIN(?);`,
        [input, id]
      );
    } catch (e) {
      throw new Error("Error updating the movie");
    }

    const [products] = await connection.query(
      `SELECT *, BIN_TO_UUID(id) id 
      FROM product 
      WHERE id = UUID_TO_BIN(?);`,
      [id]
    );

    return products[0];
  }

  static async delete({ id }) {
    this.findOne(id);

    const [products] = await connection.query(
      `DELETE FROM product
      WHERE id = UUID_TO_BIN(?);`,
      [id]
    );

    return products.affectedRows > 0;
  }
}

export { ProductModel };
