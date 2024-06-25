import { createApp } from './app.js';
import { ProductModel, restoreDeletedProducts } from './models/local-file-system/products.js';
import { CategoryModel, restoreDeletedCategories } from './models/local-file-system/categories.js';
import { UserModel } from './models/local-file-system/users.js';
import { AuthModel } from './models/local-file-system/auth.js';
import { OrderModel } from './models/local-file-system/orders.js';
createApp({
  productModel: ProductModel,
  restoreDeletedProducts,
  restoreDeletedCategories,
  categoryModel: CategoryModel,
  userModel: UserModel,
  authModel: AuthModel,
  orderModel: OrderModel
});
