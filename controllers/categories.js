import { validateCategory } from "../schemas/categories.js";

class CategoryController {
  constructor({ categoryModel }) {
    this.categoryModel = categoryModel;
  }

  getAll = async (req, res) => {
    const categoriesJson = await this.categoryModel.getAll();
    res.json(categoriesJson);
  };

  findOne = async (req, res) => {
    const { id } = req.params;
    const category = await this.categoryModel.findOne({ id });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  };

  findProducts = async (req, res) => {
    const { id } = req.params;
    const filteredProducts = await this.categoryModel.findProducts({ id });

    if (!filteredProducts) {
      return res
        .status(404)
        .json({ message: "Theres no products on that category" });
    }

    res.json(filteredProducts);
  };

  create = async (req, res) => {
    const result = validateCategory(req.body);

    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }

    const newCategory = await this.categoryModel.create({ input: req.body });

    res.status(201).json(newCategory);
  };

  update = async (req, res) => {
    const result = validateCategory(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updatedCategory = await this.categoryModel.update({
      id,
      input: result.data,
    });

    res.json(updatedCategory);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const deletedCategory = await this.categoryModel.delete({ id });

    if (!deletedCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res
      .status(200)
      .json({ message: `Category with ID:${id} deleted successfully` });
  };
}

export { CategoryController };
