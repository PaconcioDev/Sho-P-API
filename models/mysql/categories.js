import mysql from 'mysql2/promise';
import { config } from '../../config/config.js';

const connection = await mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  port: config.dbPort,
  password: config.dbPassword,
  database: config.dbName
});

const restoreDeleteCategories = async () => {
  try {
    await connection.query(
      `
      UPDATE category
      SET deleted_at = NULL
      WHERE deleted_at IS NOT NULL AND deleted_at < NOW() - INTERVAL 1 HOUR;
      `
    );
  } catch (error) {
    throw new Error('Error restoring category');
  }
};

class CategoryModel {
  static async getAll () {
    const [categories] = await connection.query(
      `
      SELECT * 
      FROM category
      WHERE deleted_at is NULL
      ORDER BY id
      ASC
      ;
      `
    );

    return categories;
  }

  static async findOne ({ id }) {
    const [category] = await connection.query(
      `
      SELECT * 
      FROM category
      WHERE id = ? AND deleted_at IS NULL
      LIMIT 1;
      `,
      [id]
    );

    return category[0];
  }

  static async findProducts ({ id }) {
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

  static async create ({ input }) {
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
      throw new Error('Error creating category');
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

  static async update ({ id, input }) {
    try {
      await connection.query(
        `
        UPDATE category
        SET ?
        WHERE id = ? AND deleted_at IS NULL
        ;
        `,
        [input, id]
      );
    } catch (error) {
      throw new Error('Error updating category');
    }

    return this.findOne({ id });
  }

  static async delete ({ id }) {
    try {
      const [categories] = await connection.query(
        `
        UPDATE category
        SET deleted_at = NOW()
        WHERE id = ?
        ;
        `,
        [id]
      );

      return categories.affectedRows > 0;
    } catch (error) {
      throw new Error('Error deleting category');
    }
  }
}

export { CategoryModel, restoreDeleteCategories };
