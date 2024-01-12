import { Router } from "express";
import { checkAdminRole } from "../middlewares/auth.js";
import { ProductController } from "../controllers/products.js";

const createProductRouter = ({ productModel }) => {
  const productsRouter = Router();

  const productController = new ProductController({ productModel });

  productsRouter.get("/", productController.getAll);
  productsRouter.get("/:id", productController.findOne);

  productsRouter.post("/", checkAdminRole, productController.create);
  productsRouter.patch("/:id", checkAdminRole, productController.update);
  productsRouter.delete("/:id", checkAdminRole, productController.delete);

  return productsRouter;
};

export { createProductRouter };
