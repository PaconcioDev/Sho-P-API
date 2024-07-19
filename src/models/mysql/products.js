import { connection } from './index.js';

const restoreDeletedProducts = async () => {
  try {
    await connection.query(
      `
      UPDATE product
      SET deleted_at = NULL
      WHERE deleted_at IS NOT NULL AND deleted_at < NOW() - INTERVAL 1 HOUR;
      `
    );
  } catch (error) {
    throw new Error('Error restoring product');
  }
};

class ProductModel {
  static async getAll () {
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
      WHERE p.deleted_at IS NULL
      ;
      `
    );

    return products;
  }

  static async findOne ({ id }) {
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
      WHERE p.id = UUID_TO_BIN(?) AND p.deleted_at IS NULL
      LIMIT 1;
      `,
      [id]
    );

    return product[0];
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { name, description, price, image, category_id } = input;

    const [uuidResult] = await connection.query('SELECT UUID() uuid;');
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        `INSERT INTO product (id, name, description, price, image,  category_id)
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?);`,
        // eslint-disable-next-line camelcase
        [name, description, price, image, category_id]
      );
    } catch (e) {
      throw new Error('Error creating product');
    }

    const product = await this.findOne({ id: uuid });
    return product;
  }

  static async update ({ id, input }) {
    try {
      await connection.query(
        `
        UPDATE product
        SET ?
        WHERE id = UUID_TO_BIN(?) AND deleted_at IS NULL
        ;
        `,
        [input, id]
      );
    } catch (e) {
      throw new Error('Error updating the product');
    }

    return this.findOne({ id });
  }

  static async delete ({ id }) {
    try {
      const [products] = await connection.query(
        `
        UPDATE product
        SET deleted_at = NOW()
        WHERE id = UUID_TO_BIN(?)
        ;
        `,
        [id]
      );
      return products.affectedRows > 0;
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting the product');
    }
  }
}

export { ProductModel, restoreDeletedProducts };
