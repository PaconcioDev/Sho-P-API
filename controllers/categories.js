import { CategoryModel } from "../models/local-file-system/categories.js";

class CategoryController {
  static async getAll(req, res) {
    const categoriesJson = await CategoryModel.getAll();
    res.json(categoriesJson);
  }

  static async findOne(req, res) {
    const { id } = req.params;
    const category = await CategoryModel.findOne({ id });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  }

  static async findProducts(req, res) {
    const { id } = req.params;
    const filteredProducts = await CategoryModel.findProducts({ id });

    if (!filteredProducts) {
      return res
        .status(404)
        .json({ message: "Theres no products on that category" });
    }

    res.json(filteredProducts);
  }
}

export { CategoryController };
