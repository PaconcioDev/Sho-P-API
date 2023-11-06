import { createApp } from "./app.js";
import { ProductModel } from "./models/local-file-system/products.js";
createApp({ productModel: ProductModel });
