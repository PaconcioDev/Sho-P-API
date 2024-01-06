import express from "express";
import cors from "cors";
import { routerApi } from "./routes/index.js";
import { options } from "./utils/options.js";
import { config } from "./config.js";

const createApp = ({ productModel, categoryModel }) => {
  const app = express();

  app.use(cors(options));
  app.disable("x-powered-by");
  app.use(express.json());

  routerApi(app, productModel, categoryModel);

  app.listen(config.port, () => {
    console.log(`Listening on port http://localhost:${config.port}`);
  });
};

export { createApp };
