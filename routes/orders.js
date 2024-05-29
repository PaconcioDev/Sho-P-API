import { Router } from "express";
import { OrderController } from "../controllers/orders.js";
import { checkLogin } from "../middlewares/auth.js";
import { handleValidationError } from "../middlewares/validation.js";
import { orderSchema } from "../schemas/orders.js";

const createOrderRouter = ({ orderModel }) => {
  const ordersRouter = Router();

  const orderController = new OrderController({ orderModel });

  ordersRouter.get("/", orderController.getAll);
  ordersRouter.get(
    "/:id", 
    checkLogin,
    orderController.findOrdersByUserId
  );
  ordersRouter.get(
    "/order/:id", 
    orderController.findOrderById
  );
  
  ordersRouter.post(
    "/:id",
    checkLogin,
    handleValidationError(orderSchema, "body"),
    orderController.create
  );
  
  return ordersRouter;
};

export { createOrderRouter };