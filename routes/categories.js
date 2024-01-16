import { Router } from "express";
import { CategoryController } from "../controllers/categories.js";
import { checkAdminRole } from "../middlewares/auth.js";
import { handleValidationError } from "../middlewares/validation.js";
import { categorySchema } from "../schemas/categories.js";

const createCategoryRouter = ({ categoryModel }) => {
  const categoriesRouter = Router();

  const categoryController = new CategoryController({ categoryModel });

  categoriesRouter.get("/", categoryController.getAll);
  categoriesRouter.get("/:id", categoryController.findOne);
  categoriesRouter.get("/:id/products", categoryController.findProducts);

  categoriesRouter.post(
    "/",
    checkAdminRole,
    handleValidationError(categorySchema, "body"),
    categoryController.create
  );
  categoriesRouter.patch(
    "/:id",
    checkAdminRole,
    handleValidationError(categorySchema, "body"),
    categoryController.update
  );
  categoriesRouter.delete("/:id", checkAdminRole, categoryController.delete);

  return categoriesRouter;
};

export { createCategoryRouter };
