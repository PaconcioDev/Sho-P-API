import { Router } from "express";
import { ProductService } from "../services/products.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  const findProducts = await ProductService.find();
  res.status(200).json(findProducts);
});

productsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.findOne({ id });
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  res.json(product);
});

export { productsRouter };
