class ProductController {
  constructor ({ productModel }) {
    this.productModel = productModel;
  }

  getAll = async (req, res) => {
    const findProducts = await this.productModel.getAll();
    res.json(findProducts);
  };

  findOne = async (req, res) => {
    const { id } = req.params;
    const product = await this.productModel.findOne({ id });

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json(product);
  };

  create = async (req, res) => {
    const { validatedData } = req;
    const newProduct = await this.productModel.create({ input: validatedData });
    res.status(201).json(newProduct);
  };

  update = async (req, res) => {
    const { validatedData } = req;
    const { id } = req.params;
    const updatedProduct = await this.productModel.update({
      id,
      input: validatedData
    });

    if (!updatedProduct) { return res.status(404).json({ error: 'Product not found' }); }

    res.json(updatedProduct);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await this.productModel.delete({ id });

    if (!deletedProduct) { return res.status(404).json({ error: 'Product not found' }); }

    res
      .status(200)
      .json({ message: `Product with ID:${id} deleted successfully` });
  };
}

export { ProductController };
