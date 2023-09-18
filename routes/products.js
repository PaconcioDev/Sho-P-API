import { Router } from "express";
import { ProductService } from "../services/products.js";

const productsRouter = Router();
const productsService = new ProductService;

productsRouter.get("/", async (req, res) => {
  const findProducts = await productsService.find();
  res.status(200).json(findProducts);
});

productsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productsService.findOne(id, res);
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  res.json(product);
});

export { productsRouter };
