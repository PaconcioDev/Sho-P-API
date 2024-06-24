import express from "express";
import cors from "cors";
import { CronJob } from "cron";
import { routerApi } from "./routes/index.js";
import { options } from "./utils/options.js";
import { config } from "./config/config.js";

const createApp = ({ productModel, restoreDeleteProducts, categoryModel, userModel, authModel, orderModel }) => {
  const app = express();

  app.use(cors(options));
  app.disable("x-powered-by");
  app.use(express.json());

  routerApi(app, productModel, categoryModel, userModel, authModel, orderModel);

  app.listen(config.port, () => {
    console.log(`Listening on port http://localhost:${config.port}`);
  });

  const job = new CronJob("0 * * * *", restoreDeleteProducts);
  job.start();
};

export { createApp };
