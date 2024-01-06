import { createApp } from "./app.js";
import { ProductModel } from "./models/local-file-system/products.js";
import { CategoryModel } from "./models/local-file-system/categories.js";
createApp({ productModel: ProductModel, categoryModel: CategoryModel });
