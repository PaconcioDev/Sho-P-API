import express from "express";
import cors from "cors";
import { routerApi } from "./routes/index.js";
import { options } from "./utils/options.js";

/* global process */
const createApp = ({ productModel, categoryModel }) => {
  const port = process.env.PORT || 3030;
  const app = express();

  app.use(cors(options));
  app.disable("x-powered-by");
  app.use(express.json());

  routerApi(app, productModel, categoryModel);

  app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
  });
};

export { createApp };
