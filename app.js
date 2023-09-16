import express from "express";
import { routerApi } from "./routes/index.js";

/* global process */
const port = process.env.PORT || 3030;
const app = express();

routerApi(app);

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});