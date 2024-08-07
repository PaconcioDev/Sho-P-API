import { createApp } from './app.js';
import { ProductModel, restoreDeletedProducts } from './models/mysql/products.js';
import { CategoryModel, restoreDeletedCategories } from './models/mysql/categories.js';
import { UserModel } from './models/mysql/user.js';
import { AuthModel } from './models/mysql/auth.js';
import { OrderModel } from './models/mysql/orders.js';
import { ImageModel } from './models/mysql/images.js';
createApp({
  productModel: ProductModel,
  restoreDeletedProducts,
  restoreDeletedCategories,
  categoryModel: CategoryModel,
  userModel: UserModel,
  authModel: AuthModel,
  orderModel: OrderModel,
  imageModel: ImageModel
});
