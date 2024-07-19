import { Router } from 'express';
import { createProductRouter } from './products.js';
import { createCategoryRouter } from './categories.js';
import { createUserRouter } from './user.js';
import { createAuthRouter } from './auth.js';
import { createOrderRouter } from './orders.js';
import { createImageRouter } from './images.js';

function routerApi (app, productModel, categoryModel, userModel, authModel, orderModel, imageModel) {
  const mainRouter = Router();
  app.use('/', mainRouter);

  mainRouter.use('/products', createProductRouter({ productModel }));
  mainRouter.use('/categories', createCategoryRouter({ categoryModel }));
  mainRouter.use('/users', createUserRouter({ userModel }));
  mainRouter.use('/auth', createAuthRouter({ authModel }));
  mainRouter.use('/orders', createOrderRouter({ orderModel }));
  mainRouter.use('/images', createImageRouter({ imageModel }));
}

export { routerApi };
