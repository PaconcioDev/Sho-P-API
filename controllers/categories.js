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
}

export { CategoryController };
