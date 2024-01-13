import { Router } from "express";
import { CategoryController } from "../controllers/categories.js";
import { checkAdminRole } from "../middlewares/auth.js";

const createCategoryRouter = ({ categoryModel }) => {
  const categoriesRouter = Router();

  const categoryController = new CategoryController({ categoryModel });

  categoriesRouter.get("/", categoryController.getAll);
  categoriesRouter.get("/:id", categoryController.findOne);
  categoriesRouter.get("/:id/products", categoryController.findProducts);

  categoriesRouter.post("/", checkAdminRole, categoryController.create);
  categoriesRouter.patch("/:id", checkAdminRole, categoryController.update);
  categoriesRouter.delete("/:id", checkAdminRole,  categoryController.delete);

  return categoriesRouter;
};

export { createCategoryRouter };
