import { createApp } from "./app.js";
import { ProductModel } from "./models/local-file-system/products.js";
import { CategoryModel } from "./models/local-file-system/categories.js";
import { UserModel } from "./models/local-file-system/users.js";
import { AuthModel } from "./models/local-file-system/auth.js";
createApp({ productModel: ProductModel, categoryModel: CategoryModel, userModel: UserModel, authModel: AuthModel });
