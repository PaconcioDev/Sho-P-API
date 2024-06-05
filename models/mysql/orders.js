import mysql from "mysql2/promise";
import { config } from "../../config/config.js";

const connection = await mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  port: config.dbPort,
  password: config.dbPassword,
  database: config.dbName,
});

class OrderModel {
  static async getAll() {
    const [orders] = await connection.query(
      `
        SELECT 
        BIN_TO_UUID(o.id) AS id,
          BIN_TO_UUID(o.user_id) AS userId,
          o.order_items AS orderItems,
          o.order_date AS date,
          o.total
        FROM \`order\` as o
      `
    );
    return orders;
  }

  static async findOrdersByUserId({ id }) {
    const [orders] = await connection.query(
      `
        SELECT 
          BIN_TO_UUID(o.id) AS id,
          BIN_TO_UUID(o.user_id) AS userId,
          o.order_items AS orderItems,
          o.order_date AS date,
          o.total
        FROM \`order\` as o
        WHERE user_id = UUID_TO_BIN(?);
      `,
      [id]
    );

    return orders;
  }

  static async findOrderById({ id }) {
    const [order] = await connection.query(
      `
        SELECT
          BIN_TO_UUID(o.id) AS id,
          BIN_TO_UUID(o.user_id) AS userId,
          o.order_items AS orderItems,
          o.order_date AS date,
          o.total
        FROM \`order\` as o
        WHERE id = UUID_TO_BIN(?);
      `,
      [id]
    );

    return order[0];
  }

  static async create({ input, userId }) {
    const { orderItems, total } = input;
    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;
    const orderDate = new Date().toLocaleDateString();

    const newOrderItems = orderItems.map(({ id, ...cleanedItem }) => ({
      productId: id,
      ...cleanedItem,
    }));

    const orderItemsJson = JSON.stringify(newOrderItems);

    try {
      await connection.query(
        `
          INSERT INTO \`order\` (id, user_id, order_date, order_items, total)
          VALUES (UUID_TO_BIN("${uuid}"), UUID_TO_BIN(?), ?, ?, ?);
        `,
        [userId, orderDate, orderItemsJson, total]
      ); 
    } catch (e) {
      throw new Error(e);
    }

    const order = await this.findOrderById({ id: uuid });
    return order;
  }
}

export { OrderModel };