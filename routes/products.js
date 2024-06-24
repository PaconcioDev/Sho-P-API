import { Router } from "express";
import { checkAdminRole } from "../middlewares/auth.js";
import { ProductController } from "../controllers/products.js";
import { handleValidationError } from "../middlewares/validation.js";
import { productSchema } from "../schemas/products.js";

const createProductRouter = ({ productModel }) => {
  const productsRouter = Router();

  const productController = new ProductController({ productModel });

  productsRouter.get("/", productController.getAll);
  productsRouter.get("/:id", productController.findOne);

  productsRouter.post(
    "/",
    checkAdminRole,
    handleValidationError(productSchema, "body"),
    productController.create
  );
  productsRouter.patch(
    "/:id",
    checkAdminRole,
    handleValidationError(productSchema, "body", true),
    productController.update
  );
  
  productsRouter.patch("/delete/:id", checkAdminRole, productController.delete);

  return productsRouter;
};

export { createProductRouter };
