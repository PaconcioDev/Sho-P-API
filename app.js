import express from "express";
import cors from "cors";
import { routerApi } from "./routes/index.js";
import { options } from "./utils/options.js";
import { config } from "./config/config.js";

const createApp = ({ productModel, categoryModel, userModel, authModel }) => {
  const app = express();

  app.use(cors(options));
  app.disable("x-powered-by");
  app.use(express.json());

  routerApi(app, productModel, categoryModel, userModel, authModel);

  app.listen(config.port, () => {
    console.log(`Listening on port http://localhost:${config.port}`);
  });
};

export { createApp };
