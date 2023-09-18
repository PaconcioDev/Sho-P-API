import { Router } from "express";
import { CategoriesService } from "../services/categories.js";

const categoriesRouter = Router();

categoriesRouter.get("/", async (req, res) => {
  const categoriesJson = await CategoriesService.find();
  res.status(200).json(categoriesJson);
});

categoriesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const category = await CategoriesService.findOne({ id });
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.status(200).json(category);
});

categoriesRouter.get("/:id/products", async (req, res) => {
  const { id } = req.params;
  const filteredProducts = await CategoriesService.findProducts({ id });
  if (!filteredProducts) return res.status(404).json({ message: "Theres no products on that category" });
  res.status(200).json(filteredProducts);
});

export { categoriesRouter };
