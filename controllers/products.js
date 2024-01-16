import { handleProcessFailure } from "../utils/handleProccessFailure.js";

class ProductController {
  constructor({ productModel }) {
    this.productModel = productModel;
  }

  getAll = async (req, res) => {
    const findProducts = await this.productModel.getAll();

    res.json(findProducts);
  };

  findOne = async (req, res) => {
    const { id } = req.params;
    const product = await this.productModel.findOne({ id });

    if (!product) {
      handleProcessFailure(res, 404, "Product not found");
      return;
    }

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
      input: validatedData,
    });

    if (!updatedProduct) {
      handleProcessFailure(res, 404, "Product not found");
      return;
    }

    res.json(updatedProduct);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await this.productModel.delete({ id });

    if (!deletedProduct) {
      handleProcessFailure(res, 404, "Product not found");
      return;
    }

    res
      .status(200)
      .json({ message: `Product with ID:${id} deleted successfully` });
  };
}

export { ProductController };
