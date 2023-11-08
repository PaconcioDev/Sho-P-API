import {
  validateProduct,
  validatePartialProduct,
} from "../schemas/products.js";

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
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  };

  create = async (req, res) => {
    const result = validateProduct(req.body);

    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }

    const newProduct = await this.productModel.create({ input: result.data });

    res.status(201).json(newProduct);
  };

  update = async (req, res) => {
    const result = validatePartialProduct(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updatedProduct = await this.productModel.update({
      id,
      input: result.data,
    });

    res.json(updatedProduct);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await this.productModel.delete({ id });

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res
      .status(200)
      .json({ message: `Product with ID:${id} deleted successfully` });
  };
}

export { ProductController };
