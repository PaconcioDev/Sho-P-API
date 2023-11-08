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
      ORDER BY id
      ASC
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

  static async create({ input }) {
    try {
      await connection.query(
        `
        INSERT INTO category (name)
        VALUES
          (?)
        ;
        `,
        [input.name]
      );
    } catch (error) {
      throw new Error("Error creating category");
    }

    const [categories] = await connection.query(
      `
      SELECT * 
      FROM category
      WHERE name = ?
      ;
      `,
      [input.name]
    );

    return categories[0];
  }

  static async update({ id, input }) {
    this.findOne({ id });

    try {
      await connection.query(
        `
        UPDATE category
        SET ?
        WHERE id = ?
        ;
        `,
        [input, id]
      );
    } catch (error) {
      throw new Error("Error updating category");
    }

    return this.findOne({ id });
  }

  static async delete({ id }) {
    this.findOne({ id });

    const [products] = await connection.query(
      `
      DELETE FROM category
      WHERE id = ?
      ;
      `,
      [id]
    );

    return products.affectedRows > 0;
  }
}

export { CategoryModel };
