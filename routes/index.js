import { Router } from "express";
import { createProductRouter } from "./products.js";
import { createCategoryRouter } from "./categories.js";
import { createUserRouter } from "./user.js";

function routerApi(app, productModel, categoryModel, userModel) {
  const mainRouter = Router();
  app.use("/shop-api/v2", mainRouter);

  mainRouter.use("/products", createProductRouter({ productModel }));
  mainRouter.use("/categories", createCategoryRouter({ categoryModel }));
  mainRouter.use("/users", createUserRouter({ userModel }));
}

export { routerApi };
