import { Router } from "express";
import { ProductController } from "../controllers/products.js";

const createProductRouter = ({ productModel }) => {
  const productsRouter = Router();

  const productController = new ProductController({ productModel });

  productsRouter.get("/", productController.getAll);
  productsRouter.get("/:id", productController.findOne);

  productsRouter.post("/", productController.create);
  productsRouter.patch("/:id", productController.partialUpdate);
  productsRouter.delete("/:id", productController.delete);

  return productsRouter;
};

export { createProductRouter };
