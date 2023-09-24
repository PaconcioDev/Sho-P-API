import { ProductModel } from "../models/products.js";
import { validateProduct, validatePartialProduct} from "../schemas/products.js";

class ProductController {
  static async getAll(req, res) {
    const findProducts = await ProductModel.getAll();

    res.json(findProducts);
  }

  static async findOne(req, res) {
    const { id } = req.params;
    const product = await ProductModel.findOne({ id });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  }

  static async create(req, res) {
    const result = validateProduct(req.body);

    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }

    const newProduct = await ProductModel.create({ input: result.data });

    res.status(201).json(newProduct);
  }

  static async partialUpdate(req, res) {
    const result = validatePartialProduct(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updatedProduct = await ProductModel.update({
      id,
      input: result.data,
    });

    res.json(updatedProduct);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const deletedProduct = await ProductModel.delete({ id });

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({ message: `Product with ID:${id} deleted successfully` });
  }
}

export { ProductController };
