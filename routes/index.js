import { Router } from "express";
import { createProductRouter } from "./products.js";
import { createCategoryRouter } from "./categories.js";

function routerApi(app, productModel, categoryModel) {
  const mainRouter = Router();
  app.use("/shop-api/v2", mainRouter);

  mainRouter.use("/products", createProductRouter({ productModel }));
  mainRouter.use("/categories", createCategoryRouter({ categoryModel }));
}

export { routerApi };
