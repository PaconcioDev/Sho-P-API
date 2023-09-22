import { Router } from "express";
import { ProductController } from "../controllers/products.js";

const productsRouter = Router();

productsRouter.get("/", ProductController.getAll);
productsRouter.get("/:id", ProductController.findOne);

productsRouter.post("/", ProductController.create);

export { productsRouter };
