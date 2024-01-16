import { handleProcessFailure } from "../utils/handleProccessFailure.js";

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
      handleProcessFailure(res, 404, "Category not found");
      return;
    }

    res.json(category);
  };

  findProducts = async (req, res) => {
    const { id } = req.params;
    const filteredProducts = await this.categoryModel.findProducts({ id });

    if (!filteredProducts) {
      handleProcessFailure(res, 404, "No products on this category");
      return;
    }

    res.json(filteredProducts);
  };

  create = async (req, res) => {
    const { validatedData } = req;
    const newCategory = await this.categoryModel.create({
      input: validatedData,
    });

    res.status(201).json(newCategory);
  };

  update = async (req, res) => {
    const { validatedData } = req;
    const { id } = req.params;
    const updatedCategory = await this.categoryModel.update({
      id,
      input: validatedData,
    });

    if (!updatedCategory) {
      handleProcessFailure(res, 404, "Category not found");
      return;
    }

    res.json(updatedCategory);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const deletedCategory = await this.categoryModel.delete({ id });

    if (!deletedCategory) {
      handleProcessFailure(res, 404, "Category not found");
      return;
    }

    res
      .status(200)
      .json({ message: `Category with ID:${id} deleted successfully` });
  };
}

export { CategoryController };
