import { createApp } from './app.js';
import { ProductModel, restoreDeleteProducts } from './models/mysql/products.js';
import { CategoryModel } from './models/mysql/categories.js';
import { UserModel } from './models/mysql/user.js';
import { AuthModel } from './models/mysql/auth.js';
import { OrderModel } from './models/mysql/orders.js';
createApp({
  productModel: ProductModel,
  restoreDeleteProducts,
  categoryModel: CategoryModel,
  userModel: UserModel,
  authModel: AuthModel,
  orderModel: OrderModel
});
