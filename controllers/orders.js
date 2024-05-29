class OrderController {
  constructor({ orderModel }) {
    this.orderModel = orderModel;
  }

  getAll = async (req, res) => {
    const orders = await this.orderModel.getAll();
    res.json(orders);
  };

  findOrdersByUserId = async (req, res) => {
    const { id } = req.params;
    const order = await this.orderModel.findOrdersByUserId({ id });

    res.json(order);
  };

  findOrderById = async (req, res) => {
    const { id } = req.params;
    const order = await this.orderModel.findOrderById({ id });

    res.json(order);
  };

  create = async (req, res) => {
    const { id } = req.params;
    const { validatedData } = req;
    const newOrder = await this.orderModel.create({ input: validatedData, userId: id });
    res.status(201).json(newOrder);
  };
}

export { OrderController };