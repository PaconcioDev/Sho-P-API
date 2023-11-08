import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "rootpassword",
  database: "shopdb",
};

const connection = await mysql.createConnection(config);

class CategoryModel {
  static async getAll() {
    const [categories] = await connection.query(
      `
      SELECT * 
      FROM category
      ;
      `
    );

    return categories;
  }

  static async findOne({ id }) {
    const [categories] = await connection.query(
      `
      SELECT * 
      FROM category
      WHERE id = ?
      ;
      `,
      [id]
    );

    if (categories.length === 0) return false;

    return categories[0];
  }

  static async findProducts({ id }) {
    const [products] = await connection.query(
      `
      SELECT *, BIN_TO_UUID(id) id
      FROM product
      WHERE category_id = ?
      ;
      `,
      [id]
    );

    return products;
  }
}

export { CategoryModel };
