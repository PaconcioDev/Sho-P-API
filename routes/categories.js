import { Router } from "express";
import { CategoryController } from "../controllers/categories.js";

const createCategoryRouter = ({ categoryModel }) => {
  const categoriesRouter = Router();

  const categoryController = new CategoryController({ categoryModel });

  categoriesRouter.get("/", categoryController.getAll);
  categoriesRouter.get("/:id", categoryController.findOne);
  categoriesRouter.get("/:id/products", categoryController.findProducts);

  return categoriesRouter;
};

export { createCategoryRouter };
