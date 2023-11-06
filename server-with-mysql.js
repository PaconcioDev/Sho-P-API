import { createApp } from "./app.js";
import { ProductModel } from "./models/mysql/products.js";
createApp({ productModel: ProductModel });
