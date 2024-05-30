import { randomUUID } from "node:crypto";
import { ordersFilePath } from "../../utils/filePath.js";
import { readFromLocalFile, writeToLocalFile } from "../../utils/readAndWriteLocal.js";

class OrderModel {
  static async getAll () {
    const orders = await readFromLocalFile(ordersFilePath);
    return orders;
  }

  static async findOrdersByUserId({ id }) {
    const orders = await readFromLocalFile(ordersFilePath);
    return orders.filter(order => order.userId.toString() === id);
  }

  static async findOrderById({ id }) {
    const orders = await readFromLocalFile(ordersFilePath);
    return orders.find(order => order.id.toString() === id);
  }

  static async create({ input, userId }) {
    const orders = await readFromLocalFile(ordersFilePath);

    const newOrderItems = input.orderItems.map(({ id, ...cleanedItem }) => ({
      productId: id,
      ...cleanedItem,
    }));

    const newOrder = {
      id: randomUUID(),
      userId,
      orderItems: [...newOrderItems],
      date: new Date().toLocaleDateString(),
      total: input.total
    };

    orders.push(newOrder);

    await writeToLocalFile(ordersFilePath, orders);
    return newOrder;
  }
}

export { OrderModel };