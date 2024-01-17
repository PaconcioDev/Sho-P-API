import { createApp } from "./app.js";
import { ProductModel } from "./models/mysql/products.js";
import { CategoryModel } from "./models/mysql/categories.js";
import { UserModel } from "./models/mysql/user.js";
createApp({
  productModel: ProductModel,
  categoryModel: CategoryModel,
  userModel: UserModel,
});
