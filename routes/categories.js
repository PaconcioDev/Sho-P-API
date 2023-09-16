import { Router } from "express";
import { products } from "../services/products.js";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const categories = require("../categories.json");

const categoriesRouter = Router();

categoriesRouter.get("/", async (req, res) => {
  const categoriesJson = await categories;
  res.status(200).json(categoriesJson);
});

categoriesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const categoryJson = categories.find(
    (category) => category.id.toString() === id
  );
  if (!categoryJson) return res.status(404).json({ message: "Category not found" });

  res.status(200).json(categoryJson);
});

categoriesRouter.get("/:id/products", async (req, res) => {
  const { id } = req.params;
  const filteredProducts = products.filter(
    (product) => product.category.id.toString() === id
  );
  if (!filteredProducts) return res.status(404).json({ message: "Theres no products on that category"});

  res.status(200).json(filteredProducts);
});

export { categoriesRouter };
