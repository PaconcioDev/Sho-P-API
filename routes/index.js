import { Router } from "express";
import { productsRouter } from "./products.js";
import { categoriesRouter } from "./categories.js";

function routerApi(app) {
  const mainRouter = Router();
  app.use("/shop-api/v1", mainRouter);

  mainRouter.use("/products", productsRouter);
  mainRouter.use("/categories", categoriesRouter);
}

export { routerApi };
