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

    if (!category) return res.status(404).json({ error: "Category not found" });

    res.json(category);
  };

  findProducts = async (req, res) => {
    const { id } = req.params;
    const filteredProducts = await this.categoryModel.findProducts({ id });

    if (!filteredProducts)
      return res.status(404).json({ error: "No products on this category" });

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

    if (!updatedCategory)
      return res.status(404).json({ error: "Category not found" });

    res.json(updatedCategory);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const deletedCategory = await this.categoryModel.delete({ id });

    if (!deletedCategory)
      return res.status(404).json({ error: "Category not found" });

    res
      .status(200)
      .json({ message: `Category with ID:${id} deleted successfully` });
  };
}

export { CategoryController };
