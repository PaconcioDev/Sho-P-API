import { Router } from "express";
import { products } from "../services/products.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  const findProducts = await products;
  res.json(findProducts);
});

productsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await products.find((product) => product.id === id);
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  res.json(product);
});

export { productsRouter };
