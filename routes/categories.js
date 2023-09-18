import { Router } from "express";
import { CategoryController } from "../controllers/categories.js";

const categoriesRouter = Router();

categoriesRouter.get("/", CategoryController.getAll);
categoriesRouter.get("/:id", CategoryController.findOne);
categoriesRouter.get("/:id/products", CategoryController.findProducts);

export { categoriesRouter };
