import { Router } from "express";
import { createProductRouter } from "./products.js";
import { categoriesRouter } from "./categories.js";

function routerApi(app, productModel) {
  const mainRouter = Router();
  app.use("/shop-api/v2", mainRouter);

  mainRouter.use(
    "/products",
    createProductRouter({ productModel })
  );
  mainRouter.use("/categories", categoriesRouter);
}

export { routerApi };
